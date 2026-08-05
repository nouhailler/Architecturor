import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin } from '@phosphor-icons/react'
import { CATEGORIES_MAP, TYPOLOGIES_MAP } from '../../data/typologies'
import { useApp } from '../../context/AppContext'
import { useCustomTypologies } from '../../utils/customTypologies'
import CoupeAnnotee from './CoupeAnnotee'
import ProcedeSections from './ProcedeSections'
import SidebarIdentite from './SidebarIdentite'
import styles from './FicheDetail.module.css'

export default function FicheDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setOpen, goToFilteredCatalogue } = useApp()
  const customTypologies = useCustomTypologies()
  const t = id ? (TYPOLOGIES_MAP[id] ?? customTypologies.find((c) => c.id === id) ?? null) : null
  const isImported = Boolean(t && !(t.id in TYPOLOGIES_MAP))

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

  const categorie = CATEGORIES_MAP[t.categorie]

  return (
    <div className={styles.wrap} style={{ animation: 'bfade .3s ease' }}>
      {/* En-tête */}
      <div className={styles.header}>
        <button className="btn btn-ghost" onClick={() => { navigate('/catalogue'); window.scrollTo(0, 0) }} style={{ fontSize: 13, marginBottom: 16 }}>
          <ArrowLeft size={14} />
          Catalogue
        </button>

        <div className={styles.tags}>
          {categorie && (
            <button
              type="button"
              className={`tag tag-outline ${styles.tagClickable}`}
              onClick={() => goToFilteredCatalogue({ categorie: [t.categorie] })}
              title="Voir les typologies de cette catégorie"
            >
              {categorie.emoji} {categorie.label}
            </button>
          )}
          <button
            type="button"
            className={`tag tag-outline ${styles.tagClickable}`}
            onClick={() => goToFilteredCatalogue({ periode: [...t.periodeTags] })}
            title="Voir les typologies de la même période"
          >
            {t.periode}
          </button>
          <button
            type="button"
            className={`tag tag-accent ${styles.tagClickable}`}
            onClick={() => goToFilteredCatalogue({ procede: [t.procede] })}
            title="Voir les typologies du même procédé"
          >
            {t.procede}
          </button>
          <button
            type="button"
            className={`tag tag-neutral ${styles.tagClickable}`}
            onClick={() => goToFilteredCatalogue({ region: [t.region] })}
            title="Voir les typologies de la même région"
          >
            <MapPin size={11} style={{ marginRight: 4 }} />
            {t.region}
          </button>
          {isImported && <span className="tag tag-accent">Importée localement</span>}
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
          <SidebarIdentite
            typologie={t}
            identite={categorie ? [['Catégorie', `${categorie.emoji} ${categorie.label}`], ...t.identite] : t.identite}
            materiaux={t.materiaux}
            technique={t}
            wikipediaUrl={t.wikipediaUrl}
            commonsUrl={t.commonsUrl}
            images={t.images}
            name={t.name}
          />
        </div>
      </div>
    </div>
  )
}
