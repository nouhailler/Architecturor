import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FriseChronologique.module.css'

/* Année de départ et durée totale de la frise */
const START = 1000
const SPAN  = 1000 // 1000 → 2000

const toPercent = (year: number) => `${((year - START) / SPAN) * 100}%`
const toWidth   = (from: number, to: number) => `${((to - from) / SPAN) * 100}%`

const LANES = [
  { id: 'egliseromane',    label: 'Église romane',        from: 1000, to: 1200, accent: false },
  { id: 'abbaye',          label: 'Abbaye',               from: 1000, to: 1789, accent: false },
  { id: 'monastere',       label: 'Monastère',            from: 1000, to: 1800, accent: false },
  { id: 'prieure',         label: 'Prieuré',              from: 1000, to: 1500, accent: false },
  { id: 'cloitre',         label: 'Cloître',              from: 1000, to: 1500, accent: false },
  { id: 'eglisegothique',  label: 'Église gothique',      from: 1140, to: 1500, accent: false },
  { id: 'cathedralegothique', label: 'Cathédrale gothique', from: 1150, to: 1550, accent: false },
  { id: 'chapellerurale',  label: 'Chapelle rurale',      from: 1200, to: 1900, accent: false },
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
  { id: 'hotelparticulier', label: 'Hôtel particulier',   from: 1600, to: 1900, accent: false },
  { id: 'longere',         label: 'Longère bretonne',     from: 1700, to: 1900, accent: false },
  { id: 'solognote',       label: 'Maison solognote',     from: 1700, to: 1900, accent: false },
  { id: 'beauceronne',     label: 'Ferme beauceronne',    from: 1700, to: 1950, accent: false },
  { id: 'jurassienne',     label: 'Maison jurassienne',   from: 1700, to: 1950, accent: false },
  { id: 'vosgienne',       label: 'Maison vosgienne',     from: 1700, to: 1950, accent: false },
  { id: 'buron',           label: 'Buron',                from: 1700, to: 1950, accent: false },
  { id: 'mazet',           label: 'Mazet cévenol',        from: 1700, to: 1900, accent: false },
  { id: 'borie',           label: 'Borie',                from: 1700, to: 1900, accent: false },
  { id: 'capitelle',       label: 'Capitelle',            from: 1700, to: 1900, accent: false },
  { id: 'maisondeville18e', label: 'Maison de ville XVIIIe', from: 1700, to: 1800, accent: false },
  { id: 'canutlyonnais',   label: 'Canut lyonnais',       from: 1700, to: 1900, accent: false },
  { id: 'maisontoulousaine', label: 'Maison toulousaine', from: 1700, to: 1900, accent: false },
  { id: 'echoppe',         label: 'Échoppe bordelaise',   from: 1730, to: 1914, accent: false },
  { id: 'chalet',          label: 'Chalet savoyard',      from: 1750, to: 1900, accent: false },
  { id: 'maisonbourgeoise', label: 'Maison bourgeoise',   from: 1800, to: 1900, accent: false },
  { id: 'maisonouvriere',  label: 'Maison ouvrière',      from: 1800, to: 1900, accent: false },
  { id: 'maisonnantaise',  label: 'Maison nantaise',      from: 1800, to: 1900, accent: false },
  { id: 'templeprotestant', label: 'Temple protestant',   from: 1800, to: 1900, accent: false },
  { id: 'synagogue',       label: 'Synagogue',            from: 1800, to: 1914, accent: false },
  { id: 'coron',           label: 'Coron minier',         from: 1825, to: 1914, accent: false },
  { id: 'haussmann',       label: 'Haussmannien',         from: 1853, to: 1870, accent: true  },
  { id: 'basilique',       label: 'Basilique',            from: 1870, to: 1930, accent: false },
  { id: 'artnouveau',      label: 'Art nouveau',          from: 1890, to: 1914, accent: false },
  { id: 'artdeco',         label: 'Art déco',             from: 1920, to: 1935, accent: false },
  { id: 'annees30',        label: 'Immeuble années 30',   from: 1925, to: 1939, accent: false },
  { id: 'maisonidf',       label: 'Maison Île-de-France', from: 1950, to: 2000, accent: false },
  { id: 'grandensemble',   label: 'Grand ensemble',       from: 1953, to: 1975, accent: false },
  { id: 'barrehlm',        label: 'Barre HLM',            from: 1955, to: 1975, accent: false },
  { id: 'tourhlm',         label: 'Tour HLM',             from: 1960, to: 1980, accent: false },
  { id: 'pavillonphenix',  label: 'Pavillon Phénix',      from: 1970, to: 1995, accent: false },
  { id: 'mosqueecontemporaine', label: 'Mosquée contemporaine', from: 1980, to: 2010, accent: false },
] as const

const TICKS = [1000, 1200, 1400, 1600, 1800, 2000]

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
