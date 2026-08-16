import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { initPwa } from './lib/pwa'
import './styles/tokens.css'
import './styles/global.css'

// Enregistre le service worker et met en place la détection de mise à jour.
initPwa()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
