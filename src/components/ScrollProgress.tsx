import React, { useEffect, useState } from 'react';
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
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'stats', label: t.nav.stats },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'subsidiaries', label: t.nav.subsidiaries },
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'news', label: t.nav.news },
    { id: 'team', label: t.nav.team },
    { id: 'cta', label: t.nav.consultation },
  ];

  // Tip position based on direction
  const tipPosition = useTransform(scaleX, (value) => `${Math.min(Math.max(value * 100, 0), 100)}%`);

  useEffect(() => {
    let timeoutId: number;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
      setIsScrolling(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    });

    return () => {
      unsubscribe();
      window.clearTimeout(timeoutId);
    };
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const formatPercent = (n: number) => {
    if (language === 'fa') {
      return n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]) + '٪';
    }
    return `${n}%`;
  };

  return (
    <>
      {/* Top Custom Liquid Glass Scroll Track (4px) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] md:h-[4px] bg-[#01427C]/10 backdrop-blur-sm z-40 pointer-events-none">
        {/* Glow ambient background aura */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8] opacity-25 blur-xs ${isRtl ? 'origin-right' : 'origin-left'}`}
          style={{ scaleX }}
        />

        {/* Primary Liquid Gradient Line */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#38BDF8] ${isRtl ? 'origin-right' : 'origin-left'} shadow-[0_0_12px_rgba(2,125,247,0.8),0_0_3px_rgba(56,189,248,1)]`}
          style={{ scaleX }}
        />

        {/* Moving Highlight Shimmer Sweep across the line */}
        <motion.div
          animate={{ x: isRtl ? ['100%', '-100%'] : ['-100%', '100%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none ${isRtl ? 'origin-right' : 'origin-left'}`}
          style={{ scaleX }}
        />

        {/* Leading Tip Glowing Pearl */}
        {scrollPercent > 1 && scrollPercent < 99 && (
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? '-translate-x-1/2' : 'translate-x-1/2'} w-2.5 h-2.5 rounded-full bg-white border border-[#38BDF8] shadow-[0_0_10px_#027DF7,0_0_20px_#38BDF8] z-40`}
            style={isRtl ? { right: tipPosition } : { left: tipPosition }}
          />
        )}
      </div>

      {/* Floating Scroll Percentage Pill (Positioned at bottom on mobile to avoid header collision, top on desktop) */}
      <AnimatePresence>
        {(isScrolling || scrollPercent > 8) && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-5 ${
              isRtl ? 'left-5 md:left-6' : 'right-5 md:right-6'
            } md:bottom-auto md:top-3.5 z-30 flex items-center gap-1.5 px-3 py-1.5 md:px-2.5 md:py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-white/90 shadow-lg md:shadow-md shadow-[#01427C]/12 text-xs md:text-[13px] font-bold text-[#01427C] hover:text-[#027DF7] transition-all cursor-pointer group active:scale-95`}
            title={language === 'fa' ? 'بازگشت به ابتدای صفحه' : 'Back to top'}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] animate-pulse" />
            <span className="tabular-nums">{formatPercent(scrollPercent)}</span>
            <ArrowUp className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#64748B] group-hover:text-[#027DF7] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side dot navigation with liquid glass styling (large screens) */}
      <div className={`fixed ${isRtl ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-3 py-3.5 px-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/70 shadow-xl shadow-[#01427C]/8`}>
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              aria-label={sec.label}
            >
              {/* Tooltip on hover */}
              <span className={`absolute ${isRtl ? 'right-7 translate-x-1 group-hover:translate-x-0' : 'left-7 -translate-x-1 group-hover:translate-x-0'} px-3 py-1 rounded-xl text-xs font-semibold text-[#01427C] bg-white/95 backdrop-blur-md shadow-lg border border-[#E2E8F0] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap`}>
                {sec.label}
              </span>

              {/* Dot indicator with liquid active state */}
              <div
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-gradient-to-tr from-[#01427C] to-[#027DF7] shadow-md shadow-[#027DF7]/60 scale-125'
                    : 'w-2.5 h-2.5 bg-[#01427C]/25 group-hover:bg-[#027DF7]/60 group-hover:scale-110'
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
