import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CustomCursor() {
  const { mode } = useTheme();
  const isCyborg = mode === 'cyborg';
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isFinePointer, setIsFinePointer] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const handler = (e) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer) {
      document.documentElement.classList.remove('hide-native-cursor');
      return;
    }

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let ringX = mouseX;
    let ringY = mouseY;

    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, [role="button"], input, .hover-target, [tabindex="0"]')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    let animationFrameId;

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        
        const ringScale = isHovering ? 1.5 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;
        
        if (isHovering) {
          ringRef.current.style.opacity = '0.5';
          dotRef.current.style.opacity = '0';
        } else {
          ringRef.current.style.opacity = '1';
          dotRef.current.style.opacity = '1';
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('hide-native-cursor');
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div 
        ref={ringRef}
        className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 border rounded-full transition-colors duration-300"
        style={{ 
          borderColor: isCyborg ? 'rgba(0, 240, 255, 0.5)' : 'rgba(17, 17, 17, 0.4)',
          backgroundColor: isCyborg ? 'rgba(0, 240, 255, 0.05)' : 'rgba(17, 17, 17, 0.02)',
          willChange: 'transform'
        }}
      />
      <div 
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full transition-colors duration-300"
        style={{ 
          backgroundColor: isCyborg ? '#00f0ff' : '#111111',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
