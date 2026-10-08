import React, { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CyborgCore() {
  const parallaxGroupRef = useRef();
  const assembleGroupRef = useRef();
  const coreEnergyRef = useRef();
  const housingRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Precise Mechanical Entrance
      gsap.from(assembleGroupRef.current.scale, {
        x: 0.01, y: 0.01, z: 0.01,
        duration: 2.2,
        ease: 'power3.out'
      });
      gsap.from(ring1Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.2, ease: 'expo.out' });
      gsap.from(ring2Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.4, ease: 'expo.out' });
      gsap.from(ring3Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.6, ease: 'power2.out' });

      // Natural Scroll Transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-scroll-trigger',
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // Smooth dampening
        }
      });

      tl.to(assembleGroupRef.current.scale, { x: 0.6, y: 0.6, z: 0.6, ease: 'power1.inOut' }, 0)
        .to(ring1Ref.current.rotation, { z: "+=" + Math.PI / 2 }, 0)
        .to(ring2Ref.current.rotation, { z: "-=" + Math.PI / 2 }, 0)
        .to(ring3Ref.current.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0)
        .to(housingRef.current.rotation, { x: Math.PI / 2 + 0.5 }, 0);
    });

    return () => ctx.revert();
  }, []);

  useFrame((state, delta) => {
    if (!parallaxGroupRef.current || !assembleGroupRef.current) return;

    // Real Mouse Parallax (Deliberate & Precise)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      // Clamp rotation to feel heavy and engineered
      const targetX = (state.pointer.y * Math.PI) / 12;
      const targetY = (state.pointer.x * Math.PI) / 12;
      parallaxGroupRef.current.rotation.x = THREE.MathUtils.damp(parallaxGroupRef.current.rotation.x, targetX, 5, delta);
      parallaxGroupRef.current.rotation.y = THREE.MathUtils.damp(parallaxGroupRef.current.rotation.y, targetY, 5, delta);
    }

    // Precise mechanical rotations (avoiding random free-spinning)
    // Energy core pulsates slightly via rotation
    coreEnergyRef.current.rotation.z += delta * 0.4;
    
    // Stabilizer Ring (Inner)
    ring1Ref.current.rotation.z += delta * 0.1;
    
    // Scanner Ring (Mid)
    ring2Ref.current.rotation.z -= delta * 0.15;
    
    // Outer Containment Framework
    ring3Ref.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={parallaxGroupRef} position={[0, 0, -2]}>
      <group ref={assembleGroupRef}>
        
        {/* Recessed Central Energy Core */}
        <Sphere ref={coreEnergyRef} args={[0.5, 32, 32]} position={[0, 0, 0.2]}>
          <meshStandardMaterial 
            color="#000000" 
            emissive="#00f0ff" 
            emissiveIntensity={3}
            roughness={0.2}
            toneMapped={false}
          />
        </Sphere>

        {/* Inner Iris / Aperture Segment */}
        <Torus args={[0.65, 0.12, 16, 32]} rotation={[0, 0, 0]} position={[0, 0, 0.1]}>
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.3} />
        </Torus>
        <Torus args={[0.85, 0.04, 16, 64]} rotation={[0, 0, 0]} position={[0, 0, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
        </Torus>

        {/* Main Octagonal Mechanical Housing */}
        <group ref={housingRef}>
          <Cylinder args={[1.5, 1.3, 0.8, 8]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.4]}>
            <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.2} flatShading />
          </Cylinder>
          {/* Secondary Armor Plates (Wireframe depth) */}
          <Icosahedron args={[1.45, 1]} rotation={[0, 0, 0]} position={[0, 0, -0.3]}>
            <meshStandardMaterial color="#111111" metalness={1} roughness={0.5} wireframe />
          </Icosahedron>
        </group>

        {/* Mechanical Containment Rings (Replaced planetary orbits) */}
        
        {/* Ring 1 - Inner Stabilizer Assembly */}
        <group ref={ring1Ref}>
          <Torus args={[1.9, 0.06, 12, 64]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </Torus>
          {/* Mechanical Nodes / Fasteners */}
          <Cylinder args={[0.12, 0.12, 0.25, 8]} position={[1.9, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <meshStandardMaterial color="#222222" metalness={1} roughness={0.3} flatShading />
          </Cylinder>
          <Cylinder args={[0.12, 0.12, 0.25, 8]} position={[-1.9, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <meshStandardMaterial color="#222222" metalness={1} roughness={0.3} flatShading />
          </Cylinder>
          {/* Cyan Emissive Data Track */}
          <Torus args={[1.9, 0.015, 8, 64]} rotation={[0, 0, 0]} position={[0, 0, 0.06]}>
            <meshBasicMaterial color="#00f0ff" />
          </Torus>
        </group>

        {/* Ring 2 - Scanning/Data Ring */}
        <group ref={ring2Ref} position={[0, 0, -0.1]}>
          <Torus args={[2.5, 0.02, 16, 64]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
          </Torus>
          {/* Scanner Heads */}
          <Cylinder args={[0.06, 0.06, 0.4, 8]} position={[0, 2.5, 0]} rotation={[0, 0, Math.PI/2]}>
            <meshStandardMaterial color="#000000" emissive="#00f0ff" emissiveIntensity={1.5} />
          </Cylinder>
          <Cylinder args={[0.06, 0.06, 0.4, 8]} position={[0, -2.5, 0]} rotation={[0, 0, Math.PI/2]}>
            <meshStandardMaterial color="#000000" emissive="#00f0ff" emissiveIntensity={1.5} />
          </Cylinder>
        </group>

        {/* Ring 3 - Outer Structural Framework */}
        <group ref={ring3Ref} position={[0, 0, -0.2]}>
          <Torus args={[3.2, 0.02, 6, 8]} rotation={[0, 0, Math.PI/8]}>
            <meshStandardMaterial color="#0f0f0f" metalness={0.8} roughness={0.6} flatShading />
          </Torus>
          {/* Structural Node Points */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x = Math.cos(angle) * 3.2;
            const y = Math.sin(angle) * 3.2;
            return (
              <Sphere key={i} args={[0.04, 8, 8]} position={[x, y, 0]}>
                <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={1.2} />
              </Sphere>
            );
          })}
        </group>

      </group>
    </group>
  );
}
