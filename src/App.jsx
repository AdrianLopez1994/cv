import { useState, useEffect } from 'react';
import Section from './components/Section';
import ExperienceSection from './components/ExperienceSection';
import Header from './components/Header';
import TechnologiesSection from './components/TechnologiesSection';
import ContactSection from './components/ContactSection';
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="main-content">
        <Section className="hero-section">
          <Header />
        </Section>

        <ExperienceSection experiences={experiences.experiences} />

        <Section className="skills-section" title="Habilidades Técnicas">
          <TechnologiesSection experiences={experiences.experiences} technologies={technologies.technologies} />
        </Section>

        <ContactSection />
      </main>
    </div>
  );
}

export default App;
