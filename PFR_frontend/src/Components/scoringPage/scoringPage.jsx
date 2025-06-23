import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './scoringPage.module.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ScorePage() {
  const { state } = useLocation();
  const answers = state?.answers || [];
  const navigate = useNavigate();

  const count = { Yes: 0, No: 0, NA: 0 };
  answers.forEach(ans => count[ans.choice]++);

  const effectiveTotal = answers.length - count["NA"];
  const score = effectiveTotal > 0 ? (count["Yes"] / effectiveTotal) * 100 : 0;

  const data = {
    labels: ['Yes', 'No', 'NA'],
    datasets: [{
      data: [count.Yes, count.No, count.NA],
      backgroundColor: ['#4caf50', '#f44336', '#9e9e9e'],
      borderWidth: 2,
    }]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { boxWidth: 20, padding: 15 }
      },
      tooltip: {
        callbacks: {
          label: context => `${context.label}: ${context.raw}`
        }
      }
    }
  };

  const downloadResponse = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(answers);
    XLSX.utils.book_append_sheet(wb, ws, "Responses");
    XLSX.writeFile(wb, "response.xlsx");

    const doc = new jsPDF();
    const tableData = answers.map((a, i) => [i + 1, a.question, a.choice, a.justification || ""]);
    doc.autoTable({
      head: [["#", "Question", "Answer", "Justification"]],
      body: tableData,
      styles: { fontSize: 8 },
      theme: 'grid',
      headStyles: { fillColor: [38, 166, 154] }
    });
    doc.save("response.pdf");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Scoring Summary</h2>
      <div className={styles.chartWrapper}>
  <Doughnut data={data} options={options} />
  <div className={styles.scoreOverlay}>
    <div className={styles.scoreText}>{score.toFixed(1)}%</div>
  </div>
</div>


      <div className={styles.scoreDetails}>
        <p><strong>Total Questions:</strong> {answers.length}</p>
        <p><strong>Yes:</strong> {count.Yes} | <strong>No:</strong> {count.No} | <strong>NA:</strong> {count.NA}</p>
      </div>

      <div className={styles.buttonGroup}>
        
        <button onClick={downloadResponse}>Export Response</button>
      </div>
    </div>
  );
}
