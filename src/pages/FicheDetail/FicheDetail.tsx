import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { TYPOLOGIES_MAP } from '../../data/typologies'
import { useApp } from '../../context/AppContext'
import CoupeAnnotee from './CoupeAnnotee'
import ProcedeSections from './ProcedeSections'
import SidebarIdentite from './SidebarIdentite'
import styles from './FicheDetail.module.css'

export default function FicheDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setOpen } = useApp()
  const t = id ? TYPOLOGIES_MAP[id] : null

  useEffect(() => {
    setOpen({ 0: true })
  }, [id, setOpen])

  if (!t) {
    return (
      <div className={styles.notFound}>
        <p>Typologie introuvable.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/catalogue')}>
          <ArrowLeft size={14} /> Retour au catalogue
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap} style={{ animation: 'bfade .3s ease' }}>
      {/* En-tête */}
      <div className={styles.header}>
        <button className="btn btn-ghost" onClick={() => { navigate('/catalogue'); window.scrollTo(0, 0) }} style={{ fontSize: 13, marginBottom: 16 }}>
          <ArrowLeft size={14} />
          Catalogue
        </button>

        <div className={styles.tags}>
          <span className="tag tag-outline">{t.periode}</span>
          <span className="tag tag-accent">{t.procede}</span>
          <span className="tag tag-neutral">
            <i className="ph ph-map-pin" style={{ fontSize: 11, marginRight: 4 }} />
            {t.region}
          </span>
        </div>

        <h1 className={styles.h1}>{t.name}</h1>
        <p className={styles.resume}>{t.resume}</p>
      </div>

      {/* Corps 2 colonnes */}
      <div className={styles.body}>
        {/* Colonne gauche */}
        <div>
          <CoupeAnnotee annotations={t.annotations} />
          <ProcedeSections sections={t.sections} />
        </div>

        {/* Colonne droite sticky */}
        <div className={styles.sidebar}>
          <SidebarIdentite identite={t.identite} materiaux={t.materiaux} />
        </div>
      </div>
    </div>
  )
}
