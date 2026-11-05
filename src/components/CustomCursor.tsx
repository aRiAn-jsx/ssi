import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const INTERACTIVE = 'button, a, input, textarea, select, label, .interactive-cursor';

/**
 * Pointer follower for fine-pointer devices.
 *
 * Position lives in motion values, so moving the mouse never re-renders React;
 * state only flips when the cursor enters/leaves the window or an interactive
 * element. Size changes use transform scale instead of width/height.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 420, mass: 0.25 });
  const ringY = useSpring(y, { damping: 28, stiffness: 420, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      const hovering = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
      if (hovering !== hoveringRef.current) {
        hoveringRef.current = hovering;
        setIsHovering(hovering);
      }
    };
    const onLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 -ml-[14px] -mt-[14px] w-7 h-7 rounded-full border border-[#027DF7]/50 bg-[#027DF7]/10 dark:border-[#38BDF8]/60"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isHovering ? 1.7 : 1, opacity: isHovering ? 0.9 : 0.6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]"
        style={{ x, y }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
