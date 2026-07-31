import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FriseChronologique.module.css'

/* Année de départ et durée totale de la frise */
const START = 1400
const SPAN  = 600 // 1400 → 2000

const toPercent = (year: number) => `${((year - START) / SPAN) * 100}%`
const toWidth   = (from: number, to: number) => `${((to - from) / SPAN) * 100}%`

const LANES = [
  { id: 'panbois',       label: 'Pan de bois',    from: 1450, to: 1650, accent: false },
  { id: 'mas',           label: 'Mas provençal',  from: 1600, to: 1850, accent: false },
  { id: 'coron',         label: 'Coron minier',   from: 1825, to: 1914, accent: false },
  { id: 'haussmann',     label: 'Haussmannien',   from: 1853, to: 1870, accent: true  },
  { id: 'grandensemble', label: 'Grand ensemble', from: 1953, to: 1975, accent: false },
] as const

const TICKS = [1400, 1500, 1600, 1700, 1800, 1900, 2000]

export default function FriseChronologique() {
  const navigate = useNavigate()

  const handleLane = (id: string) => {
    navigate(`/typologie/${id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.surface}>
      <div className={styles.grid}>
        {/* Axe temporel */}
        <div />
        <div className={styles.axis}>
          {TICKS.map((year) => (
            <span
              key={year}
              className={styles.tick}
              style={{ left: year === 2000 ? 'auto' : toPercent(year), right: year === 2000 ? 0 : 'auto' }}
            >
              {year}
            </span>
          ))}
        </div>

        {/* Lanes */}
        {LANES.map((lane, i) => (
          <Fragment key={lane.id}>
            <div className={styles.laneLabel}>
              {lane.label}
            </div>
            <div
              className={`${styles.track} ${i < LANES.length - 1 ? styles.trackBorder : ''}`}
              onClick={() => handleLane(lane.id)}
            >
              <div
                className={`${styles.bar} ${lane.accent ? styles.barAccent : styles.barMuted}`}
                style={{ left: toPercent(lane.from), width: toWidth(lane.from, lane.to) }}
              >
                {lane.from}–{String(lane.to).slice(2)}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
