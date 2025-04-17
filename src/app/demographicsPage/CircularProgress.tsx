import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  isVisible: boolean;
  className?: string;
}

const CircularProgress = ({ percentage, isVisible, className = '' }: CircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isVisible) {
      const duration = 500;
      const startTime = performance.now();
      const startProgress = progress;
      const progressDiff = percentage - startProgress;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setProgress(startProgress + (progress * progressDiff));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setProgress(0);
    }
  }, [percentage, isVisible, progress]);

  const strokeDashoffset = Math.max(0, circumference - ((progress || 0) / 100) * circumference);

  return (
    <div className={`relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="black"
          strokeWidth="1"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <p className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[24px]">{Math.round(progress)}%</p>
    </div>
  );
};

export default CircularProgress; 