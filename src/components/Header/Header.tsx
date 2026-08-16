import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Buildings, Gear, BookOpen, Info, List, X } from '@phosphor-icons/react'
import { useNavigate, useLocation } from 'react-router-dom'
import HelpButton from '../Help/HelpButton'
import styles from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(64)

  const go = (path: string) => {
    navigate(path)
    window.scrollTo(0, 0)
    setMobileOpen(false)
  }

  const goHome = () => go('/')
  const goCatalogue = () => go('/catalogue')
  const goGlossaire = () => go('/glossaire')
  const goParametres = () => go('/parametres')
  const goAPropos = () => go('/a-propos')

  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setHeaderHeight(innerRef.current.getBoundingClientRect().height)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Le fond assombri et le panneau doivent être en position fixe par rapport
  // à la fenêtre : on les rend via un portail plutôt que sous <header>, car
  // le backdrop-filter de l'en-tête crée un nouveau contexte de positionnement
  // qui ferait dépendre "position: fixed" de la boîte de l'en-tête, pas du viewport.
  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const isActive = (test: boolean) => `${styles.navLink} ${test ? styles.navLinkActive : ''}`

  return (
    <header className={styles.header}>
      <div className={styles.inner} ref={innerRef}>
        <button className={styles.logo} onClick={goHome} aria-label="Accueil">
          <div className={styles.logoIcon}>
            <Buildings size={17} weight="regular" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Inventaire du bâti</span>
            <span className={styles.logoSub}>Typologies architecturales · France</span>
          </div>
        </button>

        {/* Navigation desktop */}
        <nav className={styles.nav}>
          <button className={isActive(location.pathname === '/')} onClick={goHome}>
            Accueil
          </button>
          <button className={isActive(location.pathname === '/catalogue' || location.pathname.startsWith('/typologie'))} onClick={goCatalogue}>
            Catalogue
          </button>
          <button className={isActive(location.pathname === '/glossaire')} onClick={goGlossaire}>
            <BookOpen size={15} weight="regular" style={{ marginRight: 5, verticalAlign: -2 }} />
            Glossaire
          </button>
          <button className={isActive(location.pathname === '/parametres')} onClick={goParametres} aria-label="Paramètres">
            <Gear size={16} weight="regular" />
          </button>
          <button className={isActive(location.pathname === '/a-propos')} onClick={goAPropos} aria-label="À propos">
            <Info size={16} weight="regular" />
          </button>
          <HelpButton className={styles.navLink} />
        </nav>

        {/* Déclencheur menu mobile */}
        <button
          className={styles.burgerBtn}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
        </button>
      </div>

      {mobileOpen && createPortal(
        <>
          <div className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} />
          <nav className={styles.mobilePanel} style={{ top: headerHeight }}>
            <button className={isActive(location.pathname === '/')} onClick={goHome}>
              Accueil
            </button>
            <button className={isActive(location.pathname === '/catalogue' || location.pathname.startsWith('/typologie'))} onClick={goCatalogue}>
              Catalogue
            </button>
            <button className={isActive(location.pathname === '/glossaire')} onClick={goGlossaire}>
              <BookOpen size={16} weight="regular" style={{ marginRight: 7, verticalAlign: -3 }} />
              Glossaire
            </button>
            <button className={isActive(location.pathname === '/parametres')} onClick={goParametres}>
              <Gear size={16} weight="regular" style={{ marginRight: 7, verticalAlign: -3 }} />
              Paramètres
            </button>
            <button className={isActive(location.pathname === '/a-propos')} onClick={goAPropos}>
              <Info size={16} weight="regular" style={{ marginRight: 7, verticalAlign: -3 }} />
              À propos
            </button>
            <HelpButton className={styles.navLink}>
              Aide de cet écran
            </HelpButton>
          </nav>
        </>,
        document.body,
      )}
    </header>
  )
}
