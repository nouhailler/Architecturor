import { useMemo, useState } from 'react'
import { MagnifyingGlass, CaretDown, CaretUp, BookOpen } from '@phosphor-icons/react'
import { GLOSSARY_CATEGORIES, GLOSSARY_TERM_COUNT, type GlossaryTerm } from '../../data/glossaire'
import styles from './Glossaire.module.css'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export default function Glossaire() {
  const [q, setQ] = useState('')
  const [manuallyOpen, setManuallyOpen] = useState<Set<string>>(new Set([GLOSSARY_CATEGORIES[0].id]))

  const query = normalize(q.trim())

  const filteredCategories = useMemo(() => {
    if (!query) return GLOSSARY_CATEGORIES.map((c) => ({ ...c, matched: false }))
    return GLOSSARY_CATEGORIES
      .map((c) => {
        const terms = c.terms.filter(
          (t: GlossaryTerm) => normalize(t.term).includes(query) || normalize(t.definition).includes(query),
        )
        return { ...c, terms, matched: terms.length > 0 }
      })
      .filter((c) => c.matched)
  }, [query])

  const toggle = (id: string) => {
    setManuallyOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Navigation en ancre : pas de vrai <a href="#...">, car le routeur applicatif
  // utilise déjà le hash de l'URL (HashRouter) — un lien href="#..." serait
  // interprété comme une navigation vers une autre page plutôt qu'un défilement.
  const scrollToCategory = (id: string) => {
    setManuallyOpen((prev) => new Set(prev).add(id))
    const el = document.getElementById(`glossaire-${id}`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' })
  }

  const isOpen = (id: string) => (query ? true : manuallyOpen.has(id))

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <BookOpen size={26} weight="duotone" color="var(--color-accent-300)" />
        <div>
          <h1 className={styles.h1}>Glossaire</h1>
          <p className={styles.sub}>
            {GLOSSARY_TERM_COUNT} définitions réparties en {GLOSSARY_CATEGORIES.length} catégories, pour comprendre
            le vocabulaire employé dans les fiches d'identité et les descriptions techniques.
          </p>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <MagnifyingGlass size={15} color="var(--color-neutral-500)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          className="input"
          style={{ paddingLeft: 36 }}
          placeholder="Rechercher un terme (ex. colombage, mâchicoulis, HQE…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {!query && (
        <div className={styles.nav}>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => scrollToCategory(c.id)} className={styles.navChip}>
              {c.label} <span className={styles.navChipCount}>{c.terms.length}</span>
            </button>
          ))}
        </div>
      )}

      {query && filteredCategories.length === 0 && (
        <div className={styles.empty}>Aucun terme ne correspond à « {q} ».</div>
      )}

      <div className={styles.categoryList}>
        {filteredCategories.map((c) => {
          const open = isOpen(c.id)
          return (
            <div key={c.id} id={`glossaire-${c.id}`} className={styles.category}>
              <button className={styles.categoryHeader} onClick={() => toggle(c.id)} aria-expanded={open}>
                <div>
                  <div className={styles.categoryLabel}>{c.label}</div>
                  <div className={styles.categoryDescription}>{c.description}</div>
                </div>
                <div className={styles.categoryHeaderRight}>
                  <span className={styles.categoryCount}>{c.terms.length}</span>
                  {open ? <CaretUp size={16} /> : <CaretDown size={16} />}
                </div>
              </button>

              {open && (
                <dl className={styles.termList}>
                  {c.terms.map((t) => (
                    <div key={t.term} className={styles.termRow}>
                      <dt className={styles.term}>{t.term}</dt>
                      <dd className={styles.definition}>{t.definition}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
