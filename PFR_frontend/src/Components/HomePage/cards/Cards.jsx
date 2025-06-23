import React from 'react';
import Card from './Card';
import styles from './Cards.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cards() {
  const navigate = useNavigate(); 

  const cardData = [
    { title: 'SCENARIO GENIE', image_name: '/1.png', card_detail: 'Auto-generates real-world test scenarios based on....' },
    { title: 'ETL SENTINEL', image_name: '/2.png', card_detail: 'Monitors and validates ETL pipelines for data integrit...' },
    { title: 'BI SENTINEL', image_name: '/3.png', card_detail: 'Continuously evaluates Bl dashboards for data...' },
    { title: 'DATA GENERATOR', image_name: '/4.png', card_detail: 'Creates synthetic yet realistic test data for...' },
    { title: 'MDM VALIDATOR', image_name: '/5.png', card_detail: 'Automates validation of master data across...' },
    { title: 'DB RECONCILER', image_name: '/6.png', card_detail: 'Compares and reconciles data across source and...' },
    { title: 'BI RECONCILER', image_name: '/7.png', card_detail: 'Validates KPI values between Bl dashboards...' },
    { title: 'RC ANALYZER', image_name: '/8.png', card_detail: 'Pinpoints the origin of data or system issues using...' },
    { title: 'PERF EVALUATOR', image_name: '/9.png', card_detail: 'Assesses system performance under load...' },
    { title: 'UI INSPECTOR', image_name: '/10.png', card_detail: 'Scans Ul components for layout, labeling, and...' },
  ];

  const handleCardClick = (title) => {
    if (title === 'PERF EVALUATOR') {
      navigate('/perf'); 
    }
  };

  return (
    <div className={styles.cards}>
      {cardData.map((card, index) => (
        <div key={index} onClick={() => handleCardClick(card.title)} style={{ cursor: 'pointer' }}>
          <Card
            title={card.title}
            image_name={card.image_name}
            card_detail={card.card_detail}
          />
        </div>
      ))}
    </div>
  );
}


