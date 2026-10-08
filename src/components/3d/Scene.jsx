import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CyborgCore from './CyborgCore';
import Background from './Background';
import { useTheme } from '../../context/ThemeContext';
import ErrorBoundary from '../ErrorBoundary';

export default function Scene() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ErrorBoundary>
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
          {/* Procedural Lighting Replacement for HDRI */}
          <ambientLight intensity={isCyborg ? 0.4 : 0.8} />
          <directionalLight position={[5, 5, 5]} intensity={isCyborg ? 2 : 3} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={isCyborg ? 2.5 : 0.5} color={isCyborg ? "#00f0ff" : "#aaaaaa"} />
          <directionalLight position={[0, -5, 5]} intensity={isCyborg ? 1 : 1.5} color={isCyborg ? "#0a0a0a" : "#ffffff"} />
          
          {/* Rim light for metallic highlights */}
          <pointLight position={[0, 3, -3]} intensity={isCyborg ? 10 : 5} color="#ffffff" />
          <pointLight position={[-3, 0, 2]} intensity={isCyborg ? 10 : 2} color="#00f0ff" />
          
          <Suspense fallback={null}>
            <CyborgCore isCyborg={isCyborg} />
            <Background isCyborg={isCyborg} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
