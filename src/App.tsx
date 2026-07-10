import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check initial window width on mount
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'}`}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
