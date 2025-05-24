import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const collection = req.nextUrl.searchParams.get('collection');

  if (!collection) {
    return NextResponse.json({ error: 'Missing collection' }, { status: 400 });
  }

  const photosDir = path.join(process.cwd(), 'public', 'photos');

  try {
    if (collection === 'all') {
      // Lire tous les dossiers dans photos (toutes collections)
      const collections = fs.readdirSync(photosDir).filter(f =>
        fs.statSync(path.join(photosDir, f)).isDirectory()
      );

      // Rassembler toutes les URLs dans un tableau
      let allUrls: string[] = [];
      collections.forEach(col => {
        const folderPath = path.join(photosDir, col);
        const files = fs.readdirSync(folderPath).filter(file =>
          /\.(jpe?g|png|webp)$/i.test(file)
        );
        const urls = files.map(file => `/photos/${col}/${file}`);
        allUrls = allUrls.concat(urls);
      });

      return NextResponse.json(allUrls);
    } else {
      // Cas normal, une collection précise
      const folderPath = path.join(photosDir, collection);
      const files = fs.readdirSync(folderPath).filter(file =>
        /\.(jpe?g|png|webp)$/i.test(file)
      );
      const urls = files.map(file => `/photos/${collection}/${file}`);
      return NextResponse.json(urls);
    }
  } catch (e) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }
}
