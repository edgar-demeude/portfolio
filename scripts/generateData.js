import fs from "fs";
import path from "path";
import sharp from "sharp";

const photosDir = path.join(process.cwd(), "public", "photos");
const outputDir = path.join(process.cwd(), "public");

/**
 * Extract category, priority, and name from folder string
 * Example: "japan_1_tokyo24" => { category: "Japan", priority: 1, name: "Tokyo 24" }
 */
function parseFolder(folder) {
  const parts = folder.split("_");
  const category = parts[0] ? capitalize(parts[0]) : "Misc";
  const priority = parts[1] ? parseInt(parts[1], 10) : 99;
  const name = parts.slice(2).join(" ") || folder;
  return { category, priority, name: formatName(name) };
}

/** Capitalizes the first letter of a string */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Format a folder name to readable title */
function formatName(name) {
  return name
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Ensure a directory exists */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generate() {
  const folders = fs
    .readdirSync(photosDir)
    .filter((f) => fs.statSync(path.join(photosDir, f)).isDirectory())
    .sort();

  const collections = [];

  for (const folder of folders) {
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

      // Generate thumbnail if it doesn't exist
      if (!fs.existsSync(thumbFile)) {
        await sharp(fullPath)
          .resize({ width: 1000 })
          .jpeg({ quality: 80 })
          .toFile(thumbFile);
        console.log(`Generated thumb: ${thumbFile}`);
      } else {
        console.log(`Skipped (already exists): ${thumbFile}`);
      }

      images.push(`/photos/${folder}/${file}`);
      thumbs.push(`/photos/${folder}/thumbs/${file}`);
    }

    const { category, priority, name } = parseFolder(folder);

    collections.push({
      folder,
      category,
      priority,
      title: name,
      images,
      thumbs,
    });
  }

  // Sort collections by priority then title
  collections.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.title.localeCompare(b.title);
  });

  fs.writeFileSync(
    path.join(outputDir, "collections.json"),
    JSON.stringify(collections, null, 2)
  );

  console.log("✅ Static JSON generated in public/");
}

generate().catch((err) => console.error(err));
