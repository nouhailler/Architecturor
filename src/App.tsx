import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Accueil from './pages/Accueil/Accueil'
import Catalogue from './pages/Catalogue/Catalogue'
import FicheDetail from './pages/FicheDetail/FicheDetail'
import Parametres from './pages/Parametres/Parametres'

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
            <Route path="*" element={<Accueil />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
