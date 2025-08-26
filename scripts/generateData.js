import fs from 'fs';
import path from 'path';

const photosDir = path.join(process.cwd(), 'public', 'photos');
const outputDir = path.join(process.cwd(), 'public');

// Format the final title (remove any prefix)
function formatCollectionName(name) {
  // Remove a possible prefix like '01_' or '02-' at the start
  const cleanName = name.replace(/^\d+[_-]/, '');
  return cleanName
    .replace(/[-_]/g, ' ')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generate() {
  // Get folders and sort alphabetically so prefix order is preserved
  const collectionsFolders = fs.readdirSync(photosDir)
    .filter(f => fs.statSync(path.join(photosDir, f)).isDirectory())
    .sort(); // alphabetical sort: 01_… before 02_… etc

  const collections = collectionsFolders.map(folder => {
    const folderPath = path.join(photosDir, folder);
    const files = fs.readdirSync(folderPath).filter(file =>
      /\.(jpe?g|png|webp)$/i.test(file)
    );
    const images = files.map(file => `/photos/${folder}/${file}`);

    // Generate a separate JSON file for each collection
    fs.writeFileSync(
      path.join(outputDir, `photos_${folder}.json`),
      JSON.stringify(images, null, 2)
    );

    return {
      folder,                     // folder name stays with prefix (useful for URLs)
      title: formatCollectionName(folder), // clean title for display
      previewImage: images[0] || null,
      images,
    };
  });

  // Generate the main collections JSON
  fs.writeFileSync(
    path.join(outputDir, 'collections.json'),
    JSON.stringify(collections, null, 2)
  );

  console.log('Static JSON generated in public/');
}

generate();
