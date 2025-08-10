export function formatCollectionName(name: string) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}