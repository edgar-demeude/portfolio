// Folder name -> display title
export function formatFolderName(folder: string) {
  if (!folder) return '';
  if (folder.toLowerCase().startsWith('ongoing')) {
    // "ongoing_lyon" -> "Lyon"
    return folder.replace(/^ongoing[_-]/i, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  // "23_japan23" or "2024_japan24" -> "Japan 23" / "Japan 24"
  const withoutPrefix = folder.replace(/^\d+[_-]/, '');
  const spaced = withoutPrefix.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/_/g, ' ');
  return spaced.replace(/\b\w/g, c => c.toUpperCase());
}