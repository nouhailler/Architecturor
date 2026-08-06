import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image, MapPin } from '@phosphor-icons/react'
import { CATEGORIES_MAP, TYPOLOGIES_MAP, type Typologie } from '../../data/typologies'
import { commonsFilePath } from '../../utils/commons'
import styles from './TypologieCard.module.css'

export default function TypologieCard({ typologie: t }: { typologie: Typologie }) {
  const navigate = useNavigate()
  const categorie = CATEGORIES_MAP[t.categorie]
  const isImported = !(t.id in TYPOLOGIES_MAP)
  const [imageFailed, setImageFailed] = useState(false)
  const thumbImage = t.images[0]

  const handleClick = () => {
    navigate(`/typologie/${t.id}`)
    window.scrollTo(0, 0)
  }

  return (
    <button className={styles.card} onClick={handleClick}>
      <div className={styles.thumb}>
        {thumbImage && !imageFailed ? (
          <img
            className={styles.thumbImage}
            src={commonsFilePath(thumbImage, 400)}
            alt={t.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Image size={26} color="var(--color-neutral-600)" />
        )}
        <span className={styles.periodeBadge}>{t.periode}</span>
        {isImported && <span className={styles.importedBadge}>Importée</span>}
      </div>

      <div className={styles.body}>
        <div>
          <div className={styles.name}>{t.name}</div>
          <div className={styles.region}>
            <MapPin size={12} /> {t.region}
          </div>
        </div>
        <p className={styles.resume}>{t.resume}</p>
        <div className={styles.tags}>
          {categorie && <span className="tag tag-outline">{categorie.emoji} {categorie.label}</span>}
          <span className="tag tag-accent">{t.procede}</span>
          <span className="tag tag-neutral">{t.usage}</span>
        </div>
      </div>
    </button>
  )
}
