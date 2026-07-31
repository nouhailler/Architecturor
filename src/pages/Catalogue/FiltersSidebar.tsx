import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useApp, type Filters } from '../../context/AppContext'
import { CATEGORIES_MAP, type Typologie } from '../../data/typologies'
import styles from './FiltersSidebar.module.css'

const PERIODE_CHIPS = ['Avant 1800', 'XIXe', 'XXe']

function uniq<T>(arr: T[]): T[] {
  return arr.filter((v, i) => arr.indexOf(v) === i)
}

const defaultChipLabel = (val: string) => val
const categorieChipLabel = (val: string) => {
  const c = CATEGORIES_MAP[val]
  return c ? `${c.emoji} ${c.label}` : val
}

export default function FiltersSidebar({ typologies }: { typologies: Typologie[] }) {
  const { q, setQ, filters, toggleFilter, clearAll } = useApp()

  const groups: { label: string; key: keyof Filters; chips: string[]; chipLabel: (val: string) => string }[] = [
    { label: 'Catégorie',               key: 'categorie', chips: uniq(typologies.map((t) => t.categorie)), chipLabel: categorieChipLabel },
    { label: 'Procédé de construction', key: 'procede',   chips: uniq(typologies.map((t) => t.procede)),   chipLabel: defaultChipLabel },
    { label: "Type d'usage",            key: 'usage',     chips: uniq(typologies.map((t) => t.usage)),     chipLabel: defaultChipLabel },
    { label: 'Période',                 key: 'periode',   chips: PERIODE_CHIPS,                            chipLabel: defaultChipLabel },
  ]

  const hasFilters = q || filters.procede.length || filters.usage.length || filters.periode.length || filters.categorie.length

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
                  {grp.chipLabel(val)}
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
