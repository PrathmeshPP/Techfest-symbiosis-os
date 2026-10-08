import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import CyborgCore from './CyborgCore';
import Background from './Background';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030303]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={2} color="#00f0ff" />
        <directionalLight position={[0, -5, 5]} intensity={0.5} color="#0a0a0a" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <CyborgCore />
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
}
