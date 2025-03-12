
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Droplets, Heart, Users } from "lucide-react";

interface StatisticItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay?: number;
}

const StatisticItem = ({ icon, value, label, delay = 0 }: StatisticItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const step = Math.ceil(value / (duration / 15)); // 15ms interval
      const updateCount = () => {
        setCount((prevCount) => {
          const newCount = prevCount + step;
          return newCount >= value ? value : newCount;
        });
      };
      
      const interval = setInterval(() => {
        updateCount();
      }, 15);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return (
    <div 
      ref={ref}
      className={cn(
        "glass-card p-6 animate-reveal text-center",
        isVisible ? "revealed" : ""
      )}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blood/10 text-blood mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold mb-2 text-gradient">
        {count.toLocaleString()}+
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-20 -z-10 opacity-5">
          <svg 
            width="600" 
            height="600" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="#E63946" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatisticItem 
            icon={<Droplets size={32} />} 
            value={10000} 
            label="Lives Saved" 
            delay={0}
          />
          <StatisticItem 
            icon={<Users size={32} />} 
            value={5000} 
            label="Registered Donors" 
            delay={300}
          />
          <StatisticItem 
            icon={<Heart size={32} />} 
            value={15000} 
            label="Successful Donations" 
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
