import fs from "fs";
import path from "path";
import sharp from "sharp";

const photosDir = path.join(process.cwd(), "public", "photos");
const outputDir = path.join(process.cwd(), "public");

// Formats collection name (display)
function formatCollectionName(folder) {
  if (folder.toLowerCase().startsWith("ongoing")) {
    return folder
      .replace(/^ongoing[_-]/i, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  } else {
    const name = folder.replace(/^\d+[_-]/, "");
    return name
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

// Extract year
function extractYear(folder) {
  if (folder.toLowerCase().startsWith("ongoing")) return "Ongoing";
  const match = folder.match(/^\d{4}/) || folder.match(/^\d{2}/);
  return match ? match[0] : "Unknown";
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generate() {
  const collectionsFolders = fs
    .readdirSync(photosDir)
    .filter((f) => fs.statSync(path.join(photosDir, f)).isDirectory())
    .sort();

  const collections = [];

  for (const folder of collectionsFolders) {
    const folderPath = path.join(photosDir, folder);
    const thumbPath = path.join(folderPath, "thumbs");

    ensureDir(thumbPath);

    const files = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

    const images = [];
    const thumbs = [];

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const thumbFile = path.join(thumbPath, file);

      // Skip if thumbnail already exists
      if (!fs.existsSync(thumbFile)) {
        await sharp(fullPath)
          .resize({ width: 1000 }) // bigger thumbnails
          .jpeg({ quality: 80 })
          .toFile(thumbFile);
        console.log(`Generated thumb: ${thumbFile}`);
      } else {
        console.log(`Skipped (already exists): ${thumbFile}`);
      }

      images.push(`/photos/${folder}/${file}`);
      thumbs.push(`/photos/${folder}/thumbs/${file}`);
    }

    collections.push({
      folder,
      title: formatCollectionName(folder),
      year: extractYear(folder),
      images,
      thumbs,
    });
  }

  // Generates the main JSON file
  fs.writeFileSync(
    path.join(outputDir, "collections.json"),
    JSON.stringify(collections, null, 2)
  );

  console.log("✅ Static JSON generated in public/");
}

generate().catch((err) => console.error(err));
