import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.slice(1));
      let current = sections[0];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-5 left-5 z-[60] p-2 lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-sidebar z-50 flex flex-col items-center pt-12 pb-8 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Profile image */}
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
          <img
            src="/images/profile.jpg"
            alt="Fitrianah"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="font-serif text-[22px] font-bold text-brand-primary tracking-wide mb-1">
          Fitrianah
        </h1>

        {/* Title */}
        <p className="text-[11px] text-brand-secondary tracking-[0.15em] uppercase mb-10 text-center px-4">
          Operations Leader in Tangerang
        </p>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-5 flex-1">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`text-[12px] tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[#2c98f0] font-medium'
                    : 'text-brand-primary hover:text-[#2c98f0]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="text-center mt-auto">
          <p className="text-[11px] text-brand-secondary">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}
