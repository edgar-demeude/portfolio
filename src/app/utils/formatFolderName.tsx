// utils/formatFolderName.ts
export function formatFolderName(folder: string): string {
  if (!folder) return '';

  // Supprimer préfixe numérique global (ex: "2024_") si nécessaire
  const withoutGlobalPrefix = folder.replace(/^\d+[_-]/, '');

  // Découper par underscore
  const parts = withoutGlobalPrefix.split('_');

  // Ignorer catégorie (parts[0]) et le chiffre suivant s'il y en a
  let nameParts: string[];
  if (parts.length > 2 && /^\d+$/.test(parts[1])) {
    nameParts = parts.slice(2);
  } else {
    nameParts = parts.slice(1);
  }

  // Recomposer le nom et capitaliser
  return nameParts
    .join(' ')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
