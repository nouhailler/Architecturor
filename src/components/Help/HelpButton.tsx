import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Question } from '@phosphor-icons/react'
import { getHelpTopic } from '../../data/help'
import { renderMarkdown } from '../../utils/markdown'
import Modal from '../Modal/Modal'

export default function HelpButton({ className, iconSize = 16, children }: { className?: string; iconSize?: number; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const topic = getHelpTopic(location.pathname)

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label="Aide de cet écran"
        title="Aide de cet écran"
      >
        <Question size={iconSize} weight="regular" style={children ? { marginRight: 7, verticalAlign: -3 } : undefined} />
        {children}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={topic.title} subtitle={topic.subtitle} size="lg">
        {renderMarkdown(topic.body)}
      </Modal>
    </>
  )
}
