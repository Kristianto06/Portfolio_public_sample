import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.9,
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8f6f3] to-white"
    >
      <div
        ref={textRef}
        className="relative z-10 text-center px-8 max-w-2xl"
      >
        <h1 className="hero-title font-serif text-[52px] md:text-[72px] font-bold text-brand-primary leading-tight mb-4">
          Hi! I'm
          <br />
          Fitrianah
        </h1>
        <p className="hero-subtitle text-[14px] md:text-[16px] text-brand-secondary leading-relaxed mb-8 max-w-lg mx-auto">
          Results-Driven Operations Leader based in Tangerang, specializing in
          operational management and strategic vendor relationships.
        </p>
        <a
          href="#contact"
          className="hero-cta inline-block border-2 border-brand-primary text-brand-primary px-8 py-3 text-[12px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-[#F5B304] hover:border-[#F5B304] hover:text-white"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
