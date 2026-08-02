import { Image, ArrowSquareOut } from '@phosphor-icons/react'
import type { Typologie } from '../../data/typologies'
import styles from './SidebarIdentite.module.css'

interface Props {
  identite: [string, string][]
  materiaux: string[]
  technique: Pick<
    Typologie,
    | 'gps'
    | 'altitude'
    | 'climat'
    | 'typeToiture'
    | 'penteToit'
    | 'essenceBois'
    | 'typeFondation'
    | 'typeCharpente'
    | 'epoqueDominante'
    | 'difficulteIdentification'
  >
  wikipediaUrl: string
  commonsUrl: string
}

export default function SidebarIdentite({ identite, materiaux, technique, wikipediaUrl, commonsUrl }: Props) {
  const techniqueRows: [string, string][] = [
    ['Coordonnées GPS moyennes', technique.gps],
    ['Altitude habituelle', technique.altitude],
    ['Climat', technique.climat],
    ['Époque dominante', technique.epoqueDominante],
    ['Type de toiture', technique.typeToiture],
    ['Pente du toit', technique.penteToit],
    ['Essence de bois', technique.essenceBois],
    ['Type de fondation', technique.typeFondation],
    ['Type de charpente', technique.typeCharpente],
    ['Difficulté d’identification', technique.difficulteIdentification],
  ]

  return (
    <>
      {/* Fiche d'identité */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Fiche d'identité</div>
        <div className={styles.identiteList}>
          {identite.map(([k, v]) => (
            <div key={k} className={styles.row}>
              <div className={styles.key}>{k}</div>
              <div className={styles.value}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Matériaux */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Matériaux caractéristiques</div>
        <div className={styles.tags}>
          {materiaux.map((m) => (
            <span key={m} className="tag tag-neutral">{m}</span>
          ))}
        </div>
      </div>

      {/* Données techniques et de terrain */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Données techniques &amp; de terrain</div>
        <div className={styles.identiteList}>
          {techniqueRows.map(([k, v]) => (
            <div key={k} className={styles.row}>
              <div className={styles.key}>{k}</div>
              <div className={styles.value}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ressources externes */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Ressources externes</div>
        <div className={styles.resourceLinks}>
          <a className={styles.resourceLink} href={wikipediaUrl} target="_blank" rel="noopener noreferrer">
            Article Wikipédia <ArrowSquareOut size={13} />
          </a>
          <a className={styles.resourceLink} href={commonsUrl} target="_blank" rel="noopener noreferrer">
            Rechercher des photos sur Wikimedia Commons <ArrowSquareOut size={13} />
          </a>
        </div>
      </div>

      {/* Galerie — placeholders à remplacer par de vraies images */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.cardLabel} style={{ margin: '4px 6px 12px' }}>Imagerie de référence</div>
        <div className={styles.gallery}>
          {/* TODO: remplacer ces placeholders par <img src="..." /> */}
          <div className={styles.galleryThumb}>
            <Image size={22} color="var(--color-neutral-600)" />
          </div>
          <div className={styles.galleryThumb}>
            <Image size={22} color="var(--color-neutral-600)" />
          </div>
        </div>
        <div className={styles.galleryNote}>Emplacements à compléter avec photos, plans ou relevés. Aucune photographie vérifiée n’est disponible pour l’instant — utilisez le lien Wikimedia Commons ci-dessus pour en rechercher.</div>
      </div>
    </>
  )
}
