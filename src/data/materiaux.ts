// Glossaire des matériaux affichés dans « Matériaux caractéristiques ».
// Les tags de la fiche sont souvent de la forme "Base (précision)" — la
// précision entre parenthèses est l'usage propre à la typologie ; la
// description ci-dessous porte sur le matériau lui-même.

export const MATERIAUX_INFO: Record<string, string> = {
  // Bois
  'Bois massif': 'Bois plein (non lamellé), utilisé tel quel pour la charpente ou l’ossature. Résiste bien à la compression et à la flexion selon le sens du fil.',
  'Bois précieux': 'Essences rares ou importées (acajou, palissandre…) réservées aux boiseries d’apparat, mobilier ou lambris de qualité.',
  'Bois exotique': 'Essence importée, souvent choisie pour sa durabilité naturelle en extérieur (menuiseries, terrasses) sans traitement chimique.',
  'Bois peint': 'Bois protégé et décoré par une couche de peinture, courant sur les huisseries, volets et éléments extérieurs exposés.',
  'Bois de chauffe': 'Bois débité en bûches, stocké comme combustible plutôt que comme matériau de construction (bûchers, remises).',
  Bois: 'Matériau de structure et de finition le plus universel de l’architecture traditionnelle française : charpentes, planchers, huisseries, bardages. Sa disponibilité locale a longtemps déterminé l’essence utilisée région par région.',
  Chêne: 'Bois dur, dense et durable, l’essence de référence pour les charpentes, colombages et pièces de force en France depuis le Moyen Âge. Bonne résistance à l’humidité et aux insectes une fois sec.',
  Châtaignier: 'Bois riche en tannins, naturellement résistant aux insectes et à la pourriture sans traitement — très employé en charpente et en piquets dans le Sud-Ouest et les Cévennes.',
  Épicéa: 'Conifère à bois clair et léger, courant en charpente et en bardage dans les massifs alpins où il pousse en abondance.',
  Mélèze: 'Conifère alpin dont le bois, riche en résine, grise et se densifie avec le temps en extérieur — très utilisé pour les bardages et balcons de chalets.',
  Sapin: 'Conifère à bois blanc et tendre, employé en charpente et en menuiserie dans les régions de montagne et de moyenne altitude.',
  Noyer: 'Bois dense à grain fin, plutôt réservé au mobilier et aux boiseries fines qu’à la structure, en raison de son coût.',
  'Pin maritime': 'Conifère des Landes et du littoral atlantique, exploité en charpente, en poteaux et historiquement pour la résine (gemmage).',

  // Pierre et matériaux minéraux
  Pierre: 'Matériau minéral massif, taillé ou brut, utilisé pour les murs porteurs et les fondations. Sa nature (calcaire, granite, grès…) dépend directement de la géologie locale.',
  'Pierre de taille': 'Pierre extraite en blocs réguliers puis taillée avec précision pour un parement à joints fins. Matériau noble réservé aux façades représentatives (immeubles haussmanniens, hôtels particuliers, monuments).',
  'Pierre locale': 'Pierre extraite à proximité immédiate du chantier, sans transport ni taille poussée — principe de base de l’architecture rurale traditionnelle avant la généralisation du chemin de fer.',
  'Pierre calcaire': 'Roche sédimentaire tendre à travailler mais sensible à l’érosion et au gel ; très répandue dans le Bassin parisien, la vallée de la Loire et le Sud-Ouest.',
  'Pierre sèche': 'Technique de maçonnerie sans mortier : les pierres sont assemblées par simple encorbellement et leur propre poids (bories, capitelles, murets).',
  'Pierre volcanique': 'Roche d’origine éruptive (basalte, trachyte…), sombre et dense, caractéristique des régions volcaniques comme l’Auvergne.',
  'Pierre ou brique': 'Alternance ou combinaison des deux matériaux selon les ressources locales et l’époque de construction.',
  'Pierre ou moellons': 'Pierre de taille en parement noble, moellons (pierre brute ou peu dégrossie) pour le gros œuvre — combinaison économique classique.',
  'Pierre reconstituée': 'Béton moulé imitant l’aspect de la pierre naturelle, utilisé notamment pour les monuments commémoratifs du XXe siècle à moindre coût.',
  'Pierre plate': 'Dalle de pierre plate utilisée en fondation ou en appui, notamment sur pilotis dans l’habitat lacustre ou humide.',
  Moellons: 'Pierre brute ou grossièrement dégrossie, montée au mortier — matériau courant des murs porteurs ruraux, souvent enduit pour être protégé des intempéries.',
  'Moellons calcaire': 'Moellons de pierre calcaire, matériau de gros œuvre le plus répandu dans une grande partie du territoire français.',
  'Moellon enduit': 'Moellons recouverts d’un enduit protecteur qui masque l’irrégularité de l’appareillage tout en assurant l’étanchéité du mur.',
  Parpaing: 'Bloc de béton manufacturé, matériau de construction courant depuis le milieu du XXe siècle pour sa rapidité de mise en œuvre et son coût maîtrisé.',
  'Parpaing enduit': 'Parpaing recouvert d’un enduit de finition qui en masque la texture industrielle et améliore l’étanchéité du mur.',
  'Meules de pierre': 'Pierre dure taillée en disque, pièce mécanique centrale des moulins (à grain, à huile) plutôt que matériau de mur.',
  Galets: 'Pierre roulée de rivière ou de plage, utilisée en parement ou en remplissage là où la pierre de taille est absente localement.',
  Granit: 'Roche magmatique très dure et durable, caractéristique de la Bretagne, du Massif central et du Limousin — murs, encadrements et monuments.',
  Granite: 'Roche magmatique très dure et durable, caractéristique de la Bretagne, du Massif central et du Limousin — murs, encadrements et monuments.',
  Calcaire: 'Roche sédimentaire tendre, facile à tailler mais vulnérable au ruissellement et au gel — très répandue dans le Bassin parisien et le Sud-Ouest.',
  Grès: 'Roche sédimentaire dure composée de grains de sable cimentés, employée pour les seuils, encadrements et pavages qui doivent résister à l’usure.',
  'Grès flammé': 'Grès cuit à haute température donnant des reflets colorés irréguliers, prisé en céramique architecturale décorative (façades, ornements).',
  Basalte: 'Roche volcanique noire et très dure, typique des régions d’Auvergne et de la Chaîne des Puys, utilisée en maçonnerie et en pavage.',
  Schiste: 'Roche métamorphique se débitant en plaques fines, utilisée aussi bien en couverture (ardoise) qu’en moellon selon sa qualité.',
  Tuffeau: 'Calcaire tendre et blanc du Val de Loire, facile à sculpter à l’extraction puis durcissant à l’air — pierre emblématique des châteaux et maisons de Touraine.',
  Arkose: 'Grès riche en feldspath, dur et résistant, utilisé localement comme pierre de construction dans certains massifs.',
  Marbre: 'Calcaire métamorphisé poli, matériau de prestige réservé aux décors intérieurs soignés (halls, escaliers, monuments funéraires).',
  'Marbre ou mosaïque': 'Revêtement de sol ou mural haut de gamme, en dalles de marbre ou en assemblage de mosaïque selon le budget et l’époque.',

  // Terre, torchis, enduits
  Terre: 'Matériau brut (adobe, pisé, torchis) utilisé cru ou séché au soleil, sans cuisson — l’une des plus anciennes techniques de construction.',
  'Terre battue': 'Sol compacté à même la terre, sans revêtement rapporté — solution la plus rudimentaire et la plus ancienne pour un plancher bas.',
  'Terre cuite': 'Argile façonnée puis cuite au four, donnant tuiles, briques ou carreaux selon la forme — matériau stable et durable dans le temps.',
  Argile: 'Matière première du torchis, de la brique et de la tuile ; utilisée crue (remplissage, sol) ou cuite selon la technique.',
  Colombage: 'Ossature de bois apparente dont les intervalles sont remplis de torchis, de brique ou de plâtre — technique caractéristique de la Normandie et de l’Alsace.',
  Torchis: 'Mélange de terre, d’eau et de fibres végétales appliqué sur un lattis de bois pour remplir les pans de bois — isolant, économique et entièrement recyclable.',
  'Enduit terre': 'Enduit à base d’argile crue appliqué en finition, technique traditionnelle et aujourd’hui redécouverte pour ses qualités écologiques.',
  Enduit: 'Couche de finition (chaux, plâtre, ciment…) qui protège la maçonnerie des intempéries et unifie l’aspect de la façade.',
  'Enduit lisse': 'Enduit taloché fin, sans relief, souvent peint dans des teintes claires — aspect caractéristique des façades méditerranéennes.',
  Chaux: 'Liant traditionnel obtenu par cuisson de calcaire, utilisé en mortier et en enduit avant la généralisation du ciment ; laisse respirer le mur, contrairement au ciment.',
  'Mortier de chaux': 'Mortier à la chaux utilisé pour lier la maçonnerie de pierre ou de moellons — plus souple et plus perméable à la vapeur d’eau que le mortier de ciment.',
  'Mortier hydraulique': 'Mortier à prise plus rapide et plus résistante à l’humidité que la chaux aérienne simple, utilisé pour les ouvrages exposés à l’eau.',
  Ciment: 'Liant industriel à prise rapide et haute résistance, généralisé au XXe siècle ; a largement remplacé la chaux dans la construction courante.',
  'Plâtre sculpté': 'Plâtre moulé ou sculpté en place pour les décors intérieurs (corniches, rosaces, ornements) — matériau tendre travaillé après séchage partiel.',

  // Métaux
  Fer: 'Métal ferreux utilisé en éléments de renfort, ferrures et structures avant la généralisation de l’acier au XIXe siècle ; plus cassant et moins résistant à la traction que l’acier moderne.',
  'Fer forgé': 'Fer travaillé au marteau à chaud, façonné en motifs décoratifs — balcons, grilles, garde-corps typiques de l’architecture urbaine du XIXe siècle.',
  'Fer forgé géométrique': 'Fer forgé aux motifs épurés et géométriques, caractéristique du style Art déco des années 1920-1930.',
  Fonte: 'Alliage de fer coulé en moule, rigide mais cassant aux chocs ; utilisée en colonnes, poteaux, garde-corps et éléments décoratifs préfabriqués dès le XIXe siècle.',
  Acier: 'Alliage de fer et de carbone, résistant à la traction, qui a permis les grandes portées métalliques (halles, gares, ponts) à partir du XIXe siècle et reste la référence de la construction industrielle moderne.',
  'Acier inoxydable': 'Acier allié au chrome, résistant à la corrosion — privilégié dans les équipements agroalimentaires, sanitaires ou exposés à l’humidité.',
  Inox: 'Acier allié au chrome, résistant à la corrosion — privilégié dans les équipements agroalimentaires, sanitaires ou exposés à l’humidité.',
  'Acier galvanisé': 'Acier recouvert d’une couche de zinc protectrice contre la corrosion, courant dans les structures agricoles et industrielles extérieures.',
  'Acier corten': 'Acier auto-patinable qui développe une couche d’oxydation stable et esthétique sans entretien, utilisé en bardage ou en structure apparente.',
  'Acier tubulaire': 'Profilés d’acier creux, légers pour leur résistance, utilisés en charpente métallique et en mobilier urbain.',
  Métal: 'Terme générique désignant un élément métallique dont la nature précise (fer, acier, fonte…) n’est pas davantage spécifiée.',
  'Métal galvanisé': 'Métal recouvert de zinc pour résister à la corrosion en extérieur, notamment sur les structures légères.',
  Aluminium: 'Métal léger et inoxydable, généralisé dans les menuiseries et bardages depuis la seconde moitié du XXe siècle pour sa légèreté et son entretien réduit.',
  Zinc: 'Métal gris utilisé en fines feuilles pour couvrir les toits (notamment à Paris) et pour l’étanchéité des points singuliers de toiture — durable et malléable.',
  Plomb: 'Métal souple et très durable utilisé en couverture des tours et flèches, en étanchéité et en vitraux, avant que son usage ne soit restreint pour raisons sanitaires.',
  Cuivre: 'Métal qui se patine en vert-de-gris avec le temps, utilisé en couverture de dômes, en alambics et en éléments décoratifs ou techniques.',
  Bronze: 'Alliage de cuivre et d’étain, résistant à la corrosion, réservé aux cloches, statues et éléments commémoratifs de prestige.',
  Laiton: 'Alliage de cuivre et de zinc, doré et facile à travailler, utilisé pour les ferrures, enseignes et éléments décoratifs.',
  Or: 'Métal précieux utilisé en feuille (dorure) pour les décors d’exception — dômes, reliquaires, ornements de grands monuments.',

  // Couvertures
  Ardoise: 'Schiste fin fendu en plaques, matériau de couverture noble et durable typique du nord et de l’ouest de la France (Bretagne, Anjou, Ardennes).',
  'Ardoise ou tuile': 'Couverture en ardoise ou en tuile selon la région et l’époque — les deux matériaux traditionnels de toiture en France.',
  'Ardoise ou lauze': 'Couverture en ardoise fine ou en lauze plus épaisse selon la ressource locale disponible.',
  Tuile: 'Élément d’argile cuite façonné pour la couverture, décliné en de nombreuses formes régionales (plate, canal, mécanique) reflétant les traditions locales.',
  'Tuile canal': 'Tuile courbe posée en rangs alternés (canal/couvert), caractéristique des toits à faible pente du pourtour méditerranéen.',
  'Tuile plate': 'Petite tuile plane à emboîtement, posée à forte pente, typique du nord de la France, de la Bourgogne et de l’Île-de-France.',
  'Tuile mécanique': 'Tuile à emboîtement produite industriellement à partir du XIXe siècle, plus grande et plus rapide à poser que la tuile plate artisanale.',
  'Tuile creuse': 'Tuile de forme incurvée simple, ancêtre régional de la tuile canal.',
  'Tuile écaille': 'Petite tuile plate à pose imbriquée en écailles, utilisée en couverture comme en habillage de façades ou de tourelles.',
  'Tuile béton': 'Tuile moulée en béton teinté, alternative économique moderne à la tuile de terre cuite.',
  'Tuile ou ardoise': 'Couverture en tuile ou en ardoise selon la région et l’époque de construction.',
  'Tuile ou chaume': 'Couverture en tuile ou, plus anciennement, en chaume végétal selon les moyens et la ressource locale.',
  'Tuile ou lauze': 'Couverture en tuile ou en lauze de pierre selon la ressource locale disponible.',
  'Tuile ou fibrociment': 'Couverture en tuile traditionnelle ou en plaques de fibrociment, solution économique du XXe siècle.',
  'Tuile / Chaume': 'Couverture en tuile ou en chaume végétal selon les moyens et la ressource locale.',
  'Tuile mécanique ou ardoise': 'Couverture en tuile mécanique ou en ardoise selon la région.',
  'Tuile canal ou plate': 'Couverture en tuile canal ou en tuile plate selon la tradition régionale.',
  'Ardoise ou tuile mécanique': 'Couverture en ardoise ou en tuile mécanique selon la région et l’époque de construction.',
  Chaume: 'Végétal (roseau, paille) lié en bottes pour une couverture épaisse et isolante — matériau ancien, aujourd’hui rare et coûteux à entretenir.',
  Lauze: 'Plaque de pierre épaisse (calcaire ou schiste) utilisée en couverture dans les régions où l’ardoise fine n’était pas disponible localement.',
  'Lauze calcaire': 'Lauze taillée dans un calcaire dur, utilisée en couverture de toitures à forte pente dans le Quercy et le Périgord.',
  Tavaillon: 'Petite planchette de bois fendu (épicéa, mélèze) posée en écailles sur les toits et façades des chalets alpins.',
  'Tavaillon ou tuile': 'Couverture en tavaillon de bois ou en tuile selon l’altitude et l’époque.',
  Ancelle: 'Autre nom du tavaillon : planchette de bois fendu utilisée en couverture ou en bardage des chalets d’alpage.',
  Bardeau: 'Planchette de bois utilisée en couverture ou en bardage, équivalent nord-américain et alpin de la tuile.',
  'Tôle ondulée ou bardeaux': 'Couverture légère en tôle ondulée ou en bardeaux de bois selon les moyens.',

  // Verre, céramique, sols
  Verre: 'Matériau translucide utilisé en vitrage, verrière ou dôme — sa généralisation en grandes surfaces a transformé les halles, gares et serres du XIXe siècle.',
  'Verre armé': 'Verre renforcé d’un treillis métallique intérieur, utilisé pour les ouvertures nécessitant une résistance accrue (bâtiments carcéraux, industriels).',
  'Verre à isolation renforcée': 'Vitrage à couche à faible émissivité limitant les pertes de chaleur, standard de la construction énergétiquement performante.',
  Vitrail: 'Assemblage de verres colorés maintenus par des résilles de plomb, technique décorative et narrative propre à l’architecture religieuse depuis le Moyen Âge.',
  'Triple vitrage': 'Vitrage à trois parois de verre séparées par des lames de gaz isolant, standard des constructions basse consommation et passives.',
  'Triple vitrage à faible émissivité': 'Triple vitrage traité pour limiter encore davantage les pertes thermiques, typique des maisons passives.',
  'Vitrage double ou triple': 'Vitrage isolant à deux ou trois parois selon le niveau de performance recherché.',
  'Vitrage découpé dans les parois': 'Ouvertures vitrées intégrées directement dans l’enveloppe isolante du bâtiment, sans surcadre apparent.',
  Céramique: 'Terre cuite émaillée utilisée en revêtement décoratif ou hygiénique (frises, zelliges, carrelages muraux).',
  Mosaïque: 'Assemblage de petits éléments (pierre, verre, céramique) formant un décor ou un revêtement de sol, technique de prestige des espaces d’apparat.',
  Carrelage: 'Revêtement de sol ou mural en carreaux de céramique, apprécié pour son étanchéité et sa facilité d’entretien dans les espaces techniques ou sanitaires.',
  Tomette: 'Petit carreau de terre cuite hexagonal ou carré, revêtement de sol traditionnel du sud de la France.',
  Linoléum: 'Revêtement de sol souple à base d’huile de lin, généralisé au XXe siècle dans les espaces collectifs pour son entretien facile.',
  Placoplâtre: 'Plaque de plâtre entre deux feuilles de carton, matériau standard des cloisons légères depuis la seconde moitié du XXe siècle.',

  // Végétal, agricole, cordages
  Paille: 'Tige de céréale séchée, utilisée en litière animale, en remplissage isolant ou en couverture (chaume) selon l’usage.',
  'Paille ou foin': 'Matière végétale stockée pour l’alimentation ou la litière du bétail, sans valeur structurelle.',
  Foin: 'Herbe fauchée et séchée, stockée en fenil pour l’alimentation hivernale du bétail — donne son nom aux granges qui l’abritent.',
  Genêt: 'Plante à tige souple parfois utilisée en liage ou en couverture légère dans certaines constructions rurales traditionnelles.',
  Céréales: 'Grain stocké en silo ou en grenier — n’est pas un matériau de construction mais le contenu fonctionnel du bâtiment.',
  Algues: 'Végétal marin séché utilisé localement comme isolant ou comme litière dans certaines constructions littorales.',
  Corde: 'Cordage utilisé pour les filets et poches de stockage, notamment dans les équipements de pêche ou de manutention agricole.',
  'Filets et cordages': 'Équipement de pêche en fibres tressées, entreposé plutôt qu’intégré à la structure du bâtiment.',
  'Coque de bateau réformée': 'Ancienne coque de navire recyclée en abri, solution de récupération typique de certaines cabanes littorales.',
  Pilotis: 'Poteaux enfoncés dans le sol ou la vase pour surélever une construction au-dessus de l’eau ou d’un terrain instable.',

  // Combustibles et matières premières industrielles
  Charbon: 'Roche combustible extraite en mine, matière première de l’industrie sidérurgique et de nombreuses usines avant l’électrification.',
  'Charbon de bois': 'Combustible obtenu par carbonisation du bois, utilisé notamment dans les forges avant la généralisation du charbon minéral.',
  Coke: 'Combustible obtenu par distillation du charbon, utilisé dans les hauts-fourneaux pour atteindre les hautes températures nécessaires à la fusion du fer.',
  'Minerai de fer': 'Roche riche en fer extraite et traitée dans les hauts-fourneaux pour produire la fonte puis l’acier.',
  Bitume: 'Liant hydrocarboné utilisé pour l’étanchéité des sols et des parkings, ou comme revêtement de voirie.',
  Goudron: 'Liant hydrocarboné traditionnellement utilisé pour l’étanchéité des toitures et des ouvrages exposés à l’eau.',
  Glace: 'Eau gelée stockée avant l’ère de la réfrigération mécanique, notamment dans les glacières et certains bâtiments de conservation.',
  Chlore: 'Produit chimique utilisé pour le traitement de l’eau, notamment dans les bassins de piscines municipales.',

  // Décor, mobilier, textile
  Toile: 'Tissu tendu utilisé en couverture légère (auvents, parasols) ou en éléments mobiles (ailes de moulin).',
  'Toile peinte': 'Toile décorée peinte, utilisée en plafond ou en décor de scène dans les salles de spectacle.',
  Velours: 'Tissu à poil dense utilisé pour les sièges et tentures des salles de spectacle, apprécié pour son confort et son aspect cossu.',
  Formica: 'Stratifié plastique décoratif et résistant, très utilisé dans le mobilier standardisé des années 1950-1970.',
  Dorure: 'Feuille d’or ou peinture dorée appliquée en finition décorative sur les éléments d’apparat.',
  Stuc: 'Enduit imitant le marbre ou la pierre sculptée, poli en finition brillante pour les décors intérieurs prestigieux.',
  Parchemin: 'Peau animale traitée servant de support d’écriture, associée aux scriptoria monastiques plutôt qu’à la structure du bâtiment.',
  Pigments: 'Colorants naturels ou minéraux utilisés dans les enduits et badigeons de façade.',
  'Pigments naturels': 'Colorants d’origine minérale ou végétale utilisés dans les enduits traditionnels avant la généralisation des peintures industrielles.',
  Peinture: 'Revêtement de finition coloré et protecteur, appliqué sur bois, métal ou enduit selon des usages et des teintes qui varient avec les époques.',
  'Peinture anticorrosion': 'Peinture spécifique protégeant les structures métalliques exposées de la rouille.',
  'Peinture protectrice': 'Peinture appliquée avant tout pour protéger le support de l’humidité et des UV plutôt que pour un effet décoratif.',
  'Peinture rouge': 'Peinture de couleur rouge utilisée traditionnellement pour la signalétique ferroviaire ou industrielle.',
  'Peinture signalétique': 'Peinture appliquée spécifiquement pour marquer une fonction de signalisation ou de sécurité.',
  'Camouflage peint': 'Peinture appliquée en motifs pour dissimuler une structure militaire dans son environnement.',
  'Signalétique enseigne': 'Panneau ou lettrage destiné à identifier un commerce ou un établissement depuis la rue.',
  'Signalétique lumineuse': 'Enseigne éclairée destinée à rester visible et lisible de nuit.',
  Néon: 'Tube lumineux à gaz utilisé pour les enseignes commerciales, emblématique de l’architecture commerciale du XXe siècle.',
  Périscope: 'Dispositif optique permettant l’observation depuis un point protégé, typique des fortifications militaires.',
  Ascenseurs: 'Équipement mécanique de circulation verticale, généralisé dans les immeubles de grande hauteur et les bâtiments recevant du public.',
  'Systèmes de chauffage et brumisation': 'Équipements techniques de régulation climatique intégrés aux bâtiments agricoles modernes (serres, élevages).',
  Domotique: 'Systèmes électroniques de gestion automatisée du bâtiment (chauffage, éclairage, sécurité), courants dans le logement contemporain et les résidences services.',
  'Caoutchouc (manchons de traite)': 'Pièce souple en caoutchouc au contact direct de l’animal dans les équipements de traite mécanisée.',
  Caoutchouc: 'Matériau souple et étanche utilisé pour des équipements techniques spécifiques (joints, manchons, revêtements antidérapants).',

  // Isolation et matériaux contemporains / écoconstruction
  Isolant: 'Matériau à faible conductivité thermique placé dans l’enveloppe du bâtiment pour limiter les déperditions de chaleur.',
  'Isolant synthétique': 'Isolant d’origine pétrochimique (polystyrène, polyuréthane…), performant et économique mais moins écologique que les isolants biosourcés.',
  'Isolant biosourcé ou minéral': 'Isolant d’origine végétale (fibre de bois, chanvre, paille) ou minérale (laine de roche, verre), utilisé pour limiter l’impact environnemental de la construction.',
  'Isolant biosourcé ou minéral performant': 'Isolant biosourcé ou minéral de forte épaisseur et de haute performance, condition des labels basse consommation.',
  'Isolant biosourcé très épais': 'Épaisseur d’isolant biosourcé renforcée, caractéristique des constructions visant le standard passif.',
  'Isolant en caisson': 'Isolant intégré dans un caisson d’ossature bois préfabriqué, technique rapide à mettre en œuvre sur chantier.',
  'Isolant rapporté': 'Isolant ajouté en complément sur une paroi existante, par l’intérieur ou par l’extérieur, dans une logique de rénovation énergétique.',
  'Isolant thermique et phonique': 'Isolant assurant à la fois la performance thermique et l’atténuation acoustique, notamment dans le logement collectif.',
  'Matériaux biosourcés': 'Matériaux issus de ressources renouvelables (bois, paille, chanvre, terre) privilégiés pour réduire l’empreinte carbone de la construction.',
  'Matériaux recyclés ou recyclables': 'Matériaux de construction issus du réemploi ou conçus pour être recyclés en fin de vie, principe central de la construction contemporaine responsable.',
  'Béton bas carbone': 'Béton formulé avec des liants alternatifs pour réduire les émissions de CO2 liées à la production de ciment classique.',
  'Panneaux photovoltaïques': 'Panneaux convertissant la lumière du soleil en électricité, intégrés en toiture ou en façade des bâtiments performants ou agricoles.',
  'Panneaux solaires': 'Capteurs utilisant l’énergie solaire (production d’électricité ou d’eau chaude), équipement fréquent des constructions récentes et des bâtiments agricoles.',
  Végétalisation: 'Couverture végétale de toitures ou de façades, apportant isolation, gestion des eaux pluviales et biodiversité en milieu urbain.',
  'Membrane d’étanchéité': 'Film continu assurant l’étanchéité à l’eau ou à l’air de l’enveloppe du bâtiment.',
  'Membrane d’étanchéité à l’air': 'Membrane spécifiquement dédiée à l’étanchéité à l’air de l’enveloppe, condition clé de la performance des maisons passives.',
  'Membrane pare-pluie': 'Membrane perméable à la vapeur d’eau mais imperméable à la pluie, posée sous le bardage extérieur.',
  'Membrane synthétique': 'Membrane souple imperméable utilisée pour couvrir de grands volumes (dômes de stockage) à moindre coût structurel.',
  'Panneaux de façade': 'Éléments préfabriqués rapportés en parement extérieur pour l’isolation et l’esthétique de la façade.',
  'Panneaux de façade légers': 'Panneaux de façade préfabriqués à faible poids, facilitant une mise en œuvre rapide en construction contemporaine.',
  'Panneaux préfa': 'Éléments de façade ou de structure fabriqués en usine puis assemblés sur site, réduisant les délais de chantier.',
  'Panneaux isolants': 'Panneaux rigides à forte performance thermique intégrés dans les parois.',
  'Panneaux sandwich isolants': 'Panneaux composés de deux parements rigides enserrant un isolant, très utilisés en bâtiment agricole et industriel léger.',
  'Bardage bois ou composite': 'Habillage extérieur léger en lames de bois ou en matériau composite imitant le bois, peu entretien requis.',
  'Bardage bois ajouré ou filet brise-vent': 'Habillage extérieur ouvert laissant passer l’air tout en protégeant du vent, typique des bâtiments d’élevage ventilés naturellement.',
  'Bardage métallique': 'Habillage extérieur en tôle ou en panneaux métalliques, économique et durable, standard des bâtiments industriels et agricoles.',
  'Enrobés perméables': 'Revêtement de voirie laissant infiltrer l’eau de pluie, utilisé dans les aménagements soucieux de la gestion des eaux pluviales.',
  'Revêtements de sol résilients': 'Sols souples absorbant les chocs, utilisés dans les équipements sportifs ou d’accueil du public.',
  'Revêtements de sol antidérapants': 'Sols traités pour limiter le risque de glissade, notamment en milieu humide (bassins, sanitaires).',
  'Résine ou parquet': 'Sol sportif en résine synthétique ou en parquet bois selon la discipline et l’équipement.',
  Tôle: 'Fine feuille métallique utilisée en couverture ou en bardage économique, notamment sur les bâtiments industriels et agricoles.',
  'Tôle ondulée': 'Tôle profilée pour plus de rigidité, matériau de couverture économique très répandu sur les hangars et abris.',
  'Bac acier': 'Tôle d’acier profilée en grands éléments, standard de la couverture et du bardage industriel et agricole contemporain.',
  Polycarbonate: 'Plastique translucide rigide utilisé en couverture de serres ou en éclairage zénithal, plus léger et plus isolant que le verre.',
  Polyéthylène: 'Plastique souple utilisé en film (tunnels agricoles) ou en équipement résistant à l’humidité et aux produits d’élevage.',
  Plastique: 'Matériau de synthèse léger utilisé en équipement ou en revêtement technique selon les besoins spécifiques du bâtiment.',
}

const GLOSSARY_KEYS = Object.keys(MATERIAUX_INFO).sort((a, b) => b.length - a.length)

function findGlossaryKey(base: string): string | null {
  for (const key of GLOSSARY_KEYS) {
    if (base === key || base.startsWith(`${key} `) || base.startsWith(key)) return key
  }
  return null
}

export interface MaterialInfo {
  title: string
  detail: string | null
  description: string
  found: boolean
}

export function getMaterialInfo(tag: string): MaterialInfo {
  const detailMatch = tag.match(/\(([^)]+)\)\s*$/)
  const detail = detailMatch ? detailMatch[1] : null
  const base = tag.replace(/\s*\([^)]*\)\s*$/, '').trim()

  if (base.includes(' ou ')) {
    const parts = base.split(' ou ').map((p) => p.trim())
    const keys = parts.map(findGlossaryKey)
    if (keys.every((k): k is string => Boolean(k))) {
      const uniqueKeys = Array.from(new Set(keys))
      const description = uniqueKeys.map((k) => `${k} — ${MATERIAUX_INFO[k]}`).join(' ')
      return { title: base, detail, description, found: true }
    }
  }

  const key = findGlossaryKey(base)
  if (key) return { title: base, detail, description: MATERIAUX_INFO[key], found: true }

  return {
    title: base,
    detail,
    description: `Aucune notice détaillée n’est encore rédigée pour « ${base} ». Ce terme désigne un matériau ou un élément constructif caractéristique de cette typologie.`,
    found: false,
  }
}

export function wikipediaSearchUrl(term: string): string {
  return `https://fr.wikipedia.org/w/index.php?search=${encodeURIComponent(term)}&title=Sp%C3%A9cial:Recherche&fulltext=1`
}
