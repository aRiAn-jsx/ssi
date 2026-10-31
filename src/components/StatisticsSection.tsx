import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Award, Layers, Globe2, ShieldCheck } from 'lucide-react';
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

        {/* 4 Glassmorphic Indicator Cards: 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {statsData.map((item, idx) => {
            const icons = [
              <Sparkles key="1" className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />,
              <Award key="2" className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />,
              <Layers key="3" className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />,
              <Globe2 key="4" className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />,
            ];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-white/10 dark:bg-[#071325]/70 backdrop-blur-xl border border-white/20 dark:border-[#027DF7]/40 shadow-xl shadow-[#01427C]/20 hover:border-[#38BDF8]/60 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                {/* Ambient Top Glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent rounded-t-2xl sm:rounded-t-3xl" />

                <div>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    {icons[idx % icons.length]}
                  </div>

                  {/* Value with CountUp */}
                  <div className="flex items-baseline gap-1 text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-1 sm:mb-2">
                    {item.prefix && <span className="text-xl sm:text-3xl font-extrabold text-[#38BDF8]">{item.prefix}</span>}
                    <CountUpNumber value={item.value} isRtl={isRtl} />
                    <span className="text-sm sm:text-lg font-bold text-[#D5ECFE]">
                      {item.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#D5ECFE] mb-1.5 sm:mb-2 leading-snug">
                    {item.label}
                  </h3>
                </div>

                {/* Subtext */}
                <p className="text-[10px] sm:text-xs text-white/70 font-medium leading-relaxed pt-2 sm:pt-3 border-t border-white/10 line-clamp-2 sm:line-clamp-none">
                  {item.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Seal */}
        <div className="mt-12 pt-6 border-t border-[#027DF7]/30 text-center text-xs text-[#D5ECFE]/80 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
          <span>{t.stats.sourceAudit}</span>
        </div>
      </div>
    </section>
  );
};
