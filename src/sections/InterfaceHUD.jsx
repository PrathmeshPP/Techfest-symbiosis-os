import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import DecoderText from '../components/ui/DecoderText';

const metricsData = [
  { id: 'sync', label: 'NEURAL SYNC', target: 99.8, suffix: '%' },
  { id: 'stab', label: 'CORE STABILITY', target: 100.0, suffix: '%' },
  { id: 'sig', label: 'SIGNAL INTEGRITY', target: 94.2, suffix: 'dB' },
];

const terminalLogs = [
  "> [SYS] Initializing bio-metric subroutines...",
  "> [SYS] Handshake verified. Awaiting inputs.",
  "> [NET] Quantum bridge established.",
  "> [SEC] Perimeter secured. Zero intrusions detected.",
  "> [OP] Symbiosis OS active and stable."
];

function ProgressBar({ label, target, suffix, isCyborg }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // animate value to target smoothly
    const duration = 1500;
    const start = performance.now();
    let rAF;

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(ease * target);
      if (progress < 1) {
        rAF = requestAnimationFrame(update);
      }
    };
    rAF = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rAF);
  }, [target]);

  return (
    <div className="flex flex-col gap-2 mb-6 w-full">
      <div className="flex justify-between items-end font-mono text-xs uppercase tracking-widest transition-colors duration-700">
        <span className={isCyborg ? "text-gray-400" : "text-gray-500"}>{label}</span>
        <span className={isCyborg ? "text-accent" : "text-gray-900 font-semibold"}>
          {value.toFixed(1)}{suffix}
        </span>
      </div>
      <div className={`h-1 w-full overflow-hidden rounded-full transition-colors duration-700 ${isCyborg ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <motion.div 
          className={`h-full transition-colors duration-700 ${isCyborg ? 'bg-accent' : 'bg-gray-800'}`}
          initial={{ width: '0%' }}
          whileInView={{ width: `${target}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function InterfaceHUD() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <section className="relative w-full py-24 px-6 md:px-12 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
        {/* Left Side: Diagnostics Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`flex-1 w-full rounded-2xl p-8 lg:p-12 border backdrop-blur-md transition-colors duration-700 ${
            isCyborg 
              ? 'bg-black/40 border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.05)]' 
              : 'bg-white/60 border-gray-200 shadow-xl'
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <h3 className={`font-mono text-sm tracking-[0.2em] uppercase transition-colors duration-700 ${
              isCyborg ? 'text-accent' : 'text-gray-900 font-bold'
            }`}>
              <DecoderText text="System Diagnostics" />
            </h3>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full animate-pulse transition-colors duration-700 ${
                isCyborg ? 'bg-accent shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'bg-gray-800'
              }`} />
              <span className={`font-mono text-xs transition-colors duration-700 ${
                isCyborg ? 'text-gray-500' : 'text-gray-400'
              }`}>ONLINE</span>
            </div>
          </div>

          <div className="space-y-2">
            {metricsData.map((m) => (
              <ProgressBar key={m.id} label={m.label} target={m.target} suffix={m.suffix} isCyborg={isCyborg} />
            ))}
          </div>

          {/* Terminal Log */}
          <div className={`mt-10 p-5 rounded-lg font-mono text-xs leading-relaxed transition-colors duration-700 ${
            isCyborg ? 'bg-[#050505]/80 text-gray-400 border border-white/5' : 'bg-gray-50 text-gray-600 border border-gray-100'
          }`}>
            {terminalLogs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="mb-1 last:mb-0"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Text & Context */}
        <div className="flex-1 w-full space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            <span className={`transition-colors duration-700 ${isCyborg ? "text-white" : "text-gray-900"}`}>System </span>
            <span className={`transition-colors duration-700 ${isCyborg ? "text-accent" : "text-gray-500 font-normal"}`}>Telemetry</span>
          </h2>
          <p className={`text-lg md:text-xl font-light leading-relaxed max-w-lg transition-colors duration-700 ${
            isCyborg ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Symbiosis OS actively monitors the delicate balance between synthetic efficiency and organic intuition. 
            Our neural bridge maintains absolute stability without compromising human agency.
          </p>
        </div>
      </div>
    </section>
  );
}
