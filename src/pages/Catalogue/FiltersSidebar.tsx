import { useMemo, useState } from 'react'
import { CaretDown, CaretUp, MagnifyingGlass, X } from '@phosphor-icons/react'
import { useApp, type Filters } from '../../context/AppContext'
import { CATEGORIES_MAP, type Typologie } from '../../data/typologies'
import { PROCEDE_FAMILLES, USAGE_FAMILLES, familleProcede, familleUsage, type Famille } from '../../data/groupes'
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
  const { q, setQ, filters, toggleFilter, clearAll, identiteMatch } = useApp()
  const [openFamilies, setOpenFamilies] = useState<Set<string>>(new Set())

  const toggleFamily = (id: string) => {
    setOpenFamilies((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const categorieGroup = { label: 'Catégorie', key: 'categorie' as const, chips: uniq(typologies.map((t) => t.categorie)), chipLabel: categorieChipLabel }
  const periodeGroup = { label: 'Période', key: 'periode' as const, chips: PERIODE_CHIPS, chipLabel: defaultChipLabel }

  // Le procédé de construction (120 valeurs) et le type d'usage (147 valeurs)
  // sont bien trop nombreux pour une liste de chips à plat : on les regroupe
  // en familles thématiques (accordéons repliables), qui contiennent les
  // valeurs exactes en tant que chips.
  const procedeFamilyChips = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const val of uniq(typologies.map((t) => t.procede))) {
      const fam = familleProcede(val)
      map.set(fam, [...(map.get(fam) ?? []), val])
    }
    return map
  }, [typologies])

  const usageFamilyChips = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const val of uniq(typologies.map((t) => t.usage))) {
      const fam = familleUsage(val)
      map.set(fam, [...(map.get(fam) ?? []), val])
    }
    return map
  }, [typologies])

  const hasFilters = Boolean(
    q || filters.procede.length || filters.usage.length || filters.periode.length || filters.categorie.length
    || filters.region.length || identiteMatch,
  )

  const renderFlatGroup = (grp: { label: string; key: keyof Filters; chips: string[]; chipLabel: (val: string) => string }) => (
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
  )

  const renderFamilyGroup = (label: string, key: keyof Filters, familles: Famille[], familyChips: Map<string, string[]>) => (
    <div className={styles.group}>
      <div className={styles.groupLabel}>{label}</div>
      {familles
        .filter((f) => (familyChips.get(f.id)?.length ?? 0) > 0)
        .map((f) => {
          const chips = familyChips.get(f.id) ?? []
          const activeCount = chips.filter((v) => filters[key].includes(v)).length
          const open = openFamilies.has(`${key}:${f.id}`) || activeCount > 0
          return (
            <div key={f.id} className={styles.familyBlock}>
              <button
                type="button"
                className={styles.familyHeader}
                onClick={() => toggleFamily(`${key}:${f.id}`)}
                aria-expanded={open}
              >
                <span>{f.label}</span>
                <span className={styles.familyHeaderRight}>
                  <span className={styles.familyCount}>
                    {activeCount > 0 ? `${activeCount}/${chips.length}` : chips.length}
                  </span>
                  {open ? <CaretUp size={13} /> : <CaretDown size={13} />}
                </span>
              </button>
              {open && (
                <div className={`${styles.chips} ${styles.familyChips}`}>
                  {chips.map((val) => {
                    const active = filters[key].includes(val)
                    return (
                      <button
                        key={val}
                        onClick={() => toggleFilter(key, val)}
                        className={`${styles.chip} ${active ? styles.chipActive : styles.chipInactive}`}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
    </div>
  )

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
      {renderFlatGroup(categorieGroup)}
      {renderFamilyGroup('Procédé de construction', 'procede', PROCEDE_FAMILLES, procedeFamilyChips)}
      {renderFamilyGroup("Type d'usage", 'usage', USAGE_FAMILLES, usageFamilyChips)}
      {renderFlatGroup(periodeGroup)}

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
