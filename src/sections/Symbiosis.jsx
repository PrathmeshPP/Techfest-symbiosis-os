import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Symbiosis() {
  const containerRef = useRef();
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.symbiosis-scroll-trigger',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        }
      });
      tl.from(".sym-left", { x: -30, opacity: 0, ease: "power2.out" }, 0)
        .from(".sym-right", { x: 30, opacity: 0, ease: "power2.out" }, 0)
        .from(".sym-center", { scale: 0.5, opacity: 0, ease: "back.out(1.5)" }, 0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="symbiosis-scroll-trigger relative w-full min-h-[80vh] flex items-center justify-center px-6 py-24 z-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Organic / Human Side */}
        <div className="sym-left flex flex-col space-y-4 text-center md:text-right">
          <motion.h3 
            className="text-2xl font-semibold tracking-wide"
            animate={{ color: isCyborg ? "#ffffff" : "#111111" }}
          >
            Organic Intellect
          </motion.h3>
          <motion.p 
            className="text-sm font-sans leading-relaxed"
            animate={{ color: isCyborg ? "rgba(255,255,255,0.6)" : "rgba(17,17,17,0.7)" }}
          >
            The chaotic, beautiful intuition of the human mind. Capable of unparalleled creativity, emotional depth, and leaps of logic that defy rigid structure.
          </motion.p>
        </div>

        {/* Central Convergence Element */}
        <div className="sym-center flex flex-col items-center justify-center relative py-12 md:py-0">
          <motion.div 
            className="w-[1px] h-32 absolute top-1/2 -translate-y-1/2"
            animate={{
              backgroundColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.2)"
            }}
          />
          <motion.div 
            className="w-12 h-12 rounded-full border flex items-center justify-center z-10 backdrop-blur-md"
            animate={{
              borderColor: isCyborg ? "rgba(0, 240, 255, 0.5)" : "rgba(17, 17, 17, 0.3)",
              backgroundColor: isCyborg ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)"
            }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: isCyborg ? "#00f0ff" : "#111111"
              }}
            />
          </motion.div>
          <motion.div 
            className="mt-6 text-[10px] font-mono tracking-widest uppercase"
            animate={{ color: isCyborg ? "rgba(255,255,255,0.4)" : "rgba(17,17,17,0.5)" }}
          >
            Convergence
          </motion.div>
        </div>

        {/* Machine / Synthetic Side */}
        <div className="sym-right flex flex-col space-y-4 text-center md:text-left">
          <motion.h3 
            className="text-2xl font-mono tracking-tight"
            animate={{ color: isCyborg ? "#00f0ff" : "#111111" }}
          >
            SYNTHETIC_LOGIC
          </motion.h3>
          <motion.p 
            className="text-sm font-mono leading-relaxed"
            animate={{ color: isCyborg ? "rgba(255,255,255,0.6)" : "rgba(17,17,17,0.7)" }}
          >
            [SYS.DATA] Impeccable precision. The structured, flawless execution of synthetic neural networks processing infinite variables in microseconds.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
