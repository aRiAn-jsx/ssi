import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface LiquidPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

// Chic financial chart bars definition (normalized target heights in percentage)
const CHART_BARS = [
  { id: 'b1', targetHeight: 36, delay: 0.05, label: 'Q1' },
  { id: 'b2', targetHeight: 52, delay: 0.12, label: 'Q2' },
  { id: 'b3', targetHeight: 46, delay: 0.18, label: 'Q3' },
  { id: 'b4', targetHeight: 74, delay: 0.24, label: 'Q4' },
  { id: 'b5', targetHeight: 65, delay: 0.30, label: 'H1' },
  { id: 'b6', targetHeight: 88, delay: 0.36, label: 'H2' },
  { id: 'b7', targetHeight: 100, delay: 0.42, label: 'SSI' },
];

export const LiquidPreloader: React.FC<LiquidPreloaderProps> = ({
  onComplete,
  minDuration = 1500,
}) => {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    startTimeRef.current = performance.now();
    setIsFinished(false);

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const rawProgress = Math.min(elapsed / minDuration, 1);
      // Fluid cubic deceleration for ultra-smooth rise
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.6);
      const targetPercent = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(targetPercent);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          try {
            sessionStorage.setItem('saramad_preloader_seen', 'true');
          } catch {
            // ignore
          }
          if (onComplete) {
            onComplete();
          }
        }, 280);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [minDuration, onComplete]);

  const formatProgressNumber = (n: number) => {
    if (language === 'fa') {
      return n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
    }
    return n.toString();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="minimal-chart-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: 'blur(10px)',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#060D17] select-none overflow-hidden"
          dir={language === 'fa' ? 'rtl' : 'ltr'}
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{
                scale: [0.95, 1.1, 0.95],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[420px] h-[420px] rounded-full bg-radial from-[#027DF7]/20 via-[#38BDF8]/10 to-transparent blur-3xl"
            />
          </div>

          {/* Minimalist Chic Centerpiece */}
          <div className="relative z-10 flex flex-col items-center">
            {/* SSI Brand Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-[#0B192C] shadow-lg shadow-[#027DF7]/15 border border-[#027DF7]/25 flex items-center justify-center p-2 mb-2 backdrop-blur-md">
                <img
                  src="/logo.webp"
                  alt="SSI"
                  className="w-full h-full object-contain"
                  width={36}
                  height={36}
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#027DF7] ring-4 ring-white dark:ring-[#060D17] animate-pulse" />
              </div>
              <span className="text-xs font-black tracking-wider text-[#01427C] dark:text-[#E0F2FE]">
                {language === 'fa' ? 'هلدینگ سرآمد سرمایه ایلیا' : 'Ilya Saramad Capital Holding'}
              </span>
            </motion.div>

            {/* Rising Chart Stage */}
            <div className="relative w-64 sm:w-72 h-36 px-3 flex flex-col justify-end">
              {/* Ultra-faint Financial Grid Guidelines */}
              <div className="absolute inset-x-3 inset-y-0 flex flex-col justify-between pointer-events-none py-1">
                <div className="w-full border-b border-dashed border-slate-200/60 dark:border-slate-800/80" />
                <div className="w-full border-b border-dashed border-slate-200/60 dark:border-slate-800/80" />
                <div className="w-full border-b border-dashed border-slate-200/60 dark:border-slate-800/80" />
                <div className="w-full border-b border-slate-200 dark:border-slate-800" />
              </div>

              {/* Rising Chart Bars */}
              <div className="relative z-10 w-full h-28 flex items-end justify-between gap-2.5 sm:gap-3.5 pb-0.5">
                {CHART_BARS.map((bar) => {
                  // Compute dynamic height proportional to progress
                  const currentPercent = Math.min(
                    100,
                    Math.max(8, (progress / 100) * bar.targetHeight)
                  );

                  return (
                    <div
                      key={bar.id}
                      className="relative flex-1 flex flex-col items-center h-full justify-end group"
                    >
                      {/* Floating glowing cap bead */}
                      <motion.div
                        className="w-2.5 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] mb-1 shrink-0"
                        animate={{
                          opacity: progress > 15 ? 1 : 0.3,
                          scale: progress > 80 ? [1, 1.25, 1] : 1,
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: progress > 80 ? Infinity : 0,
                          delay: bar.delay,
                        }}
                      />

                      {/* Animated Column Bar */}
                      <motion.div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#01427C]/30 via-[#027DF7] to-[#38BDF8] shadow-sm shadow-[#027DF7]/20 relative overflow-hidden"
                        style={{
                          height: `${currentPercent}%`,
                          transition: 'height 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      >
                        {/* Shimmer light beam running up each bar */}
                        <motion.div
                          animate={{ y: ['100%', '-100%'] }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            delay: bar.delay,
                            ease: 'linear',
                          }}
                          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/35 to-transparent w-full pointer-events-none"
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Ambient Growth Trend Arrow Indicator */}
              <div className="absolute top-0 right-4 flex items-center gap-1 text-[11px] font-mono font-bold text-[#027DF7] dark:text-[#38BDF8]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{(progress * 0.28).toFixed(1)}%</span>
              </div>
            </div>

            {/* Ultra-Minimal Progress Indicator */}
            <div className="w-56 mt-6 flex flex-col items-center">
              {/* Thin Sleek Progress Line */}
              <div className="w-full h-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8]"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>

              {/* Clean Minimal Percentage Number */}
              <div className="mt-2.5 flex items-center justify-between w-full text-[11.5px] font-medium text-slate-500 dark:text-slate-400">
                <span className="font-mono text-xs font-extrabold text-[#01427C] dark:text-[#38BDF8] tabular-nums">
                  {formatProgressNumber(progress)}%
                </span>
                <span className="text-[11px]">
                  {language === 'fa' ? 'در حال بارگذاری' : 'Loading'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
