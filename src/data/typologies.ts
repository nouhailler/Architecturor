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

export interface Typologie {
  id: string
  name: string
  region: string
  periode: string
  procede: string
  usage: string
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
]

export const TYPOLOGIES_MAP = Object.fromEntries(TYPOLOGIES.map((t) => [t.id, t]))
