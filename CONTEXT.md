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
- **Routage** avec `react-router-dom` : 3 routes (`/`, `/catalogue`, `/typologie/:id`), fallback
  vers l'accueil.
- **Styles** : CSS Modules par composant + design tokens globaux (`src/styles/tokens.css`) — pas
  de framework CSS (Tailwind, etc.).
- **Icônes** : composants React de `@phosphor-icons/react`. Pour les icônes pilotées par la
  donnée (`Section.icon` dans `typologies.ts`), une table de correspondance
  (`src/data/icons.tsx`, `SECTION_ICONS`) fait le lien entre l'identifiant textuel stocké dans la
  donnée et le composant React réel. **Important** : ne jamais réintroduire de classes CSS
  `ph ph-*` (webfont) — le projet n'installe pas la webfont Phosphor, seulement le package React ;
  ces classes ne rendent rien (voir CHANGELOG, correction du 2026-07-31).

## 🗺️ Modèle de données

`Typologie` (dans `src/data/typologies.ts`) est la source de vérité unique. Chaque entrée porte :

- des métadonnées de listing/filtrage (`region`, `periode`, `procede`, `usage`, `periodeTags`),
- un résumé et une fiche d'identité (`resume`, `identite`),
- les `annotations` de la coupe schématique (numérotées, affichées par `CoupeAnnotee`),
- les `materiaux` caractéristiques,
- les `sections` détaillées du procédé constructif (accordéon dans `ProcedeSections`).

Ajouter une typologie = ajouter une entrée à ce tableau ; aucune autre modification de code n'est
nécessaire (catalogue, carte, frise et fiches se génèrent à partir de cette liste).

## 📌 État actuel / limitations connues

- **Aucune image réelle** : les vignettes de typologies et la galerie d'imagerie (fiche détail)
  sont des placeholders (icône `Image`). Les emplacements sont marqués dans le code
  (`SidebarIdentite.tsx`, `TypologieCard.tsx`) pour un remplacement futur par de vraies photos,
  plans ou relevés.
- **Pas de tests automatisés** pour le moment (ni unitaires, ni end-to-end).
- **Pas de CI configurée** dans le dépôt (aucun workflow GitHub Actions).
- Les polices sont chargées depuis Google Fonts (`Inter`) via `<link>` dans `index.html` — nécessite
  un accès réseau externe en production.

## 🧑‍💻 Conventions de code

- TypeScript strict, pas de `any` implicite.
- Un composant = un dossier avec son `.module.css` associé (co-location).
- Commentaires en français, réservés à la donnée métier (pas de commentaires redondants avec le
  code).
- Pas d'abstraction anticipée : trois lignes similaires valent mieux qu'une fausse généralisation
  tant qu'un vrai besoin de factorisation n'apparaît pas.
