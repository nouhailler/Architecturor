import { useCallback, useEffect, useState } from 'react'
import {
  applyUpdate,
  BUILD_ID,
  BUILD_TIME,
  checkForUpdate,
  hardReload,
  onUpdateStatus,
  updateAvailable,
} from './pwa'

const FORMAT = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function buildLabel(): string {
  const d = new Date(BUILD_TIME)
  return Number.isNaN(d.getTime()) ? '—' : FORMAT.format(d)
}

export interface UpdateState {
  /** Une nouvelle version est installée et n'attend qu'un rechargement. */
  ready: boolean
  /** Une vérification est en cours. */
  checking: boolean
  /** Phrase à afficher après une vérification manuelle, vide sinon. */
  status: string
  buildId: string
  buildDate: string
  check: () => Promise<void>
  apply: () => void
  reset: () => void
}

/**
 * État des mises à jour, partagé par la bannière et le pied de page. La source
 * de vérité vit dans `pwa.ts` (hors React, car le service worker peut signaler
 * avant le premier rendu) ; ce hook ne fait que s'y abonner.
 */
export function useUpdate(): UpdateState {
  const [ready, setReady] = useState(updateAvailable)
  const [checking, setChecking] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => onUpdateStatus(setReady), [])

  const check = useCallback(async () => {
    setChecking(true)
    setStatus('Recherche…')
    const result = await checkForUpdate()
    setChecking(false)
    if (result === 'update') {
      setStatus('Nouvelle version installée, redémarrage…')
      setTimeout(applyUpdate, 400)
      return
    }
    setStatus(
      result === 'current'
        ? 'Vous êtes déjà sur la dernière version.'
        : "Mise à jour automatique indisponible ici (pas de service worker) — rechargez la page.",
    )
  }, [])

  return {
    ready,
    checking,
    status,
    buildId: BUILD_ID,
    buildDate: buildLabel(),
    check,
    apply: applyUpdate,
    reset: hardReload,
  }
}
