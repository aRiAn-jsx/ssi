import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop/laptop with mouse cursor
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    setHasFinePointer(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive-cursor') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!hasFinePointer || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer soft glowing circle */}
      <motion.div
        className="absolute rounded-full border border-[#027DF7]/40 bg-[#027DF7]/10 backdrop-blur-[1px]"
        animate={{
          x: position.x - (isHovering ? 24 : 14),
          y: position.y - (isHovering ? 24 : 14),
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          borderColor: isHovering ? 'rgba(2, 125, 247, 0.7)' : 'rgba(2, 125, 247, 0.3)',
          backgroundColor: isHovering ? 'rgba(2, 125, 247, 0.15)' : 'rgba(213, 236, 254, 0.2)',
          boxShadow: isHovering
            ? '0 0 24px rgba(2, 125, 247, 0.45)'
            : '0 0 12px rgba(2, 125, 247, 0.2)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 400,
          mass: 0.2,
        }}
      />

      {/* Center sharp dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#027DF7]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 600,
          mass: 0.1,
        }}
      />
    </div>
  );
};
