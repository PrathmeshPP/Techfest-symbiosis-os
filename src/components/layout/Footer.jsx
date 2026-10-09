import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';
  
  return (
    <footer className={`relative z-10 w-full py-8 px-6 text-center border-t transition-colors duration-700 ${
      isCyborg ? 'border-white/10' : 'border-gray-200'
    }`}>
      <p className={`font-mono text-xs tracking-widest uppercase transition-colors duration-700 ${
        isCyborg ? 'text-gray-600' : 'text-gray-400'
      }`}>
        © {currentYear} Symbiosis OS. All Systems Nominal.
      </p>
    </footer>
  );
}
