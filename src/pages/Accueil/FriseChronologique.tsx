import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FriseChronologique.module.css'

/* Année de départ et durée totale de la frise */
const START = 1400
const SPAN  = 600 // 1400 → 2000

const toPercent = (year: number) => `${((year - START) / SPAN) * 100}%`
const toWidth   = (from: number, to: number) => `${((to - from) / SPAN) * 100}%`

const LANES = [
  { id: 'alsacienne',      label: 'Maison alsacienne',    from: 1450, to: 1850, accent: false },
  { id: 'panbois',         label: 'Pan de bois',          from: 1450, to: 1650, accent: false },
  { id: 'perigourdine',    label: 'Maison périgourdine',  from: 1500, to: 1900, accent: false },
  { id: 'labourdine',      label: 'Maison basque',        from: 1600, to: 1850, accent: false },
  { id: 'mas',             label: 'Mas provençal',        from: 1600, to: 1850, accent: false },
  { id: 'comtoise',        label: 'Maison comtoise',      from: 1600, to: 1900, accent: false },
  { id: 'bressane',        label: 'Ferme bressane',       from: 1600, to: 1900, accent: false },
  { id: 'bourbonnaise',    label: 'Ferme bourbonnaise',   from: 1600, to: 1900, accent: false },
  { id: 'fermenormande',   label: 'Ferme normande',       from: 1600, to: 1900, accent: false },
  { id: 'auvergnate',      label: 'Ferme auvergnate',     from: 1600, to: 1900, accent: false },
  { id: 'cevenole',        label: 'Maison cévenole',      from: 1600, to: 1900, accent: false },
  { id: 'quercynoise',     label: 'Maison quercynoise',   from: 1600, to: 1900, accent: false },
  { id: 'charentaise',     label: 'Maison charentaise',   from: 1600, to: 1900, accent: false },
  { id: 'landaise',        label: 'Maison landaise',      from: 1600, to: 1900, accent: false },
  { id: 'bearnaise',       label: 'Maison béarnaise',     from: 1600, to: 1900, accent: false },
  { id: 'lorraine',        label: 'Maison lorraine',      from: 1600, to: 1900, accent: false },
  { id: 'savoyarde',       label: 'Maison savoyarde',     from: 1600, to: 1950, accent: false },
  { id: 'longerevendeenne', label: 'Longère vendéenne',   from: 1600, to: 1900, accent: false },
  { id: 'longere',         label: 'Longère bretonne',     from: 1700, to: 1900, accent: false },
  { id: 'solognote',       label: 'Maison solognote',     from: 1700, to: 1900, accent: false },
  { id: 'beauceronne',     label: 'Ferme beauceronne',    from: 1700, to: 1950, accent: false },
  { id: 'jurassienne',     label: 'Maison jurassienne',   from: 1700, to: 1950, accent: false },
  { id: 'vosgienne',       label: 'Maison vosgienne',     from: 1700, to: 1950, accent: false },
  { id: 'buron',           label: 'Buron',                from: 1700, to: 1950, accent: false },
  { id: 'mazet',           label: 'Mazet cévenol',        from: 1700, to: 1900, accent: false },
  { id: 'borie',           label: 'Borie',                from: 1700, to: 1900, accent: false },
  { id: 'capitelle',       label: 'Capitelle',            from: 1700, to: 1900, accent: false },
  { id: 'echoppe',         label: 'Échoppe bordelaise',   from: 1730, to: 1914, accent: false },
  { id: 'chalet',          label: 'Chalet savoyard',      from: 1750, to: 1900, accent: false },
  { id: 'coron',           label: 'Coron minier',         from: 1825, to: 1914, accent: false },
  { id: 'haussmann',       label: 'Haussmannien',         from: 1853, to: 1870, accent: true  },
  { id: 'artdeco',         label: 'Art déco',             from: 1920, to: 1935, accent: false },
  { id: 'grandensemble',   label: 'Grand ensemble',       from: 1953, to: 1975, accent: false },
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
