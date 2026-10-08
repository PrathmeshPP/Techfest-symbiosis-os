import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const containerRef = useRef();
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-text-wrapper", {
        y: 15,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3
      });

      tl.from(".hero-hud-wrapper", {
        opacity: 0,
        x: (index, target) => target.classList.contains('left-hud') ? -10 : 10,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.8");

      tl.from(".hero-btn-wrapper", {
        y: 10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-scroll-trigger relative w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10 px-6">
      
      {/* Subtle Technical HUD Labels */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Top Left */}
        <div className="hero-hud-wrapper left-hud absolute top-24 left-6 md:top-32 md:left-12 flex flex-col gap-1">
          <motion.div animate={{ opacity: isCyborg ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="text-[10px] text-accent font-mono uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              Neural Link
            </div>
            <div className="text-[11px] text-white/40 font-mono tracking-wider drop-shadow-md">ACTIVE</div>
          </motion.div>
        </div>

        {/* Top Right */}
        <div className="hero-hud-wrapper right-hud absolute top-24 right-6 md:top-32 md:right-12 flex flex-col gap-1 items-end">
          <motion.div animate={{ opacity: isCyborg ? 1 : 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-end">
            <div className="text-[10px] opacity-40 font-mono uppercase tracking-widest drop-shadow-md">Core Status</div>
            <div className="text-[11px] opacity-80 font-mono tracking-wider drop-shadow-md">OPTIMAL</div>
          </motion.div>
        </div>

        {/* Bottom Left */}
        <div className="hero-hud-wrapper left-hud absolute bottom-24 left-6 md:bottom-32 md:left-12 flex flex-col gap-1">
          <motion.div animate={{ opacity: isCyborg ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest drop-shadow-md">Sync Rate</div>
            <div className="text-[11px] text-primary/80 font-mono tracking-wider drop-shadow-md">99.8%</div>
          </motion.div>
        </div>

        {/* Bottom Right */}
        <div className="hero-hud-wrapper right-hud absolute bottom-24 right-6 md:bottom-32 md:right-12 flex flex-col gap-1 items-end">
          <motion.div animate={{ opacity: isCyborg ? 1 : 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-end">
            <div className="text-[10px] opacity-40 font-mono uppercase tracking-widest drop-shadow-md">Protocol</div>
            <div className="text-[11px] opacity-80 font-mono tracking-wider drop-shadow-md">V-1.0.4</div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-5xl mt-16 pointer-events-auto">
        <div className="hero-text-wrapper">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <motion.span 
              className="block"
              animate={{ opacity: isCyborg ? 0.9 : 1, color: isCyborg ? "#ffffff" : "#111111" }}
              transition={{ duration: 0.8 }}
            >
              THE SYMBIOSIS
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text"
              animate={{
                backgroundImage: isCyborg 
                  ? "linear-gradient(to right, #ffffff, #e0e0e0, #00f0ff)" 
                  : "linear-gradient(to right, #111111, #444444, #777777)"
              }}
              transition={{ duration: 0.8 }}
            >
              OPERATING SYSTEM
            </motion.span>
          </h1>
        </div>
        
        <div className="hero-text-wrapper">
          <motion.p 
            className="text-base md:text-lg max-w-2xl mx-auto mb-12 font-mono tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            animate={{ color: isCyborg ? "rgba(224, 224, 224, 0.9)" : "rgba(17, 17, 17, 0.7)" }}
            transition={{ duration: 0.8 }}
          >
            Initiating neural handshake. Bridging the gap between organic consciousness and synthetic intelligence.
          </motion.p>
        </div>
        
        <div className="flex space-x-4 md:space-x-6">
          <div className="hero-btn-wrapper">
            <motion.button 
              className="px-6 py-3 md:px-8 md:py-4 border rounded-sm tracking-widest font-mono text-xs md:text-sm uppercase transition-all duration-300"
              animate={{
                backgroundColor: isCyborg ? "rgba(0, 240, 255, 0.1)" : "transparent",
                borderColor: isCyborg ? "#00f0ff" : "#111111",
                color: isCyborg ? "#00f0ff" : "#111111",
                boxShadow: isCyborg ? "0 0 15px rgba(0,240,255,0.2)" : "none"
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              Initialize
            </motion.button>
          </div>
          <div className="hero-btn-wrapper">
            <motion.button 
              className="px-6 py-3 md:px-8 md:py-4 border rounded-sm tracking-widest font-mono text-xs md:text-sm uppercase transition-all duration-300 backdrop-blur-sm"
              animate={{
                backgroundColor: "transparent",
                borderColor: isCyborg ? "rgba(255, 255, 255, 0.2)" : "rgba(17, 17, 17, 0.2)",
                color: isCyborg ? "#ffffff" : "#111111"
              }}
              whileHover={{ backgroundColor: isCyborg ? "rgba(255,255,255,0.1)" : "rgba(17,17,17,0.05)" }}
              transition={{ duration: 0.4 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-text-wrapper absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div animate={{ opacity: isCyborg ? 0.7 : 0.4, color: isCyborg ? "#ffffff" : "#111111" }} className="flex flex-col items-center">
          <span className="font-mono text-xs mb-3 tracking-widest uppercase">System Boot</span>
          <motion.div 
            className="w-[1px] h-16"
            animate={{ backgroundImage: isCyborg ? "linear-gradient(to bottom, rgba(0, 240, 255, 0.5), transparent)" : "linear-gradient(to bottom, rgba(17, 17, 17, 0.5), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
