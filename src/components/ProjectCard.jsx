import { motion } from 'framer-motion';
import { useState } from 'react';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="project-header">
        <h3>{project.name}</h3>
        <div className="project-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <img src="/images/github.svg" alt="GitHub" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <img src="/images/external-link.svg" alt="Demo" />
            </a>
          )}
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-features">
        <h4>Características principales:</h4>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="project-technologies">
        <h4>Tecnologías utilizadas:</h4>
        <div className="technologies-list">
          {project.technologies.map((tech, index) => (
            <div key={index} className="technology-item">
              <img src={tech.image} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 