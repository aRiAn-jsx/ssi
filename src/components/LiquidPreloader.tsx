import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface LiquidPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const RING = 118; // radius of the progress ring (SVG units, viewBox 260)
const CIRC = 2 * Math.PI * RING;
const ORBIT_DOTS = 14;

const STEPS = [
  { at: 0, fa: 'در حال آماده‌سازی', en: 'Preparing' },
  { at: 35, fa: 'بارگذاری سرمایه‌گذاری‌ها', en: 'Loading portfolio' },
  { at: 70, fa: 'همگام‌سازی شرکت‌های تابعه', en: 'Syncing subsidiaries' },
  { at: 92, fa: 'تقریباً آماده', en: 'Almost there' },
];

const toFa = (n: number) => n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

/**
 * Intro loader: the SSI emblem sits in a glass disc, a gradient ring fills
 * around it as the page loads, and a ring of orbit dots lights up in step
 * with the progress. Progress text is written straight to the DOM, so the
 * loader itself re-renders only when the status line changes.
 */
export const LiquidPreloader: React.FC<LiquidPreloaderProps> = ({ onComplete, minDuration = 1800 }) => {
  const { language } = useLanguage();
  const fa = language === 'fa';
  const [isFinished, setIsFinished] = useState(false);
  const [litDots, setLitDots] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const ringRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? Math.min(minDuration, 700) : minDuration;
    const start = performance.now();
    let frame = 0;
    let lastDots = -1;
    let lastStep = -1;
    let timer = 0;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 2.4);
      const pct = Math.round(eased * 100);

      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(CIRC * (1 - eased));
      if (pctRef.current) pctRef.current.textContent = fa ? `${toFa(pct)}٪` : `${pct}%`;

      const dots = Math.round((pct / 100) * ORBIT_DOTS);
      if (dots !== lastDots) {
        lastDots = dots;
        setLitDots(dots);
      }
      const step = STEPS.reduce((acc, s, i) => (pct >= s.at ? i : acc), 0);
      if (step !== lastStep) {
        lastStep = step;
        setStepIndex(step);
      }

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          setIsFinished(true);
          try {
            sessionStorage.setItem('saramad_preloader_seen', 'true');
          } catch {
            // storage may be unavailable (private mode)
          }
          onCompleteRef.current?.();
        }, 420);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [minDuration, fa]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="ssi-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          dir={fa ? 'rtl' : 'ltr'}
          role="status"
          aria-live="polite"
          aria-label={fa ? 'در حال بارگذاری' : 'Loading'}
        >
          <div className="preloader__aurora" aria-hidden="true" />
          <div className="preloader__stars" aria-hidden="true" />

          <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px]">
            {/* ambient halo */}
            <motion.div
              className="preloader__halo absolute inset-[-14%] rounded-full"
              animate={{ scale: [0.96, 1.05, 0.96], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            <svg viewBox="0 0 260 260" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
              <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#38BDF8" />
                  <stop offset="0.55" stopColor="#027DF7" />
                  <stop offset="1" stopColor="#01427C" />
                </linearGradient>
                <filter id="pl-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="130" cy="130" r={RING} className="preloader__track" />
              <circle
                ref={ringRef}
                cx="130"
                cy="130"
                r={RING}
                className="preloader__ring"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                filter="url(#pl-glow)"
              />
            </svg>

            {/* orbit dots, lit in step with progress */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              {Array.from({ length: ORBIT_DOTS }, (_, i) => {
                const a = (i / ORBIT_DOTS) * Math.PI * 2;
                const on = i < litDots;
                return (
                  <span
                    key={i}
                    className={`preloader__dot ${on ? 'preloader__dot--on' : ''}`}
                    style={{
                      left: `${50 + Math.cos(a) * 44}%`,
                      top: `${50 + Math.sin(a) * 44}%`,
                    }}
                  />
                );
              })}
            </motion.div>

            {/* center emblem */}
            <motion.div
              className="absolute inset-[24%] rounded-full preloader__disc flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/logo.webp" alt="" width={96} height={96} className="w-[58%] h-[58%] object-contain" />
            </motion.div>
          </div>

          <div className="mt-9 text-center">
            <div className="text-[13px] sm:text-sm font-black tracking-wide preloader__brand">
              {fa ? 'هلدینگ سرآمد سرمایه ایلیا' : 'Ilya Saramad Capital Holding'}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-2 text-xs preloader__step"
              >
                {fa ? STEPS[stepIndex].fa : STEPS[stepIndex].en}
              </motion.div>
            </AnimatePresence>
            <span ref={pctRef} className="block mt-3 font-mono text-2xl font-black tabular-nums preloader__pct">
              {fa ? '۰٪' : '0%'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
