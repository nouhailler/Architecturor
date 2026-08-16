import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Onboarding from './components/Onboarding/Onboarding'
import UpdateBanner from './components/UpdateBanner/UpdateBanner'
import Accueil from './pages/Accueil/Accueil'
import Catalogue from './pages/Catalogue/Catalogue'
import FicheDetail from './pages/FicheDetail/FicheDetail'
import Parametres from './pages/Parametres/Parametres'
import Glossaire from './pages/Glossaire/Glossaire'
import APropos from './pages/APropos/APropos'

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/typologie/:id" element={<FicheDetail />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/glossaire" element={<Glossaire />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="*" element={<Accueil />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Onboarding />
      <UpdateBanner />
    </AppProvider>
  )
}
