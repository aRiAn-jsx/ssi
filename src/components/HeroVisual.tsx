import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { COBEOptions } from 'cobe';
import { Globe, SARAMAD_GLOBE_CONFIG } from './ui/globe';
import { Moon } from './ui/Moon';

/**
 * Hero visual — light mode: Earth facing Iran with trade-route arcs from the
 * Mashhad HQ. Dark mode: a procedural moon among the stars.
 * Nothing else around it; pointer tilt goes through motion values.
 */

const HQ: [number, number] = [36.2972, 59.6067]; // Mashhad
const ROUTES: [number, number][] = [
  [41.0082, 28.9784], // Istanbul
  [50.1109, 8.6821], // Frankfurt
  [55.7558, 37.6173], // Moscow
  [25.2048, 55.2708], // Dubai
  [31.2304, 121.4737], // Shanghai
  [3.139, 101.6869], // Kuala Lumpur
];

const EARTH: Partial<COBEOptions> = {
  ...SARAMAD_GLOBE_CONFIG,
  theta: 0.32,
  dark: 0,
  diffuse: 0.9,
  mapSamples: 16000,
  mapBrightness: 1.5,
  mapBaseBrightness: 0.02,
  baseColor: [0.8, 0.88, 0.98],
  glowColor: [0.78, 0.88, 1],
  markerColor: [0.01, 0.42, 0.92],
  markerElevation: 0.01,
  arcColor: [0.01, 0.45, 0.95],
  arcWidth: 0.55,
  arcHeight: 0.22,
  markers: [
    { location: HQ, size: 0.065, color: [0.0, 0.32, 0.8] },
    ...ROUTES.map((location) => ({ location, size: 0.028 })),
  ],
  arcs: ROUTES.map((to) => ({ from: HQ, to })),
};

interface HeroVisualProps {
  isDark: boolean;
  className?: string;
  onMoonReady?: () => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ isDark, className = '', onMoonReady }) => {
  const reduceMotion = useReducedMotion();
  const earthConfig = useMemo(() => EARTH, []);

  // Gentle pointer tilt (desktop only)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.7 });
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [px, py, reduceMotion]);

  return (
    <div className={`hv-perspective ${className}`}>
      <motion.div className="relative w-full aspect-square" style={{ rotateX, rotateY }}>
        <div className="hv-atmosphere absolute -inset-[4%] rounded-full pointer-events-none" aria-hidden="true" />
        {isDark ? (
          <Moon key="moon" className="w-full h-full" isDark onReady={onMoonReady} />
        ) : (
          <>
            <div className="hv-ground-shadow" aria-hidden="true" />
            <Globe key="earth" className="w-full h-full" config={earthConfig} focus={HQ} sway={0.5} />
            <div className="hv-rim absolute inset-[9.5%] rounded-full pointer-events-none" aria-hidden="true" />
          </>
        )}
      </motion.div>
    </div>
  );
};
