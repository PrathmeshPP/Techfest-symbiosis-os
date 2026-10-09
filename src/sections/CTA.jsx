import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/ui/MagneticButton';
import DecoderText from '../components/ui/DecoderText';

export default function CTA() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10 text-center overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${
          isCyborg ? 'bg-accent/20' : 'bg-gray-300/30'
        }`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
      >
        <h2 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 transition-colors duration-700 ${
          isCyborg ? 'text-white' : 'text-gray-900'
        }`}>
          THE NEXT EVOLUTION <br className="hidden md:block" />
          <span className={`transition-colors duration-700 ${isCyborg ? 'text-accent' : 'text-gray-500 font-normal'}`}>STARTS HERE.</span>
        </h2>
        
        <p className={`text-lg md:text-xl font-light mb-12 max-w-xl transition-colors duration-700 ${
          isCyborg ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Bridge the gap. Enhance your potential. Embrace the perfect harmony of Human and Machine with Symbiosis OS.
        </p>

        <MagneticButton>
          <a href="#initiate" className={`relative overflow-hidden px-8 py-4 flex items-center justify-center font-mono text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
            isCyborg 
              ? 'bg-transparent text-accent border border-accent/50 hover:bg-accent/10 hover:border-accent shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]' 
              : 'bg-black text-white border border-black hover:bg-gray-900 shadow-xl'
          }`}>
            <DecoderText text="INITIATE SEQUENCE" />
          </a>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
