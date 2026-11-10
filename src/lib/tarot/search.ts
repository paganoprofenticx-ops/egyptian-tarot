/** Normaliza texto para búsquedas tolerantes a mayúsculas y acentos. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function includesText(haystack: string, needle: string): boolean {
  return normalizeText(haystack).includes(normalizeText(needle));
}
