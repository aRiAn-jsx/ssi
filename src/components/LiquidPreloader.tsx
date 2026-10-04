import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getHoldingInfo } from '../data/mockData';

interface LiquidPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const LiquidPreloader: React.FC<LiquidPreloaderProps> = ({
  onComplete,
  minDuration = 1400,
}) => {
  const { language } = useLanguage();
  const holdingInfo = getHoldingInfo(language);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      // Exponential ease-out for ultra smooth natural deceleration
      const rawProgress = Math.min(elapsed / minDuration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);
      const targetPercent = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(targetPercent);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          try {
            sessionStorage.setItem('saramad_preloader_seen', 'true');
          } catch {
            // Ignore storage errors if disabled
          }
          if (onComplete) {
            onComplete();
          }
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [minDuration, onComplete]);

  const formatProgressNumber = (n: number) => {
    if (language === 'fa') {
      return n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
    }
    return n.toString();
  };

  // Circumference for the circular glowing ring
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="liquid-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7FAFC] dark:bg-[#060D17] select-none overflow-hidden"
        >
          {/* Ambient Multi-Layer Liquid Orbs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Pulsing Core Aura */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[380px] h-[380px] rounded-full bg-radial from-[#027DF7]/25 via-[#D5ECFE]/20 dark:via-[#027DF7]/15 to-transparent blur-3xl"
            />

            {/* Navy Deep Accent Orb */}
            <motion.div
              animate={{
                scale: [1.1, 0.95, 1.1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#01427C]/20 via-[#027DF7]/10 to-transparent blur-3xl"
            />
          </div>

          {/* Concentric Expanding Ripple Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                animate={{
                  scale: [0.7, 1.6],
                  opacity: [0.45, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: ring * 0.9,
                }}
                className="absolute w-44 h-44 rounded-full border border-[#027DF7]/25"
              />
            ))}
          </div>

          {/* Centerpiece (Direct Canvas, No Boxed Card) */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Interactive Glowing Emblem with Circular Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              {/* SVG Circular Progress Track */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                {/* Background Ring Track */}
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  className="stroke-[#01427C]/10"
                  strokeWidth="3"
                  fill="transparent"
                />
                {/* Active Liquid Gradient Progress Ring */}
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  stroke="url(#liquidProgressGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: 'stroke-dashoffset 0.15s ease-out',
                  }}
                />
                <defs>
                  <linearGradient id="liquidProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01427C" />
                    <stop offset="50%" stopColor="#027DF7" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Official Logo with Liquid Glass Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-20 h-20 rounded-3xl bg-white/95 dark:bg-[#071325] backdrop-blur-md p-3 flex items-center justify-center shadow-xl shadow-[#027DF7]/30 border border-[#027DF7]/40"
              >
                <img
                  src="/logo.webp"
                  alt={holdingInfo.name}
                  className="w-full h-full object-contain filter drop-shadow-xs"
                  width={64}
                  height={64}
                />
                {/* Shimmer Ambient Glow */}
                <div className="absolute -inset-1.5 rounded-3xl bg-[#027DF7]/25 blur-md -z-10 animate-pulse" />
              </motion.div>

              {/* Orbiting Satellite Light Bead */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-3 h-3 rounded-full bg-white border border-[#38BDF8] shadow-[0_0_12px_#027DF7,0_0_20px_#38BDF8] -top-1.5 left-1/2 -translate-x-1/2" />
              </motion.div>
            </div>

            {/* Brand Title & Typographic Hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Grand Title */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl md:text-3xl font-black text-[#01427C] tracking-tight">
                  {holdingInfo.shortName}
                </span>
                <span className="text-[12px] md:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D5ECFE] text-[#01427C] border border-[#027DF7]/25 shadow-2xs">
                  {language === 'fa' ? 'سهامی عام' : 'PJSC'}
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-xs md:text-sm font-semibold text-[#64748B] tracking-wide mb-6">
                {language === 'fa' ? 'گروه مالی و سرمایه‌گذاری بیمه سامان' : 'Saman Insurance Financial Group'}
              </p>
            </motion.div>

            {/* Minimal Liquid Laser Line Progress & Numeric Counter */}
            <div className="w-56 sm:w-64 flex flex-col items-center gap-2.5">
              {/* Laser Line */}
              <div className="relative w-full h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8] shadow-[0_0_10px_#027DF7]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Counter Display & Status */}
              <div className="w-full flex items-center justify-between text-xs font-bold px-0.5">
                <span className="text-[13px] font-medium text-[#64748B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] animate-ping" />
                  {language === 'fa' ? 'آماده‌سازی پورتال...' : 'Initializing portal...'}
                </span>
                <span className="tabular-nums font-mono text-sm font-extrabold text-[#01427C]">
                  {formatProgressNumber(progress)}٪
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
