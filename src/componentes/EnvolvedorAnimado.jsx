import { motion } from 'framer-motion';

const EnvolvedorAnimado = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full flex flex-col min-h-0"
    >
      {children}
    </motion.div>
  );
};

export default EnvolvedorAnimado;
