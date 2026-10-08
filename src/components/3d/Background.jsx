import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';


export default function Background({ isCyborg }) {
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
        cellColor={isCyborg ? "#080808" : "#d5d5d5"} 
        sectionSize={5} 
        sectionThickness={isCyborg ? 1 : 0.5} 
        sectionColor={isCyborg ? "#111111" : "#c0c0c0"} 
        fadeDistance={25} 
        fadeStrength={1} 
      />
    </group>
  );
}
