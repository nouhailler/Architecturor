import type { ReactNode } from 'react'
import styles from './markdown.module.css'

// Rendu Markdown volontairement minimal (pas de dépendance externe) : le
// contenu d'aide est entièrement écrit par nous, pas de contenu utilisateur
// à supporter — seuls les titres ##/###, le gras, le code en ligne, les
// listes à puces et les citations ">" (rendues en encadré "astuce") sont
// nécessaires pour ce besoin.

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = []
  // Ordre important : **gras** doit être tenté avant *italique* pour que les
  // doubles astérisques ne soient pas lus comme deux emphases imbriquées.
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) parts.push(<strong key={`${keyPrefix}-${i++}`}>{match[1]}</strong>)
    else if (match[2] !== undefined) parts.push(<em key={`${keyPrefix}-${i++}`}>{match[2]}</em>)
    else if (match[3] !== undefined) parts.push(<code key={`${keyPrefix}-${i++}`} className={styles.code}>{match[3]}</code>)
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

export function renderMarkdown(source: string): ReactNode {
  const blocks = source.trim().split(/\n{2,}/)

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim()

        if (trimmed.startsWith('### ')) {
          return <h4 key={i} className={styles.h4}>{renderInline(trimmed.slice(4), `${i}`)}</h4>
        }
        if (trimmed.startsWith('## ')) {
          return <h3 key={i} className={styles.h3}>{renderInline(trimmed.slice(3), `${i}`)}</h3>
        }
        if (trimmed.startsWith('> ')) {
          const content = trimmed.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ')
          return <div key={i} className={styles.tip}>{renderInline(content, `${i}`)}</div>
        }
        if (/^-\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ')).map((l) => l.trim().replace(/^-\s/, ''))
          return (
            <ul key={i} className={styles.ul}>
              {items.map((it, j) => <li key={j}>{renderInline(it, `${i}-${j}`)}</li>)}
            </ul>
          )
        }
        return <p key={i} className={styles.p}>{renderInline(trimmed, `${i}`)}</p>
      })}
    </>
  )
}
