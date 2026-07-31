import styles from './SidebarIdentite.module.css'

interface Props {
  identite: [string, string][]
  materiaux: string[]
}

export default function SidebarIdentite({ identite, materiaux }: Props) {
  return (
    <>
      {/* Fiche d'identité */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Fiche d'identité</div>
        <div className={styles.identiteList}>
          {identite.map(([k, v]) => (
            <div key={k} className={styles.row}>
              <div className={styles.key}>{k}</div>
              <div className={styles.value}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Matériaux */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Matériaux caractéristiques</div>
        <div className={styles.tags}>
          {materiaux.map((m) => (
            <span key={m} className="tag tag-neutral">{m}</span>
          ))}
        </div>
      </div>

      {/* Galerie — placeholders à remplacer par de vraies images */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.cardLabel} style={{ margin: '4px 6px 12px' }}>Imagerie de référence</div>
        <div className={styles.gallery}>
          {/* TODO: remplacer ces placeholders par <img src="..." /> */}
          <div className={styles.galleryThumb}>
            <i className="ph ph-image" style={{ fontSize: 22, color: 'var(--color-neutral-600)' }} />
          </div>
          <div className={styles.galleryThumb}>
            <i className="ph ph-image" style={{ fontSize: 22, color: 'var(--color-neutral-600)' }} />
          </div>
        </div>
        <div className={styles.galleryNote}>Emplacements à compléter avec photos, plans ou relevés.</div>
      </div>
    </>
  )
}
