import type { Annotation } from '../../data/typologies'
import styles from './CoupeAnnotee.module.css'

export default function CoupeAnnotee({ annotations }: { annotations: Annotation[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>Coupe schématique annotée</div>
      <div className={styles.grid}>
        {/* SVG générique — remplacer par un relevé réel si disponible */}
        <svg viewBox="0 0 320 400" style={{ width: '100%', height: 'auto' }}>
          {/* Sol */}
          <line x1="0" y1="310" x2="320" y2="310" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
          {/* Fondations */}
          <polygon points="65,310 255,310 240,355 80,355" fill="var(--color-neutral-900)" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
          <path d="M65 355 L80 310 M120 355 L128 310 M175 355 L172 310 M225 355 L216 310" stroke="var(--color-neutral-700)" strokeWidth="1" opacity={0.7} />
          {/* Mur porteur */}
          <rect x="80" y="120" width="160" height="190" fill="color-mix(in srgb, var(--color-accent) 6%, var(--color-neutral-900))" stroke="var(--color-neutral-500)" strokeWidth="1.6" />
          {/* Toit */}
          <polygon points="74,120 160,68 246,120" fill="color-mix(in srgb, var(--color-accent) 18%, var(--color-neutral-900))" stroke="var(--color-neutral-500)" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Fenêtre toiture */}
          <rect x="200" y="80" width="13" height="26" fill="var(--color-neutral-800)" stroke="var(--color-neutral-600)" strokeWidth="1" />
          {/* Planchers */}
          <line x1="80" y1="170" x2="240" y2="170" stroke="var(--color-neutral-600)" strokeWidth="1.3" />
          <line x1="80" y1="215" x2="240" y2="215" stroke="var(--color-neutral-600)" strokeWidth="1.3" />
          <line x1="80" y1="260" x2="240" y2="260" stroke="var(--color-neutral-600)" strokeWidth="1.3" />
          {/* Fenêtres */}
          <rect x="98" y="135" width="20" height="24" fill="var(--color-neutral-800)" stroke="var(--color-neutral-600)" />
          <rect x="150" y="182" width="20" height="24" fill="var(--color-neutral-800)" stroke="var(--color-neutral-600)" />
          <rect x="98" y="227" width="20" height="24" fill="var(--color-neutral-800)" stroke="var(--color-neutral-600)" />
          {/* Escalier */}
          <rect x="146" y="278" width="26" height="32" fill="var(--color-neutral-800)" stroke="var(--color-neutral-600)" />
          <polyline points="196,308 196,290 210,290 210,272 196,272" fill="none" stroke="var(--color-accent-400)" strokeWidth="1.4" opacity={0.8} />
          {/* Lignes de rappel */}
          <g stroke="var(--color-accent)" strokeWidth="1" opacity={0.55}>
            <line x1="200" y1="93" x2="268" y2="80" />
            <line x1="80" y1="150" x2="44" y2="150" />
            <line x1="80" y1="215" x2="44" y2="238" />
            <line x1="240" y1="150" x2="276" y2="150" />
            <line x1="203" y1="285" x2="276" y2="250" />
            <line x1="90" y1="335" x2="44" y2="340" />
          </g>
          {/* Pastilles numérotées */}
          <g fontSize="15" fontFamily="var(--font-heading)" fontWeight="600">
            <circle cx="278" cy="80"  r="13" fill="var(--color-accent)" /><text x="278" y="85"  textAnchor="middle" fill="var(--color-bg)">1</text>
            <circle cx="34"  cy="150" r="13" fill="var(--color-accent)" /><text x="34"  y="155" textAnchor="middle" fill="var(--color-bg)">2</text>
            <circle cx="34"  cy="238" r="13" fill="var(--color-accent)" /><text x="34"  y="243" textAnchor="middle" fill="var(--color-bg)">3</text>
            <circle cx="286" cy="150" r="13" fill="var(--color-accent)" /><text x="286" y="155" textAnchor="middle" fill="var(--color-bg)">4</text>
            <circle cx="286" cy="250" r="13" fill="var(--color-accent)" /><text x="286" y="255" textAnchor="middle" fill="var(--color-bg)">5</text>
            <circle cx="34"  cy="340" r="13" fill="var(--color-accent)" /><text x="34"  y="345" textAnchor="middle" fill="var(--color-bg)">6</text>
          </g>
        </svg>

        {/* Annotations */}
        <div className={styles.annotations}>
          {annotations.map((a) => (
            <div key={a.n} className={styles.annotation}>
              <div className={styles.annotationNum}>{a.n}</div>
              <div>
                <div className={styles.annotationEl}>{a.el}</div>
                <div className={styles.annotationTxt}>{a.txt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
