import React from 'react'
import styles from './HomePage.module.css'
import Cards from './cards/Cards'

const HomePage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.intro}>
                <img src='/Autobot-logo.svg' className={styles.autobotLogo}></img>
                <h1>Quality Engineer Studio</h1>
                <p>
                    Axtria's Quality Engineering Studio is a one-stop solution for all Quality Engineering accelerators (Bots) designed to enhance the productivity of Quality Engineers and improve the coverage of validation across various engagement areas. 
                    </p>
                    <p>
                    Whether it's Data Warehouse ETL Processing, Business Intelligence Dashboards, or Data Provisioning Views/Extracts, our studio ensures an exceptional high-quality experience for end users.
                </p>
                <Cards/>
                
            </div>
        </div>
    )
}

export default HomePage