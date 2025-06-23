import React from 'react'
import styles from './form.module.css'
import Question_form from './questionForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Form({ questions, head }) {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerChange = (index, choice, justification) => {
    const updated = [...answers];
    updated[index] = { question: questions[index], choice, justification };
    setAnswers(updated);
  };

  // const handleSubmit = () => {
  //   if (
  //     answers.length !== questions.length ||
  //     answers.some(ans => !ans || !ans.choice)
  //   ) {
  //     alert('Please answer all questions before submitting.');
  //     return;
  //   }

  //   navigate('/score', { state: { answers } });
  // };

  const handleSubmit = async () => {
    if (
      answers.length !== questions.length ||
      answers.some(ans => !ans || !ans.choice)
    ) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/submit/', {
        test_type: head, 
        answers: answers.map(ans => ({
          question: ans.question,
          choice: ans.choice,
          justification: ans.justification || ""
        }))
      });

      if (response.status === 200) {
        alert('Submitted successfully!');
        navigate('/score', { state: { answers } });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again later.');
    }
  };


  const handleViewHistory = () => {
  const timestamp = new Date().getTime();
  const url = `http://localhost:8000/history/${head}?t=${timestamp}`; 
  window.open(url, '_blank');
};



  return (
    <div className={styles.page}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h1>{head} Evaluation Form</h1>
        </div>

        {questions.map((q, i) => (
          <Question_form
            key={i}
            index={i}
            questionText={q}
            onAnswerChange={handleAnswerChange}
          />
        ))}

        <div className={styles.buttonGroup}>
          <button onClick={handleViewHistory}> View History</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
}