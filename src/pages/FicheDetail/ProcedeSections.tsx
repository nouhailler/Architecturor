import { useApp } from '../../context/AppContext'
import type { Section } from '../../data/typologies'
import styles from './ProcedeSections.module.css'

export default function ProcedeSections({ sections }: { sections: Section[] }) {
  const { open, toggleSection } = useApp()

  return (
    <div>
      <div className={styles.sectionLabel}>Procédé de construction</div>
      <div className={styles.list}>
        {sections.map((s, i) => {
          const isOpen = !!open[i]
          return (
            <div key={i} className={styles.item}>
              <button
                className={styles.header}
                onClick={() => toggleSection(i)}
                aria-expanded={isOpen}
              >
                <i className={s.icon} style={{ fontSize: 17, color: 'var(--color-accent-300)', flexShrink: 0 }} />
                <div className={styles.title}>{s.title}</div>
                <i
                  className={isOpen ? 'ph ph-caret-up' : 'ph ph-caret-down'}
                  style={{ fontSize: 15, color: 'var(--color-neutral-500)', flexShrink: 0 }}
                />
              </button>

              {isOpen && (
                <div className={styles.body}>
                  {s.intro && <p className={styles.intro}>{s.intro}</p>}
                  {s.groups.map((g, gi) => (
                    <div key={gi}>
                      {g.lead && <div className={styles.lead}>{g.lead}</div>}
                      <ul className={styles.ul}>
                        {g.items.map((it, ii) => (
                          <li key={ii} className={styles.li}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {s.outro && <p className={styles.outro}>{s.outro}</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
