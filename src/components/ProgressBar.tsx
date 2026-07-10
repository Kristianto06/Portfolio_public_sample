import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProgressBarProps {
  label: string;
  percentage: number;
  delay?: number;
}

export default function ProgressBar({ label, percentage, delay = 0 }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(fillRef.current!, {
        width: '0%',
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current!,
          start: 'top 85%',
          once: true,
        },
      });
    }, barRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={barRef} className="mb-7">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[13px] text-brand-primary font-medium">{label}</span>
        <span className="text-[13px] text-[#F5B304] font-medium">{percentage}%</span>
      </div>
      <div className="w-full h-[4px] bg-[#e8e4df] rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: '#F5B304',
          }}
        />
      </div>
    </div>
  );
}
