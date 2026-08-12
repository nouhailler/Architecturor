import { CATEGORIES, type Typologie } from './typologies'
import { SECTION_ICONS } from './icons'

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.id))
const ID_PATTERN = /^[a-z0-9]+$/

/** Gabarit fourni à l'utilisateur : sert à la fois de modèle téléchargeable
 * et d'exemple affiché dans l'écran d'import. Les champs marqués
 * "(optionnel)" peuvent être omis — ils prendront une valeur vide. */
export const TYPOLOGIE_TEMPLATE: Typologie = {
  id: 'moneexempleid',
  name: 'Nom de la typologie',
  region: 'Région · Sous-région',
  periode: '1800–1950',
  procede: 'Procédé de construction principal',
  usage: "Usage du bâtiment",
  categorie: 'rural',
  periodeTags: ['XIXe'],
  resume: 'Résumé en une à deux phrases décrivant la typologie, son contexte et ses caractéristiques principales.',
  identite: [
    ['Période', '1800–1950'],
    ['Région', 'Région · Sous-région'],
    ['Usage', "Usage du bâtiment"],
    ['Système', 'Système constructif (ex. Murs porteurs maçonnés)'],
    ['Matériau dominant', 'Matériau principal'],
    ['Toiture', 'Description de la toiture'],
    ['Particularité', 'Élément distinctif de cette typologie'],
  ],
  materiaux: ['Matériau 1', 'Matériau 2', 'Matériau 3'],
  annotations: [
    { n: 1, el: 'Toiture', txt: 'Description de la toiture et de sa charpente.' },
    { n: 2, el: 'Façade & murs extérieurs', txt: 'Description de la façade et des murs.' },
    { n: 3, el: 'Planchers', txt: 'Description des planchers.' },
    { n: 4, el: 'Structure porteuse', txt: 'Description de la structure porteuse.' },
    { n: 5, el: 'Escalier', txt: "Description de l'escalier." },
    { n: 6, el: 'Fondations', txt: 'Description des fondations.' },
  ],
  sections: [
    {
      title: 'Titre de la section (ex. Structure porteuse)',
      icon: 'ph ph-house-line',
      intro: 'Texte introductif optionnel pour cette section.',
      groups: [
        { lead: null, items: ['Point descriptif 1', 'Point descriptif 2'] },
        { lead: 'Sous-titre optionnel', items: ['Point descriptif 3'] },
      ],
    },
  ],
  gps: '46.0° N, 2.0° E (optionnel)',
  altitude: '0–200 m (optionnel)',
  climat: 'Océanique (optionnel)',
  typeToiture: 'Type de toiture (optionnel)',
  penteToit: 'Pente du toit (optionnel)',
  essenceBois: 'Essence de bois (optionnel)',
  typeFondation: 'Type de fondation (optionnel)',
  typeCharpente: 'Type de charpente (optionnel)',
  epoqueDominante: 'Époque dominante (optionnel)',
  difficulteIdentification: 'Facile | Moyenne | Difficile (optionnel)',
  wikipediaUrl: 'https://fr.wikipedia.org/wiki/... (optionnel)',
  commonsUrl: 'https://commons.wikimedia.org/... (optionnel)',
  images: [],
}

/** Icônes reconnues pour `sections[].icon` — une icône non reconnue est
 * acceptée mais ne s'affichera simplement pas dans la fiche. Dérivée de
 * SECTION_ICONS pour rester automatiquement à jour avec les icônes
 * réellement prises en charge par l'affichage. */
export const VALID_SECTION_ICONS = Object.keys(SECTION_ICONS)

export interface ValidationResult {
  ok: boolean
  errors: string[]
  typologie: Typologie | null
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string')
}

export function validateTypologieImport(raw: unknown, existingIds: Set<string>): ValidationResult {
  const errors: string[] = []

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return { ok: false, errors: ['Le fichier doit contenir un objet JSON unique (pas une liste, pas un texte brut).'], typologie: null }
  }
  const r = raw as Record<string, unknown>

  // Champs obligatoires
  if (!isNonEmptyString(r.id) || !ID_PATTERN.test(r.id.trim())) {
    errors.push('« id » est obligatoire : identifiant unique en minuscules, lettres et chiffres uniquement (ex. "maisonexemple").')
  } else if (existingIds.has(r.id.trim())) {
    errors.push(`« id » : "${r.id}" est déjà utilisé par une autre typologie. Choisissez un identifiant unique.`)
  }
  if (!isNonEmptyString(r.name)) errors.push('« name » est obligatoire (nom de la typologie).')
  if (!isNonEmptyString(r.region)) errors.push('« region » est obligatoire.')
  if (!isNonEmptyString(r.periode)) errors.push('« periode » est obligatoire.')
  if (!isNonEmptyString(r.procede)) errors.push('« procede » est obligatoire.')
  if (!isNonEmptyString(r.usage)) errors.push('« usage » est obligatoire.')
  if (!isNonEmptyString(r.resume)) errors.push('« resume » est obligatoire.')
  if (typeof r.categorie !== 'string' || !VALID_CATEGORIES.has(r.categorie as Typologie['categorie'])) {
    errors.push(`« categorie » est obligatoire et doit être l'une de : ${[...VALID_CATEGORIES].join(', ')}.`)
  }

  // identite : tableau de paires [clé, valeur]
  let identite: [string, string][] = []
  if (r.identite !== undefined) {
    if (
      !Array.isArray(r.identite)
      || !r.identite.every((row) => Array.isArray(row) && row.length === 2 && typeof row[0] === 'string' && typeof row[1] === 'string')
    ) {
      errors.push('« identite » doit être une liste de paires [clé, valeur], ex. [["Période", "1800–1950"], ...].')
    } else {
      identite = r.identite as [string, string][]
    }
  }

  // materiaux, images, periodeTags : tableaux de chaînes
  const readStringArray = (value: unknown, field: string): string[] => {
    if (value === undefined) return []
    if (isStringArray(value)) return value
    errors.push(`« ${field} » doit être une liste de chaînes.`)
    return []
  }
  const materiaux = readStringArray(r.materiaux, 'materiaux')
  const images = readStringArray(r.images, 'images')
  const periodeTags = readStringArray(r.periodeTags, 'periodeTags')

  // annotations
  let annotations: Typologie['annotations'] = []
  if (r.annotations !== undefined) {
    const arr = r.annotations
    const valid = Array.isArray(arr) && arr.every((a) => {
      if (typeof a !== 'object' || a === null) return false
      const row = a as Record<string, unknown>
      return typeof row.n === 'number' && typeof row.el === 'string' && typeof row.txt === 'string'
    })
    if (!valid) {
      errors.push('« annotations » doit être une liste d\'objets { n: nombre, el: texte, txt: texte }.')
    } else {
      annotations = arr as Typologie['annotations']
    }
  }

  // sections
  let sections: Typologie['sections'] = []
  if (r.sections !== undefined) {
    const arr = r.sections
    const validGroup = (g: unknown) => {
      if (typeof g !== 'object' || g === null) return false
      const grp = g as Record<string, unknown>
      return 'lead' in grp && Array.isArray(grp.items) && grp.items.every((x: unknown) => typeof x === 'string')
    }
    const valid = Array.isArray(arr) && arr.every((s) => {
      if (typeof s !== 'object' || s === null) return false
      const sec = s as Record<string, unknown>
      return typeof sec.title === 'string' && typeof sec.icon === 'string' && Array.isArray(sec.groups) && sec.groups.every(validGroup)
    })
    if (!valid) {
      errors.push('« sections » doit être une liste d\'objets { title, icon, groups: [{ lead, items: [...] }] } (voir le gabarit).')
    } else {
      sections = arr as Typologie['sections']
    }
  }

  if (errors.length > 0) return { ok: false, errors, typologie: null }

  const typologie: Typologie = {
    id: (r.id as string).trim(),
    name: (r.name as string).trim(),
    region: (r.region as string).trim(),
    periode: (r.periode as string).trim(),
    procede: (r.procede as string).trim(),
    usage: (r.usage as string).trim(),
    categorie: r.categorie as Typologie['categorie'],
    periodeTags,
    resume: (r.resume as string).trim(),
    identite,
    materiaux,
    annotations,
    sections,
    gps: isNonEmptyString(r.gps) ? r.gps : '',
    altitude: isNonEmptyString(r.altitude) ? r.altitude : '',
    climat: isNonEmptyString(r.climat) ? r.climat : '',
    typeToiture: isNonEmptyString(r.typeToiture) ? r.typeToiture : '',
    penteToit: isNonEmptyString(r.penteToit) ? r.penteToit : '',
    essenceBois: isNonEmptyString(r.essenceBois) ? r.essenceBois : '',
    typeFondation: isNonEmptyString(r.typeFondation) ? r.typeFondation : '',
    typeCharpente: isNonEmptyString(r.typeCharpente) ? r.typeCharpente : '',
    epoqueDominante: isNonEmptyString(r.epoqueDominante) ? r.epoqueDominante : '',
    difficulteIdentification: isNonEmptyString(r.difficulteIdentification) ? r.difficulteIdentification : '',
    wikipediaUrl: isNonEmptyString(r.wikipediaUrl) ? r.wikipediaUrl : '',
    commonsUrl: isNonEmptyString(r.commonsUrl) ? r.commonsUrl : '',
    images,
  }

  return { ok: true, errors: [], typologie }
}
