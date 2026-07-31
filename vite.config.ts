import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/Architecturor/' uniquement pour le déploiement GitHub Pages (build en CI),
// racine '/' en local pour ne pas gêner `npm run dev` / `npm run preview`.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Architecturor/' : '/',
  plugins: [react()],
})
