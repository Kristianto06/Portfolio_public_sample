import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpertiseCard from '../components/ExpertiseCard';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    title: 'Operational Management',
    description: 'Overseeing corporate product initiatives with precision and efficiency.',
  },
  {
    title: 'Vendor Relations',
    description: 'Establishing strategic vendor relationships and continuous improvement.',
  },
  {
    title: 'Project Leadership',
    description: 'Managing complex migration projects and organizational transitions.',
  },
  {
    title: 'Administrative Excellence',
    description: 'Purchase orders, financial accruals, and meticulous record-keeping.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
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
      gsap.from('.about-text', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 70%',
          once: true,
        },
      });
      gsap.from('.about-image', {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
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
      id="about"
      ref={sectionRef}
      className="py-[100px] px-[40px] md:px-[60px]"
    >
      {/* Section label */}
      <p className="text-[11px] tracking-[0.25em] uppercase text-brand-secondary mb-2">
        Who Am I?
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column */}
        <div>
          <h2 className="about-heading font-serif text-[36px] md:text-[44px] font-bold text-brand-primary mb-6 leading-tight">
            ABOUT ME
          </h2>
          <div className="about-text space-y-4">
            <p className="text-[14px] text-brand-secondary leading-[1.8]">
              A seasoned professional with a demonstrated track record of success in
              operational management, I have led transformative initiatives across diverse
              sectors, notably within Citi Indonesia.
            </p>
            <p className="text-[14px] text-brand-secondary leading-[1.8]">
              From overseeing corporate vehicle product initiatives to managing complex printer
              migration projects and ensuring seamless transitions during organizational changes,
              I have consistently delivered results with precision and efficiency.
            </p>
            <p className="text-[14px] text-brand-secondary leading-[1.8]">
              With a keen focus on optimizing service delivery and fostering strategic vendor
              relationships, I have implemented rigorous quality standards and spearheaded
              continuous improvement efforts.
            </p>
          </div>
        </div>

        {/* Right column - Image */}
        <div className="about-image flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px]">
            <img
              src="/images/profile.jpg"
              alt="Fitrianah - Operations Leader"
              className="w-full h-auto object-cover shadow-lg"
            />
            {/* Decorative accent line */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-[#F5B304]" />
          </div>
        </div>
      </div>

      {/* Expertise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {expertiseData.map((item, i) => (
          <ExpertiseCard
            key={item.title}
            title={item.title}
            description={item.description}
            delay={i * 0.15}
          />
        ))}
      </div>
    </section>
  );
}
