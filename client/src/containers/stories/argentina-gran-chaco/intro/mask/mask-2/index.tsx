import { motion } from 'framer-motion';

const NUMBERS = [
  {
    id: 1,
    name: 'Critically endangered ecosystem',
    value: '70.7%',
  },
  {
    id: 2,
    name: 'Agricultural frontier zone',
    value: '16.5%',
  },
  {
    id: 3,
    name: 'High biodiversity value',
    value: '4.1%',
  },
  {
    id: 4,
    name: 'Other risks',
    value: '&',
  },
];

const Mask2 = () => {
  return (
    <motion.div
      key="mask-2"
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute bottom-0 left-0 w-1/2"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
    >
      <div className="relative">
        <motion.div
          className="absolute bottom-full left-0 h-4 w-0 bg-white"
          variants={{
            initial: { width: 0 },
            animate: { width: '100%' },
            exit: { width: '100%' },
          }}
          transition={{ duration: 1 }}
        />

        <dl className="grid grid-cols-12 py-3">
          {NUMBERS.map((n, i) => (
            <div key={n.id} className="col-span-3">
              <motion.div
                className="px-5 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.75 + i * 0.2 } }}
                exit={{ opacity: 0, y: 20 }}
              >
                <dd className="font-display text-3xl">{n.value}</dd>
                <dt className="text-sm font-light">{n.name}</dt>
              </motion.div>
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
};

export default Mask2;
