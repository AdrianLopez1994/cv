import { useState, useEffect } from 'react';
import Section from './components/Section';
import ExperienceSection from './components/ExperienceSection';
import Header from './components/Header';
import TechnologiesSection from './components/TechnologiesSection';
import experiences from './data/experiences.json';
import technologies from './data/technologies.json';

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
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <main>
      <Section className="hero-section">
        <Header />
      </Section>

      <ExperienceSection experiences={experiences.experiences} />

      <Section className="skills-section" title="Habilidades Técnicas">
        <TechnologiesSection experiences={experiences.experiences} technologies={technologies.technologies} />
      </Section>

      <Section className="projects-section" title="Proyectos" style={{ marginTop: '100px' }}>
        <h2>Proyectos Personales</h2>
        
      </Section>

      <Section className="education-section" title="Educación">
        {/* Aquí irá tu educación */}
      </Section>

      <Section className="contact-section" title="Contacto">
        {/* Aquí irá tu información de contacto */}
      </Section>
    </main>
  );
}

export default App;
