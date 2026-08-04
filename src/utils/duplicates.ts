import type { Typologie } from '../data/typologies'

/** Seuil de similarité (0 à 1) au-delà duquel deux noms sont considérés comme "très proches". */
const SIMILARITY_THRESHOLD = 0.85

export function normalizeText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents
    .replace(/\s+/g, ' ')
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m

  let prev = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    const curr = [i]
    for (let j = 1; j <= n; j++) {
      curr[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j], curr[j - 1], prev[j - 1])
    }
    prev = curr
  }
  return prev[n]
}

function similarityRatio(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  return 1 - levenshtein(a, b) / maxLen
}

export interface DuplicateMatch {
  typologie: Typologie
  reason: 'identique' | 'très proche'
}

export interface DuplicateReport {
  exact: DuplicateMatch[]
  similar: DuplicateMatch[]
}

/** Recherche, parmi les typologies existantes, celles dont le nom est identique
 * (une fois normalisé) ou très proche du nom candidat — pour repérer les doublons
 * lors d'un import, y compris entre plusieurs typologies importées successivement. */
export function findDuplicates(candidateName: string, existing: Typologie[]): DuplicateReport {
  const candidateNorm = normalizeText(candidateName)
  const exact: DuplicateMatch[] = []
  const similar: DuplicateMatch[] = []

  for (const t of existing) {
    const norm = normalizeText(t.name)
    if (norm === candidateNorm) {
      exact.push({ typologie: t, reason: 'identique' })
    } else if (similarityRatio(candidateNorm, norm) >= SIMILARITY_THRESHOLD) {
      similar.push({ typologie: t, reason: 'très proche' })
    }
  }

  return { exact, similar }
}
