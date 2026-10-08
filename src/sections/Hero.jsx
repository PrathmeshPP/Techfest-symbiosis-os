import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Main Typography Entrance
      tl.from(".hero-text", {
        y: 15,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3
      });

      // HUD Labels Entrance
      tl.from(".hero-hud", {
        opacity: 0,
        x: (index, target) => target.classList.contains('left-hud') ? -10 : 10,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.8");

      // Buttons Entrance
      tl.from(".hero-btn", {
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
      
      {/* Subtle Technical HUD Labels (Empty space utilization) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Top Left */}
        <div className="hero-hud left-hud absolute top-24 left-6 md:top-32 md:left-12 flex flex-col gap-1">
          <div className="text-[10px] text-accent font-mono uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
            Neural Link
          </div>
          <div className="text-[11px] text-white/40 font-mono tracking-wider drop-shadow-md">ACTIVE</div>
        </div>

        {/* Top Right */}
        <div className="hero-hud right-hud absolute top-24 right-6 md:top-32 md:right-12 flex flex-col gap-1 items-end">
          <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest drop-shadow-md">
            Core Status
          </div>
          <div className="text-[11px] text-primary/80 font-mono tracking-wider drop-shadow-md">OPTIMAL</div>
        </div>

        {/* Bottom Left */}
        <div className="hero-hud left-hud absolute bottom-24 left-6 md:bottom-32 md:left-12 flex flex-col gap-1">
          <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest drop-shadow-md">
            Sync Rate
          </div>
          <div className="text-[11px] text-primary/80 font-mono tracking-wider drop-shadow-md">99.8%</div>
        </div>

        {/* Bottom Right */}
        <div className="hero-hud right-hud absolute bottom-24 right-6 md:bottom-32 md:right-12 flex flex-col gap-1 items-end">
          <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest drop-shadow-md">
            Protocol
          </div>
          <div className="text-[11px] text-primary/80 font-mono tracking-wider drop-shadow-md">V-1.0.4</div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-5xl mt-16 pointer-events-auto">
        <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <span className="block opacity-90 text-white">THE SYMBIOSIS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent opacity-100 drop-shadow-sm">
            OPERATING SYSTEM
          </span>
        </h1>
        
        <p className="hero-text text-base md:text-lg text-primary/90 max-w-2xl mx-auto mb-12 font-mono tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          Initiating neural handshake. Bridging the gap between organic consciousness and synthetic intelligence.
        </p>
        
        <div className="flex space-x-4 md:space-x-6">
          <button className="hero-btn px-6 py-3 md:px-8 md:py-4 bg-accent/10 border border-accent text-accent rounded-sm tracking-widest font-mono text-xs md:text-sm uppercase hover:bg-accent hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            Initialize
          </button>
          <button className="hero-btn px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white rounded-sm tracking-widest font-mono text-xs md:text-sm uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-text absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="font-mono text-xs mb-3 tracking-widest uppercase text-white/70">System Boot</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent/50 to-transparent"></div>
      </div>
    </section>
  );
}
