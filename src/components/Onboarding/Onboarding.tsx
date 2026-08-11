import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowLeft, ArrowRight, CompassTool, MapTrifold, SquaresFour, Ruler, Question, type Icon } from '@phosphor-icons/react'
import { useApp } from '../../context/AppContext'
import styles from './Onboarding.module.css'

interface Step {
  Icon: Icon
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    Icon: CompassTool,
    title: 'Bienvenue dans Inventaire du bâti',
    body: "Une base de référence des typologies constructives françaises, pensée pour la maîtrise d'œuvre : matériaux, structure porteuse, planchers et toiture, pour chaque type de bâtiment.",
  },
  {
    Icon: MapTrifold,
    title: 'Une carte et une frise chronologique',
    body: "Sur l'accueil, explorez les typologies par région sur la carte de France, ou par époque sur la frise chronologique — deux façons de se repérer avant d'entrer dans le détail.",
  },
  {
    Icon: SquaresFour,
    title: 'Un catalogue filtrable',
    body: 'Le catalogue rassemble toutes les typologies. Filtrez-les par catégorie, procédé de construction, usage ou période, ou utilisez la recherche pour trouver un mot-clé précis.',
  },
  {
    Icon: Ruler,
    title: 'Des fiches détaillées',
    body: "Chaque typologie a sa fiche : coupe schématique annotée, procédé de construction, fiche d'identité, matériaux caractéristiques et données techniques de terrain.",
  },
  {
    Icon: Question,
    title: 'De l’aide à tout moment',
    body: 'Le bouton « ? » en haut de chaque écran détaille son fonctionnement. Depuis les Paramètres, vous pouvez aussi exporter le catalogue, importer vos propres typologies, ou revoir cette présentation.',
  },
]

export default function Onboarding() {
  const { onboardingOpen, closeOnboarding } = useApp()
  const [step, setStep] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onboardingOpen) return
    setStep(0)
  }, [onboardingOpen])

  useEffect(() => {
    if (!onboardingOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOnboarding()
      if (e.key === 'ArrowRight') setStep((s) => Math.min(s + 1, STEPS.length - 1))
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onboardingOpen, closeOnboarding])

  if (!onboardingOpen) return null

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const CurrentIcon = current.Icon

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Présentation de l'application"
        ref={panelRef}
        tabIndex={-1}
      >
        <button className={styles.skipBtn} onClick={closeOnboarding} aria-label="Passer la présentation">
          Passer
          <X size={13} weight="bold" />
        </button>

        <div className={styles.iconBadge}>
          <CurrentIcon size={28} weight="regular" />
        </div>

        <div className={styles.title}>{current.title}</div>
        <p className={styles.body}>{current.body}</p>

        <div className={styles.dots}>
          {STEPS.map((_, i) => (
            <span key={i} className={`${styles.dot} ${i === step ? styles.dotActive : ''}`} />
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className="btn btn-ghost"
            onClick={() => setStep((s) => s - 1)}
            style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
          >
            <ArrowLeft size={14} />
            Précédent
          </button>

          {isLast ? (
            <button className="btn btn-primary" onClick={closeOnboarding}>
              Commencer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
              Suivant
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
