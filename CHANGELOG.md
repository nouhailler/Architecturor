# Changelog

Tous les changements notables de ce projet sont documentés dans ce fichier.

Le format s'inspire de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Le projet n'a
pas encore de première version publiée ; le versionnement sémantique sera adopté à partir de la
v1.0.0.

## [Non publié]

### Ajouté

- Catalogue étendu de 5 à **219 typologies**, réparties sur les 10 catégories du domaine
  (habitat rural, urbain, architecture religieuse, militaire, industrielle, des transports,
  agricole, publique, littorale et de montagne), avec une forte extension du corpus provençal
  (bastide, mas, borie, cabanon, pigeonnier, grange à fenil, grange-étable de montagne, maison à
  tourelle, village perché, habitat troglodytique, etc.).
- **Photos Wikimedia Commons** pour la majorité des typologies (plus de 180 sur 219) : vignettes
  du catalogue et de la carte, galerie de la fiche détail. Résolution des URLs via
  `src/utils/commons.ts` (`commonsFilePath`, `commonsFilePage`), avec prise en charge d'un
  préfixe `wp:` pour les rares fichiers hébergés sur fr.wikipedia.org plutôt que sur Commons.
- Page **Glossaire** (`/glossaire`) : lexique des termes d'architecture et de construction,
  recherche texte, catégories dépliables (`src/data/glossaire.ts`).
- Page **Paramètres** (`/parametres`) permettant :
  - l'export de l'intégralité des typologies (natives + importées) au format JSON ;
  - l'import d'une typologie personnalisée (fichier ou JSON collé), avec gabarit téléchargeable
    et validation de schéma (`src/data/typologieSchema.ts`) ;
  - la détection de doublons avant import, sur le nom (distance de Levenshtein, seuil de
    similarité 0,85) et sur la fiche d'identité — catégorie, région, usage et période
    (`src/utils/duplicates.ts`) ;
  - la persistance locale des typologies importées (`localStorage`,
    `src/utils/customTypologies.ts`), prises en compte immédiatement dans le catalogue et les
    fiches détail sans rechargement ni backend.
- `README.md`, `CONTEXT.md` et ce `CHANGELOG.md`.
- Icône de l'application (`public/icon.svg`) et balises favicon associées dans `index.html`.
- Captures d'écran de démonstration (`docs/screenshots/`).

### Corrigé

- **Icônes invisibles sur tout le site** : le code utilisait des classes CSS `ph ph-*` (webfont
  Phosphor Icons), jamais chargées dans le projet — seul le package `@phosphor-icons/react` est
  installé. Remplacement par les composants React correspondants, avec une table de
  correspondance (`src/data/icons.tsx`) pour les icônes pilotées par la donnée.
- Avertissement React « key manquante » sur la frise chronologique (`FriseChronologique.tsx`) :
  un fragment `<>…</>` sans clé dans une boucle `.map()`, remplacé par `<Fragment key={...}>`.

### Modifié

- Retrait de `node_modules/` et `dist/` du suivi git (non versionnés jusqu'ici, faute de
  `.gitignore`) ; ajout d'un `.gitignore`.

## [0.1.0] - 2026-07-31

### Ajouté

- Version initiale de l'application : pages Accueil, Catalogue et Fiche détail.
- Cinq typologies documentées : Immeuble haussmannien, Maison à pans de bois, Mas provençal,
  Coron minier, Grand ensemble en béton.
- Carte de France interactive et frise chronologique (1400 → 2000) sur la page d'accueil.
- Catalogue filtrable par procédé de construction, usage et période, avec recherche texte.
- Fiche détail par typologie : coupe schématique annotée, procédé de construction en accordéon,
  fiche d'identité et matériaux caractéristiques.
