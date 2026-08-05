// Regroupement des très nombreuses valeurs de "procédé de construction" et
// "type d'usage" (120 et 147 valeurs distinctes) en familles thématiques,
// pour que le catalogue puisse afficher un nombre raisonnable d'en-têtes
// repliables plutôt qu'une liste de chips interminable.

export interface Famille {
  id: string
  label: string
}

interface FamilleDef extends Famille {
  motsCles: string[]
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function classify(valeur: string, familles: FamilleDef[], exceptions: Record<string, string>, familleParDefaut: string): string {
  if (exceptions[valeur]) return exceptions[valeur]
  const n = normalize(valeur)
  let meilleure: string | null = null
  let meilleurIndex = Infinity
  for (const f of familles) {
    for (const mot of f.motsCles) {
      const idx = n.indexOf(normalize(mot))
      if (idx !== -1 && idx < meilleurIndex) {
        meilleurIndex = idx
        meilleure = f.id
      }
    }
  }
  return meilleure ?? familleParDefaut
}

// --- Procédé de construction ---------------------------------------------

const PROCEDE_FAMILLE_DEFS: FamilleDef[] = [
  { id: 'pierre', label: 'Pierre & maçonnerie', motsCles: ['pierre', 'moellon', 'calcaire', 'granite', 'grès', 'gres', 'schiste', 'galet', 'tuffeau', 'maçonnerie', 'maconnerie'] },
  { id: 'brique', label: 'Brique', motsCles: ['brique'] },
  { id: 'beton', label: 'Béton', motsCles: ['béton', 'beton', 'parpaing'] },
  { id: 'metal', label: 'Métal', motsCles: ['métal', 'metal', 'métallique', 'metallique', 'acier', 'fonte', 'cuivre'] },
  { id: 'bois', label: 'Bois & pans de bois', motsCles: ['bois', 'colombage', 'torchis', 'essentage'] },
  { id: 'contemporain', label: 'Construction contemporaine & écologique', motsCles: ['isolation', 'conteneur', 'urbanisme durable', 'developpement durable', 'développement durable', 'préfabrication', 'prefabrication'] },
]

const PROCEDE_EXCEPTIONS: Record<string, string> = {
  'Plan cellulaire, murs d’enceinte': 'pierre',
  'Structure éclectique, salles en enfilade': 'pierre',
}

export const PROCEDE_FAMILLES: Famille[] = [
  ...PROCEDE_FAMILLE_DEFS.map(({ id, label }) => ({ id, label })),
  { id: 'autres', label: 'Autres procédés' },
]

export function familleProcede(procede: string): string {
  return classify(procede, PROCEDE_FAMILLE_DEFS, PROCEDE_EXCEPTIONS, 'autres')
}

// --- Type d'usage -----------------------------------------------------------

const USAGE_FAMILLE_DEFS: FamilleDef[] = [
  { id: 'habitat', label: 'Habitat & logement', motsCles: ['habitat', 'logement', 'maison', 'ferme', 'immeuble', 'residence', 'résidence', 'hotel particulier', 'hôtel particulier', 'atelier de canut', 'quartier neuf'] },
  { id: 'agricole', label: 'Agriculture & élevage', motsCles: ['agricole', 'betail', 'bétail', 'troupeau', 'vigne', 'elevage', 'élevage', 'traite', 'grange', 'foin', 'grain', 'mouture', 'pressurage', 'distillation', 'tabac', 'biogaz', 'maraich', 'grenier', 'cuisson du pain', 'récoltes', 'recoltes'] },
  { id: 'religieux', label: 'Religieux & funéraire', motsCles: ['basilique', 'chapelle', 'monastique', 'religieux', 'culte', 'episcopal', 'épiscopal', 'funeraire', 'funéraire', 'sepulture', 'sépulture', 'ossements', 'cineraires', 'cinéraires', 'memorial', 'mémorial'] },
  { id: 'militaire', label: 'Militaire & défense', motsCles: ['casemate', 'caserne', 'fort ', 'forteresse', 'fortification', 'defense', 'défense', 'guet', 'ville neuve fortifiee', 'ville neuve fortifiée', 'artillerie'] },
  { id: 'industrie', label: 'Industrie & artisanat', motsCles: ['filature', 'tissage', 'fer au marteau', 'fonte', 'electricite', 'électricité', 'charbon', 'raffinage', 'puits de mine', 'production centralisee', 'production centralisée'] },
  { id: 'transports', label: 'Transports', motsCles: ['gare', 'terminus', 'locomotive', 'voie ferree', 'voie ferrée', 'autocars', 'transbordement du fret'] },
  { id: 'commerce', label: 'Commerce & services', motsCles: ['commerce', 'marche couvert', 'marché couvert', 'galerie marchande', 'vente', 'enchere', 'enchère', 'postal', 'stockage de marchandises'] },
  { id: 'education', label: 'Éducation & recherche', motsCles: ['enseignement', 'ecole', 'école', 'instruction primaire', 'documentaires', 'sportive scolaire', 'eleves', 'élèves', 'etudiant', 'étudiant'] },
  { id: 'sante_social', label: 'Santé & action sociale', motsCles: ['indigents', 'soins', 'personnes agees', 'personnes âgées', 'jeunes enfants'] },
  { id: 'culture_loisirs', label: 'Culture, loisirs & tourisme', motsCles: ['concert', 'cinematographique', 'cinématographique', 'theatrale', 'théâtrale', 'lyrique', 'mondanites', 'mondanités', 'baignade', 'natation', 'bals et fetes', 'bals et fêtes', 'thermales', 'refuge d’altitude', 'refuge d\'altitude', 'baigneurs', 'hebergement hotelier', 'hébergement hôtelier'] },
  { id: 'admin_justice', label: 'Administration & justice', motsCles: ['administration communale', 'representant de l’etat', "representant de l'etat", 'justice', 'penitentiaire', 'pénitentiaire'] },
  { id: 'maritime', label: 'Maritime & fluvial', motsCles: ['maritime', 'chenal', 'halage', 'ostreicole', 'ostréicole', 'peche', 'pêche', 'phare'] },
]

const USAGE_EXCEPTIONS: Record<string, string> = {
  'Stockage de marchandises': 'commerce',
  'Stockage et transbordement du fret': 'transports',
  "Buron, bâtiment pastoral d'estive": 'agricole',
  "Chalet d'estive, fabrication fromagère": 'agricole',
}

export const USAGE_FAMILLES: Famille[] = [
  ...USAGE_FAMILLE_DEFS.map(({ id, label }) => ({ id, label })),
  { id: 'autres', label: "Autres usages" },
]

export function familleUsage(usage: string): string {
  return classify(usage, USAGE_FAMILLE_DEFS, USAGE_EXCEPTIONS, 'autres')
}
