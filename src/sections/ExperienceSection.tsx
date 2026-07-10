import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'Country Product Lead — Business Travel & Shared Services',
    company: 'Citibank N.A, Indonesia',
    period: '2018 – 2024',
    description:
      'Led corporate vehicle product initiatives for Citi Indonesia CCO and CBM vehicle provision. Led Managed Print Services for Consumer and Non-Consumer Business Groups. Managed printer migration projects for 2 headquarters and 10 branches. Oversaw cafeteria operations, supervised vendor performance, handled purchase orders and invoice validation, prepared monthly accruals, and collaborated on contract renewals.',
  },
  {
    title: 'Marketing Support — Retail Banking',
    company: 'Citibank N.A, Indonesia',
    period: '2009 – 2018',
    description:
      'Supported acquisition and portfolio program management, monitored sales deployment, managed gift redemptions and fulfillment, prepared marketing expense projections for Finance accruals, reviewed Internal Operation Manuals, managed vendor agreement renewals, and supported Citigold and Citibanking events.',
  },
  {
    title: 'Administrative Staff',
    company: 'YURIKO (Home Industry), Tangerang',
    period: '2008',
    description:
      'Prepared daily production reports as MIS basis, managed incoming and outgoing stock reports, handled daily employee attendance and weekly payroll, prepared customer bills, and managed company petty cash.',
  },
  {
    title: 'Administrative Staff',
    company: 'Generasi Mandiri Vocational School, Bogor',
    period: '2005 – 2006',
    description:
      'Improved school administration by computerizing the school database and payroll system, and prepared BOS (Bantuan Operasional Sekolah) quarterly and annual reports.',
  },
  {
    title: 'Administrative Staff',
    company: 'PT. Anak Bangsa Sejahtera',
    period: '2004 – 2005',
    description:
      'Responsible for company accounting and tax report preparation, ensuring compliance with regulatory requirements.',
  },
  {
    title: 'Production Administration Staff',
    company: 'PT. Samsung PP',
    period: '2004',
    description:
      'Monitored vendor purchase order fulfillment on daily production basis, ensuring timely delivery and inventory accuracy.',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience-heading', {
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

      gsap.utils.toArray<HTMLElement>('.timeline-entry').forEach((entry, i) => {
        gsap.from(entry, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-[100px] px-[40px] md:px-[60px] bg-section"
    >
      {/* Section label */}
      <p className="text-[11px] tracking-[0.25em] uppercase text-brand-secondary mb-2">
        Career Path
      </p>
      <h2 className="experience-heading font-serif text-[36px] md:text-[44px] font-bold text-brand-primary mb-12 tracking-[0.05em]">
        WORK EXPERIENCE
      </h2>

      <div className="relative max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-[20px] md:left-[100px] top-0 bottom-0 w-[1px] bg-[#e0dcd6]" />

        {experienceData.map((exp, i) => (
          <div
            key={i}
            className="timeline-entry relative flex flex-col md:flex-row gap-4 md:gap-8 mb-10"
          >
            {/* Date badge */}
            <div className="md:w-[120px] flex-shrink-0 flex md:justify-end">
              <div className="relative flex items-center">
                <div className="w-[40px] h-[40px] rounded-full bg-[#F5B304] flex items-center justify-center z-10">
                  <div className="w-[14px] h-[14px] rounded-full bg-white" />
                </div>
                <span className="ml-4 md:hidden text-[12px] text-brand-secondary font-medium">
                  {exp.period}
                </span>
              </div>
              <span className="hidden md:block text-[12px] text-brand-secondary font-medium mt-2 text-right">
                {exp.period}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pl-[56px] md:pl-0">
              <h3 className="text-[15px] font-medium text-brand-primary mb-1">
                {exp.title}
              </h3>
              <p className="text-[13px] text-[#F5B304] font-medium mb-3">
                {exp.company}
              </p>
              <p className="text-[13px] text-brand-secondary leading-[1.8]">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recognition */}
      <div className="mt-12 pt-8 border-t border-[#e0dcd6]">
        <h3 className="text-[14px] font-medium text-brand-primary tracking-[0.1em] uppercase mb-4">
          Recognition
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white border border-[#e8e4df] px-5 py-3">
            <p className="text-[12px] text-brand-secondary">
              Citi Shared Services APAC Employee of the Month —{' '}
              <span className="text-[#F5B304] font-medium">January 2023</span>
            </p>
          </div>
          <div className="bg-white border border-[#e8e4df] px-5 py-3">
            <p className="text-[12px] text-brand-secondary">
              Citi Shared Services APAC Employee of the Month —{' '}
              <span className="text-[#F5B304] font-medium">August 2022</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
