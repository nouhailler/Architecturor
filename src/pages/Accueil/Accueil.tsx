import { useNavigate } from 'react-router-dom'
import { SquaresFour, ClockCountdown } from '@phosphor-icons/react'
import CarteTypologies from './CarteTypologies'
import FriseChronologique from './FriseChronologique'
import styles from './Accueil.module.css'

export default function Accueil() {
  const navigate = useNavigate()

  const goCatalogue = () => { navigate('/catalogue'); window.scrollTo(0, 0) }
  const scrollFrise = () => {
    const el = document.getElementById('frise')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  return (
    <div>
      {/* ── Hero ────────────────────────────────── */}
      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <div className={styles.badge}>
            <i className="ph ph-compass-tool" />
            Base de référence pour la maîtrise d'œuvre
          </div>
          <h1 className={styles.h1}>
            Le bâti français,<br />par période et par procédé de construction
          </h1>
          <p className={styles.lead}>
            Un inventaire des typologies constructives du territoire — matériaux, structure porteuse, planchers, toiture.
            Entrez par la carte, par la chronologie ou par le catalogue filtré.
          </p>
          <div className={styles.ctas}>
            <button className="btn btn-primary" onClick={goCatalogue}>
              <SquaresFour size={16} weight="regular" />
              Explorer le catalogue
            </button>
            <button className="btn btn-secondary" onClick={scrollFrise}>
              <ClockCountdown size={16} weight="regular" />
              Voir la frise
            </button>
          </div>
        </div>
      </div>

      {/* ── Carte ───────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Carte des typologies</h2>
          <span className={styles.sectionSub}>5 typologies géolocalisées</span>
        </div>
        <CarteTypologies />
      </div>

      {/* ── Frise ───────────────────────────────── */}
      <div id="frise" className={styles.section} style={{ paddingTop: 34, paddingBottom: 20 }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frise chronologique</h2>
          <span className={styles.sectionSub}>1400 → 2000</span>
        </div>
        <FriseChronologique />
        <div className={styles.friseCta}>
          <button className="btn btn-secondary" onClick={goCatalogue}>
            Ouvrir le catalogue complet
            <i className="ph ph-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  )
}
