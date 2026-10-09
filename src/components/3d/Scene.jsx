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
          {/* Procedural Lighting — no remote HDR dependency */}
          <ambientLight intensity={isCyborg ? 0.4 : 1.2} />
          <directionalLight position={[5, 5, 5]} intensity={isCyborg ? 2 : 4} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={isCyborg ? 2.5 : 1.5} color={isCyborg ? "#00f0ff" : "#b0b8c0"} />
          <directionalLight position={[0, -5, 5]} intensity={isCyborg ? 1 : 2} color={isCyborg ? "#0a0a0a" : "#e0e0e0"} />
          
          {/* Rim and fill lights for metallic definition */}
          <pointLight position={[0, 3, -3]} intensity={isCyborg ? 10 : 8} color="#ffffff" />
          <pointLight position={[-3, 0, 2]} intensity={isCyborg ? 10 : 3} color={isCyborg ? "#00f0ff" : "#9aaab0"} />
          {/* Additional fill light for Human mode to reveal form */}
          <pointLight position={[3, -2, 4]} intensity={isCyborg ? 2 : 6} color={isCyborg ? "#111111" : "#d0d0d0"} />
          
          <Suspense fallback={null}>
            <CyborgCore isCyborg={isCyborg} />
            <Background isCyborg={isCyborg} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
