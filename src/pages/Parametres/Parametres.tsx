import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DownloadSimple, UploadSimple, CheckCircle, WarningCircle, Trash, ArrowRight, CaretDown, CaretUp } from '@phosphor-icons/react'
import { TYPOLOGIES, CATEGORIES, type Typologie } from '../../data/typologies'
import { TYPOLOGIE_TEMPLATE, VALID_SECTION_ICONS, validateTypologieImport } from '../../data/typologieSchema'
import { useCustomTypologies, addCustomTypologie, removeCustomTypologie } from '../../utils/customTypologies'
import { findDuplicates, type DuplicateMatch } from '../../utils/duplicates'
import styles from './Parametres.module.css'

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function Parametres() {
  const navigate = useNavigate()
  const customTypologies = useCustomTypologies()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pasted, setPasted] = useState('')
  const [showGabarit, setShowGabarit] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; errors: string[]; name?: string } | null>(null)
  const [pending, setPending] = useState<{ typologie: Typologie; exact: DuplicateMatch[]; similar: DuplicateMatch[] } | null>(null)

  const allTypologies = [...TYPOLOGIES, ...customTypologies]
  const existingIds = new Set(allTypologies.map((t) => t.id))
  const builtInIds = new Set(TYPOLOGIES.map((t) => t.id))

  const handleExport = () => {
    download('typologies-inventaire-du-bati.json', JSON.stringify(allTypologies, null, 2))
  }

  const handleDownloadGabarit = () => {
    download('typologie-gabarit.json', JSON.stringify(TYPOLOGIE_TEMPLATE, null, 2))
  }

  const commitImport = (typologie: Typologie) => {
    addCustomTypologie(typologie)
    setResult({ ok: true, errors: [], name: typologie.name })
    setPending(null)
    setPasted('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const runImport = (raw: string) => {
    setPending(null)
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      setResult({ ok: false, errors: ['Le contenu n\'est pas un JSON valide (vérifiez les virgules, guillemets et accolades).'] })
      return
    }
    const validation = validateTypologieImport(parsed, existingIds)
    if (!validation.ok || !validation.typologie) {
      setResult({ ok: false, errors: validation.errors })
      return
    }

    const { exact, similar } = findDuplicates(validation.typologie.name, allTypologies)
    if (exact.length > 0 || similar.length > 0) {
      setResult(null)
      setPending({ typologie: validation.typologie, exact, similar })
      return
    }

    commitImport(validation.typologie)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => runImport(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Paramètres</h1>
      <p className={styles.sub}>Exportez l'ensemble des typologies ou importez-en une nouvelle au format JSON.</p>

      {/* Export */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Exporter les typologies</div>
        <p className={styles.text}>
          Télécharge un fichier JSON contenant les {allTypologies.length} typologies actuelles
          {customTypologies.length > 0 && <> (dont {customTypologies.length} importée{customTypologies.length > 1 ? 's' : ''} localement)</>}
          , avec l'intégralité de leurs caractéristiques (fiche d'identité, matériaux, données techniques, annotations, procédé de construction…).
        </p>
        <button className="btn btn-primary" onClick={handleExport}>
          <DownloadSimple size={16} weight="regular" />
          Exporter toutes les typologies ({allTypologies.length})
        </button>
      </div>

      {/* Import */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Importer une typologie</div>
        <p className={styles.text}>
          L'import attend un fichier JSON décrivant <strong>une seule typologie</strong>, dans un format précis. Les
          champs marqués optionnels peuvent être omis.
        </p>

        <div className={styles.gabaritRow}>
          <button className="btn btn-secondary" onClick={handleDownloadGabarit}>
            <DownloadSimple size={15} weight="regular" />
            Télécharger le gabarit JSON
          </button>
          <button className={styles.toggleGabarit} onClick={() => setShowGabarit((v) => !v)}>
            {showGabarit ? 'Masquer' : 'Afficher'} le gabarit
            {showGabarit ? <CaretUp size={13} /> : <CaretDown size={13} />}
          </button>
        </div>

        {showGabarit && (
          <div className={styles.gabaritBox}>
            <ul className={styles.fieldList}>
              <li><code>id</code> — identifiant unique, minuscules et chiffres uniquement (obligatoire)</li>
              <li><code>name</code>, <code>region</code>, <code>periode</code>, <code>procede</code>, <code>usage</code>, <code>resume</code> — texte (obligatoires)</li>
              <li><code>categorie</code> — une valeur parmi : {CATEGORIES.map((c) => c.id).join(', ')} (obligatoire)</li>
              <li><code>identite</code> — liste de paires [clé, valeur] affichées dans la fiche d'identité (optionnel)</li>
              <li><code>materiaux</code>, <code>images</code>, <code>periodeTags</code> — listes de textes (optionnels)</li>
              <li><code>annotations</code> — liste de 6 objets {'{ n, el, txt }'} pour la coupe schématique (optionnel)</li>
              <li><code>sections</code> — liste d'objets {'{ title, icon, intro?, groups: [{ lead, items }] }'} pour le procédé de construction (optionnel). Icônes reconnues : {VALID_SECTION_ICONS.join(', ')}</li>
              <li>
                <code>gps</code>, <code>altitude</code>, <code>climat</code>, <code>typeToiture</code>, <code>penteToit</code>, <code>essenceBois</code>,{' '}
                <code>typeFondation</code>, <code>typeCharpente</code>, <code>epoqueDominante</code>, <code>difficulteIdentification</code>,{' '}
                <code>wikipediaUrl</code>, <code>commonsUrl</code> — texte libre (optionnels)
              </li>
            </ul>
            <pre className={styles.pre}>{JSON.stringify(TYPOLOGIE_TEMPLATE, null, 2)}</pre>
          </div>
        )}

        <div className={styles.importZone}>
          <label className={styles.fileLabel}>
            <UploadSimple size={16} weight="regular" />
            Choisir un fichier JSON
            <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={handleFileChange} className={styles.fileInput} />
          </label>

          <div className={styles.orDivider}>ou collez le JSON directement</div>

          <textarea
            className={styles.textarea}
            placeholder='{ "id": "maexemple", "name": "...", ... }'
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
          />
          <button className="btn btn-secondary" disabled={!pasted.trim()} onClick={() => runImport(pasted)}>
            Valider et importer ce texte
          </button>
        </div>

        {pending && (
          <div className={`${styles.resultBox} ${styles.resultWarning}`}>
            <div>
              <div className={styles.resultErrorHeader}>
                <WarningCircle size={18} weight="fill" />
                <span>{pending.exact.length > 0 ? 'Doublon probable détecté' : 'Nom très proche d\'une typologie existante'}</span>
              </div>
              <ul className={styles.errorList}>
                {[...pending.exact, ...pending.similar].map((m) => (
                  <li key={m.typologie.id}>
                    « {pending.typologie.name} » a un nom {m.reason} à « {m.typologie.name} » (id : {m.typologie.id}
                    {!builtInIds.has(m.typologie.id) ? ', importée' : ''}
                    ).
                  </li>
                ))}
              </ul>
              <p style={{ margin: '10px 0', fontSize: 13 }}>
                {pending.exact.length > 0
                  ? "Il s'agit probablement de la même typologie. Vérifiez avant de continuer — importer quand même créera une deuxième fiche distincte."
                  : 'Vérifiez qu\'il ne s\'agit pas du même bâtiment sous un nom légèrement différent avant de continuer.'}
              </p>
              <div className={styles.pendingActions}>
                <button className="btn btn-secondary" onClick={() => commitImport(pending.typologie)}>
                  Importer quand même
                </button>
                <button className="btn btn-ghost" onClick={() => setPending(null)}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className={`${styles.resultBox} ${result.ok ? styles.resultOk : styles.resultError}`}>
            {result.ok ? (
              <>
                <CheckCircle size={18} weight="fill" />
                <span>« {result.name} » a été importée avec succès. Elle apparaît désormais dans le catalogue.</span>
              </>
            ) : (
              <div>
                <div className={styles.resultErrorHeader}>
                  <WarningCircle size={18} weight="fill" />
                  <span>Import impossible :</span>
                </div>
                <ul className={styles.errorList}>
                  {result.errors.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className={styles.note}>
          Les typologies importées sont enregistrées uniquement dans ce navigateur (aucun serveur n'est utilisé) : elles
          apparaissent dans le catalogue et ont leur propre fiche, mais pas sur la carte ni sur la frise chronologique,
          qui restent réservées aux 168 typologies de référence.
        </p>
      </div>

      {/* Typologies importées */}
      {customTypologies.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardLabel}>Typologies importées ({customTypologies.length})</div>
          <div className={styles.customList}>
            {customTypologies.map((t) => (
              <div key={t.id} className={styles.customItem}>
                <button className={styles.customItemName} onClick={() => { navigate(`/typologie/${t.id}`); window.scrollTo(0, 0) }}>
                  {t.name}
                  <ArrowRight size={13} />
                </button>
                <button
                  className={styles.customItemDelete}
                  onClick={() => removeCustomTypologie(t.id)}
                  aria-label={`Supprimer ${t.name}`}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
