// Contenu de l'aide contextuelle (bouton « ? » du bandeau), une entrée par
// écran de l'application. Rédigé en Markdown minimal (voir
// src/utils/markdown.tsx) et pensé pour un public qui ne maîtrise pas
// forcément le vocabulaire de l'architecture — chaque champ technique est
// explicité en langage courant plutôt que simplement nommé.

export interface HelpTopic {
  title: string
  subtitle: string
  body: string
}

export const HELP_ACCUEIL: HelpTopic = {
  title: 'Aide — Accueil',
  subtitle: 'Les trois façons d’explorer le catalogue',
  body: `
Cette page d'accueil propose **trois points d'entrée** différents vers les typologies du site : une carte géographique, une frise chronologique, ou le catalogue complet avec ses filtres (accessible aussi via le bouton **« Explorer le catalogue »**).

## 🗺️ La carte de France

La carte affiche des **épingles** représentant une sélection de typologies emblématiques, positionnées approximativement selon leur région d'origine — ce n'est pas un plan cadastral, seulement un repérage indicatif.

- Survolez (ou touchez) une épingle pour afficher une **info-bulle** avec le nom de la typologie et une photo.
- Cliquez sur une épingle pour ouvrir directement sa fiche détaillée.
- Le bouton **« Maximiser la carte »** l'agrandit en plein écran pour plus de confort de lecture.

### Le sélecteur de région

Juste sous la carte, un menu déroulant **« Région »** regroupe toutes les typologies par grande zone géographique (Bretagne, Provence, Alsace…). Le nombre à côté de chaque région correspond au nombre de typologies qui y sont répertoriées.

> Le groupe **« Portée nationale »** ne rassemble pas *toutes* les typologies du site : uniquement celles qui ne sont pas rattachées à une région précise (par exemple un type de bâtiment agricole présent partout en France).

Selon le nombre de typologies dans la région choisie :

- s'il y en a peu, elles s'affichent directement sous forme de liste cliquable ;
- s'il y en a beaucoup, un bouton **« Choisir parmi les N typologies… »** ouvre une fenêtre listant les typologies groupées par catégorie, que vous pouvez fermer sans rien choisir (croix, clic en dehors, ou touche Échap).

## ⏳ La frise chronologique

La frise représente chaque typologie sous la forme d'une **barre horizontale** dont la position et la longueur correspondent à sa période d'usage (par exemple, de 1600 à 1900 pour une ferme traditionnelle).

- Le sélecteur **« Période »** permet de choisir une grande époque (Moyen Âge, Renaissance, XIXe siècle…) afin de ne pas afficher des dizaines de lignes en même temps.
- Cliquez sur une barre pour ouvrir la fiche de la typologie correspondante.
- L'échelle en haut indique les années repères (900, 1100, 1300…) pour se situer dans le temps.
`,
}

export const HELP_CATALOGUE: HelpTopic = {
  title: 'Aide — Catalogue',
  subtitle: 'Rechercher et filtrer les typologies',
  body: `
Le catalogue liste l'intégralité des typologies du site et permet de les filtrer selon plusieurs critères combinables entre eux.

## 🔍 La recherche

Le champ de recherche en haut du panneau de filtres cherche dans le **nom**, la **région**, le **procédé**, l'**usage**, le **résumé** et la **catégorie** de chaque typologie — tapez simplement un mot-clé (ex. « pierre », « toit de chaume », « Bretagne »).

## Les filtres

Les filtres sont regroupés en **sections repliables** : cliquez sur l'intitulé d'une section pour l'ouvrir ou la refermer.

### Catégorie

Regroupe les typologies par grande famille d'usage : habitat rural, habitat urbain, architecture religieuse, militaire, industrielle, des transports, agricole, publique, littorale ou de montagne.

### Procédé de construction

Le **procédé constructif** est la technique principale utilisée pour bâtir : maçonnerie en pierre, ossature en bois, pan de bois, béton armé, etc. Les très nombreuses valeurs possibles sont elles-mêmes regroupées en **familles thématiques** repliables (ex. « Maçonnerie de pierre », « Structures bois ») pour rester lisibles.

### Type d'usage

La fonction du bâtiment (habitation, stockage agricole, culte, enseignement…), également regroupée en familles pour la même raison.

### Période

Trois grandes tranches chronologiques : **avant 1800**, **XIXe siècle**, **XXe siècle**. Une typologie peut appartenir à plusieurs tranches lorsque son usage s'étend sur une longue période.

> Un badge numéroté apparaît sur l'intitulé d'une section dès qu'un de ses filtres est actif, et un bouton **« Réinitialiser »** apparaît en bas du panneau dès qu'au moins un filtre ou une recherche est en cours.

## Les résultats

Chaque **carte** affiche une photo (si disponible), la période d'usage, le nom, la région, un court résumé et trois étiquettes rapides : catégorie, procédé et usage. Cliquez sur une carte pour ouvrir la fiche complète de la typologie.
`,
}

export const HELP_FICHE: HelpTopic = {
  title: 'Aide — Fiche de typologie',
  subtitle: 'Comprendre chaque champ, y compris les plus techniques',
  body: `
Chaque typologie possède une fiche détaillée organisée en deux grandes parties : la **coupe schématique et le procédé de construction**, et la **fiche d'identité** avec ses informations complémentaires.

## En-tête

En haut de la fiche, plusieurs étiquettes cliquables permettent de retrouver rapidement d'autres typologies partageant le même critère : **catégorie**, **période**, **procédé de construction** et **région**. Cliquer sur l'une d'elles ouvre le catalogue déjà filtré sur ce critère.

## 🏗️ La coupe schématique annotée

Il s'agit d'un **schéma générique** en coupe verticale (pas un relevé réel du bâtiment) illustrant l'organisation typique de la construction : toiture, murs, planchers, structure, escalier, fondations…

Chaque numéro sur le dessin correspond à un point d'intérêt : cliquez sur un numéro, ou sur la ligne correspondante juste en dessous, pour afficher son explication détaillée.

> Les intitulés des points varient selon la typologie : un moulin affichera par exemple « Système hydraulique » plutôt que « Escalier », une grange « Accès au fenil », etc.

## 📖 Le procédé de construction

Une série de sections **repliables** détaille point par point la logique constructive de la typologie : organisation générale, matériaux, adaptation au climat, éléments distinctifs qui permettent de la reconnaître sur le terrain… Cliquez sur l'intitulé d'une section pour la déplier.

## 🪪 La fiche d'identité

Un tableau résumant les caractéristiques essentielles de la typologie :

- **Catégorie** — la famille d'usage (voir le catalogue).
- **Période** — la fourchette de dates pendant laquelle cette typologie a été couramment construite.
- **Région** — l'aire géographique où on la rencontre.
- **Usage** — la fonction du bâtiment.
- **Système** — le principe constructif global (par exemple « murs porteurs maçonnés » ou « charpente en bois »).
- **Matériau dominant** — le matériau le plus caractéristique de la construction.
- **Toiture** — le type de couverture principal.
- **Particularité** — l'élément le plus distinctif de la typologie, décrit en texte libre.

Les champs en couleur (Catégorie, Période, Région, Usage, Système, Matériau dominant, Toiture) sont **cliquables** : ils ouvrent le catalogue filtré sur les autres typologies partageant exactement ce champ.

## 🧱 Matériaux caractéristiques

La liste des matériaux typiques de la construction. Cliquez sur un matériau pour afficher sa **définition en langage courant** — pratique si un terme comme « moellon », « torchis » ou « tuile canal » ne vous est pas familier.

## 📐 Données techniques & de terrain

Des informations plus pointues, utiles pour reconnaître ou dater un bâtiment sur le terrain :

- **Coordonnées GPS moyennes** — une localisation approximative et représentative de l'aire de répartition de la typologie, pas l'adresse d'un bâtiment précis.
- **Altitude habituelle** — la fourchette d'altitude où l'on rencontre cette typologie.
- **Climat** — le contexte climatique associé (méditerranéen, océanique, montagnard…), qui explique souvent certains choix constructifs.
- **Époque dominante** — le siècle où cette typologie a été la plus construite, au sein de sa période globale.
- **Type de toiture** — la forme du toit (deux pans, quatre pans, toit plat…).
- **Pente du toit** — l'inclinaison typique de la toiture, exprimée en degrés. Une pente forte évacue mieux la neige ou une pluie abondante ; une pente faible convient davantage aux climats secs.
- **Essence de bois** — les essences traditionnellement utilisées pour la charpente ou l'ossature (chêne, châtaignier, mélèze…).
- **Type de fondation** — la manière dont le bâtiment prend appui sur le sol.
- **Type de charpente** — la structure en bois qui porte la toiture (charpente traditionnelle, fermes de charpente, etc.).
- **Difficulté d'identification** — à quel point il est facile de reconnaître cette typologie sur le terrain par rapport à des constructions voisines proches (Facile, Moyenne, Difficile).

## 🔗 Ressources externes

Des liens vers l'article Wikipédia dédié (s'il existe) et vers une recherche de photographies libres de droits sur Wikimedia Commons.

## 🖼️ Imagerie de référence

Une galerie de photographies indicatives, toutes issues de Wikimedia Commons. Cliquez sur une photo pour ouvrir sa fiche (auteur, licence). Ces images sont **illustratives** : elles montrent un exemple représentatif de la typologie, pas nécessairement le bâtiment décrit littéralement dans le texte.
`,
}

export const HELP_GLOSSAIRE: HelpTopic = {
  title: 'Aide — Glossaire',
  subtitle: 'Le dictionnaire des termes du site',
  body: `
Le glossaire rassemble les définitions des termes techniques d'architecture et de construction utilisés dans le site (matériaux, éléments de structure, types de toiture…), classés par catégorie.

## Rechercher un terme

Le champ de recherche filtre à la fois sur le **nom du terme** et sur le texte de sa **définition** — pratique si vous connaissez la description d'un élément mais pas son nom exact.

## Catégories repliables

Les termes sont regroupés par thème (structure et gros œuvre, toiture et couverture, etc.). Cliquez sur l'intitulé d'une catégorie pour la déplier ou la refermer. Une recherche active déplie automatiquement les catégories contenant un résultat.

> Depuis une fiche de typologie, cliquer sur un matériau caractéristique ouvre directement sa définition, sans avoir à naviguer jusqu'ici.
`,
}

export const HELP_PARAMETRES: HelpTopic = {
  title: 'Aide — Paramètres',
  subtitle: 'Exporter le catalogue, importer vos propres typologies',
  body: `
Cette page permet d'**exporter** l'ensemble du catalogue, et d'**importer vos propres typologies** sans toucher au code du site.

## 📤 Exporter les typologies

Télécharge un fichier JSON contenant l'intégralité des typologies actuellement disponibles (celles du catalogue de base, plus celles que vous auriez importées localement), avec tous leurs champs.

## 📥 Importer une typologie

Vous pouvez ajouter votre propre typologie de deux façons :

- en **important un fichier** JSON depuis votre appareil ;
- en **collant directement le JSON** dans la zone de texte prévue.

### Le gabarit

Le bouton **« Télécharger le gabarit »** fournit un exemple de typologie complet, avec tous les champs attendus et leur format — un bon point de départ pour rédiger la vôtre. Les champs marqués *(optionnel)* peuvent être laissés vides.

### Validation et détection de doublons

Avant d'accepter un import, le site vérifie que :

- le JSON est bien formé et que tous les champs obligatoires sont présents ;
- l'identifiant (\`id\`) n'est pas déjà utilisé ;
- la typologie ne fait pas **doublon** avec une typologie déjà existante — le nom (même approché) ou la combinaison catégorie + région + usage + période sont comparés à l'ensemble du catalogue. En cas de correspondance, un avertissement s'affiche et il faut confirmer explicitement avant de poursuivre.

> 🔒 Les typologies importées restent **uniquement dans votre navigateur** (stockage local). Elles ne sont envoyées à aucun serveur, et disparaîtront si vous videz les données de ce site dans votre navigateur — pensez à les exporter régulièrement pour les conserver.

Une fois importée, votre typologie apparaît immédiatement dans le catalogue et sur les autres pages, au même titre que les typologies natives.
`,
}

export function getHelpTopic(pathname: string): HelpTopic {
  if (pathname === '/catalogue') return HELP_CATALOGUE
  if (pathname.startsWith('/typologie')) return HELP_FICHE
  if (pathname === '/glossaire') return HELP_GLOSSAIRE
  if (pathname === '/parametres') return HELP_PARAMETRES
  return HELP_ACCUEIL
}
