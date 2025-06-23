import { useState, useEffect } from 'react';

function Showtime() {
  const [pdate, setPdate] = useState('');
  const [loaded, setLoad] = useState(false);

  const givedate = () => {
    const local = new Date();
    const fallback = `${local.getDate()}-${local.getMonth() + 1}-${local.getFullYear() +loaded}`;
    return fallback;
  };

  useEffect(() => {
    setPdate(givedate());
    const getCurrentDateTime = async () => {
      try {
        console.log("fetching");
        
        const res = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata');
        const data = await res.json();

        console.log(data)
        const sdate = `${data.day}-${data.month}-${data.year}`;
        setPdate(sdate);
        setLoad(true);
      } catch (error) {
        console.error('Failed to fetch time:', error);
        setPdate(givedate());
      }
    };

    setPdate(givedate());
    getCurrentDateTime();
  }, []);

  return (
    <span>Ver No.-1.0.0 | {pdate}</span>
  );
}

export default Showtime;
