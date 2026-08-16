import { GithubLogo, FileText, Bug, Globe, Package, Buildings, Info } from '@phosphor-icons/react'
import { TYPOLOGIES } from '../../data/typologies'
import { useUpdate } from '../../lib/useUpdate'
import styles from './APropos.module.css'

const REPO_URL = 'https://github.com/nouhailler/Architecturor'
const README_URL = 'https://github.com/nouhailler/Architecturor#readme'
const PORTFOLIO_URL = 'https://swinux.ch/applications/'
const ISSUES_URL = 'https://github.com/nouhailler/Architecturor/issues/new'

const CREDITS: { name: string; role: string; url: string }[] = [
  { name: 'React', role: 'Bibliothèque d\'interface', url: 'https://react.dev' },
  { name: 'React Router', role: 'Navigation entre les pages', url: 'https://reactrouter.com' },
  { name: 'Vite', role: 'Outil de build et serveur de développement', url: 'https://vite.dev' },
  { name: 'vite-plugin-pwa', role: 'Installation et mises à jour hors-ligne', url: 'https://vite-pwa-org.netlify.app' },
  { name: 'Phosphor Icons', role: 'Jeu d\'icônes', url: 'https://phosphoricons.com' },
  { name: 'TypeScript', role: 'Typage statique', url: 'https://www.typescriptlang.org' },
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={styles.link}>
      {children}
    </a>
  )
}

export default function APropos() {
  const update = useUpdate()

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>À propos</h1>
      <p className={styles.sub}>Informations sur l'application, son origine et les projets qui la rendent possible.</p>

      {/* Identité de l'application */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Application</div>
        <div className={styles.appRow}>
          <div className={styles.appIcon}>
            <Buildings size={20} weight="regular" />
          </div>
          <div>
            <div className={styles.appName}>Inventaire du bâti</div>
            <div className={styles.appSub}>Architecturor · Typologies architecturales du bâti français</div>
          </div>
        </div>
        <div className={styles.versionLine}>
          <Info size={14} weight="regular" />
          <span>
            Version <strong>{update.buildId}</strong> · construite le {update.buildDate}
          </span>
        </div>
        <p className={styles.text}>
          {TYPOLOGIES.length} typologies architecturales documentées, consultables hors-ligne une fois l'application installée.
        </p>
      </div>

      {/* Auteur */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Auteur</div>
        <p className={styles.text}>
          Développée par <strong>Patrick Nouhailler</strong>, sous l'entité <strong>swinux.ch</strong>.
        </p>
        <div className={styles.linkList}>
          <ExternalLink href={PORTFOLIO_URL}>
            <Globe size={15} weight="regular" />
            Portfolio — swinux.ch/applications
          </ExternalLink>
        </div>
      </div>

      {/* Liens du projet */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Projet</div>
        <div className={styles.linkList}>
          <ExternalLink href={REPO_URL}>
            <GithubLogo size={15} weight="regular" />
            Dépôt source sur GitHub
          </ExternalLink>
          <ExternalLink href={README_URL}>
            <FileText size={15} weight="regular" />
            Documentation (README)
          </ExternalLink>
          <ExternalLink href={ISSUES_URL}>
            <Bug size={15} weight="regular" />
            Signaler un problème ou contacter le support
          </ExternalLink>
        </div>
      </div>

      {/* Crédits open-source */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Crédits open-source</div>
        <p className={styles.text}>
          Cette application s'appuie sur les projets open-source suivants :
        </p>
        <ul className={styles.creditsList}>
          {CREDITS.map((c) => (
            <li key={c.name}>
              <ExternalLink href={c.url}>
                <Package size={14} weight="regular" />
                {c.name}
              </ExternalLink>
              <span className={styles.creditRole}>{c.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
