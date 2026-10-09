import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Core positioning — calibrated for the Hero layout ─────────────────────
//
// Camera FOV=45°, z=8, core at z=-3  →  distance=11 wu
//   half-frustum = 11 * tan(22.5°) ≈ 4.56 wu
//   pixels_per_wu ≈ 826 / (2*4.56) ≈ 90.6 px / wu  (826px viewport)
//
// Hero layout: justify-start pt-24 → button-bottom ≈ 458 px from top.
// We need ring3 (world radius 3.2 wu) to sit between buttons and viewport:
//   ring3_radius_px = 3.2 × 0.60 × 90.6 ≈ 174 px
//   ring3 top > 458 px  → core_centre > 458+174 = 632 px
//   ring3 bottom < 826 px → core_centre < 826-174 = 652 px
//   → place core_centre at ~642 px   (dead-centre of the valid range)
//   core_centre_px = 413 + |BASE_Y| × 90.6  →  |BASE_Y| = (642-413)/90.6 ≈ 2.53
//   Using BASE_Y = -2.55 for a small margin: centre at 644 px,
//   ring3 top ≈ 470 px (12 px below buttons ✓),
//   ring3 bottom ≈ 818 px (8 px above viewport bottom ✓).
//
// SCROLL_TRACK_SCALE: push core down by this many world-units per
// viewport-height scrolled — keeps it from overlapping scrolling text.
const BASE_Y = -2.55;
const BASE_Z = -3.0;
const SCROLL_TRACK_SCALE = 4.0;

export default function CyborgCore({ isCyborg }) {
  // positionGroupRef — scroll-tracked Y position only (managed in useFrame)
  // parallaxGroupRef — mouse-driven rotation only
  // assembleGroupRef — GSAP entrance scale + ScrollTrigger scale only
  const positionGroupRef = useRef();
  const parallaxGroupRef = useRef();
  const assembleGroupRef = useRef();

  const coreEnergyRef = useRef();
  const housingRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  const currentSpeed = useRef(1);
  // Stores the intersectionRatio of the Hero section (0 → 1)
  const heroVisibility = useRef(1);

  // IntersectionObserver — drives opacity fade when Hero leaves viewport
  useEffect(() => {
    const heroEl = document.querySelector('.hero-scroll-trigger');
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      (entries) => { heroVisibility.current = entries[0].intersectionRatio; },
      { threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation — targets assembleGroupRef scale only.
      // MAX_SCALE = 0.52:
      //   ring3 top ≈ 494 px (36 px below button bottom at ~458 px ✓)
      //   ring3 bottom ≈ 794 px (32 px above viewport bottom ✓)
      //   Comfortable breathing room above and below the full ring set.
      gsap.fromTo(assembleGroupRef.current.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        { x: 0.52, y: 0.52, z: 0.52, duration: 2.2, ease: 'power3.out' }
      );
      gsap.from(ring1Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.2, ease: 'expo.out' });
      gsap.from(ring2Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.4, ease: 'expo.out' });
      gsap.from(ring3Ref.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.8, delay: 0.6, ease: 'power2.out' });

      // Scroll-scrub — targets assembleGroupRef scale only, never positionGroupRef
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-scroll-trigger',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      tl.to(assembleGroupRef.current.scale, { x: 0.22, y: 0.22, z: 0.22, ease: 'power1.inOut' }, 0)
        .to(ring1Ref.current.rotation, { z: '+=' + Math.PI / 2 }, 0)
        .to(ring2Ref.current.rotation, { z: '-=' + Math.PI / 2 }, 0)
        .to(ring3Ref.current.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0)
        .to(housingRef.current.rotation, { x: Math.PI / 2 + 0.5 }, 0);
    });
    return () => ctx.revert();
  }, []);

  useFrame((state, delta) => {
    if (!positionGroupRef.current || !parallaxGroupRef.current || !assembleGroupRef.current) return;

    // ── 1. SCROLL TRACKING ──────────────────────────────────────────────────
    // The Canvas is fixed; the Hero HTML scrolls with the page.
    // To prevent the fixed-position core from drifting into the scrolling text,
    // we push positionGroupRef.position.y downward proportionally to scrollY.
    // Result: core always stays "below" whatever Hero content is on screen.
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight || 826;
    // Allow slight overshoot (1.2) so the core clears the bottom edge too
    const scrollFraction = Math.min(scrollY / heroHeight, 1.2);
    const targetY = BASE_Y - scrollFraction * SCROLL_TRACK_SCALE;

    positionGroupRef.current.position.y = THREE.MathUtils.damp(
      positionGroupRef.current.position.y,
      targetY,
      7,   // damp speed — snappy but smooth
      delta
    );

    // ── 2. OPACITY FADE ─────────────────────────────────────────────────────
    // Use intersectionRatio for a smooth fade once Hero is < 30 % visible
    const fadeOpacity = Math.min(heroVisibility.current / 0.3, 1);
    positionGroupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = THREE.MathUtils.damp(
          child.material.opacity ?? 1,
          fadeOpacity,
          8,
          delta
        );
        child.material.needsUpdate = true;
      }
    });
    positionGroupRef.current.visible = fadeOpacity > 0.01;

    // ── 3. MOUSE PARALLAX ───────────────────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      const rx = (state.pointer.y * Math.PI) / 14;
      const ry = (state.pointer.x * Math.PI) / 14;
      parallaxGroupRef.current.rotation.x = THREE.MathUtils.damp(parallaxGroupRef.current.rotation.x, rx, 5, delta);
      parallaxGroupRef.current.rotation.y = THREE.MathUtils.damp(parallaxGroupRef.current.rotation.y, ry, 5, delta);
    }

    // ── 4. MODE TRANSITIONS ─────────────────────────────────────────────────
    const targetSpeed = isCyborg ? 1 : 0.3;
    const targetEmissive = isCyborg ? 3 : 0.15;
    currentSpeed.current = THREE.MathUtils.damp(currentSpeed.current, targetSpeed, 3, delta);

    if (coreEnergyRef.current) {
      coreEnergyRef.current.material.emissiveIntensity = THREE.MathUtils.damp(
        coreEnergyRef.current.material.emissiveIntensity,
        targetEmissive, 3, delta
      );
      coreEnergyRef.current.rotation.z += delta * 0.4 * currentSpeed.current;
    }

    ring1Ref.current.rotation.z += delta * 0.10 * currentSpeed.current;
    ring2Ref.current.rotation.z -= delta * 0.15 * currentSpeed.current;
    ring3Ref.current.rotation.z += delta * 0.05 * currentSpeed.current;
  });

  return (
    // positionGroupRef — Y driven by scroll tracking above, Z fixed
    <group ref={positionGroupRef} position={[0, BASE_Y, BASE_Z]}>
      {/* parallaxGroupRef — rotation only */}
      <group ref={parallaxGroupRef}>
        {/* assembleGroupRef — scale only (GSAP) */}
        <group ref={assembleGroupRef}>

          <Sphere ref={coreEnergyRef} args={[0.5, 32, 32]} position={[0, 0, 0.2]}>
            <meshStandardMaterial
              color={isCyborg ? '#000000' : '#2a2a2a'}
              emissive={isCyborg ? '#00f0ff' : '#8a9aaa'}
              emissiveIntensity={isCyborg ? 3 : 0.15}
              roughness={isCyborg ? 0.2 : 0.4}
              metalness={isCyborg ? 0 : 0.7}
              toneMapped={false}
              transparent
            />
          </Sphere>

          <Torus args={[0.65, 0.12, 16, 32]} position={[0, 0, 0.1]}>
            <meshStandardMaterial color={isCyborg ? '#050505' : '#3a3a3a'} metalness={1} roughness={0.3} transparent />
          </Torus>
          <Torus args={[0.85, 0.04, 16, 64]} position={[0, 0, 0.2]}>
            <meshStandardMaterial color={isCyborg ? '#1a1a1a' : '#4a4a4a'} metalness={0.8} roughness={0.4} transparent />
          </Torus>

          <group ref={housingRef}>
            <Cylinder args={[1.5, 1.3, 0.8, 8]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.4]}>
              <meshStandardMaterial color={isCyborg ? '#080808' : '#3a3a3a'} metalness={0.9} roughness={0.2} flatShading transparent />
            </Cylinder>
            <Icosahedron args={[1.45, 1]} position={[0, 0, -0.3]}>
              <meshStandardMaterial color={isCyborg ? '#111111' : '#555555'} metalness={1} roughness={0.5} wireframe transparent />
            </Icosahedron>
          </group>

          <group ref={ring1Ref}>
            <Torus args={[1.9, 0.06, 12, 64]}>
              <meshStandardMaterial color={isCyborg ? '#1a1a1a' : '#4a4a4a'} metalness={0.8} roughness={0.2} transparent />
            </Torus>
            <Cylinder args={[0.12, 0.12, 0.25, 8]} position={[1.9, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
              <meshStandardMaterial color={isCyborg ? '#222222' : '#555555'} metalness={1} roughness={0.3} flatShading transparent />
            </Cylinder>
            <Cylinder args={[0.12, 0.12, 0.25, 8]} position={[-1.9, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
              <meshStandardMaterial color={isCyborg ? '#222222' : '#555555'} metalness={1} roughness={0.3} flatShading transparent />
            </Cylinder>
            <Torus args={[1.9, 0.015, 8, 64]} position={[0, 0, 0.06]}>
              <meshBasicMaterial color={isCyborg ? '#00f0ff' : '#888888'} transparent />
            </Torus>
          </group>

          <group ref={ring2Ref} position={[0, 0, -0.1]}>
            <Torus args={[2.5, 0.02, 16, 64]}>
              <meshStandardMaterial color={isCyborg ? '#2a2a2a' : '#5a5a5a'} metalness={0.9} roughness={0.2} transparent />
            </Torus>
            <Cylinder args={[0.06, 0.06, 0.4, 8]} position={[0, 2.5, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color='#000000' emissive={isCyborg ? '#00f0ff' : '#8a9aaa'} emissiveIntensity={isCyborg ? 1.5 : 0.3} transparent />
            </Cylinder>
            <Cylinder args={[0.06, 0.06, 0.4, 8]} position={[0, -2.5, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color='#000000' emissive={isCyborg ? '#00f0ff' : '#8a9aaa'} emissiveIntensity={isCyborg ? 1.5 : 0.3} transparent />
            </Cylinder>
          </group>

          <group ref={ring3Ref} position={[0, 0, -0.2]}>
            <Torus args={[3.2, 0.02, 6, 8]} rotation={[0, 0, Math.PI / 8]}>
              <meshStandardMaterial color={isCyborg ? '#0f0f0f' : '#4a4a4a'} metalness={0.8} roughness={0.6} flatShading transparent />
            </Torus>
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI) / 4;
              return (
                <Sphere key={i} args={[0.04, 8, 8]} position={[Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, 0]}>
                  <meshStandardMaterial color='#ffffff' emissive={isCyborg ? '#00f0ff' : '#8a9aaa'} emissiveIntensity={isCyborg ? 1.2 : 0.3} transparent />
                </Sphere>
              );
            })}
          </group>

        </group>
      </group>
    </group>
  );
}
