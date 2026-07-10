import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProgressBar from '../components/ProgressBar';

gsap.registerPlugin(ScrollTrigger);

const skillsLeft = [
  { label: 'Spreadsheets/Reports', percentage: 95 },
  { label: 'Records Management', percentage: 90 },
  { label: 'Database Administration', percentage: 85 },
];

const skillsRight = [
  { label: 'MS Excel', percentage: 95 },
  { label: 'MS Word', percentage: 90 },
  { label: 'Vendor Management', percentage: 92 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-[100px] px-[40px] md:px-[60px] bg-section"
    >
      {/* Section label */}
      <p className="text-[11px] tracking-[0.25em] uppercase text-brand-secondary mb-2">
        What I Do?
      </p>
      <h2 className="skills-heading font-serif text-[36px] md:text-[44px] font-bold text-brand-primary mb-12 tracking-[0.05em]">
        MY EXPERTISE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
        <div>
          {skillsLeft.map((skill, i) => (
            <ProgressBar
              key={skill.label}
              label={skill.label}
              percentage={skill.percentage}
              delay={i * 0.15}
            />
          ))}
        </div>
        <div>
          {skillsRight.map((skill, i) => (
            <ProgressBar
              key={skill.label}
              label={skill.label}
              percentage={skill.percentage}
              delay={i * 0.15 + 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
