import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Filters {
  procede: string[]
  usage: string[]
  periode: string[]
  categorie: string[]
  region: string[]
}

const EMPTY_FILTERS: Filters = { procede: [], usage: [], periode: [], categorie: [], region: [] }

export interface IdentiteMatch {
  key: string
  value: string
}

interface AppState {
  q: string
  filters: Filters
  identiteMatch: IdentiteMatch | null
  open: Record<number, boolean>
}

interface AppContextValue extends AppState {
  setQ: (q: string) => void
  toggleFilter: (group: keyof Filters, val: string) => void
  clearAll: () => void
  clearIdentiteMatch: () => void
  goToFilteredCatalogue: (overrides: Partial<Filters>, identite?: IdentiteMatch) => void
  setOpen: (open: Record<number, boolean>) => void
  toggleSection: (index: number) => void
  navigateTo: (path: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [identiteMatch, setIdentiteMatch] = useState<IdentiteMatch | null>(null)
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true })

  const toggleFilter = useCallback((group: keyof Filters, val: string) => {
    setFilters((prev) => {
      const cur = prev[group]
      const next = cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]
      return { ...prev, [group]: next }
    })
  }, [])

  const clearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS)
    setIdentiteMatch(null)
    setQ('')
  }, [])

  const clearIdentiteMatch = useCallback(() => setIdentiteMatch(null), [])

  const goToFilteredCatalogue = useCallback(
    (overrides: Partial<Filters>, identite?: IdentiteMatch) => {
      setFilters({ ...EMPTY_FILTERS, ...overrides })
      setIdentiteMatch(identite ?? null)
      setQ('')
      navigate('/catalogue')
      window.scrollTo(0, 0)
    },
    [navigate],
  )

  const toggleSection = useCallback((index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }))
  }, [])

  const navigateTo = useCallback(
    (path: string) => {
      navigate(path)
      window.scrollTo(0, 0)
    },
    [navigate],
  )

  return (
    <AppContext.Provider
      value={{
        q,
        setQ,
        filters,
        toggleFilter,
        clearAll,
        identiteMatch,
        clearIdentiteMatch,
        goToFilteredCatalogue,
        open,
        setOpen,
        toggleSection,
        navigateTo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
