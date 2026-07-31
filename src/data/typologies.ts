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

  {
    id: 'longere',
    name: 'Longère bretonne',
    region: "Bretagne · Côtes-d'Armor",
    periode: '1700–1900',
    procede: 'Granite',
    usage: 'Habitat rural',
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
]

export const TYPOLOGIES_MAP = Object.fromEntries(TYPOLOGIES.map((t) => [t.id, t]))
