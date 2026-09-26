import React, { useEffect, useRef, useCallback } from 'react';
import createGlobe, { COBEOptions } from 'cobe';

export interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
  /**
   * Base auto-rotation speed per frame (in radians)
   * Default: 0.0075 (smooth, lively rotation)
   */
  speed?: number;
}

/**
 * Brand-specific WebGL 3D Globe Configuration
 * Customized for Ilya Saramad Capital Holding (هلدینگ سرآمد سرمایه ایلیا)
 * Colors:
 * - Soft Sky: #D5ECFE -> RGB [0.83, 0.93, 1.0]
 * - Vibrant Blue: #027DF7 -> RGB [0.01, 0.49, 0.97]
 * - Deep Navy: #01427C -> RGB [0.004, 0.26, 0.49]
 * - Pure White: #FFFFFF -> RGB [1, 1, 1]
 */
export const SARAMAD_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 0,                          // Light luxury mode — seamless with soft white canvas
  diffuse: 0.45,
  mapSamples: 16000,                // High dot resolution for continents
  mapBrightness: 1.25,
  baseColor: [0.83, 0.93, 1.0],      // Soft Sky #D5ECFE base dots
  markerColor: [0.01, 0.49, 0.97],   // Vibrant Blue #027DF7 interactive markers
  glowColor: [0.83, 0.93, 1.0],      // Soft Sky halo glow
  markers: [
    { location: [35.6892, 51.3890], size: 0.11, color: [0.01, 0.49, 0.97] }, // Tehran — Headquarters (دفتر مرکزی تهران)
    { location: [35.7000, 51.4000], size: 0.05, color: [0.01, 0.49, 0.97] }, // Jordan Financial District (منطقه مالی جردن)
    { location: [25.2048, 55.2708], size: 0.065, color: [0.01, 0.49, 0.97] }, // Dubai Financial Center (دبی)
    { location: [41.0082, 28.9784], size: 0.055, color: [0.01, 0.49, 0.97] }, // Istanbul Gateway (استانبول)
    { location: [50.1109, 8.6821], size: 0.055, color: [0.01, 0.49, 0.97] },  // Frankfurt Financial Center (فرانکفورت)
    { location: [1.3521, 103.8198], size: 0.055, color: [0.01, 0.49, 0.97] }, // Singapore Asian Hub (سنگاپور)
  ],
  arcs: [
    // Tehran HQ connected to international financial corridors
    { from: [35.6892, 51.3890], to: [25.2048, 55.2708] },
    { from: [35.6892, 51.3890], to: [41.0082, 28.9784] },
    { from: [35.6892, 51.3890], to: [50.1109, 8.6821] },
    { from: [35.6892, 51.3890], to: [1.3521, 103.8198] },
  ],
  arcColor: [0.01, 0.49, 0.97],
  arcWidth: 1.3,
  arcHeight: 0.22,
  opacity: 0.88,
};

export const Globe: React.FC<GlobeProps> = ({
  className = '',
  config = {},
  speed = 0.013,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const velocityRef = useRef<{ phi: number; theta: number }>({ phi: 0, theta: 0 });
  const phiRef = useRef(0);
  const thetaRef = useRef(0.28);
  const widthRef = useRef(0);
  const isHoveredRef = useRef(false);
  const currentSpeedRef = useRef(0.013);

  const mergedConfig = { ...SARAMAD_GLOBE_CONFIG, ...config };

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { phi: 0, theta: 0 };
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
      try {
        canvasRef.current.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for browsers that don't support pointer capture
      }
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;

      // Smooth interaction sensitivity
      const phiDelta = deltaX * 0.0055;
      const thetaDelta = -deltaY * 0.004;

      phiRef.current += phiDelta;
      // Clamp theta between 0.08 and 0.52 to prevent flipping
      thetaRef.current = Math.max(0.08, Math.min(0.52, thetaRef.current + thetaDelta));

      // Capture instantaneous velocity for ultra-smooth momentum upon release
      velocityRef.current = {
        phi: phiDelta * 0.75,
        theta: thetaDelta * 0.75,
      };

      pointerInteracting.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  }, []);

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    let isVisible = true;
    let animationFrameId: number;
    let lastTime = performance.now();

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    // Pause rendering when scrolled away to preserve GPU performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
        }
      },
      { threshold: 0.05 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    if (canvasRef.current) {
      const currentCanvas = canvasRef.current;
      const initialWidth = (widthRef.current || 400) * 2;

      globe = createGlobe(currentCanvas, {
        ...mergedConfig,
        width: initialWidth,
        height: initialWidth,
      });

      // Target resting angle
      const defaultTheta = mergedConfig.theta ?? 0.28;

      // Ultra-smooth, delta-time normalized physics loop
      const renderLoop = (time: number) => {
        const deltaMs = Math.min(time - lastTime, 64); // Guard against background tab time jumps
        const dt = Math.max(0.5, deltaMs / 16.667); // Normalized to 60 FPS standard frame
        lastTime = time;

        if (globe && isVisible) {
          if (pointerInteracting.current !== null) {
            // Actively dragging
          } else {
            // Exponential momentum damping for natural organic feel
            const dampFactor = Math.pow(0.92, dt);
            velocityRef.current.phi *= dampFactor;
            velocityRef.current.theta *= dampFactor;

            // Target auto-rotation speed (subtly slowed when hovered for detailed inspection)
            const targetSpeed = isHoveredRef.current ? speed * 0.7 : speed;
            
            // Silky smooth lerping of auto-rotation speed
            currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * (1 - Math.pow(0.9, dt));

            // Apply smooth continuous rotation + residual throw momentum
            phiRef.current += (currentSpeedRef.current + velocityRef.current.phi) * dt;

            // Soft spring return of theta back to resting angle
            const springProgress = 1 - Math.pow(0.95, dt);
            thetaRef.current += (defaultTheta - thetaRef.current) * springProgress + velocityRef.current.theta * dt;
          }

          const currentWidth = (widthRef.current || 400) * 2;
          globe.update({
            phi: phiRef.current,
            theta: thetaRef.current,
            width: currentWidth,
            height: currentWidth,
          });
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };

      animationFrameId = requestAnimationFrame(renderLoop);

      // Smooth canvas reveal
      setTimeout(() => {
        if (currentCanvas) {
          currentCanvas.style.opacity = '1';
        }
      }, 60);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (globe) {
        globe.destroy();
      }
    };
  }, [mergedConfig, speed]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => {
          isHoveredRef.current = true;
        }}
        onPointerLeave={(e) => {
          isHoveredRef.current = false;
          handlePointerUp(e);
        }}
        className="w-full h-full aspect-square opacity-0 transition-opacity duration-1000 cursor-grab will-change-transform"
        style={{
          contain: 'layout paint size',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};
export default Globe;

