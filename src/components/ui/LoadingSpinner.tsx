import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 border-2 border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner spinning element */}
        <motion.div
          className="absolute top-1 left-1 w-14 h-14 border-2 border-transparent border-t-blue-500 border-r-cyan-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/20 rounded-full blur-sm animate-pulse" />
      </div>
      
      <motion.p
        className="absolute mt-24 text-blue-400 text-sm font-light tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
