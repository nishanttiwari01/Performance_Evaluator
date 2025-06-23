// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Perf() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Performance Evaluator</h1>
//       <p>Select a testing module:</p>

//       <button
//         onClick={() => navigate('/etlForm')}
//         style={{
//           margin: '10px',
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//         }}
//       >
//         ETL Testing
//       </button>

//       <button
//         onClick={() => navigate('/biForm')}
//         style={{
//           margin: '10px',
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//         }}
//       >
//         BI Testing
//       </button>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perf() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === 'ETL') {
      navigate('/etlForm');
    } else if (value === 'BI') {
      navigate('/biForm');
    }
  };

  return (
    <div
      style={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '40px' }}>
        Choose an Engagement Type
      </h1>

      <select
        onChange={handleSelect}
        value={selected}
        style={{
          fontSize: '18px',
          padding: '14px 24px',
          borderRadius: '12px',
          border: '2px solid #007bff',
          boxShadow: '0 6px 12px rgba(0, 123, 255, 0.2)',
          cursor: 'pointer',
          appearance: 'none',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <option value="">Select an Option</option>
        <option value="ETL">ETL</option>
        <option value="BI">BI</option>
      </select>
    </div>
  );
}