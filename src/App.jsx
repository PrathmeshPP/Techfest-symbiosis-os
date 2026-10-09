import React, { useLayoutEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Scene from './components/3d/Scene';
import Hero from './sections/Hero';
import Symbiosis from './sections/Symbiosis';
import Capabilities from './sections/Capabilities';
import InterfaceHUD from './sections/InterfaceHUD';
import CTA from './sections/CTA';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';

function AppContent() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  // Force strictly obvious background colors on the body itself to guarantee visibility
  useLayoutEffect(() => {
    document.body.style.backgroundColor = isCyborg ? "#030303" : "#f5f5f7";
    document.body.style.color = isCyborg ? "#e0e0e0" : "#111111";
    document.body.style.transition = "background-color 0.8s ease, color 0.8s ease";
  }, [isCyborg]);

  return (
    <div className="relative w-full min-h-screen selection:bg-accent/30 font-sans">
      <CustomCursor />
      <Scene />
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <Hero />
        <Symbiosis />
        <Capabilities />
        <InterfaceHUD />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
