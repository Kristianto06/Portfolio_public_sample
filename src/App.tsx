import Sidebar from './components/Sidebar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  return (
    <div className="relative">
      <Sidebar />
      <main className="lg:ml-[280px]">
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
