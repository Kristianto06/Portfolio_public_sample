import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
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
      gsap.from('.contact-form', {
        x: 40,
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
    >
      {/* Left column - Dark panel */}
      <div className="relative bg-[#111111] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-10">
          <h2 className="contact-heading font-serif text-[32px] md:text-[40px] font-bold text-white mb-4">
            LET'S CONNECT
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-sm mx-auto mb-8">
            Available for operational leadership roles and strategic consulting.
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B304" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-[13px] text-white/80">little_fitrah@yahoo.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B304" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="text-[13px] text-white/80">0817874824</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B304" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-[13px] text-white/80">Tangerang, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - Contact form */}
      <div className="contact-form bg-white flex items-center justify-center px-10 py-16">
        <div className="w-full max-w-md">
          <h3 className="text-[14px] tracking-[0.15em] uppercase text-brand-secondary mb-8">
            Send a Message
          </h3>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-[60px] h-[60px] rounded-full bg-[#F5B304] flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-[16px] text-brand-primary font-medium">Message sent!</p>
              <p className="text-[13px] text-brand-secondary mt-1">Thank you for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-[#e0dcd6] px-4 py-3 text-[13px] text-brand-primary placeholder:text-brand-secondary/60 focus:outline-none focus:border-[#F5B304] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#e0dcd6] px-4 py-3 text-[13px] text-brand-primary placeholder:text-brand-secondary/60 focus:outline-none focus:border-[#F5B304] transition-colors"
              />
              <input
                type="text"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-[#e0dcd6] px-4 py-3 text-[13px] text-brand-primary placeholder:text-brand-secondary/60 focus:outline-none focus:border-[#F5B304] transition-colors"
              />
              <textarea
                placeholder="Message"
                rows={5}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-[#e0dcd6] px-4 py-3 text-[13px] text-brand-primary placeholder:text-brand-secondary/60 focus:outline-none focus:border-[#F5B304] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#F5B304] text-white text-[12px] tracking-[0.2em] uppercase py-4 transition-all duration-200 hover:bg-[#e0a204]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
