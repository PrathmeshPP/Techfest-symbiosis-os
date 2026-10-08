import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import DecoderText from '../components/ui/DecoderText';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    id: "01",
    title: "Neural Integration",
    desc: "Seamless bridging of organic cognitive pathways with synthetic data streams, achieving zero-latency thought-to-execution mapping.",
    sysCode: "SYS.NI.404",
    sync: "99.9%",
    status: "ACTIVE",
    category: "CORE",
  },
  {
    id: "02",
    title: "Adaptive Systems",
    desc: "Self-correcting algorithms that evolve in real-time, responding dynamically to unprecedented environmental and systemic variables.",
    sysCode: "SYS.AS.112",
    sync: "94.2%",
    status: "OPTIMAL",
    category: "LOGIC",
  },
  {
    id: "03",
    title: "Bio-Mechanical Sync",
    desc: "Flawless physical articulation through direct motor cortex translation. Enhances strength, precision, and durability beyond human limits.",
    sysCode: "SYS.BM.880",
    sync: "98.7%",
    status: "STABLE",
    category: "MOTOR",
  },
  {
    id: "04",
    title: "Consciousness Layer",
    desc: "Preserves identity and continuous experience across hardware transitions. The absolute pinnacle of the symbiotic framework.",
    sysCode: "SYS.CL.001",
    sync: "100%",
    status: "CRITICAL",
    category: "SOUL",
  }
];

function CapabilityCard({ data, isCyborg }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Simple pseudo-3d highlight effect using framer motion templates
  const backgroundHighlight = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, ${isCyborg ? 'rgba(0, 240, 255, 0.15)' : 'rgba(17, 17, 17, 0.08)'} 0%, transparent 80%)`;

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cap-card relative flex flex-col justify-between p-6 md:p-8 min-h-[320px] rounded-sm group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      tabIndex={0}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      animate={{
        backgroundColor: isCyborg ? "rgba(10, 10, 10, 0.6)" : "rgba(255, 255, 255, 0.7)",
        borderColor: isCyborg ? "rgba(255, 255, 255, 0.1)" : "rgba(17, 17, 17, 0.15)",
        boxShadow: isCyborg ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "0 4px 30px rgba(0, 0, 0, 0.05)"
      }}
      style={{
        borderWidth: "1px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Interactive Background Highlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: backgroundHighlight }}
      />

      {/* Top Header / Metadata */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <motion.span
          className="text-xs font-mono tracking-widest"
          animate={{ color: isCyborg ? "#00f0ff" : "#111111" }}
        >
          {data.id} // {data.category}
        </motion.span>

        <div className="flex flex-col items-end">
          <motion.span
            className="text-[10px] font-mono tracking-wider opacity-60 uppercase"
            animate={{ color: isCyborg ? "#ffffff" : "#111111" }}
          >
            {data.sysCode}
          </motion.span>
          <motion.div
            className="text-[10px] font-mono tracking-widest mt-1 flex items-center gap-1.5"
            animate={{ color: isCyborg ? "rgba(255, 255, 255, 0.4)" : "rgba(17, 17, 17, 0.5)" }}
          >
            <span className={`w-1 h-1 rounded-full ${isCyborg ? 'bg-[#00f0ff]' : 'bg-[#111111]'}`}></span>
            {data.status}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-end">
        <motion.h4
          className="text-xl md:text-2xl font-semibold tracking-tight mb-3"
          animate={{ color: isCyborg ? "#ffffff" : "#111111" }}
        >
          {data.title}
        </motion.h4>
        <motion.p
          className="text-sm leading-relaxed"
          animate={{ color: isCyborg ? "rgba(255, 255, 255, 0.6)" : "rgba(17, 17, 17, 0.7)" }}
        >
          {data.desc}
        </motion.p>
      </div>

      {/* Footer Metadata */}
      <div className="mt-8 pt-4 border-t flex justify-between items-center relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: isCyborg ? "rgba(255, 255, 255, 0.1)" : "rgba(17, 17, 17, 0.1)" }}
      >
        <motion.span className="text-[10px] font-mono tracking-widest uppercase" animate={{ color: isCyborg ? "rgba(255, 255, 255, 0.5)" : "rgba(17, 17, 17, 0.5)" }}>
          Sync Rate
        </motion.span>
        <motion.span className="text-xs font-mono font-bold" animate={{ color: isCyborg ? "#00f0ff" : "#111111" }}>
          {data.sync}
        </motion.span>
      </div>

      {/* Decorative Corner Borders */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.3)" }}></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.3)" }}></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.3)" }}></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: isCyborg ? "rgba(0, 240, 255, 0.4)" : "rgba(17, 17, 17, 0.3)" }}></div>
    </motion.article>
  );
}

export default function Capabilities() {
  const containerRef = useRef();
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.capabilities-trigger',
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.from(".cap-header", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" })
        .from(".cap-card", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="capabilities" className="capabilities-trigger relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center items-center z-10 pointer-events-auto">
      
      {/* Section Header */}
      <div className="cap-header max-w-7xl w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
        <div>
          <motion.div
            className="text-[10px] font-mono tracking-widest uppercase mb-4 flex items-center gap-2"
            animate={{ color: isCyborg ? "rgba(0,240,255,0.8)" : "rgba(17,17,17,0.6)" }}
          >
            <div className="w-4 h-[1px]" style={{ backgroundColor: isCyborg ? "#00f0ff" : "#111111" }}></div>
            System Specifications
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
            animate={{ color: isCyborg ? "#ffffff" : "#111111" }}
          >
            <DecoderText text="Capabilities." delay={300} />
          </motion.h2>
        </div>

        <motion.p
          className="max-w-md mt-6 md:mt-0 text-sm md:text-base leading-relaxed"
          animate={{ color: isCyborg ? "rgba(255, 255, 255, 0.6)" : "rgba(17, 17, 17, 0.7)" }}
        >
          Operating parameters designed to shatter traditional biological limits. The symbiotic framework provides unprecedented control, fidelity, and adaptability.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {capabilitiesData.map((data, idx) => (
          <CapabilityCard key={idx} data={data} isCyborg={isCyborg} />
        ))}
      </div>
      
    </section>
  );
}
