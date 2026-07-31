import { useNavigate } from 'react-router-dom'
import { Image, MapPin } from '@phosphor-icons/react'
import type { Typologie } from '../../data/typologies'
import styles from './TypologieCard.module.css'

export default function TypologieCard({ typologie: t }: { typologie: Typologie }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/typologie/${t.id}`)
    window.scrollTo(0, 0)
  }

  return (
    <button className={styles.card} onClick={handleClick}>
      {/* TODO: remplacer ce placeholder par <img src="..." alt={t.name} /> */}
      <div className={styles.thumb}>
        <Image size={26} color="var(--color-neutral-600)" />
        <span className={styles.periodeBadge}>{t.periode}</span>
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
          <span className="tag tag-accent">{t.procede}</span>
          <span className="tag tag-neutral">{t.usage}</span>
        </div>
      </div>
    </button>
  )
}
