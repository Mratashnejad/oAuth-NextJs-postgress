// components/ProgressBar.tsx

import React, { useEffect, useState } from 'react';
import '@/css/ProgressBar.css';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Increment the progress until it reaches 100%
        if (prev < 100) {
          return prev + 1;
        }
        // Clear the interval once it reaches 100%
        clearInterval(interval);
        return 100;
      });
    }, 20); // Adjust the interval as needed

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
