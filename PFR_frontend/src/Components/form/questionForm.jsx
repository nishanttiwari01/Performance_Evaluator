import React, { useState } from 'react';
import styles from './questionForm.module.css'

export default function Question_form({ questionText, index, onAnswerChange }) {
  const [selected, setSelected] = useState('');
  const [showJustification, setShowJustification] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [justification, setJustification] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === 'No' || value === 'NA') {
      setShowJustification(true);
    } else {
      setShowJustification(false);
    }
    onAnswerChange(index, value, justification);
  };

  const handleJustificationChange = (e) => {
    setJustification(e.target.value);
    onAnswerChange(index, selected, e.target.value);
  };

  return (
    <div className={styles.question}>
      <p>{index + 1}. {questionText}</p>
      <div className={styles.radioGroup}>
  <label>
    <input type="radio" name={`q${index}`} value="Yes" checked={selected === 'Yes'} onChange={handleChange} />
    Yes
  </label>
  <label>
    <input type="radio" name={`q${index}`} value="No" checked={selected === 'No'} onChange={handleChange} />
    No
  </label>
  <label
    onMouseEnter={() => setShowRecommendation(true)}
    onMouseLeave={() => setShowRecommendation(false)}
  >
    <input type="radio" name={`q${index}`} value="NA" checked={selected === 'NA'} onChange={handleChange} />
    NA
  </label>
</div>


      {showRecommendation && selected !== 'NA' && (
        <div className={styles.recommendationBox}>
          🔍 Recommended Instead:
        </div>
      )}

      {showJustification && (
  <div className={styles.justificationBox}>
    <textarea
      placeholder="Provide justification..."
      value={justification}
      onChange={handleJustificationChange}
      rows={4}
    />

    <input
      type="file"
      accept=".pdf,.doc,.docx,.jpg,.png"
      className={styles.fileInput}
    />
  </div>
)}

    </div>
  );
}