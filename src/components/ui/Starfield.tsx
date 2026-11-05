import React, { useEffect, useRef } from 'react';

/**
 * Deep-space backdrop for the dark hero.
 *
 * Static layer (painted once per resize into an offscreen canvas):
 *   nebula clouds · Milky Way band (glow, thousands of faint stars, dark dust
 *   rift) · a small spiral galaxy sprite.
 * Live layer (per frame): twinkling field stars coloured by temperature, a few
 * bright stars with diffraction spikes, the slowly turning galaxy and the
 * occasional shooting star. Soft pointer parallax between the layers.
 *
 * DPR capped at 1.5; the loop runs only while on screen and the tab is
 * visible. Reduced-motion users get a single still frame.
 */

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number;
  base: number;
  speed: number;
  phase: number;
  rgb: string;
  spikes: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  len: number;
}

interface StarfieldProps {
  className?: string;
  /** field stars per 10k css px² */
  density?: number;
}

// rough stellar colour distribution: mostly white, some blue, a few warm
const STAR_COLORS = [
  '255,255,255', '255,255,255', '255,255,255', '248,250,255',
  '202,220,255', '186,208,255', '170,196,255',
  '255,244,224', '255,226,190', '255,206,160',
];
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];
const gauss = () => {
  // Box-Muller
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const paintNebulae = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const clouds: [number, number, number, string][] = [
    [0.16, 0.24, 0.5, 'rgba(124, 58, 237, 0.075)'],
    [0.34, 0.6, 0.4, 'rgba(37, 99, 235, 0.09)'],
    [0.62, 0.16, 0.34, 'rgba(14, 165, 233, 0.07)'],
    [0.84, 0.64, 0.4, 'rgba(56, 189, 248, 0.07)'],
    [0.5, 0.4, 0.26, 'rgba(236, 72, 153, 0.05)'],
    [0.08, 0.82, 0.32, 'rgba(20, 184, 166, 0.05)'],
  ];
  ctx.globalCompositeOperation = 'lighter';
  for (const [cx, cy, cr, color] of clouds) {
    // each cloud is a cluster of soft puffs so it doesn't read as a circle
    for (let i = 0; i < 16; i++) {
      const x = (cx + gauss() * cr * 0.4) * w;
      const y = (cy + gauss() * cr * 0.3) * h;
      const r = cr * Math.max(w, h) * (0.2 + Math.random() * 0.35);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
  ctx.globalCompositeOperation = 'source-over';
};

const paintMilkyWay = (ctx: CanvasRenderingContext2D, w: number, h: number, part: 'glow' | 'stars' | 'dust') => {
  // band runs from lower-left to upper-right
  const ax = -0.05 * w, ay = 0.95 * h, bx = 1.05 * w, by = 0.05 * h;
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len; // along
  const nx = -uy, ny = ux; // across
  const width = Math.min(w, h) * 0.16;

  if (part === 'glow') {
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 70; i++) {
    const t = Math.random();
    const off = gauss() * width * 0.55;
    const x = ax + dx * t + nx * off;
    const y = ay + dy * t + ny * off;
    const r = width * (0.6 + Math.random() * 0.9);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const warm = Math.random() < 0.35;
    g.addColorStop(0, warm ? 'rgba(255, 228, 200, 0.06)' : 'rgba(190, 210, 255, 0.065)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.globalCompositeOperation = 'source-over';
  return;
  }

  if (part === 'stars') {
  // dense faint stars concentrated on the band
  ctx.globalCompositeOperation = 'lighter';
  const count = Math.min(5000, Math.round((w * h) / 260));
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const off = gauss() * width * 0.6;
    const x = ax + dx * t + nx * off;
    const y = ay + dy * t + ny * off;
    const a = (0.2 + Math.random() * 0.6) * Math.exp(-Math.abs(off) / (width * 1.2));
    ctx.fillStyle = `rgba(${pick(STAR_COLORS)},${a.toFixed(3)})`;
    const r = Math.random() < 0.08 ? 1.1 : 0.6;
    ctx.fillRect(x, y, r, r);
  }
  ctx.globalCompositeOperation = 'source-over';
  return;
  }

  // dark dust rift along the middle of the band
  for (let i = 0; i < 90; i++) {
    const t = Math.random();
    const off = gauss() * width * 0.18 + Math.sin(t * 9) * width * 0.15;
    const x = ax + dx * t + nx * off;
    const y = ay + dy * t + ny * off;
    const r = width * (0.12 + Math.random() * 0.25);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(3, 6, 16, 0.22)');
    g.addColorStop(1, 'rgba(3, 6, 16, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
};

/** small spiral galaxy, painted once into its own sprite */
const makeGalaxy = (size: number, dpr: number) => {
  const c = document.createElement('canvas');
  c.width = c.height = Math.round(size * dpr);
  const ctx = c.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const R = size / 2;
  ctx.translate(R, R);

  // halo + core
  const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
  halo.addColorStop(0, 'rgba(255, 244, 228, 0.85)');
  halo.addColorStop(0.07, 'rgba(255, 226, 196, 0.45)');
  halo.addColorStop(0.3, 'rgba(150, 170, 255, 0.10)');
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.fill();

  // two logarithmic arms of particles
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 2600; i++) {
    const arm = i % 2;
    const t = Math.pow(Math.random(), 0.7);
    const r = t * R * 0.95;
    const ang = arm * Math.PI + t * 4.6 + gauss() * 0.28 * (1 - t * 0.5);
    const x = Math.cos(ang) * r + gauss() * R * 0.02;
    const y = Math.sin(ang) * r + gauss() * R * 0.02;
    const young = t > 0.35 && Math.random() < 0.5;
    const a = (1 - t) * 0.5 + 0.08;
    ctx.fillStyle = young ? `rgba(160, 190, 255, ${a.toFixed(3)})` : `rgba(255, 230, 205, ${(a * 0.8).toFixed(3)})`;
    const s = Math.random() < 0.04 ? 1.4 : 0.7;
    ctx.fillRect(x, y, s, s);
  }
  // a few pink star-forming knots
  for (let i = 0; i < 26; i++) {
    const arm = i % 2;
    const t = 0.4 + Math.random() * 0.5;
    const ang = arm * Math.PI + t * 4.6;
    const x = Math.cos(ang) * t * R * 0.95;
    const y = Math.sin(ang) * t * R * 0.95;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 3);
    g.addColorStop(0, 'rgba(255, 150, 200, 0.5)');
    g.addColorStop(1, 'rgba(255, 150, 200, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 3, y - 3, 6, 6);
  }
  return c;
};

export const Starfield: React.FC<StarfieldProps> = ({ className = '', density = 1.7 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const MARGIN = 24; // static layer is painted larger so parallax never shows an edge
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let staticLayer: HTMLCanvasElement | null = null;
    let galaxy: HTMLCanvasElement | null = null;
    let galaxySize = 0;
    const meteors: Meteor[] = [];
    let nextMeteorAt = performance.now() + 2000;
    let galaxyAngle = -0.5;

    let targetPX = 0, targetPY = 0, px = 0, py = 0;

    const seed = () => {
      const count = Math.min(380, Math.round(((width * height) / 10000) * density));
      stars = Array.from({ length: count }, () => {
        const d = Math.random();
        const bright = d > 0.965;
        return {
          x: Math.random(),
          y: Math.random(),
          r: bright ? 1.2 + Math.random() * 0.8 : 0.35 + Math.random() * 0.75,
          depth: 0.25 + d * 0.75,
          base: bright ? 0.95 : 0.4 + Math.random() * 0.6,
          speed: 0.5 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          rgb: pick(STAR_COLORS),
          spikes: bright && Math.random() < 0.6,
        };
      });
    };

    const paintStatic = () => {
      const c = document.createElement('canvas');
      const w = width + MARGIN * 2;
      const h = height + MARGIN * 2;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const sctx = c.getContext('2d')!;
      sctx.scale(dpr, dpr);

      // Soft layers are painted at quarter resolution and blurred when scaled
      // up: stacking many faint gradients at full res makes Chrome's gradient
      // dithering add up into a visible pixel grid.
      const soft = (paint: (x: CanvasRenderingContext2D) => void) => {
        const LO = 0.25;
        const lo = document.createElement('canvas');
        lo.width = Math.ceil(w * LO);
        lo.height = Math.ceil(h * LO);
        const lctx = lo.getContext('2d')!;
        lctx.scale(LO, LO);
        paint(lctx);
        sctx.save();
        sctx.filter = 'blur(6px)';
        sctx.imageSmoothingEnabled = true;
        sctx.imageSmoothingQuality = 'high';
        sctx.drawImage(lo, 0, 0, w, h);
        sctx.restore();
      };
      soft((x) => {
        paintNebulae(x, w, h);
        paintMilkyWay(x, w, h, 'glow');
      });
      paintMilkyWay(sctx, w, h, 'stars');
      soft((x) => paintMilkyWay(x, w, h, 'dust'));
      staticLayer = c;

      galaxySize = Math.max(110, Math.min(width, height) * 0.26);
      galaxy = makeGalaxy(galaxySize, dpr);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      seed();
      paintStatic();
      if (reduceMotion || !running) draw(performance.now());
    };

    const drawSpikes = (x: number, y: number, len: number, rgb: string, a: number) => {
      const g1 = ctx.createLinearGradient(x - len, y, x + len, y);
      g1.addColorStop(0, `rgba(${rgb},0)`);
      g1.addColorStop(0.5, `rgba(${rgb},${(a * 0.7).toFixed(3)})`);
      g1.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(x - len, y - 0.5, len * 2, 1);
      const g2 = ctx.createLinearGradient(x, y - len, x, y + len);
      g2.addColorStop(0, `rgba(${rgb},0)`);
      g2.addColorStop(0.5, `rgba(${rgb},${(a * 0.7).toFixed(3)})`);
      g2.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(x - 0.5, y - len, 1, len * 2);
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;

      // static sky (far layer, smallest parallax)
      if (staticLayer) {
        ctx.drawImage(staticLayer, -MARGIN + px * 6, -MARGIN + py * 4, width + MARGIN * 2, height + MARGIN * 2);
      }

      // distant spiral galaxy, turning very slowly
      if (galaxy) {
        // between the moon (left) and the title (right), near the top
        const gx = width * 0.34 + px * 8;
        const gy = height * 0.13 + py * 6;
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(-0.45);
        ctx.scale(1, 0.42); // seen at an angle
        ctx.rotate(galaxyAngle);
        ctx.globalAlpha = 0.85;
        ctx.drawImage(galaxy, -galaxySize / 2, -galaxySize / 2, galaxySize, galaxySize);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      // field stars
      for (const s of stars) {
        const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        const alpha = s.base * tw;
        const x = s.x * width + px * s.depth * 18;
        const y = s.y * height + py * s.depth * 12;
        if (s.r > 1) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4);
          g.addColorStop(0, `rgba(${s.rgb},${(alpha * 0.45).toFixed(3)})`);
          g.addColorStop(1, `rgba(${s.rgb},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(x - s.r * 4, y - s.r * 4, s.r * 8, s.r * 8);
          if (s.spikes) drawSpikes(x, y, s.r * (7 + 3 * tw), s.rgb, alpha);
        }
        ctx.fillStyle = `rgba(${s.rgb},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars: glowing head, tapering tail
      for (const m of meteors) {
        const sp = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / sp) * m.len;
        const ty = m.y - (m.vy / sp) * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${(0.95 * m.life).toFixed(3)})`);
        g.addColorStop(0.25, `rgba(186,214,255,${(0.45 * m.life).toFixed(3)})`);
        g.addColorStop(1, 'rgba(186,214,255,0)');
        ctx.strokeStyle = g;
        ctx.lineCap = 'round';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 5);
        hg.addColorStop(0, `rgba(255,255,255,${(0.9 * m.life).toFixed(3)})`);
        hg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hg;
        ctx.fillRect(m.x - 5, m.y - 5, 10, 10);
      }
    };

    let last = performance.now();
    let frame = 0;
    let running = false;
    let onScreen = true;

    const step = (t: number) => {
      frame = 0;
      const dt = Math.min(t - last, 50) / 1000;
      last = t;

      px += (targetPX - px) * Math.min(1, dt * 3);
      py += (targetPY - py) * Math.min(1, dt * 3);
      galaxyAngle += dt * 0.02;

      if (t > nextMeteorAt) {
        const fromLeft = Math.random() > 0.5;
        const speed = 560 + Math.random() * 300;
        const angle = (Math.PI / 180) * (16 + Math.random() * 18);
        meteors.push({
          x: fromLeft ? Math.random() * width * 0.5 : width * (0.5 + Math.random() * 0.5),
          y: Math.random() * height * 0.45,
          vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          len: 90 + Math.random() * 90,
        });
        nextMeteorAt = t + 3200 + Math.random() * 5200;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life -= dt * 1.3;
        if (m.life <= 0) meteors.splice(i, 1);
      }

      draw(t);
      if (running) frame = requestAnimationFrame(step);
    };

    const sync = () => {
      const shouldRun = !reduceMotion && onScreen && document.visibilityState === 'visible';
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(step);
      } else if (!shouldRun && running) {
        running = false;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onPointer = (e: PointerEvent) => {
      targetPX = (e.clientX / window.innerWidth - 0.5) * -2;
      targetPY = (e.clientY / window.innerHeight - 0.5) * -2;
    };
    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }
    document.addEventListener('visibilitychange', sync);
    sync();

    // dev-only: paint a frame by hand when rAF can't run (hidden preview)
    if ((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV) {
      (canvas as HTMLCanvasElement & { __sky?: unknown }).__sky = {
        frame: (ms = 16) => {
          const keep = running;
          running = false;
          step(last + ms);
          running = keep;
        },
      };
    }

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} aria-hidden="true" />;
};

export default Starfield;
