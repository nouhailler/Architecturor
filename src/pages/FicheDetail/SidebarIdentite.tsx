import { useState } from 'react'
import { Image, ArrowSquareOut } from '@phosphor-icons/react'
import type { Typologie } from '../../data/typologies'
import { getMaterialInfo, wikipediaSearchUrl } from '../../data/materiaux'
import { commonsFilePath, commonsFilePage } from '../../utils/commons'
import { useApp } from '../../context/AppContext'
import Modal from '../../components/Modal/Modal'
import styles from './SidebarIdentite.module.css'

// Champs de la fiche d'identité pour lesquels un clic filtre le catalogue.
// "Particularité", "Plan", etc. restent du texte libre non cliquable : trop
// spécifiques à chaque typologie pour constituer un regroupement pertinent.
const CLICKABLE_IDENTITE_KEYS = new Set(['Catégorie', 'Période', 'Région', 'Usage', 'Système', 'Matériau dominant', 'Toiture'])

function GalleryImage({ fileName, alt }: { fileName: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={styles.galleryThumb}>
        <Image size={22} color="var(--color-neutral-600)" />
      </div>
    )
  }

  return (
    <a
      className={styles.galleryThumb}
      href={commonsFilePage(fileName)}
      target="_blank"
      rel="noopener noreferrer"
      title={`${alt} — Wikimedia Commons`}
    >
      <img
        src={commonsFilePath(fileName)}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </a>
  )
}

interface Props {
  typologie: Typologie
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
  images: string[]
  name: string
}


export default function SidebarIdentite({ typologie, identite, materiaux, technique, wikipediaUrl, commonsUrl, images, name }: Props) {
  const { goToFilteredCatalogue } = useApp()
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null)
  const materialInfo = activeMaterial ? getMaterialInfo(activeMaterial) : null

  const handleIdentiteClick = (key: string, value: string) => {
    switch (key) {
      case 'Catégorie':
        goToFilteredCatalogue({ categorie: [typologie.categorie] })
        break
      case 'Période':
        goToFilteredCatalogue({ periode: [...typologie.periodeTags] })
        break
      case 'Région':
        goToFilteredCatalogue({ region: [typologie.region] })
        break
      case 'Usage':
        goToFilteredCatalogue({ usage: [typologie.usage] })
        break
      default:
        // Système, Matériau dominant, Toiture : pas de champ canonique dédié —
        // on retrouve les typologies qui partagent exactement ce texte.
        goToFilteredCatalogue({}, { key, value })
    }
  }

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
            CLICKABLE_IDENTITE_KEYS.has(k) ? (
              <button
                key={k}
                type="button"
                className={`${styles.row} ${styles.rowClickable}`}
                onClick={() => handleIdentiteClick(k, v)}
                title={`Voir les typologies partageant ce champ « ${k} »`}
              >
                <div className={styles.key}>{k}</div>
                <div className={styles.value}>{v}</div>
              </button>
            ) : (
              <div key={k} className={styles.row}>
                <div className={styles.key}>{k}</div>
                <div className={styles.value}>{v}</div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Matériaux */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Matériaux caractéristiques</div>
        <div className={styles.tags}>
          {materiaux.map((m) => (
            <button
              key={m}
              type="button"
              className={`tag tag-neutral ${styles.materialTag}`}
              onClick={() => setActiveMaterial(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={materialInfo !== null}
        onClose={() => setActiveMaterial(null)}
        title={materialInfo?.title ?? ''}
        subtitle={materialInfo?.detail ?? undefined}
      >
        {materialInfo && (
          <>
            <p>{materialInfo.description}</p>
            {!materialInfo.found && (
              <a
                className={styles.resourceLink}
                href={wikipediaSearchUrl(materialInfo.title)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 10 }}
              >
                Rechercher « {materialInfo.title} » sur Wikipédia <ArrowSquareOut size={13} />
              </a>
            )}
          </>
        )}
      </Modal>

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

      {/* Galerie */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.cardLabel} style={{ margin: '4px 6px 12px' }}>Imagerie de référence</div>
        {images.length > 0 ? (
          <>
            <div className={styles.gallery}>
              {images.map((fileName) => (
                <GalleryImage key={fileName} fileName={fileName} alt={name} />
              ))}
            </div>
            <div className={styles.galleryNote}>
              Photographies indicatives issues de Wikimedia Commons (cliquer pour la fiche du fichier, licence et auteur).
            </div>
          </>
        ) : (
          <>
            <div className={styles.gallery}>
              <div className={styles.galleryThumb}>
                <Image size={22} color="var(--color-neutral-600)" />
              </div>
              <div className={styles.galleryThumb}>
                <Image size={22} color="var(--color-neutral-600)" />
              </div>
            </div>
            <div className={styles.galleryNote}>Aucune photographie vérifiée n’est disponible pour l’instant — utilisez le lien Wikimedia Commons ci-dessus pour en rechercher.</div>
          </>
        )}
      </div>
    </>
  )
}
