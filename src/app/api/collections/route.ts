import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { formatCollectionName } from '@/app/utils/formatCollectionName';

const photosDir = path.join(process.cwd(), 'public', 'photos');

export async function GET() {
  try {
    const folders = fs.readdirSync(photosDir).filter(f =>
      fs.statSync(path.join(photosDir, f)).isDirectory()
    );

    const collections = folders.map(folder => {
      const folderPath = path.join(photosDir, folder);
      const files = fs.readdirSync(folderPath).filter(file =>
        /\.(jpe?g|png|webp)$/i.test(file)
      );
      const images = files.map(file => `/photos/${folder}/${file}`);

      const title = formatCollectionName(folder);

      return {
        folder,
        title,
        previewImage: images[0] || null,
        images,
      };
    });

    return NextResponse.json(collections);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to list collections' }, { status: 500 });
  }
}
