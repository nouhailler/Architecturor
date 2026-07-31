import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useApp, type Filters } from '../../context/AppContext'
import type { Typologie } from '../../data/typologies'
import styles from './FiltersSidebar.module.css'

const PERIODE_CHIPS = ['Avant 1800', 'XIXe', 'XXe']

function uniq<T>(arr: T[]): T[] {
  return arr.filter((v, i) => arr.indexOf(v) === i)
}

export default function FiltersSidebar({ typologies }: { typologies: Typologie[] }) {
  const { q, setQ, filters, toggleFilter, clearAll } = useApp()

  const groups: { label: string; key: keyof Filters; chips: string[] }[] = [
    { label: 'Procédé de construction', key: 'procede', chips: uniq(typologies.map((t) => t.procede)) },
    { label: "Type d'usage",            key: 'usage',   chips: uniq(typologies.map((t) => t.usage)) },
    { label: 'Période',                 key: 'periode', chips: PERIODE_CHIPS },
  ]

  const hasFilters = q || filters.procede.length || filters.usage.length || filters.periode.length

  return (
    <div className={styles.sidebar}>
      {/* Recherche */}
      <div className={styles.searchWrap}>
        <MagnifyingGlass size={15} color="var(--color-neutral-500)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          className="input"
          style={{ paddingLeft: 32 }}
          placeholder="Rechercher…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Groupes de chips */}
      {groups.map((grp) => (
        <div key={grp.key} className={styles.group}>
          <div className={styles.groupLabel}>{grp.label}</div>
          <div className={styles.chips}>
            {grp.chips.map((val) => {
              const active = filters[grp.key].includes(val)
              return (
                <button
                  key={val}
                  onClick={() => toggleFilter(grp.key, val)}
                  className={`${styles.chip} ${active ? styles.chipActive : styles.chipInactive}`}
                >
                  {val}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Reset */}
      {hasFilters && (
        <button className="btn btn-ghost" onClick={clearAll} style={{ fontSize: '12.5px', marginTop: 4 }}>
          <X size={14} />
          Réinitialiser
        </button>
      )}
    </div>
  )
}
