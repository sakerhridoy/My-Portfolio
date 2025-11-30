import React, { useEffect, useRef } from 'react';
import Hero3D from './Hero3D';

const PremiumSmall3D = ({ size, opacity, initialX, initialY, floatDelay }) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const handleMove = e => {
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <div
      ref={ref}
      className="absolute pointer-events-none animate-float"
      style={{
        width: size,
        height: size,
        top: initialY,
        left: initialX,
        opacity: opacity,
        animationDelay: floatDelay,
        zIndex: 1,
      }}
    >
      <Hero3D />
    </div>
  );
};

export default PremiumSmall3D;
