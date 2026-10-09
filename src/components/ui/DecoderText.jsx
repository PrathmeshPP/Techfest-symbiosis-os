import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-+<=>';

/**
 * Scramble-decode text animation.
 * Deliberately avoids IntersectionObserver — hero text is always in viewport
 * on load, and the observer caused unreliable triggering when a GSAP
 * animation held the parent at opacity:0.  A plain setTimeout is sufficient
 * and rock-solid across all browsers and React Strict-Mode double-invoke.
 */
export default function DecoderText({ text, className = '', as: Component = 'span', delay = 0 }) {
  const [animatedText, setAnimatedText] = useState('');
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  const displayText = shouldReduceMotion ? text : animatedText;

  useEffect(() => {
    let timerId;
    let rafId;
    let cancelled = false;

    // Reduced-motion: derived directly in render, skip animation effect.
    if (shouldReduceMotion) {
      return;
    }

    // Fire unconditionally after `delay` ms — no intersection check needed
    timerId = setTimeout(() => {
      if (cancelled) return;

      let iteration = 0;
      const total = text.length * 3; // ~3 frames per character

      const tick = () => {
        if (cancelled) return;

        setAnimatedText(
          text
            .split('')
            .map((ch, i) => {
              if (i < iteration / 3) return text[i]; // resolved character
              if (ch === ' ') return ' ';             // preserve spaces
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        iteration += 1;
        if (iteration < total) {
          rafId = requestAnimationFrame(tick);
        } else {
          setAnimatedText(text); // guarantee final resolved state
        }
      };

      rafId = requestAnimationFrame(tick);
    }, delay);

    // Cleanup handles React 18 Strict-Mode double-invoke correctly:
    // the `cancelled` flag stops any in-flight rAF, and timerId is cleared.
    return () => {
      cancelled = true;
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [text, delay, shouldReduceMotion]);

  return (
    <Component ref={containerRef} className={className}>
      {/*
       * While displayText is empty (before decode starts), render the text
       * with visibility:hidden so layout dimensions are preserved and no
       * jump occurs when the decoded text appears.
       */}
      {displayText
        ? displayText
        : <span style={{ visibility: 'hidden' }}>{text}</span>}
    </Component>
  );
}
