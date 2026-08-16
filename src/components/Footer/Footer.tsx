import { useNavigate } from 'react-router-dom'
import { BUILD_ID } from '../../lib/pwa'
import styles from './Footer.module.css'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Inventaire du bâti — prototype de référence</span>
        <span>Données constructives à visée technique · maîtrise d'œuvre</span>
        {/* La version installée, à portée de regard : c'est ce qui permet de
            trancher « suis-je à jour ? » sans recharger et espérer. */}
        <button
          className={styles.version}
          onClick={() => { navigate('/parametres'); window.scrollTo(0, 0) }}
          title="Voir les mises à jour dans les Paramètres"
        >
          Version {BUILD_ID}
        </button>
      </div>
    </footer>
  )
}
