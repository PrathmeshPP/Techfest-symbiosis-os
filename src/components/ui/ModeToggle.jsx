import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ModeToggle() {
  const { mode, toggleMode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <div className="flex items-center space-x-3">
      <motion.span 
        className="text-[10px] font-mono tracking-widest uppercase font-bold"
        animate={{ opacity: !isCyborg ? 1 : 0.4, color: !isCyborg ? "#111111" : "#ffffff" }}
        transition={{ duration: 0.4 }}
      >
        Human
      </motion.span>
      
      <button 
        onClick={toggleMode}
        className="relative flex items-center w-14 h-6 rounded-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
        aria-label="Toggle Human / Cyborg Mode"
      >
        <motion.div 
          className="absolute inset-0 w-full h-full border rounded-full"
          animate={{
            borderColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.2)",
            backgroundColor: isCyborg ? "rgba(10, 10, 10, 0.8)" : "rgba(240, 240, 245, 0.9)",
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="absolute w-4 h-4 rounded-full z-10 flex items-center justify-center"
          animate={{
            x: isCyborg ? 32 : 0,
            backgroundColor: isCyborg ? "#00f0ff" : "#111111",
            boxShadow: isCyborg ? "0 0 10px rgba(0,240,255,0.6)" : "0 2px 4px rgba(0,0,0,0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-white" 
            animate={{ scale: isCyborg ? 1 : 0 }} 
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </button>

      <motion.span 
        className="text-[10px] font-mono tracking-widest uppercase font-bold"
        animate={{ opacity: isCyborg ? 1 : 0.4, color: isCyborg ? "#00f0ff" : "#111111" }}
        transition={{ duration: 0.4 }}
      >
        Cyborg
      </motion.span>
    </div>
  );
}
