import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Section = ({ children, title, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <motion.section
      ref={ref}
      className={`section ${className}`}
      initial={{ opacity: 1, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </motion.section>
  );
};

export default Section; 