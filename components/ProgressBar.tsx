import React, { useEffect, useState } from 'react';
import '@/css/ProgressBar.css';

interface ProgressBarProps {
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 95) {
            return prev + 1;
          }
          return prev;
        });
      }, 20);
    } else {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          }
          clearInterval(interval);
          return 100;
        });
      }, 20);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
