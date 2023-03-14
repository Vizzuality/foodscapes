import { motion } from 'framer-motion';

const Mask1 = () => {
  return (
    <motion.div
      key="mask-1"
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute top-0 left-0 h-full w-1/2"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
    >
      <motion.div
        className="absolute h-0 w-4 bg-white"
        variants={{
          initial: { height: 0, right: '33.33%', top: 0 },
          animate: { height: '100%', right: '33.33%', top: 0 },
          exit: { height: '100%', right: '33.33%', top: 0 },
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute h-4 w-0 bg-white"
        variants={{
          initial: { width: 0, top: '66.66%', right: 0 },
          animate: { width: '33.33%', top: '66.66%', right: 0 },
          exit: { width: '33.33%', top: '66.66%', right: 0 },
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute h-0 w-4 bg-white"
        variants={{
          initial: { height: 0, bottom: 0, right: `${(1 / (3 * 3)) * 100}%` },
          animate: { height: '33.33%', bottom: 0, right: `${(1 / (3 * 3)) * 100}%` },
          exit: { height: '33.33%', bottom: 0, right: `${(1 / (3 * 3)) * 100}%` },
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute h-4 w-0 bg-white"
        variants={{
          initial: { width: 0, bottom: `${(1 / (3 * 2)) * 100}%`, right: 0 },
          animate: {
            width: `${(1 / (3 * 3)) * 100}%`,
            bottom: `${(1 / (3 * 2)) * 100}%`,
            right: 0,
          },
          exit: {
            width: `${(1 / (3 * 3)) * 100}%`,
            bottom: `${(1 / (3 * 2)) * 100}%`,
            right: 0,
          },
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute h-4 w-0 bg-white"
        variants={{
          initial: { width: 0, bottom: `${(1 / (3 * 6)) * 100}%`, right: 0 },
          animate: {
            width: `${(1 / (3 * 3)) * 100}%`,
            bottom: `${(1 / (3 * 6)) * 100}%`,
            right: 0,
          },
          exit: {
            width: `${(1 / (3 * 3)) * 100}%`,
            bottom: `${(1 / (3 * 6)) * 100}%`,
            right: 0,
          },
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute h-0 w-4 bg-white"
        variants={{
          initial: { height: 0, bottom: 0, right: `${(1 / (3 * 7.5)) * 100}%` },
          animate: {
            height: `${(1 / (3 * 6)) * 100}%`,
            bottom: 0,
            right: `${(1 / (3 * 7.5)) * 100}%`,
          },
          exit: {
            height: `${(1 / (3 * 6)) * 100}%`,
            bottom: 0,
            right: `${(1 / (3 * 7.5)) * 100}%`,
          },
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default Mask1;
