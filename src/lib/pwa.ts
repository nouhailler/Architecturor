// Mises à jour du service worker, rendues visibles et forçables.
//
// Une fois l'app installée depuis l'écran d'accueil, elle ne « navigue » plus
// vraiment : elle est rouverte, la page en cache est servie instantanément et
// l'ancien JavaScript continue de tourner même après qu'un nouveau service
// worker s'est installé en silence. Recharger à la main n'aide pas de façon
// fiable — d'où ce module : il permet de *demander* si une nouvelle version
// existe, de *dire* laquelle tourne, et d'*appliquer* la nouvelle à la demande.
//
// L'enregistrement est explicite (`injectRegister: null` dans vite.config.ts)
// pour garder l'objet `registration` sous la main : lui seul peut réinterroger
// le serveur, lui seul sait qu'un worker attend.
import { registerSW } from 'virtual:pwa-register'

// Estampillés au build. Netlify expose le commit dans COMMIT_REF ; en local on
// retombe sur le hash git, ou « dev ». Affichés dans le pied de page pour
// trancher un doute en regardant, plutôt qu'en rechargeant et en espérant.
export const BUILD_ID = __BUILD_ID__
export const BUILD_TIME = __BUILD_TIME__

type Registration = ServiceWorkerRegistration | undefined

let registration: Registration
let updateSW: ((reloadPage?: boolean) => Promise<void>) | null = null
let ready = false
const listeners = new Set<(ready: boolean) => void>()

const emit = () => {
  for (const fn of listeners) fn(ready)
}

/** Appelé une fois au démarrage. Sans effet là où les service workers n'existent pas. */
export function initPwa(): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
  updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      ready = true
      emit()
    },
    onRegisteredSW(_url, r) {
      registration = r
    },
  })
  // Un téléphone rouvre l'app plutôt que de la charger : le retour au premier
  // plan est donc le moment naturel pour aller voir s'il y a un nouveau déploiement.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') registration?.update?.().catch(() => {})
  })
}

export const updateAvailable = (): boolean => ready

/** S'abonne à l'état « une mise à jour attend ». Retourne la fonction de désabonnement. */
export function onUpdateStatus(fn: (ready: boolean) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/** Résout dès qu'un worker en attente apparaît, ou false après `ms`. */
function waitForUpdate(ms = 12000): Promise<boolean> {
  if (ready) return Promise.resolve(true)
  return new Promise((resolve) => {
    const stop = onUpdateStatus(() => {
      clearTimeout(timer)
      stop()
      resolve(true)
    })
    const timer = setTimeout(() => {
      stop()
      resolve(false)
    }, ms)
  })
}

export type UpdateCheck = 'unsupported' | 'current' | 'update'

/**
 * Interroge le serveur maintenant.
 *
 * Retourne 'update' si une nouvelle version est installée et prête à être
 * appliquée, 'current' si l'app est déjà à jour, 'unsupported' si aucun service
 * worker ne tourne (onglet en dev, navigateur sans support, page non sécurisée).
 */
export async function checkForUpdate(): Promise<UpdateCheck> {
  if (ready) return 'update'
  if (!registration) return 'unsupported'
  try {
    await registration.update()
  } catch {
    return 'unsupported'
  }
  // `update()` résout quand la vérification est finie, mais un worker trouvé
  // doit encore s'installer avant d'être utilisable — d'où l'attente plutôt
  // qu'un verdict immédiat.
  if (registration.installing || registration.waiting) {
    return (await waitForUpdate()) ? 'update' : 'current'
  }
  return 'current'
}

let applying = false

/**
 * Active le worker en attente et recharge dessus.
 *
 * Le rechargement du plugin est **conditionnel** : workbox ne recharge sur
 * `controlling` que s'il a constaté, à l'enregistrement, que la page était déjà
 * contrôlée par un worker compatible. Après une réinstallation de l'app, après
 * un vidage des données, ou au tout premier chargement qui installe un worker,
 * ce n'est pas le cas — le nouveau worker s'active et la page reste sur
 * l'ancien code indéfiniment, ce qui se lit comme un bouton qui ne fait rien.
 * On ne s'appuie donc jamais dessus : on demande, on surveille la reprise en
 * main soi-même, et on s'échappe sur minuterie.
 */
export function applyUpdate(): void {
  if (applying) return
  applying = true
  const reload = () => window.location.reload()

  // Rien ne contrôle cette page : un rechargement passe déjà par le réseau.
  if (!navigator.serviceWorker?.controller) {
    reload()
    return
  }

  navigator.serviceWorker.addEventListener('controllerchange', reload, { once: true })
  try {
    void updateSW?.(true)
  } catch {
    // Le message n'est pas parti ; la minuterie ci-dessous est la réponse.
  }

  // Dernier recours, ~2,5 s plus tard : on lâche le worker pour que le
  // rechargement ne puisse pas être servi depuis son cache, puis on recharge.
  // Coût : une salve de requêtes réseau, et la page fraîche réenregistre un
  // worker aussitôt — prix honnête pour ne jamais laisser quelqu'un bloqué sur
  // un ancien build.
  setTimeout(() => {
    const done = () => reload()
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => Promise.all(regs.map((r) => r.unregister())))
      .then(done, done)
  }, 2500)
}

/**
 * La porte de sortie : oublier le worker et tous les assets en cache, puis
 * recharger depuis le réseau. Les données du navigateur (localStorage) ne sont
 * pas touchées — seul le Cache Storage que possède le service worker est vidé.
 */
export async function hardReload(): Promise<void> {
  try {
    const regs = (await navigator.serviceWorker?.getRegistrations?.()) || []
    await Promise.all(regs.map((r) => r.unregister()))
    const keys = (await caches?.keys?.()) || []
    await Promise.all(keys.map((k) => caches.delete(k)))
  } catch {
    // Quoi qu'il ait échoué, recharger reste la bonne suite.
  }
  window.location.reload()
}
