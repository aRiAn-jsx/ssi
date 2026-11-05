import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ScrollProgress: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showPill, setShowPill] = useState(false);
  const percentRef = useRef<HTMLSpanElement>(null);

  const sections = useMemo(
    () => [
      { id: 'home', label: t.nav.home },
      { id: 'stats', label: t.nav.stats },
      { id: 'about', label: t.nav.about },
      { id: 'subsidiaries', label: t.nav.subsidiaries },
      { id: 'virgol-groups', label: language === 'fa' ? 'کارگروه‌ها' : 'Virgol Groups' },
      { id: 'values', label: language === 'fa' ? 'ارزش‌ها' : 'Values' },
      { id: 'certifications', label: language === 'fa' ? 'گواهینامه‌ها' : 'ISO' },
      { id: 'team', label: t.nav.team },
      { id: 'contact', label: t.nav.consultation },
    ],
    [language, t]
  );

  // Tip position based on direction
  const tipPosition = useTransform(scaleX, (value) => `${Math.min(Math.max(value * 100, 0), 100)}%`);
  const tipOpacity = useTransform(scrollYProgress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  // Percentage text is written straight to the DOM; React only re-renders when
  // the pill's visibility actually flips.
  useEffect(() => {
    let shown = showPill;
    const formatPercent = (n: number) =>
      language === 'fa'
        ? n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]) + '٪'
        : `${n}%`;

    const apply = (latest: number) => {
      const pct = Math.round(latest * 100);
      if (percentRef.current) percentRef.current.textContent = formatPercent(pct);
      const next = pct > 8;
      if (next !== shown) {
        shown = next;
        setShowPill(next);
      }
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on('change', apply);
  }, [scrollYProgress, language, showPill]);

  // Active section tracking without reading layout on every scroll event.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-33% 0px -66% 0px' }
    );
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Custom Liquid Glass Scroll Track (4px) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] md:h-[4px] bg-[#01427C]/10 dark:bg-white/10 z-40 pointer-events-none">
        {/* Glow ambient background aura */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8] dark:from-[#027DF7] dark:via-[#38BDF8] dark:to-[#93C5FD] opacity-25 ${isRtl ? 'origin-right' : 'origin-left'}`}
          style={{ scaleX }}
        />

        {/* Primary Liquid Gradient Line */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8] dark:from-[#027DF7] dark:via-[#38BDF8] dark:to-[#93C5FD] ${isRtl ? 'origin-right' : 'origin-left'} shadow-[0_0_12px_rgba(2,125,247,0.8),0_0_3px_rgba(56,189,248,1)] dark:shadow-[0_0_15px_rgba(56,189,248,0.9),0_0_5px_rgba(147,197,253,1)]`}
          style={{ scaleX }}
        />

        {/* Leading Tip Glowing Pearl */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'translate-x-1/2' : '-translate-x-1/2'} w-2.5 h-2.5 rounded-full bg-white dark:bg-[#38BDF8] border border-[#38BDF8] dark:border-white shadow-[0_0_10px_#027DF7,0_0_20px_#38BDF8] z-40`}
          style={isRtl ? { right: tipPosition, opacity: tipOpacity } : { left: tipPosition, opacity: tipOpacity }}
        />
      </div>

      {/* Floating Scroll Percentage Pill (Positioned at bottom on mobile to avoid header collision, top on desktop) */}
      <AnimatePresence>
        {showPill && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-5 ${
              isRtl ? 'left-5 md:left-6' : 'right-5 md:right-6'
            } md:bottom-auto md:top-3.5 z-30 flex items-center gap-1.5 px-3 py-1.5 md:px-2.5 md:py-1 rounded-full bg-white/80 dark:bg-[#071325]/60 hover:bg-white/95 dark:hover:bg-[#0A1B33]/85 backdrop-blur-2xl border border-white/60 dark:border-[#38BDF8]/30 dark:hover:border-[#38BDF8]/60 shadow-lg md:shadow-md shadow-[#01427C]/12 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_18px_rgba(2,125,247,0.25)] text-xs md:text-[13px] font-bold text-[#01427C] dark:text-[#E0F2FE] hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-all duration-300 cursor-pointer group active:scale-95`}
            title={language === 'fa' ? 'بازگشت به ابتدای صفحه' : 'Back to top'}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8] animate-pulse" />
            <span ref={percentRef} className="tabular-nums" />
            <ArrowUp className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#027DF7] dark:group-hover:text-[#38BDF8] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side dot navigation with liquid glass styling (large screens) */}
      <div className={`fixed ${isRtl ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-3 py-4 px-2.5 rounded-full bg-white/50 dark:bg-[#071325]/50 backdrop-blur-2xl border border-white/70 dark:border-[#38BDF8]/25 shadow-xl shadow-[#01427C]/8 dark:shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(2,125,247,0.18)] transition-all duration-300 hover:border-[#027DF7]/40 dark:hover:border-[#38BDF8]/50`}>
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex items-center justify-center p-2 focus:outline-none cursor-pointer"
              aria-label={sec.label}
            >
              {/* Glass aura halo behind dot on hover */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#027DF7]/10 dark:bg-[#38BDF8]/20 backdrop-blur-xs scale-75 group-hover:scale-110 border border-transparent dark:group-hover:border-[#38BDF8]/40 shadow-[0_0_14px_rgba(56,189,248,0.35)]" />

              {/* Tooltip on hover — ultra-glassmorphic liquid glass in dark mode */}
              <span className={`absolute ${isRtl ? 'right-9 translate-x-2 group-hover:translate-x-0' : 'left-9 -translate-x-2 group-hover:translate-x-0'} px-3.5 py-1.5 rounded-2xl text-xs font-bold text-[#01427C] dark:text-white bg-white/85 dark:bg-[#081528]/75 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(56,189,248,0.25)] border border-white/80 dark:border-[#38BDF8]/40 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 whitespace-nowrap flex items-center gap-2 overflow-hidden z-50`}>
                {/* Specular glass reflection top line */}
                <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-[#38BDF8]/70 to-transparent pointer-events-none" />

                <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] shrink-0" />
                <span className="tracking-tight">{sec.label}</span>
              </span>

              {/* Dot indicator with liquid active state and luminous dark mode hover */}
              <div
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-gradient-to-tr from-[#01427C] to-[#027DF7] dark:from-[#027DF7] dark:to-[#38BDF8] shadow-md shadow-[#027DF7]/60 dark:shadow-[0_0_14px_#38BDF8] scale-125 ring-2 ring-[#027DF7]/30 dark:ring-[#38BDF8]/40'
                    : 'w-2.5 h-2.5 bg-[#01427C]/30 dark:bg-slate-400/40 group-hover:bg-[#027DF7] dark:group-hover:bg-[#38BDF8] group-hover:scale-125 dark:group-hover:shadow-[0_0_12px_#38BDF8] dark:group-hover:ring-2 dark:group-hover:ring-[#38BDF8]/40'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#38BDF8] animate-ping opacity-75" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};
