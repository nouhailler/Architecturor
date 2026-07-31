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

  {
    id: 'chateaufort',
    name: 'Château fort',
    region: 'France · sites médiévaux',
    periode: '1000–1500',
    procede: 'Pierre',
    usage: 'Forteresse seigneuriale',
    categorie: 'militaire',
    periodeTags: ['Avant 1800'],
    resume:
      "Résidence fortifiée du seigneur, organisée en enceintes successives autour d’un donjon refuge : courtines, tours de flanquement, chemin de ronde et pont-levis. Né de la motte castrale en bois, le château fort se pétrifie progressivement du XIe au XIIIe siècle pour résister au siège et affirmer un pouvoir territorial.",
    identite: [
      ['Période', 'XIe–XVe siècle'],
      ['Région', 'France, sites médiévaux'],
      ['Usage', 'Forteresse seigneuriale'],
      ['Système', 'Enceintes concentriques en pierre'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Basse-cour et haute-cour autour du donjon'],
      ['Particularité', 'Mâchicoulis, chemin de ronde, pont-levis'],
    ],
    materiaux: ['Pierre de taille', 'Moellons', 'Chaux', 'Bois (charpente, pont-levis)', 'Fer (herses, ferrures)', 'Plomb (couverture des tours)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toitures coniques ou en poivrière sur les tours, charpente bois, couverture ardoise ou plomb.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Courtines épaisses, tours de flanquement rondes, chemin de ronde crénelé.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois entre les niveaux du donjon et des tours résidentielles.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs très épais en pierre, tours rondes limitant les angles morts.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis dans l’épaisseur des tours, desservant chaque niveau.' },
      { n: 6, el: 'Fondations', txt: 'Fondations rocheuses ou massives, souvent sur un site naturellement défensif.' },
    ],
    sections: [
      {
        title: 'Des enceintes concentriques',
        icon: 'ph ph-grid-nine',
        intro: "Le château fort organise sa défense en profondeur : chaque enceinte franchie ralentit l’assaillant avant d’atteindre le donjon.",
        groups: [
          G(null, ['Basse-cour extérieure pour les communs et l’ost', 'Haute-cour resserrée autour du donjon', 'Fossé sec ou en eau entre les enceintes']),
        ],
      },
      {
        title: 'Le système défensif',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Tours rondes de flanquement supprimant les angles morts', 'Mâchicoulis pour le tir vertical', 'Archères et meurtrières dans l’épaisseur des murs']),
        ],
      },
      {
        title: 'Franchissements & accès',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Pont-levis enjambant le fossé', 'Herse doublant la porte principale', 'Chicane d’entrée limitant la charge frontale']),
        ],
      },
    ],
  },

  {
    id: 'donjon',
    name: 'Donjon',
    region: 'France · sites médiévaux',
    periode: '950–1350',
    procede: 'Pierre',
    usage: 'Tour maîtresse, refuge et résidence',
    categorie: 'militaire',
    periodeTags: ['Avant 1800'],
    resume:
      "Tour maîtresse du château, dernier refuge en cas de siège et résidence seigneuriale en temps de paix. D’abord carré puis majoritairement circulaire à partir du XIIe siècle pour mieux résister au sapement et aux projectiles, le donjon domine toujours la silhouette du château par sa hauteur.",
    identite: [
      ['Période', 'Xe–XIVe siècle'],
      ['Région', 'France, sites médiévaux'],
      ['Usage', 'Tour maîtresse, refuge et résidence'],
      ['Système', 'Murs porteurs en pierre très épais'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Tour carrée puis circulaire'],
      ['Particularité', 'Entrée surélevée, dernier refuge du château'],
    ],
    materiaux: ['Pierre de taille', 'Moellons', 'Chaux', 'Bois (planchers, échelle d’accès)', 'Fer', 'Plomb'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit en poivrière ou terrasse crénelée, charpente bois protégée.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de 2 à 4 mètres d’épaisseur, peu d’ouvertures, entrée surélevée.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois séparant salle basse, salle seigneuriale et niveaux supérieurs.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs, forme circulaire privilégiée contre le sapement.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis dans l’épaisseur du mur, ou échelle amovible à l’entrée.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes ou ancrage rocheux, résistant au sapement.' },
    ],
    sections: [
      {
        title: 'Le dernier refuge',
        icon: 'ph ph-shield-check',
        intro: "En cas de prise des enceintes extérieures, la garnison se replie dans le donjon, conçu pour tenir seul un siège prolongé.",
        groups: [
          G(null, ['Réserves de vivres et d’eau autonomes', 'Entrée surélevée accessible par échelle ou pont amovible', 'Murs épais résistant aux machines de siège']),
        ],
      },
      {
        title: 'Une résidence seigneuriale',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Salle seigneuriale aux étages supérieurs', 'Cheminées et latrines en encorbellement', 'Chapelle privée intégrée dans certains donjons']),
        ],
      },
      {
        title: 'Du plan carré au plan circulaire',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Donjons carrés (Xe–XIIe siècle), plus simples à bâtir', 'Donjons circulaires généralisés au XIIe siècle', 'Angles arrondis supprimant les points faibles du sapement']),
        ],
      },
    ],
  },

  {
    id: 'tourmedievale',
    name: 'Tour médiévale',
    region: 'France · enceintes urbaines',
    periode: '1100–1500',
    procede: 'Pierre',
    usage: 'Tour de guet et de défense',
    categorie: 'militaire',
    periodeTags: ['Avant 1800'],
    resume:
      "Tour isolée ou intégrée à une enceinte urbaine, dédiée au guet, à la transmission de signaux et à la défense rapprochée. Plus légère qu’un donjon seigneurial, elle ponctue les remparts de ville à intervalles réguliers pour couvrir les courtines par des tirs croisés.",
    identite: [
      ['Période', 'XIIe–XVe siècle'],
      ['Région', 'France, enceintes urbaines'],
      ['Usage', 'Tour de guet et de défense'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre locale'],
      ['Plan', 'Tour ronde ou semi-circulaire en saillie du rempart'],
      ['Particularité', 'Guet, signaux, tir croisé sur les courtines'],
    ],
    materiaux: ['Pierre locale', 'Moellons', 'Chaux', 'Bois (hourds, planchers)', 'Fer', 'Tuile ou ardoise'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit conique ou plateforme crénelée pour le guet, charpente légère.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre appareillée, archères réparties sur plusieurs niveaux de tir.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois desservant les niveaux de guet et de tir.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, tour semi-circulaire en saillie du rempart.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis desservant chaque niveau jusqu’à la plateforme de guet.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre ancrées au rempart adjacent.' },
    ],
    sections: [
      {
        title: 'Le guet et les signaux',
        icon: 'ph ph-shield-check',
        intro: "Postée en hauteur, la tour surveille les approches et relaie l’alerte par signaux visuels ou sonores vers la ville.",
        groups: [
          G(null, ['Plateforme de guet dominant les alentours', 'Transmission de signaux entre tours voisines', 'Guetteur logé en permanence en temps de tension']),
        ],
      },
      {
        title: 'Le tir croisé sur les courtines',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Tours espacées régulièrement le long du rempart', 'Archères orientées pour couvrir le pied des courtines', 'Aucun angle mort laissé à l’assaillant']),
        ],
      },
      {
        title: 'Murs en pierre',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Pierre locale appareillée avec soin en parement', 'Épaisseur dégressive du bas vers le haut', 'Hourds en bois amovibles en cas de siège']),
        ],
      },
    ],
  },

  {
    id: 'bastidefortifiee',
    name: 'Bastide fortifiée',
    region: 'Sud-Ouest · Aquitaine',
    periode: '1220–1370',
    procede: 'Pierre & pans de bois',
    usage: 'Ville neuve fortifiée',
    categorie: 'militaire',
    periodeTags: ['Avant 1800'],
    resume:
      "Ville neuve fondée sur un plan en damier autour d’une place centrale à couverts, dont le pourtour des maisons forme lui-même le rempart. Créées par centaines dans le Sud-Ouest au XIIIe siècle par les pouvoirs anglais, français et seigneuriaux rivaux, les bastides organisent peuplement, commerce et défense d’un même geste.",
    identite: [
      ['Période', 'XIIIe–XIVe siècle'],
      ['Région', 'Sud-Ouest, Aquitaine'],
      ['Usage', 'Ville neuve fortifiée'],
      ['Système', 'Plan en damier, pourtour fortifié'],
      ['Matériau dominant', 'Pierre et pans de bois'],
      ['Plan', 'Place centrale à couverts, rues en quadrillage'],
      ['Particularité', 'Église parfois elle-même fortifiée'],
    ],
    materiaux: ['Pierre locale', 'Chêne (couverts, pans de bois)', 'Torchis', 'Tuile canal ou plate', 'Chaux', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toitures individuelles des maisons, tuile canal ou plate selon les secteurs.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Maisons en pans de bois ou pierre, façades du pourtour formant un rempart continu.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois des maisons, couverts de la place sur poteaux de bois ou piliers de pierre.' },
      { n: 4, el: 'Structure porteuse', txt: 'Pans de bois ou murs de pierre selon les parcelles, portes fortifiées aux issues du plan.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers intérieurs propres à chaque maison du plan en lots réguliers.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, tracé régulier hérité du plan de fondation initial.' },
    ],
    sections: [
      {
        title: 'Un plan en damier',
        icon: 'ph ph-grid-nine',
        intro: "Fondée d’un seul jet par charte, la bastide applique un plan géométrique régulier, rare au Moyen Âge.",
        groups: [
          G(null, ['Rues rectilignes se coupant à angle droit', 'Place centrale à arcades (couverts) accueillant le marché', 'Lots de maisons de taille égale distribués aux nouveaux habitants']),
        ],
      },
      {
        title: 'Le pourtour fortifié',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Façades arrière des maisons périphériques formant le rempart', 'Portes fortifiées aux principaux accès', 'Économie de construction en évitant un rempart séparé']),
        ],
      },
      {
        title: 'Une fondation de peuplement',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Charte accordant franchises et libertés aux habitants', 'Rivalité entre pouvoirs anglo-gascons et capétiens', 'Église paroissiale parfois fortifiée en clocher-donjon']),
        ],
      },
    ],
  },

  {
    id: 'citadellevauban',
    name: 'Citadelle Vauban',
    region: 'Places fortes · France',
    periode: '1667–1707',
    procede: 'Pierre & brique',
    usage: 'Fortification bastionnée',
    categorie: 'militaire',
    periodeTags: ['Avant 1800'],
    resume:
      "Fortification bastionnée en étoile conçue par Vauban pour verrouiller les frontières du royaume, où chaque bastion couvre par son feu les faces voisines sans angle mort. Glacis, fossés, demi-lunes et casemates composent un système défensif méthodique, aujourd’hui classé au patrimoine mondial de l’UNESCO pour douze sites français.",
    identite: [
      ['Période', '1667–1707'],
      ['Région', 'Places fortes, France'],
      ['Usage', 'Fortification bastionnée'],
      ['Système', 'Trace bastionnée (« à la Vauban »)'],
      ['Matériau dominant', 'Pierre et brique'],
      ['Plan', 'Enceinte en étoile, bastions et demi-lunes'],
      ['Particularité', 'Glacis, fossés, tir rasant croisé'],
    ],
    materiaux: ['Pierre de taille', 'Brique (casemates)', 'Terre (remblais, glacis)', 'Chaux', 'Fer (affûts, ferrures)', 'Bois (charpentes de casernement)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toitures basses des casernements intérieurs, casemates voûtées à l’épreuve des bombes.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Escarpe en pierre de taille, bastions en étoile, glacis en pente douce.' },
      { n: 3, el: 'Planchers', txt: 'Planchers des casernements, plateformes d’artillerie sur les bastions.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs d’escarpe et de contrescarpe en pierre, remblais de terre entre les parements.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et rampes desservant les terrepleins des bastions.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes en pierre, fossés secs ou en eau selon le site.' },
    ],
    sections: [
      {
        title: 'La trace bastionnée',
        icon: 'ph ph-shield-check',
        intro: "Le tracé en étoile de Vauban élimine tout angle mort : chaque bastion défend par son feu les faces des bastions voisins.",
        groups: [
          G(null, ['Bastions en pointe couvrant les courtines adjacentes', 'Demi-lunes protégeant les portes et courtines', 'Glacis exposant l’assaillant au tir avant tout assaut']),
        ],
      },
      {
        title: 'Le système Vauban',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Méthode standardisée appliquée sur des dizaines de places fortes', 'Douze sites inscrits au patrimoine mondial de l’UNESCO', 'Vauban, commissaire général des fortifications du royaume']),
        ],
      },
      {
        title: 'Casemates & artillerie',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Casemates voûtées à l’épreuve des bombes', 'Plateformes d’artillerie sur les bastions', 'Casernements intérieurs pour la garnison']),
        ],
      },
    ],
  },

  {
    id: 'fortnapoleon',
    name: 'Fort Napoléon',
    region: 'Littoral & frontières · France',
    periode: '1800–1870',
    procede: 'Maçonnerie & terre',
    usage: 'Fort d’artillerie',
    categorie: 'militaire',
    periodeTags: ['XIXe'],
    resume:
      "Fort d’artillerie du XIXe siècle, hérité du système Vauban mais adapté à la portée croissante des canons : profils enterrés, casemates maçonnées et glacis étendus protègent la garnison et les pièces d’artillerie. Ces forts jalonnent le littoral et les frontières pour couvrir rades, ports et voies d’invasion.",
    identite: [
      ['Période', '1800–1870'],
      ['Région', 'Littoral et frontières, France'],
      ['Usage', 'Fort d’artillerie'],
      ['Système', 'Maçonnerie enterrée et glacis'],
      ['Matériau dominant', 'Pierre et maçonnerie'],
      ['Plan', 'Fort polygonal ou en étoile adapté au site'],
      ['Particularité', 'Casemates d’artillerie, fossés défendus par caponnières'],
    ],
    materiaux: ['Pierre de taille', 'Moellons', 'Terre (remblais, glacis)', 'Fer (affûts de canon)', 'Chaux', 'Brique (voûtes de casemates)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Casemates voûtées en berceau recouvertes de terre, protection contre les tirs plongeants.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Escarpe maçonnée basse, profil enterré limitant la cible offerte à l’ennemi.' },
      { n: 3, el: 'Planchers', txt: 'Planchers des casernements intérieurs, plateformes de tir pour l’artillerie.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs de maçonnerie épais, remblais de terre absorbant l’impact des projectiles.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et rampes reliant casemates, plateformes et fossés.' },
      { n: 6, el: 'Fondations', txt: 'Fondations maçonnées profondes, fossés défendus par des caponnières.' },
    ],
    sections: [
      {
        title: 'S’adapter à l’artillerie moderne',
        icon: 'ph ph-shield-check',
        intro: "L’allongement de la portée des canons impose des forts plus bas, plus enterrés, moins exposés que les hautes murailles de l’Ancien Régime.",
        groups: [
          G(null, ['Profil enterré limitant la silhouette exposée', 'Glacis étendu tenant l’ennemi à distance', 'Casemates maçonnées protégeant pièces et garnison']),
        ],
      },
      {
        title: 'Verrouiller le territoire',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Forts côtiers couvrant rades et ports stratégiques', 'Forts frontaliers complétant le dispositif Vauban', 'Ceintures fortifiées autour des grandes villes']),
        ],
      },
      {
        title: 'Défense rapprochée',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Caponnières défendant le fond des fossés', 'Poternes reliant les différents niveaux du fort', 'Garnison logée dans des casernements voûtés']),
        ],
      },
    ],
  },

  {
    id: 'blockhausatlantique',
    name: 'Blockhaus Atlantique',
    region: 'Littoral atlantique · France',
    periode: '1942–1944',
    procede: 'Béton armé',
    usage: 'Casemate défensive (Mur de l’Atlantique)',
    categorie: 'militaire',
    periodeTags: ['XXe'],
    resume:
      "Casemate en béton armé massif édifiée par l’Organisation Todt entre 1942 et 1944 pour former le Mur de l’Atlantique, chaîne défensive censée repousser un débarquement allié. Murs de plusieurs mètres d’épaisseur, embrasures de tir étroites et formes standardisées (types « Regelbau ») caractérisent ces vestiges encore nombreux sur le littoral.",
    identite: [
      ['Période', '1942–1944'],
      ['Région', 'Littoral atlantique, France'],
      ['Usage', 'Casemate défensive (Mur de l’Atlantique)'],
      ['Système', 'Coffrage béton armé monolithique'],
      ['Matériau dominant', 'Béton armé'],
      ['Plan', 'Types standardisés (« Regelbau »)'],
      ['Particularité', 'Murs de 2 à 3,5 m d’épaisseur, embrasures de tir'],
    ],
    materiaux: ['Béton armé', 'Acier (armatures, blindage des embrasures)', 'Coffrage bois (perdu)', 'Camouflage peint', 'Fer', 'Périscope (observation)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Dalle de béton armé de plusieurs mètres d’épaisseur, seule protection contre les bombardements.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de béton coulé monolithique, embrasure de tir unique orientée vers la mer.' },
      { n: 3, el: 'Planchers', txt: 'Dalle béton au sol, réserve de munitions et poste de tir sur un seul niveau généralement.' },
      { n: 4, el: 'Structure porteuse', txt: 'Volume monolithique en béton armé coulé en une fois, sans structure interne séparée.' },
      { n: 5, el: 'Escalier', txt: 'Accès en chicane bétonnée, parfois un niveau enterré pour les munitions.' },
      { n: 6, el: 'Fondations', txt: 'Radier béton épais, souvent posé à même le sable ou la roche côtière.' },
    ],
    sections: [
      {
        title: 'Un système standardisé',
        icon: 'ph ph-grid-nine',
        intro: "L’Organisation Todt construit ces ouvrages selon des plans types (« Regelbau ») répétés sur des milliers de kilomètres de côtes.",
        groups: [
          G(null, ['Plans standardisés selon la fonction (canon, mitrailleuse, observation)', 'Construction en série par une main-d’œuvre réquisitionnée', 'Chaîne défensive continue de la Norvège aux Pyrénées']),
        ],
      },
      {
        title: 'Une masse de béton armé',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Murs de 2 à 3,5 mètres d’épaisseur selon le type', 'Coulage monolithique limitant les points de faiblesse', 'Camouflage peint imitant le paysage environnant']),
        ],
      },
      {
        title: 'Un patrimoine de mémoire',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Vestiges massifs difficiles à démolir, toujours visibles sur le littoral', 'Reconversion en musées ou points de mémoire', 'Érosion côtière déplaçant certains ouvrages échoués sur la plage']),
        ],
      },
    ],
  },

  {
    id: 'caserne',
    name: 'Caserne',
    region: 'Villes de garnison · France',
    periode: '1700–1950',
    procede: 'Pierre ou brique',
    usage: 'Casernement militaire',
    categorie: 'militaire',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Ensemble de casernement organisé autour d’une vaste cour d’exercice, logeant troupe, chevaux et matériel dans des bâtiments à façades répétitives. Généralisée à partir de Louvois sous Louis XIV pour loger les troupes permanentes hors du logement chez l’habitant, la caserne structure encore aujourd’hui de nombreuses villes de garnison françaises.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Villes de garnison, France'],
      ['Usage', 'Casernement militaire'],
      ['Système', 'Murs porteurs en pierre ou brique'],
      ['Matériau dominant', 'Pierre ou brique selon les régions'],
      ['Plan', 'Cour d’exercice entourée de bâtiments'],
      ['Particularité', 'Façades répétitives, chambrées collectives'],
    ],
    materiaux: ['Pierre', 'Brique', 'Chaux', 'Chêne (charpente, planchers)', 'Ardoise ou tuile mécanique', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois répétitive, couverture ardoise ou tuile mécanique selon les régions.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façades sobres et répétitives en pierre ou brique, ordonnancement militaire strict.' },
      { n: 3, el: 'Planchers', txt: 'Solivage bois, grandes chambrées collectives desservies par des couloirs.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre ou brique, trame répétitive d’un bâtiment à l’autre.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers collectifs desservant les étages de chambrées.' },
      { n: 6, el: 'Fondations', txt: 'Semelles filantes en pierre, caves parfois voûtées pour les magasins.' },
    ],
    sections: [
      {
        title: 'La cour d’exercice',
        icon: 'ph ph-grid-nine',
        intro: "Tout le quartier militaire s’organise autour d’une vaste cour rectangulaire dédiée aux exercices et rassemblements.",
        groups: [
          G(null, ['Cour centrale pour l’instruction et les rassemblements', 'Bâtiments de chambrées sur le pourtour', 'Écuries, magasins et infirmerie en périphérie']),
        ],
      },
      {
        title: 'Une architecture répétitive',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Façades identiques d’un bâtiment à l’autre', 'Sobriété décorative, primauté de la fonction', 'Numérotation et signalétique militaire normalisée']),
        ],
      },
      {
        title: 'Loger la troupe permanente',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Fin du logement des soldats chez l’habitant sous Louvois', 'Chambrées collectives remplacées par des chambres plus petites au XXe siècle', 'Reconversions civiles fréquentes après désaffectation militaire']),
        ],
      },
    ],
  },

  {
    id: 'grange',
    name: 'Grange',
    region: 'France · fermes et domaines',
    periode: '1400–1900',
    procede: 'Bois ou pierre',
    usage: 'Stockage du foin et des récoltes',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Vaste bâtiment agricole dédié au stockage du foin, de la paille et des récoltes, organisé autour d’une grande aire centrale où l’on battait autrefois le grain. Sa charpente à très grande portée, souvent sans support intermédiaire, en fait l’un des plus grands volumes de la ferme traditionnelle.",
    identite: [
      ['Période', 'XVe–XIXe siècle'],
      ['Région', 'France, fermes et domaines'],
      ['Usage', 'Stockage du foin et des récoltes'],
      ['Système', 'Charpente bois de grande portée'],
      ['Matériau dominant', 'Bois ou pierre selon les régions'],
      ['Toiture', 'Tuile, chaume ou ardoise'],
      ['Particularité', 'Grande porte charretière, aire de battage'],
    ],
    materiaux: ['Chêne (charpente)', 'Pierre ou moellons', 'Torchis', 'Tuile ou chaume', 'Fer (ferrures de porte)', 'Paille'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente à très grande portée, souvent sans poteau intermédiaire, couverture tuile ou chaume.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Grande porte charretière permettant l’entrée des charrettes chargées.' },
      { n: 3, el: 'Planchers', txt: 'Aire de battage en terre battue ou pavée, volume unique ouvert sous comble.' },
      { n: 4, el: 'Structure porteuse', txt: 'Fermes de charpente reportant les charges sur des murs gouttereaux porteurs.' },
      { n: 5, el: 'Escalier', txt: 'Échelle meunière ou escalier extérieur menant au fenil supérieur.' },
      { n: 6, el: 'Fondations', txt: 'Semelles simples en pierre, dallage ou sol en terre battue.' },
    ],
    sections: [
      {
        title: 'L’aire de battage',
        icon: 'ph ph-stack',
        intro: "Avant la mécanisation, le grain était battu au fléau sur une aire centrale dégagée, entre les deux grandes portes de la grange.",
        groups: [
          G(null, ['Aire centrale en terre battue ou pavée', 'Deux portes opposées créant un courant d’air pour le vannage', 'Travées latérales pour le stockage des gerbes']),
        ],
      },
      {
        title: 'Une charpente de grande portée',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Fermes de charpente sans poteau central', 'Volume unique dégagé sous comble', 'Bois de charpente sélectionné pour sa longueur']),
        ],
      },
      {
        title: 'La porte charretière',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Large ouverture dimensionnée pour les charrettes attelées', 'Vantaux en bois massif à ferrures apparentes', 'Parfois doublée d’une petite porte piétonne']),
        ],
      },
    ],
  },

  {
    id: 'bergerie',
    name: 'Bergerie',
    region: 'Provence · zones pastorales',
    periode: '1600–1900',
    procede: 'Pierre',
    usage: 'Abri du troupeau ovin',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Bâtiment pastoral abritant le troupeau ovin, aux murs de pierre épais assurant fraîcheur l’été et protection l’hiver. Longue et basse, ouverte de rares baies, la bergerie surmontée d’un fenil accueille aussi la réserve de fourrage nécessaire à la mauvaise saison.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Provence, zones pastorales'],
      ['Usage', 'Abri du troupeau ovin'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre calcaire locale'],
      ['Toiture', 'Tuile canal ou lauze'],
      ['Particularité', 'Fenil à l’étage, liée à la transhumance'],
    ],
    materiaux: ['Pierre calcaire', 'Chaux', 'Bois (charpente)', 'Tuile canal', 'Paille ou foin', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente simple, couverture tuile canal ou lauze, isolant le fenil supérieur.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs épais en pierre, rares ouvertures pour limiter les écarts thermiques.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue, plancher haut séparant le fenil du troupeau.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en pierre, volume bas et allongé.' },
      { n: 5, el: 'Escalier', txt: 'Échelle ou escalier extérieur menant au fenil pour affourager depuis le haut.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, sol légèrement en pente pour l’évacuation du purin.' },
    ],
    sections: [
      {
        title: 'Un confort thermique pour le troupeau',
        icon: 'ph ph-wall',
        intro: "L’épaisseur des murs en pierre protège les bêtes de la chaleur estivale et du froid hivernal sans chauffage.",
        groups: [
          G(null, ['Murs très épais à forte inertie thermique', 'Peu d’ouvertures, orientation soignée', 'Volume bas limitant les déperditions']),
        ],
      },
      {
        title: 'Le fenil au-dessus du troupeau',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Réserve de foin isolant la toiture', 'Trappes pour affourager directement depuis le fenil', 'Accès séparé du niveau des bêtes']),
        ],
      },
      {
        title: 'La transhumance',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Bergerie de plaine occupée l’hiver', 'Estive de montagne l’été', 'Réseau de drailles reliant les deux territoires']),
        ],
      },
    ],
  },

  {
    id: 'etable',
    name: 'Étable',
    region: 'France · fermes d’élevage',
    periode: '1600–1950',
    procede: 'Pierre ou brique',
    usage: 'Abri du bétail bovin',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Bâtiment d’élevage bovin organisé autour d’une rangée de mangeoires et d’un couloir de service, souvent adossé au logis pour que la chaleur animale participe au chauffage de la maison. Plafond bas, sol pavé en légère pente et ventilation calculée caractérisent cette architecture utilitaire.",
    identite: [
      ['Période', 'XVIIe–XXe siècle'],
      ['Région', 'France, fermes d’élevage'],
      ['Usage', 'Abri du bétail bovin'],
      ['Système', 'Murs porteurs en pierre ou brique'],
      ['Matériau dominant', 'Pierre ou brique selon les régions'],
      ['Toiture', 'Tuile ou ardoise'],
      ['Particularité', 'Souvent accolée au logis (chaleur animale)'],
    ],
    materiaux: ['Pierre ou brique', 'Chaux', 'Bois (mangeoires, charpente)', 'Pavé (sol)', 'Tuile ou ardoise', 'Fer (attaches)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente simple, couverture tuile ou ardoise, faible hauteur sous plafond.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre ou brique, ouvertures hautes et étroites pour la ventilation.' },
      { n: 3, el: 'Planchers', txt: 'Sol pavé en légère pente vers une rigole d’évacuation du purin.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs simples, mangeoires en pierre ou bois le long des travées.' },
      { n: 5, el: 'Escalier', txt: 'Absence d’étage sur bête ; échelle vers un éventuel fenil attenant.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, sol légèrement surélevé contre l’humidité.' },
    ],
    sections: [
      {
        title: 'Organisation intérieure',
        icon: 'ph ph-rows',
        intro: "L’étable s’organise en travées régulières, chaque bête disposant de sa place le long de la mangeoire commune.",
        groups: [
          G(null, ['Mangeoire continue le long des travées', 'Couloir de service pour la distribution du fourrage', 'Rigole d’évacuation du purin en pente douce']),
        ],
      },
      {
        title: 'La chaleur animale',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Étable souvent accolée ou sous le logis', 'Chaleur des bêtes contribuant au chauffage', 'Plafond bas limitant le volume à chauffer']),
        ],
      },
      {
        title: 'Ventilation & hygiène',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Ouvertures hautes évitant les courants d’air directs', 'Sol pavé facilitant le nettoyage', 'Réserve de litière en paille à proximité']),
        ],
      },
    ],
  },

  {
    id: 'fenil',
    name: 'Fenil',
    region: 'France · fermes de montagne et de plaine',
    periode: '1700–1950',
    procede: 'Bois',
    usage: 'Stockage et séchage du foin',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Grenier à foin ventilé, en essentage de planches à claire-voie laissant circuler l’air pour sécher et conserver le fourrage. Placé à l’étage d’une grange ou d’une étable, ou parfois bâti isolément en montagne, le fenil constitue la réserve vitale pour nourrir le bétail en hiver.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'France, fermes de montagne et de plaine'],
      ['Usage', 'Stockage et séchage du foin'],
      ['Système', 'Ossature bois, parois à claire-voie'],
      ['Matériau dominant', 'Bois (planches d’essentage)'],
      ['Toiture', 'Bardeaux, tavaillons ou tuile'],
      ['Particularité', 'Parois ajourées pour la ventilation du foin'],
    ],
    materiaux: ['Bois (mélèze, épicéa)', 'Planches d’essentage', 'Fer (ferrures)', 'Tavaillon ou tuile', 'Paille', 'Foin'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente légère, couverture tavaillons, bardeaux ou tuile.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Planches d’essentage à claire-voie, jours calculés pour la ventilation.' },
      { n: 3, el: 'Planchers', txt: 'Plancher à claire-voie ou simple solivage supportant le foin en vrac.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois légère, adaptée au poids réparti du foin engrangé.' },
      { n: 5, el: 'Escalier', txt: 'Échelle extérieure ou trappe depuis le bâtiment inférieur.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement en pierre ou pilotis bois isolant le foin de l’humidité du sol.' },
    ],
    sections: [
      {
        title: 'Un séchage par ventilation naturelle',
        icon: 'ph ph-tree',
        intro: "L’essentage à claire-voie laisse circuler l’air à travers la masse de foin, évitant l’échauffement et la moisissure.",
        groups: [
          G(null, ['Planches espacées calculées selon le climat local', 'Circulation d’air traversante', 'Orientation tenant compte des vents dominants']),
        ],
      },
      {
        title: 'Une réserve vitale',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Foin engrangé assurant l’alimentation hivernale du bétail', 'Volume dimensionné selon la taille du troupeau', 'Trappes de distribution vers l’étable inférieure']),
        ],
      },
      {
        title: 'Ossature légère',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Charpente et parois en bois local', 'Soubassement surélevé contre l’humidité', 'Construction rapide et économique']),
        ],
      },
    ],
  },

  {
    id: 'colombier',
    name: 'Colombier',
    region: 'France · domaines seigneuriaux',
    periode: '1400–1789',
    procede: 'Pierre',
    usage: 'Élevage de pigeons (droit seigneurial)',
    categorie: 'agricole',
    periodeTags: ['Avant 1800'],
    resume:
      "Tour d’élevage de pigeons réservée avant la Révolution aux seigneurs justiciers, dont la capacité en boulins était réglementairement proportionnée à l’étendue des terres possédées. La fiente de pigeon, engrais précieux (colombine), et la chair de l’oiseau en faisaient un symbole de prestige autant qu’un outil agronomique.",
    identite: [
      ['Période', 'XVe–XVIIIe siècle'],
      ['Région', 'France, domaines seigneuriaux'],
      ['Usage', 'Élevage de pigeons (droit seigneurial)'],
      ['Système', 'Tour en pierre, boulins muraux'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Tour ronde ou carrée isolée'],
      ['Particularité', 'Droit de colombier réservé à la noblesse'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Bois (échelle tournante)', 'Tuile ou ardoise', 'Terre cuite (boulins)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit conique ou pyramidal, lanternon d’envol pour les pigeons.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille lisse, bandeau anti-rongeurs empêchant l’accès aux prédateurs.' },
      { n: 3, el: 'Planchers', txt: 'Absence de plancher intermédiaire ; volume unique tapissé de boulins.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre percés de centaines de boulins (nichoirs).' },
      { n: 5, el: 'Escalier', txt: 'Échelle tournante centrale (potence) permettant la collecte des œufs et de la colombine.' },
      { n: 6, el: 'Fondations', txt: 'Semelles en pierre, tour isolée au centre des terres du domaine.' },
    ],
    sections: [
      {
        title: 'Un privilège seigneurial',
        icon: 'ph ph-shield-check',
        intro: "Sous l’Ancien Régime, seuls les seigneurs justiciers disposaient du droit de colombier, dont la taille signalait l’étendue de leurs terres.",
        groups: [
          G(null, ['Capacité en boulins proportionnée à la superficie du domaine', 'Symbole de statut social et de pouvoir', 'Droit aboli à la Révolution en 1789']),
        ],
      },
      {
        title: 'Les boulins',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Centaines de niches individuelles en pierre ou terre cuite', 'Bandeau lisse anti-rongeurs à mi-hauteur', 'Lanternon sommital pour l’envol des pigeons']),
        ],
      },
      {
        title: 'Un outil agronomique',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Colombine, engrais azoté très recherché', 'Chair de pigeonneau pour la table seigneuriale', 'Échelle tournante facilitant la collecte sans déranger l’ensemble des nichoirs']),
        ],
      },
    ],
  },

  {
    id: 'pigeonnier',
    name: 'Pigeonnier',
    region: 'Quercy & Sud-Ouest · France',
    periode: '1600–1900',
    procede: 'Pierre ou pans de bois',
    usage: 'Élevage de pigeons (colombine)',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petit bâtiment d’élevage de pigeons plus modeste que le colombier seigneurial, intégré à la ferme ou bâti sur pilotis pour protéger les nichoirs des rongeurs. Sa démocratisation après l’abolition des droits féodaux en 1789 en fait un marqueur très répandu du paysage rural du Sud-Ouest.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Quercy et Sud-Ouest, France'],
      ['Usage', 'Élevage de pigeons (colombine)'],
      ['Système', 'Pierre, pans de bois ou pilotis'],
      ['Matériau dominant', 'Pierre ou pans de bois'],
      ['Plan', 'Tour, pavillon ou pigeonnier-porche'],
      ['Particularité', 'Souvent sur pilotis (protection anti-rongeurs)'],
    ],
    materiaux: ['Pierre locale', 'Chêne (pilotis, pans de bois)', 'Torchis', 'Tuile canal', 'Terre cuite (boulins)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit pentu, tuile canal, génoise en corniche protégeant les nichoirs.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre ou pans de bois, façade percée de boulins ou d’un simple pigeonnier intérieur.' },
      { n: 3, el: 'Planchers', txt: 'Plancher unique surélevé sur pilotis dans les modèles les plus caractéristiques.' },
      { n: 4, el: 'Structure porteuse', txt: 'Pilotis de chêne ou murs de pierre isolant le pigeonnier du sol.' },
      { n: 5, el: 'Escalier', txt: 'Échelle amovible ou escalier extérieur, retiré pour dissuader les rongeurs.' },
      { n: 6, el: 'Fondations', txt: 'Champignons de pierre au sommet des pilotis, infranchissables par les rats.' },
    ],
    sections: [
      {
        title: 'Le pigeonnier sur pilotis',
        icon: 'ph ph-stack',
        intro: "Élevé sur quatre ou six piliers coiffés d’un « champignon » de pierre, le pigeonnier isole totalement ses nichoirs des prédateurs terrestres.",
        groups: [
          G(null, ['Pilotis de pierre ou de bois surélevant la cabane', 'Champignons anti-rongeurs au sommet des piliers', 'Volume unique entièrement dédié aux nichoirs']),
        ],
      },
      {
        title: 'Une démocratisation post-révolutionnaire',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Droit de colombier aboli en 1789', 'Multiplication des petits pigeonniers paysans', 'Formes variées : tour, pavillon, pigeonnier-porche']),
        ],
      },
      {
        title: 'La colombine',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Fiente de pigeon utilisée comme engrais et poudre à canon', 'Ressource complémentaire pour l’exploitation familiale', 'Collecte régulière sous les nichoirs']),
        ],
      },
    ],
  },

  {
    id: 'pressoir',
    name: 'Pressoir',
    region: 'France · vignobles et vergers',
    periode: '1500–1900',
    procede: 'Pierre & bois',
    usage: 'Pressurage du raisin, de la pomme ou de l’olive',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Bâtiment abritant le mécanisme de pressurage, dominé par l’imposante vis de bois ou de pierre du pressoir à levier ou à vis, dimensionné selon qu’il traite le raisin, la pomme à cidre ou l’olive. Cave voûtée attenante pour la fermentation ou le stockage complète cet outil collectif ou seigneurial.",
    identite: [
      ['Période', 'XVIe–XIXe siècle'],
      ['Région', 'France, vignobles et vergers'],
      ['Usage', 'Pressurage du raisin, de la pomme ou de l’olive'],
      ['Système', 'Charpente porteuse du mécanisme de pressurage'],
      ['Matériau dominant', 'Pierre et bois'],
      ['Toiture', 'Tuile ou ardoise, forte charpente'],
      ['Particularité', 'Vis de pressoir monumentale en bois ou pierre'],
    ],
    materiaux: ['Pierre', 'Chêne (vis, cuve)', 'Chaux', 'Tuile ou ardoise', 'Fer (ferrures)', 'Bois (charpente renforcée)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente renforcée soutenant les efforts du mécanisme de pressurage.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs épais en pierre, grande porte pour l’entrée des charrettes de récolte.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre en légère pente pour l’écoulement du moût ou du jus.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente et murs dimensionnés pour encaisser la pression du mécanisme.' },
      { n: 5, el: 'Escalier', txt: 'Escalier vers la cave voûtée de fermentation ou de stockage des fûts.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en pierre, cave voûtée fréquente en sous-sol.' },
    ],
    sections: [
      {
        title: 'La vis du pressoir',
        icon: 'ph ph-hammer',
        intro: "Le pressoir à vis, souvent taillé dans un tronc de chêne unique, exerce une pression progressive sur la cage de bois contenant fruits ou raisins.",
        groups: [
          G(null, ['Vis monumentale en bois ou en pierre', 'Cage de bois contenant le marc à presser', 'Écoulement du jus par des rigoles taillées dans le sol']),
        ],
      },
      {
        title: 'Un bâtiment aux usages multiples',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Pressoir à vin, à cidre ou à huile selon les régions', 'Souvent bien collectif ou seigneurial (banalité)', 'Utilisation saisonnière concentrée sur les vendanges ou la récolte']),
        ],
      },
      {
        title: 'La cave attenante',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Cave voûtée pour la fermentation du moût', 'Stockage des fûts ou des jarres', 'Fraîcheur et obscurité propices à la conservation']),
        ],
      },
    ],
  },

  {
    id: 'fourapain',
    name: 'Four à pain',
    region: 'France · fermes et hameaux',
    periode: '1500–1900',
    procede: 'Brique & pierre',
    usage: 'Cuisson du pain communautaire ou familial',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petite construction voûtée en brique réfractaire ou pierre, chauffée par combustion directe de bois avant d’y enfourner le pain sur la sole encore chaude. Attenant à la maison ou partagé par un hameau, le four à pain rythmait la vie collective au fil des fournées hebdomadaires.",
    identite: [
      ['Période', 'XVIe–XIXe siècle'],
      ['Région', 'France, fermes et hameaux'],
      ['Usage', 'Cuisson du pain communautaire ou familial'],
      ['Système', 'Voûte en brique réfractaire'],
      ['Matériau dominant', 'Brique et pierre'],
      ['Toiture', 'Petit toit protecteur en tuile ou pierre'],
      ['Particularité', 'Sole chauffée par combustion directe de bois'],
    ],
    materiaux: ['Brique réfractaire', 'Pierre', 'Argile (sole)', 'Bois de chauffe', 'Chaux', 'Fer (porte du four)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Petit auvent ou toiture en pierre protégeant le four des intempéries.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Maçonnerie de brique ou pierre, gueule d’enfournement en façade.' },
      { n: 3, el: 'Planchers', txt: 'Sole en brique réfractaire ou terre cuite, chauffée directement par le feu.' },
      { n: 4, el: 'Structure porteuse', txt: 'Voûte en berceau ou en coupole de brique réfractaire.' },
      { n: 5, el: 'Escalier', txt: 'Sans étage ; simple accès de plain-pied à la gueule du four.' },
      { n: 6, el: 'Fondations', txt: 'Socle maçonné surélevant la sole du four du sol humide.' },
    ],
    sections: [
      {
        title: 'Le principe de la chaleur tournante',
        icon: 'ph ph-house-line',
        intro: "Le bois brûle directement sur la sole ; une fois les braises retirées, la chaleur accumulée dans la voûte cuit le pain enfourné.",
        groups: [
          G(null, ['Chauffe au bois directement sur la sole', 'Braises retirées avant l’enfournement du pain', 'Voûte en brique réfractaire accumulant la chaleur']),
        ],
      },
      {
        title: 'Un usage communautaire',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Four banal partagé par plusieurs foyers d’un hameau', 'Tour de fournée organisé collectivement', 'Four privé attenant à la maison pour les fermes isolées']),
        ],
      },
      {
        title: 'Construction voûtée',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Voûte en berceau ou en coupole selon les modèles', 'Brique réfractaire résistant aux hautes températures', 'Isolation en terre ou sable au-dessus de la voûte']),
        ],
      },
    ],
  },

  {
    id: 'moulinvent',
    name: 'Moulin à vent',
    region: 'Plaines & littoral · France',
    periode: '1200–1900',
    procede: 'Pierre & bois',
    usage: 'Mouture du grain par force éolienne',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Machine à moudre le grain actionnée par le vent, sous forme de moulin-tour en pierre à calotte pivotante ou de moulin-cavier entièrement orientable sur son pivot. Ailes toilées, mécanisme d’engrenages en bois et meules de pierre composent un ensemble technique raffiné, autrefois omniprésent dans les paysages de plaine.",
    identite: [
      ['Période', 'XIIIe–XIXe siècle'],
      ['Région', 'Plaines et littoral, France'],
      ['Usage', 'Mouture du grain par force éolienne'],
      ['Système', 'Ailes toilées et mécanisme d’engrenages bois'],
      ['Matériau dominant', 'Pierre (tour) et bois (mécanisme)'],
      ['Toiture', 'Calotte pivotante orientée face au vent'],
      ['Particularité', 'Meules de pierre entraînées par le vent'],
    ],
    materiaux: ['Pierre (tour)', 'Chêne (mécanisme, ailes)', 'Toile (ailes)', 'Meules de pierre', 'Fer (axes, engrenages)', 'Chaux'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Calotte ou toiture pivotante orientant les ailes face au vent dominant.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Tour de pierre conique, ouvertures réduites pour la solidité de la structure.' },
      { n: 3, el: 'Planchers', txt: 'Plusieurs niveaux desservant le mécanisme, les meules et le stockage du grain.' },
      { n: 4, el: 'Structure porteuse', txt: 'Tour de pierre porteuse ou fût de bois pivotant (moulin-cavier).' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois desservant les niveaux du mécanisme.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en pierre, pivot central pour les moulins caviers.' },
    ],
    sections: [
      {
        title: 'S’orienter face au vent',
        icon: 'ph ph-mountains',
        intro: "Pour capter le vent quelle que soit sa direction, le moulin doit pouvoir pivoter, soit par sa calotte, soit dans son ensemble.",
        groups: [
          G(null, ['Moulin-tour à calotte pivotante sur corps fixe', 'Moulin-cavier pivotant entièrement sur un pivot central', 'Queue de manœuvre pour orienter manuellement les ailes']),
        ],
      },
      {
        title: 'Le mécanisme de mouture',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Ailes toilées transmettant leur rotation à un arbre moteur', 'Engrenages de bois démultipliant la vitesse vers les meules', 'Meules de pierre dormante et tournante broyant le grain']),
        ],
      },
      {
        title: 'Un paysage disparu',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Des milliers de moulins jalonnaient les plaines céréalières', 'Déclin rapide avec la minoterie industrielle du XIXe siècle', 'Nombreux moulins restaurés aujourd’hui à vocation touristique']),
        ],
      },
    ],
  },

  {
    id: 'moulineau',
    name: 'Moulin à eau',
    region: 'Vallées fluviales · France',
    periode: '1000–1900',
    procede: 'Pierre & bois',
    usage: 'Mouture du grain par force hydraulique',
    categorie: 'agricole',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Bâtiment de meunerie implanté sur un cours d’eau, dont la roue à aubes ou à augets, actionnée par un bief dérivé de la rivière, entraîne les meules par un jeu d’engrenages. Antérieur au moulin à vent, le moulin à eau a aussi actionné forges, scieries et foulons à mesure que l’usage de la force hydraulique s’est diversifié.",
    identite: [
      ['Période', 'XIe–XIXe siècle'],
      ['Région', 'Vallées fluviales, France'],
      ['Usage', 'Mouture du grain par force hydraulique'],
      ['Système', 'Roue à aubes ou à augets'],
      ['Matériau dominant', 'Pierre et bois'],
      ['Toiture', 'Charpente bois, tuile ou ardoise'],
      ['Particularité', 'Bief dérivant l’eau de la rivière vers la roue'],
    ],
    materiaux: ['Pierre', 'Chêne (roue, mécanisme)', 'Meules de pierre', 'Fer (axes, vannes)', 'Chaux', 'Tuile ou ardoise'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile ou ardoise, abritant le mécanisme des meules.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de pierre en bord de rivière, roue à aubes en saillie ou logée sous le bâtiment.' },
      { n: 3, el: 'Planchers', txt: 'Niveaux desservant meules, trémies et sacs de farine.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, arbre moteur transmettant la rotation de la roue aux meules.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur en bois entre les niveaux du moulin.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre ancrées dans le lit ou la berge, vannes réglant le débit du bief.' },
    ],
    sections: [
      {
        title: 'Le bief et la roue',
        icon: 'ph ph-waves',
        intro: "Un canal dérivé de la rivière, le bief, concentre le débit et la chute d’eau nécessaires pour entraîner la roue avec suffisamment de force.",
        groups: [
          G(null, ['Bief de dérivation captant l’eau en amont', 'Roue à aubes (eau de surface) ou à augets (chute)', 'Vannes réglant le débit selon les saisons']),
        ],
      },
      {
        title: 'La transmission mécanique',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Arbre moteur transmettant la rotation de la roue', 'Engrenages de bois puis de fer démultipliant la vitesse', 'Meules dormante et tournante broyant le grain']),
        ],
      },
      {
        title: 'Au-delà de la farine',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Moulins à foulon pour le traitement des draps', 'Forges hydrauliques actionnant des martinets', 'Scieries hydrauliques dans les régions boisées']),
        ],
      },
    ],
  },

  {
    id: 'sechoirtabac',
    name: 'Séchoir à tabac',
    region: 'Dordogne & Garonne · France',
    periode: '1800–1950',
    procede: 'Bois (essentage)',
    usage: 'Séchage des feuilles de tabac',
    categorie: 'agricole',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Haut bâtiment à ossature bois dont les parois en planches mobiles s’ouvrent et se referment pour régler précisément la ventilation nécessaire au séchage lent des feuilles de tabac suspendues en hauteur. Sa silhouette élancée et son essentage caractéristique marquent encore les paysages du Sud-Ouest tabacole.",
    identite: [
      ['Période', 'XIXe–XXe siècle'],
      ['Région', 'Dordogne et Garonne, France'],
      ['Usage', 'Séchage des feuilles de tabac'],
      ['Système', 'Ossature bois, parois mobiles'],
      ['Matériau dominant', 'Bois (essentage réglable)'],
      ['Toiture', 'Tuile ou fibrociment, charpente élevée'],
      ['Particularité', 'Lattes pivotantes réglant la ventilation'],
    ],
    materiaux: ['Bois (ossature, lattes)', 'Fer (charnières, tringles)', 'Tuile ou fibrociment', 'Fil (suspension des feuilles)', 'Pierre (soubassement)', 'Peinture protectrice'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente haute et légère, couverture tuile ou fibrociment selon les époques.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Lattes de bois pivotantes réglables, actionnées par des tringles depuis le sol.' },
      { n: 3, el: 'Planchers', txt: 'Plusieurs niveaux de perches horizontales pour suspendre les feuilles enfilées.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois élevée, charpente légère mais très haute.' },
      { n: 5, el: 'Escalier', txt: 'Échelles intérieures desservant les différents niveaux de perches.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement en pierre ou plots béton, structure bois surélevée du sol.' },
    ],
    sections: [
      {
        title: 'Un séchage finement réglé',
        icon: 'ph ph-columns',
        intro: "L’ouverture des lattes se règle selon l’hygrométrie et le vent pour obtenir un séchage lent et homogène des feuilles.",
        groups: [
          G(null, ['Lattes pivotantes actionnées par tringles depuis le sol', 'Réglage fin selon la météo du jour', 'Séchage pouvant durer plusieurs semaines']),
        ],
      },
      {
        title: 'Suspendre la récolte',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Feuilles enfilées sur des ficelles ou des lattes', 'Perches disposées sur plusieurs niveaux', 'Volume intérieur entièrement dédié au séchage']),
        ],
      },
      {
        title: 'Un paysage agricole du Sud-Ouest',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Culture du tabac développée en vallée de la Garonne et de la Dordogne', 'Silhouette élancée reconnaissable de loin', 'Nombreux séchoirs aujourd’hui reconvertis ou à l’abandon']),
        ],
      },
    ],
  },

  {
    id: 'hangaragricole',
    name: 'Hangar agricole',
    region: 'France · exploitations agricoles',
    periode: '1950–2020',
    procede: 'Acier & béton',
    usage: 'Stockage de matériel et de récoltes',
    categorie: 'agricole',
    periodeTags: ['XXe'],
    resume:
      "Grand volume industrialisé à ossature métallique ou en béton, dimensionné pour abriter machines agricoles, fourrage en grande quantité ou récoltes en vrac. Sa portée dégagée sans poteau intermédiaire et sa rapidité de montage traduisent la mécanisation et l’agrandissement des exploitations depuis l’après-guerre.",
    identite: [
      ['Période', '1950–2020'],
      ['Région', 'France, exploitations agricoles'],
      ['Usage', 'Stockage de matériel et de récoltes'],
      ['Système', 'Ossature métallique ou portiques béton'],
      ['Matériau dominant', 'Acier et béton'],
      ['Toiture', 'Bac acier ou fibrociment'],
      ['Particularité', 'Grande portée dégagée, montage rapide'],
    ],
    materiaux: ['Acier (ossature)', 'Béton (dalle, plots)', 'Bac acier (bardage et toiture)', 'Polycarbonate (éclairage zénithal)', 'Bois (parfois en structure secondaire)', 'Peinture anticorrosion'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique légère, couverture en bac acier ou fibrociment.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Bardage en bac acier, larges ouvertures pour l’entrée des engins agricoles.' },
      { n: 3, el: 'Planchers', txt: 'Dalle béton au sol, résistante au passage répété des engins lourds.' },
      { n: 4, el: 'Structure porteuse', txt: 'Portiques métalliques ou béton offrant une portée dégagée sans poteau intermédiaire.' },
      { n: 5, el: 'Escalier', txt: 'Généralement de plain-pied ; mezzanine technique possible dans les modèles récents.' },
      { n: 6, el: 'Fondations', txt: 'Plots béton individuels sous chaque poteau de la structure métallique.' },
    ],
    sections: [
      {
        title: 'Une structure industrialisée',
        icon: 'ph ph-crane-tower',
        intro: "Fabriqués en série et montés rapidement sur le terrain, ces hangars accompagnent la mécanisation croissante des exploitations.",
        groups: [
          G(null, ['Portiques métalliques préfabriqués en usine', 'Montage rapide sur plots béton', 'Portée dégagée pour manœuvrer de gros engins']),
        ],
      },
      {
        title: 'Des usages multiples',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Remisage du matériel agricole motorisé', 'Stockage de fourrage ou de céréales en vrac', 'Parfois converti en bâtiment d’élevage hors-sol']),
        ],
      },
      {
        title: 'Sobriété fonctionnelle',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Aucun décor, primauté donnée à la fonction', 'Éclairage zénithal en polycarbonate translucide', 'Entretien réduit grâce aux matériaux industriels']),
        ],
      },
    ],
  },

  {
    id: 'filature',
    name: 'Filature',
    region: 'Nord & Normandie · bassins textiles',
    periode: '1800–1900',
    procede: 'Brique & fonte',
    usage: 'Filature de coton ou de laine',
    categorie: 'industrielle',
    periodeTags: ['XIXe'],
    resume:
      "Usine de filature textile organisée sur plusieurs niveaux au-dessus d’une halle à piliers de fonte, où de vastes rangées de fenêtres éclairaient les métiers à filer. La machine à vapeur, puis l’électricité, y remplace progressivement la roue hydraulique au fil du XIXe siècle industriel.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Nord et Normandie, bassins textiles'],
      ['Usage', 'Filature de coton ou de laine'],
      ['Système', 'Halle à piliers de fonte'],
      ['Matériau dominant', 'Brique et fonte'],
      ['Plan', 'Bâtiment étagé à trame régulière'],
      ['Particularité', 'Grandes fenêtres, cheminée de la salle des machines'],
    ],
    materiaux: ['Brique', 'Fonte (piliers)', 'Bois (planchers)', 'Verre (grandes baies)', 'Fer (charpente)', 'Acier (machines)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique ou bois, cheminée d’usine élancée en brique.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique appareillée, rangées régulières de grandes fenêtres pour l’éclairage naturel.' },
      { n: 3, el: 'Planchers', txt: 'Planchers portés par des piliers de fonte, trame structurelle très régulière.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux de fonte et poutres métalliques libérant de larges plateaux de production.' },
      { n: 5, el: 'Escalier', txt: 'Cages d’escalier et monte-charges reliant les niveaux de production.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives supportant les vibrations des machines de filature.' },
    ],
    sections: [
      {
        title: 'La halle à piliers de fonte',
        icon: 'ph ph-columns',
        intro: "Les piliers de fonte, plus fins que des colonnes de pierre, libèrent un maximum de surface au sol pour aligner les métiers à filer.",
        groups: [
          G(null, ['Poteaux de fonte à section réduite', 'Trame régulière optimisant l’implantation des machines', 'Planchers bois portés par les poutres métalliques']),
        ],
      },
      {
        title: 'La lumière au service de la production',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Grandes fenêtres rythmant toute la façade', 'Éclairage naturel indispensable au travail du fil', 'Complément par éclairage au gaz puis électrique']),
        ],
      },
      {
        title: 'De l’eau à la vapeur',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Implantation initiale près d’un cours d’eau', 'Machine à vapeur puis moteur électrique', 'Cheminée d’usine signalant la salle des machines']),
        ],
      },
    ],
  },

  {
    id: 'forge',
    name: 'Forge',
    region: 'Massifs forestiers · France',
    periode: '1600–1900',
    procede: 'Pierre & bois',
    usage: 'Production de fer au marteau hydraulique',
    categorie: 'industrielle',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Établissement métallurgique isolé en forêt, où une roue hydraulique actionne à la fois le soufflet du fourneau et le lourd marteau qui corrobore le fer. La proximité du bois pour le charbon de bois et d’un cours d’eau pour la force motrice conditionne entièrement l’implantation de la forge.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Massifs forestiers, France'],
      ['Usage', 'Production de fer au marteau hydraulique'],
      ['Système', 'Roue hydraulique + marteau et soufflet'],
      ['Matériau dominant', 'Pierre et bois'],
      ['Toiture', 'Charpente bois, couverture tuile ou ardoise'],
      ['Particularité', 'Martinet actionné par la force de l’eau'],
    ],
    materiaux: ['Pierre', 'Bois (charpente, roue)', 'Fer (production, ferrures)', 'Charbon de bois', 'Chaux', 'Tuile ou ardoise'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois robuste, ouvertures pour l’évacuation de la fumée et de la chaleur.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de pierre épais, grande ouverture pour le passage des pièces de fer.' },
      { n: 3, el: 'Planchers', txt: 'Sol maçonné résistant aux vibrations du martinet et à la chaleur du foyer.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente massive supportant l’axe du marteau et le bâti du soufflet.' },
      { n: 5, el: 'Escalier', txt: 'Passerelle desservant la roue hydraulique et le bief attenant.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre ancrées au bief, canal de fuite évacuant l’eau motrice.' },
    ],
    sections: [
      {
        title: 'La force de l’eau',
        icon: 'ph ph-waves',
        intro: "Une même roue hydraulique actionne à la fois le soufflet qui attise le feu et le marteau qui façonne le métal.",
        groups: [
          G(null, ['Roue hydraulique alimentée par un bief dérivé', 'Transmission mécanique vers le soufflet et le marteau', 'Vanne réglant le débit selon les besoins de production']),
        ],
      },
      {
        title: 'Le martinet',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Lourd marteau de fer actionné par came', 'Corroyage du fer en barres ou en pièces', 'Bruit caractéristique rythmant la vie du hameau industriel']),
        ],
      },
      {
        title: 'Une implantation forestière',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Proximité du bois pour la production de charbon de bois', 'Cours d’eau indispensable à la force motrice', 'Déclin au XIXe siècle face au charbon minéral et à la fonte au coke']),
        ],
      },
    ],
  },

  {
    id: 'hautfourneau',
    name: 'Haut-fourneau',
    region: 'Lorraine · bassin sidérurgique',
    periode: '1850–1950',
    procede: 'Brique réfractaire & fonte',
    usage: 'Production de fonte',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Tour métallurgique monumentale où le minerai de fer, le coke et le calcaire fondent en continu pour produire de la fonte liquide, dans un cycle alimenté par le sommet (gueulard) et vidé à la base. Symbole de la sidérurgie lorraine, le haut-fourneau domine ses usines de plusieurs dizaines de mètres.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'Lorraine, bassin sidérurgique'],
      ['Usage', 'Production de fonte'],
      ['Système', 'Cuve verticale à chargement continu'],
      ['Matériau dominant', 'Brique réfractaire et fonte'],
      ['Hauteur', '30 à 60 mètres'],
      ['Particularité', 'Chargement au gueulard, coulée à la base'],
    ],
    materiaux: ['Brique réfractaire', 'Fonte (blindage)', 'Acier (structure)', 'Coke', 'Minerai de fer', 'Calcaire (fondant)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Gueulard sommital pour le chargement continu du minerai, du coke et du calcaire.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Cuve en brique réfractaire cerclée d’un blindage de tôle ou de fonte.' },
      { n: 3, el: 'Planchers', txt: 'Plateformes métalliques desservant les différents niveaux de la cuve.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature métallique autour de la cuve réfractaire, tuyères d’air chaud à la base.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et ascenseur à charbon desservant le sommet pour le chargement.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en béton armé supportant plusieurs milliers de tonnes.' },
    ],
    sections: [
      {
        title: 'Un cycle continu',
        icon: 'ph ph-crane-tower',
        intro: "Le haut-fourneau fonctionne sans interruption, parfois pendant des années, du chargement au sommet à la coulée de fonte à la base.",
        groups: [
          G(null, ['Chargement par le gueulard au sommet', 'Descente progressive de la charge dans la cuve', 'Coulée de fonte liquide au creuset, en bas de la cuve']),
        ],
      },
      {
        title: 'La chimie du fer',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Coke comme combustible et réducteur du minerai', 'Calcaire captant les impuretés (laitier)', 'Air chaud soufflé par les tuyères activant la combustion']),
        ],
      },
      {
        title: 'Un paysage industriel',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Batteries de plusieurs hauts-fourneaux dans les grandes usines', 'Silhouette dominant tout le bassin sidérurgique', 'Vestiges patrimoniaux après la désindustrialisation']),
        ],
      },
    ],
  },

  {
    id: 'usinetextile',
    name: 'Usine textile',
    region: 'Nord · Hauts-de-France',
    periode: '1850–1950',
    procede: 'Brique & sheds métalliques',
    usage: 'Tissage industriel',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Grande usine de tissage organisée en halles basses couvertes de sheds, ces toitures en dents de scie dont les pans vitrés orientés au nord diffusent une lumière constante sans éblouissement. Souvent flanquée d’une cité ouvrière, l’usine textile structure des quartiers entiers du Nord industriel.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'Nord, Hauts-de-France'],
      ['Usage', 'Tissage industriel'],
      ['Système', 'Halles à sheds métalliques'],
      ['Matériau dominant', 'Brique et structure métallique'],
      ['Toiture', 'Sheds vitrés orientés au nord'],
      ['Particularité', 'Cité ouvrière associée à l’usine'],
    ],
    materiaux: ['Brique', 'Acier (charpente des sheds)', 'Verre (vitrage nord)', 'Fonte (poteaux)', 'Bois (planchers)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Sheds en dents de scie, pans vitrés orientés au nord pour une lumière stable.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique industrielle, façade principale plus soignée côté rue.' },
      { n: 3, el: 'Planchers', txt: 'Rez-de-chaussée dégagé pour les métiers à tisser, planchers d’étage pour d’autres ateliers.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux métalliques ou de fonte supportant la charpente des sheds.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers desservant bureaux et ateliers annexes en périphérie de la halle.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre ou béton, adaptées au poids des métiers à tisser.' },
    ],
    sections: [
      {
        title: 'Le toit en sheds',
        icon: 'ph ph-house-line',
        intro: "L’orientation nord des vitrages évite l’ensoleillement direct, source d’ombres et de reflets gênants pour le travail du tissage.",
        groups: [
          G(null, ['Pans vitrés orientés systématiquement au nord', 'Lumière diffuse et constante toute la journée', 'Multiplication des sheds pour couvrir de vastes halles']),
        ],
      },
      {
        title: 'La cité ouvrière',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Logements patronaux à proximité immédiate de l’usine', 'École, économat et équipements sociaux associés', 'Paternalisme industriel encadrant la vie ouvrière']),
        ],
      },
      {
        title: 'Un patrimoine en reconversion',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Nombreuses friches après le déclin textile du XXe siècle', 'Reconversions en logements, bureaux ou équipements culturels', 'Sheds emblématiques souvent conservés lors des réhabilitations']),
        ],
      },
    ],
  },

  {
    id: 'sucrerie',
    name: 'Sucrerie',
    region: 'Picardie & Nord · France',
    periode: '1830–1950',
    procede: 'Brique & métal',
    usage: 'Raffinage du sucre de betterave',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Complexe industriel saisonnier transformant la betterave sucrière en sucre, actif seulement quelques mois durant la « campagne » d’automne. Tours de diffusion, batteries d’évaporateurs et haute cheminée composent un ensemble technique complexe, embranché au chemin de fer pour l’acheminement massif des betteraves.",
    identite: [
      ['Période', '1830–1950'],
      ['Région', 'Picardie et Nord, France'],
      ['Usage', 'Raffinage du sucre de betterave'],
      ['Système', 'Diffusion, évaporation, cristallisation'],
      ['Matériau dominant', 'Brique et structure métallique'],
      ['Toiture', 'Charpente métallique, cheminée élancée'],
      ['Particularité', 'Activité saisonnière (campagne betteravière)'],
    ],
    materiaux: ['Brique', 'Acier (cuves, structure)', 'Fonte', 'Cuivre (chaudières)', 'Verre', 'Bois (bureaux, planchers)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique de grande portée, haute cheminée de brique signalant la sucrerie.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique industrielle, larges ouvertures pour la ventilation des ateliers.' },
      { n: 3, el: 'Planchers', txt: 'Passerelles métalliques desservant les cuves de diffusion et d’évaporation.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature métallique supportant les grandes cuves et tours de process.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers métalliques et passerelles reliant les différents ateliers de production.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en béton armé, embranchement ferroviaire pour l’arrivage des betteraves.' },
    ],
    sections: [
      {
        title: 'La campagne betteravière',
        icon: 'ph ph-grid-nine',
        intro: "L’essentiel de l’activité se concentre sur quelques semaines d’automne, à la récolte de la betterave, mobilisant une main-d’œuvre saisonnière importante.",
        groups: [
          G(null, ['Réception massive des betteraves par voie ferrée', 'Production intensive pendant la campagne d’automne', 'Arrêt et maintenance le reste de l’année']),
        ],
      },
      {
        title: 'Le procédé de raffinage',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Diffusion extrayant le sucre des cossettes de betterave', 'Évaporateurs concentrant le jus sucré', 'Cristallisation et centrifugation du sucre final']),
        ],
      },
      {
        title: 'Un paysage industriel rural',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Haute cheminée visible dans la plaine agricole', 'Silos et hangars de stockage attenants', 'Lien étroit avec les exploitations betteravières environnantes']),
        ],
      },
    ],
  },

  {
    id: 'distillerie',
    name: 'Distillerie',
    region: 'Charentes & DOM · France',
    periode: '1700–1950',
    procede: 'Cuivre & pierre',
    usage: 'Distillation (cognac, rhum, armagnac)',
    categorie: 'industrielle',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Établissement de distillation organisé autour des alambics de cuivre et des chais de vieillissement où les eaux-de-vie murissent en fût pendant des années. Le champignon noir qui noircit les murs extérieurs des chais, nourri par la vapeur d’alcool évaporée (la « part des anges »), signale de loin la présence d’une distillerie.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Charentes et DOM, France'],
      ['Usage', 'Distillation (cognac, rhum, armagnac)'],
      ['Système', 'Alambics de cuivre, double distillation'],
      ['Matériau dominant', 'Cuivre et pierre'],
      ['Plan', 'Salle de distillation + chais de vieillissement'],
      ['Particularité', 'Champignon noir (Torula) sur les murs des chais'],
    ],
    materiaux: ['Cuivre (alambics)', 'Pierre', 'Chêne (fûts)', 'Chaux', 'Fer', 'Tuile ou ardoise'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois, couverture tuile, évacuation de la vapeur des alambics.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de pierre, noircis par le champignon Torula nourri des vapeurs d’alcool.' },
      { n: 3, el: 'Planchers', txt: 'Sol de la salle de chauffe résistant à la chaleur des alambics.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente robuste dans les chais pour soutenir plusieurs niveaux de fûts.' },
      { n: 5, el: 'Escalier', txt: 'Passerelles et escaliers desservant les niveaux de gerbage des fûts.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, sol drainé sous les alambics et les chais.' },
    ],
    sections: [
      {
        title: 'Les alambics de cuivre',
        icon: 'ph ph-hammer',
        intro: "Le cuivre, excellent conducteur de chaleur et catalyseur chimique, reste le matériau de référence pour les alambics de distillation.",
        groups: [
          G(null, ['Alambic charentais à double distillation (chauffe et repasse)', 'Chauffe directe au feu nu traditionnellement', 'Forme en col de cygne favorisant la finesse aromatique']),
        ],
      },
      {
        title: 'Les chais de vieillissement',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Fûts de chêne empilés sur plusieurs niveaux', 'Obscurité et hygrométrie contrôlées', 'Vieillissement s’étalant parfois sur plusieurs décennies']),
        ],
      },
      {
        title: 'La part des anges',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Évaporation naturelle de l’alcool à travers le bois des fûts', 'Champignon noir (Torula) colonisant les murs extérieurs', 'Signature visuelle caractéristique des chais anciens']),
        ],
      },
    ],
  },

  {
    id: 'manufacture',
    name: 'Manufacture',
    region: 'France · manufactures royales',
    periode: '1660–1790',
    procede: 'Pierre',
    usage: 'Production centralisée sous privilège royal',
    categorie: 'industrielle',
    periodeTags: ['Avant 1800'],
    resume:
      "Grand atelier centralisé regroupant sous un même toit des artisans spécialisés produisant des biens de luxe sous privilège et souvent monopole royal. Précurseur de l’usine par sa concentration de main-d’œuvre, la manufacture reste antérieure à la mécanisation, fondée sur la division du travail artisanal.",
    identite: [
      ['Période', '1660–1790'],
      ['Région', 'France, manufactures royales'],
      ['Usage', 'Production centralisée sous privilège royal'],
      ['Système', 'Ateliers regroupés autour d’une cour'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Grands corps de bâtiments organisés en cour'],
      ['Particularité', 'Monopole ou privilège royal (colbertisme)'],
    ],
    materiaux: ['Pierre de taille', 'Chaux', 'Bois (métiers, charpente)', 'Ardoise ou tuile', 'Verre', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois classique, couverture ardoise, silhouette monumentale.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre de taille, façade ordonnancée à l’instar des grands édifices classiques.' },
      { n: 3, el: 'Planchers', txt: 'Grands ateliers desservis par des planchers bois, éclairage naturel abondant.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en pierre, corps de bâtiments organisés autour d’une cour.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers monumentaux desservant les ateliers de direction et d’administration.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, caves pour le stockage des matières premières.' },
    ],
    sections: [
      {
        title: 'Le colbertisme',
        icon: 'ph ph-shield-check',
        intro: "Sous Colbert, l’État favorise la création de manufactures royales pour affranchir la France des importations de produits de luxe.",
        groups: [
          G(null, ['Privilège ou monopole accordé par la Couronne', 'Production de biens de luxe (tapisserie, porcelaine, glaces)', 'Politique mercantiliste de substitution aux importations']),
        ],
      },
      {
        title: 'Concentrer les artisans',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Regroupement de corps de métiers spécialisés', 'Division du travail sans mécanisation encore', 'Logements parfois intégrés pour les meilleurs artisans']),
        ],
      },
      {
        title: 'Une préfiguration de l’usine',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Concentration de main-d’œuvre inédite pour l’époque', 'Organisation hiérarchique de la production', 'Certaines manufactures perdurent encore aujourd’hui (Sèvres, Gobelins)']),
        ],
      },
    ],
  },

  {
    id: 'mine',
    name: 'Mine',
    region: 'Bassins miniers · France',
    periode: '1830–1990',
    procede: 'Brique & métal',
    usage: 'Extraction du charbon (carreau de fosse)',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Carreau de fosse regroupant en surface l’ensemble des installations liées à l’extraction : lampisterie, bains-douches, criblage-lavage du charbon et voies ferrées d’évacuation. Le terril, colline artificielle de déblais, et le chevalement dominant le puits composent la silhouette caractéristique des bassins miniers.",
    identite: [
      ['Période', '1830–1990'],
      ['Région', 'Bassins miniers, France'],
      ['Usage', 'Extraction du charbon (carreau de fosse)'],
      ['Système', 'Ensemble de bâtiments autour du puits'],
      ['Matériau dominant', 'Brique et structure métallique'],
      ['Plan', 'Carreau organisé autour du chevalement'],
      ['Particularité', 'Terril, lampisterie, bains-douches'],
    ],
    materiaux: ['Brique', 'Acier (structures, rails)', 'Béton', 'Bois (étais de galerie)', 'Charbon', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpentes métalliques des grands bâtiments de criblage et de triage.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique industrielle, façades fonctionnelles des bâtiments de service.' },
      { n: 3, el: 'Planchers', txt: 'Planchers métalliques des installations de triage et de lavage du charbon.' },
      { n: 4, el: 'Structure porteuse', txt: 'Structures métalliques et bâtiments en brique organisés autour du puits.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et passerelles reliant les différents bâtiments du carreau.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en béton armé autour de la tête de puits.' },
    ],
    sections: [
      {
        title: 'Le carreau de fosse',
        icon: 'ph ph-grid-nine',
        intro: "Autour du puits d’extraction s’organise tout un ensemble de bâtiments dédiés à la vie et au travail des mineurs.",
        groups: [
          G(null, ['Lampisterie pour la distribution des lampes de sécurité', 'Bains-douches (salles Dumont) pour les mineurs remontés', 'Criblage-lavage triant et nettoyant le charbon extrait']),
        ],
      },
      {
        title: 'Le terril',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Colline artificielle formée des déblais stériles', 'Silhouette reconnaissable des paysages miniers', 'Certains terrils reconvertis en espaces naturels ou de loisirs']),
        ],
      },
      {
        title: 'Un patrimoine classé',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Bassin minier du Nord-Pas-de-Calais inscrit à l’UNESCO', 'Reconversion de nombreux sites en lieux de mémoire', 'Cités minières associées, souvent préservées']),
        ],
      },
    ],
  },

  {
    id: 'chevalement',
    name: 'Chevalement',
    region: 'Bassins miniers · France',
    periode: '1850–1990',
    procede: 'Acier',
    usage: 'Structure de puits de mine',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Tour métallique en treillis dominant le puits de mine, portant à son sommet les molettes autour desquelles s’enroulent les câbles remontant la cage d’extraction. Silhouette la plus emblématique du patrimoine minier, le chevalement rythme l’horizon des bassins houillers de son architecture toute en légèreté structurelle.",
    identite: [
      ['Période', '1850–1990'],
      ['Région', 'Bassins miniers, France'],
      ['Usage', 'Structure de puits de mine'],
      ['Système', 'Tour en treillis métallique'],
      ['Matériau dominant', 'Acier'],
      ['Hauteur', '20 à 60 mètres'],
      ['Particularité', 'Molettes sommitales pour les câbles d’extraction'],
    ],
    materiaux: ['Acier (treillis, poutres)', 'Fonte (premières structures)', 'Béton (fondations, socle)', 'Câbles d’acier', 'Fer', 'Peinture anticorrosion'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Sommet ouvert portant les molettes, sans couverture proprement dite.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Structure en treillis d’acier ajourée, sans remplissage de façade.' },
      { n: 3, el: 'Planchers', txt: 'Plateformes métalliques intermédiaires pour la maintenance des câbles.' },
      { n: 4, el: 'Structure porteuse', txt: 'Treillis métallique triangulé reportant les efforts de traction des câbles.' },
      { n: 5, el: 'Escalier', txt: 'Échelles et escaliers métalliques desservant les plateformes de service.' },
      { n: 6, el: 'Fondations', txt: 'Massif de béton armé ancrant la tour au-dessus de la tête de puits.' },
    ],
    sections: [
      {
        title: 'Les molettes',
        icon: 'ph ph-crane-tower',
        intro: "Au sommet du chevalement, les molettes guident les câbles reliant les machines d’extraction en surface à la cage descendue dans le puits.",
        groups: [
          G(null, ['Roues à gorge guidant les câbles d’extraction', 'Cage remontant mineurs et charbon depuis le fond', 'Machine d’extraction au sol actionnant l’ensemble']),
        ],
      },
      {
        title: 'Une architecture de légèreté',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Treillis triangulé minimisant la quantité de métal', 'Structure ajourée résistant au vent', 'Évolution du bois puis de la fonte vers l’acier riveté puis soudé']),
        ],
      },
      {
        title: 'Un symbole patrimonial',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Silhouette la plus identifiable du patrimoine minier', 'Nombreux chevalements préservés après la fermeture des mines', 'Éclairage nocturne mettant en valeur certains exemplaires classés']),
        ],
      },
    ],
  },

  {
    id: 'centraleelectrique',
    name: 'Centrale électrique',
    region: 'France',
    periode: '1900–1980',
    procede: 'Béton & métal',
    usage: 'Production d’électricité',
    categorie: 'industrielle',
    periodeTags: ['XXe'],
    resume:
      "Grand équipement industriel produisant l’électricité, qu’il s’agisse d’une centrale thermique à la salle des turbines vitrée et à la haute cheminée, ou d’une centrale hydroélectrique intégrée à un barrage. Certaines centrales de la première moitié du XXe siècle adoptent une architecture monumentale, revendiquant leur rôle de « cathédrales » de l’énergie moderne.",
    identite: [
      ['Période', '1900–1980'],
      ['Région', 'France'],
      ['Usage', 'Production d’électricité'],
      ['Système', 'Turbines et alternateurs'],
      ['Matériau dominant', 'Béton et structure métallique'],
      ['Plan', 'Salle des machines de grande portée'],
      ['Particularité', 'Cheminées ou barrage selon le type de centrale'],
    ],
    materiaux: ['Béton armé', 'Acier (structure, turbines)', 'Verre (grandes verrières)', 'Brique (parements)', 'Cuivre (bobinages)', 'Fonte'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique de grande portée au-dessus de la salle des turbines.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Béton et brique, grandes verrières éclairant la salle des machines.' },
      { n: 3, el: 'Planchers', txt: 'Dalles béton armé supportant le poids considérable des groupes turbo-alternateurs.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature béton armé ou métallique dimensionnée pour les vibrations des machines.' },
      { n: 5, el: 'Escalier', txt: 'Passerelles et escaliers métalliques desservant les niveaux techniques.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en béton armé, souvent intégrées à un barrage pour l’hydroélectrique.' },
    ],
    sections: [
      {
        title: 'La salle des machines',
        icon: 'ph ph-building',
        intro: "Cœur monumental de la centrale, la salle des machines abrite les groupes turbo-alternateurs convertissant l’énergie mécanique en électricité.",
        groups: [
          G(null, ['Turbines à vapeur, à gaz ou hydrauliques selon le type', 'Alternateurs convertissant le mouvement en courant électrique', 'Pont roulant pour la maintenance des équipements lourds']),
        ],
      },
      {
        title: 'Thermique ou hydraulique',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Centrale thermique alimentée en charbon, fioul ou gaz', 'Centrale hydroélectrique intégrée à un barrage', 'Cheminées d’évacuation des fumées pour le thermique']),
        ],
      },
      {
        title: 'Une architecture de prestige',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Certaines centrales conçues comme de véritables monuments', 'Verrières et façades soignées affichant la modernité technique', 'Reconversions patrimoniales de plusieurs centrales historiques']),
        ],
      },
    ],
  },

  {
    id: 'silo',
    name: 'Silo',
    region: 'Ports & plaines céréalières · France',
    periode: '1900–1980',
    procede: 'Béton',
    usage: 'Stockage du grain',
    categorie: 'industrielle',
    periodeTags: ['XXe'],
    resume:
      "Tour ou batterie de tours cylindriques en béton armé destinées au stockage massif du grain, aux ports d’exportation comme au cœur des plaines céréalières. Leur pure géométrie fonctionnelle, sans aucun ornement, a fasciné les architectes modernistes du début du XXe siècle, qui y voyaient l’expression la plus honnête de l’architecture industrielle.",
    identite: [
      ['Période', '1900–1980'],
      ['Région', 'Ports et plaines céréalières, France'],
      ['Usage', 'Stockage du grain'],
      ['Système', 'Cellules cylindriques en béton armé'],
      ['Matériau dominant', 'Béton armé'],
      ['Plan', 'Batterie de cellules cylindriques juxtaposées'],
      ['Particularité', 'Géométrie pure, référence du mouvement moderne'],
    ],
    materiaux: ['Béton armé', 'Acier (armatures, convoyeurs)', 'Céréales (contenu)', 'Verre (bureaux annexes)', 'Peinture', 'Bois (coffrage perdu, historique)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture technique plate abritant les convoyeurs de remplissage des cellules.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Parois de béton armé lisses, cellules cylindriques juxtaposées.' },
      { n: 3, el: 'Planchers', txt: 'Fond conique ou plat de chaque cellule facilitant la vidange du grain.' },
      { n: 4, el: 'Structure porteuse', txt: 'Voiles de béton armé coulés en continu, résistant à la poussée du grain.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et ascenseurs techniques desservant le sommet des cellules.' },
      { n: 6, el: 'Fondations', txt: 'Radier général en béton armé supportant plusieurs milliers de tonnes de grain.' },
    ],
    sections: [
      {
        title: 'Une géométrie fonctionnelle',
        icon: 'ph ph-building',
        intro: "La forme cylindrique répartit uniformément la pression du grain sur les parois, sans angle mort ni accumulation.",
        groups: [
          G(null, ['Cellules cylindriques optimisant la résistance structurelle', 'Fond conique facilitant l’évacuation par gravité', 'Batteries de cellules juxtaposées pour massifier le stockage']),
        ],
      },
      {
        title: 'Une icône du mouvement moderne',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Silos admirés par les architectes modernistes des années 1920', 'Référence explicite chez Le Corbusier et le Bauhaus', 'Absence totale d’ornement, pure expression fonctionnelle']),
        ],
      },
      {
        title: 'Logistique céréalière',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Silos portuaires pour l’exportation par voie maritime', 'Silos de collecte au cœur des plaines céréalières', 'Convoyeurs mécanisés pour le remplissage et la vidange']),
        ],
      },
    ],
  },

  {
    id: 'entrepot',
    name: 'Entrepôt',
    region: 'Ports & villes industrielles · France',
    periode: '1850–1950',
    procede: 'Brique ou béton',
    usage: 'Stockage de marchandises',
    categorie: 'industrielle',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Grand bâtiment de stockage à structure répétitive, en brique puis en béton armé, offrant de vastes plateaux libres desservis par des quais de chargement et des monte-charges. Implanté près des ports, gares ou canaux, l’entrepôt organise la logistique urbaine avant l’ère du conteneur.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'Ports et villes industrielles, France'],
      ['Usage', 'Stockage de marchandises'],
      ['Système', 'Structure répétitive à trame régulière'],
      ['Matériau dominant', 'Brique ou béton armé'],
      ['Plan', 'Plateaux libres desservis par quais et monte-charges'],
      ['Particularité', 'Implantation près des ports, gares ou canaux'],
    ],
    materiaux: ['Brique', 'Béton armé', 'Acier (structure, monte-charges)', 'Bois (planchers anciens)', 'Verre (éclairage zénithal)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse ou charpente métallique, parfois éclairage zénithal.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique ou béton, façades répétitives percées de baies régulières.' },
      { n: 3, el: 'Planchers', txt: 'Grands plateaux libres desservis par des monte-charges industriels.' },
      { n: 4, el: 'Structure porteuse', txt: 'Trame régulière de poteaux en béton armé ou en fonte selon l’époque.' },
      { n: 5, el: 'Escalier', txt: 'Cages d’escalier et monte-charges desservant les niveaux de stockage.' },
      { n: 6, el: 'Fondations', txt: 'Fondations renforcées supportant le poids des marchandises stockées.' },
    ],
    sections: [
      {
        title: 'Une structure répétitive',
        icon: 'ph ph-grid-nine',
        intro: "L’entrepôt répète un même module structurel sur toute sa longueur, permettant une extension aisée selon les besoins logistiques.",
        groups: [
          G(null, ['Trame de poteaux régulière sur tous les niveaux', 'Plateaux libres modulables selon les marchandises', 'Façades répétitives, sobres et fonctionnelles']),
        ],
      },
      {
        title: 'Quais & logistique',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Quais de chargement adaptés aux péniches, trains ou camions', 'Monte-charges desservant les étages de stockage', 'Implantation stratégique près des voies de transport']),
        ],
      },
      {
        title: 'Une seconde vie',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Nombreux entrepôts reconvertis en lofts ou bureaux', 'Volumes généreux appréciés pour la réhabilitation', 'Éléments industriels (poutres, verrières) souvent conservés']),
        ],
      },
    ],
  },

  {
    id: 'garemonumentale',
    name: 'Gare monumentale',
    region: 'Grandes villes · France',
    periode: '1840–1900',
    procede: 'Pierre, métal & verre',
    usage: 'Terminus ferroviaire urbain',
    categorie: 'transports',
    periodeTags: ['XIXe'],
    resume:
      "Terminus ferroviaire urbain associant une façade monumentale en pierre, vitrine de prestige de la compagnie exploitante, à une immense halle métallique et vitrée abritant les voies. L’horloge géante, la statuaire allégorique et la marquise de verre affichent la fierté technique du chemin de fer naissant.",
    identite: [
      ['Période', 'XIXe siècle'],
      ['Région', 'Grandes villes, France'],
      ['Usage', 'Terminus ferroviaire urbain'],
      ['Système', 'Façade en pierre + halle métallique'],
      ['Matériau dominant', 'Pierre, métal et verre'],
      ['Plan', 'Façade sur ville, halle en profondeur'],
      ['Particularité', 'Horloge monumentale, verrière de la halle'],
    ],
    materiaux: ['Pierre de taille', 'Fonte (colonnes)', 'Acier (charpente de halle)', 'Verre (verrière)', 'Bronze (statuaire, horloge)', 'Zinc (couverture)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Verrière métallique en berceau couvrant l’ensemble des voies et quais.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade en pierre de taille, horloge monumentale, statuaire allégorique.' },
      { n: 3, el: 'Planchers', txt: 'Quais surélevés desservant chaque voie, hall des pas perdus dallé.' },
      { n: 4, el: 'Structure porteuse', txt: 'Arcs métalliques de grande portée libérant l’espace au-dessus des voies.' },
      { n: 5, el: 'Escalier', txt: 'Grands escaliers et passerelles reliant hall, quais et passages souterrains.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives, sous-sols techniques et voies en contrebas.' },
    ],
    sections: [
      {
        title: 'Deux architectures en une',
        icon: 'ph ph-buildings',
        intro: "La gare monumentale juxtapose une façade urbaine classique et une halle métallique résolument moderne, alors novatrice.",
        groups: [
          G(null, ['Façade en pierre dialoguant avec le tissu urbain', 'Halle métallique exprimant la modernité ferroviaire', 'Contraste assumé entre les deux langages architecturaux']),
        ],
      },
      {
        title: 'La halle métallique',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Arcs métalliques de grande portée sans appui intermédiaire', 'Verrière laissant entrer la lumière naturelle', 'Évacuation de la fumée des locomotives à vapeur']),
        ],
      },
      {
        title: 'Un symbole de prestige',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Horloge monumentale visible de loin', 'Statuaire allégorique représentant les villes desservies', 'Rivalité architecturale entre grandes compagnies ferroviaires']),
        ],
      },
    ],
  },

  {
    id: 'garerurale',
    name: 'Gare rurale',
    region: 'France · lignes secondaires',
    periode: '1850–1930',
    procede: 'Pierre ou brique',
    usage: 'Gare de desserte locale',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Petite gare de desserte locale bâtie sur un modèle standardisé par chaque grande compagnie ferroviaire, associant guichet, salle d’attente et logement du chef de gare sous un même toit. Sa marquise protégeant le quai et sa sobriété de brique ou de pierre en font l’un des bâtiments les plus répétés du paysage ferroviaire français.",
    identite: [
      ['Période', '1850–1930'],
      ['Région', 'France, lignes secondaires'],
      ['Usage', 'Gare de desserte locale'],
      ['Système', 'Murs porteurs en pierre ou brique'],
      ['Matériau dominant', 'Pierre ou brique selon les compagnies'],
      ['Plan', 'Guichet, salle d’attente, logement de fonction'],
      ['Particularité', 'Modèle type standardisé, marquise de quai'],
    ],
    materiaux: ['Pierre ou brique', 'Chaux', 'Bois (charpente, guichet)', 'Fonte (marquise)', 'Ardoise ou tuile', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit à deux pans, marquise métallique protégeant le quai côté voie.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre ou brique selon le modèle type de la compagnie, sobriété générale.' },
      { n: 3, el: 'Planchers', txt: 'Rez-de-chaussée pour le service, étage pour le logement du chef de gare.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs simples, plan répété à l’identique sur toute une ligne.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur menant au logement de fonction à l’étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles simples en pierre, quai surélevé le long de la voie.' },
    ],
    sections: [
      {
        title: 'Un modèle type standardisé',
        icon: 'ph ph-grid-nine',
        intro: "Chaque compagnie ferroviaire décline ses gares secondaires sur quelques modèles types, répétés à l’identique le long de ses lignes.",
        groups: [
          G(null, ['Plan et façade répétés sur toute une ligne', 'Variantes de taille selon l’importance du trafic', 'Signature architecturale propre à chaque compagnie']),
        ],
      },
      {
        title: 'Guichet, attente et logement',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Guichet et salle d’attente au rez-de-chaussée', 'Logement du chef de gare à l’étage', 'Présence continue du personnel sur le site']),
        ],
      },
      {
        title: 'La marquise de quai',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Auvent métallique protégeant les voyageurs', 'Structure légère en fonte ou en fer', 'Élément le plus caractéristique de la silhouette de la gare']),
        ],
      },
    ],
  },

  {
    id: 'rotondeferroviaire',
    name: 'Rotonde ferroviaire',
    region: 'France · dépôts ferroviaires',
    periode: '1850–1950',
    procede: 'Brique & métal',
    usage: 'Remisage et rotation des locomotives',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Bâtiment circulaire ou polygonal organisé autour d’une plaque tournante centrale, permettant de réorienter puis de ranger les locomotives dans des voies rayonnantes individuelles. Le lanterneau vitré au sommet de la toiture évacue la fumée tout en éclairant l’ensemble du dépôt.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'France, dépôts ferroviaires'],
      ['Usage', 'Remisage et rotation des locomotives'],
      ['Système', 'Plan circulaire autour d’une plaque tournante'],
      ['Matériau dominant', 'Brique et structure métallique'],
      ['Toiture', 'Charpente métallique, lanterneau d’évacuation des fumées'],
      ['Particularité', 'Voies rayonnantes autour du pivot central'],
    ],
    materiaux: ['Brique', 'Acier (charpente, plaque tournante)', 'Fonte', 'Verre (lanterneau)', 'Fer', 'Charbon (dépôt attenant)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique circulaire, lanterneau vitré évacuant les fumées.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs de brique percés de portes pour chaque voie rayonnante.' },
      { n: 3, el: 'Planchers', txt: 'Fosses de visite entre les rails pour l’entretien sous les locomotives.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente métallique rayonnante centrée sur la plaque tournante.' },
      { n: 5, el: 'Escalier', txt: 'Passerelles techniques desservant les niveaux supérieurs de maintenance.' },
      { n: 6, el: 'Fondations', txt: 'Fondations circulaires massives supportant la plaque tournante centrale.' },
    ],
    sections: [
      {
        title: 'La plaque tournante',
        icon: 'ph ph-crane-tower',
        intro: "Pivot mécanique central, la plaque tournante aligne la locomotive avec la voie de la rotonde souhaitée, permettant un remisage optimal de l’espace.",
        groups: [
          G(null, ['Plateau pivotant recevant une locomotive à la fois', 'Alignement précis avec chaque voie rayonnante', 'Manœuvre motorisée ou manuelle selon les époques']),
        ],
      },
      {
        title: 'Un plan rayonnant',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Voies individuelles disposées en éventail ou en cercle complet', 'Chaque voie desservant une baie de remisage', 'Optimisation maximale de l’espace au sol']),
        ],
      },
      {
        title: 'Le lanterneau',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Ouverture zénithale évacuant la fumée des locomotives à vapeur', 'Éclairage naturel de l’ensemble du dépôt', 'Élément architectural le plus visible depuis l’extérieur']),
        ],
      },
    ],
  },

  {
    id: 'hallemarchandises',
    name: 'Halle marchandises',
    region: 'France · gares de triage',
    periode: '1850–1950',
    procede: 'Brique & charpente métallique',
    usage: 'Stockage et transbordement du fret',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Vaste halle desservie par une voie ferrée pénétrant à l’intérieur même du bâtiment, permettant le transbordement direct entre wagons et quais routiers. Sa structure répétitive et son grand volume dégagé en font aujourd’hui l’un des bâtiments industriels ferroviaires les plus recherchés pour la reconversion.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'France, gares de triage'],
      ['Usage', 'Stockage et transbordement du fret'],
      ['Système', 'Charpente métallique, voie ferrée intérieure'],
      ['Matériau dominant', 'Brique et structure métallique'],
      ['Plan', 'Halle traversante desservie par le rail'],
      ['Particularité', 'Quais mixtes rail et route'],
    ],
    materiaux: ['Brique', 'Acier (charpente)', 'Fonte (poteaux)', 'Bois (quais, planchers)', 'Verre (éclairage zénithal)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique de grande portée, éclairage zénithal fréquent.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique industrielle, grandes portes coulissantes pour le passage des wagons.' },
      { n: 3, el: 'Planchers', txt: 'Quai surélevé le long de la voie intérieure pour le transbordement direct.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux métalliques ou de fonte espacés selon la trame des wagons.' },
      { n: 5, el: 'Escalier', txt: 'Passerelles et rampes reliant quai ferroviaire et quai routier.' },
      { n: 6, el: 'Fondations', txt: 'Fondations renforcées supportant le poids des marchandises et des wagons.' },
    ],
    sections: [
      {
        title: 'Le rail entre dans le bâtiment',
        icon: 'ph ph-crane-tower',
        intro: "La voie ferrée pénètre directement sous la halle, permettant de charger ou décharger les wagons à l’abri des intempéries.",
        groups: [
          G(null, ['Voie ferrée intérieure traversant la halle', 'Quai surélevé au niveau du plancher des wagons', 'Grandes portes coulissantes aux extrémités']),
        ],
      },
      {
        title: 'Transbordement rail-route',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Quai routier attenant pour les charrettes puis les camions', 'Manutention directe entre les deux modes de transport', 'Bureaux d’expédition et de douane annexes']),
        ],
      },
      {
        title: 'Une seconde vie',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Grand volume dégagé propice à la reconversion', 'Nombreuses halles transformées en équipements culturels', 'Structure métallique et brique souvent conservée telle quelle']),
        ],
      },
    ],
  },

  {
    id: 'chateaudeau',
    name: 'Château d’eau SNCF',
    region: 'France · lignes à vapeur',
    periode: '1850–1950',
    procede: 'Brique ou béton',
    usage: 'Alimentation en eau des locomotives à vapeur',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Tour hydraulique élevée le long des lignes à vapeur pour alimenter en eau le tender des locomotives, via une grue hydraulique pivotante placée en bout de quai. Rendus obsolètes par la traction diesel puis électrique, nombre de ces châteaux d’eau ferroviaires subsistent, silencieux témoins de l’ère de la vapeur.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'France, lignes à vapeur'],
      ['Usage', 'Alimentation en eau des locomotives à vapeur'],
      ['Système', 'Réservoir surélevé sur tour porteuse'],
      ['Matériau dominant', 'Brique ou béton armé'],
      ['Plan', 'Tour isolée en bout de quai ou de voie'],
      ['Particularité', 'Grue hydraulique pivotante d’alimentation'],
    ],
    materiaux: ['Brique', 'Béton armé', 'Acier (réservoir, grue hydraulique)', 'Fonte (canalisations)', 'Fer', 'Bois (structures anciennes)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit conique ou plat couvrant le réservoir d’eau surélevé.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique ou béton armé, silhouette verticale reconnaissable de loin.' },
      { n: 3, el: 'Planchers', txt: 'Absence de niveaux intermédiaires ; fût technique menant au réservoir.' },
      { n: 4, el: 'Structure porteuse', txt: 'Tour porteuse en brique ou béton soutenant le poids de l’eau stockée.' },
      { n: 5, el: 'Escalier', txt: 'Escalier ou échelle intérieure menant au réservoir pour l’entretien.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives supportant plusieurs dizaines de tonnes d’eau.' },
    ],
    sections: [
      {
        title: 'La grue hydraulique',
        icon: 'ph ph-crane-tower',
        intro: "Un bras pivotant articulé, alimenté par gravité depuis le réservoir, remplit en quelques minutes le tender de la locomotive à l’arrêt.",
        groups: [
          G(null, ['Bras orientable venant surplomber le tender', 'Remplissage par gravité depuis le réservoir surélevé', 'Opération rapide pour ne pas retarder la circulation']),
        ],
      },
      {
        title: 'Un jalon de la ligne',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Implantation régulière selon l’autonomie des locomotives', 'Souvent associé à un point d’eau naturel ou un forage', 'Silhouette verticale servant aussi de repère visuel']),
        ],
      },
      {
        title: 'Un patrimoine obsolète',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Abandon massif avec la fin de la traction vapeur', 'Nombreux exemplaires démolis ou laissés à l’abandon', 'Quelques châteaux d’eau préservés comme témoins ferroviaires']),
        ],
      },
    ],
  },

  {
    id: 'passageniveau',
    name: 'Passage à niveau',
    region: 'France · réseau ferré',
    periode: '1850–1970',
    procede: 'Brique ou meulière',
    usage: 'Franchissement routier de la voie ferrée',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Point de croisement entre route et voie ferrée, surveillé depuis une petite maison de garde-barrière au modèle standardisé, où le garde actionnait manuellement les barrières par un système de roue et de câbles. Ce guetteur logé sur place veillait sur le passage, jour et nuit, avant l’automatisation progressive du XXe siècle.",
    identite: [
      ['Période', '1850–1970'],
      ['Région', 'France, réseau ferré'],
      ['Usage', 'Franchissement routier de la voie ferrée'],
      ['Système', 'Barrières manuelles à commande mécanique'],
      ['Matériau dominant', 'Brique ou meulière'],
      ['Plan', 'Petite maison de garde-barrière standardisée'],
      ['Particularité', 'Logement de fonction du garde-barrière'],
    ],
    materiaux: ['Brique ou meulière', 'Chaux', 'Bois (charpente, barrières)', 'Fonte (mécanisme)', 'Fer', 'Ardoise ou tuile'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit à deux pans simple, souvent en ardoise ou tuile mécanique.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique ou meulière, modèle type répété le long des lignes.' },
      { n: 3, el: 'Planchers', txt: 'Petit logement de plain-pied ou à un étage pour le garde-barrière.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs simples, volume compact et standardisé.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur simple dans les modèles à étage.' },
      { n: 6, el: 'Fondations', txt: 'Semelles simples en pierre ou brique, proximité immédiate de la voie.' },
    ],
    sections: [
      {
        title: 'La maison de garde-barrière',
        icon: 'ph ph-buildings',
        intro: "Le garde-barrière habite sur place, en veille permanente, prêt à actionner les barrières au passage de chaque train.",
        groups: [
          G(null, ['Logement de fonction attenant au poste de manœuvre', 'Présence continue, y compris de nuit', 'Modèle type répété à l’identique sur tout le réseau']),
        ],
      },
      {
        title: 'Le mécanisme des barrières',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Roue à manivelle actionnant les barrières par câbles', 'Signalisation sonore et visuelle associée', 'Fermeture anticipée avant l’arrivée du train']),
        ],
      },
      {
        title: 'Vers l’automatisation',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Automatisation progressive à partir du milieu du XXe siècle', 'Suppression du poste de garde humain', 'Maisons de garde-barrière souvent vendues ou reconverties']),
        ],
      },
    ],
  },

  {
    id: 'depotlocomotives',
    name: 'Dépôt locomotives',
    region: 'France · dépôts ferroviaires',
    periode: '1850–1970',
    procede: 'Métal & brique',
    usage: 'Entretien et remisage des locomotives',
    categorie: 'transports',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Grand établissement technique où les locomotives sont entretenues, réparées, approvisionnées en eau et en charbon puis remisées entre deux services. Souvent organisé autour d’une rotonde, le dépôt rassemble ateliers, fosses de visite et voies de garage sur un vaste site attenant à une gare importante.",
    identite: [
      ['Période', '1850–1970'],
      ['Région', 'France, dépôts ferroviaires'],
      ['Usage', 'Entretien et remisage des locomotives'],
      ['Système', 'Halles à voies multiples, fosses de visite'],
      ['Matériau dominant', 'Métal et brique'],
      ['Plan', 'Voies parallèles ou rayonnantes autour d’un dépôt'],
      ['Particularité', 'Souvent associé à une rotonde et un château d’eau'],
    ],
    materiaux: ['Acier (charpente, rails)', 'Brique', 'Fonte', 'Charbon (approvisionnement)', 'Bois (ateliers)', 'Verre (éclairage zénithal)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique de grande portée, ouvertures pour l’évacuation des fumées.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Brique industrielle, grandes ouvertures pour l’entrée des locomotives.' },
      { n: 3, el: 'Planchers', txt: 'Fosses de visite entre les rails pour l’entretien sous les machines.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente métallique portant sur des voies multiples parallèles.' },
      { n: 5, el: 'Escalier', txt: 'Passerelles techniques desservant les ateliers et postes de contrôle.' },
      { n: 6, el: 'Fondations', txt: 'Fondations renforcées sous les voies et les fosses de visite.' },
    ],
    sections: [
      {
        title: 'Un site technique complet',
        icon: 'ph ph-crane-tower',
        intro: "Le dépôt rassemble tout ce qu’il faut pour préparer une locomotive au service : eau, charbon, entretien mécanique et remisage.",
        groups: [
          G(null, ['Fosses de visite pour l’inspection sous les machines', 'Ateliers de réparation mécanique', 'Approvisionnement en eau et en charbon sur site']),
        ],
      },
      {
        title: 'Voies multiples',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Voies parallèles ou rayonnantes selon la configuration', 'Capacité de remisage pour de nombreuses locomotives', 'Souvent complété par une rotonde attenante']),
        ],
      },
      {
        title: 'La fin de la vapeur',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Reconversion des dépôts avec l’arrivée du diesel et de l’électrique', 'Certains sites transformés en musées ferroviaires', 'D’autres démolis ou laissés à l’abandon']),
        ],
      },
    ],
  },

  {
    id: 'phare',
    name: 'Phare',
    region: 'Côtes françaises',
    periode: '1700–1950',
    procede: 'Granite ou pierre',
    usage: 'Signalisation maritime nocturne',
    categorie: 'littorale',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Tour de signalisation maritime bâtie sur les caps et îlots les plus exposés, couronnée d’une lanterne dont l’optique à lentilles de Fresnel démultiplie la portée du faisceau lumineux. Chaque phare possède un rythme d’éclat unique, véritable signature lumineuse permettant aux marins de l’identifier de nuit.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Côtes françaises'],
      ['Usage', 'Signalisation maritime nocturne'],
      ['Système', 'Tour maçonnée + lanterne optique'],
      ['Matériau dominant', 'Granite ou pierre de taille'],
      ['Hauteur', '20 à 60 mètres selon les sites'],
      ['Particularité', 'Optique à lentilles de Fresnel, rythme d’éclat unique'],
    ],
    materiaux: ['Granite', 'Pierre de taille', 'Fonte (escalier, structure de lanterne)', 'Verre (optique Fresnel)', 'Cuivre (coupole)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Coupole de la lanterne en cuivre ou fonte, vitrée sur tout le pourtour.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Granite ou pierre de taille, tour cylindrique ou tronconique très résistante.' },
      { n: 3, el: 'Planchers', txt: 'Paliers intermédiaires desservant la salle des machines et le logement technique.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs très épais à la base, s’amincissant vers le sommet.' },
      { n: 5, el: 'Escalier', txt: 'Escalier en vis desservant tous les niveaux jusqu’à la lanterne.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage direct sur le rocher, parfois en mer battue par les vagues.' },
    ],
    sections: [
      {
        title: 'L’optique à lentilles de Fresnel',
        icon: 'ph ph-shield-check',
        intro: "Inventée en 1822 par Augustin Fresnel, cette optique à lentilles concentre la lumière en un faisceau puissant visible à plusieurs dizaines de kilomètres.",
        groups: [
          G(null, ['Lentilles concentriques démultipliant la portée lumineuse', 'Rotation ou occultation créant un rythme d’éclat identifiable', 'Remplacement progressif des anciens miroirs paraboliques']),
        ],
      },
      {
        title: 'Une tour exposée',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Implantation sur les caps, îlots ou récifs les plus dangereux', 'Murs très épais résistant aux tempêtes et embruns', 'Formes aérodynamiques pour certains phares en mer']),
        ],
      },
      {
        title: 'Un patrimoine vivant',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Automatisation progressive à partir de la fin du XXe siècle', 'Certains phares ouverts à la visite touristique', 'Symbole culturel fort du patrimoine maritime français']),
        ],
      },
    ],
  },

  {
    id: 'maisongardien',
    name: 'Maison de gardien',
    region: 'Côtes françaises · sites de phares',
    periode: '1800–1950',
    procede: 'Pierre',
    usage: 'Logement du gardien de phare',
    categorie: 'littorale',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Logement de fonction attenant ou proche d’un phare, où le gardien et parfois sa famille vivaient en quasi-autarcie sur des sites souvent isolés et difficiles d’accès. La surveillance permanente de la lanterne, l’entretien du mécanisme et la tenue du registre météorologique rythmaient une vie rude, immortalisée par de nombreux récits maritimes.",
    identite: [
      ['Période', 'XIXe–XXe siècle'],
      ['Région', 'Côtes françaises, sites de phares'],
      ['Usage', 'Logement du gardien de phare'],
      ['Système', 'Murs porteurs en pierre'],
      ['Matériau dominant', 'Pierre locale'],
      ['Plan', 'Logement attenant ou proche de la tour'],
      ['Particularité', 'Vie isolée, autonomie du gardien'],
    ],
    materiaux: ['Pierre locale', 'Chaux', 'Bois (charpente, mobilier)', 'Ardoise ou tuile', 'Fer', 'Verre'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente bois renforcée contre le vent, couverture ardoise ou tuile.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre locale épaisse, ouvertures réduites côté vents dominants.' },
      { n: 3, el: 'Planchers', txt: 'Plancher bois, logement compact optimisant l’espace disponible.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs, souvent accolés à la base de la tour du phare.' },
      { n: 5, el: 'Escalier', txt: 'Escalier intérieur simple ou passage direct vers la tour du phare.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage rocheux, fondations renforcées contre les tempêtes.' },
    ],
    sections: [
      {
        title: 'Une vie en quasi-autarcie',
        icon: 'ph ph-grid-nine',
        intro: "Sur les phares les plus isolés, en mer ou sur un îlot, le gardien pouvait rester des semaines sans accès facile au continent.",
        groups: [
          G(null, ['Réserves de vivres et d’eau stockées sur place', 'Ravitaillement irrégulier selon la météo', 'Isolement parfois partagé en famille sur les sites terrestres']),
        ],
      },
      {
        title: 'La veille permanente',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Allumage et extinction quotidiens de la lanterne', 'Remontage régulier du mécanisme d’horlogerie rotatif', 'Tenue du registre météorologique et de navigation']),
        ],
      },
      {
        title: 'La fin du gardiennage',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Automatisation des phares à partir des années 1980', 'Disparition progressive de la profession de gardien', 'Maisons de gardien reconverties en gîtes ou musées']),
        ],
      },
    ],
  },

  {
    id: 'semaphore',
    name: 'Sémaphore',
    region: 'Côtes françaises · points hauts littoraux',
    periode: '1800–1950',
    procede: 'Pierre ou béton',
    usage: 'Surveillance et signalisation maritime',
    categorie: 'littorale',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Poste de guet naval implanté sur les points hauts du littoral, hérité du télégraphe optique Chappe et adapté à la surveillance maritime dès le XIXe siècle. Toujours armé par la Marine nationale, le sémaphore veille aujourd’hui sur le trafic maritime, la sécurité et le sauvetage en mer.",
    identite: [
      ['Période', 'XIXe–XXe siècle'],
      ['Région', 'Côtes françaises, points hauts littoraux'],
      ['Usage', 'Surveillance et signalisation maritime'],
      ['Système', 'Poste de guet + mât de signaux'],
      ['Matériau dominant', 'Pierre ou béton'],
      ['Plan', 'Bâtiment bas surmonté d’un mât'],
      ['Particularité', 'Veille assurée par la Marine nationale'],
    ],
    materiaux: ['Pierre', 'Béton armé', 'Bois (mât de signaux)', 'Fer', 'Verre (vigie)', 'Peinture (signalétique)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture basse et aérodynamique résistant aux vents violents du site.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Pierre ou béton, larges baies vitrées pour la vigie panoramique.' },
      { n: 3, el: 'Planchers', txt: 'Salle de veille surélevée offrant un panorama dégagé sur la mer.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs bas et massifs, résistant aux tempêtes littorales.' },
      { n: 5, el: 'Escalier', txt: 'Escalier extérieur ou intérieur menant à la salle de veille surélevée.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage sur le point haut rocheux, souvent une falaise ou un cap.' },
    ],
    sections: [
      {
        title: 'De Chappe à la vigie navale',
        icon: 'ph ph-shield-check',
        intro: "Le sémaphore hérite du principe du télégraphe optique de Chappe, adapté à la transmission de signaux entre navires et côte.",
        groups: [
          G(null, ['Origine dans le réseau optique Chappe du début du XIXe siècle', 'Reconversion vers la signalisation navale', 'Mât de signaux pour les communications par pavillons']),
        ],
      },
      {
        title: 'Une position stratégique',
        icon: 'ph ph-mountains',
        groups: [
          G(null, ['Implantation sur les points hauts offrant la meilleure visibilité', 'Surveillance d’un large secteur de mer', 'Position souvent partagée avec un phare voisin']),
        ],
      },
      {
        title: 'Un poste toujours actif',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Surveillance du trafic maritime et de la sécurité', 'Coordination des opérations de sauvetage en mer', 'Réseau de sémaphores couvrant l’ensemble du littoral français']),
        ],
      },
    ],
  },

  {
    id: 'cale',
    name: 'Cale',
    region: 'Ports & littoral · France',
    periode: '1700–1950',
    procede: 'Pierre ou béton',
    usage: 'Mise à l’eau et halage des embarcations',
    categorie: 'littorale',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Plan incliné maçonné descendant dans l’eau, permettant de mettre à l’eau ou de haler les barques hors de la mer selon la marée. Élément le plus simple mais le plus indispensable de l’architecture portuaire, la cale organise toute la vie quotidienne d’un village de pêcheurs.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Ports et littoral, France'],
      ['Usage', 'Mise à l’eau et halage des embarcations'],
      ['Système', 'Plan incliné maçonné'],
      ['Matériau dominant', 'Pierre ou béton'],
      ['Plan', 'Rampe descendant jusqu’au niveau des basses eaux'],
      ['Particularité', 'Parfois équipée d’un treuil de halage'],
    ],
    materiaux: ['Pierre', 'Béton', 'Bois (anciens rails de halage)', 'Fer (treuil, anneaux d’amarrage)', 'Algues (glissant naturel)', 'Galets'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Sans toiture ; ouvrage entièrement extérieur exposé aux éléments.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Parapets latéraux en pierre ou béton encadrant la rampe.' },
      { n: 3, el: 'Planchers', txt: 'Surface de roulement en pierre ou béton, parfois rainurée antidérapante.' },
      { n: 4, el: 'Structure porteuse', txt: 'Maçonnerie massive résistant à l’érosion marine et aux marées.' },
      { n: 5, el: 'Escalier', txt: 'Marches latérales pour l’accès piéton le long de la cale.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes ancrées sous le niveau des plus basses mers.' },
    ],
    sections: [
      {
        title: 'S’adapter à la marée',
        icon: 'ph ph-waves',
        intro: "La longueur de la cale doit permettre l’accès à l’eau à toute heure, quelle que soit l’amplitude de la marée du site.",
        groups: [
          G(null, ['Pente calculée selon le marnage local', 'Rampe s’étendant parfois sur plusieurs dizaines de mètres', 'Usage possible à toutes les heures de marée']),
        ],
      },
      {
        title: 'Le halage des barques',
        icon: 'ph ph-hammer',
        groups: [
          G(null, ['Treuil manuel ou mécanique pour remonter les embarcations', 'Rails ou glissières pour faciliter le glissement', 'Effort collectif traditionnel avant la mécanisation']),
        ],
      },
      {
        title: 'Un cœur de vie portuaire',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Lieu de rassemblement quotidien des pêcheurs', 'Point de débarquement direct de la pêche', 'Usage aujourd’hui partagé avec la plaisance']),
        ],
      },
    ],
  },

  {
    id: 'criee',
    name: 'Criée',
    region: 'Ports de pêche · France',
    periode: '1850–1950',
    procede: 'Métal & béton',
    usage: 'Vente aux enchères du poisson frais',
    categorie: 'littorale',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Halle portuaire dédiée à la vente aux enchères descendantes du poisson fraîchement débarqué, directement accessible depuis le quai de déchargement. Sa grande halle réfrigérée et ses installations de tri organisent en quelques heures chaque matin tout le commerce du poisson d’un port de pêche.",
    identite: [
      ['Période', '1850–1950'],
      ['Région', 'Ports de pêche, France'],
      ['Usage', 'Vente aux enchères du poisson frais'],
      ['Système', 'Halle réfrigérée sur quai'],
      ['Matériau dominant', 'Métal et béton'],
      ['Plan', 'Halle ouverte desservie par le quai'],
      ['Particularité', 'Enchère descendante (« criée »)'],
    ],
    materiaux: ['Béton', 'Acier (charpente)', 'Carrelage (hygiène)', 'Verre', 'Glace (conservation)', 'Fer'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente métallique de grande portée, ventilation adaptée au froid.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Béton et parois largement ouvertes côté quai pour le débarquement.' },
      { n: 3, el: 'Planchers', txt: 'Sol carrelé ou bétonné, facile à laver, léger système d’évacuation.' },
      { n: 4, el: 'Structure porteuse', txt: 'Poteaux métalliques libérant un vaste espace pour les lots de poisson.' },
      { n: 5, el: 'Escalier', txt: 'Généralement de plain-pied avec le quai de débarquement.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en béton adaptées à la proximité immédiate de l’eau.' },
    ],
    sections: [
      {
        title: 'La vente à la criée',
        icon: 'ph ph-hammer',
        intro: "Le crieur annonce un prix élevé qui décroît jusqu’à ce qu’un acheteur l’arrête, principe inverse de l’enchère montante classique.",
        groups: [
          G(null, ['Enchère descendante rapide, quelques secondes par lot', 'Mareyeurs et poissonniers regroupés face au crieur', 'Traçabilité et pesée systématique des lots']),
        ],
      },
      {
        title: 'De la mer à la halle',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Débarquement direct depuis les bateaux sur le quai attenant', 'Tri et calibrage rapide du poisson frais', 'Chaîne du froid maintenue dès le débarquement']),
        ],
      },
      {
        title: 'Un rythme quotidien',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Vente organisée tôt le matin au retour de pêche', 'Rythme calé sur les marées et les horaires de pêche', 'Certaines criées modernisées avec vente électronique']),
        ],
      },
    ],
  },

  {
    id: 'cabanesostreicoles',
    name: 'Cabanes ostréicoles',
    region: 'Bassin d’Arcachon & littoral atlantique',
    periode: '1850–1950',
    procede: 'Bois sur pilotis',
    usage: 'Travail et stockage ostréicole',
    categorie: 'littorale',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Cabane de bois colorée, dressée sur pilotis à même l’estran, où l’ostréiculteur trie, calibre et conditionne les huîtres au sortir des parcs. Alignées en rangs serrés au bord de l’eau, ces cabanes composent le paysage caractéristique du bassin d’Arcachon et des ports ostréicoles atlantiques.",
    identite: [
      ['Période', 'XIXe–XXe siècle'],
      ['Région', 'Bassin d’Arcachon et littoral atlantique'],
      ['Usage', 'Travail et stockage ostréicole'],
      ['Système', 'Ossature bois sur pilotis'],
      ['Matériau dominant', 'Bois'],
      ['Plan', 'Petite cabane rectangulaire en front d’estran'],
      ['Particularité', 'Façades peintes de couleurs vives'],
    ],
    materiaux: ['Bois (pin maritime)', 'Pilotis', 'Tôle ondulée ou bardeaux', 'Peinture (façades colorées)', 'Fer (outillage, casiers)', 'Corde (filets, poches)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit à deux pans en tôle ondulée ou bardeaux, faible pente.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Bardage de bois peint de couleurs vives, ouverture large côté estran.' },
      { n: 3, el: 'Planchers', txt: 'Plancher à claire-voie laissant s’écouler l’eau de rinçage des huîtres.' },
      { n: 4, el: 'Structure porteuse', txt: 'Pilotis de bois surélevant la cabane au-dessus du niveau des marées.' },
      { n: 5, el: 'Escalier', txt: 'Simples marches ou plan incliné d’accès depuis le chemin ostréicole.' },
      { n: 6, el: 'Fondations', txt: 'Pilotis enfoncés directement dans la vase ou le sable de l’estran.' },
    ],
    sections: [
      {
        title: 'Le travail de l’huître',
        icon: 'ph ph-hammer',
        intro: "Chaque cabane est un petit atelier où l’huître, sortie des parcs, est triée, calibrée et conditionnée avant expédition.",
        groups: [
          G(null, ['Tri et calibrage manuel ou mécanisé', 'Dégorgement et rinçage à l’eau de mer', 'Conditionnement en bourriches pour la vente']),
        ],
      },
      {
        title: 'Sur pilotis, face à l’estran',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Implantation directe sur la vase ou le sable', 'Accès facilité aux parcs à huîtres voisins', 'Plancher ajouré pour l’écoulement de l’eau']),
        ],
      },
      {
        title: 'Un paysage identitaire',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Alignements colorés emblématiques du bassin d’Arcachon', 'Certaines cabanes reconverties en restaurants de dégustation', 'Savoir-faire ostréicole transmis de génération en génération']),
        ],
      },
    ],
  },

  {
    id: 'cabanepecheur',
    name: 'Cabane de pêcheur',
    region: 'Littoral · France',
    periode: '1700–1950',
    procede: 'Bois',
    usage: 'Abri et stockage du matériel de pêche',
    categorie: 'littorale',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Modeste cabane de bois où le pêcheur range filets, casiers et agrès, parfois construite à partir de la coque retournée d’un vieux bateau réformé (« caloge »). Regroupées en rangs le long de la plage ou du port, ces cabanes forment un paysage vernaculaire immédiatement reconnaissable.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Littoral, France'],
      ['Usage', 'Abri et stockage du matériel de pêche'],
      ['Système', 'Ossature bois simple'],
      ['Matériau dominant', 'Bois'],
      ['Plan', 'Petit volume rectangulaire, parfois coque retournée'],
      ['Particularité', 'Réemploi de coques de bateaux (caloges)'],
    ],
    materiaux: ['Bois', 'Coque de bateau réformée', 'Goudron (étanchéité)', 'Tôle', 'Filets et cordages', 'Peinture'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toit à un ou deux pans, parfois la coque retournée d’un ancien bateau.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Planches de bois goudronnées, petite porte unique.' },
      { n: 3, el: 'Planchers', txt: 'Sol de sable, galets ou plancher sommaire selon les sites.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature bois légère ou charpente de la coque de bateau réemployée.' },
      { n: 5, el: 'Escalier', txt: 'Sans étage ; simple accès de plain-pied.' },
      { n: 6, el: 'Fondations', txt: 'Simple assise sur le sable, les galets ou un muret bas.' },
    ],
    sections: [
      {
        title: 'La caloge normande',
        icon: 'ph ph-tree',
        intro: "En Normandie, les coques de bateaux trop âgées pour naviguer trouvaient une seconde vie, retournées et posées à terre comme abri.",
        groups: [
          G(null, ['Réemploi de la coque comme toiture protectrice', 'Étanchéité renforcée au goudron', 'Pratique traditionnelle d’économie de matériaux']),
        ],
      },
      {
        title: 'Un abri fonctionnel',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Rangement des filets, casiers et agrès de pêche', 'Réparation du matériel à l’abri des intempéries', 'Volume minimal, strictement utilitaire']),
        ],
      },
      {
        title: 'Un paysage vernaculaire',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Alignements de cabanes le long des plages ou des ports', 'Couleurs et formes variant selon les régions', 'Certaines cabanes classées ou protégées au titre du patrimoine']),
        ],
      },
    ],
  },

  {
    id: 'fortmaritime',
    name: 'Fort maritime',
    region: 'Rades & estuaires · France',
    periode: '1660–1870',
    procede: 'Pierre & maçonnerie marine',
    usage: 'Défense d’une rade ou d’un chenal',
    categorie: 'littorale',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Fortification bâtie directement sur un rocher ou un haut-fond au milieu d’une rade, défiant les courants et les marées pour verrouiller l’accès à un port stratégique. Le chantier, souvent étalé sur plusieurs décennies en raison des conditions marines extrêmes, produit des ouvrages au plan elliptique ou circulaire limitant la prise au vent et à la houle.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Rades et estuaires, France'],
      ['Usage', 'Défense d’une rade ou d’un chenal'],
      ['Système', 'Maçonnerie sur fondation rocheuse immergée'],
      ['Matériau dominant', 'Pierre et maçonnerie marine'],
      ['Plan', 'Plan elliptique ou circulaire en pleine mer'],
      ['Particularité', 'Construction en milieu marin extrême'],
    ],
    materiaux: ['Pierre de taille', 'Mortier hydraulique', 'Fer (ferrures, canons)', 'Bois (casernement intérieur)', 'Plomb (étanchéité)', 'Brique (casemates)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Terrasse d’artillerie à ciel ouvert, casemates voûtées en sous-face.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murailles courbes en pierre de taille, résistant à la houle et aux courants.' },
      { n: 3, el: 'Planchers', txt: 'Planchers des casernements intérieurs, plateformes d’artillerie en terrasse.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs d’escarpe très épais, plan courbe limitant la prise aux éléments.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers intérieurs desservant casemates et plateformes de tir.' },
      { n: 6, el: 'Fondations', txt: 'Fondations directement posées sur le rocher immergé à marée basse.' },
    ],
    sections: [
      {
        title: 'Construire en pleine mer',
        icon: 'ph ph-waves',
        intro: "Le chantier ne peut avancer qu’aux heures de marée basse, ce qui allonge considérablement la durée de construction de ces forts en mer.",
        groups: [
          G(null, ['Travaux limités aux fenêtres de marée basse', 'Fondations posées directement sur le rocher immergé', 'Chantiers pouvant s’étaler sur plusieurs décennies']),
        ],
      },
      {
        title: 'Un plan hydrodynamique',
        icon: 'ph ph-shield-check',
        groups: [
          G(null, ['Plan elliptique ou circulaire réduisant la prise à la houle', 'Murailles courbes dispersant l’énergie des vagues', 'Résistance pensée autant contre la mer que contre l’ennemi']),
        ],
      },
      {
        title: 'Verrouiller une rade',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Position centrale contrôlant l’accès au port ou à l’estuaire', 'Tir croisé avec d’autres forts côtiers', 'Certains forts devenus des symboles populaires (Fort Boyard)']),
        ],
      },
    ],
  },

  {
    id: 'chaletalpage',
    name: "Chalet d'alpage",
    region: 'Alpes · Savoie, Haute-Savoie, Isère',
    periode: '1700–1950',
    procede: 'Bois & pierre sèche',
    usage: "Chalet d'estive, fabrication fromagère",
    categorie: 'montagne',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Bâtiment sommaire d’altitude occupé uniquement l’été durant l’estive, servant au logement du berger, à la traite et à la fabrication du fromage (beaufort, reblochon). Plus rustique et plus petit que le chalet savoyard permanent, il se réduit souvent à une seule pièce avec cave d’affinage attenante.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Alpes du Nord, alpages d’altitude'],
      ['Usage', "Chalet d'alpage, estive fromagère"],
      ['Système', 'Murs pierre sèche ou maçonnés + charpente bois'],
      ['Matériau dominant', 'Pierre locale & bois d’épicéa'],
      ['Toiture', 'Ancelles ou tôle, forte pente'],
      ['Particularité', 'Occupation strictement saisonnière (estive)'],
    ],
    materiaux: ['Pierre locale', 'Épicéa', 'Mélèze', 'Ancelle (bardeau)', 'Terre battue', 'Tôle (toitures tardives)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente simple à forte pente, couverture d’ancelles de bois ou de tôle, lestée de pierres contre le vent.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs bas en pierre sèche ou maçonnée grossière, une seule ouverture principale.' },
      { n: 3, el: 'Planchers', txt: 'Sol en terre battue ou dallage sommaire ; cave d’affinage en contrebas ou attenante.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs bas, charpente bois reposant directement sur la maçonnerie.' },
      { n: 5, el: 'Escalier', txt: 'Pas d’étage : bâtiment de plain-pied à volume unique ou divisé en deux pièces.' },
      { n: 6, el: 'Fondations', txt: 'Ancrage sommaire sur le sol rocheux de l’alpage, souvent sans réelle fondation.' },
    ],
    sections: [
      {
        title: 'Un habitat d’estive',
        icon: 'ph ph-mountains',
        intro: "Occupé de juin à septembre seulement, le chalet d’alpage abrite le berger et son troupeau durant la saison de pâture en altitude.",
        groups: [
          G(null, ['Occupation strictement saisonnière (estive)', 'Salle de traite et de fabrication fromagère', 'Cave d’affinage attenante ou en sous-sol frais']),
        ],
      },
      {
        title: 'Une construction sommaire',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Murs bas en pierre sèche ou maçonnerie grossière', 'Volume réduit, souvent une seule pièce', 'Plus rustique que le chalet savoyard permanent']),
        ],
      },
      {
        title: 'Toiture contre le vent d’altitude',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Forte pente pour l’évacuation de la neige', 'Couverture d’ancelles lestée de pierres', 'Charpente simple, peu de bois disponible en altitude']),
        ],
        outro: "Beaucoup de chalets d’alpage sont aujourd’hui restaurés pour l’accueil touristique estival tout en conservant leur usage pastoral.",
      },
    ],
  },

  {
    id: 'refugemontagne',
    name: 'Refuge de montagne',
    region: 'Alpes · Pyrénées',
    periode: '1880–1980',
    procede: 'Pierre & bois, structure renforcée',
    usage: 'Refuge d’altitude pour alpinistes et randonneurs',
    categorie: 'montagne',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Bâtiment d’altitude construit par les clubs alpins à partir de la fin du XIXe siècle pour l’accueil des alpinistes et randonneurs en haute montagne. Volumétrie compacte et aérodynamique, structure renforcée contre le vent et la neige, souvent accessible uniquement à pied ou par câble de ravitaillement.",
    identite: [
      ['Période', 'Fin XIXe siècle – XXe siècle'],
      ['Région', 'Alpes, Pyrénées, haute montagne'],
      ['Usage', 'Refuge d’altitude, accueil alpin'],
      ['Système', 'Structure renforcée pierre et bois ou métal'],
      ['Matériau dominant', 'Pierre locale, bois, tôle ondulée'],
      ['Toiture', 'Terrasse ou faible pente, ancrage renforcé'],
      ['Particularité', 'Ravitaillement héliporté ou par câble'],
    ],
    materiaux: ['Pierre locale', 'Bois massif', 'Tôle ondulée', 'Métal (ancrages)', 'Béton (soubassement tardif)', 'Verre (baies protégées)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Terrasse ou toiture à très faible pente, fortement ancrée pour résister aux vents violents d’altitude.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs bas en pierre locale ou bardage métallique, ouvertures réduites et protégées.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois sur solivage renforcé, dortoirs superposés pour optimiser l’espace.' },
      { n: 4, el: 'Structure porteuse', txt: 'Structure massive et compacte, contreventée contre les charges de vent et de neige extrêmes.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers et échelles intérieures étroites desservant les dortoirs mezzanine.' },
      { n: 6, el: 'Fondations', txt: 'Ancrages profonds scellés dans la roche pour résister aux vents violents d’altitude.' },
    ],
    sections: [
      {
        title: 'Un poste avancé en haute montagne',
        icon: 'ph ph-mountains',
        intro: "Construit par les clubs alpins, le refuge jalonne les itinéraires d’ascension et offre un abri sûr entre la vallée et le sommet.",
        groups: [
          G(null, ['Étape entre la vallée et les sommets', 'Dortoirs collectifs et salle commune', 'Gardiennage saisonnier, ravitaillement héliporté']),
        ],
      },
      {
        title: 'Une architecture aérodynamique',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Volumétrie compacte réduisant la prise au vent', 'Ancrages renforcés dans la roche', 'Matériaux résistants au gel et aux UV d’altitude']),
        ],
      },
      {
        title: 'Une évolution constructive',
        icon: 'ph ph-buildings',
        groups: [
          G('XIXe siècle', ['Refuges pionniers en pierre sèche, très sommaires']),
          G('XXe siècle', ['Structures métalliques préfabriquées, transportées par hélicoptère']),
        ],
      },
    ],
  },

  {
    id: 'grangeforaine',
    name: 'Grange foraine',
    region: 'Alpes · Jura · Vosges',
    periode: '1700–1950',
    procede: 'Bois & pierre',
    usage: 'Grange isolée d’alpage, stockage du foin',
    categorie: 'montagne',
    periodeTags: ['Avant 1800', 'XIXe', 'XXe'],
    resume:
      "Grange isolée construite au milieu des prés de montagne éloignés de la ferme principale, pour stocker le foin fauché sur place et éviter son transport jusqu’à la vallée. Volume simple en bois sur soubassement de pierre, parfois utilisée aussi comme abri temporaire pour le bétail.",
    identite: [
      ['Période', 'XVIIIe–XXe siècle'],
      ['Région', 'Alpes, Jura, Vosges, prés de montagne'],
      ['Usage', 'Grange foraine, stockage du foin en alpage'],
      ['Système', 'Charpente bois sur soubassement pierre'],
      ['Matériau dominant', 'Bois d’épicéa ou de sapin'],
      ['Toiture', 'Forte pente, bardeaux ou tavaillons'],
      ['Particularité', 'Bâtiment isolé, éloigné de la ferme'],
    ],
    materiaux: ['Épicéa', 'Sapin', 'Pierre locale', 'Tavaillon', 'Bardeau', 'Foin (stockage)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Charpente à forte pente couverte de tavaillons ou de bardeaux de bois, débord généreux protégeant le foin.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Bardage bois à claire-voie favorisant la ventilation du foin, soubassement en pierre sèche.' },
      { n: 3, el: 'Planchers', txt: 'Plancher haut en bois séparant l’aire de stockage du foin de l’abri à bétail au rez-de-chaussée.' },
      { n: 4, el: 'Structure porteuse', txt: 'Charpente bois simple reposant sur des murs bas en pierre ou des poteaux.' },
      { n: 5, el: 'Escalier', txt: 'Échelle extérieure ou trappe pour accéder au fenil, pas d’escalier à proprement parler.' },
      { n: 6, el: 'Fondations', txt: 'Soubassement sommaire en pierre sèche, posé à même la pente du pré.' },
    ],
    sections: [
      {
        title: 'Stocker le foin sur place',
        icon: 'ph ph-mountains',
        intro: "Isolée dans les prés d’altitude, la grange foraine évite le transport du foin jusqu’à la ferme et permet son stockage au plus près de la fauche.",
        groups: [
          G(null, ['Bâtiment isolé, dispersé dans les prés de montagne', 'Stockage du foin fauché sur place', 'Abri occasionnel pour le bétail en transit']),
        ],
      },
      {
        title: 'Une charpente ventilée',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Bardage à claire-voie pour aérer le foin engrangé', 'Structure bois légère sur soubassement de pierre', 'Grand volume intérieur libre de tout poteau central']),
        ],
      },
      {
        title: 'Toiture protectrice',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Forte pente évacuant rapidement la neige', 'Larges débords protégeant le bardage et le foin', 'Couverture en tavaillon ou bardeau de bois local']),
        ],
      },
    ],
  },

  {
    id: 'mazot',
    name: 'Mazot',
    region: 'Savoie · Haute-Savoie · Valais',
    periode: '1600–1900',
    procede: 'Bois sur pilotis de pierre',
    usage: 'Petit grenier à provisions sur pilotis',
    categorie: 'montagne',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petit bâtiment annexe en madriers de bois, isolé du chalet principal et surélevé sur des pilotis de pierre plate (« pierres à rats ») pour protéger les provisions et documents précieux du feu et des rongeurs. Le mazot ponctue traditionnellement les villages alpins savoyards.",
    identite: [
      ['Période', 'XVIIe–XIXe siècle'],
      ['Région', 'Savoie, Haute-Savoie, arc alpin'],
      ['Usage', 'Grenier à provisions, réserve de documents'],
      ['Système', 'Caisson bois en blockbau sur pilotis'],
      ['Matériau dominant', 'Mélèze ou épicéa'],
      ['Toiture', 'Tavaillons, faible pente'],
      ['Particularité', 'Surélévation anti-rongeurs et anti-incendie'],
    ],
    materiaux: ['Mélèze', 'Épicéa', 'Pierre plate (pilotis)', 'Tavaillon', 'Fer forgé (ferrures)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Petite charpente à faible pente couverte de tavaillons de mélèze, très en surplomb.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Caisson en madriers de bois assemblés en blockbau, sans isolant, parois jointives.' },
      { n: 3, el: 'Planchers', txt: 'Plancher unique surélevé, coffre à grains ou étagères à documents.' },
      { n: 4, el: 'Structure porteuse', txt: 'Caisson en bois massif autoportant, indépendant du chalet principal.' },
      { n: 5, el: 'Escalier', txt: 'Simple échelle ou marches de pierre menant à la porte surélevée.' },
      { n: 6, el: 'Fondations', txt: 'Pilotis en pierres plates (« pierres à rats ») isolant le caisson du sol humide et des rongeurs.' },
    ],
    sections: [
      {
        title: 'Une réserve protégée',
        icon: 'ph ph-mountains',
        intro: "Séparé du chalet pour limiter les risques d’incendie, le mazot conserve grains, salaisons et parfois les titres de propriété de la famille.",
        groups: [
          G(null, ['Bâtiment annexe isolé du chalet principal', 'Réserve de grains, salaisons, documents précieux', 'Prévention des risques d’incendie domestique']),
        ],
      },
      {
        title: 'Surélevé sur pilotis',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Pilotis en pierres plates dites « pierres à rats »', 'Isolation du caisson contre l’humidité et les rongeurs', 'Accès unique par une porte surélevée']),
        ],
      },
      {
        title: 'Un caisson en blockbau',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Madriers de mélèze assemblés à mi-bois aux angles', 'Étanchéité assurée par le gonflement naturel du bois', 'Petites dimensions, grande longévité du bois de mélèze']),
        ],
        outro: "Encore visible dans de nombreux villages savoyards, le mazot est aujourd’hui protégé comme élément du patrimoine vernaculaire alpin.",
      },
    ],
  },

  {
    id: 'mairie',
    name: 'Mairie',
    region: 'Toutes régions · un exemplaire par commune',
    periode: '1870–1940',
    procede: 'Pierre de taille & maçonnerie',
    usage: 'Siège de l’administration communale',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Bâtiment le plus visible de la commune, édifié massivement sous la IIIe République comme vitrine des valeurs républicaines. Plan symétrique à avant-corps central, fronton frappé du mot « Mairie » et horloge, salle des mariages en étage noble et salle du conseil.",
    identite: [
      ['Période', 'Fin XIXe – XXe siècle, essor sous la IIIe République'],
      ['Région', 'Toutes régions, un exemplaire par commune'],
      ['Usage', 'Administration communale, état civil, salle des mariages'],
      ['Système', 'Murs porteurs en maçonnerie'],
      ['Matériau dominant', 'Pierre de taille ou moellon enduit'],
      ['Plan', 'Symétrique, avant-corps central, perron d’accès'],
      ['Particularité', 'Horloge en façade, fronton « Mairie », buste de Marianne'],
    ],
    materiaux: ['Pierre de taille', 'Moellon enduit', 'Ardoise', 'Fer forgé (balcon)', 'Zinc (toiture)', 'Verre (verrière d’escalier)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture d’ardoise ou de tuile, souvent surmontée d’un campanile ou d’un fronton central logeant l’horloge communale.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade symétrique en pierre de taille, avant-corps central marqué par un fronton, perron d’accès solennel.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois ou métal sur solives, salle des mariages en étage noble dotée d’un parquet soigné.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en maçonnerie, complétés parfois d’une charpente métallique pour la grande salle.' },
      { n: 5, el: 'Escalier', txt: 'Escalier d’honneur central en pierre, menant à la salle du conseil et à la salle des mariages.' },
      { n: 6, el: 'Fondations', txt: 'Fondations massives en moellon, le bâtiment étant systématiquement implanté sur la place centrale.' },
    ],
    sections: [
      {
        title: 'Un symbole républicain',
        icon: 'ph ph-building',
        intro: "Bâtiment le plus visible de la commune, la mairie affiche les valeurs de la République par son fronton, sa devise gravée et son buste de Marianne.",
        groups: [
          G(null, ['Fronton frappé du mot « Mairie » et de la devise républicaine', 'Horloge publique réglant la vie du village', 'Drapeau tricolore et buste de Marianne dans le hall']),
        ],
      },
      {
        title: 'Une distribution codifiée',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Rez-de-chaussée : accueil, état civil, bureaux', 'Étage noble : salle des mariages et salle du conseil', 'Perron d’accès surélevé marquant la solennité du lieu']),
        ],
      },
      {
        title: 'Le couple mairie-école',
        icon: 'ph ph-house-line',
        groups: [
          G('IIIe République', ['Mairie et école souvent réunies dans un même édifice communal', 'Architecture normalisée diffusée par les préfectures', 'Symbole conjoint de la République et de l’instruction publique']),
        ],
        outro: "Ce jumelage mairie-école, très répandu dans les villages français, matérialise l’alliance de la démocratie locale et de l’école laïque.",
      },
    ],
  },

  {
    id: 'ecolejulesferry',
    name: 'École Jules Ferry',
    region: 'Toutes régions · écoles communales',
    periode: '1880–1940',
    procede: 'Brique ou pierre, grandes baies',
    usage: 'École primaire publique, laïque et gratuite',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "École primaire édifiée en masse après les lois Jules Ferry de 1881-1882 instaurant l’instruction primaire gratuite, obligatoire et laïque. Plan type avec préau couvert, classes largement éclairées par de hautes fenêtres, entrées séparées pour garçons et filles gravées au fronton.",
    identite: [
      ['Période', '1880–1940, essor après les lois Ferry'],
      ['Région', 'Toutes régions, une école par commune ou quartier'],
      ['Usage', 'École primaire publique laïque et gratuite'],
      ['Système', 'Murs porteurs en brique ou pierre'],
      ['Matériau dominant', 'Brique, pierre de taille ou moellon enduit'],
      ['Plan', 'Classes alignées, préau couvert, cour de récréation'],
      ['Particularité', 'Entrées « Garçons » / « Filles » gravées en façade'],
    ],
    materiaux: ['Brique', 'Pierre de taille', 'Fonte (préau)', 'Verre (grandes baies)', 'Ardoise', 'Bois (mobilier, parquet)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture à deux pans en ardoise ou tuile mécanique, charpente bois classique.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade en brique ou pierre percée de grandes fenêtres assurant un éclairage maximal des salles de classe.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois sur solivage, estrade du maître surélevée dans chaque salle de classe.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en maçonnerie, préau souvent couvert d’une charpente métallique légère sur poteaux de fonte.' },
      { n: 5, el: 'Escalier', txt: 'Escalier desservant l’étage des classes, parfois logement de fonction de l’instituteur à part.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en moellon, école implantée en général en bordure de la cour de récréation.' },
    ],
    sections: [
      {
        title: 'L’école de la République',
        icon: 'ph ph-buildings',
        intro: "Les lois Jules Ferry de 1881-1882 rendent l’école primaire gratuite, obligatoire et laïque, déclenchant une vague de constructions scolaires standardisées dans toute la France.",
        groups: [
          G(null, ['Inscription « Liberté Égalité Fraternité » au fronton', 'Entrées séparées « Garçons » et « Filles »', 'Logement de fonction pour l’instituteur ou l’institutrice']),
        ],
      },
      {
        title: 'Des classes largement éclairées',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Grandes baies orientées pour maximiser la lumière naturelle', 'Salles de classe rectangulaires avec estrade du maître', 'Tableau noir et poêle à bois ou charbon au centre de la pièce']),
        ],
      },
      {
        title: 'Le préau, cœur de la récréation',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Structure métallique légère sur poteaux de fonte', 'Espace couvert protégeant des intempéries', 'Cour de récréation attenante, souvent plantée d’un arbre']),
        ],
      },
    ],
  },

  {
    id: 'prefecture',
    name: 'Préfecture',
    region: 'Chef-lieu de département',
    periode: '1800–1920',
    procede: 'Pierre de taille, architecture monumentale',
    usage: 'Siège du représentant de l’État dans le département',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Siège du préfet, représentant de l’État créé par Napoléon Bonaparte en 1800, occupant souvent un ancien palais épiscopal ou un hôtel particulier réaffecté, ou un édifice monumental construit spécifiquement au XIXe siècle. Façade d’apparat, cour d’honneur et salons de réception marquent l’autorité de l’État dans le département.",
    identite: [
      ['Période', 'XIXe – début XXe siècle'],
      ['Région', 'Un exemplaire par chef-lieu de département'],
      ['Usage', 'Représentation de l’État, administration départementale'],
      ['Système', 'Maçonnerie porteuse, structure d’apparat'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Cour d’honneur, corps de logis, salons de réception'],
      ['Particularité', 'Souvent réaffectation d’un ancien palais épiscopal'],
    ],
    materiaux: ['Pierre de taille', 'Ardoise', 'Fer forgé (grilles)', 'Marbre (salons)', 'Bois précieux (boiseries)', 'Verre (lustres, miroirs)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture d’ardoise à la Mansart ou à longs pans, souvent héritée du bâtiment d’origine (palais épiscopal, hôtel particulier).' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade d’apparat en pierre de taille, ordonnancement classique, grilles en fer forgé fermant la cour d’honneur.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois nobles, salons de réception aux parquets marquetés et lambris dorés.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en pierre, structure hiérarchisée entre bureaux administratifs et salons de réception.' },
      { n: 5, el: 'Escalier', txt: 'Escalier d’honneur monumental en pierre, desservant les salons officiels du préfet.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes en pierre, bâtiment souvent implanté sur un site historique déjà bâti.' },
    ],
    sections: [
      {
        title: 'L’autorité de l’État en province',
        icon: 'ph ph-building',
        intro: "Créée par Bonaparte en 1800, la préfecture incarne la présence de l’État central dans chaque département, entre administration et représentation officielle.",
        groups: [
          G(null, ['Souvent installée dans un ancien palais épiscopal confisqué', 'Cour d’honneur pour les cérémonies officielles', 'Salons de réception pour les visites d’État']),
        ],
      },
      {
        title: 'Une architecture d’apparat',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Ordonnancement classique, façade symétrique', 'Grilles en fer forgé et cour d’honneur pavée', 'Salons richement décorés, lustres et boiseries dorées']),
        ],
      },
      {
        title: 'Administration et réception',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Bureaux administratifs dans les ailes courantes', 'Appartement de fonction du préfet à l’étage', 'Grand salon d’honneur pour les cérémonies officielles']),
        ],
      },
    ],
  },

  {
    id: 'tribunal',
    name: 'Tribunal',
    region: 'Chef-lieu de département ou d’arrondissement',
    periode: '1800–1930',
    procede: 'Pierre de taille, ordre colossal',
    usage: 'Palais de justice, rendu de la justice',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Palais de justice construit pour incarner la solennité et l’impartialité de la justice républicaine, souvent doté d’un portique à colonnes et d’un fronton sculpté. Plan basilical organisant salles d’audience, salle des pas perdus et cabinets de juges autour d’un axe symétrique.",
    identite: [
      ['Période', 'XIXe – début XXe siècle'],
      ['Région', 'Chefs-lieux de département ou d’arrondissement'],
      ['Usage', 'Rendu de la justice, tribunal civil et correctionnel'],
      ['Système', 'Maçonnerie porteuse, ordre colossal en façade'],
      ['Matériau dominant', 'Pierre de taille'],
      ['Plan', 'Basilical, salle des pas perdus centrale'],
      ['Particularité', 'Portique à colonnes et fronton sculpté « Palais de Justice »'],
    ],
    materiaux: ['Pierre de taille', 'Marbre (salle des pas perdus)', 'Bois (boiseries des salles d’audience)', 'Fer forgé', 'Ardoise', 'Bronze (statuaire)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture à longs pans en ardoise, fronton triangulaire sculpté surmontant le portique d’entrée.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade monumentale à portique de colonnes, ordre colossal évoquant les temples antiques de la justice.' },
      { n: 3, el: 'Planchers', txt: 'Sol de la salle des pas perdus en marbre ou dallage noble, planchers bois dans les salles d’audience.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en pierre, grande salle des pas perdus libre de tout poteau intermédiaire.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers monumentaux menant aux salles d’audience et aux cabinets des juges à l’étage.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes en pierre, adaptées au poids de la structure monumentale.' },
    ],
    sections: [
      {
        title: 'Le temple de la justice',
        icon: 'ph ph-shield-check',
        intro: "L’architecture du tribunal emprunte au vocabulaire des temples antiques pour incarner la solennité, l’impartialité et la permanence de la justice.",
        groups: [
          G(null, ['Portique à colonnes évoquant les temples grecs', 'Fronton sculpté « Palais de Justice » ou « Liberté Égalité Fraternité »', 'Statues allégoriques de la Justice en façade']),
        ],
      },
      {
        title: 'La salle des pas perdus',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Grand hall central distribuant les salles d’audience', 'Sol de marbre ou de pierre polie', 'Lieu d’attente symbolique avant le jugement']),
        ],
      },
      {
        title: 'Salles d’audience et cabinets',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Salles d’audience boisées, estrade des magistrats surélevée', 'Cabinets des juges d’instruction à l’étage', 'Circulation séparée pour magistrats, public et prévenus']),
        ],
      },
    ],
  },

  {
    id: 'hopital',
    name: 'Hôpital',
    region: 'Toutes régions · villes principales',
    periode: '1800–1970',
    procede: 'Système pavillonnaire, brique & pierre',
    usage: 'Établissement public de soins',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Établissement public de soins organisé, à partir du mouvement hygiéniste du XIXe siècle, en pavillons séparés reliés par des galeries pour limiter la propagation des maladies et favoriser l’aération. Parc planté, chapelle et services techniques complètent l’ensemble hospitalier.",
    identite: [
      ['Période', 'XIXe – XXe siècle, système pavillonnaire hygiéniste'],
      ['Région', 'Toutes régions, villes principales'],
      ['Usage', 'Établissement public de soins et d’hospitalisation'],
      ['Système', 'Pavillons indépendants reliés par galeries'],
      ['Matériau dominant', 'Brique ou pierre, larges baies'],
      ['Plan', 'Pavillonnaire, parc planté, orientation nord-sud'],
      ['Particularité', 'Galeries de circulation extérieures couvertes'],
    ],
    materiaux: ['Brique', 'Pierre de taille', 'Fer (galeries)', 'Verre (grandes baies)', 'Carrelage (salles de soins)', 'Zinc (toiture)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toitures à longs pans en ardoise ou tuile mécanique, un pavillon par service avec sa propre couverture.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façades percées de larges baies pour l’aération et l’ensoleillement des salles communes, principe hygiéniste fondamental.' },
      { n: 3, el: 'Planchers', txt: 'Planchers carrelés ou cimentés, faciles à désinfecter, dans les salles de soins.' },
      { n: 4, el: 'Structure porteuse', txt: 'Pavillons indépendants en maçonnerie porteuse, reliés par des galeries métalliques ou couvertes limitant la contagion.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers larges permettant le passage de brancards, rampes d’accès pour certains pavillons.' },
      { n: 6, el: 'Fondations', txt: 'Fondations adaptées à chaque pavillon, implantation espacée dans un parc planté favorisant l’air pur.' },
    ],
    sections: [
      {
        title: 'La révolution hygiéniste',
        icon: 'ph ph-buildings',
        intro: "Après les épidémies du XIXe siècle, la doctrine hygiéniste impose la séparation des malades en pavillons distincts, aérés et éloignés les uns des autres.",
        groups: [
          G(null, ['Pavillons séparés par pathologie ou par service', 'Parc arboré isolant les bâtiments les uns des autres', 'Orientation étudiée pour maximiser l’ensoleillement']),
        ],
      },
      {
        title: 'Des galeries de liaison',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Galeries couvertes reliant les pavillons entre eux', 'Circulation protégée des intempéries pour le personnel', 'Limitation des contacts directs entre services']),
        ],
      },
      {
        title: 'Vers l’hôpital-bloc',
        icon: 'ph ph-cross',
        groups: [
          G('XXe siècle', ['Abandon progressif du système pavillonnaire après 1950', 'Construction de tours hospitalières verticales', 'Concentration des services techniques et plateaux médicaux']),
        ],
        outro: "Après 1950, l’hôpital-bloc vertical remplace peu à peu le système pavillonnaire, jugé trop coûteux en circulation et en entretien.",
      },
    ],
  },

  {
    id: 'hospice',
    name: 'Hospice',
    region: 'Toutes régions · villes et bourgs',
    periode: '1700–1900',
    procede: 'Pierre & maçonnerie, plan claustral',
    usage: 'Accueil des indigents, malades et personnes âgées',
    categorie: 'publique',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Établissement charitable héritier des hôtels-Dieu médiévaux, organisé autour d’une chapelle et de dortoirs communs pour accueillir indigents, orphelins, malades chroniques et personnes âgées sans ressources. Plan souvent claustral, hérité des fondations religieuses d’Ancien Régime, poursuivi et sécularisé au XIXe siècle.",
    identite: [
      ['Période', 'XVIIIe–XIXe siècle'],
      ['Région', 'Toutes régions, villes et bourgs'],
      ['Usage', 'Accueil des indigents, malades chroniques, personnes âgées'],
      ['Système', 'Murs porteurs en pierre, plan claustral'],
      ['Matériau dominant', 'Pierre locale'],
      ['Plan', 'Cour centrale, galeries, chapelle attenante'],
      ['Particularité', 'Continuité avec les fondations charitables d’Ancien Régime'],
    ],
    materiaux: ['Pierre locale', 'Bois (charpente)', 'Tuile ou ardoise', 'Fer forgé (grilles)', 'Verre (vitraux de chapelle)', 'Chaux (enduits)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture à longs pans en tuile ou ardoise selon la région, souvent percée de lucarnes pour aérer les dortoirs.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façades sobres en pierre locale, galeries couvertes distribuant les ailes autour de la cour centrale.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois sur solivage dans les dortoirs communs, sol dallé dans les circulations.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs épais en pierre, plan organisé en ailes autour d’une cour ou d’un cloître.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers en pierre desservant les dortoirs à l’étage, souvent placés aux extrémités des ailes.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre, bâtiment implanté en cœur de ville sur une fondation charitable ancienne.' },
    ],
    sections: [
      {
        title: 'Une charité institutionnalisée',
        icon: 'ph ph-hand-heart',
        intro: "Héritier des hôtels-Dieu et fondations charitables religieuses, l’hospice recueille ceux que la société d’Ancien Régime puis la République ne peuvent soigner autrement.",
        groups: [
          G(null, ['Accueil des indigents, orphelins et malades chroniques', 'Financement par legs, dons et fondations pieuses', 'Sécularisation progressive de la gestion au XIXe siècle']),
        ],
      },
      {
        title: 'Un plan claustral',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Cour centrale distribuant les ailes de dortoirs', 'Chapelle attenante, cœur spirituel de l’établissement', 'Galeries couvertes reliant les différents services']),
        ],
      },
      {
        title: 'Des dortoirs communs',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Grandes salles communes à lits alignés', 'Peu d’intimité, surveillance centralisée', 'Infirmerie et pharmacie attenantes aux dortoirs']),
        ],
      },
    ],
  },

  {
    id: 'prison',
    name: 'Prison',
    region: 'Chef-lieu de département',
    periode: '1800–1950',
    procede: 'Plan cellulaire, murs d’enceinte',
    usage: 'Établissement pénitentiaire',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Établissement pénitentiaire reconstruit au XIXe siècle selon le principe cellulaire, inspiré du panoptique, où un poste central de surveillance permet un contrôle visuel de plusieurs ailes de cellules disposées en étoile. Hauts murs d’enceinte, miradors et cour de promenade complètent le dispositif sécuritaire.",
    identite: [
      ['Période', 'XIXe – XXe siècle, réforme pénitentiaire cellulaire'],
      ['Région', 'Chefs-lieux de département'],
      ['Usage', 'Détention, maison d’arrêt ou centrale'],
      ['Système', 'Plan en étoile, surveillance centrale'],
      ['Matériau dominant', 'Pierre ou brique, murs très épais'],
      ['Plan', 'Ailes cellulaires rayonnant autour d’un poste central'],
      ['Particularité', 'Miradors et murs d’enceinte périphériques'],
    ],
    materiaux: ['Pierre de taille', 'Brique', 'Fer (grilles et portes cellulaires)', 'Béton (extensions XXe)', 'Ardoise', 'Verre armé (fenêtres cellulaires)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toitures à longs pans couvrant chaque aile cellulaire, verrière zénithale au-dessus du poste de surveillance central.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Murs très épais percés de fenêtres étroites et grillagées, hauts murs d’enceinte aveugles côté extérieur.' },
      { n: 3, el: 'Planchers', txt: 'Planchers ou dalles en béton armé, coursives métalliques desservant les cellules sur plusieurs niveaux.' },
      { n: 4, el: 'Structure porteuse', txt: 'Structure en étoile : ailes cellulaires rayonnant depuis un poste central offrant une vue sur toutes les coursives.' },
      { n: 5, el: 'Escalier', txt: 'Escaliers métalliques en colimaçon ou coursives superposées reliant les niveaux de cellules.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes, enceinte fortifiée délimitant nettement l’intérieur pénitentiaire de la ville.' },
    ],
    sections: [
      {
        title: 'Le principe cellulaire',
        icon: 'ph ph-shield-check',
        intro: "La réforme pénitentiaire du XIXe siècle impose l’isolement individuel des détenus, rompant avec les geôles communes de l’Ancien Régime.",
        groups: [
          G(null, ['Une cellule par détenu, principe hygiéniste et disciplinaire', 'Plan en étoile inspiré du panoptique de Bentham', 'Surveillance centralisée depuis un poste unique']),
        ],
      },
      {
        title: 'Un dispositif sécuritaire',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Hauts murs d’enceinte aveugles côté ville', 'Miradors aux angles pour la surveillance périphérique', 'Sas d’entrée unique fortement contrôlé']),
        ],
      },
      {
        title: 'Vie carcérale et travail',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Ateliers de travail pénitentiaire en rez-de-chaussée', 'Cour de promenade cloisonnée en secteurs', 'Chapelle ou salle de culte accessible aux détenus']),
        ],
      },
    ],
  },

  {
    id: 'casernepompiers',
    name: 'Caserne de pompiers',
    region: 'Toutes régions · villes et bourgs',
    periode: '1900–1980',
    procede: 'Structure en béton, grande travée de remise',
    usage: 'Caserne des sapeurs-pompiers',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Bâtiment public abritant les véhicules et le personnel des sapeurs-pompiers, reconnaissable à sa grande travée de remise à portes hautes et à sa tour de manœuvre servant historiquement au séchage des tuyaux d’incendie. Locaux de vie et dortoirs de garde complètent l’équipement opérationnel.",
    identite: [
      ['Période', 'XXe siècle, professionnalisation du service'],
      ['Région', 'Toutes régions, villes et bourgs'],
      ['Usage', 'Caserne des sapeurs-pompiers, intervention d’urgence'],
      ['Système', 'Ossature béton, grande travée dégagée'],
      ['Matériau dominant', 'Béton armé, parpaing enduit'],
      ['Plan', 'Remise des véhicules, tour de manœuvre, locaux de vie'],
      ['Particularité', 'Tour de manœuvre servant au séchage des tuyaux'],
    ],
    materiaux: ['Béton armé', 'Parpaing enduit', 'Métal (portes de remise)', 'Verre (façade vitrée)', 'Acier (structure de la tour)', 'Peinture rouge (signalétique)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture-terrasse ou à faible pente en béton, tour de manœuvre culminant au-dessus du volume principal.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade dominée par les larges portes de la remise, permettant la sortie rapide des véhicules d’intervention.' },
      { n: 3, el: 'Planchers', txt: 'Dalle béton au rez-de-chaussée pour la remise, planchers légers à l’étage pour les locaux de vie et dortoirs de garde.' },
      { n: 4, el: 'Structure porteuse', txt: 'Ossature béton armé dégageant une grande travée libre pour le stationnement des camions.' },
      { n: 5, el: 'Escalier', txt: 'Escalier ou perche de descente rapide reliant les dortoirs de garde à la remise des véhicules.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en béton armé dimensionnées pour supporter le poids des véhicules lourds.' },
    ],
    sections: [
      {
        title: 'Un équipement d’urgence',
        icon: 'ph ph-building',
        intro: "La caserne organise l’intervention rapide : véhicules alignés prêts au départ, dortoirs de garde à proximité immédiate de la remise.",
        groups: [
          G(null, ['Remise ouverte permettant une sortie rapide des engins', 'Dortoirs de garde reliés à la remise par perche ou escalier direct', 'Salle d’alerte recevant les appels d’urgence']),
        ],
      },
      {
        title: 'La tour de manœuvre',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Tour élancée servant historiquement au séchage vertical des tuyaux', 'Support d’exercices d’entraînement en hauteur', 'Élément vertical identifiant la caserne dans le paysage urbain']),
        ],
      },
      {
        title: 'Une architecture fonctionnelle',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Grande travée dégagée de tout poteau intermédiaire', 'Portes hautes dimensionnées pour les camions', 'Signalétique rouge caractéristique du service incendie']),
        ],
      },
    ],
  },

  {
    id: 'bureauposte',
    name: 'Bureau de poste',
    region: 'Toutes régions · villes et bourgs',
    periode: '1880–1960',
    procede: 'Pierre ou brique, guichets alignés',
    usage: 'Service postal, télégraphe et téléphone (PTT)',
    categorie: 'publique',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Bâtiment public du service des Postes, Télégraphes et Téléphones (PTT), reconnaissable à sa façade sobre, son horloge et son enseigne, organisé autour d’une salle du public à guichets alignés. Diffusé selon des plans-types administratifs de la fin du XIXe siècle jusqu’au milieu du XXe siècle.",
    identite: [
      ['Période', 'Fin XIXe – milieu XXe siècle'],
      ['Région', 'Toutes régions, villes et bourgs'],
      ['Usage', 'Service postal, télégraphique et téléphonique (PTT)'],
      ['Système', 'Murs porteurs en pierre ou brique'],
      ['Matériau dominant', 'Pierre de taille ou brique enduite'],
      ['Plan', 'Salle du public à guichets, bureaux de tri à l’arrière'],
      ['Particularité', 'Horloge et enseigne PTT normalisées'],
    ],
    materiaux: ['Pierre de taille', 'Brique enduite', 'Bois (guichets et mobilier)', 'Verre (comptoirs vitrés)', 'Fer forgé (grilles de guichet)', 'Ardoise ou tuile (toiture)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Toiture à longs pans en ardoise ou tuile mécanique, sobre et fonctionnelle.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade sobre en pierre ou brique, enseigne PTT normalisée et horloge publique en applique.' },
      { n: 3, el: 'Planchers', txt: 'Planchers bois ou carrelage dans la salle du public, comptoirs de guichet alignés le long d’un mur.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs en maçonnerie, salle du public dégagée, bureaux de tri et de service à l’arrière du bâtiment.' },
      { n: 5, el: 'Escalier', txt: 'Escalier de service menant aux bureaux administratifs ou au logement du receveur à l’étage.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en pierre ou moellon, bâtiment implanté en centre-bourg à proximité de la mairie.' },
    ],
    sections: [
      {
        title: 'Le service public normalisé',
        icon: 'ph ph-building',
        intro: "L’administration des PTT diffuse des plans-types de bureaux de poste dans toute la France, garantissant une reconnaissance immédiate du service public postal.",
        groups: [
          G(null, ['Enseigne et horloge PTT identiques d’une commune à l’autre', 'Logement de fonction du receveur souvent intégré au bâtiment', 'Bureau implanté en position centrale, près de la mairie']),
        ],
      },
      {
        title: 'La salle du public',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Guichets alignés séparant public et personnel', 'Comptoirs vitrés pour le courrier et les opérations financières', 'Cabines téléphoniques publiques dans les bureaux les plus importants']),
        ],
      },
      {
        title: 'Tri et distribution',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Bureaux de tri du courrier à l’arrière du bâtiment', 'Accès dédié pour les facteurs et les tournées de distribution', 'Remises pour les vélos ou véhicules de service']),
        ],
      },
    ],
  },

  {
    id: 'gareroutiere',
    name: 'Gare routière',
    region: 'Toutes régions · villes moyennes',
    periode: '1930–1980',
    procede: 'Béton, grande marquise en porte-à-faux',
    usage: 'Terminus et correspondance des lignes d’autocars',
    categorie: 'publique',
    periodeTags: ['XXe'],
    resume:
      "Équipement public organisant le terminus et la correspondance des lignes d’autocars, caractérisé par une grande marquise en porte-à-faux protégeant les quais d’embarquement des intempéries. Typologie moderniste développée avec l’essor des transports routiers de voyageurs au XXe siècle.",
    identite: [
      ['Période', '1930–1980, essor du transport routier'],
      ['Région', 'Toutes régions, villes moyennes'],
      ['Usage', 'Terminus et correspondance des lignes d’autocars'],
      ['Système', 'Ossature béton armé, marquise en porte-à-faux'],
      ['Matériau dominant', 'Béton armé'],
      ['Plan', 'Quais alignés sous marquise, salle d’attente'],
      ['Particularité', 'Grande marquise en porte-à-faux sans poteaux côté quai'],
    ],
    materiaux: ['Béton armé', 'Verre (salle d’attente)', 'Acier (structure de marquise)', 'Carrelage (sol des quais)', 'Métal (mobilier d’attente)', 'Peinture signalétique'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Grande marquise en béton armé en porte-à-faux, protégeant les quais sans poteaux gênant la circulation des cars.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade vitrée de la salle d’attente ouvrant largement sur les quais d’embarquement.' },
      { n: 3, el: 'Planchers', txt: 'Quais carrelés ou bétonnés, légèrement surélevés pour faciliter l’accès aux autocars.' },
      { n: 4, el: 'Structure porteuse', txt: 'Structure en béton armé, marquise en porte-à-faux calculée pour dégager tout appui côté quai.' },
      { n: 5, el: 'Escalier', txt: 'Rampes d’accès de plain-pied privilégiées, peu d’escaliers pour faciliter le passage des voyageurs et bagages.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en béton armé, semelles renforcées sous les points d’appui de la marquise en porte-à-faux.' },
    ],
    sections: [
      {
        title: 'L’essor du transport routier',
        icon: 'ph ph-building',
        intro: "Avec le développement des réseaux d’autocars au XXe siècle, les villes moyennes se dotent d’équipements dédiés à la correspondance des lignes routières de voyageurs.",
        groups: [
          G(null, ['Terminus et correspondance de plusieurs lignes d’autocars', 'Souvent implantée à proximité de la gare ferroviaire', 'Guichets de vente de billets et consigne à bagages']),
        ],
      },
      {
        title: 'La marquise en porte-à-faux',
        icon: 'ph ph-crane-tower',
        groups: [
          G(null, ['Prouesse structurelle en béton armé sans poteaux côté quai', 'Protection continue des voyageurs sur toute la longueur des quais', 'Expression architecturale moderniste caractéristique de la typologie']),
        ],
      },
      {
        title: 'Des quais fonctionnels',
        icon: 'ph ph-rows',
        groups: [
          G(null, ['Quais numérotés alignés le long de la marquise', 'Salle d’attente vitrée ouverte sur les départs', 'Signalétique claire des destinations et horaires']),
        ],
      },
    ],
  },

  {
    id: 'chapellefuneraire',
    name: 'Chapelle funéraire',
    region: 'Toutes régions · grands cimetières urbains',
    periode: '1800–1950',
    procede: 'Pierre de taille, éclectisme stylistique',
    usage: 'Chapelle privée de sépulture familiale',
    categorie: 'religieuse',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Petite construction en forme de temple ou d’église miniature, édifiée par les familles bourgeoises dans les grands cimetières urbains depuis le décret impérial de 1804 autorisant l’achat de concessions perpétuelles. Style éclectique — néo-gothique, néoclassique ou égyptisant — avec vitrail, autel et caveau en sous-sol.",
    identite: [
      ['Période', 'XIXe–XXe siècle, essor après le décret de 1804'],
      ['Région', 'Toutes régions, grands cimetières urbains'],
      ['Usage', 'Chapelle privée de sépulture familiale'],
      ['Système', 'Maçonnerie porteuse, caveau en sous-sol'],
      ['Matériau dominant', 'Pierre de taille (granite, marbre)'],
      ['Plan', 'Temple ou église miniature, porte à vitrail'],
      ['Particularité', 'Éclectisme stylistique (néo-gothique, égyptisant, classique)'],
    ],
    materiaux: ['Pierre de taille', 'Granite', 'Marbre', 'Fer forgé (grille)', 'Vitrail', 'Bronze (ornements)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Petite toiture à deux pans ou en bâtière, parfois flèche ou pinacle néo-gothique couronnant l’édifice.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade en pierre de taille travaillée en style néo-gothique, néoclassique ou égyptisant selon les moyens de la famille.' },
      { n: 3, el: 'Planchers', txt: 'Dallage de pierre ou de marbre au niveau du culte, trappe d’accès au caveau souterrain.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs porteurs massifs en pierre, renforcés pour soutenir le caveau enterré et son poids.' },
      { n: 5, el: 'Escalier', txt: 'Escalier étroit ou échelle descendant au caveau familial en sous-sol.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes creusées pour accueillir le caveau et les cercueils superposés.' },
    ],
    sections: [
      {
        title: 'Une propriété perpétuelle',
        icon: 'ph ph-building',
        intro: "Le décret impérial de 1804 autorise l’achat de concessions à perpétuité, donnant naissance à un véritable urbanisme funéraire bourgeois dans les grands cimetières.",
        groups: [
          G(null, ['Concession perpétuelle achetée par la famille', 'Chapelle transmise de génération en génération', 'Symbole de statut social au sein du cimetière']),
        ],
      },
      {
        title: 'Un éclectisme stylistique',
        icon: 'ph ph-columns',
        groups: [
          G(null, ['Néo-gothique : pinacles, arcs brisés, rosace', 'Néoclassique : fronton, colonnes, urne funéraire', 'Égyptisant : pylône, obélisque, disque solaire']),
        ],
      },
      {
        title: 'Le caveau souterrain',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Accès par une trappe dissimulée sous le dallage', 'Plusieurs niveaux de casiers pour les générations successives', 'Chapelle en surface, sépulture proprement dite enterrée']),
        ],
      },
    ],
  },

  {
    id: 'caveaufamilial',
    name: 'Caveau familial',
    region: 'Toutes régions · cimetières communaux',
    periode: '1800–1980',
    procede: 'Maçonnerie enterrée, dalle de couverture',
    usage: 'Sépulture familiale souterraine à plusieurs places',
    categorie: 'religieuse',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Fosse maçonnée souterraine à plusieurs niveaux de casiers, surmontée d’une dalle et d’un monument funéraire en surface (stèle, croix, plaque). Forme la plus répandue de sépulture familiale dans les cimetières communaux français, accueillant plusieurs générations successives.",
    identite: [
      ['Période', 'XIXe–XXe siècle'],
      ['Région', 'Toutes régions, cimetières communaux'],
      ['Usage', 'Sépulture familiale souterraine à plusieurs places'],
      ['Système', 'Maçonnerie enterrée, casiers superposés'],
      ['Matériau dominant', 'Béton et pierre ou brique'],
      ['Plan', 'Fosse rectangulaire, dalle de fermeture en surface'],
      ['Particularité', 'Plusieurs niveaux de casiers pour générations successives'],
    ],
    materiaux: ['Béton', 'Brique', 'Pierre (dalle de couverture)', 'Granite (monument en surface)', 'Fer (armatures)', 'Marbre (plaque)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Pas de toiture à proprement parler : dalle de couverture en pierre ou granite affleurant le sol, portant le monument.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Aucune élévation visible hormis le monument en surface — stèle, croix ou plaque gravée du nom de famille.' },
      { n: 3, el: 'Planchers', txt: 'Fond du caveau maçonné ou bétonné, casiers superposés séparés par des dalles intermédiaires.' },
      { n: 4, el: 'Structure porteuse', txt: 'Parois maçonnées en brique ou béton, voûte ou dalle supportant le poids du monument et de la terre.' },
      { n: 5, el: 'Escalier', txt: 'Accès rare : une trappe scellée suffit en général pour les inhumations successives.' },
      { n: 6, el: 'Fondations', txt: 'Fosse creusée en profondeur, étanchéité assurée par un enduit hydrofuge sur les parois maçonnées.' },
    ],
    sections: [
      {
        title: 'Une sépulture pour plusieurs générations',
        icon: 'ph ph-stack',
        intro: "Le caveau familial permet d’accueillir successivement plusieurs générations d’une même famille dans un espace unique et durable.",
        groups: [
          G(null, ['Concession de plusieurs décennies renouvelable', 'Plusieurs places superposées ou juxtaposées', 'Transmission du caveau au sein de la famille']),
        ],
      },
      {
        title: 'Une structure enterrée',
        icon: 'ph ph-wall',
        groups: [
          G(null, ['Parois maçonnées étanches contre les infiltrations', 'Casiers séparés par des dalles intermédiaires', 'Dalle de couverture supportant le monument en surface']),
        ],
      },
      {
        title: 'Le monument en surface',
        icon: 'ph ph-house-line',
        groups: [
          G(null, ['Stèle, croix ou colonne selon les moyens de la famille', 'Plaque gravée du nom et des dates', 'Granite poli, matériau devenu dominant au XXe siècle']),
        ],
      },
    ],
  },

  {
    id: 'mausolee',
    name: 'Mausolée',
    region: 'Toutes régions · grands cimetières et nécropoles',
    periode: '1800–1930',
    procede: 'Pierre monumentale, coupole ou fronton',
    usage: 'Monument funéraire d’apparat pour personnalité ou grande famille',
    categorie: 'religieuse',
    periodeTags: ['XIXe', 'XXe'],
    resume:
      "Monument funéraire de grande ampleur édifié pour des personnalités ou de grandes familles, empruntant le vocabulaire des temples antiques — coupole, colonnades, fronton sculpté. Édifice isolé et centré, souvent visible de loin dans le paysage du cimetière, dont il constitue l’un des points d’orgue architecturaux.",
    identite: [
      ['Période', 'XIXe – début XXe siècle'],
      ['Région', 'Toutes régions, grands cimetières et nécropoles'],
      ['Usage', 'Monument funéraire d’apparat pour personnalité ou grande famille'],
      ['Système', 'Maçonnerie monumentale, coupole ou voûte'],
      ['Matériau dominant', 'Pierre de taille, marbre'],
      ['Plan', 'Centré, souvent circulaire ou en croix grecque'],
      ['Particularité', 'Coupole ou fronton sculpté, statuaire allégorique'],
    ],
    materiaux: ['Pierre de taille', 'Marbre', 'Bronze (statuaire)', 'Granite', 'Vitrail', 'Mosaïque (décor intérieur)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Coupole hémisphérique ou toiture pyramidale en pierre, parfois couverte de plomb ou de cuivre.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Façade monumentale à colonnes ou pilastres, fronton sculpté d’allégories funéraires (urne, flambeau renversé, ange).' },
      { n: 3, el: 'Planchers', txt: 'Dallage de marbre polychrome, caveau accessible par une trappe centrale ou un escalier latéral.' },
      { n: 4, el: 'Structure porteuse', txt: 'Maçonnerie massive supportant la coupole ou la voûte, structure centrée autour d’un axe de symétrie.' },
      { n: 5, el: 'Escalier', txt: 'Escalier monumental ou perron d’accès à l’entrée, escalier secondaire menant au caveau souterrain.' },
      { n: 6, el: 'Fondations', txt: 'Fondations profondes et massives, proportionnées à l’ampleur et au poids du monument.' },
    ],
    sections: [
      {
        title: 'Un temple de la mémoire',
        icon: 'ph ph-columns',
        intro: "Le mausolée emprunte délibérément le vocabulaire des temples antiques pour conférer à la mémoire du défunt une dimension quasi sacrée.",
        groups: [
          G(null, ['Coupole ou dôme couronnant l’édifice', 'Colonnades et pilastres évoquant l’architecture classique', 'Édifice isolé, point d’orgue du paysage funéraire']),
        ],
      },
      {
        title: 'Une statuaire allégorique',
        icon: 'ph ph-hand-heart',
        groups: [
          G(null, ['Urne voilée et flambeau renversé, symboles de la vie éteinte', 'Ange du recueillement ou de la résurrection', 'Portrait sculpté ou médaillon du défunt']),
        ],
      },
      {
        title: 'Un caveau monumental',
        icon: 'ph ph-stack',
        groups: [
          G(null, ['Caveau souterrain accessible par un escalier dédié', 'Plusieurs sarcophages ou cercueils alignés', 'Décor intérieur soigné, mosaïque ou marbre polychrome']),
        ],
      },
    ],
  },

  {
    id: 'columbarium',
    name: 'Columbarium',
    region: 'Toutes régions · cimetières contemporains',
    periode: '1970–2020',
    procede: 'Béton et pierre, cases cinéraires',
    usage: 'Conservation collective des urnes cinéraires',
    categorie: 'religieuse',
    periodeTags: ['XXe'],
    resume:
      "Mur ou édicule structuré en cases individuelles destinées à recevoir des urnes cinéraires, typologie récente reflétant l’essor de la crémation dans les pratiques funéraires françaises depuis sa légalisation en 1887 et surtout sa généralisation après la loi de 2008 sur le statut des cendres.",
    identite: [
      ['Période', 'XXe–XXIe siècle, essor après la loi de 2008'],
      ['Région', 'Toutes régions, cimetières contemporains'],
      ['Usage', 'Conservation collective des urnes cinéraires'],
      ['Système', 'Mur à cases, structure béton ou pierre'],
      ['Matériau dominant', 'Béton et granite'],
      ['Plan', 'Mur ou édicule à niches alignées et numérotées'],
      ['Particularité', 'Chaque case scellée par une plaque commémorative individuelle'],
    ],
    materiaux: ['Béton', 'Granite', 'Marbre (plaques)', 'Bronze (lettrage)', 'Verre (certains modèles vitrés)', 'Acier inoxydable (ferrures)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Auvent ou couverture légère protégeant le mur de cases des intempéries, parfois simple corniche en pierre.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Mur structuré en grille régulière de niches individuelles, chacune fermée par une plaque de marbre ou de granite gravée.' },
      { n: 3, el: 'Planchers', txt: 'Dallage devant le columbarium favorisant le recueillement, jardin du souvenir attenant fréquent.' },
      { n: 4, el: 'Structure porteuse', txt: 'Structure en béton armé formant une grille de cases modulaires, revêtue de pierre ou de granite.' },
      { n: 5, el: 'Escalier', txt: 'Généralement de plain-pied, rampe d’accès prévue pour l’accessibilité aux personnes à mobilité réduite.' },
      { n: 6, el: 'Fondations', txt: 'Fondations légères en béton, l’édicule n’ayant pas la masse d’un caveau traditionnel.' },
    ],
    sections: [
      {
        title: 'L’essor de la crémation',
        icon: 'ph ph-buildings',
        intro: "Légalisée en France en 1887 mais longtemps marginale, la crémation se généralise à partir des années 1980, imposant de nouveaux équipements funéraires dans les cimetières.",
        groups: [
          G(null, ['Alternative à l’inhumation traditionnelle en caveau', 'Développement accéléré à partir des années 1980-2000', 'Encadrement légal renforcé par la loi de 2008']),
        ],
      },
      {
        title: 'Une grille de niches',
        icon: 'ph ph-grid-nine',
        groups: [
          G(null, ['Cases numérotées de taille standardisée', 'Plaque commémorative individuelle scellant chaque case', 'Disposition modulaire facilement extensible']),
        ],
      },
      {
        title: 'Le jardin du souvenir',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Espace paysager attenant pour la dispersion des cendres', 'Plaque collective portant les noms des défunts dispersés', 'Aménagement végétal apaisant, en rupture avec le cimetière minéral']),
        ],
      },
    ],
  },

  {
    id: 'ossuaire',
    name: 'Ossuaire',
    region: 'Toutes régions · anciens cimetières paroissiaux',
    periode: '1500–1900',
    procede: 'Pierre ou bois, galerie à claire-voie',
    usage: 'Conservation collective des ossements exhumés',
    categorie: 'religieuse',
    periodeTags: ['Avant 1800', 'XIXe'],
    resume:
      "Petit édifice ou galerie attenant à un ancien cimetière paroissial, destiné à recueillir les ossements exhumés faute de place lors du renouvellement des tombes. Typologie particulièrement répandue au sein des enclos paroissiaux bretons, mais aussi présente sous forme de catacombes urbaines constituées au tournant du XIXe siècle.",
    identite: [
      ['Période', 'XVIe–XIXe siècle'],
      ['Région', 'Toutes régions, notamment enclos paroissiaux bretons'],
      ['Usage', 'Conservation collective des ossements exhumés'],
      ['Système', 'Galerie ou édicule attenant au cimetière'],
      ['Matériau dominant', 'Granite ou pierre locale'],
      ['Plan', 'Galerie ouverte à claire-voie ou petit édicule fermé'],
      ['Particularité', 'Inscriptions et memento mori gravés en façade'],
    ],
    materiaux: ['Granite', 'Pierre locale', 'Bois (charpente)', 'Fer forgé (grilles)', 'Chaux (enduits)', 'Ardoise (toiture)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Petite toiture à deux pans en ardoise ou chaume selon la région, protégeant la galerie des intempéries.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Galerie ouverte à claire-voie en pierre ou petit édicule fermé, souvent gravé d’inscriptions memento mori.' },
      { n: 3, el: 'Planchers', txt: 'Sol de terre battue ou dallage sommaire, ossements empilés ou rangés dans des coffres de pierre.' },
      { n: 4, el: 'Structure porteuse', txt: 'Murs bas en pierre locale, charpente légère supportant la couverture de la galerie ouverte.' },
      { n: 5, el: 'Escalier', txt: 'Généralement de plain-pied, sans étage ni escalier.' },
      { n: 6, el: 'Fondations', txt: 'Fondations sommaires en pierre, édifice attenant directement au mur du cimetière paroissial.' },
    ],
    sections: [
      {
        title: 'Faute de place au cimetière',
        icon: 'ph ph-stack',
        intro: "Dans les cimetières paroissiaux de taille réduite, les tombes anciennes étaient régulièrement réouvertes, et les ossements exhumés rassemblés dans l’ossuaire commun.",
        groups: [
          G(null, ['Renouvellement périodique des concessions les plus anciennes', 'Ossements rassemblés sans distinction individuelle', 'Pratique attestée depuis le Moyen Âge']),
        ],
      },
      {
        title: 'Les enclos paroissiaux bretons',
        icon: 'ph ph-buildings',
        groups: [
          G(null, ['Ossuaire associé à l’église, au calvaire et au cimetière', 'Souvent la construction la plus richement sculptée de l’enclos', 'Témoin de la ferveur religieuse bretonne des XVIe-XVIIe siècles']),
        ],
      },
      {
        title: 'Un memento mori collectif',
        icon: 'ph ph-hand-heart',
        groups: [
          G(null, ['Inscriptions rappelant la fragilité de la vie humaine', 'Crânes et tibias sculptés en ornement', 'Fonction pédagogique et spirituelle pour les vivants']),
        ],
      },
    ],
  },

  {
    id: 'monumentauxmorts',
    name: 'Monument aux morts',
    region: 'Toutes régions · place publique de chaque commune',
    periode: '1918–1925',
    procede: 'Pierre ou granite, socle et statuaire',
    usage: 'Mémorial civique dédié aux soldats morts pour la France',
    categorie: 'publique',
    periodeTags: ['XXe'],
    resume:
      "Mémorial édifié dans la quasi-totalité des communes françaises au lendemain de la Première Guerre mondiale, pour honorer la mémoire des soldats morts pour la France. Érigé sur la place publique, souvent face à la mairie, il associe socle de pierre, liste nominative des morts et parfois statuaire allégorique.",
    identite: [
      ['Période', '1918–1925, immédiat après-guerre'],
      ['Région', 'Toutes régions, place publique de chaque commune'],
      ['Usage', 'Mémorial civique dédié aux soldats morts pour la France'],
      ['Système', 'Socle maçonné, statuaire rapportée'],
      ['Matériau dominant', 'Pierre ou granite, bronze pour la statuaire'],
      ['Plan', 'Socle isolé au centre d’une place ou d’un carrefour'],
      ['Particularité', 'Liste nominative gravée des enfants de la commune morts au combat'],
    ],
    materiaux: ['Granite', 'Pierre de taille', 'Bronze (statuaire)', 'Fer forgé (grille d’enclos)', 'Marbre (plaques)', 'Ciment (monuments les plus modestes)'],
    annotations: [
      { n: 1, el: 'Toiture', txt: 'Absence de toiture : monument à ciel ouvert, parfois coiffé d’une urne ou d’une flamme sculptée.' },
      { n: 2, el: 'Façade & murs extérieurs', txt: 'Socle à degrés en pierre ou granite, faces gravées de la liste nominative des enfants de la commune morts pour la France.' },
      { n: 3, el: 'Planchers', txt: 'Dallage ou gravillon au pied du monument, parfois entouré d’une grille basse délimitant un enclos du souvenir.' },
      { n: 4, el: 'Structure porteuse', txt: 'Socle maçonné massif supportant la statuaire — poilu, victoire ailée ou figure du deuil.' },
      { n: 5, el: 'Escalier', txt: 'Quelques marches basses menant au pied du monument pour le dépôt de gerbes.' },
      { n: 6, el: 'Fondations', txt: 'Fondations en béton ou maçonnerie, monument implanté au centre d’une place publique très visible.' },
    ],
    sections: [
      {
        title: 'Un mémorial dans chaque commune',
        icon: 'ph ph-building',
        intro: "Au lendemain de la Grande Guerre, la quasi-totalité des communes françaises érigent un monument dédié à leurs morts, financé par souscription publique.",
        groups: [
          G(null, ['Financement par souscription publique communale', 'Implantation systématique sur la place principale', 'Inauguration solennelle au début des années 1920']),
        ],
      },
      {
        title: 'Une iconographie codifiée',
        icon: 'ph ph-hand-heart',
        groups: [
          G(null, ['Le poilu victorieux, figure la plus répandue', 'Le poilu mourant ou la veuve éplorée, iconographie pacifiste', 'La victoire ailée, référence à l’Antiquité classique']),
        ],
      },
      {
        title: 'Un lieu de commémoration',
        icon: 'ph ph-tree',
        groups: [
          G(null, ['Cérémonie annuelle du 11 novembre', 'Dépôt de gerbes et lecture des noms des morts', 'Ajout ultérieur des victimes de la Seconde Guerre mondiale']),
        ],
      },
    ],
  },
]

export const TYPOLOGIES_MAP = Object.fromEntries(TYPOLOGIES.map((t) => [t.id, t]))
