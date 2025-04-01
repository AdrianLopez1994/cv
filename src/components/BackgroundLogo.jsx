import { motion } from 'framer-motion';

const BackgroundLogo = () => {
  return (
    <div className="background-logo-container">
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="background-logo"
      >
        <motion.path
          d="M200 40C111.63 40 40 111.63 40 200C40 288.37 111.63 360 200 360C288.37 360 360 288.37 360 200C360 111.63 288.37 40 200 40Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M200 120V280"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M120 200H280"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
        />
      </motion.svg>
    </div>
  );
};

export default BackgroundLogo; 