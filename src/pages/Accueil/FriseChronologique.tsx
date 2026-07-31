import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FriseChronologique.module.css'

/* Année de départ et durée totale de la frise */
const START = 900
const SPAN  = 1100 // 900 → 2000

const toPercent = (year: number) => `${((year - START) / SPAN) * 100}%`
const toWidth   = (from: number, to: number) => `${((to - from) / SPAN) * 100}%`

const LANES = [
  { id: 'donjon',          label: 'Donjon',               from: 950,  to: 1350, accent: false },
  { id: 'moulineau',       label: 'Moulin à eau',         from: 1000, to: 1900, accent: false },
  { id: 'egliseromane',    label: 'Église romane',        from: 1000, to: 1200, accent: false },
  { id: 'abbaye',          label: 'Abbaye',               from: 1000, to: 1789, accent: false },
  { id: 'monastere',       label: 'Monastère',            from: 1000, to: 1800, accent: false },
  { id: 'prieure',         label: 'Prieuré',              from: 1000, to: 1500, accent: false },
  { id: 'cloitre',         label: 'Cloître',              from: 1000, to: 1500, accent: false },
  { id: 'chateaufort',     label: 'Château fort',         from: 1000, to: 1500, accent: false },
  { id: 'tourmedievale',   label: 'Tour médiévale',       from: 1100, to: 1500, accent: false },
  { id: 'eglisegothique',  label: 'Église gothique',      from: 1140, to: 1500, accent: false },
  { id: 'cathedralegothique', label: 'Cathédrale gothique', from: 1150, to: 1550, accent: false },
  { id: 'chapellerurale',  label: 'Chapelle rurale',      from: 1200, to: 1900, accent: false },
  { id: 'bastidefortifiee', label: 'Bastide fortifiée',   from: 1220, to: 1370, accent: false },
  { id: 'moulinvent',      label: 'Moulin à vent',        from: 1200, to: 1900, accent: false },
  { id: 'grange',          label: 'Grange',               from: 1400, to: 1900, accent: false },
  { id: 'colombier',       label: 'Colombier',            from: 1400, to: 1789, accent: false },
  { id: 'alsacienne',      label: 'Maison alsacienne',    from: 1450, to: 1850, accent: false },
  { id: 'panbois',         label: 'Pan de bois',          from: 1450, to: 1650, accent: false },
  { id: 'perigourdine',    label: 'Maison périgourdine',  from: 1500, to: 1900, accent: false },
  { id: 'pressoir',        label: 'Pressoir',             from: 1500, to: 1900, accent: false },
  { id: 'fourapain',       label: 'Four à pain',          from: 1500, to: 1900, accent: false },
  { id: 'ossuaire',        label: 'Ossuaire',             from: 1500, to: 1900, accent: false },
  { id: 'forge',           label: 'Forge',                from: 1600, to: 1900, accent: false },
  { id: 'labourdine',      label: 'Maison basque',        from: 1600, to: 1850, accent: false },
  { id: 'mas',             label: 'Mas provençal',        from: 1600, to: 1850, accent: false },
  { id: 'bergerie',        label: 'Bergerie',             from: 1600, to: 1900, accent: false },
  { id: 'pigeonnier',      label: 'Pigeonnier',           from: 1600, to: 1900, accent: false },
  { id: 'etable',          label: 'Étable',               from: 1600, to: 1950, accent: false },
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
  { id: 'mazot',           label: 'Mazot',                from: 1600, to: 1900, accent: false },
  { id: 'savoyarde',       label: 'Maison savoyarde',     from: 1600, to: 1950, accent: false },
  { id: 'longerevendeenne', label: 'Longère vendéenne',   from: 1600, to: 1900, accent: false },
  { id: 'hotelparticulier', label: 'Hôtel particulier',   from: 1600, to: 1900, accent: false },
  { id: 'citadellevauban', label: 'Citadelle Vauban',     from: 1667, to: 1707, accent: false },
  { id: 'manufacture',     label: 'Manufacture',          from: 1660, to: 1790, accent: false },
  { id: 'fortmaritime',    label: 'Fort maritime',        from: 1660, to: 1870, accent: false },
  { id: 'longere',         label: 'Longère bretonne',     from: 1700, to: 1900, accent: false },
  { id: 'distillerie',     label: 'Distillerie',          from: 1700, to: 1950, accent: false },
  { id: 'phare',           label: 'Phare',                from: 1700, to: 1950, accent: false },
  { id: 'cale',            label: 'Cale',                 from: 1700, to: 1950, accent: false },
  { id: 'cabanepecheur',   label: 'Cabane de pêcheur',    from: 1700, to: 1950, accent: false },
  { id: 'fenil',           label: 'Fenil',                from: 1700, to: 1950, accent: false },
  { id: 'solognote',       label: 'Maison solognote',     from: 1700, to: 1900, accent: false },
  { id: 'beauceronne',     label: 'Ferme beauceronne',    from: 1700, to: 1950, accent: false },
  { id: 'jurassienne',     label: 'Maison jurassienne',   from: 1700, to: 1950, accent: false },
  { id: 'vosgienne',       label: 'Maison vosgienne',     from: 1700, to: 1950, accent: false },
  { id: 'buron',           label: 'Buron',                from: 1700, to: 1950, accent: false },
  { id: 'chaletalpage',    label: "Chalet d'alpage",      from: 1700, to: 1950, accent: false },
  { id: 'grangeforaine',   label: 'Grange foraine',       from: 1700, to: 1950, accent: false },
  { id: 'mazet',           label: 'Mazet cévenol',        from: 1700, to: 1900, accent: false },
  { id: 'borie',           label: 'Borie',                from: 1700, to: 1900, accent: false },
  { id: 'capitelle',       label: 'Capitelle',            from: 1700, to: 1900, accent: false },
  { id: 'maisondeville18e', label: 'Maison de ville XVIIIe', from: 1700, to: 1800, accent: false },
  { id: 'caserne',         label: 'Caserne',              from: 1700, to: 1950, accent: false },
  { id: 'canutlyonnais',   label: 'Canut lyonnais',       from: 1700, to: 1900, accent: false },
  { id: 'maisontoulousaine', label: 'Maison toulousaine', from: 1700, to: 1900, accent: false },
  { id: 'hospice',         label: 'Hospice',              from: 1700, to: 1900, accent: false },
  { id: 'echoppe',         label: 'Échoppe bordelaise',   from: 1730, to: 1914, accent: false },
  { id: 'chalet',          label: 'Chalet savoyard',      from: 1750, to: 1900, accent: false },
  { id: 'maisonbourgeoise', label: 'Maison bourgeoise',   from: 1800, to: 1900, accent: false },
  { id: 'chapellefuneraire', label: 'Chapelle funéraire', from: 1800, to: 1950, accent: false },
  { id: 'caveaufamilial',  label: 'Caveau familial',      from: 1800, to: 1980, accent: false },
  { id: 'mausolee',        label: 'Mausolée',             from: 1800, to: 1930, accent: false },
  { id: 'prefecture',      label: 'Préfecture',           from: 1800, to: 1920, accent: false },
  { id: 'tribunal',        label: 'Tribunal',             from: 1800, to: 1930, accent: false },
  { id: 'hopital',         label: 'Hôpital',              from: 1800, to: 1970, accent: false },
  { id: 'prison',          label: 'Prison',               from: 1800, to: 1950, accent: false },
  { id: 'maisongardien',   label: 'Maison de gardien',    from: 1800, to: 1950, accent: false },
  { id: 'semaphore',       label: 'Sémaphore',            from: 1800, to: 1950, accent: false },
  { id: 'filature',        label: 'Filature',             from: 1800, to: 1900, accent: false },
  { id: 'fortnapoleon',    label: 'Fort Napoléon',        from: 1800, to: 1870, accent: false },
  { id: 'maisonouvriere',  label: 'Maison ouvrière',      from: 1800, to: 1900, accent: false },
  { id: 'maisonnantaise',  label: 'Maison nantaise',      from: 1800, to: 1900, accent: false },
  { id: 'templeprotestant', label: 'Temple protestant',   from: 1800, to: 1900, accent: false },
  { id: 'synagogue',       label: 'Synagogue',            from: 1800, to: 1914, accent: false },
  { id: 'sechoirtabac',    label: 'Séchoir à tabac',      from: 1800, to: 1950, accent: false },
  { id: 'coron',           label: 'Coron minier',         from: 1825, to: 1914, accent: false },
  { id: 'sucrerie',        label: 'Sucrerie',             from: 1830, to: 1950, accent: false },
  { id: 'criee',           label: 'Criée',                from: 1850, to: 1950, accent: false },
  { id: 'cabanesostreicoles', label: 'Cabanes ostréicoles', from: 1850, to: 1950, accent: false },
  { id: 'mine',            label: 'Mine',                 from: 1830, to: 1990, accent: false },
  { id: 'garemonumentale', label: 'Gare monumentale',     from: 1840, to: 1900, accent: false },
  { id: 'haussmann',       label: 'Haussmannien',         from: 1853, to: 1870, accent: true  },
  { id: 'hautfourneau',    label: 'Haut-fourneau',        from: 1850, to: 1950, accent: false },
  { id: 'usinetextile',    label: 'Usine textile',        from: 1850, to: 1950, accent: false },
  { id: 'chevalement',     label: 'Chevalement',          from: 1850, to: 1990, accent: false },
  { id: 'entrepot',        label: 'Entrepôt',             from: 1850, to: 1950, accent: false },
  { id: 'garerurale',      label: 'Gare rurale',          from: 1850, to: 1930, accent: false },
  { id: 'rotondeferroviaire', label: 'Rotonde ferroviaire', from: 1850, to: 1950, accent: false },
  { id: 'hallemarchandises', label: 'Halle marchandises', from: 1850, to: 1950, accent: false },
  { id: 'chateaudeau',     label: 'Château d’eau SNCF',   from: 1850, to: 1950, accent: false },
  { id: 'passageniveau',   label: 'Passage à niveau',     from: 1850, to: 1970, accent: false },
  { id: 'depotlocomotives', label: 'Dépôt locomotives',   from: 1850, to: 1970, accent: false },
  { id: 'basilique',       label: 'Basilique',            from: 1870, to: 1930, accent: false },
  { id: 'mairie',          label: 'Mairie',               from: 1870, to: 1940, accent: false },
  { id: 'ecolejulesferry', label: 'École Jules Ferry',    from: 1880, to: 1940, accent: false },
  { id: 'bureauposte',     label: 'Bureau de poste',      from: 1880, to: 1960, accent: false },
  { id: 'refugemontagne',  label: 'Refuge de montagne',   from: 1880, to: 1980, accent: false },
  { id: 'artnouveau',      label: 'Art nouveau',          from: 1890, to: 1914, accent: false },
  { id: 'centraleelectrique', label: 'Centrale électrique', from: 1900, to: 1980, accent: false },
  { id: 'silo',            label: 'Silo',                 from: 1900, to: 1980, accent: false },
  { id: 'casernepompiers', label: 'Caserne de pompiers',  from: 1900, to: 1980, accent: false },
  { id: 'monumentauxmorts', label: 'Monument aux morts', from: 1918, to: 1925, accent: false },
  { id: 'artdeco',         label: 'Art déco',             from: 1920, to: 1935, accent: false },
  { id: 'annees30',        label: 'Immeuble années 30',   from: 1925, to: 1939, accent: false },
  { id: 'gareroutiere',    label: 'Gare routière',        from: 1930, to: 1980, accent: false },
  { id: 'blockhausatlantique', label: 'Blockhaus Atlantique', from: 1942, to: 1944, accent: false },
  { id: 'maisonidf',       label: 'Maison Île-de-France', from: 1950, to: 2000, accent: false },
  { id: 'hangaragricole',  label: 'Hangar agricole',      from: 1950, to: 2020, accent: false },
  { id: 'columbarium',     label: 'Columbarium',          from: 1970, to: 2020, accent: false },
  { id: 'grandensemble',   label: 'Grand ensemble',       from: 1953, to: 1975, accent: false },
  { id: 'barrehlm',        label: 'Barre HLM',            from: 1955, to: 1975, accent: false },
  { id: 'tourhlm',         label: 'Tour HLM',             from: 1960, to: 1980, accent: false },
  { id: 'pavillonphenix',  label: 'Pavillon Phénix',      from: 1970, to: 1995, accent: false },
  { id: 'mosqueecontemporaine', label: 'Mosquée contemporaine', from: 1980, to: 2010, accent: false },
] as const

const TICKS = [900, 1100, 1300, 1500, 1700, 1900, 2000]

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
