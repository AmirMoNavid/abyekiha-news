import { useEffect, useState } from 'react';

const DateAndTime = () => {
  const [date, setDate] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setInterval(() => setDate(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, []);
  return (
    <div className="date-time text-white flex gap-2">
      <p>{date?.toLocaleDateString('fa-IR')}</p>
      <p>{date?.toLocaleTimeString('fa-IR')}</p>
    </div>
  );
};

export default DateAndTime;
