import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-+<>=";

export default function DecoderText({ text, className = "", as: Component = "span", delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    const startDecoding = () => {
      let iteration = 0;
      const totalIterations = text.length * 3;
      let animationFrameId;

      const decode = () => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iteration / 3) return text[index];
              if (char === " ") return " ";
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("");
        });

        if (iteration < totalIterations) {
          iteration += 1;
          animationFrameId = requestAnimationFrame(decode);
        } else {
          setDisplayText(text);
        }
      };

      animationFrameId = requestAnimationFrame(decode);
      return () => cancelAnimationFrame(animationFrameId);
    };

    let timeoutId;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          setHasRun(true);
          timeoutId = setTimeout(() => {
            startDecoding();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [text, shouldReduceMotion, hasRun, delay]);

  return (
    <Component ref={containerRef} className={className}>
      {hasRun || shouldReduceMotion ? displayText : <span className="opacity-0">{text}</span>}
    </Component>
  );
}
