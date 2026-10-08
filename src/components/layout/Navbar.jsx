import React from 'react';
import ModeToggle from '../ui/ModeToggle';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-auto"
      animate={{
        backgroundColor: isCyborg ? "rgba(3, 3, 3, 0.5)" : "rgba(245, 245, 245, 0.7)",
        borderBottom: isCyborg ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)"
      }}
      style={{ backdropFilter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="font-sans font-bold text-xl tracking-widest uppercase flex items-center">
        Symbiosis
        <motion.span 
          animate={{ color: isCyborg ? "#00f0ff" : "#111111" }} 
          transition={{ duration: 0.8 }}
        >
          OS
        </motion.span>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-wide">
          <button className="hover:opacity-70 transition-opacity duration-300">System</button>
          <button className="hover:opacity-70 transition-opacity duration-300">Capabilities</button>
        </div>
        <ModeToggle />
      </div>
    </motion.nav>
  );
}
