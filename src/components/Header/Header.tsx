import { Buildings, Gear, BookOpen } from '@phosphor-icons/react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const goHome = () => { navigate('/'); window.scrollTo(0, 0) }
  const goCatalogue = () => { navigate('/catalogue'); window.scrollTo(0, 0) }
  const goGlossaire = () => { navigate('/glossaire'); window.scrollTo(0, 0) }
  const goParametres = () => { navigate('/parametres'); window.scrollTo(0, 0) }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={goHome} aria-label="Accueil">
          <div className={styles.logoIcon}>
            <Buildings size={17} weight="regular" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Inventaire du bâti</span>
            <span className={styles.logoSub}>Typologies architecturales · France</span>
          </div>
        </button>

        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
            onClick={goHome}
          >
            Accueil
          </button>
          <button
            className={`${styles.navLink} ${location.pathname === '/catalogue' || location.pathname.startsWith('/typologie') ? styles.navLinkActive : ''}`}
            onClick={goCatalogue}
          >
            Catalogue
          </button>
          <button
            className={`${styles.navLink} ${location.pathname === '/glossaire' ? styles.navLinkActive : ''}`}
            onClick={goGlossaire}
          >
            <BookOpen size={15} weight="regular" style={{ marginRight: 5, verticalAlign: -2 }} />
            Glossaire
          </button>
          <button
            className={`${styles.navLink} ${location.pathname === '/parametres' ? styles.navLinkActive : ''}`}
            onClick={goParametres}
            aria-label="Paramètres"
          >
            <Gear size={16} weight="regular" />
          </button>
        </nav>
      </div>
    </header>
  )
}
