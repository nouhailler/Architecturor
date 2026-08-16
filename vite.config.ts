import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Base '/Architecturor/' uniquement pour le déploiement GitHub Pages (build en CI),
// racine '/' en local pour ne pas gêner `npm run dev` / `npm run preview`.
const base = process.env.GITHUB_ACTIONS ? '/Architecturor/' : '/'

// Estampillé dans le bundle pour que l'app puisse dire quel build tourne — le
// seul moyen de trancher « suis-je sur la dernière version ? » sans deviner.
// GitHub Actions expose le commit dans GITHUB_SHA ; en local, on demande à git.
function buildId(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    return 'dev'
  }
}

export default defineConfig({
  base,
  define: {
    __BUILD_ID__: JSON.stringify(buildId()),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    VitePWA({
      // 'prompt' et non 'autoUpdate' : une PWA installée est rouverte plutôt
      // que rechargée, donc une mise à jour automatique s'appliquerait à un
      // moment imprévisible. L'app enregistre elle-même le service worker
      // (`injectRegister: null`, voir src/lib/pwa.ts) pour garder l'objet
      // d'enregistrement sous la main : lui seul peut réinterroger le serveur.
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['icon.svg', 'icon-maskable.svg', 'apple-touch-icon.png'],
      // Chemins d'icônes relatifs (pas de '/' initial) : le manifeste est servi
      // depuis la base, donc ils restent justes sous '/Architecturor/' comme à
      // la racine — ce que l'ancien manifeste statique ne faisait pas.
      manifest: {
        id: base,
        name: 'Inventaire du bâti — Typologies architecturales',
        short_name: 'Inventaire du bâti',
        description:
          "Inventaire des typologies architecturales du bâti français — matériaux, structure porteuse, planchers, toiture, par période et par procédé de construction.",
        start_url: '.',
        scope: base,
        display: 'standalone',
        background_color: '#161826',
        theme_color: '#161826',
        lang: 'fr',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
        // Le bundle de données dépasse la limite par défaut (2 Mio) : sans
        // cela, il serait exclu du précache et l'app ne démarrerait pas
        // hors-ligne.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          // Les photos Wikimedia Commons sont immuables (URL = nom de fichier +
          // largeur) : les garder évite de retélécharger la galerie à chaque
          // visite, et rend les fiches déjà consultées lisibles hors-ligne.
          {
            urlPattern: ({ url }) =>
              url.hostname.endsWith('wikimedia.org') || url.hostname.endsWith('wikipedia.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'commons-images',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
