import React from 'react'
import styles from './Header.module.css'
import Showtime from './Time'
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/">
        <img src="/axtria-logo.png" className={styles.logo}></img>
        </Link>
        <div className={styles.divider}></div>
        <img src="/squad-logo.png" className={styles.squad}></img>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.headerVersion}>
          <p>Latest Version</p>
          <Showtime />
        </div>
        <div>
          <div className={styles.iconWrapper}>
            <img src="/Undo Icon.png" className={styles.headerIcons} alt="Undo" />
            <span className={styles.tooltip}>Undo</span>
          </div>
          <div className={styles.iconWrapper}>
            <img src="/Home icon.png" className={styles.headerIcons} alt="Home" />
            <span className={styles.tooltip}>Home</span>
          </div>
          <div className={styles.iconWrapper}>
            <img src="/Info Icon.png" className={styles.headerIcons} alt="Info" />
            <span className={styles.tooltip}>Info</span>
          </div>
          <div className={styles.iconWrapper}>
            <img src="/Help Icon.png" className={styles.headerIcons} alt="Help" />
            <span className={styles.tooltip}>Help</span>
          </div>
          <div className={styles.iconWrapper}>
            <img src="/Alert Icon.png" className={styles.headerIcons} alt="Alert" />
            <span className={styles.tooltip}>Alert</span>
          </div>

        </div>
      </div>
    </div>
  )
}
