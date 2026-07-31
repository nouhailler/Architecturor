<div align="center">

<img src="public/icon.svg" width="72" height="72" alt="Icône Inventaire du bâti" />

# 🏛️ Inventaire du bâti

**Typologies architecturales du bâti français — par période et par procédé de construction**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white&labelColor=161826)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white&labelColor=161826)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white&labelColor=161826)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?logo=reactrouter&logoColor=white&labelColor=161826)](https://reactrouter.com)

</div>

---

## ✨ À propos

**Inventaire du bâti** est une base de référence à destination de la maîtrise d'œuvre : elle
recense des **typologies constructives françaises** (immeuble haussmannien, maison à pans de
bois, mas provençal, coron minier, grand ensemble en béton…) avec, pour chacune, sa **structure
porteuse**, ses **matériaux**, ses **planchers** et sa **toiture**.

Trois points d'entrée :

- 🗺️ **une carte de France** géolocalisant chaque typologie,
- ⏳ **une frise chronologique** (1400 → 2000) pour situer les procédés dans le temps,
- 🔍 **un catalogue filtrable** par procédé de construction, usage ou période.

## 📸 Aperçu

| Accueil | Catalogue | Fiche détail |
|---|---|---|
| ![Accueil](docs/screenshots/accueil.png) | ![Catalogue](docs/screenshots/catalogue.png) | ![Fiche détail](docs/screenshots/fiche-detail.png) |

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🗂️ Structure du projet

```
src/
├── components/         # Header, Footer (composants partagés)
├── context/             # AppContext : recherche, filtres, sections ouvertes
├── data/
│   ├── typologies.ts    # Données des typologies (source de vérité)
│   └── icons.tsx         # Correspondance icône (data) → composant Phosphor
├── pages/
│   ├── Accueil/          # Hero, carte de France, frise chronologique
│   ├── Catalogue/         # Filtres + grille de typologies
│   └── FicheDetail/       # Coupe annotée, procédé de construction, identité
└── styles/               # Tokens de design (couleurs, rayons, ombres) & styles globaux
```

## 🧱 Typologies incluses

| Typologie | Période | Région | Procédé |
|---|---|---|---|
| 🏢 Immeuble haussmannien | 1853–1870 | Paris · Île-de-France | Pierre de taille |
| 🌳 Maison à pans de bois | 1450–1650 | Normandie · Val de Loire | Ossature bois |
| 🌾 Mas provençal | 1600–1850 | Provence · Méditerranée | Moellons & chaux |
| ⛏️ Coron minier | 1825–1914 | Nord · Hauts-de-France | Brique |
| 🏗️ Grand ensemble en béton | 1953–1975 | Aires urbaines · France | Béton armé |
| 🌊 Longère bretonne | 1700–1900 | Bretagne · Côtes-d'Armor | Granite |
| 🏔️ Chalet savoyard | 1750–1900 | Savoie · Alpes | Bois & pierre |
| 🍷 Échoppe bordelaise | 1730–1914 | Bordeaux · Gironde | Pierre calcaire |
| 🎨 Maison basque (labourdine) | 1600–1850 | Pays basque · Aquitaine | Pans de bois & torchis |
| 🏛️ Immeuble Art déco | 1920–1935 | Reims · Champagne | Béton & brique |

## 🎨 Design

Palette et rayons définis comme design tokens CSS dans [`src/styles/tokens.css`](src/styles/tokens.css)
(thème sombre « Nocturne », accent violet). Les icônes utilisent
[`@phosphor-icons/react`](https://phosphoricons.com).

## 🛠️ Stack technique

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) — bundler & serveur de dev
- [React Router](https://reactrouter.com) — routage SPA
- [Phosphor Icons](https://phosphoricons.com) — iconographie
- CSS Modules — styles scopés par composant

## 📄 Documentation complémentaire

- [`CONTEXT.md`](CONTEXT.md) — contexte métier, architecture et conventions du projet
- [`CHANGELOG.md`](CHANGELOG.md) — historique des changements

---

<div align="center">
<sub>Inventaire du bâti — prototype de référence · Données constructives à visée technique</sub>
</div>
