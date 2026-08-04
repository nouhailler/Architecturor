import { FunnelX, X } from '@phosphor-icons/react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES_MAP, TYPOLOGIES } from '../../data/typologies'
import { useCustomTypologies } from '../../utils/customTypologies'
import FiltersSidebar from './FiltersSidebar'
import TypologieCard from './TypologieCard'
import styles from './Catalogue.module.css'

export default function Catalogue() {
  const { q, filters, identiteMatch, clearIdentiteMatch, toggleFilter } = useApp()
  const customTypologies = useCustomTypologies()
  const allTypologies = customTypologies.length > 0 ? [...TYPOLOGIES, ...customTypologies] : TYPOLOGIES

  const filtered = allTypologies.filter((t) => {
    if (filters.categorie.length && !filters.categorie.includes(t.categorie)) return false
    if (filters.procede.length && !filters.procede.includes(t.procede)) return false
    if (filters.usage.length && !filters.usage.includes(t.usage)) return false
    if (filters.periode.length && !t.periodeTags.some((x) => filters.periode.includes(x))) return false
    if (filters.region.length && !filters.region.includes(t.region)) return false
    if (identiteMatch && !t.identite.some(([k, v]) => k === identiteMatch.key && v === identiteMatch.value)) return false
    if (q.trim()) {
      const categorieLabel = CATEGORIES_MAP[t.categorie]?.label ?? ''
      const hay = `${t.name} ${t.region} ${t.procede} ${t.usage} ${t.resume} ${categorieLabel}`.toLowerCase()
      if (!hay.includes(q.trim().toLowerCase())) return false
    }
    return true
  })

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Catalogue des typologies</h1>
      <p className={styles.sub}>Filtrez par catégorie, procédé de construction, usage ou période.</p>

      <div className={styles.layout}>
        <FiltersSidebar typologies={allTypologies} />

        <div>
          {(filters.region.length > 0 || identiteMatch) && (
            <div className={styles.activeFilters}>
              {filters.region.map((r) => (
                <span key={r} className={styles.activeFilterChip}>
                  Région : {r}
                  <button onClick={() => toggleFilter('region', r)} aria-label="Retirer ce filtre">
                    <X size={11} weight="bold" />
                  </button>
                </span>
              ))}
              {identiteMatch && (
                <span className={styles.activeFilterChip}>
                  {identiteMatch.key} : {identiteMatch.value}
                  <button onClick={clearIdentiteMatch} aria-label="Retirer ce filtre">
                    <X size={11} weight="bold" />
                  </button>
                </span>
              )}
            </div>
          )}
          <div className={styles.count}>{filtered.length} typologie(s)</div>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <FunnelX size={30} />
              <div style={{ marginTop: 10, fontSize: 14 }}>Aucune typologie ne correspond à ces filtres.</div>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((t) => (
                <TypologieCard key={t.id} typologie={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
