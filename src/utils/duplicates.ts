import type { Typologie } from '../data/typologies'

/** Seuil de similarité (0 à 1) au-delà duquel deux textes sont considérés comme "très proches". */
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

/** Deux textes sont jugés "correspondants" s'ils sont identiques ou très proches
 * une fois normalisés (casse, espaces, accents ignorés). */
function fieldsMatch(a: string, b: string): boolean {
  const na = normalizeText(a)
  const nb = normalizeText(b)
  if (!na || !nb) return false
  return na === nb || similarityRatio(na, nb) >= SIMILARITY_THRESHOLD
}

export interface DuplicateMatch {
  typologie: Typologie
  reason: 'identique' | 'très proche'
}

export interface IdentityMatch {
  typologie: Typologie
  /** Champs de la fiche d'identité qui correspondent (ex. ['catégorie', 'région', 'usage', 'période']). */
  matchedFields: string[]
}

export interface DuplicateReport {
  exact: DuplicateMatch[]
  similar: DuplicateMatch[]
  identity: IdentityMatch[]
}

export interface DuplicateCandidate {
  name: string
  categorie: Typologie['categorie']
  region: string
  usage: string
  periode: string
}

/** Recherche des doublons potentiels parmi les typologies existantes, sur deux plans :
 * - le nom (identique ou très proche une fois normalisé) ;
 * - la fiche d'identité (catégorie, région, usage et période qui correspondent tous,
 *   même si le nom diffère — cas d'une même typologie cataloguée sous un autre intitulé). */
export function findDuplicates(candidate: DuplicateCandidate, existing: Typologie[]): DuplicateReport {
  const candidateNorm = normalizeText(candidate.name)
  const exact: DuplicateMatch[] = []
  const similar: DuplicateMatch[] = []
  const identity: IdentityMatch[] = []

  for (const t of existing) {
    const norm = normalizeText(t.name)
    let nameFlagged = false
    if (norm === candidateNorm) {
      exact.push({ typologie: t, reason: 'identique' })
      nameFlagged = true
    } else if (similarityRatio(candidateNorm, norm) >= SIMILARITY_THRESHOLD) {
      similar.push({ typologie: t, reason: 'très proche' })
      nameFlagged = true
    }

    const matchedFields: string[] = []
    if (t.categorie === candidate.categorie) matchedFields.push('catégorie')
    if (fieldsMatch(t.region, candidate.region)) matchedFields.push('région')
    if (fieldsMatch(t.usage, candidate.usage)) matchedFields.push('usage')
    if (fieldsMatch(t.periode, candidate.periode)) matchedFields.push('période')

    // Un nom déjà signalé (identique ou très proche) rend le rappel de la fiche
    // d'identité redondant : on ne l'ajoute que si le nom, lui, ne correspondait pas.
    if (!nameFlagged && matchedFields.length === 4) {
      identity.push({ typologie: t, matchedFields })
    }
  }

  return { exact, similar, identity }
}
