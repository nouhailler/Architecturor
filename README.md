# 🏛️ Inventaire du bâti — Typologies architecturales françaises

<div align="center">

<img src="public/icon.svg" width="96" height="96" alt="Icône Inventaire du bâti" />

<br/>

[![Licence](https://img.shields.io/github/license/nouhailler/architecturor)](https://github.com/nouhailler/architecturor/blob/main/LICENSE) 
[![Release](https://img.shields.io/github/v/release/nouhailler/architecturor)](https://github.com/nouhailler/architecturor/releases) 
[![Build (CI)](https://img.shields.io/github/actions/workflow/status/nouhailler/architecturor/ci.yml?branch=main)](https://github.com/nouhailler/architecturor/actions) 
[![Coverage](https://img.shields.io/codecov/c/github/nouhailler/architecturor)](https://codecov.io/gh/nouhailler/architecturor) 
[![Stars](https://img.shields.io/github/stars/nouhailler/architecturor?style=social)](https://github.com/nouhailler/architecturor/stargazers)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white&labelColor=161826)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white&labelColor=161826)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white&labelColor=161826)](https://vitejs.dev)

</div>

---

## ✨ À propos

Inventaire du bâti est une base de référence destinée à la maîtrise d'œuvre : elle recense des typologies constructives françaises (immeuble haussmannien, mas provençal, maison à pans de bois, grand ensemble, etc.) avec, pour chacune : structure porteuse, matériaux, planchers et toiture.

Points d'entrée principaux :
- 🗺️ Carte de France géolocalisant chaque typologie
- ⏳ Frise chronologique (1400 → 2000)
- 🔍 Catalogue filtrable (procédé de construction, usage, période)

## Table des matières

- [Aperçu / Démo](#aperçu--démo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Structure du projet](#structure-du-projet)
- [Données et contenu](#données-et-contenu)
- [Contribuer](#contribuer)
- [Tests & CI](#tests--ci)
- [Licence](#licence)
- [Contact & crédits](#contact--crédits)

## 📸 Aperçu / Démo

Capture d'écran et exemple animé :

| Accueil | Catalogue | Fiche détail |
|---:|:---:|:---:|
| ![Accueil](docs/screenshots/accueil.png) | ![Catalogue](docs/screenshots/catalogue.png) | ![Fiche détail](docs/screenshots/fiche-detail.png) |

Démo animée (exemple) :  
![Démo (GIF)](docs/demo/demo.gif)

Remarques :
- Si vous n'avez pas encore de GIF, ajoutez docs/demo/demo.gif (capture animée ~5–10s).
- Pensez à fournir des alternatives (alt text) accessibles pour chaque image.

## Features

- ✅ Catalogue filtrable par période, procédé, usage
- ✅ Carte interactive des typologies
- ✅ Fiches détaillées avec coupes annotées
- ✅ Thème sombre / design tokens
- ✅ Données en TypeScript (src/data/typologies.ts) comme source de vérité

## 🚀 Installation

Prérequis : Node.js (>= 18), npm ou pnpm

```bash
# cloner
git clone https://github.com/nouhailler/architecturor.git
cd architecturor

# installer dépendances
npm install

# dev
npm run dev

# build prod
npm run build

# prévisualiser le build
npm run preview
```

Tips :
- Pour pnpm : pnpm install
- Ajoutez un .env.local si vous avez des clés (ex. API maps) — voir [Configuration](#configuration)

## 🧭 Usage rapide

- Accéder à http://localhost:5173 (ou l'URL indiquée par Vite)
- Ouvrir la carte pour filtrer par régions / période
- Cliquer sur une typologie pour ouvrir la fiche détaillée

## 🗂️ Structure du projet

Arborescence principale (extrait) :

```
src/
├── components/       # Composants réutilisables (Header, Footer, Card, etc.)
├── pages/            # Accueil, Catalogue, FicheDetail
├── context/          # App context : filtres, recherche
├── data/
│   ├── typologies.ts # Données source
│   └── icons.tsx     # Mappage icônes → composants Phosphor
├── styles/           # Tokens & styles globaux
└── docs/             # Screenshots, demo GIFs, documentation
```

## 🧾 Données & contenu

- Les typologies sont définies dans src/data/typologies.ts — format TypeScript pour assurer la cohérence.
- Si vous voulez importer/exporter vers CSV/JSON pour interchangeabilité, je peux ajouter des scripts.

## 🛠️ Stack technique

- React 18 + TypeScript
- Vite
- React Router
- Phosphor Icons
- CSS Modules (design tokens dans src/styles)

## Tests, CI & Qualité

- Ajouter un workflow GitHub Actions (ex. .github/workflows/ci.yml) pour :
  - lint (eslint)
  - build
  - tests (vitest / jest si présents)
  - coverage (upload vers Codecov)

Exemple de badge CI (remplacer le nom du workflow / branche si besoin) :

```
[![Build (CI)](https://img.shields.io/github/actions/workflow/status/nouhailler/architecturor/ci.yml?branch=main)](https://github.com/nouhailler/architecturor/actions)
```

Coverage (exemple Codecov) :

```
[![Coverage](https://img.shields.io/codecov/c/github/nouhailler/architecturor)](https://codecov.io/gh/nouhailler/architecturor)
```

## 🔧 Configuration

- Fichiers d'environnement : .env.example
- Clés externes :
  - API carte (ex. Mapbox, Leaflet + tiles) — définissez MAP_API_KEY dans .env.local
- Personnalisation du thème : src/styles/tokens.css

## 🧩 Déploiement

- Hébergement recommandé : Netlify, Vercel ou GitHub Pages (build statique).
- Exemple (Vercel) : branch main → déploiement automatique.
- Pour GitHub Pages, configurer la cible de build et la branche gh-pages.

## 🤝 Contribuer

Merci pour votre intérêt ! Quelques règles pour contribuer :

1. Forkez le dépôt et créez une branche feature/bugfix : git checkout -b feat/ma-feature
2. Respectez les conventions (lint + formatting)
3. Ouvrez une Pull Request claire avec description & capture d'écran
4. Pour les contributions de données (typologies), vérifiez le format TypeScript dans src/data/typologies.ts

Template de PR suggéré :
- Contexte / problème résolu
- Ce qui a été modifié
- Screenshots / GIFs (si UI)
- Checklist (lint, build, tests)

## 📄 Licence

Remplacez par la licence effective si différente. Exemple MIT :

```
MIT © Nouhailler
```

Badge licence :

```
[![Licence](https://img.shields.io/github/license/nouhailler/architecturor)](https://github.com/nouhailler/architecturor/blob/main/LICENSE)
```

## ✉️ Contact & crédits

- Auteur : nouhailler — https://github.com/nouhailler
- Contact : (mettez votre email / profil)
- Inspirations et ressources :
  - Phosphor Icons — https://phosphoricons.com
  - Vite — https://vitejs.dev

---

Notes / To‑do suggérées (optionnelles)
- [ ] Ajouter un GIF de démonstration dans docs/demo/demo.gif
- [ ] Mettre en place GitHub Actions (ci.yml) et lier Codecov
- [ ] Compléter le fichier LICENSE si absent
- [ ] Ajouter badges pour issues ouvertes, dependabot, et release cadence
