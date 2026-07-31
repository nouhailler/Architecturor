import { useApp } from '../../context/AppContext'
import { TYPOLOGIES } from '../../data/typologies'
import FiltersSidebar from './FiltersSidebar'
import TypologieCard from './TypologieCard'
import styles from './Catalogue.module.css'

export default function Catalogue() {
  const { q, filters } = useApp()

  const filtered = TYPOLOGIES.filter((t) => {
    if (filters.procede.length && !filters.procede.includes(t.procede)) return false
    if (filters.usage.length && !filters.usage.includes(t.usage)) return false
    if (filters.periode.length && !t.periodeTags.some((x) => filters.periode.includes(x))) return false
    if (q.trim()) {
      const hay = `${t.name} ${t.region} ${t.procede} ${t.usage} ${t.resume}`.toLowerCase()
      if (!hay.includes(q.trim().toLowerCase())) return false
    }
    return true
  })

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Catalogue des typologies</h1>
      <p className={styles.sub}>Filtrez par procédé de construction, usage ou période.</p>

      <div className={styles.layout}>
        <FiltersSidebar typologies={TYPOLOGIES} />

        <div>
          <div className={styles.count}>{filtered.length} typologie(s)</div>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <i className="ph ph-funnel-x" style={{ fontSize: 30 }} />
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
