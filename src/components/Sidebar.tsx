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

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('home');

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
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[60] p-2 bg-white/80 backdrop-blur rounded-md shadow-sm lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} className="text-brand-primary" /> : <Menu size={24} className="text-brand-primary" />}
      </button>

      {/* Desktop floating open button (when sidebar is closed) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`hidden lg:flex fixed top-6 left-6 z-[60] p-3 bg-white shadow-lg rounded-full text-brand-primary transition-all duration-300 hover:text-[#F5B304] hover:scale-110 ${
          isOpen ? 'opacity-0 pointer-events-none -translate-x-10' : 'opacity-100 translate-x-0'
        }`}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-sidebar z-50 flex flex-col items-center pt-12 pb-8 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button Desktop */}
        <button
          onClick={() => setIsOpen(false)}
          className="hidden lg:flex absolute top-4 right-4 p-2 text-brand-secondary hover:text-[#F5B304] transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Profile image */}
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
          <img
            src="images/profile.jpg"
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
        <nav className="flex flex-col items-center gap-5 flex-1 w-full px-6">
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
                className={`text-[12px] tracking-[0.2em] transition-all duration-200 w-full text-center py-2 ${
                  isActive
                    ? 'text-[#F5B304] font-bold bg-white shadow-sm rounded-md'
                    : 'text-brand-primary hover:text-[#F5B304]'
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
