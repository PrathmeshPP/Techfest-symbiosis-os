import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-auto">
      <div className="font-sans font-bold text-xl tracking-widest uppercase">
        Symbiosis<span className="text-accent">OS</span>
      </div>
      <div className="flex items-center space-x-6 text-sm font-medium tracking-wide">
        <button className="hover:text-accent transition-colors duration-300">System</button>
        <button className="hover:text-accent transition-colors duration-300">Capabilities</button>
        {/* Placeholder for Phase 2 Mode Toggle */}
        <div className="w-10 h-5 border border-white/20 rounded-full flex items-center px-0.5 opacity-50 cursor-not-allowed">
          <div className="w-4 h-4 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
