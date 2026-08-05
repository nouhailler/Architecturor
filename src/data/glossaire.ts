import { MATERIAUX_INFO } from './materiaux'

export interface GlossaryTerm {
  term: string
  definition: string
}

export interface GlossaryCategory {
  id: string
  label: string
  description: string
  terms: GlossaryTerm[]
}

const CATEGORIES_ARCHITECTURALES: GlossaryTerm[] = [
  { term: 'Habitat rural', definition: "Constructions liées à la vie et au travail à la campagne : fermes, maisons paysannes, granges attenantes au logis. Leur forme varie fortement d'une région à l'autre selon le climat et les matériaux disponibles localement." },
  { term: 'Habitat urbain', definition: "Constructions destinées au logement en ville, de l'immeuble de rapport du XIXe siècle aux grands ensembles du XXe : la densité et la mitoyenneté y priment sur l'implantation isolée de l'habitat rural." },
  { term: 'Architecture religieuse', definition: "Édifices liés au culte et à la vie monastique : églises, abbayes, temples, synagogues, mosquées. Leur plan et leur décor suivent des codes propres à chaque confession et à chaque époque." },
  { term: 'Architecture militaire', definition: "Constructions de défense ou de garnison : châteaux forts, citadelles, forts côtiers, casernes. Leur forme répond avant tout à des impératifs tactiques (tir, observation, résistance au siège)." },
  { term: 'Architecture industrielle', definition: "Bâtiments liés à la production : usines, manufactures, mines, hauts-fourneaux. Leur volume et leur structure, souvent métallique, sont dictés par le process industriel qu'ils abritent." },
  { term: 'Architecture des transports', definition: "Constructions liées au déplacement des personnes et des marchandises : gares, dépôts, passages à niveau. Le XIXe siècle ferroviaire y a laissé une empreinte particulièrement forte." },
  { term: 'Architecture agricole', definition: "Bâtiments d'exploitation annexes au logis : granges, étables, silos, serres. Contrairement à l'habitat rural, ils sont dimensionnés pour l'activité agricole plutôt que pour l'habitation." },
  { term: 'Architecture publique', definition: "Édifices portés par la puissance publique au service des habitants : mairies, écoles, hôpitaux, théâtres. Leur multiplication accompagne la construction de l'État républicain à partir du XIXe siècle." },
  { term: 'Architecture littorale', definition: "Constructions propres au rapport à la mer : phares, cabanes de pêcheurs, villas balnéaires. Elles combinent souvent une fonction technique (signalisation, pêche) et une fonction de villégiature." },
  { term: 'Architecture de montagne', definition: "Constructions adaptées à l'altitude et à l'estivage du bétail : chalets d'alpage, granges foraines, refuges. La forte pente de toit et l'usage du bois y répondent aux contraintes du climat montagnard." },
  { term: 'Vernaculaire', definition: "Se dit d'une architecture issue du savoir-faire local plutôt que d'un projet d'architecte : elle emploie les matériaux et les techniques disponibles sur place, transmis de génération en génération." },
]

const STRUCTURE: GlossaryTerm[] = [
  { term: 'Mur porteur', definition: "Mur qui supporte le poids de la construction (planchers, toiture) en plus de son propre poids, par opposition à une cloison qui ne fait que séparer des espaces." },
  { term: 'Ossature bois', definition: "Structure porteuse constituée d'une charpente de bois (poteaux, sablières, entretoises) plutôt que de murs maçonnés pleins — le colombage en est la version apparente traditionnelle." },
  { term: 'Colombage (pan de bois)', definition: "Ossature de bois apparente en façade, dont les intervalles (les « pans ») sont remplis de torchis, de brique ou de plâtre. Caractéristique de la Normandie, de l'Alsace et de nombreuses villes médiévales." },
  { term: 'Torchis', definition: "Mélange de terre, d'eau et de fibres végétales appliqué sur un lattis de bois pour remplir les pans de bois d'un colombage — isolant, économique et entièrement recyclable." },
  { term: 'Encorbellement', definition: "Surplomb d'un étage sur la rue, porté par l'avancée des poutres du plancher au-delà du mur du dessous — technique fréquente dans les maisons à pans de bois pour gagner de la surface sans agrandir l'emprise au sol." },
  { term: 'Sablière', definition: "Pièce de bois horizontale posée au sommet d'un mur ou d'un pan de bois, qui reçoit les poteaux ou les fermes de charpente." },
  { term: 'Décharge (charpente)', definition: "Pièce de bois oblique d'un colombage qui reporte une partie du poids d'un poteau ou d'une sablière vers un point d'appui plus stable — visible dans les croix de Saint-André." },
  { term: 'Chaînage', definition: "Renfort horizontal ou vertical (pierre de taille, béton armé) intégré à une maçonnerie pour en solidariser les angles et éviter qu'elle ne se disloque." },
  { term: 'Contrefort', definition: "Massif de maçonnerie construit contre un mur pour en reprendre la poussée, notamment celle d'une voûte — élément caractéristique de l'architecture gothique." },
  { term: 'Voûte', definition: "Couvrement courbe en maçonnerie qui reporte son poids latéralement sur des piliers ou des murs, permettant de couvrir un espace sans charpente bois." },
  { term: 'Arc', definition: "Élément de maçonnerie courbe qui franchit une ouverture (porte, fenêtre, baie) en reportant les charges vers ses points d'appui plutôt que de peser directement sur le vide." },
  { term: 'Linteau', definition: "Pièce horizontale (bois, pierre, métal) posée au-dessus d'une ouverture pour porter la maçonnerie ou la charpente au-dessus du vide." },
  { term: 'Corbeau (architecture)', definition: "Pierre ou pièce de bois en saillie sur un mur, destinée à porter un élément en surplomb (poutre, balcon, encorbellement)." },
  { term: 'Appareillage', definition: "Manière d'assembler et de tailler les pierres d'une maçonnerie (en assises régulières, en épi, en arête de poisson…) — un indice souvent utile pour dater une construction." },
  { term: 'Bossage', definition: "Pierre de taille dont la face extérieure reste volontairement brute ou saillante, pour un effet décoratif de puissance — fréquent aux soubassements des hôtels particuliers et des bâtiments publics." },
]

const TOITURE: GlossaryTerm[] = [
  { term: 'Pente de toit', definition: "Inclinaison du versant de toiture. Elle dépend surtout du matériau de couverture — une tuile canal tolère une pente faible, l'ardoise ou le chaume exigent une pente forte pour bien évacuer l'eau — et du climat local (neige, pluie)." },
  { term: 'Brisis et terrasson (toit à la Mansart)', definition: "Toit à deux pentes par versant : le brisis, en bas, très incliné ; le terrasson, en haut, plus plat. Cette forme, dite « à la Mansart », permet d'aménager un étage de combles habitable." },
  { term: 'Faîtage', definition: "Ligne horizontale la plus haute d'une toiture, à la jonction de deux versants — souvent couverte d'une pièce spécifique (faîtière) pour assurer l'étanchéité." },
  { term: 'Rive de toit', definition: "Bord latéral d'un versant de toiture, à l'opposé du faîtage, qui nécessite un traitement spécifique pour éviter les infiltrations d'eau sur le pignon." },
  { term: 'Noue', definition: "Ligne creuse formée par la rencontre de deux versants de toiture — point sensible qui concentre l'écoulement des eaux de pluie." },
  { term: 'Arêtier', definition: "Ligne saillante formée par la rencontre de deux versants de toiture, l'inverse de la noue — typique des croupes et des toits en pavillon." },
  { term: 'Génoise', definition: "Corniche formée de plusieurs rangs de tuiles creuses en saillie, caractéristique des toitures du Midi méditerranéen, qui protège le haut du mur du ruissellement." },
  { term: 'Lucarne', definition: "Ouverture verticale en saillie sur un versant de toiture, qui éclaire et permet d'accéder aux combles — sa forme (à capucine, à la Bagnolet, à croupe…) est souvent un marqueur régional ou stylistique." },
  { term: 'Égout du toit', definition: "Bord bas d'un versant de toiture, par où l'eau de pluie s'écoule — c'est là que se fixent gouttières et corniches." },
  { term: 'Essentage', definition: "Habillage d'une façade ou d'un pignon par de petits éléments de bois, d'ardoise ou de tuile posés en écailles, à la manière d'une couverture — protège le mur des intempéries en montagne notamment." },
  { term: 'Comble', definition: "Volume intérieur compris entre le dernier plancher et la toiture — aménageable en pièces habitables ou simplement utilisé comme espace de stockage selon la pente et la charpente." },
]

const INTERIEUR: GlossaryTerm[] = [
  { term: 'Solivage', definition: "Ensemble des solives — poutres secondaires en bois posées parallèlement — qui soutient un plancher entre deux murs ou deux poutres maîtresses." },
  { term: 'Plancher', definition: "Structure horizontale qui sépare deux niveaux d'un bâtiment, portée par le solivage et recouverte d'un revêtement de sol (parquet, tomettes…)." },
  { term: 'Escalier en vis (ou à vis)', definition: "Escalier tournant construit autour d'un noyau central, souvent en pierre, qui occupe peu d'emprise au sol — fréquent dans les tours d'angle des maisons de ville anciennes et des châteaux." },
  { term: 'Garde-corps', definition: "Barrière (pleine, ajourée, en fer forgé…) qui protège le bord d'un vide : escalier, balcon, mezzanine." },
  { term: 'Plafond à la française', definition: "Plafond dont les solives et les poutres de la structure du plancher supérieur restent apparentes et souvent décorées, plutôt que dissimulées par un enduit." },
  { term: 'Cloison', definition: "Mur intérieur léger qui sépare des pièces sans porter de charge, par opposition à un mur porteur." },
]

const FONDATIONS: GlossaryTerm[] = [
  { term: 'Semelle (fondation)', definition: "Base élargie d'une fondation, en pierre ou en béton, qui répartit le poids du mur sur une plus grande surface de sol pour éviter qu'il ne s'enfonce." },
  { term: 'Soubassement', definition: "Partie basse d'une construction, entre les fondations et le rez-de-chaussée, souvent traitée en pierre ou en moellons pour protéger le mur de l'humidité du sol." },
  { term: 'Pieux', definition: "Éléments verticaux (bois, béton, métal) enfoncés profondément dans le sol pour reporter les charges d'un bâtiment vers une couche porteuse, quand le terrain de surface est instable ou humide." },
  { term: 'Radier', definition: "Fondation en forme de dalle continue qui répartit le poids d'un bâtiment sur toute son emprise au sol, utilisée quand le sol est de mauvaise qualité ou pour les grands volumes industriels." },
  { term: 'Vide sanitaire', definition: "Espace vide ménagé entre le sol naturel et le premier plancher, qui protège la construction de l'humidité et permet le passage de réseaux techniques." },
  { term: 'Pilotis', definition: "Poteaux qui surélèvent une construction au-dessus du sol ou de l'eau — utilisés en zone inondable ou littorale, et devenus un principe esthétique du mouvement moderne au XXe siècle." },
]

const MILITAIRE: GlossaryTerm[] = [
  { term: 'Donjon', definition: "Tour maîtresse d'un château fort, la plus haute et la plus fortifiée, qui sert de dernier refuge en cas de siège et souvent de résidence seigneuriale." },
  { term: 'Courtine', definition: "Pan de muraille qui relie deux tours ou deux bastions d'une enceinte fortifiée." },
  { term: 'Bastion', definition: "Ouvrage de fortification en saillie sur l'enceinte, de forme pentagonale, qui permet de battre les abords du mur par des tirs croisés — principe généralisé par Vauban." },
  { term: 'Glacis', definition: "Talus en pente douce aménagé devant une fortification pour exposer un assaillant au tir des défenseurs sans lui offrir de couvert." },
  { term: 'Meurtrière', definition: "Ouverture étroite percée dans un mur défensif pour permettre de tirer tout en exposant le moins possible le défenseur." },
  { term: 'Mâchicoulis', definition: "Ouverture ménagée dans le plancher d'un parapet ou d'une bretèche, en surplomb du mur, pour jeter des projectiles sur des assaillants massés au pied de la fortification." },
  { term: 'Échauguette', definition: "Petite guérite de guet en surplomb d'un angle de mur ou de tour, qui permet une surveillance rapprochée sans exposer le guetteur." },
  { term: 'Poterne', definition: "Porte secondaire et discrète percée dans une fortification, utilisée pour les sorties surprises ou le passage en temps de siège." },
  { term: 'Casemate', definition: "Local voûté et protégé, aménagé dans l'épaisseur d'une fortification, qui abrite une pièce d'artillerie ou une garnison à l'abri des tirs." },
  { term: 'Créneau', definition: "Ouverture rectangulaire alternée avec des parties pleines (merlons) au sommet d'un parapet fortifié, qui permet de tirer tout en se protégeant." },
  { term: 'Douve', definition: "Fossé, sec ou en eau, qui entoure une fortification pour empêcher l'approche directe des assaillants et de leurs engins de siège." },
]

const RELIGIEUSE: GlossaryTerm[] = [
  { term: 'Nef', definition: "Partie centrale d'une église, entre le portail et le chœur, où se tiennent les fidèles — souvent flanquée de bas-côtés séparés par des piliers." },
  { term: 'Abside', definition: "Extrémité arrondie ou polygonale d'une église, à l'est du chœur, qui clôt l'édifice derrière l'autel." },
  { term: 'Chevet', definition: "Extrémité extérieure d'une église du côté de l'abside — la partie la plus richement travaillée dans l'architecture gothique, avec ses arcs-boutants et ses chapelles rayonnantes." },
  { term: 'Transept', definition: "Nef transversale qui coupe la nef principale d'une église à angle droit, donnant au plan la forme d'une croix." },
  { term: 'Travée', definition: "Portion d'un édifice comprise entre deux points d'appui successifs (piliers, colonnes) — l'unité de répétition qui structure la longueur d'une nef." },
  { term: 'Clocher', definition: "Tour qui abrite les cloches d'une église, souvent le repère visuel le plus marquant d'un village." },
  { term: 'Chapiteau', definition: "Élément élargi qui coiffe une colonne ou un pilier, souvent sculpté, et sert de transition entre le support vertical et ce qu'il porte (arc, voûte, poutre)." },
  { term: 'Chœur', definition: "Partie de l'église réservée au clergé, entre la nef et l'abside, où se déroule la liturgie autour de l'autel." },
  { term: 'Narthex', definition: "Vestibule à l'entrée d'une église, entre le portail et la nef, traditionnellement réservé à ceux qui n'étaient pas encore admis à l'intérieur." },
]

const STYLES: GlossaryTerm[] = [
  { term: 'Art roman', definition: "Style architectural du XIe et du XIIe siècle, caractérisé par des murs épais, des ouvertures étroites, des voûtes en berceau ou d'arêtes et des arcs en plein cintre — antérieur à l'essor du gothique." },
  { term: 'Art gothique', definition: "Style architectural apparu au XIIe siècle en Île-de-France, caractérisé par l'arc brisé, la voûte sur croisée d'ogives et les arcs-boutants, qui permettent de percer de grandes baies et d'élever les édifices." },
  { term: 'Classicisme', definition: "Style architectural des XVIIe et XVIIIe siècles (Ancien Régime), inspiré de l'Antiquité gréco-romaine, qui privilégie la symétrie, les ordres architecturaux et la sobriété du décor." },
  { term: 'Second Empire', definition: "Période (1852-1870) associée à la transformation haussmannienne de Paris et à un style urbain codifié : pierre de taille, toits mansardés en zinc, balcons filants." },
  { term: 'Art nouveau', definition: "Mouvement décoratif de la fin du XIXe et du début du XXe siècle, caractérisé par les lignes courbes inspirées du végétal, la ferronnerie ouvragée et le rejet de la symétrie stricte." },
  { term: 'Art déco', definition: "Style des années 1920-1930, marqué par la géométrisation des formes, les motifs en gradins et une ornementation plus stylisée que l'Art nouveau." },
  { term: 'Éclectisme', definition: "Attitude architecturale du XIXe siècle qui combine librement des références à plusieurs styles historiques (roman, gothique, classique…) sur un même édifice." },
  { term: 'Mouvement moderne', definition: "Courant architectural du XXe siècle qui rejette l'ornementation historique au profit de la fonction, du béton armé et des formes épurées — annonciateur des grands ensembles et du logement social d'après-guerre." },
  { term: 'Haute qualité environnementale (HQE)', definition: "Démarche et label français qui encadrent la conception des bâtiments pour limiter leur impact environnemental (énergie, eau, matériaux, confort), généralisée dans la construction depuis les années 2000." },
  { term: 'Bâtiment basse consommation (BBC)', definition: "Label désignant un bâtiment dont la consommation d'énergie pour le chauffage, l'eau chaude et la ventilation est très inférieure à la moyenne — référence avant la généralisation des réglementations thermiques RT2012 puis RE2020." },
  { term: 'Maison passive', definition: "Construction dont l'isolation et l'étanchéité à l'air sont si performantes qu'elle se passe presque entièrement de système de chauffage actif, se contentant des apports solaires et internes." },
]

const DONNEES_TERRAIN: GlossaryTerm[] = [
  { term: 'Coordonnées GPS moyennes', definition: "Position géographique approximative du cœur de la zone où la typologie est représentative — une moyenne indicative, pas l'emplacement d'un exemplaire précis, puisque chaque typologie regroupe de nombreux bâtiments dispersés sur un territoire." },
  { term: 'Altitude habituelle', definition: "Fourchette d'altitude à laquelle la typologie se rencontre le plus couramment — un facteur qui explique souvent le choix des matériaux et la pente de toiture (neige, vent)." },
  { term: 'Climat (données de terrain)', definition: "Grand type climatique de la zone de diffusion de la typologie (océanique, montagnard, méditerranéen…), qui conditionne fortement les choix constructifs traditionnels : inertie des murs, pente des toits, orientation." },
  { term: 'Époque dominante', definition: "Période durant laquelle la typologie a été le plus couramment construite — à ne pas confondre avec la « Période », qui peut couvrir une plage plus large incluant des exemples plus rares en marge." },
  { term: "Difficulté d'identification", definition: "Estimation de la facilité avec laquelle un non-spécialiste peut reconnaître la typologie sur le terrain, à partir de ses caractéristiques les plus visibles." },
  { term: 'Essence de bois', definition: "Espèce d'arbre (chêne, châtaignier, épicéa…) traditionnellement utilisée pour la charpente ou l'ossature de la typologie, choisie selon les forêts disponibles localement et les qualités mécaniques recherchées." },
  { term: 'Type de charpente', definition: "Principe d'assemblage des pièces de bois qui soutiennent la toiture (fermes, pannes, chevrons…) — il varie selon la portée à couvrir, la pente du toit et les traditions régionales." },
  { term: 'Type de fondation', definition: "Manière dont la construction prend appui sur le sol (semelles maçonnées, pieux, ancrage direct sur le rocher…), déterminée par la nature du terrain et le poids du bâtiment." },
]

const materiauxTerms: GlossaryTerm[] = Object.entries(MATERIAUX_INFO)
  .map(([term, definition]) => ({ term, definition }))
  .sort((a, b) => a.term.localeCompare(b.term, 'fr'))

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    id: 'categories',
    label: 'Catégories & usages du bâti',
    description: "Les dix grandes familles utilisées pour classer les typologies de l'inventaire.",
    terms: CATEGORIES_ARCHITECTURALES,
  },
  {
    id: 'structure',
    label: 'Structure porteuse & ossature',
    description: "Les principes constructifs qui font tenir un bâtiment debout.",
    terms: STRUCTURE,
  },
  {
    id: 'toiture',
    label: 'Toiture & couverture',
    description: "Le vocabulaire de la charpente et de la couverture — les matériaux de toiture eux-mêmes (tuile, ardoise, chaume…) figurent dans la catégorie Matériaux.",
    terms: TOITURE,
  },
  {
    id: 'interieur',
    label: 'Planchers, escaliers & aménagements intérieurs',
    description: "Ce qui structure l'intérieur d'un bâtiment entre les murs et sous la toiture.",
    terms: INTERIEUR,
  },
  {
    id: 'fondations',
    label: 'Fondations & assise',
    description: "Comment une construction prend appui sur le sol.",
    terms: FONDATIONS,
  },
  {
    id: 'militaire',
    label: 'Architecture militaire & fortifications',
    description: "Vocabulaire spécifique aux châteaux forts, citadelles et ouvrages défensifs.",
    terms: MILITAIRE,
  },
  {
    id: 'religieuse',
    label: 'Architecture religieuse',
    description: "Vocabulaire spécifique aux églises, abbayes et édifices de culte.",
    terms: RELIGIEUSE,
  },
  {
    id: 'styles',
    label: 'Styles & époques',
    description: "Les courants stylistiques et labels qui reviennent dans les champs « Période » et « Époque dominante ».",
    terms: STYLES,
  },
  {
    id: 'terrain',
    label: 'Données de terrain & méthode',
    description: "Ce que signifient les champs de la carte « Données techniques & de terrain » de chaque fiche.",
    terms: DONNEES_TERRAIN,
  },
  {
    id: 'materiaux',
    label: 'Matériaux de construction',
    description: "Les matériaux caractéristiques rencontrés dans les fiches, du plus ancien (pierre sèche, torchis) au plus contemporain (béton bas carbone, panneaux photovoltaïques).",
    terms: materiauxTerms,
  },
]

export const GLOSSARY_TERM_COUNT = GLOSSARY_CATEGORIES.reduce((sum, c) => sum + c.terms.length, 0)
