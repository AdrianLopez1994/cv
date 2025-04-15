import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceCard = ({ experience }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" });

  const renderDescription = () => {
    if (Array.isArray(experience.description)) {
      return (
        <div className="description">
          {experience.description.map((project, index) => (
            <div key={index} className="project">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="description">
          <p>{experience.description}</p>
        </div>
      );
    }
  };

  return (
    <motion.div
      ref={ref}
      className="experience-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="experience-header">
        <div className="company-info">
          {experience.companyLogo && (
            <img
              src={experience.companyLogo}
              alt={`${experience.company} logo`}
              className="company-logo"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <div>
            <h3 className="company-name">{experience.company}</h3>
            <p className="position-title">{experience.position}</p>
          </div>
        </div>
        <div className="experience-dates">
          <strong>{experience.dates || `${experience.startDate} - ${experience.endDate}`}</strong>
        </div>
      </div>

      {renderDescription()}

      {experience.technologies && experience.technologies.length > 0 && (
        <div className="technologies">
          <h4>Tecnologies</h4>
          <div className="tech-stack">
            {experience.technologies.map((tech, index) => (
              <div key={index} className="tech-item">
                <img 
                  src={tech.image || tech.imageUrl} 
                  alt={tech.name}
                  onError={(e) => e.target.style.display = 'none'}
                />
                <span>{tech.name}</span>
                {tech.aclaracion && (
                  <span className="tech-aclaracion">{tech.aclaracion}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {experience.responsibilities && experience.responsibilities.length > 0 && (
        <div className="responsibilities">
          <h4>Responsabilities</h4>
          <ul>
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceCard; 