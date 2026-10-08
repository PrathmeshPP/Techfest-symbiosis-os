import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import CyborgCore from './CyborgCore';
import Background from './Background';
import { useTheme } from '../../context/ThemeContext';

export default function Scene() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={isCyborg ? 0.2 : 0.6} />
        <directionalLight position={[5, 5, 5]} intensity={isCyborg ? 1.5 : 2.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={isCyborg ? 2 : 0.2} color={isCyborg ? "#00f0ff" : "#aaaaaa"} />
        <directionalLight position={[0, -5, 5]} intensity={isCyborg ? 0.5 : 1.2} color={isCyborg ? "#0a0a0a" : "#ffffff"} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <CyborgCore isCyborg={isCyborg} />
          <Background isCyborg={isCyborg} />
        </Suspense>
      </Canvas>
    </div>
  );
}
