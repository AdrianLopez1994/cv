import { useState, useEffect } from 'react';
import Section from './components/Section';
import ExperienceSection from './components/ExperienceSection';
import Header from './components/Header';
import TechnologiesSection from './components/TechnologiesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import experiences from './data/experiences.json';
import technologies from './data/technologies.json';
import projects from './data/projects.json';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Section className="hero-section">
        <Header />
      </Section>

      <ExperienceSection experiences={experiences.experiences} />

      <Section className="skills-section" title="Tech Habilities">
        <TechnologiesSection experiences={experiences.experiences} technologies={technologies.technologies} />
      </Section>

      <Section className="projects-section" title="Latest Personal Projects">
        <ProjectsSection projects={projects.projects} />
      </Section>

      <ContactSection />
    </div>
  );
}

export default App;
