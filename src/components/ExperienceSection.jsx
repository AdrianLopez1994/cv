import Section from './Section';
import ExperienceCard from './ExperienceCard';
import experiencesData from '../data/experiences.json';

const ExperienceSection = () => {
  return (
    <Section className="experience-section" title="Professional Experience">
      <div className="experiences-container">
        {experiencesData.experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection; 