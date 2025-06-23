import React from 'react'
import styles from './perfFooter.module.css'

export default function PerfFooter() {
  return (
    <div className={styles.footer}>
        <img src="/squad-logo.png"className={styles.squad}></img>
        <div className={styles.divider}></div>
        <img src="/Autobot-logo.svg" className={styles.logo}></img>
        <p>
      © 2025 Axtria Inc. All Rights Reserved.
    </p>
        <p>
      info@axtria.com
    </p>
    </div>
    )
}