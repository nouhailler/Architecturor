import { useEffect, useState } from 'react'
import type { Typologie } from '../data/typologies'

const STORAGE_KEY = 'inventaire-bati:typologies-importees'
const CHANGE_EVENT = 'inventaire-bati:typologies-importees-changed'

export function loadCustomTypologies(): Typologie[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCustomTypologies(list: Typologie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function addCustomTypologie(typologie: Typologie) {
  const current = loadCustomTypologies().filter((t) => t.id !== typologie.id)
  saveCustomTypologies([...current, typologie])
}

export function removeCustomTypologie(id: string) {
  saveCustomTypologies(loadCustomTypologies().filter((t) => t.id !== id))
}

/** Réactif : se met à jour dans tous les composants montés dès qu'un import/suppression a lieu. */
export function useCustomTypologies(): Typologie[] {
  const [list, setList] = useState<Typologie[]>(() => loadCustomTypologies())

  useEffect(() => {
    const handler = () => setList(loadCustomTypologies())
    window.addEventListener(CHANGE_EVENT, handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return list
}
