import Section from './Section';
import ExperienceCard from './ExperienceCard';
import experiencesData from '../data/experiences.json';

const ExperienceSection = () => {
  return (
    <Section className="experience-section" title="Experiencia Profesional">
      <div className="experiences-container">
        {experiencesData.experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection; 