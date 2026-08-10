# Contexte du projet

Ce document donne le contexte nécessaire pour comprendre, faire évoluer ou reprendre le projet
**Inventaire du bâti** — utile aussi bien à un·e contributeur·rice humain·e qu'à un assistant IA.

## 🎯 Objectif

Constituer une **base de référence des typologies constructives françaises** à destination de la
maîtrise d'œuvre (architectes, diagnostiqueurs, artisans du patrimoine). Pour chaque typologie,
l'outil documente le procédé constructif complet : fondations, structure porteuse, planchers,
toiture, façade, matériaux — avec une lecture historique (période) et géographique (région).

Le produit final est une application web (SPA) consultable en ligne, sans backend : toutes les
données sont statiques, embarquées dans le bundle.

## 🧭 Domaine métier

Vocabulaire du domaine (architecture / construction) utilisé dans le code et les données :

| Terme | Sens |
|---|---|
| **Typologie** | Une famille constructive homogène (ex. « immeuble haussmannien ») |
| **Procédé** | Le mode constructif dominant (pierre de taille, ossature bois, béton armé…) |
| **Coupe annotée** | Schéma vertical du bâtiment avec repères numérotés (toiture, façade, planchers…) |
| **Section** (procédé) | Un chapitre dépliable décrivant un aspect constructif (ex. « Fondations & structure porteuse ») |
| **Identité** | Fiche de métadonnées clé/valeur d'une typologie (période, région, gabarit…) |

Ce vocabulaire est volontairement conservé en français dans le code (noms de fichiers, props,
types) car il s'agit de terminologie métier, pas d'infrastructure technique générique.

## 🏗️ Architecture technique

- **SPA React 18 + TypeScript**, servie par Vite, sans framework meta (pas de SSR).
- **Aucun backend / API** : les données vivent dans `src/data/typologies.ts`, un tableau
  `TYPOLOGIES: Typologie[]` typé, exporté aussi sous forme de map (`TYPOLOGIES_MAP`) pour l'accès
  par id depuis les routes.
- **État applicatif global minimal** via `src/context/AppContext.tsx` (React Context + hooks) :
  recherche texte, filtres du catalogue, état ouvert/fermé des sections d'une fiche. Pas de
  librairie de state management externe — le besoin ne le justifie pas.
- **Routage** avec `react-router-dom` : 5 routes (`/`, `/catalogue`, `/typologie/:id`,
  `/glossaire`, `/parametres`), fallback vers l'accueil.
- **PWA installable** (manifeste `public/manifest.webmanifest`, icônes `public/pwa-*.png` +
  `apple-touch-icon.png`, liens dans `index.html`) : icône dédiée sur l'écran d'accueil, mode
  `standalone`. Pas de service worker ni de cache applicatif — voir « État actuel / limitations
  connues ».
- **Styles** : CSS Modules par composant + design tokens globaux (`src/styles/tokens.css`) — pas
  de framework CSS (Tailwind, etc.).
- **Icônes** : composants React de `@phosphor-icons/react`. Pour les icônes pilotées par la
  donnée (`Section.icon` dans `typologies.ts`), une table de correspondance
  (`src/data/icons.tsx`, `SECTION_ICONS`) fait le lien entre l'identifiant textuel stocké dans la
  donnée et le composant React réel. **Important** : ne jamais réintroduire de classes CSS
  `ph ph-*` (webfont) — le projet n'installe pas la webfont Phosphor, seulement le package React ;
  ces classes ne rendent rien (voir CHANGELOG, correction du 2026-07-31).

## 🗺️ Modèle de données

`Typologie` (dans `src/data/typologies.ts`) est la source de vérité unique pour les typologies
natives — actuellement **219 entrées**, exportées sous forme de tableau (`TYPOLOGIES`) et de map
par id (`TYPOLOGIES_MAP`). Chaque entrée porte :

- des métadonnées de listing/filtrage (`region`, `periode`, `procede`, `usage`, `periodeTags`,
  `categorie` — l'une des 10 valeurs de `CATEGORIES`),
- un résumé et une fiche d'identité (`resume`, `identite`),
- les `annotations` de la coupe schématique (numérotées, affichées par `CoupeAnnotee`),
- les `materiaux` caractéristiques,
- les `sections` détaillées du procédé constructif (accordéon dans `ProcedeSections`),
- des données techniques ponctuelles (`gps`, `altitude`, `climat`, `typeToiture`, `penteToit`,
  `essenceBois`, `typeFondation`, `typeCharpente`, `epoqueDominante`, `difficulteIdentification`),
- `images: string[]` — noms de fichiers Wikimedia Commons (voir section suivante), potentiellement
  vide pour les typologies pas encore illustrées.

Ajouter une typologie native = ajouter une entrée à ce tableau ; aucune autre modification de
code n'est nécessaire (catalogue, carte, frise et fiches se génèrent à partir de cette liste).
Convention d'`id` : minuscules sans séparateur (ex. `bastideprovencale`, `pigeonnierprovencal`),
unique dans tout le fichier.

### Typologies importées par l'utilisateur

En plus des 219 typologies natives, un·e utilisateur·rice peut importer ses propres typologies
depuis la page **Paramètres** (`/parametres`) : import d'un fichier JSON ou collage direct,
validé contre le schéma de `src/data/typologieSchema.ts` (avec gabarit `TYPOLOGIE_TEMPLATE`
téléchargeable et liste blanche `VALID_SECTION_ICONS`). Avant tout import, une détection de
doublons (`src/utils/duplicates.ts`) compare la typologie candidate aux typologies existantes
— sur le nom (distance de Levenshtein normalisée, seuil de similarité 0,85) et sur la fiche
d'identité (catégorie + région + usage + période) — et affiche un avertissement bloquant en cas
de correspondance avant confirmation de l'utilisateur·rice.

Les typologies importées sont persistées dans `localStorage`
(`src/utils/customTypologies.ts`, clé `inventaire-bati:typologies-importees`) — **jamais**
envoyées à un serveur, il n'y en a pas. Le hook `useCustomTypologies()` les rend réactives :
`Catalogue`, `FicheDetail` et `Parametres` les fusionnent avec `TYPOLOGIES` à l'affichage
(`[...TYPOLOGIES, ...customTypologies]`), sans écriture dans `src/data/typologies.ts`. La page
Paramètres permet aussi d'exporter l'ensemble (natives + importées) en un seul fichier JSON.

## 🖼️ Images (Wikimedia Commons)

Le champ `images: string[]` d'une typologie contient des noms de fichiers Wikimedia Commons
(ex. `'Pigeonnier_en_Luberon.JPG'`), résolus en URL par `src/utils/commons.ts` :
- `commonsFilePath(ref, width)` → URL `Special:FilePath` (utilisée pour l'affichage),
- `commonsFilePage(ref)` → URL de la page `File:` (crédit / licence).

Un préfixe `wp:` sur la référence bascule la résolution vers `fr.wikipedia.org` plutôt que
`commons.wikimedia.org`, pour les rares fichiers non partagés sur Commons. Les images sont
chargées directement depuis Wikimedia à l'affichage (pas de copie locale, pas de backend) — un
accès réseau externe est donc nécessaire pour les voir. Chaque image ajoutée doit être vérifiée
individuellement (licence libre, cohérence visuelle avec la typologie) avant d'être référencée ;
environ 180 des 219 typologies en possèdent une à ce jour, les autres retombent sur un
placeholder (icône `Image`).

## 📌 État actuel / limitations connues

- **Pas de service worker** : l'app est installable (PWA) mais ne fonctionne pas hors-ligne — un
  accès réseau est requis à chaque lancement (polices Google Fonts, images Wikimedia Commons).
- **Pas de tests automatisés** pour le moment (ni unitaires, ni end-to-end).
- **Pas de CI configurée** dans le dépôt (aucun workflow GitHub Actions) — les vérifications
  (`tsc --noEmit`, `vite build`) sont à lancer manuellement avant de fusionner.
- Une quarantaine de typologies n'ont pas encore de photo (`images: []`) et affichent un
  placeholder.
- Les polices sont chargées depuis Google Fonts (`Inter`) via `<link>` dans `index.html` —
  nécessite un accès réseau externe en production, tout comme les images Wikimedia Commons.

## 🧑‍💻 Conventions de code

- TypeScript strict, pas de `any` implicite.
- Un composant = un dossier avec son `.module.css` associé (co-location).
- Commentaires en français, réservés à la donnée métier (pas de commentaires redondants avec le
  code).
- Pas d'abstraction anticipée : trois lignes similaires valent mieux qu'une fausse généralisation
  tant qu'un vrai besoin de factorisation n'apparaît pas.
