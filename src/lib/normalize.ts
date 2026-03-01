/**
 * Normaliza texto para busqueda: convierte a minusculas y elimina acentos/tildes
 * "Alcàsser" -> "alcasser"
 * "María" -> "maria"
 * "Niño" -> "nino"
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres acentuados (é -> e + ́)
    .replace(/[\u0300-\u036f]/g, '') // Elimina marcas diacriticas
    .replace(/[^\w\s]/g, '') // Elimina caracteres especiales excepto espacios
    .trim()
}

/**
 * Compara si el texto contiene la busqueda (sin importar acentos o mayusculas)
 */
export function matchesSearch(text: string | null | undefined, search: string): boolean {
  if (!text) return false
  const normalizedText = normalizeForSearch(text)
  const normalizedSearch = normalizeForSearch(search)
  return normalizedText.includes(normalizedSearch)
}
