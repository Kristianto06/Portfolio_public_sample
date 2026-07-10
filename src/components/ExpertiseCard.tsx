import { Hexagon } from 'lucide-react';
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
        <Hexagon size={60} strokeWidth={1.5} className="text-[#F5B304]" />
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
