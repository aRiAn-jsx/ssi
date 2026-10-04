import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { getStatsData } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

// Animated count-up hook/component with entrance transition
const CountUpNumber: React.FC<{ value: number; duration?: number; isRtl: boolean }> = ({ value, duration = 2200, isRtl }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic/exponential
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block tabular-nums"
    >
      {isRtl ? count.toLocaleString('fa-IR') : count.toLocaleString('en-US')}
    </motion.span>
  );
};

export const StatisticsSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const statsData = getStatsData(language);

  return (
    <section id="stats" className="relative py-16 md:py-20 bg-[#01427C] overflow-hidden text-white">
      {/* Animated Mesh Gradient Overlay */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#027DF7]/30 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D5ECFE]/20 blur-[120px] pointer-events-none"
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/10 border border-[#027DF7]/40 text-[#D5ECFE] inline-block mb-3">
            {t.stats.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {t.stats.title}
          </h2>
        </div>

        {/* Animated Blue Line */}
        <div className="relative mb-8 hidden lg:block">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className={`h-[2px] bg-gradient-to-l from-transparent via-[#027DF7] to-transparent ${isRtl ? 'origin-right' : 'origin-left'}`}
          />
        </div>

        {/* 4 Large Numbers */}
        <div className={`statistics-numbers-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x ${isRtl ? 'lg:divide-x-reverse' : ''} lg:divide-[#027DF7]/30`}>
          {statsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center px-4 py-6 sm:py-2"
            >
              {/* Value with CountUp */}
              <div className="flex items-baseline gap-1 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                <CountUpNumber value={item.value} isRtl={isRtl} />
                <span className="text-xl sm:text-2xl font-bold text-[#D5ECFE]">
                  {item.suffix}
                </span>
              </div>

              {/* Label in #D5ECFE */}
              <h4 className="text-sm sm:text-base font-bold text-[#D5ECFE] mb-2">
                {item.label}
              </h4>

              {/* Subtext */}
              <p className="text-xs text-white/70 font-medium">
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Seal */}
        <div className="mt-10 pt-6 border-t border-[#027DF7]/30 text-center text-xs text-white/60">
          {t.stats.sourceAudit}
        </div>
      </div>
    </section>
  );
};
