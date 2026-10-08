import React from 'react';
import Navbar from './components/layout/Navbar';
import Scene from './components/3d/Scene';
import Hero from './sections/Hero';

function App() {
  return (
    <div className="relative w-full bg-background text-primary selection:bg-accent/30">
      <Scene />
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <Hero />
        {/* Phase 2+ Content Area Placeholder - ensuring natural scroll works for testing */}
        <section className="h-[200vh] w-full flex items-start justify-center pt-32 bg-gradient-to-b from-transparent to-background">
          <p className="text-white/20 font-mono tracking-widest text-sm uppercase">End of Phase 1 Boot Sequence</p>
        </section>
      </main>
    </div>
  );
}

export default App;
