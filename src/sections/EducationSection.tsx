import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Sekolah Tinggi Akuntansi Negara, Jakarta',
    major: 'Actuarial',
    period: '1998 – 2002',
    details:
      'Completed studies in Actuarial Science, developing strong analytical and mathematical skills. Gained expertise in risk assessment, statistical analysis, and financial modeling that formed the foundation for a career in operational management and data-driven decision making.',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.education-heading', {
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
      id="education"
      ref={sectionRef}
      className="py-[100px] px-[40px] md:px-[60px]"
    >
      {/* Section label */}
      <p className="text-[11px] tracking-[0.25em] uppercase text-brand-secondary mb-2">
        Qualification
      </p>
      <h2 className="education-heading font-serif text-[36px] md:text-[44px] font-bold text-brand-primary mb-12 tracking-[0.05em]">
        EDUCATION
      </h2>

      <div className="max-w-3xl">
        {educationData.map((edu, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-[#e8e4df] mb-3">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
                  isOpen ? 'bg-[#F5B304] text-white' : 'bg-[#f5f3f0] text-brand-primary hover:bg-[#eceae6]'
                }`}
              >
                <div>
                  <span className="text-[13px] md:text-[14px] font-medium tracking-[0.05em] uppercase">
                    {edu.degree}
                  </span>
                  <span
                    className={`text-[12px] ml-3 ${
                      isOpen ? 'text-white/80' : 'text-brand-secondary'
                    }`}
                  >
                    | {edu.period}
                  </span>
                </div>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? '300px' : '0',
                }}
              >
                <div className="px-6 py-5 bg-white">
                  <p className="text-[13px] font-medium text-brand-primary mb-1">
                    Major: {edu.major}
                  </p>
                  <p className="text-[13px] text-brand-secondary leading-[1.8]">
                    {edu.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
