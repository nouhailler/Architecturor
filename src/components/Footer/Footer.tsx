import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Inventaire du bâti — prototype de référence</span>
        <span>Données constructives à visée technique · maîtrise d'œuvre</span>
      </div>
    </footer>
  )
}
