import { ArrowCircleRight, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { useUpdate } from '../../lib/useUpdate'
import styles from './UpdateBanner.module.css'

/**
 * Apparaît quand un nouveau build s'est installé et attend. Un clic l'applique,
 * parce que l'alternative — rouvrir l'app et espérer — est précisément le
 * problème que ce système résout.
 */
export default function UpdateBanner() {
  const { ready, apply } = useUpdate()
  const [dismissed, setDismissed] = useState(false)

  if (!ready || dismissed) return null

  return (
    <div className={styles.banner} role="status">
      <ArrowCircleRight size={20} weight="fill" className={styles.icon} />
      <span className={styles.label}>Nouvelle version disponible</span>
      <button type="button" className={styles.action} onClick={apply}>
        Mettre à jour
      </button>
      <button
        type="button"
        className={styles.dismiss}
        onClick={() => setDismissed(true)}
        aria-label="Masquer"
        title="Plus tard — la mise à jour reste disponible dans le pied de page"
      >
        <X size={14} />
      </button>
    </div>
  )
}
