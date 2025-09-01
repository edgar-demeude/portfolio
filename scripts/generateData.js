import fs from 'fs';
import path from 'path';

const photosDir = path.join(process.cwd(), 'public', 'photos');
const outputDir = path.join(process.cwd(), 'public');

// Formats collection name (display)
function formatCollectionName(folder) {
  if (folder.toLowerCase().startsWith('ongoing')) {
    // Deletes "ongoing_" for the title
    return folder.replace(/^ongoing[_-]/i, '').replace(/[-_]/g, ' ')
                 .replace(/\b\w/g, c => c.toUpperCase());
  } else {
    // Deletes leading digits and formats
    const name = folder.replace(/^\d+[_-]/, '');
    return name.replace(/([a-zA-Z])(\d)/g, '$1 $2')
               .replace(/[-_]/g, ' ')
               .replace(/\b\w/g, c => c.toUpperCase());
  }
}

// Extract year
function extractYear(folder) {
  if (folder.toLowerCase().startsWith('ongoing')) return 'Ongoing';
  const match = folder.match(/^\d{4}/) || folder.match(/^\d{2}/);
  return match ? match[0] : 'Unknown';
}

function generate() {
  const collectionsFolders = fs.readdirSync(photosDir)
    .filter(f => fs.statSync(path.join(photosDir, f)).isDirectory())
    .sort();

  const collections = collectionsFolders.map(folder => {
    const folderPath = path.join(photosDir, folder);
    const files = fs.readdirSync(folderPath).filter(file =>
      /\.(jpe?g|png|webp)$/i.test(file)
    );
    const images = files.map(file => `/photos/${folder}/${file}`);

    return {
      folder,
      title: formatCollectionName(folder),
      year: extractYear(folder),
      previewImage: images[0] || null,
      images,
    };
  });

  // Generates the main JSON file
  fs.writeFileSync(path.join(outputDir, 'collections.json'), JSON.stringify(collections, null, 2));

  console.log('Static JSON generated in public/');
}

generate();
