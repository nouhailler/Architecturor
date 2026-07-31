export interface Annotation {
  n: number
  el: string
  txt: string
}

export interface Group {
  lead: string | null
  items: string[]
}

export interface Section {
  title: string
  icon: string
  intro?: string
  outro?: string
  groups: Group[]
}

export const CATEGORIES = [
  { id: 'rural',        emoji: '🏠', label: 'Habitat rural' },
  { id: 'urbain',       emoji: '🏘', label: 'Habitat urbain' },
  { id: 'religieuse',   emoji: '🏛', label: 'Architecture religieuse' },
  { id: 'militaire',    emoji: '🏰', label: 'Architecture militaire' },
  { id: 'industrielle', emoji: '🏭', label: 'Architecture industrielle' },
  { id: 'transports',   emoji: '🚂', label: 'Architecture des transports' },
  { id: 'agricole',     emoji: '🌾', label: 'Architecture agricole' },
  { id: 'publique',     emoji: '🏫', label: 'Architecture publique' },
  { id: 'littorale',    emoji: '🌊', label: 'Architecture littorale' },
  { id: 'montagne',     emoji: '⛰', label: 'Architecture de montagne' },
] as const

export type CategorieId = (typeof CATEGORIES)[number]['id']

export const CATEGORIES_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

export interface Typologie {
  id: string
  name: string
  region: string
  periode: string
  procede: string
  usage: string
  categorie: CategorieId
  periodeTags: string[]
  resume: string
  identite: [string, string][]
  materiaux: string[]
  annotations: Annotation[]
  sections: Section[]
}

const G = (lead: string | null, items: string[]): Group => ({ lead, items })

export const TYPOLOGIES: Typologie[] = [
  {
    id: 'haussmann',
    name: 'Immeuble haussmannien',
    region: 'Paris · Île-de-France',
    periode: '1853–1870',
    procede: 'Pierre de taille',
    usage: 'Habitat urbain',
    categorie: 'urbain',
    periodeTags: ['XIXe'],
    resume:
      "Immeuble de rapport en pierre de taille né des grands travaux du Second Empire. Murs porteurs massifs, façade strictement codifiée et toiture de zinc : une typologie qui structure encore les boulevards parisiens.",
    identite: [
      ['Période', '1853–1870 (Second Empire)'],
      ['Région', 'Paris, Île-de-France'],
      ['Usage', 'Immeuble de rapport, habitat urbain'],
      ['Système', 'Murs porteurs maçonnés'],
      ['Matériau dominant', 'Pierre de taille calcaire'],
      ['Épaisseur des murs', '50–80 cm (≈1 m au RDC)'],
      ['Toiture', 'Zinc, brisis à la Mansart'],
      ['Gabarit', 'R+5 à R+6'],
    ],
    materiaux: ['Pierre de taille', 'Moellons calcaire', 'Mortier de chaux', 'Chêne', 'Zinc', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture zinc, lucarnes et souches de cheminée nombreuses.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille, murs porteurs de 50–80 cm (jusqu\u2019à 1 m au rez-de-chaussée).' },
      { n: 3, el: 'Planchers', txt: 'Poutres chêne/résineux, solives secondaires, parquet massif, remplissage plâtre.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre et moellons hourdés au mortier de chaux.' },
      { n: 5, el: 'Escalier', txt: 'Marches en pierre, limons pierre ou métal, garde-corps en fer forgé.' },
      { n: 6, el: 'Fondations', txt: 'Maçonnerie de pierre / moellons, semelles peu profondes, parfois pieux bois.' },
    ],
    sections: [
      {
        title: 'Fondations & structure porteuse',
        icon: 'ph ph-stack',
        intro: "Contrairement aux immeubles modernes en béton armé, le haussmannien repose sur le principe des murs porteurs.",
        groups: [
          G('Fondations', ['Maçonnerie de pierre ou moellons', 'Semelles peu profondes vs constructions modernes', 'Pieux en bois sur terrains instables']),
          G('Matériaux porteurs', ['Pierre de taille (façade et éléments nobles)', 'Moellons et calcaire pour murs intérieurs', 'Mortier de chaux']),
          G('Épaisseurs', ["50 à 80 cm aux étages supérieurs", "Jusqu\u2019à 1 m ou davantage au rez-de-chaussée"]),
        ],
        outro: "Les murs supportent directement les planchers ; les fondations sont dimensionnées pour des murs très épais.",
      },
      {
        title: 'Planchers',
        icon: 'ph ph-rows',
        intro: "Les planchers sont presque toujours en bois massif.",
        groups: [
          G(null, ['Grosses poutres en chêne ou résineux', 'Solives secondaires', 'Parquet massif au-dessus']),
          G('Remplissage entre poutres', ['Remplissages en plâtre', 'Parfois voûtains en briques (constructions tardives)']),
        ],
        outro: "Cette structure explique les craquements caractéristiques des appartements anciens.",
      },
      {
        title: 'Escaliers',
        icon: 'ph ph-steps',
        groups: [
          G(null, ['Marches en pierre', 'Limons en pierre ou en métal', 'Garde-corps en fer forgé']),
          G(null, ["Escalier principal desservant les appartements nobles", "Escalier de service plus étroit"]),
        ],
      },
      {
        title: 'Murs intérieurs & cloisons',
        icon: 'ph ph-columns',
        groups: [
          G('Cloisons', ['Briques creuses', 'Carreaux de plâtre', 'Pans de bois dans les immeubles plus anciens']),
        ],
        outro: "Toutes les cloisons ne sont pas porteuses, ce qui facilite certaines rénovations.",
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Charpente en bois', 'Couverture en zinc', 'Lucarnes', 'Nombreuses cheminées']),
        ],
        outro: "Le zinc, léger et durable, couvre les fortes pentes typiques des immeubles parisiens.",
      },
      {
        title: 'Façade & composition',
        icon: 'ph ph-buildings',
        intro: "La façade suit une composition très codifiée, du bas vers le haut :",
        groups: [
          G(null, [
            'Rez-de-chaussée avec commerces',
            'Entresol',
            'Étage noble (2\u1d49) avec grand balcon',
            'Étages courants',
            'Balcon filant au 5\u1d49 étage',
            'Combles sous toiture',
          ]),
        ],
        outro: "Les pierres sont assemblées avec précision, créant l\u2019aspect uniforme des boulevards haussmanniens.",
      },
      {
        title: 'Techniques de chantier',
        icon: 'ph ph-hammer',
        groups: [
          G(null, [
            'Échafaudages en bois',
            'Grues à bras et treuils',
            'Chevaux pour le transport des pierres',
            'Tailleurs de pierre travaillant sur le chantier',
          ]),
        ],
        outro: "Les blocs provenaient des carrières de calcaire du bassin parisien.",
      },
      {
        title: 'Pourquoi ces immeubles sont si solides',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, [
            'Murs porteurs très épais',
            'Calcaire de bonne qualité',
            'Charges réparties sur toute la maçonnerie',
            "Matériaux respirants (chaux et pierre) limitant l\u2019humidité",
            'Excellente inertie thermique',
          ]),
        ],
        outro: "Beaucoup d\u2019immeubles haussmanniens ont aujourd\u2019hui plus de 150 ans.",
      },
    ],
  },

  {
    id: 'panbois',
    name: 'Maison à pans de bois',
    region: 'Normandie · Val de Loire',
    periode: '1450–1650',
    procede: 'Ossature bois',
    usage: 'Habitat',
    categorie: 'urbain',
    periodeTags: ['Avant 1800'],
    resume:
      "Maison à ossature de bois hourdée de torchis, courante du Moyen Âge à la Renaissance. L\u2019encorbellement gagne de la surface aux étages ; la structure est entièrement lisible en façade.",
    identite: [
      ['Période', 'XV\u1d49–XVII\u1d49 siècle'],
      ['Région', 'Normandie, Alsace, Val de Loire'],
      ['Usage', 'Maison de ville, habitat'],
      ['Système', 'Ossature bois + remplissage'],
      ['Matériau dominant', 'Chêne & torchis'],
      ['Toiture', 'Tuile plate ou chaume, forte pente'],
      ['Particularité', 'Encorbellement des étages'],
    ],
    materiaux: ['Chêne', 'Torchis', 'Colombage', 'Tuile / Chaume', 'Pierre (solin)', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente à chevrons, couverture tuile plate ou chaume, forte pente.' },
      { n: 2, el: 'Façade & murs', txt: 'Pans de bois hourdés au torchis (terre + paille), colombage apparent.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois posé sur sablières ; encorbellement en surplomb aux étages.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois : poteaux, sablières, décharges ; contreventement par écharpes.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en bois, droit ou à vis, souvent hors-œuvre côté cour.' },
      { n: 6, el: 'Fondations', txt: "Solin / soubassement en pierre isolant le bois de l\u2019humidité du sol." },
    ],
    sections: [
      {
        title: 'Soubassement & fondations',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Soubassement maçonné en pierre ou moellons', 'Solin surélevé protégeant le bois du sol humide', 'Semelles de pierre peu profondes']),
        ],
        outro: "Le décollement du bois par rapport au sol conditionne la durabilité de l\u2019édifice.",
      },
      {
        title: 'Ossature bois',
        icon: 'ph ph-tree',
        intro: "La structure est un assemblage de bois équarri, généralement du chêne.",
        groups: [
          G('Éléments verticaux', ["Poteaux corniers et intermédiaires", "Poteaux d\u2019huisserie"]),
          G('Éléments horizontaux', ['Sablières basses et hautes', 'Solives et poutres']),
          G('Contreventement', ['Décharges et écharpes en diagonale', 'Assemblages tenon-mortaise chevillés']),
        ],
      },
      {
        title: 'Remplissage (hourdis)',
        icon: 'ph ph-bricks',
        groups: [
          G(null, ['Torchis : terre argileuse + paille sur lattis / clayonnage', 'Parfois briques ou tuileaux (hourdis maçonné)', 'Enduit de finition à la chaux']),
        ],
        outro: "Le torchis, respirant et léger, se répare aisément.",
      },
      {
        title: 'Encorbellement & planchers',
        icon: 'ph ph-rows',
        groups: [
          G(null, ["Solives en surplomb portant l\u2019étage supérieur", 'Gain de surface habitable aux niveaux hauts', 'Protection du rez-de-chaussée contre la pluie']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ["Charpente à chevrons-portant-fermes", 'Couverture en tuile plate, ardoise ou chaume', "Forte pente pour l\u2019évacuation des eaux", 'Lucarnes et pignons débordants']),
        ],
      },
    ],
  },

  {
    id: 'mas',
    name: 'Mas provençal',
    region: 'Provence · Méditerranée',
    periode: '1600–1850',
    procede: 'Moellons & chaux',
    usage: 'Habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme-bloc méditerranéenne en moellons calcaire liés à la chaux. Murs épais, faible pente de tuiles canal et forte inertie thermique pour résister à la chaleur estivale.",
    identite: [
      ['Période', 'XVII\u1d49–XIX\u1d49 siècle'],
      ['Région', 'Provence, Languedoc'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Moellons calcaire & chaux'],
      ['Épaisseur des murs', '60–80 cm'],
      ['Toiture', 'Tuiles canal, faible pente, génoise'],
    ],
    materiaux: ['Moellons calcaire', 'Chaux', 'Tuile canal', 'Bois', 'Tomette', 'Enduit terre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, tuiles canal à faible pente, génoise en débord de rive.' },
      { n: 2, el: 'Façade & murs', txt: 'Gros murs en moellons calcaire hourdés à la chaux, enduit taloché.' },
      { n: 3, el: 'Planchers', txt: 'Poutres et solives bois, revêtement en tomettes ou dalles de pierre.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs épais (60–80 cm) offrant une forte inertie thermique.' },
      { n: 5, el: 'Escalier', txt: 'Escalier maçonné ou en pierre, souvent adossé à un mur de refend.' },
      { n: 6, el: 'Fondations', txt: "Semelles en pierre, ancrage direct au rocher quand il affleure." },
    ],
    sections: [
      {
        title: 'Implantation & fondations',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Implantation adossée à une pente, dos au mistral', 'Fondations de pierre ancrées au rocher', 'Rez-de-chaussée souvent dédié aux bêtes / réserve']),
        ],
      },
      {
        title: 'Murs porteurs',
        icon: 'ph ph-wall',
        intro: "La masse des murs assure structure et confort thermique.",
        groups: [
          G(null, ["Moellons de calcaire local hourdés à la chaux", 'Épaisseur 60–80 cm', "Chaînages d\u2019angle en pierre de taille", 'Peu d\u2019ouvertures, petites baies']),
        ],
        outro: "L\u2019inertie des murs tempère la chaleur : frais l\u2019été, tempéré l\u2019hiver.",
      },
      {
        title: 'Planchers & voûtes',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Poutres et solives en bois', 'Voûtes en berceau au rez-de-chaussée (celliers)', 'Sol en tomettes de terre cuite']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Faible pente couverte de tuiles canal', 'Génoise (double ou triple rang de tuiles) en corniche', 'Charpente bois simple']),
        ],
        outro: "La génoise éloigne les eaux de pluie du nu du mur.",
      },
    ],
  },

  {
    id: 'coron',
    name: 'Coron minier',
    region: 'Nord · Hauts-de-France',
    periode: '1825–1914',
    procede: 'Brique',
    usage: 'Habitat ouvrier',
    categorie: 'urbain',
    periodeTags: ['XIXe'],
    resume:
      "Habitat ouvrier minier bâti en bande, en brique de terre cuite. Maisons mitoyennes répétitives organisées autour du carreau de fosse, produites en série par les compagnies.",
    identite: [
      ['Période', '1825–1914'],
      ['Région', 'Nord–Pas-de-Calais'],
      ['Usage', 'Logement ouvrier (mines)'],
      ['Système', 'Murs porteurs en brique'],
      ['Matériau dominant', 'Brique de terre cuite'],
      ['Organisation', 'Bâti en bande, mitoyen'],
      ['Toiture', 'Tuile mécanique ou ardoise'],
    ],
    materiaux: ['Brique', 'Ardoise / Tuile', 'Bois', 'Pierre', 'Mortier de chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile mécanique ou ardoise, deux pans.' },
      { n: 2, el: 'Façade & murs', txt: 'Murs porteurs en brique appareillée, chaînages et bandeaux décoratifs.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois ; parfois voûtains de brique sur poutrelles métalliques.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs de refend mitoyens porteurs, bâti répétitif en bande.' },
      { n: 5, el: 'Escalier', txt: 'Escalier bois droit ou quart-tournant menant aux chambres.' },
      { n: 6, el: 'Fondations', txt: 'Semelles brique/pierre, cave voûtée fréquente sous le logement.' },
    ],
    sections: [
      {
        title: 'Organisation urbaine',
        icon: 'ph ph-grid-nine',
        intro: "Le coron est un ensemble planifié par la compagnie minière.",
        groups: [
          G(null, ["Maisons mitoyennes alignées en longues barres", "Jardin ouvrier à l\u2019arrière", 'Trame répétitive autour du carreau de fosse']),
        ],
      },
      {
        title: 'Fondations & soubassement',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Semelles en brique ou pierre', 'Cave voûtée en brique fréquente', 'Soubassement protégeant contre les remontées']),
        ],
      },
      {
        title: 'Murs en brique',
        icon: 'ph ph-bricks',
        groups: [
          G(null, ['Brique de terre cuite locale hourdée au mortier', 'Murs de refend mitoyens porteurs', 'Chaînages, bandeaux et corniches en brique moulurée']),
        ],
        outro: "La standardisation permet une construction rapide et économique.",
      },
      {
        title: 'Planchers & toiture',
        icon: 'ph ph-house-line',
        groups: [
          G('Planchers', ['Solivage bois', 'Voûtains de brique sur poutrelles fer (variantes tardives)']),
          G('Toiture', ['Charpente bois à deux pans', 'Tuile mécanique ou ardoise du bassin']),
        ],
      },
    ],
  },

  {
    id: 'grandensemble',
    name: 'Grand ensemble en béton',
    region: 'Aires urbaines · France',
    periode: '1953–1975',
    procede: 'Béton armé',
    usage: 'Habitat collectif',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Logement collectif de la reconstruction et des Trente Glorieuses. Structure en béton armé, préfabrication et chemin de grue permettent de bâtir vite, en série et en hauteur.",
    identite: [
      ['Période', '1953–1975'],
      ['Région', 'Périphéries des grandes villes'],
      ['Usage', 'Logement collectif (barres, tours)'],
      ['Système', 'Ossature/voiles béton armé'],
      ['Matériau dominant', 'Béton armé, panneaux préfabriqués'],
      ['Mise en œuvre', 'Chemin de grue, préfabrication'],
      ['Toiture', 'Toiture-terrasse'],
    ],
    materiaux: ['Béton armé', 'Panneaux préfa', 'Acier (armatures)', 'Verre', 'Allège béton'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse en dalle béton, étanchéité multicouche et relevés.' },
      { n: 2, el: 'Façade & murs', txt: 'Panneaux préfabriqués béton (façade porteuse ou rapportée), allèges.' },
      { n: 3, el: 'Planchers', txt: 'Dalles en béton armé coulées en place ou préfabriquées (prédalles).' },
      { n: 4, el: 'Structure porteuse', txt: 'Voiles et refends béton armé montés au chemin de grue.' },
      { n: 5, el: 'Escalier', txt: "Cage d\u2019escalier béton et batterie d\u2019ascenseurs desservant les niveaux." },
      { n: 6, el: 'Fondations', txt: 'Semelles filantes, radier ou pieux en béton armé selon le sol.' },
    ],
    sections: [
      {
        title: 'Principe constructif',
        icon: 'ph ph-crane-tower',
        intro: "Le procédé vise la rapidité et la répétition à grande échelle.",
        groups: [
          G(null, ['Trame régulière calée sur le chemin de grue', 'Préfabrication foraine ou en usine', 'Standardisation des éléments (panneaux, cages)']),
        ],
      },
      {
        title: 'Fondations',
        icon: 'ph ph-stack',
        groups: [
          G(null, ["Semelles filantes sous voiles", 'Radier général sur sols médiocres', 'Pieux forés pour les tours']),
        ],
      },
      {
        title: 'Structure béton armé',
        icon: 'ph ph-building',
        groups: [
          G(null, ['Voiles et refends porteurs en béton armé', "Poteaux-poutres pour les rez-de-chaussée ouverts", "Contreventement par les cages d\u2019escalier et d\u2019ascenseur"]),
        ],
        outro: "Le béton armé autorise portées et hauteurs impossibles en maçonnerie.",
      },
      {
        title: 'Planchers & façades',
        icon: 'ph ph-rows',
        groups: [
          G('Planchers', ['Dalles pleines coulées en place', 'Prédalles et planchers préfabriqués']),
          G('Façades', ['Panneaux préfabriqués (parfois porteurs)', 'Allèges béton et grandes baies vitrées']),
        ],
      },
      {
        title: 'Toiture-terrasse',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Dalle béton support', 'Isolation + étanchéité multicouche', 'Acrotères et relevés périphériques']),
        ],
      },
    ],
  },

  {
    id: 'longere',
    name: 'Longère bretonne',
    region: "Bretagne · Côtes-d'Armor",
    periode: '1700–1900',
    procede: 'Granite',
    usage: 'Habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison rurale bretonne tout en longueur, bâtie en gros blocs de granite sous une toiture d’ardoise à forte pente. Plan simple d’une seule travée en profondeur, pignons épais orientés face aux vents et pluies atlantiques.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Bretagne, Côtes-d’Armor, Finistère'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en granite'],
      ['Matériau dominant', 'Granite (moellons ou pierre de taille)'],
      ['Épaisseur des murs', '60–90 cm'],
      ['Toiture', 'Ardoise, forte pente, pignons débordants'],
      ['Plan', 'Rectangulaire allongé, une seule travée en profondeur'],
    ],
    materiaux: ['Granite', 'Ardoise', 'Chêne', 'Chaux', 'Torchis', 'Schiste'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture ardoise à forte pente, pignons débordants contre les embruns.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Gros blocs de granite appareillés, ouvertures étroites côté vents dominants.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois reposant sur les murs gouttereaux, comble souvent ouvert sans plancher haut.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs de granite très épais, pignons porteurs aux extrémités, pas de mur de refend.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en pierre ou échelle meunière donnant accès au comble-grenier.' },
      { n: 6, el: 'Fondations', txt: 'Semelles de granite directement ancrées au socle rocheux, peu profondes.' },
    ],
    sections: [
      {
        title: 'Implantation & fondations',
        icon: 'ph ph-stack',
        intro: "La longère s’implante perpendiculairement aux vents dominants, sur un socle granitique affleurant.",
        groups: [
          G(null, ['Fondations peu profondes ancrées au rocher', 'Orientation dos aux vents d’ouest', 'Plan rectangulaire simple, une seule pièce en profondeur']),
        ],
      },
      {
        title: 'Murs en granite',
        icon: 'ph ph-wall',
        intro: "Le granite local, dur et imperméable, structure toute la construction.",
        groups: [
          G(null, ['Moellons de granite hourdés à la chaux', 'Chaînages d’angle en pierre de taille', 'Ouvertures rares et étroites, encadrements chanfreinés']),
        ],
        outro: "L’épaisseur des murs protège du froid et de l’humidité océanique.",
      },
      {
        title: 'Toiture & charpente',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Charpente à fermes simples', 'Couverture en ardoise fine', 'Forte pente pour résister aux pluies et au vent', 'Pignons débordants protégeant les murs']),
        ],
      },
      {
        title: 'Vie rurale & dépendances',
        icon: 'ph ph-waves',
        groups: [
          G(null, ['Étable et logis parfois sous le même toit', 'Grenier accessible par échelle meunière', 'Puits et four à pain à proximité']),
        ],
        outro: "La longère organise dans un même volume l’habitat et les activités agricoles.",
      },
    ],
  },

  {
    id: 'chalet',
    name: 'Chalet savoyard',
    region: 'Savoie · Alpes',
    periode: '1750–1900',
    procede: 'Bois & pierre',
    usage: 'Habitat rural montagnard',
    categorie: 'montagne',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Habitat de montagne combinant un soubassement en pierre (étable, cave) et un étage en madriers de bois (logis, grenier à foin). Toiture à faible pente couverte de tavaillons ou de lauzes, dimensionnée pour porter la neige.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Savoie, Haute-Savoie, Alpes'],
      ['Usage', 'Ferme alpine, habitat rural'],
      ['Système', 'Soubassement pierre + étage bois'],
      ['Matériau dominant', 'Épicéa / mélèze & pierre locale'],
      ['Toiture', 'Tavaillons ou lauzes, faible pente'],
      ['Particularité', 'Étage bois en madriers empilés (blockbau)'],
    ],
    materiaux: ['Mélèze', 'Épicéa', 'Pierre locale', 'Lauze', 'Tavaillon', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente robuste, couverture en lauzes ou tavaillons, faible pente dimensionnée pour porter la neige.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Soubassement en pierre, étage en madriers de bois assemblés en blockbau (rondins empilés).' },
      { n: 3, el: 'Planchers', txt: 'Plancher bois posé sur solives, isolant l’étage d’habitation du soubassement en pierre.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs en pierre au rez-de-chaussée (étable, cave), murs en madriers massifs à l’étage.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en bois menant au balcon et à l’étage d’habitation.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement massif en pierre, ancré à flanc de pente, résistant au gel et à la neige.' },
    ],
    sections: [
      {
        title: 'Soubassement en pierre',
        icon: 'ph ph-stack',
        intro: "Le rez-de-chaussée en pierre abrite l’étable et la cave, isolées du froid.",
        groups: [
          G(null, ['Murs en moellons de pierre locale', 'Faibles ouvertures, ventilation contrôlée', 'Implantation à flanc de pente pour l’écoulement des eaux']),
        ],
      },
      {
        title: 'Étage en bois (blockbau)',
        icon: 'ph ph-tree',
        intro: "L’étage d’habitation est construit en madriers de bois massif empilés et assemblés aux angles.",
        groups: [
          G('Éléments', ['Madriers d’épicéa ou de mélèze équarris', 'Assemblages en queue d’aronde aux angles', 'Balcon en bois filant sur la façade sud']),
        ],
        outro: "Le bois massif offre une bonne isolation thermique naturelle.",
      },
      {
        title: 'Toiture',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Faible pente pour retenir la neige (isolant naturel)', 'Couverture en lauzes ou tavaillons de bois', 'Larges débords protégeant les façades et le bois de chauffage']),
        ],
      },
      {
        title: 'Pourquoi cette construction résiste à la montagne',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Bois massif à forte inertie et isolation', 'Toiture dimensionnée pour la surcharge de neige', 'Soubassement pierre protégeant du gel et de l’humidité']),
        ],
        outro: "Une architecture entièrement adaptée au climat alpin et aux ressources locales.",
      },
    ],
  },

  {
    id: 'echoppe',
    name: 'Échoppe bordelaise',
    region: 'Bordeaux · Gironde',
    periode: '1730–1914',
    procede: 'Pierre calcaire',
    usage: 'Habitat urbain',
    categorie: 'urbain',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison de ville de plain-pied ou à un étage, en pierre calcaire blonde, typique des faubourgs bordelais. Façade étroite sur rue, plan en profondeur desservant les pièces en enfilade, toiture à faible pente en tuile.",
    identite: [
      ['Période', '1730–1914'],
      ['Région', 'Bordeaux, Gironde'],
      ['Usage', 'Habitat urbain, maison de faubourg'],
      ['Système', 'Murs porteurs en pierre calcaire'],
      ['Matériau dominant', 'Pierre calcaire de Bordeaux'],
      ['Gabarit', 'Plain-pied ou un étage'],
      ['Toiture', 'Tuile creuse, faible pente'],
      ['Plan', 'Étroit en façade, profond, pièces en enfilade'],
    ],
    materiaux: ['Pierre calcaire', 'Tuile creuse', 'Fer forgé', 'Chêne', 'Mortier de chaux', 'Zinc'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile creuse à faible pente, souvent invisible depuis la rue.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade étroite en pierre calcaire, ferronneries ouvragées, corniche moulurée.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, parquet ou carreaux de terre cuite selon les pièces.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs mitoyens porteurs en pierre calcaire, façade et mur de fond porteurs.' },
      { n: 5, el: 'Escalier', txt: 'Peu ou pas d’escalier (plain-pied) ; escalier droit simple pour les échoppes à étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, caves voûtées fréquentes sous le corps avant.' },
    ],
    sections: [
      {
        title: 'Implantation urbaine',
        icon: 'ph ph-grid-nine',
        intro: "L’échoppe s’aligne sur la rue, en bande continue avec ses voisines.",
        groups: [
          G(null, ['Parcelle étroite et profonde héritée du parcellaire ancien', 'Façade sur rue, jardin ou cour à l’arrière', 'Mitoyenneté systématique']),
        ],
      },
      {
        title: 'Murs en pierre calcaire',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire blonde de la région bordelaise', 'Façade travaillée : bandeaux, corniches, encadrements moulurés', 'Murs mitoyens porteurs, mur de fond porteur']),
        ],
        outro: "La pierre calcaire se patine et jaunit caractéristiquement avec le temps.",
      },
      {
        title: 'Toiture & plan intérieur',
        icon: 'ph ph-house-line',
        groups: [
          G('Toiture', ['Faible pente en tuile creuse', 'Peu visible depuis la rue']),
          G('Plan', ['Pièces en enfilade, de la rue vers le jardin', 'Cour ou jardin arrière fréquent']),
        ],
      },
      {
        title: 'Ferronnerie & décor',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Garde-corps et grilles en fer forgé travaillé', 'Encadrements de portes et fenêtres sculptés', 'Diversité de styles selon les faubourgs et les époques']),
        ],
      },
    ],
  },

  {
    id: 'labourdine',
    name: 'Maison basque (labourdine)',
    region: 'Pays basque · Aquitaine',
    periode: '1600–1850',
    procede: 'Pans de bois & torchis',
    usage: 'Habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Grande maison rurale basque à ossature bois apparente, façade principale en pignon tourné vers l’est, colombages peints en rouge ou vert. Toit à deux pans très asymétriques abritant logis, étable et grenier sous un même volume.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Pays basque, Labourd'],
      ['Usage', 'Ferme, habitat rural (maison-étable-grenier)'],
      ['Système', 'Ossature bois + remplissage'],
      ['Matériau dominant', 'Chêne & torchis / brique'],
      ['Toiture', 'Deux pans très asymétriques, tuile'],
      ['Particularité', 'Pignon principal en façade, orienté à l’est'],
    ],
    materiaux: ['Chêne', 'Torchis', 'Brique', 'Tuile', 'Pierre', 'Pigments naturels'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile, deux pans très asymétriques (long pan arrière, court pan avant).' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pignon à colombages apparents peints en rouge ou vert, remplissage brique ou torchis.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois séparant logis, grenier à foin et parfois étable en rez-de-chaussée.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois de chêne, poteaux et sablières, soubassement en pierre pour l’étable.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois menant aux chambres et à la galerie côté cour.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement maçonné en pierre, plus massif côté étable.' },
    ],
    sections: [
      {
        title: 'Implantation & orientation',
        icon: 'ph ph-stack',
        intro: "La façade principale, en pignon, est traditionnellement orientée à l’est, face au soleil levant et dos aux vents dominants.",
        groups: [
          G(null, ['Pignon principal en façade sur la cour', 'Orientation est traditionnelle', 'Bâtiment unique regroupant logis, étable et grenier']),
        ],
      },
      {
        title: 'Ossature bois & colombages',
        icon: 'ph ph-tree',
        intro: "Le chêne, matériau noble, structure toute la façade en pans de bois apparents.",
        groups: [
          G('Éléments', ['Poteaux et sablières de chêne équarri', 'Croix de Saint-André et écharpes de contreventement', 'Remplissage en torchis ou en brique']),
          G('Décor', ['Colombages peints en rouge ou vert selon la tradition locale']),
        ],
      },
      {
        title: 'Toiture asymétrique',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Pan arrière long descendant bas pour protéger l’étable', 'Pan avant court au-dessus de la façade pignon', 'Couverture en tuile, faible débord']),
        ],
        outro: "Cette dissymétrie caractéristique distingue la maison basque des autres typologies à colombages.",
      },
      {
        title: 'Organisation intérieure',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Logis, étable et grenier sous un même toit', 'Galerie de bois côté cour pour le séchage du maïs', 'Four à pain souvent accolé au pignon']),
        ],
      },
    ],
  },

  {
    id: 'artdeco',
    name: 'Immeuble Art déco',
    region: 'Reims · Champagne',
    periode: '1920–1935',
    procede: 'Béton & brique',
    usage: 'Habitat urbain',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Immeuble de la reconstruction d’après-guerre, mêlant structure en béton armé et parements de brique ou de béton mouluré. Façades géométriques, ferronneries stylisées et frises décoratives caractérisent ce style né de la reconstruction de villes comme Reims après 1918.",
    identite: [
      ['Période', '1920–1935'],
      ['Région', 'Reims, villes reconstruites du Nord-Est'],
      ['Usage', 'Immeuble de rapport, habitat urbain'],
      ['Système', 'Ossature béton armé + parements'],
      ['Matériau dominant', 'Béton armé, brique décorative'],
      ['Style', 'Art déco (géométrie, frises, ferronneries)'],
      ['Contexte', 'Reconstruction après la Première Guerre mondiale'],
    ],
    materiaux: ['Béton armé', 'Brique décorative', 'Grès flammé', 'Fer forgé géométrique', 'Verre', 'Pierre reconstituée'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture à faible pente ou terrasse, souvent masquée par un acrotère décoratif.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Ossature béton armé, parements de brique ou béton mouluré, frises géométriques en façade.' },
      { n: 3, el: 'Planchers', txt: 'Dalles en béton armé, portées plus importantes que la maçonnerie traditionnelle.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux et voiles en béton armé, murs de façade souvent non porteurs (rideau).' },
      { n: 5, el: 'Escalier', txt: 'Cage d’escalier avec verrières et ferronneries géométriques caractéristiques du style.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en béton armé, adaptées aux charges plus importantes de la structure béton.' },
    ],
    sections: [
      {
        title: 'Contexte de la reconstruction',
        icon: 'ph ph-crane-tower',
        intro: "Après les destructions de 1914-1918, des villes comme Reims sont rebâties selon des principes modernes.",
        groups: [
          G(null, ['Plans d’alignement repensés pour les nouveaux immeubles', 'Emploi généralisé du béton armé, plus rapide à mettre en œuvre', 'Décor Art déco affirmant une identité moderne']),
        ],
      },
      {
        title: 'Structure béton armé',
        icon: 'ph ph-building',
        groups: [
          G(null, ['Poteaux-poutres et voiles en béton armé', 'Portées plus grandes que la maçonnerie traditionnelle', 'Façades parfois non porteuses, simples parements']),
        ],
        outro: "Le béton armé permet des façades plus libres et des ouvertures plus généreuses.",
      },
      {
        title: 'Décor & façade',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Frises géométriques en brique ou pierre reconstituée', 'Ferronneries stylisées (balcons, verrières d’escalier)', 'Céramiques et grès flammés en éléments décoratifs']),
        ],
      },
      {
        title: 'Planchers & distribution',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Dalles pleines en béton armé', 'Cages d’escalier largement vitrées', 'Appartements traversants plus fréquents qu’au XIXe siècle']),
        ],
      },
    ],
  },

  {
    id: 'longerevendeenne',
    name: 'Longère vendéenne',
    region: 'Vendée · Pays de la Loire',
    periode: '1600–1900',
    procede: 'Moellons',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Longère de bocage vendéen bâtie en moellons calcaires ou granitiques enduits à la chaux, sous toiture de tuile canal ou d’ardoise selon les secteurs. Plan allongé simple, souvent adossée à la haie bocagère qui la protège du vent.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Vendée, Pays de la Loire'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en moellons'],
      ['Matériau dominant', 'Moellons calcaires ou granitiques'],
      ['Toiture', 'Tuile canal ou ardoise'],
      ['Plan', 'Rectangulaire allongé, adossé au bocage'],
    ],
    materiaux: ['Moellons', 'Chaux', 'Chêne', 'Tuile canal', 'Torchis', 'Granit'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile canal ou ardoise selon les secteurs du bocage.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Moellons calcaires ou granitiques enduits à la chaux, ouvertures modestes.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, terre battue ou tomettes au rez-de-chaussée.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en moellons hourdés à la chaux, pignons épais.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en pierre ou intérieur en bois selon les logis.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en moellons, peu profondes, ancrées au sol bocager.' },
    ],
    sections: [
      {
        title: 'Implantation bocagère',
        icon: 'ph ph-stack',
        intro: "La longère s’adosse à la haie et au talus du bocage vendéen, qui la protègent des vents d’ouest.",
        groups: [
          G(null, ['Orientation dos aux vents dominants', 'Plan rectangulaire simple, une seule travée', 'Cour et dépendances agricoles attenantes']),
        ],
      },
      {
        title: 'Murs en moellons',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Moellons calcaires ou granitiques selon le secteur', 'Enduit à la chaux, finition talochée', 'Chaînages d’angle plus soignés']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile canal dans le Bas-Bocage', 'Ardoise dans le Haut-Bocage', 'Faîtage bas, pente modérée']),
        ],
      },
    ],
  },

  {
    id: 'solognote',
    name: 'Maison solognote',
    region: 'Sologne · Centre-Val de Loire',
    periode: '1700–1900',
    procede: 'Brique & colombage',
    usage: 'Habitat rural, maison des étangs',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison des étangs solognots associant un soubassement en brique et un étage à pans de bois, sous une toiture pentue de tuile plate adaptée aux terrains humides. Le bois local, issu des forêts de Sologne, structure une architecture marquée par l’eau et l’étang.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Sologne, Centre-Val de Loire'],
      ['Usage', 'Habitat rural, maison des étangs'],
      ['Système', 'Soubassement brique + pans de bois'],
      ['Matériau dominant', 'Brique et bois de Sologne'],
      ['Toiture', 'Tuile plate, forte pente'],
      ['Particularité', 'Implantation près des étangs'],
    ],
    materiaux: ['Brique', 'Chêne', 'Tuile plate', 'Torchis', 'Pierre (soubassement)', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile plate, forte pente contre l’humidité ambiante.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Soubassement en brique, étage à pans de bois et remplissage torchis.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois surélevé, protection contre l’humidité des sols sableux et humides.' },
      { n: 4, el: 'Structure porteuse', txt: 'Brique en soubassement, ossature bois de chêne local à l’étage.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, simple et étroit.' },
      { n: 6, el: 'Fondations', txt: 'Semelles brique ou pierre, adaptées aux sols sableux et humides.' },
    ],
    sections: [
      {
        title: 'Un habitat lié à l’eau',
        icon: 'ph ph-stack',
        intro: "La Sologne, pays d’étangs et de forêts, impose une construction adaptée à l’humidité des sols.",
        groups: [
          G(null, ['Soubassement surélevé contre l’humidité', 'Implantation proche des étangs et des bois', 'Économie forestière et cynégétique locale']),
        ],
      },
      {
        title: 'Brique & pans de bois',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Soubassement en brique de terre cuite locale', 'Étage à pans de bois de chêne', 'Remplissage en torchis ou briquette']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile plate de Sologne', 'Forte pente pour l’évacuation rapide des eaux', 'Lucarnes et souches de cheminée en brique']),
        ],
      },
    ],
  },

  {
    id: 'alsacienne',
    name: 'Maison alsacienne',
    region: 'Alsace · Grand Est',
    periode: '1450–1850',
    procede: 'Colombage',
    usage: 'Habitat rural et de bourg',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison à colombages polychromes typique des villages alsaciens, organisée autour d’une cour intérieure fleurie. La charpente apparente, peinte de couleurs vives, et la forte pente du toit de tuile témoignent d’un savoir-faire constructif ininterrompu depuis la fin du Moyen Âge.",
    identite: [
      ['Période', 'XVe–XIXe siècle'],
      ['Région', 'Alsace, Grand Est'],
      ['Usage', 'Habitat rural et de bourg viticole'],
      ['Système', 'Ossature bois + remplissage'],
      ['Matériau dominant', 'Chêne & torchis'],
      ['Toiture', 'Tuile plate, forte pente'],
      ['Particularité', 'Colombages polychromes, cour intérieure'],
    ],
    materiaux: ['Chêne', 'Torchis', 'Tuile plate', 'Pigments (colombages)', 'Pierre (soubassement)', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente à forte pente, couverture tuile plate, nombreuses lucarnes.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Colombages apparents peints, remplissage torchis ou brique, encorbellements.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois massif, encorbellement gagnant de la surface aux étages.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois de chêne, poteaux, sablières, décharges obliques.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, parfois en tourelle côté cour.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement en pierre ou grès, isolant le bois de l’humidité du sol.' },
    ],
    sections: [
      {
        title: 'Ossature bois & colombages',
        icon: 'ph ph-tree',
        intro: "Le colombage alsacien affiche un motif structurel très codifié : croix de Saint-André, décharges, sablières.",
        groups: [
          G(null, ['Poteaux et sablières de chêne équarri', 'Croix de Saint-André et décharges obliques', 'Remplissage en torchis ou briquette']),
          G('Décor', ['Colombages peints de couleurs vives selon les villages']),
        ],
      },
      {
        title: 'Cour & organisation',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Cour intérieure fleurie, cœur de la maison', 'Logis, grange et cellier autour de la cour', 'Puits ou fontaine au centre']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Forte pente pour l’évacuation de la neige', 'Couverture en tuile plate', 'Nombreuses lucarnes rampantes']),
        ],
      },
    ],
  },

  {
    id: 'lorraine',
    name: 'Maison lorraine',
    region: 'Lorraine · Grand Est',
    periode: '1600–1900',
    procede: 'Pierre calcaire',
    usage: 'Ferme-bloc, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme-bloc lorraine regroupant sous un même faîtage le logis, l’étable et la grange, desservis par une imposante porte charretière en plein cintre. La pierre calcaire locale et le plan compact répondent aux hivers rigoureux du plateau lorrain.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Lorraine, Grand Est'],
      ['Usage', 'Ferme-bloc, habitat rural'],
      ['Système', 'Murs porteurs en pierre calcaire'],
      ['Matériau dominant', 'Pierre calcaire locale'],
      ['Toiture', 'Tuile mécanique ou ardoise'],
      ['Particularité', 'Porte charretière monumentale en plein cintre'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Chêne', 'Tuile mécanique', 'Ardoise', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile mécanique ou ardoise, faîtage continu.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire appareillée, porte charretière en plein cintre monumentale.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois pour le logis, aire battue pour la grange attenante.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre calcaire regroupant logis, étable et grange.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en pierre ou bois desservant le logis.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, cave voûtée fréquente.' },
    ],
    sections: [
      {
        title: 'La ferme-bloc',
        icon: 'ph ph-grid-nine',
        intro: "Contrairement aux fermes à cour, la ferme lorraine réunit toutes les fonctions sous un seul et même toit.",
        groups: [
          G(null, ['Logis, étable et grange alignés sous un même faîtage', 'Porte charretière en plein cintre desservant la grange', 'Plan compact adapté au climat continental']),
        ],
      },
      {
        title: 'Murs en pierre calcaire',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire locale hourdée à la chaux', 'Encadrements de baies en pierre de taille', 'Peu d’ouvertures côté nord']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Charpente continue sur toute la longueur du bloc', 'Couverture tuile mécanique ou ardoise', 'Faible débord de toit']),
        ],
      },
    ],
  },

  {
    id: 'comtoise',
    name: 'Maison comtoise',
    region: 'Franche-Comté · Doubs',
    periode: '1600–1900',
    procede: 'Pierre',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Grande ferme comtoise en pierre, coiffée d’un large avant-toit protégeant le bois de chauffage et les circulations. Sa masse, son plan compact et sa cave voûtée à comté témoignent d’une économie agropastorale tournée vers l’élevage et le fromage.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Franche-Comté, Doubs'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire du Jura'],
      ['Toiture', 'Tuile ou tavaillon, large avant-toit'],
      ['Particularité', 'Cave voûtée pour l’affinage du comté'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Bois (charpente)', 'Tuile', 'Tavaillon', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois robuste, large avant-toit protégeant bois et circulations.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire locale, façade sobre, peu d’ouvertures.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois massif pour le logis et le grenier à fourrage.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre calcaire du Jura, plan compact.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en pierre ou bois massif.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, cave voûtée pour l’affinage des fromages.' },
    ],
    sections: [
      {
        title: 'Murs en pierre',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire du massif jurassien', 'Murs épais pour l’inertie thermique hivernale', 'Peu de percements en façade nord']),
        ],
      },
      {
        title: 'Le large avant-toit',
        icon: 'ph ph-house-line',
        intro: "L’avant-toit comtois, très débordant, protège le bois de chauffage stocké contre le mur.",
        groups: [
          G(null, ['Charpente débordante sur consoles de bois', 'Stockage du bois de chauffage à l’abri', 'Circulation protégée en pourtour de la ferme']),
        ],
      },
      {
        title: 'Cave & affinage',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Cave voûtée en pierre, fraîche et humide', 'Affinage traditionnel du comté', 'Accès direct depuis la cour de ferme']),
        ],
      },
    ],
  },

  {
    id: 'bressane',
    name: 'Ferme bressane',
    region: 'Bresse · Ain',
    periode: '1600–1900',
    procede: 'Colombage & torchis',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme bressane à pans de bois et torchis, reconnaissable à sa cheminée sarrasine pyramidale qui domine la toiture de tuile. Ce dispositif de fumage traditionnel, hérité des influences sarrasines, caractérise l’architecture rurale de la plaine bressane.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Bresse, Ain'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Ossature bois + remplissage'],
      ['Matériau dominant', 'Chêne & torchis'],
      ['Toiture', 'Tuile plate, faible pente'],
      ['Particularité', 'Cheminée sarrasine pyramidale'],
    ],
    materiaux: ['Chêne', 'Torchis', 'Tuile plate', 'Brique', 'Pierre (soubassement)', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile plate, cheminée sarrasine pyramidale émergente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pans de bois de chêne, remplissage torchis, galerie couverte fréquente.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois séparant logis et grenier à grain.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois de chêne, poteaux et sablières, contreventement par écharpes.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, simple, menant au grenier.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement en pierre ou brique isolant le bois du sol humide.' },
    ],
    sections: [
      {
        title: 'La cheminée sarrasine',
        icon: 'ph ph-house-line',
        intro: "Élément emblématique de la Bresse, la cheminée sarrasine surmonte le foyer et sert au fumage des salaisons et volailles.",
        groups: [
          G(null, ['Souche pyramidale en brique ou pan de bois', 'Fumoir intégré au-dessus du foyer', 'Silhouette caractéristique dominant les toits bressans']),
        ],
      },
      {
        title: 'Ossature bois & torchis',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Poteaux et sablières de chêne', 'Remplissage en torchis sur lattis', 'Galerie de bois couverte en façade']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Faible pente en tuile plate', 'Large débord protégeant les murs de torchis', 'Volumes bas caractéristiques de la plaine bressane']),
        ],
      },
    ],
  },

  {
    id: 'beauceronne',
    name: 'Ferme beauceronne',
    region: 'Beauce · Eure-et-Loir',
    periode: '1700–1950',
    procede: 'Pierre',
    usage: 'Ferme à cour, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Ferme à cour fermée de la plaine céréalière beauceronne, organisée autour d’un vaste corps de logis, d’étables et d’une grange immense accessible par un portail monumental. L’échelle des bâtiments reflète la richesse des grandes exploitations céréalières.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Beauce, Eure-et-Loir'],
      ['Usage', 'Ferme à cour, habitat rural'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire de Beauce'],
      ['Toiture', 'Tuile plate ou ardoise'],
      ['Particularité', 'Cour fermée, portail monumental'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Chêne', 'Tuile plate', 'Ardoise', 'Brique (chaînages)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois de grande portée, couverture tuile plate ou ardoise.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire, portail charretier monumental sur la cour.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois pour le logis, vastes greniers à grain au-dessus des granges.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre calcaire, grange à charpente de grande portée.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en pierre ou bois desservant le logis.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, caves voûtées sous le logis.' },
    ],
    sections: [
      {
        title: 'La cour fermée',
        icon: 'ph ph-grid-nine',
        intro: "Le plan en cour fermée organise logis, étables et grange autour d’un espace central clos.",
        groups: [
          G(null, ['Portail charretier monumental en pierre', 'Logis, étables et grange autour de la cour', 'Fumière et puits au centre de la cour']),
        ],
      },
      {
        title: 'La grange céréalière',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Charpente de très grande portée', 'Vastes volumes pour le stockage du grain', 'Aire de battage traditionnelle']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile plate ou ardoise selon les secteurs', 'Grandes surfaces de toiture peu pentées', 'Lucarnes de grenier nombreuses']),
        ],
      },
    ],
  },

  {
    id: 'bourbonnaise',
    name: 'Ferme bourbonnaise',
    region: 'Bourbonnais · Allier',
    periode: '1600–1900',
    procede: 'Pierre',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme à cour du Bourbonnais, en pierre et brique locale, associant polyculture et élevage bovin dans une région de transition entre le Massif central et le Bassin parisien. Toiture à faible pente couverte de tuile plate bourbonnaise.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Bourbonnais, Allier'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre et brique locale'],
      ['Toiture', 'Tuile plate bourbonnaise, faible pente'],
      ['Particularité', 'Économie mixte polyculture-élevage'],
    ],
    materiaux: ['Pierre', 'Brique', 'Chaux', 'Chêne', 'Tuile plate', 'Torchis'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile plate bourbonnaise, faible pente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre et brique locale associées, chaînages d’angle en brique.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, grenier à fourrage au-dessus des étables.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs mixtes pierre et brique, plan à cour ouverte.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, sobre.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, peu profondes.' },
    ],
    sections: [
      {
        title: 'Murs mixtes pierre et brique',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre locale en moellons', 'Chaînages et encadrements en brique', 'Enduit à la chaux en finition']),
        ],
      },
      {
        title: 'Organisation agricole',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Cour ouverte desservant logis et bâtiments d’élevage', 'Étables pour l’élevage bovin bourbonnais', 'Grange et fenil attenants']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile plate bourbonnaise', 'Faible pente caractéristique', 'Souches de cheminée en brique']),
        ],
      },
    ],
  },

  {
    id: 'fermenormande',
    name: 'Ferme normande',
    region: "Normandie · Pays d'Auge",
    periode: '1600–1900',
    procede: 'Colombage',
    usage: 'Ferme, habitat rural (cour-masure)',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme normande organisée en cour-masure : bâtiments à pans de bois et torchis disposés autour d’une cour plantée de pommiers, entourée d’un talus planté protégeant du vent. Une architecture indissociable du bocage et de la tradition cidricole.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Normandie, Pays d’Auge'],
      ['Usage', 'Ferme, habitat rural (cour-masure)'],
      ['Système', 'Ossature bois + remplissage'],
      ['Matériau dominant', 'Chêne & torchis'],
      ['Toiture', 'Chaume ou tuile, forte pente'],
      ['Particularité', 'Cour-masure plantée de pommiers'],
    ],
    materiaux: ['Chêne', 'Torchis', 'Chaume', 'Tuile', 'Pierre (soubassement)', 'Brique (chaînages)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture chaume ou tuile, forte pente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pans de bois de chêne, remplissage torchis, essentage de tuile parfois.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, plancher haut réservé au stockage du foin ou des pommes.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois de chêne, poteaux, sablières, décharges de contreventement.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en bois ou meunier vers le grenier.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement en silex ou pierre, isolant le bois de l’humidité.' },
    ],
    sections: [
      {
        title: 'La cour-masure',
        icon: 'ph ph-grid-nine',
        intro: "Le talus planté d’arbres qui ceinture la cour-masure protège bâtiments et vergers des vents du bocage.",
        groups: [
          G(null, ['Talus boisé en pourtour de la parcelle', 'Pommiers pour la production cidricole', 'Bâtiments dispersés autour de la cour']),
        ],
      },
      {
        title: 'Ossature bois & torchis',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Poteaux et sablières de chêne équarri', 'Remplissage en torchis sur clayonnage', 'Essentage de tuile ou d’ardoise en protection']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Chaume traditionnel ou tuile selon les secteurs', 'Forte pente pour l’écoulement des pluies', 'Faîtage arrondi typique du chaume normand']),
        ],
      },
    ],
  },

  {
    id: 'auvergnate',
    name: 'Ferme auvergnate',
    region: 'Auvergne · Puy-de-Dôme',
    periode: '1600–1900',
    procede: 'Pierre volcanique',
    usage: 'Ferme-bloc, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Ferme-bloc du plateau volcanique auvergnat, bâtie en basalte sombre et arkose, couverte de lauzes ou de chaume épais pour résister aux hivers rigoureux. Logis et étable communiquent souvent directement, la chaleur animale participant au chauffage du logis.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Auvergne, Puy-de-Dôme'],
      ['Usage', 'Ferme-bloc, habitat rural'],
      ['Système', 'Murs porteurs en pierre volcanique'],
      ['Matériau dominant', 'Basalte & arkose'],
      ['Toiture', 'Lauze ou chaume épais'],
      ['Particularité', 'Logis et étable communicants'],
    ],
    materiaux: ['Basalte', 'Arkose', 'Chaux', 'Bois (charpente)', 'Lauze', 'Chaume'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente robuste, couverture en lauze de basalte ou chaume très épais.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Basalte sombre et arkose en moellons, ouvertures réduites.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois massif, grenier à foin isolant sous la toiture.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs très épais en pierre volcanique, forte inertie thermique.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en pierre menant au logis surélevé.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le socle volcanique, semelles peu profondes.' },
    ],
    sections: [
      {
        title: 'Murs en pierre volcanique',
        icon: 'ph ph-wall',
        intro: "Le basalte, sombre et dense, confère à la ferme auvergnate son inertie thermique caractéristique.",
        groups: [
          G(null, ['Basalte et arkose en moellons appareillés', 'Murs très épais pour l’isolation hivernale', 'Peu d’ouvertures, orientées à l’abri du vent']),
        ],
      },
      {
        title: 'Logis et étable communicants',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Logis surélevé au-dessus de l’étable', 'Chaleur animale contribuant au chauffage', 'Accès direct entre les deux espaces']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Lauzes de basalte, très lourdes', 'Charpente surdimensionnée pour porter la couverture', 'Chaume épais en alternative selon les secteurs']),
        ],
      },
    ],
  },

  {
    id: 'cevenole',
    name: 'Maison cévenole',
    region: 'Cévennes · Gard',
    periode: '1600–1900',
    procede: 'Schiste',
    usage: 'Habitat rural de pente',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison de pente cévenole bâtie en schiste local sur les terrasses de culture (bancels), liée à l’économie de la châtaigne et à la sériciculture. Toiture de lauzes de schiste ou de tuile canal, façades étroites adaptées au relief escarpé.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Cévennes, Gard'],
      ['Usage', 'Habitat rural de pente'],
      ['Système', 'Murs porteurs en schiste'],
      ['Matériau dominant', 'Schiste local'],
      ['Toiture', 'Lauzes de schiste ou tuile canal'],
      ['Particularité', 'Implantation en terrasses (bancels)'],
    ],
    materiaux: ['Schiste', 'Chaux', 'Châtaignier', 'Lauze', 'Tuile canal', 'Pierre sèche (terrasses)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente châtaignier, couverture lauzes de schiste ou tuile canal.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Schiste local en moellons, façades étroites adossées à la pente.' },
      { n: 3, el: 'Planchers', txt: 'Solivage châtaignier, étage de magnanerie pour l’élevage du ver à soie.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en schiste, construction étagée sur la pente.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en pierre reliant les niveaux étagés.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage sur le rocher schisteux, terrasses de soutènement en pierre sèche.' },
    ],
    sections: [
      {
        title: 'Implantation en terrasses',
        icon: 'ph ph-stack',
        intro: "Les bancels, terrasses de pierre sèche, permettent l’implantation de la maison et des cultures sur les pentes cévenoles.",
        groups: [
          G(null, ['Terrasses de soutènement en pierre sèche', 'Maison étagée épousant la déclivité', 'Châtaigneraies et vignes en restanques']),
        ],
      },
      {
        title: 'Murs en schiste',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Schiste local hourdé à la chaux', 'Façades étroites, peu d’ouvertures', 'Chaînages d’angle plus soignés']),
        ],
      },
      {
        title: 'Magnanerie & toiture',
        icon: 'ph ph-house-line',
        groups: [
          G('Toiture', ['Lauzes de schiste ou tuile canal', 'Charpente en châtaignier local']),
          G('Magnanerie', ['Étage aéré dédié à l’élevage du ver à soie', 'Liée à l’économie textile cévenole du XIXe siècle']),
        ],
      },
    ],
  },

  {
    id: 'quercynoise',
    name: 'Maison quercynoise',
    region: 'Quercy · Lot',
    periode: '1600–1900',
    procede: 'Calcaire',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison du causse quercynois en pierre calcaire blonde, couverte de lauzes calcaires à faible pente ou de tuile canal. Le pigeonnier, souvent intégré ou isolé, signale la richesse agricole de l’exploitation.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Quercy, Lot'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en calcaire'],
      ['Matériau dominant', 'Calcaire blond du causse'],
      ['Toiture', 'Lauzes calcaires ou tuile canal'],
      ['Particularité', 'Pigeonnier caractéristique'],
    ],
    materiaux: ['Calcaire', 'Chaux', 'Chêne', 'Lauze calcaire', 'Tuile canal', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois massive, couverture lauzes calcaires ou tuile canal.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Calcaire blond du causse, encadrements de baies en pierre de taille.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, voûtes en berceau fréquentes au rez-de-chaussée.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en calcaire, pigeonnier intégré ou en tour isolée.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en pierre menant au logis surélevé.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le causse calcaire, caves voûtées.' },
    ],
    sections: [
      {
        title: 'Murs en calcaire du causse',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Calcaire blond local hourdé à la chaux', 'Encadrements de baies en pierre de taille', 'Voûtes en berceau au rez-de-chaussée (celliers)']),
        ],
      },
      {
        title: 'Le pigeonnier',
        icon: 'ph ph-buildings',
        intro: "Signe de richesse agricole, le pigeonnier fournissait la fiente utilisée comme engrais sur les terres du causse.",
        groups: [
          G(null, ['Tour isolée ou intégrée à la façade', 'Boulins en pierre ou terre cuite', 'Génoise ou corniche protégeant l’accès des rapaces']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Lauzes calcaires à faible pente', 'Tuile canal en alternative plus légère', 'Charpente surdimensionnée pour porter la lauze']),
        ],
      },
    ],
  },

  {
    id: 'perigourdine',
    name: 'Maison périgourdine',
    region: 'Périgord · Dordogne',
    periode: '1500–1900',
    procede: 'Pierre',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison du Périgord en pierre calcaire dorée, couverte de lauzes calcaires à forte pente ou de tuile canal. Tourelles, pigeonniers et toits complexes composent une silhouette caractéristique de la vallée de la Dordogne.",
    identite: [
      ['Période', 'XVIe–XIXe siècle'],
      ['Région', 'Périgord, Dordogne'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en pierre calcaire'],
      ['Matériau dominant', 'Pierre calcaire dorée du Périgord'],
      ['Toiture', 'Lauzes calcaires ou tuile canal'],
      ['Particularité', 'Tourelles et pigeonniers'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Chêne', 'Lauze calcaire', 'Tuile canal', 'Noyer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois complexe, couverture lauzes calcaires à forte pente ou tuile canal.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire dorée appareillée, tourelles d’escalier fréquentes.' },
      { n: 3, el: 'Planchers', txt: 'Solivage chêne, voûtes en berceau au rez-de-chaussée.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre calcaire, volumes composites accolés.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en tourelle, vis de pierre desservant les étages.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, caves voûtées fréquentes.' },
    ],
    sections: [
      {
        title: 'Murs en pierre dorée',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire dorée du Périgord', 'Appareillage soigné en façade principale', 'Tourelles d’escalier en encorbellement']),
        ],
      },
      {
        title: 'Toiture complexe',
        icon: 'ph ph-house-line',
        intro: "La toiture périgourdine, souvent à plusieurs pans et croupes, adapte sa pente à la lourdeur de la lauze.",
        groups: [
          G(null, ['Lauzes calcaires très pentues et lourdes', 'Charpente surdimensionnée en chêne', 'Tuile canal en couverture secondaire ou de remplacement']),
        ],
      },
      {
        title: 'Pigeonnier & dépendances',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Pigeonnier en tour ou sur pilier', 'Séchoir à tabac ou à noix attenant', 'Cour ou terrasse dominant la vallée']),
        ],
      },
    ],
  },

  {
    id: 'charentaise',
    name: 'Maison charentaise',
    region: 'Charente · Nouvelle-Aquitaine',
    periode: '1600–1900',
    procede: 'Pierre',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison charentaise en pierre de taille calcaire blanche, couverte de tuile canal et ornée d’une génoise en corniche d’influence méridionale. Souvent liée au vignoble et à la production de cognac, elle associe logis et chai.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Charente, Nouvelle-Aquitaine'],
      ['Usage', 'Ferme, habitat rural viticole'],
      ['Système', 'Murs porteurs en pierre calcaire'],
      ['Matériau dominant', 'Pierre de taille calcaire blanche'],
      ['Toiture', 'Tuile canal'],
      ['Particularité', 'Génoise en corniche, chai attenant'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Chêne', 'Tuile canal', 'Fer forgé', 'Verre (chai)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile canal, génoise en débord de rive.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille calcaire blanche, encadrements soignés.' },
      { n: 3, el: 'Planchers', txt: 'Solivage chêne, chai voûté ou de plain-pied attenant au logis.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre calcaire, logis et chai accolés.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en pierre ou bois, sobre.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, caves voûtées pour le vieillissement.' },
    ],
    sections: [
      {
        title: 'Murs en pierre blanche',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre de taille calcaire locale', 'Génoise (double ou triple rang de tuiles) en corniche', 'Encadrements de baies soignés']),
        ],
      },
      {
        title: 'Logis & chai',
        icon: 'ph ph-grid-nine',
        intro: "L’économie viticole charentaise associe étroitement l’habitat et les bâtiments de production du cognac.",
        groups: [
          G(null, ['Chai attenant ou en vis-à-vis du logis', 'Caves voûtées pour le vieillissement en fût', 'Cour desservant logis, chai et cellier']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile canal à faible pente', 'Génoise éloignant les eaux de pluie du mur', 'Lucarnes discrètes']),
        ],
      },
    ],
  },

  {
    id: 'landaise',
    name: 'Maison landaise',
    region: 'Landes · Nouvelle-Aquitaine',
    periode: '1600–1900',
    procede: 'Bois',
    usage: 'Ferme, habitat rural (airial)',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison landaise à structure de poteaux de pin maritime, implantée sur l’airial, clairière herbeuse ombragée par les chênes au milieu de la forêt de pins. L’avant-toit débordant sur poteaux abrite la circulation et le matériel agricole.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Landes, Nouvelle-Aquitaine'],
      ['Usage', 'Ferme, habitat rural (airial)'],
      ['Système', 'Ossature bois sur poteaux'],
      ['Matériau dominant', 'Pin des Landes'],
      ['Toiture', 'Tuile plate, faible pente'],
      ['Particularité', 'Implantation sur airial boisé'],
    ],
    materiaux: ['Pin maritime', 'Chêne', 'Torchis', 'Tuile plate', 'Pierre (soubassement)', 'Argile'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente pin, couverture tuile plate, faible pente, large avant-toit.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Structure de poteaux de pin, remplissage torchis ou bois.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, plancher haut pour le stockage du fourrage.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux de pin maritime porteurs, avant-toit sur poteaux avancés.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, simple.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre ou galets, sol sableux landais.' },
    ],
    sections: [
      {
        title: 'L’airial',
        icon: 'ph ph-tree',
        intro: "L’airial, clairière ombragée de chênes au sein de la forêt de pins, structure l’habitat dispersé landais.",
        groups: [
          G(null, ['Clairière herbeuse plantée de chênes', 'Bâtiments dispersés autour de l’airial', 'Forêt de pins maritimes en pourtour']),
        ],
      },
      {
        title: 'Structure en pin',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Poteaux de pin maritime équarris', 'Remplissage en torchis ou planches', 'Avant-toit débordant sur poteaux avancés']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile plate à faible pente', 'Large débord protégeant hommes et matériel', 'Volumes bas et allongés']),
        ],
      },
    ],
  },

  {
    id: 'bearnaise',
    name: 'Maison béarnaise',
    region: 'Béarn · Pyrénées-Atlantiques',
    periode: '1600–1900',
    procede: 'Galets',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison béarnaise du piémont pyrénéen bâtie en galets de gave, associés à des chaînages de brique ou de pierre de taille. Toiture à forte pente en ardoise ou tuile, typique des vallées où les rivières fournissent la matière première.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Béarn, Pyrénées-Atlantiques'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en galets'],
      ['Matériau dominant', 'Galets de gave'],
      ['Toiture', 'Ardoise ou tuile, forte pente'],
      ['Particularité', 'Chaînages de brique ou pierre de taille'],
    ],
    materiaux: ['Galets', 'Brique (chaînages)', 'Chaux', 'Chêne', 'Ardoise', 'Tuile'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture ardoise ou tuile, forte pente pyrénéenne.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Galets de gave assemblés, chaînages d’angle en brique ou pierre de taille.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, plancher haut pour le fourrage.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en galets hourdés à la chaux, chaînages structurels.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois ou pierre.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en galets ou pierre, ancrées sur les terrasses alluviales.' },
    ],
    sections: [
      {
        title: 'Murs en galets',
        icon: 'ph ph-wall',
        intro: "Les galets ronds du gave, difficiles à appareiller seuls, sont toujours associés à des chaînages rigides.",
        groups: [
          G(null, ['Galets de rivière assemblés au mortier de chaux', 'Chaînages d’angle en brique ou pierre de taille', 'Encadrements de baies en pierre']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Forte pente pyrénéenne en ardoise ou tuile', 'Charpente bois traditionnelle', 'Débord modéré protégeant les murs']),
        ],
      },
      {
        title: 'Organisation rurale',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Logis et étable sous le même volume ou accolés', 'Cour desservant les dépendances agricoles', 'Implantation en piémont, proche des gaves']),
        ],
      },
    ],
  },

  {
    id: 'savoyarde',
    name: 'Maison savoyarde',
    region: 'Savoie · Alpes',
    periode: '1600–1950',
    procede: 'Pierre & bois',
    usage: 'Ferme de vallée, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Ferme de vallée savoyarde associant un rez-de-chaussée en pierre et un étage en pans de bois ou bardage, prolongé de larges galeries de bois. Moins haute en altitude que le chalet d’alpage, elle regroupe logis et exploitation agricole dans un même volume.",
    identite: [
      ['Période', 'XVIIe–XXe siècle'],
      ['Région', 'Savoie, Alpes'],
      ['Usage', 'Ferme de vallée, habitat rural'],
      ['Système', 'Soubassement pierre + étage bois'],
      ['Matériau dominant', 'Pierre & bois local'],
      ['Toiture', 'Tuile écaille ou ardoise'],
      ['Particularité', 'Larges galeries de bois en façade'],
    ],
    materiaux: ['Pierre locale', 'Épicéa', 'Mélèze', 'Tuile écaille', 'Ardoise', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile écaille ou ardoise, pente modérée.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Soubassement en pierre, étage en pans de bois ou bardage, galeries en façade.' },
      { n: 3, el: 'Planchers', txt: 'Plancher bois posé sur solives, isolant les niveaux d’habitation.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs en pierre au rez-de-chaussée, ossature bois à l’étage.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur en bois desservant la galerie et l’étage.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement massif en pierre, adapté au terrain de vallée.' },
    ],
    sections: [
      {
        title: 'Soubassement en pierre',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Murs en pierre locale au rez-de-chaussée', 'Étable et cave protégées du froid', 'Encadrements de baies en pierre de taille']),
        ],
      },
      {
        title: 'Étage en bois & galeries',
        icon: 'ph ph-tree',
        intro: "Les larges galeries de bois, souvent sur plusieurs niveaux, servent au séchage du foin et à la circulation.",
        groups: [
          G(null, ['Bardage ou pans de bois à l’étage', 'Galeries de bois filantes en façade', 'Balcons sculptés selon les vallées']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Tuile écaille ou ardoise selon l’altitude', 'Pente modérée, moins forte qu’en haute montagne', 'Larges débords protégeant les galeries']),
        ],
      },
    ],
  },

  {
    id: 'jurassienne',
    name: 'Maison jurassienne',
    region: 'Jura · Haut-Doubs',
    periode: '1700–1950',
    procede: 'Pierre',
    usage: 'Ferme, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Grande ferme du Haut-Doubs organisée autour du tuyé, vaste cheminée pyramidale en charpente de bois qui domine le volume et sert traditionnellement au fumage des salaisons. Le large avant-toit protège le bois de chauffage des rigueurs de l’hiver jurassien.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Jura, Haut-Doubs'],
      ['Usage', 'Ferme, habitat rural'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire du Jura'],
      ['Toiture', 'Tavaillon ou tuile, large avant-toit'],
      ['Particularité', 'Tuyé : cheminée pyramidale de fumage'],
    ],
    materiaux: ['Pierre calcaire', 'Sapin', 'Chaux', 'Tavaillon', 'Tuile', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois massive, large avant-toit, couverture tavaillon ou tuile.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire du Jura, façade sobre, tuyé émergent au faîtage.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois massif, grenier à fourrage vaste.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, charpente pyramidale du tuyé au centre du bâtiment.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois massif.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre calcaire, cave voûtée pour l’affinage.' },
    ],
    sections: [
      {
        title: 'Le tuyé',
        icon: 'ph ph-mountains',
        intro: "Le tuyé, immense cheminée-charpente pyramidale, structure le cœur de la ferme et sert au fumage des salaisons.",
        groups: [
          G(null, ['Charpente pyramidale en sapin au-dessus du foyer', 'Fumage traditionnel des salaisons et jambons', 'Élément architectural emblématique du Haut-Doubs']),
        ],
      },
      {
        title: 'Murs en pierre',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire locale hourdée à la chaux', 'Murs épais pour l’inertie thermique hivernale', 'Peu d’ouvertures côté nord']),
        ],
      },
      {
        title: 'Large avant-toit',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Charpente débordante protégeant le bois de chauffage', 'Couverture en tavaillon ou tuile', 'Circulation abritée en pourtour de la ferme']),
        ],
      },
    ],
  },

  {
    id: 'vosgienne',
    name: 'Maison vosgienne',
    region: 'Vosges · Grand Est',
    periode: '1700–1950',
    procede: 'Grès',
    usage: 'Ferme-bloc, habitat rural',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Maison-bloc vosgienne en grès rose local, réunissant logis, étable et grange sous un même faîtage à forte pente. La toiture d’ardoise ou de tavaillon, très inclinée, répond aux hivers neigeux du massif vosgien.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Vosges, Grand Est'],
      ['Usage', 'Ferme-bloc, habitat rural'],
      ['Système', 'Murs porteurs en grès'],
      ['Matériau dominant', 'Grès rose des Vosges'],
      ['Toiture', 'Ardoise ou tavaillon, forte pente'],
      ['Particularité', 'Ferme-bloc adaptée aux hivers neigeux'],
    ],
    materiaux: ['Grès', 'Chaux', 'Sapin', 'Ardoise', 'Tavaillon', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente sapin, couverture ardoise ou tavaillon, forte pente anti-neige.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Grès rose des Vosges appareillé, encadrements de baies soignés.' },
      { n: 3, el: 'Planchers', txt: 'Solivage sapin, grenier à fourrage isolant sous la toiture.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en grès, logis, étable et grange réunis sous un même toit.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois massif.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en grès, ancrées sur le socle vosgien.' },
    ],
    sections: [
      {
        title: 'La ferme-bloc vosgienne',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Logis, étable et grange sous un même faîtage', 'Plan compact limitant les déperditions de chaleur', 'Accès couvert entre les différentes fonctions']),
        ],
      },
      {
        title: 'Murs en grès',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Grès rose local appareillé', 'Murs épais pour l’inertie hivernale', 'Enduit partiel ou pierre apparente selon les secteurs']),
        ],
      },
      {
        title: 'Toiture anti-neige',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Forte pente pour l’évacuation rapide de la neige', 'Couverture ardoise ou tavaillon de sapin', 'Charpente renforcée pour la surcharge neigeuse']),
        ],
      },
    ],
  },

  {
    id: 'buron',
    name: 'Buron',
    region: 'Aubrac · Cantal',
    periode: '1700–1950',
    procede: 'Pierre sèche',
    usage: "Buron, bâtiment pastoral d'estive",
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Cabane pastorale d’estive du plateau de l’Aubrac, bâtie en pierre sèche ou hourdée à la terre, utilisée durant la transhumance estivale pour la traite et la fabrication du fromage (laguiole, cantal). Toiture très épaisse en lauzes ou en chaume pour affronter le climat rude du plateau.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Aubrac, Cantal'],
      ['Usage', "Buron, bâtiment pastoral d'estive"],
      ['Système', 'Murs porteurs en pierre sèche'],
      ['Matériau dominant', 'Pierre volcanique de l’Aubrac'],
      ['Toiture', 'Lauze ou chaume très épais'],
      ['Particularité', 'Fabrication fromagère durant l’estive'],
    ],
    materiaux: ['Pierre volcanique', 'Terre (hourdage)', 'Bois (charpente)', 'Lauze', 'Chaume', 'Genêt'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois robuste, couverture lauze ou chaume très épais.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre volcanique sèche ou hourdée à la terre, très peu d’ouvertures.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue ou dallage de pierre, cave à fromage attenante.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en pierre sèche, résistant au vent du plateau.' },
      { n: 5, el: 'Escalier', txt: 'Pas d’étage la plupart du temps ; simple accès de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le socle volcanique de l’Aubrac.' },
    ],
    sections: [
      {
        title: 'Un bâtiment de la transhumance',
        icon: 'ph ph-mountains',
        intro: "Le buron accueille chaque été les buronniers venus fabriquer le fromage sur l’estive du plateau de l’Aubrac.",
        groups: [
          G(null, ['Occupation saisonnière durant l’estive', 'Salle de fabrication fromagère (cantalès)', 'Cave d’affinage attenante ou en sous-sol']),
        ],
      },
      {
        title: 'Murs en pierre sèche',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre volcanique locale assemblée sans mortier ou à la terre', 'Murs très épais contre le vent et le froid', 'Peu ou pas d’ouvertures']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Lauze de pierre volcanique très lourde', 'Chaume de genêt en alternative traditionnelle', 'Charpente surdimensionnée pour porter la couverture']),
        ],
      },
    ],
  },

  {
    id: 'mazet',
    name: 'Mazet cévenol',
    region: 'Cévennes · Gard',
    periode: '1700–1900',
    procede: 'Pierre sèche',
    usage: 'Abri agricole en pierre sèche',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petit abri agricole en pierre sèche des terrasses (bancels) cévenoles, lié à la culture de la châtaigne et à la viticulture de pente. Le mazet servait au rangement des outils et à l’abri temporaire du vigneron ou du châtaigneraie.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Cévennes, Gard'],
      ['Usage', 'Abri agricole en pierre sèche'],
      ['Système', 'Murs et voûte en pierre sèche'],
      ['Matériau dominant', 'Schiste ou granite local'],
      ['Toiture', 'Voûte ou dalle de pierre'],
      ['Particularité', 'Construction sans mortier, en terrasses'],
    ],
    materiaux: ['Schiste', 'Granite', 'Pierre sèche', 'Terre (sol)', 'Bois (rare)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Voûte ou dalle de pierre sèche, parfois recouverte de terre.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre sèche assemblée sans mortier, une seule ouverture basse.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue ou pierre, volume unique de petite taille.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs épais en pierre sèche portant une voûte en encorbellement.' },
      { n: 5, el: 'Escalier', txt: 'Sans étage ; simple accès de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur la terrasse (bancel) de pierre sèche.' },
    ],
    sections: [
      {
        title: 'Une architecture des terrasses',
        icon: 'ph ph-stack',
        intro: "Le mazet se niche au cœur des bancels, terrasses de culture soutenues par des murets de pierre sèche.",
        groups: [
          G(null, ['Implanté au sein des terrasses cultivées', 'Lié à la châtaigneraie ou à la vigne de pente', 'Petit volume, usage temporaire ou de stockage']),
        ],
      },
      {
        title: 'Construction en pierre sèche',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Assemblage sans mortier, pierre sur pierre', 'Voûte en encorbellement pour la couverture', 'Savoir-faire transmis de génération en génération']),
        ],
      },
      {
        title: 'Usage agricole',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Rangement des outils de culture', 'Abri temporaire pour le travailleur agricole', 'Parfois utilisé pour le séchage des châtaignes']),
        ],
      },
    ],
  },

  {
    id: 'borie',
    name: 'Borie',
    region: 'Provence · Vaucluse',
    periode: '1700–1900',
    procede: 'Pierre sèche',
    usage: 'Cabane agricole ou pastorale',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Cabane provençale en pierre sèche à voûte en encorbellement, sans mortier ni charpente, célèbre dans le village des Bories près de Gordes. Utilisée comme abri agricole, bergerie ou habitat saisonnier, elle illustre un art constructif millénaire.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Provence, Vaucluse'],
      ['Usage', 'Cabane agricole ou pastorale'],
      ['Système', 'Voûte en encorbellement, pierre sèche'],
      ['Matériau dominant', 'Calcaire local'],
      ['Toiture', 'Voûte de pierre en encorbellement'],
      ['Particularité', 'Aucun mortier, aucune charpente'],
    ],
    materiaux: ['Calcaire', 'Pierre sèche', 'Terre (sol)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Voûte en encorbellement de pierre sèche, sans charpente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de calcaire assemblés sans mortier, ouverture unique basse.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue ou pierre, volume circulaire ou ovale unique.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs épais portant directement la voûte en pierre sèche.' },
      { n: 5, el: 'Escalier', txt: 'Aucun étage ; construction de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le sol calcaire, sans fondation creusée.' },
    ],
    sections: [
      {
        title: 'La voûte en encorbellement',
        icon: 'ph ph-stack',
        intro: "Chaque assise de pierre déborde légèrement sur la précédente, refermant progressivement la voûte sans aucun support.",
        groups: [
          G(null, ['Pierres plates posées en assises successives', 'Encorbellement progressif jusqu’à la clé de voûte', 'Aucun mortier, aucune charpente nécessaire']),
        ],
      },
      {
        title: 'Un art constructif ancestral',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Savoir-faire transmis depuis l’Antiquité', 'Pierre calcaire locale extraite à l’épierrement des champs', 'Regroupement en hameaux de bories (Gordes)']),
        ],
      },
      {
        title: 'Usages',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Abri de berger ou de vigneron', 'Bergerie temporaire', 'Stockage d’outils et de récoltes']),
        ],
      },
    ],
  },

  {
    id: 'capitelle',
    name: 'Capitelle',
    region: 'Languedoc · Hérault',
    periode: '1700–1900',
    procede: 'Pierre sèche',
    usage: 'Cabane de vigne',
    categorie: 'rural',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petite cabane de vigne languedocienne en pierre sèche, cousine de la borie provençale, édifiée par épierrement au milieu des parcelles de garrigue. Elle abritait les outils du vigneron et offrait un abri temporaire lors des travaux de la vigne.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Languedoc, Hérault'],
      ['Usage', 'Cabane de vigne'],
      ['Système', 'Voûte en encorbellement, pierre sèche'],
      ['Matériau dominant', 'Calcaire de garrigue'],
      ['Toiture', 'Voûte de pierre en encorbellement'],
      ['Particularité', 'Construite par épierrement des parcelles'],
    ],
    materiaux: ['Calcaire', 'Pierre sèche', 'Terre (sol)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Voûte en encorbellement de pierre sèche, étanche sans aucune charpente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de calcaire de garrigue assemblés sans mortier.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue, volume unique de petite taille.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs épais portant directement la voûte en pierre sèche.' },
      { n: 5, el: 'Escalier', txt: 'Aucun étage ; construction de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le sol de garrigue, sans fondation creusée.' },
    ],
    sections: [
      {
        title: 'Née de l’épierrement',
        icon: 'ph ph-stack',
        intro: "La capitelle recycle les pierres extraites lors de la mise en culture des parcelles de garrigue.",
        groups: [
          G(null, ['Pierres issues de l’épierrement des vignes environnantes', 'Implantation au milieu ou en bordure de parcelle', 'Petit volume circulaire ou carré']),
        ],
      },
      {
        title: 'Construction en pierre sèche',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Assises successives en encorbellement', 'Aucun mortier, assemblage par simple gravité', 'Parenté directe avec la borie provençale']),
        ],
      },
      {
        title: 'Usage viticole',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Abri des outils de la vigne', 'Refuge temporaire lors des travaux ou des orages', 'Repère du parcellaire viticole traditionnel']),
        ],
      },
    ],
  },

  {
    id: 'maisondeville18e',
    name: 'Maison de ville XVIIIe',
    region: 'Centres historiques · France',
    periode: '1700–1800',
    procede: 'Pierre',
    usage: 'Maison de ville, habitat urbain',
    categorie: 'urbain',
    periodeTags: ['Avant 1800'],
    resume:
      "Maison de ville classique du XVIIIe siècle, à la façade ordonnancée en pierre de taille, implantée entre cour et jardin selon le modèle classique français. Toiture à la Mansart en ardoise, fenêtres à petits carreaux et ferronneries élégantes composent une architecture urbaine sobre et régulière.",
    identite: [
      ['Période', 'XVIIIe siècle'],
      ['Région', 'Centres historiques, France'],
      ['Usage', 'Maison de ville, habitat urbain'],
      ['Système', 'Murs porteurs en pierre de taille'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Toiture', 'Ardoise à la Mansart'],
      ['Plan', 'Entre cour et jardin'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Chêne', 'Ardoise', 'Fer forgé', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture ardoise, brisis à la Mansart et lucarnes régulières.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille appareillée, façade ordonnancée, ferronneries de balcon.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, parquet dans les pièces de réception.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre de taille, plan classique entre cour et jardin.' },
      { n: 5, el: 'Escalier', txt: 'Escalier d’honneur en pierre, rampe en fer forgé.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, caves voûtées fréquentes.' },
    ],
    sections: [
      {
        title: 'Composition classique de la façade',
        icon: 'ph ph-columns',
        intro: "La façade obéit à une ordonnance très codifiée : travées régulières, alignement strict des baies, corniche filante.",
        groups: [
          G(null, ['Travées régulières et symétriques', 'Encadrements de baies en pierre de taille', 'Corniche filante en couronnement']),
        ],
      },
      {
        title: 'Murs en pierre de taille',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre de taille calcaire appareillée', 'Chaînages harmoniques en façade', 'Enduit pierre apparente selon les villes']),
        ],
      },
      {
        title: 'Toiture à la Mansart',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Brisis et terrasson caractéristiques', 'Couverture en ardoise', 'Lucarnes à fronton régulièrement disposées']),
        ],
      },
    ],
  },

  {
    id: 'hotelparticulier',
    name: 'Hôtel particulier',
    region: 'Grandes villes · France',
    periode: '1600–1900',
    procede: 'Pierre',
    usage: 'Hôtel particulier, résidence urbaine',
    categorie: 'urbain',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Vaste demeure urbaine aristocratique ou bourgeoise organisée entre cour d’honneur et jardin, avec corps de logis principal, ailes en retour et portail cocher monumental. Symbole de prestige social, l’hôtel particulier réunit réception, habitation et communs dans une composition classique très codifiée.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Grandes villes, France'],
      ['Usage', 'Hôtel particulier, résidence urbaine'],
      ['Système', 'Murs porteurs en pierre de taille'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Cour d’honneur + jardin'],
      ['Particularité', 'Portail cocher monumental'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Chêne', 'Ardoise', 'Fer forgé', 'Marbre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois complexe, couverture ardoise, combles à la Mansart fréquents.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille sur cour, décor sculpté, portail cocher monumental.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, parquets et plafonds ornés dans les pièces de réception.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre de taille, corps de logis et ailes en retour.' },
      { n: 5, el: 'Escalier', txt: 'Escalier d’honneur monumental en pierre, rampe en fer forgé ouvragée.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, caves voûtées étendues sous la cour.' },
    ],
    sections: [
      {
        title: 'Entre cour et jardin',
        icon: 'ph ph-grid-nine',
        intro: "Le plan classique organise la parcelle entre une cour d’honneur côté rue et un jardin à l’arrière.",
        groups: [
          G(null, ['Cour d’honneur desservie par un portail cocher', 'Corps de logis principal en fond de cour', 'Ailes en retour abritant communs et écuries']),
        ],
      },
      {
        title: 'Murs en pierre de taille',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre de taille finement appareillée', 'Décor sculpté : frontons, refends, mascarons', 'Façade sur jardin souvent plus sobre']),
        ],
      },
      {
        title: 'Escalier d’honneur',
        icon: 'ph ph-steps',
        groups: [
          G(null, ['Escalier monumental en pierre', 'Rampe en fer forgé richement ouvragée', 'Distribution des salons de réception à l’étage noble']),
        ],
      },
    ],
  },

  {
    id: 'maisonbourgeoise',
    name: 'Maison bourgeoise',
    region: 'Centres-villes · France',
    periode: '1800–1900',
    procede: 'Pierre ou brique',
    usage: 'Habitat urbain bourgeois',
    categorie: 'urbain',
    periodeTags: ['XIXe'],
    resume:
      "Maison de ville bourgeoise du XIXe siècle, plus modeste que l’hôtel particulier mais soignée dans son décor : balcon filant, corniche moulurée, façade en pierre ou en brique selon les régions. Elle loge une seule famille aisée sur plusieurs niveaux, avec un escalier d’apparat desservant les étages.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Centres-villes, France'],
      ['Usage', 'Habitat urbain bourgeois'],
      ['Système', 'Murs porteurs en pierre ou brique'],
      ['Matériau dominant', 'Pierre ou brique selon les régions'],
      ['Toiture', 'Ardoise ou tuile mécanique'],
      ['Particularité', 'Balcon filant, décor mouluré'],
    ],
    materiaux: ['Pierre', 'Brique', 'Chaux', 'Chêne', 'Ardoise', 'Fer forgé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture ardoise ou tuile mécanique, lucarnes décoratives.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre ou brique selon les régions, balcon filant, corniche moulurée.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, parquet dans les pièces principales.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre ou brique, plan étroit en profondeur sur parcelle urbaine.' },
      { n: 5, el: 'Escalier', txt: 'Escalier d’apparat en pierre ou bois, desservant chaque étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, cave voûtée fréquente.' },
    ],
    sections: [
      {
        title: 'Façade & décor',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Balcon filant au premier étage noble', 'Corniche moulurée en couronnement', 'Ferronneries de balcon soignées']),
        ],
      },
      {
        title: 'Murs porteurs',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre de taille ou brique selon la région', 'Mur mitoyen porteur, façade et mur de fond porteurs', 'Plan étroit et profond sur parcelle urbaine']),
        ],
      },
      {
        title: 'Distribution intérieure',
        icon: 'ph ph-steps',
        groups: [
          G(null, ['Escalier d’apparat desservant les étages', 'Étage noble réservé à la réception', 'Chambres et communs aux niveaux supérieurs']),
        ],
      },
    ],
  },

  {
    id: 'maisonouvriere',
    name: 'Maison ouvrière',
    region: 'Villes industrielles · France',
    periode: '1800–1900',
    procede: 'Brique',
    usage: 'Logement ouvrier urbain',
    categorie: 'urbain',
    periodeTags: ['XIXe'],
    resume:
      "Maison ouvrière urbaine du XIXe siècle, bâtie en brique par le patronat industriel à proximité des usines. Petite, mitoyenne et répétitive, elle associe un logis simple à un jardinet potager, dans une logique d’encadrement social et hygiéniste propre au paternalisme industriel.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Villes industrielles, France'],
      ['Usage', 'Logement ouvrier urbain'],
      ['Système', 'Murs porteurs en brique'],
      ['Matériau dominant', 'Brique de terre cuite'],
      ['Toiture', 'Tuile mécanique ou ardoise'],
      ['Particularité', 'Cité ouvrière patronale, jardinet potager'],
    ],
    materiaux: ['Brique', 'Mortier de chaux', 'Chêne', 'Tuile mécanique', 'Ardoise', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois simple, couverture tuile mécanique ou ardoise.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique de terre cuite appareillée, façade répétitive et standardisée.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois simple, deux niveaux d’habitation.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs mitoyens porteurs en brique, bâti en bande répétitif.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois, étroit et droit.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en brique ou pierre, peu profondes.' },
    ],
    sections: [
      {
        title: 'Une architecture patronale',
        icon: 'ph ph-grid-nine',
        intro: "Bâties par les industriels pour loger leur main-d’œuvre, ces maisons relèvent d’une logique hygiéniste et paternaliste.",
        groups: [
          G(null, ['Maisons mitoyennes standardisées', 'Jardinet potager attenant', 'Proximité immédiate de l’usine']),
        ],
      },
      {
        title: 'Murs en brique',
        icon: 'ph ph-bricks',
        groups: [
          G(null, ['Brique de terre cuite locale', 'Appareillage simple, peu de décor', 'Chaînages et bandeaux discrets']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile mécanique ou ardoise selon les bassins industriels', 'Charpente bois simple à deux pans', 'Faible débord de toit']),
        ],
      },
    ],
  },

  {
    id: 'canutlyonnais',
    name: 'Canut lyonnais',
    region: 'Lyon · Croix-Rousse',
    periode: '1700–1900',
    procede: 'Pierre',
    usage: 'Habitat-atelier de canut (soierie)',
    categorie: 'urbain',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Immeuble de la Croix-Rousse lyonnaise conçu pour loger les canuts, ouvriers tisserands en soie, avec des plafonds exceptionnellement hauts pour accueillir les métiers à tisser Jacquard. Grandes fenêtres, traboules traversant les îlots et façades sobres caractérisent ce patrimoine industriel urbain unique.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Lyon, Croix-Rousse'],
      ['Usage', 'Habitat-atelier de canut (soierie)'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire'],
      ['Toiture', 'Tuile ou ardoise'],
      ['Particularité', 'Plafonds hauts (métiers Jacquard), traboules'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Chêne', 'Tuile', 'Fer', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile ou ardoise, faible débord urbain.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre calcaire sobre, grandes fenêtres pour l’éclairage des métiers à tisser.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois renforcé, plafonds de 4 à 5 mètres pour les métiers Jacquard.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, trame structurelle adaptée aux ateliers.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en pierre ou bois, dessertes multiples par étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, caves voûtées sur la pente de la colline.' },
    ],
    sections: [
      {
        title: 'L’atelier-logement',
        icon: 'ph ph-buildings',
        intro: "Chaque logement de canut intègre l’atelier de tissage, ce qui impose des plafonds bien plus hauts que l’habitat ordinaire.",
        groups: [
          G(null, ['Plafonds de 4 à 5 mètres pour les métiers Jacquard', 'Grandes fenêtres multipliant la lumière naturelle', 'Atelier et logis réunis dans un même espace']),
        ],
      },
      {
        title: 'Les traboules',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Passages traversant les îlots de la colline', 'Raccourcis protégés pour le transport des pièces de soie', 'Réseau caractéristique de la Croix-Rousse']),
        ],
      },
      {
        title: 'Murs en pierre',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre calcaire locale, façade sobre', 'Peu de décor, primauté donnée à la lumière', 'Implantation dense sur la pente de la colline']),
        ],
      },
    ],
  },

  {
    id: 'maisontoulousaine',
    name: 'Maison toulousaine',
    region: 'Toulouse · Haute-Garonne',
    periode: '1700–1900',
    procede: 'Brique rose',
    usage: 'Habitat urbain',
    categorie: 'urbain',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Maison urbaine toulousaine bâtie en brique foraine rose, matériau emblématique de la « Ville Rose » faute de pierre à carrière proche. Façades sobres rythmées de bandeaux de brique, toiture de tuile canal à faible pente et cour intérieure caractérisent cette architecture de terre cuite.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Toulouse, Haute-Garonne'],
      ['Usage', 'Habitat urbain'],
      ['Système', 'Murs porteurs en brique'],
      ['Matériau dominant', 'Brique foraine rose'],
      ['Toiture', 'Tuile canal, faible pente'],
      ['Particularité', 'Brique rose caractéristique de Toulouse'],
    ],
    materiaux: ['Brique foraine', 'Mortier de chaux', 'Chêne', 'Tuile canal', 'Fer forgé', 'Enduit'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile canal, faible pente méridionale.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique foraine rose apparente, bandeaux et corniches en brique moulurée.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, voûtains de brique sur poutrelles dans les constructions tardives.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en brique foraine, chaînages verticaux et horizontaux.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois ou pierre desservant les étages.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en brique ou pierre, caves parfois voûtées en brique.' },
    ],
    sections: [
      {
        title: 'La brique, matériau de la Ville Rose',
        icon: 'ph ph-bricks',
        intro: "Faute de carrière de pierre à proximité, Toulouse a bâti l’essentiel de son architecture en brique de terre cuite locale.",
        groups: [
          G(null, ['Brique foraine cuite localement', 'Teinte rose caractéristique de l’argile toulousaine', 'Appareillage en bandeaux et corniches moulurées']),
        ],
      },
      {
        title: 'Organisation autour de la cour',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Cour intérieure desservant les pièces', 'Façade sur rue sobre, décor concentré sur la cour', 'Galeries ou escaliers extérieurs côté cour']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile canal à faible pente', 'Génoise en corniche, influence méridionale', 'Charpente bois simple']),
        ],
      },
    ],
  },

  {
    id: 'maisonnantaise',
    name: 'Maison nantaise',
    region: 'Nantes · Loire-Atlantique',
    periode: '1800–1900',
    procede: 'Tuffeau',
    usage: 'Habitat urbain',
    categorie: 'urbain',
    periodeTags: ['XIXe'],
    resume:
      "Maison urbaine nantaise en tuffeau, pierre calcaire blanche et tendre du val de Loire, taillée avec finesse pour les encadrements et les décors de façade. L’enrichissement du négoce nantais au XIXe siècle se lit dans la qualité de la pierre de taille et des ferronneries de balcon.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Nantes, Loire-Atlantique'],
      ['Usage', 'Habitat urbain'],
      ['Système', 'Murs porteurs en tuffeau'],
      ['Matériau dominant', 'Tuffeau (calcaire blanc du val de Loire)'],
      ['Toiture', 'Ardoise'],
      ['Particularité', 'Décor sculpté fin dans une pierre tendre'],
    ],
    materiaux: ['Tuffeau', 'Chaux', 'Chêne', 'Ardoise', 'Fer forgé', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture ardoise, lucarnes à fronton sculpté.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Tuffeau blanc finement taillé, décors sculptés en façade.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, parquet dans les pièces de réception.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en tuffeau, plus tendre et plus léger que le granite.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en pierre ou bois, rampe en fer forgé.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre dure, le tuffeau étant réservé aux élévations.' },
    ],
    sections: [
      {
        title: 'Le tuffeau, pierre du négoce',
        icon: 'ph ph-wall',
        intro: "L’essor du commerce nantais au XIXe siècle se traduit par des façades en tuffeau finement ouvragées.",
        groups: [
          G(null, ['Tuffeau blanc, pierre tendre facile à sculpter', 'Décor de façade riche : mascarons, guirlandes', 'Acheminé par voie fluviale depuis le val de Loire']),
        ],
      },
      {
        title: 'Façade & ferronneries',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Balcons filants en fer forgé', 'Lucarnes à fronton sculpté', 'Corniche moulurée en couronnement']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Couverture en ardoise', 'Pente marquée, influence des toitures ligériennes', 'Souches de cheminée en pierre']),
        ],
      },
    ],
  },

  {
    id: 'artnouveau',
    name: 'Immeuble Art nouveau',
    region: 'Grandes villes · France',
    periode: '1890–1914',
    procede: 'Pierre + métal',
    usage: 'Immeuble de rapport, habitat urbain',
    categorie: 'urbain',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Immeuble de la Belle Époque associant pierre de taille et structure métallique, aux façades ondoyantes ornées de ferronneries florales et de céramiques. Bow-windows, verrières et motifs végétaux stylisés traduisent le rejet de la ligne droite propre à l’Art nouveau.",
    identite: [
      ['Période', '1890–1914'],
      ['Région', 'Grandes villes, France'],
      ['Usage', 'Immeuble de rapport, habitat urbain'],
      ['Système', 'Pierre + structure métallique'],
      ['Matériau dominant', 'Pierre de taille et fer'],
      ['Style', 'Art nouveau (courbes, motifs végétaux)'],
      ['Particularité', 'Ferronneries florales, céramiques, bow-windows'],
    ],
    materiaux: ['Pierre de taille', 'Fer forgé', 'Céramique', 'Verre', 'Bois', 'Grès flammé'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture mansardée ou terrasse, ferronneries décoratives en couronnement.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille ondoyante, bow-windows, ferronneries florales, céramiques.' },
      { n: 3, el: 'Planchers', txt: 'Structure mixte pierre et métal autorisant de plus grandes portées.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature métallique associée à la maçonnerie de pierre.' },
      { n: 5, el: 'Escalier', txt: 'Cage d’escalier avec verrière zénithale et ferronneries Art nouveau.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre ou béton, adaptées aux charges métalliques.' },
    ],
    sections: [
      {
        title: 'Le rejet de la ligne droite',
        icon: 'ph ph-buildings',
        intro: "L’Art nouveau puise son inspiration dans les formes végétales, refusant la symétrie rigide de l’architecture classique.",
        groups: [
          G(null, ['Façades ondoyantes, bow-windows en saillie', 'Ferronneries florales aux balcons et garde-corps', 'Motifs végétaux stylisés en céramique']),
        ],
      },
      {
        title: 'Pierre et métal associés',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Ossature métallique pour les grandes portées', 'Parement de pierre de taille en façade', 'Verrières zénithales sur cage d’escalier']),
        ],
      },
      {
        title: 'Décor',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Céramiques et grès flammés en frise', 'Vitraux et verres colorés', 'Ferronnerie d’art signée par les ateliers de l’époque']),
        ],
      },
    ],
  },

  {
    id: 'annees30',
    name: 'Immeuble années 30',
    region: 'Grandes villes · France',
    periode: '1925–1939',
    procede: 'Béton',
    usage: 'Immeuble de rapport, habitat urbain',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Immeuble fonctionnaliste de l’entre-deux-guerres, en béton armé, aux lignes épurées et aux formes arrondies dites « style paquebot ». Bow-windows incurvés, garde-corps tubulaires et hublots traduisent l’influence de l’esthétique navale et industrielle sur l’architecture résidentielle.",
    identite: [
      ['Période', '1925–1939'],
      ['Région', 'Grandes villes, France'],
      ['Usage', 'Immeuble de rapport, habitat urbain'],
      ['Système', 'Ossature béton armé'],
      ['Matériau dominant', 'Béton armé'],
      ['Style', 'Style paquebot, fonctionnalisme'],
      ['Particularité', 'Formes arrondies, hublots, garde-corps tubulaires'],
    ],
    materiaux: ['Béton armé', 'Enduit lisse', 'Verre', 'Acier tubulaire', 'Céramique', 'Brique'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse, souvent accessible, acrotère arrondi.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Béton armé enduit lisse, bow-windows incurvés, hublots.' },
      { n: 3, el: 'Planchers', txt: 'Dalles en béton armé, portées régulières.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature poteaux-poutres en béton armé, façades allégées.' },
      { n: 5, el: 'Escalier', txt: 'Cage d’escalier aux lignes épurées, garde-corps tubulaires métalliques.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en béton armé, adaptées à la structure poteaux-poutres.' },
    ],
    sections: [
      {
        title: 'Le style paquebot',
        icon: 'ph ph-crane-tower',
        intro: "L’architecture résidentielle emprunte à l’esthétique des paquebots transatlantiques : coursives, hublots, formes hydrodynamiques.",
        groups: [
          G(null, ['Angles arrondis et bow-windows incurvés', 'Hublots en façade ou en cage d’escalier', 'Garde-corps tubulaires métalliques']),
        ],
      },
      {
        title: 'Structure en béton armé',
        icon: 'ph ph-building',
        groups: [
          G(null, ['Ossature poteaux-poutres en béton armé', 'Façades allégées, grandes baies horizontales', 'Toiture-terrasse en remplacement du toit pentu']),
        ],
      },
      {
        title: 'Sobriété fonctionnaliste',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Décor réduit à l’essentiel', 'Enduit lisse remplaçant le décor sculpté', 'Fonction et hygiène priment sur l’ornement']),
        ],
      },
    ],
  },

  {
    id: 'barrehlm',
    name: 'Barre HLM',
    region: 'Périphéries urbaines · France',
    periode: '1955–1975',
    procede: 'Béton préfabriqué',
    usage: 'Logement social collectif',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Immeuble linéaire de logement social construit en panneaux de béton préfabriqués, desservi par des cages d’escalier ou des coursives réparties régulièrement. Sa répétition modulaire et sa construction rapide en ont fait la forme la plus répandue du logement de masse des Trente Glorieuses.",
    identite: [
      ['Période', '1955–1975'],
      ['Région', 'Périphéries urbaines, France'],
      ['Usage', 'Logement social collectif'],
      ['Système', 'Voiles béton préfabriqués'],
      ['Matériau dominant', 'Béton préfabriqué'],
      ['Toiture', 'Toiture-terrasse'],
      ['Particularité', 'Plan linéaire, cages d’escalier répétitives'],
    ],
    materiaux: ['Béton préfabriqué', 'Panneaux de façade', 'Acier (armatures)', 'Verre', 'Allège béton', 'Isolant'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse en dalle béton, étanchéité multicouche.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Panneaux préfabriqués répétitifs, allèges béton, grandes baies.' },
      { n: 3, el: 'Planchers', txt: 'Dalles préfabriquées ou coulées en place, trame répétitive.' },
      { n: 4, el: 'Structure porteuse', txt: 'Voiles béton préfabriqués, montés en filière rapide.' },
      { n: 5, el: 'Escalier', txt: 'Cages d’escalier ou coursives réparties régulièrement le long de la barre.' },
      { n: 6, el: 'Fondations', txt: 'Semelles filantes en béton armé sous les voiles porteurs.' },
    ],
    sections: [
      {
        title: 'Le plan linéaire',
        icon: 'ph ph-rows',
        intro: "La barre déroule un même module d’appartement sur toute sa longueur, desservi par des cages d’escalier régulièrement espacées.",
        groups: [
          G(null, ['Répétition d’un même module de logement', 'Cages d’escalier ou coursives réparties tous les deux ou trois logements', 'Orientation optimisée pour l’ensoleillement']),
        ],
      },
      {
        title: 'Préfabrication',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Panneaux de façade coulés en usine', 'Montage rapide au chemin de grue', 'Standardisation des éléments de construction']),
        ],
      },
      {
        title: 'Structure béton',
        icon: 'ph ph-building',
        groups: [
          G(null, ['Voiles béton porteurs transversaux', 'Façades légères non porteuses', 'Toiture-terrasse généralisée']),
        ],
      },
    ],
  },

  {
    id: 'tourhlm',
    name: 'Tour HLM',
    region: 'Périphéries urbaines · France',
    periode: '1960–1980',
    procede: 'Béton',
    usage: 'Logement social collectif',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Immeuble de grande hauteur organisé autour d’un noyau central regroupant ascenseurs et escaliers, d’où rayonnent les logements sur un plan carré ou en étoile. Sa silhouette verticale, plus économe en emprise au sol que la barre, a marqué les grands ensembles des années 1960 et 1970.",
    identite: [
      ['Période', '1960–1980'],
      ['Région', 'Périphéries urbaines, France'],
      ['Usage', 'Logement social collectif'],
      ['Système', 'Noyau central béton armé'],
      ['Matériau dominant', 'Béton armé'],
      ['Toiture', 'Toiture-terrasse'],
      ['Particularité', 'Plan en étoile ou carré autour d’un noyau central'],
    ],
    materiaux: ['Béton armé', 'Panneaux préfa', 'Acier (armatures)', 'Verre', 'Allège béton', 'Isolant'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse technique, locaux d’ascenseurs et de ventilation en superstructure.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Panneaux préfabriqués ou façade rideau, loggias ou balcons filants.' },
      { n: 3, el: 'Planchers', txt: 'Dalles en béton armé rayonnant depuis le noyau central.' },
      { n: 4, el: 'Structure porteuse', txt: 'Noyau central en béton armé contreventant l’ensemble de la tour.' },
      { n: 5, el: 'Escalier', txt: 'Batterie d’ascenseurs et escalier de secours regroupés au noyau central.' },
      { n: 6, el: 'Fondations', txt: 'Radier général ou pieux profonds selon la portance du sol.' },
    ],
    sections: [
      {
        title: 'Le noyau central',
        icon: 'ph ph-building',
        intro: "Tout l’équilibre structurel et fonctionnel de la tour repose sur son noyau central, qui concentre circulations verticales et contreventement.",
        groups: [
          G(null, ['Ascenseurs et escaliers regroupés au centre', 'Contreventement de la tour contre le vent', 'Logements distribués en étoile ou en carré autour du noyau']),
        ],
      },
      {
        title: 'Une silhouette verticale',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Emprise au sol réduite par rapport à la barre', 'Vues dégagées à chaque étage', 'Densité de logements élevée sur une petite parcelle']),
        ],
      },
      {
        title: 'Structure béton',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Noyau et refends en béton armé', 'Fondations profondes adaptées à la charge verticale', 'Façades légères, souvent en panneaux préfabriqués']),
        ],
      },
    ],
  },

  {
    id: 'pavillonphenix',
    name: 'Pavillon Phénix',
    region: 'Zones pavillonnaires · France',
    periode: '1970–1995',
    procede: 'Ossature métallique',
    usage: 'Maison individuelle standardisée',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Maison individuelle préfabriquée à ossature métallique légère, commercialisée en catalogue à partir des années 1970 et massivement diffusée dans les lotissements périurbains français. Construction rapide, plans standardisés et garage intégré caractérisent ce modèle emblématique de l’accession à la propriété de masse.",
    identite: [
      ['Période', '1970–1995'],
      ['Région', 'Zones pavillonnaires, France'],
      ['Usage', 'Maison individuelle standardisée'],
      ['Système', 'Ossature métallique légère'],
      ['Matériau dominant', 'Acier et parpaing de remplissage'],
      ['Toiture', 'Tuile béton, faible à moyenne pente'],
      ['Particularité', 'Construction sur catalogue, garage intégré'],
    ],
    materiaux: ['Acier (ossature)', 'Parpaing', 'Tuile béton', 'Isolant synthétique', 'Placoplâtre', 'Enduit'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente industrielle, couverture tuile béton, faible à moyenne pente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Remplissage parpaing sur ossature métallique, enduit de finition.' },
      { n: 3, el: 'Planchers', txt: 'Dalle béton au rez-de-chaussée, plancher léger à l’étage si présent.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature métallique légère préfabriquée, montage rapide sur chantier.' },
      { n: 5, el: 'Escalier', txt: 'Escalier préfabriqué en bois ou béton selon les modèles.' },
      { n: 6, el: 'Fondations', txt: 'Semelles filantes en béton, dalle sur terre-plein.' },
    ],
    sections: [
      {
        title: 'La maison sur catalogue',
        icon: 'ph ph-buildings',
        intro: "Le modèle Phénix diffuse à grande échelle des plans standardisés, choisis sur catalogue par les futurs propriétaires.",
        groups: [
          G(null, ['Plans standardisés proposés en catalogue', 'Garage intégré au volume principal', 'Diffusion massive dans les lotissements périurbains']),
        ],
      },
      {
        title: 'Ossature métallique légère',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Structure en acier préfabriquée en usine', 'Montage rapide sur chantier', 'Remplissage en parpaing entre les poteaux']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile béton standardisée', 'Charpente industrielle légère', 'Pente modérée, faible débord de toit']),
        ],
      },
    ],
  },

  {
    id: 'maisonidf',
    name: 'Maison « Île-de-France »',
    region: 'Île-de-France',
    periode: '1950–2000',
    procede: 'Parpaings',
    usage: 'Maison individuelle, habitat péri-urbain',
    categorie: 'urbain',
    periodeTags: ['XXe'],
    resume:
      "Pavillon individuel générique de la seconde moitié du XXe siècle, bâti en parpaings de béton enduits et couvert d’une toiture à pans en tuile mécanique. Modèle le plus répandu de l’habitat péri-urbain francilien, il se décline en variantes de plain-pied ou à étage sur des lotissements standardisés.",
    identite: [
      ['Période', '1950–2000'],
      ['Région', 'Île-de-France'],
      ['Usage', 'Maison individuelle, habitat péri-urbain'],
      ['Système', 'Murs porteurs en parpaings'],
      ['Matériau dominant', 'Parpaings de béton enduits'],
      ['Toiture', 'Tuile mécanique'],
      ['Particularité', 'Modèle générique de lotissement standardisé'],
    ],
    materiaux: ['Parpaing', 'Enduit', 'Béton (dalle)', 'Tuile mécanique', 'Bois (charpente)', 'Placoplâtre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois industrielle, couverture tuile mécanique à deux ou quatre pans.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Parpaings de béton enduits, ouvertures standardisées.' },
      { n: 3, el: 'Planchers', txt: 'Dalle béton au rez-de-chaussée, plancher bois ou béton à l’étage.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en parpaings de béton, plan rectangulaire simple.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en béton ou bois selon les modèles à étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles filantes en béton, dalle sur terre-plein ou vide sanitaire.' },
    ],
    sections: [
      {
        title: 'Un modèle générique',
        icon: 'ph ph-grid-nine',
        intro: "Diffusée par centaines de milliers d’exemplaires, cette maison standardisée a façonné les lotissements franciliens de l’après-guerre.",
        groups: [
          G(null, ['Plans répétés à l’identique dans les lotissements', 'Variantes plain-pied ou à étage', 'Garage ou abri de jardin attenant fréquent']),
        ],
      },
      {
        title: 'Murs en parpaings',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Parpaings de béton creux, matériau économique', 'Enduit de finition en façade', 'Isolation rapportée à l’intérieur']),
        ],
      },
      {
        title: 'Toiture',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tuile mécanique à deux ou quatre pans', 'Charpente industrielle standardisée', 'Pente modérée, faible débord']),
        ],
      },
    ],
  },

  {
    id: 'egliseromane',
    name: 'Église romane',
    region: 'France · art roman',
    periode: '1000–1200',
    procede: 'Pierre',
    usage: 'Édifice religieux paroissial',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Église aux murs très épais et aux ouvertures réduites, couverte de voûtes en berceau ou d’arêtes portées par des piliers massifs. Arcs en plein cintre, chapiteaux sculptés et clocher trapu composent une architecture de la retenue et de la pénombre, héritière de la construction romaine.",
    identite: [
      ['Période', 'XIe–XIIe siècle'],
      ['Région', 'France, art roman'],
      ['Usage', 'Édifice religieux paroissial'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire ou granite'],
      ['Couverture', 'Voûte en berceau ou d’arêtes'],
      ['Particularité', 'Arcs en plein cintre, clocher trapu'],
    ],
    materiaux: ['Pierre calcaire', 'Granite', 'Chaux', 'Bois (charpente)', 'Ardoise ou lauze', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente ou voûte apparente, couverture en lauze, ardoise ou tuile selon les régions.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs très épais, portail à voussures sculptées, baies étroites en plein cintre.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre, léger dénivelé vers le chœur surélevé.' },
      { n: 4, el: 'Structure porteuse', txt: 'Piliers massifs et murs épais portant des voûtes en berceau ou d’arêtes.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis dans l’épaisseur du mur, desservant le clocher.' },
      { n: 6, el: 'Fondations', txt: 'Semelles massives en pierre, souvent sur un site antérieur remployé.' },
    ],
    sections: [
      {
        title: 'Murs épais & voûtes basses',
        icon: 'ph ph-wall',
        intro: "L’art roman privilégie la masse et l’épaisseur : les murs portent seuls la poussée des voûtes, sans arc-boutant.",
        groups: [
          G(null, ['Murs porteurs très épais, peu d’ouvertures', 'Voûtes en berceau plein cintre ou en arêtes', 'Piliers massifs à chapiteaux sculptés']),
        ],
      },
      {
        title: 'Le décor sculpté',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Chapiteaux historiés (scènes bibliques, motifs végétaux)', 'Portail à voussures sculptées', 'Modillons et corniches ornées']),
        ],
      },
      {
        title: 'Le clocher trapu',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Tour massive à peu de niveaux', 'Baies géminées pour les cloches', 'Toiture en bâtière ou pyramidale basse']),
        ],
      },
    ],
  },

  {
    id: 'eglisegothique',
    name: 'Église gothique',
    region: 'France · art gothique',
    periode: '1140–1500',
    procede: 'Pierre',
    usage: 'Édifice religieux paroissial',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Église élancée où la croisée d’ogives et l’arc-boutant reportent les charges à l’extérieur, libérant les murs pour de vastes verrières. La verticalité, la lumière colorée des vitraux et la finesse du décor sculpté marquent une rupture radicale avec la retenue romane.",
    identite: [
      ['Période', 'XIIe–XVe siècle'],
      ['Région', 'France, art gothique'],
      ['Usage', 'Édifice religieux paroissial'],
      ['Système', 'Croisée d’ogives + arcs-boutants'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Couverture', 'Voûte sur croisée d’ogives'],
      ['Particularité', 'Verticalité, grandes verrières'],
    ],
    materiaux: ['Pierre de taille', 'Verre (vitraux)', 'Plomb (résille)', 'Chaux', 'Bois (charpente)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois à forte pente au-dessus des voûtes de pierre, couverture ardoise ou plomb.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs allégés, grandes baies en arc brisé garnies de vitraux, portails sculptés.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre, tribunes ou triforium sur certains édifices majeurs.' },
      { n: 4, el: 'Structure porteuse', txt: 'Croisée d’ogives reportant les charges sur des piliers fins, arcs-boutants extérieurs.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis dans les contreforts, menant aux combles et au clocher.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes en pierre, adaptées aux charges concentrées des piliers.' },
    ],
    sections: [
      {
        title: 'Croisée d’ogives & arcs-boutants',
        icon: 'ph ph-columns',
        intro: "L’arc-boutant reporte à l’extérieur la poussée des voûtes, ce qui permet d’alléger considérablement les murs.",
        groups: [
          G(null, ['Croisée d’ogives concentrant les charges sur des piliers fins', 'Arcs-boutants reportant la poussée vers des culées extérieures', 'Murs libérés, largement ouverts']),
        ],
      },
      {
        title: 'La lumière et le vitrail',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Grandes verrières en arc brisé', 'Vitraux narratifs ou en rosace', 'Résille de plomb structurant le verre coloré']),
        ],
      },
      {
        title: 'La verticalité',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Élévation à plusieurs niveaux (grandes arcades, triforium, fenêtres hautes)', 'Flèches et pinacles élançant la silhouette', 'Portails sculptés en profondeur (voussures)']),
        ],
      },
    ],
  },

  {
    id: 'cathedralegothique',
    name: 'Cathédrale gothique',
    region: 'Villes épiscopales · France',
    periode: '1150–1550',
    procede: 'Pierre',
    usage: 'Siège épiscopal, cathédrale',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Église mère d’un diocèse, abritant la cathedra de l’évêque, bâtie à une échelle monumentale sur plusieurs générations. Façade harmonique à deux tours, rosace, chevet à déambulatoire et chapelles rayonnantes en font le sommet technique et symbolique de l’art gothique.",
    identite: [
      ['Période', 'XIIe–XVIe siècle'],
      ['Région', 'Villes épiscopales, France'],
      ['Usage', 'Siège épiscopal, cathédrale'],
      ['Système', 'Croisée d’ogives + arcs-boutants'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Déambulatoire et chapelles rayonnantes'],
      ['Particularité', 'Façade harmonique à deux tours, rosace'],
    ],
    materiaux: ['Pierre de taille', 'Verre (vitraux)', 'Plomb', 'Bronze (cloches)', 'Bois (charpente)', 'Or (reliquaires)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois de très grande portée (« forêt » de charpente), couverture plomb ou ardoise.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade harmonique à deux tours, portails sculptés, grande rosace centrale.' },
      { n: 3, el: 'Planchers', txt: 'Dallage monumental, crypte archéologique fréquente sous le chevet.' },
      { n: 4, el: 'Structure porteuse', txt: 'Piliers et croisées d’ogives à très grande hauteur, arcs-boutants à double volée.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers en vis dans les tours, accessibles au public pour certaines cathédrales.' },
      { n: 6, el: 'Fondations', txt: 'Fondations très profondes, chantier étalé sur plusieurs générations.' },
    ],
    sections: [
      {
        title: 'Un chantier de plusieurs générations',
        icon: 'ph ph-crane-tower',
        intro: "La construction d’une cathédrale s’étend souvent sur un à deux siècles, mêlant plusieurs campagnes de travaux et styles.",
        groups: [
          G(null, ['Financement par l’évêché, la ville et les dons', 'Chantier organisé par des maîtres d’œuvre successifs', 'Évolution stylistique visible d’une campagne à l’autre']),
        ],
      },
      {
        title: 'Le chevet à déambulatoire',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Déambulatoire contournant le chœur', 'Chapelles rayonnantes pour les reliques et dévotions', 'Circulation des pèlerins sans perturber les offices']),
        ],
      },
      {
        title: 'La façade harmonique',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Deux tours encadrant un portail à triple entrée', 'Grande rosace centrale', 'Galerie des rois et statuaire monumentale']),
        ],
      },
    ],
  },

  {
    id: 'chapellerurale',
    name: 'Chapelle rurale',
    region: 'Campagnes · France',
    periode: '1200–1900',
    procede: 'Pierre',
    usage: 'Chapelle de dévotion ou de pèlerinage local',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petit édifice religieux à nef unique, souvent isolé en pleine campagne, sur un chemin de pèlerinage ou au cœur d’un hameau. Le clocher-mur, simple façade percée de baies pour les cloches, remplace la tour et signale l’humilité de cette architecture rurale de dévotion.",
    identite: [
      ['Période', 'XIIIe–XIXe siècle'],
      ['Région', 'Campagnes, France'],
      ['Usage', 'Chapelle de dévotion ou de pèlerinage local'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre locale'],
      ['Couverture', 'Charpente et tuile ou ardoise'],
      ['Particularité', 'Clocher-mur (clocher-peigne)'],
    ],
    materiaux: ['Pierre locale', 'Chaux', 'Bois (charpente)', 'Tuile ou ardoise', 'Fer (cloches)', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente simple à deux pans, couverture tuile ou ardoise selon la région.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade sobre en pierre locale, clocher-mur percé de baies pour les cloches.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre ou terre battue, nef unique sans bas-côtés.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, charpente simple sans voûte complexe.' },
      { n: 5, el: 'Escalier', txt: 'Absence d’étage la plupart du temps ; accès direct de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, peu profondes, souvent sur un site de dévotion ancien.' },
    ],
    sections: [
      {
        title: 'Le clocher-mur',
        icon: 'ph ph-house-line',
        intro: "Faute de moyens pour une tour, la chapelle rurale signale sa fonction par un simple mur pignon percé pour les cloches.",
        groups: [
          G(null, ['Façade pignon prolongée en clocher-mur', 'Une à trois baies pour les cloches', 'Silhouette simple et reconnaissable de loin']),
        ],
      },
      {
        title: 'Une nef unique',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Plan rectangulaire simple, sans transept ni bas-côtés', 'Chevet plat ou en abside semi-circulaire', 'Décor intérieur sobre, souvent un autel unique']),
        ],
      },
      {
        title: 'Un lieu de dévotion locale',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Implantation sur un chemin de pèlerinage ou une source', 'Pardon ou fête votive annuelle', 'Entretien communautaire par le hameau ou la paroisse']),
        ],
      },
    ],
  },

  {
    id: 'basilique',
    name: 'Basilique',
    region: 'Lieux de pèlerinage · France',
    periode: '1870–1930',
    procede: 'Pierre & dômes',
    usage: 'Basilique, lieu de pèlerinage majeur',
    categorie: 'religieuse',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Église élevée au rang de basilique par titre honorifique pontifical, souvent liée à un grand pèlerinage marial. En France, nombre de basiliques adoptent au tournant du XXe siècle un style romano-byzantin aux dômes multiples, rompant avec le vocabulaire gothique alors jugé trop identifié à l’Ancien Régime.",
    identite: [
      ['Période', '1870–1930'],
      ['Région', 'Lieux de pèlerinage, France'],
      ['Usage', 'Basilique, lieu de pèlerinage majeur'],
      ['Système', 'Voûtes et coupoles en pierre et béton'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Style', 'Romano-byzantin'],
      ['Particularité', 'Dômes multiples, crypte de pèlerinage'],
    ],
    materiaux: ['Pierre de taille', 'Béton (structure des dômes)', 'Mosaïque', 'Verre (vitraux)', 'Bronze', 'Or (décor)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Dômes multiples sur pendentifs, couverture pierre ou ardoise selon les édifices.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille claire, portails monumentaux, statuaire abondante.' },
      { n: 3, el: 'Planchers', txt: 'Dallage en marbre ou mosaïque, crypte de pèlerinage sous le chœur.' },
      { n: 4, el: 'Structure porteuse', txt: 'Piliers massifs supportant des coupoles sur pendentifs d’inspiration byzantine.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers monumentaux extérieurs menant au parvis, accès à la crypte.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes, souvent sur un site de pèlerinage antérieur.' },
    ],
    sections: [
      {
        title: 'Le titre de basilique',
        icon: 'ph ph-shield-check',
        intro: "Le titre de basilique est accordé par le pape à un sanctuaire pour son rayonnement spirituel, indépendamment de sa forme architecturale.",
        groups: [
          G(null, ['Titre honorifique pontifical', 'Souvent lié à une apparition ou une relique majeure', 'Lieu de pèlerinage drainant des foules nombreuses']),
        ],
      },
      {
        title: 'Le style romano-byzantin',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Dômes sur pendentifs inspirés de Byzance', 'Mosaïques dorées en décor intérieur', 'Rupture assumée avec le vocabulaire gothique']),
        ],
      },
      {
        title: 'La crypte de pèlerinage',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Crypte accueillant les grands flux de pèlerins', 'Chapelles latérales dédiées aux ex-voto', 'Circulation organisée autour d’un lieu saint']),
        ],
      },
    ],
  },

  {
    id: 'abbaye',
    name: 'Abbaye',
    region: 'France · ordres monastiques',
    periode: '1000–1789',
    procede: 'Pierre',
    usage: 'Communauté monastique autonome',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Vaste complexe monastique autonome organisé autour de l’église abbatiale et du cloître, regroupant salle capitulaire, dortoir, réfectoire et cellier. Sous l’autorité d’un abbé, la communauté vit en quasi-autarcie, cultivant ses terres et copiant les manuscrits au scriptorium.",
    identite: [
      ['Période', 'XIe–XVIIIe siècle'],
      ['Région', 'France, ordres monastiques'],
      ['Usage', 'Communauté monastique autonome'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Église abbatiale + cloître + bâtiments conventuels'],
      ['Particularité', 'Autarcie économique, scriptorium'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Bois (charpente)', 'Ardoise ou tuile', 'Verre', 'Parchemin (scriptorium)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois de grande portée sur l’abbatiale, couverture ardoise ou tuile.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille, sobriété générale, portail de l’abbatiale plus travaillé.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre, salle capitulaire voûtée, dortoir commun à l’étage.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre organisant église, cloître et bâtiments conventuels.' },
      { n: 5, el: 'Escalier', txt: 'Escalier de nuit reliant directement le dortoir à l’église pour les offices nocturnes.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, caves et celliers voûtés pour les réserves.' },
    ],
    sections: [
      {
        title: 'Le plan monastique',
        icon: 'ph ph-grid-nine',
        intro: "L’abbaye organise ses bâtiments selon un plan très codifié hérité du modèle bénédictin de Saint-Gall.",
        groups: [
          G(null, ['Église abbatiale au nord du cloître', 'Salle capitulaire, dortoir et réfectoire autour du cloître', 'Cellier, hôtellerie et bâtiments agricoles en périphérie']),
        ],
      },
      {
        title: 'Une économie autarcique',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Terres agricoles et granges dépendantes de l’abbaye', 'Scriptorium pour la copie des manuscrits', 'Moulin, four et cellier assurant l’autosuffisance']),
        ],
      },
      {
        title: 'Murs en pierre',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre de taille appareillée avec soin', 'Sobriété du décor selon la règle monastique', 'Église abbatiale plus richement traitée que les communs']),
        ],
      },
    ],
  },

  {
    id: 'monastere',
    name: 'Monastère',
    region: 'France · ordres monastiques',
    periode: '1000–1800',
    procede: 'Pierre',
    usage: 'Communauté monastique, cellules individuelles',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Communauté monastique organisée, dans la tradition cartusienne, autour de cellules individuelles ouvrant sur un grand cloître plutôt que sur un dortoir commun. Chaque moine y vit en quasi-ermite, ne rejoignant la communauté que pour les offices et certains repas, dans un équilibre singulier entre solitude et vie commune.",
    identite: [
      ['Période', 'XIe–XVIIIe siècle'],
      ['Région', 'France, ordres monastiques'],
      ['Usage', 'Communauté monastique, cellules individuelles'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Cellules individuelles autour d’un grand cloître'],
      ['Particularité', 'Vie érémitique communautaire (tradition cartusienne)'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Bois (charpente)', 'Ardoise ou tuile', 'Fer (verrous, guichets)', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois simple sur chaque cellule, couverture ardoise ou tuile.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille sobre, façades répétitives des cellules sur le grand cloître.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre, chaque cellule disposant de son propre jardinet.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, cellules juxtaposées autour du grand cloître.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur propre à chaque cellule, menant à l’atelier ou au jardin.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, guichet à repas pour préserver la clôture individuelle.' },
    ],
    sections: [
      {
        title: 'La cellule individuelle',
        icon: 'ph ph-grid-nine',
        intro: "Contrairement au dortoir commun bénédictin, chaque moine cartusien dispose d’une petite maison autonome : chambre, atelier, jardin.",
        groups: [
          G(null, ['Cellule composée d’une chambre, d’un atelier et d’un jardin', 'Guichet à repas évitant tout contact direct', 'Vie de prière et de travail manuel solitaire']),
        ],
      },
      {
        title: 'Le grand cloître',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Galerie couverte distribuant toutes les cellules', 'Dimensions bien plus vastes que le cloître bénédictin', 'Silence rigoureux dans les circulations']),
        ],
      },
      {
        title: 'Vie commune limitée',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Offices communs à l’église conventuelle', 'Repas pris ensemble seulement les jours de fête', 'Chapitre hebdomadaire réunissant la communauté']),
        ],
      },
    ],
  },

  {
    id: 'prieure',
    name: 'Prieuré',
    region: 'France · dépendances monastiques',
    periode: '1000–1500',
    procede: 'Pierre',
    usage: 'Petite communauté monastique dépendante',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Petite communauté monastique dépendant d’une abbaye mère, envoyée pour administrer un domaine éloigné ou entretenir un lieu de dévotion. Plus modeste que l’abbaye, le prieuré réunit un noyau réduit de moines autour d’une église priorale simple et d’un cloître de petites dimensions.",
    identite: [
      ['Période', 'XIe–XVe siècle'],
      ['Région', 'France, dépendances monastiques'],
      ['Usage', 'Petite communauté monastique dépendante'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre locale'],
      ['Plan', 'Église priorale + petit cloître'],
      ['Particularité', 'Dépendance d’une abbaye mère'],
    ],
    materiaux: ['Pierre locale', 'Chaux', 'Bois (charpente)', 'Ardoise ou tuile', 'Fer', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois simple, couverture ardoise ou tuile selon la région.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre locale, façade sobre, portail modeste comparé à une abbaye.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre, quelques cellules pour les moines résidents.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, échelle réduite par rapport à l’abbaye mère.' },
      { n: 5, el: 'Escalier', txt: 'Escalier simple desservant les quelques cellules à l’étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, souvent sur un domaine agricole rattaché.' },
    ],
    sections: [
      {
        title: 'Une dépendance monastique',
        icon: 'ph ph-grid-nine',
        intro: "Le prieuré permet à une abbaye d’administrer un domaine éloigné ou de tenir un lieu de dévotion sans y transférer toute la communauté.",
        groups: [
          G(null, ['Quelques moines seulement, sous l’autorité d’un prieur', 'Dépendance directe d’une abbaye mère', 'Gestion d’un domaine agricole ou d’un lieu de pèlerinage']),
        ],
      },
      {
        title: 'Une échelle réduite',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Église priorale à nef unique', 'Petit cloître, parfois de plan irrégulier', 'Bâtiments conventuels réduits à l’essentiel']),
        ],
      },
      {
        title: 'Vie quotidienne',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Offices réguliers malgré l’effectif réduit', 'Exploitation agricole attenante', 'Accueil ponctuel de voyageurs ou de pèlerins']),
        ],
      },
    ],
  },

  {
    id: 'cloitre',
    name: 'Cloître',
    region: 'France · ensembles monastiques',
    periode: '1000–1500',
    procede: 'Pierre',
    usage: 'Galerie de circulation monastique',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800'],
    resume:
      "Galerie couverte à arcades entourant un jardin central (préau), cœur silencieux de la vie monastique et lieu de circulation entre église, salle capitulaire et réfectoire. Ses colonnettes géminées et ses chapiteaux sculptés en font souvent le plus riche témoignage artistique d’un ensemble religieux.",
    identite: [
      ['Période', 'XIe–XVe siècle'],
      ['Région', 'France, ensembles monastiques'],
      ['Usage', 'Galerie de circulation monastique'],
      ['Système', 'Arcades sur colonnettes'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Galerie en carré autour d’un jardin central'],
      ['Particularité', 'Chapiteaux sculptés, colonnettes géminées'],
    ],
    materiaux: ['Pierre de taille', 'Marbre (colonnettes)', 'Chaux', 'Bois (charpente de galerie)', 'Tuile ou lauze', 'Terre (jardin)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente en appentis couvrant la galerie, couverture tuile ou lauze.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Arcades ouvertes sur le jardin, mur plein côté bâtiments conventuels.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre le long de la galerie, terre et végétation au préau central.' },
      { n: 4, el: 'Structure porteuse', txt: 'Arcades sur colonnettes géminées, souvent en marbre ou pierre fine.' },
      { n: 5, el: 'Escalier', txt: 'Parfois un accès à un étage de galerie (cloîtres à deux niveaux).' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, drainage du jardin central intégré au sol du préau.' },
    ],
    sections: [
      {
        title: 'Le cœur de la vie monastique',
        icon: 'ph ph-grid-nine',
        intro: "Le cloître distribue tous les bâtiments essentiels de la vie religieuse : église, salle capitulaire, réfectoire, dortoir.",
        groups: [
          G(null, ['Galerie desservant l’ensemble des bâtiments conventuels', 'Lieu de méditation, de lecture et de silence', 'Préau central planté, parfois avec un puits ou une fontaine']),
        ],
      },
      {
        title: 'Arcades & chapiteaux',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Colonnettes géminées supportant les arcades', 'Chapiteaux sculptés, historiés ou végétaux', 'Grande cohérence stylistique sur tout le pourtour']),
        ],
      },
      {
        title: 'Un art préservé',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Décor souvent mieux conservé que celui de l’église', 'Motifs iconographiques variés selon les travées', 'Certains cloîtres démontés et remontés dans des musées']),
        ],
      },
    ],
  },

  {
    id: 'templeprotestant',
    name: 'Temple protestant',
    region: 'Communautés réformées · France',
    periode: '1800–1900',
    procede: 'Pierre',
    usage: 'Lieu de culte réformé',
    categorie: 'religieuse',
    periodeTags: ['XIXe'],
    resume:
      "Édifice de culte réformé organisé en simple salle rectangulaire, sans statuaire ni image, centrée sur la chaire d’où se donne la prédication. Le Concordat de 1802 autorise la reconstruction de temples après les destructions consécutives à la révocation de l’édit de Nantes, dans une architecture volontairement sobre.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Communautés réformées, France'],
      ['Usage', 'Lieu de culte réformé'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Salle rectangulaire centrée sur la chaire'],
      ['Particularité', 'Absence d’images et de statuaire'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Bois (bancs, chaire)', 'Ardoise ou tuile', 'Verre (vitraux clairs)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois simple, couverture ardoise ou tuile, absence de flèche ostentatoire.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade sobre en pierre, fronton classique fréquent, peu de décor sculpté.' },
      { n: 3, el: 'Planchers', txt: 'Plancher ou dallage, bancs disposés face à la chaire centrale.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, salle unique sans chœur ni transept.' },
      { n: 5, el: 'Escalier', txt: 'Escalier vers une éventuelle galerie ou tribune d’orgue.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, construction souvent financée par souscription communautaire.' },
    ],
    sections: [
      {
        title: 'La prédication au centre',
        icon: 'ph ph-buildings',
        intro: "L’architecture réformée organise tout l’espace autour de la Parole prêchée, non autour de l’autel.",
        groups: [
          G(null, ['Chaire centrale, souvent surélevée', 'Bancs disposés pour une bonne écoute et visibilité', 'Table de communion simple, sans tabernacle']),
        ],
      },
      {
        title: 'Une sobriété volontaire',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Absence de statues et d’images pieuses', 'Vitraux clairs ou à motifs géométriques simples', 'Décor limité à des inscriptions bibliques']),
        ],
      },
      {
        title: 'Une architecture de la reconstruction',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Reconstruction après les destructions post-révocation de l’édit de Nantes', 'Financement communautaire par souscription', 'Implantation discrète, parfois en retrait de la rue']),
        ],
      },
    ],
  },

  {
    id: 'synagogue',
    name: 'Synagogue',
    region: 'Communautés juives · France',
    periode: '1800–1914',
    procede: 'Pierre',
    usage: 'Lieu de culte israélite',
    categorie: 'religieuse',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Édifice de culte israélite organisé autour de l’arche sainte contenant les rouleaux de la Torah et de la bimah, estrade centrale de lecture. Les grandes synagogues bâties en France au XIXe siècle adoptent souvent un style éclectique, mêlant réminiscences orientalistes, romanes ou byzantines.",
    identite: [
      ['Période', '1800–1914'],
      ['Région', 'Communautés juives, France'],
      ['Usage', 'Lieu de culte israélite'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Arche sainte orientée vers Jérusalem, bimah centrale'],
      ['Particularité', 'Style éclectique orientaliste'],
    ],
    materiaux: ['Pierre de taille', 'Fer (structure des galeries)', 'Verre (vitraux)', 'Bois (arche, bimah)', 'Céramique', 'Or (décor)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique ou bois, coupole ou voûte selon les édifices majeurs.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille, décor éclectique mêlant influences orientales et historicistes.' },
      { n: 3, el: 'Planchers', txt: 'Dallage ou parquet, galerie des femmes à l’étage sur les grandes synagogues.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, parfois structure métallique intérieure pour les galeries.' },
      { n: 5, el: 'Escalier', txt: 'Escalier menant à la galerie des femmes, distincte de la salle principale.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, orientation soigneusement calculée vers Jérusalem.' },
    ],
    sections: [
      {
        title: 'L’arche sainte et la bimah',
        icon: 'ph ph-buildings',
        intro: "L’organisation de la synagogue répond à des exigences liturgiques précises : orientation, place de l’arche, lecture de la Torah.",
        groups: [
          G(null, ['Arche sainte (aron ha-kodesh) orientée vers Jérusalem', 'Bimah centrale pour la lecture de la Torah', 'Galerie des femmes à l’étage dans les grandes synagogues']),
        ],
      },
      {
        title: 'Un style éclectique',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Réminiscences orientalistes, mauresques ou byzantines', 'Grandes verrières et coupoles dans les édifices urbains majeurs', 'Décor peint et doré à l’intérieur']),
        ],
      },
      {
        title: 'Une architecture d’émancipation',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Grandes synagogues urbaines construites après l’émancipation civile', 'Visibilité urbaine assumée dans certaines villes', 'Financement communautaire et parfois municipal']),
        ],
      },
    ],
  },

  {
    id: 'mosqueecontemporaine',
    name: 'Mosquée contemporaine',
    region: 'France',
    periode: '1980–2010',
    procede: 'Béton & céramique',
    usage: 'Lieu de culte musulman',
    categorie: 'religieuse',
    periodeTags: ['XXe'],
    resume:
      "Édifice de culte musulman construit en France depuis les années 1980, associant structure en béton contemporaine et vocabulaire ornemental traditionnel : minaret, coupole, mihrab orienté vers La Mecque et décor géométrique ou calligraphique. Une architecture qui négocie entre codes religieux hérités et écriture architecturale résolument actuelle.",
    identite: [
      ['Période', '1980–2010'],
      ['Région', 'France'],
      ['Usage', 'Lieu de culte musulman'],
      ['Système', 'Ossature béton armé'],
      ['Matériau dominant', 'Béton et céramique'],
      ['Plan', 'Salle de prière hypostyle orientée vers La Mecque'],
      ['Particularité', 'Minaret, coupole, mihrab, décor géométrique'],
    ],
    materiaux: ['Béton armé', 'Céramique (zellige)', 'Verre', 'Bois (menuiserie sculptée)', 'Plâtre sculpté', 'Métal (moucharabiehs)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Coupole en béton ou charpente métallique, souvent surmontée d’un croissant.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Béton et céramique, décor géométrique et calligraphique, moucharabiehs.' },
      { n: 3, el: 'Planchers', txt: 'Sol couvert de tapis, orientation marquée vers le mihrab.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature béton armé, salle de prière hypostyle ou volume unique dégagé.' },
      { n: 5, el: 'Escalier', txt: 'Escalier du minaret, parfois accessible pour l’appel à la prière.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en béton armé, orientation calculée vers La Mecque.' },
    ],
    sections: [
      {
        title: 'Mihrab & orientation',
        icon: 'ph ph-buildings',
        intro: "Toute la géométrie de la salle de prière s’organise autour de l’orientation vers La Mecque, matérialisée par le mihrab.",
        groups: [
          G(null, ['Mihrab en niche indiquant la direction de La Mecque', 'Minbar (chaire) pour le prêche du vendredi', 'Salle de prière hypostyle ou volume unique dégagé']),
        ],
      },
      {
        title: 'Minaret & coupole',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Minaret signalant l’édifice dans le paysage urbain', 'Coupole centrale en béton, parfois habillée de céramique', 'Silhouette contemporaine réinterprétant des formes traditionnelles']),
        ],
      },
      {
        title: 'Décor géométrique',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Zellige et céramique en frises géométriques', 'Calligraphie coranique sculptée ou peinte', 'Moucharabiehs contemporains filtrant la lumière']),
        ],
      },
    ],
  },
]

export const TYPOLOGIES_MAP = Object.fromEntries(TYPOLOGIES.map((t) => [t.id, t]))
