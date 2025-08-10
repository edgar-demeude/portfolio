import fs from 'fs';
import path from 'path';

const photosDir = path.join(process.cwd(), 'public', 'photos');
const outputDir = path.join(process.cwd(), 'public');

function formatCollectionName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generate() {
  const collectionsFolders = fs.readdirSync(photosDir).filter(f =>
    fs.statSync(path.join(photosDir, f)).isDirectory()
  );

  const collections = collectionsFolders.map(folder => {
    const folderPath = path.join(photosDir, folder);
    const files = fs.readdirSync(folderPath).filter(file =>
      /\.(jpe?g|png|webp)$/i.test(file)
    );
    const images = files.map(file => `/photos/${folder}/${file}`);

    // Generates a photos_<folder>.json file with all images
    fs.writeFileSync(
      path.join(outputDir, `photos_${folder}.json`),
      JSON.stringify(images, null, 2)
    );

    return {
      folder,
      title: formatCollectionName(folder),
      previewImage: images[0] || null,
      images,
    };
  });

  fs.writeFileSync(
    path.join(outputDir, 'collections.json'),
    JSON.stringify(collections, null, 2)
  );

  console.log('Static JSON generated in public/');
}

generate();