import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseCardProps {
  title: string;
  description: string;
  delay?: number;
}

export default function ExpertiseCard({ title, description, delay = 0 }: ExpertiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current!, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current!,
          start: 'top 85%',
          once: true,
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center text-center p-6 group"
    >
      <div className="w-[70px] h-[70px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#F5B304" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      </div>
      <h4 className="text-[13px] font-medium tracking-[0.1em] uppercase text-brand-primary mb-3">
        {title}
      </h4>
      <p className="text-[13px] text-brand-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
