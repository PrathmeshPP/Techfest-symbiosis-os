import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

export default function Background() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
      // Very slow atmospheric drift
      gridRef.current.position.z = (state.clock.elapsedTime * 0.1) % 1;
    }
  });

  return (
    <group position={[0, -4, -10]}>
      <Grid 
        ref={gridRef}
        args={[60, 60]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#080808" 
        sectionSize={5} 
        sectionThickness={1} 
        sectionColor="#111111" 
        fadeDistance={25} 
        fadeStrength={1} 
      />
    </group>
  );
}
