import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import projects from '../data/projects.json';

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="projects-container" ref={ref}>
      {projects.projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="project-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
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
                  title="Ver en GitHub"
                >
                  <img src="/images/technologies/git.png" alt="GitHub" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  title="Ver Demo"
                >
                  <img src="/images/web/ojo.png" alt="Demo" />
                </a>
              )}
            </div>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-features">
            <h4>Características</h4>
            <ul>
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="project-technologies">
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsSection; 