import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, BadgeCheck, ChevronDown, Layers } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { Starfield } from './ui/Starfield';
import { AnimatedNumber } from './ui/AnimatedNumber';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onGoToConsultation?: () => void;
  onGoToArticles?: () => void;
  /** false while the intro preloader is still covering the page */
  introReady?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Title lines slide up from behind a mask
const line: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
};


export const HeroSection: React.FC<HeroSectionProps> = ({ onGoToConsultation, introReady = true }) => {
  const { language, isRtl, t } = useLanguage();
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();

  // The planet is desktop-only; on smaller screens it isn't mounted at all,
  // so phones never spin up the WebGL globe.
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  // The astronaut drifts in only once everything is in place: page loaded,
  // preloader gone, moon surface baked and the image itself decoded.
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete'
  );
  const [moonReady, setMoonReady] = useState(false);
  const [astroLoaded, setAstroLoaded] = useState(false);
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);
  useEffect(() => {
    if (!isDark) setMoonReady(false);
  }, [isDark]);
  const showAstronaut = isDark && introReady && pageLoaded && moonReady && astroLoaded;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const fa = language === 'fa';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 90]);
  const skyY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 140]);

  const titleLines = fa
    ? [
        { text: 'هلدینگ ایلیا؛', accent: false },
        { text: 'پلتفرم جامع سرمایه‌گذاری،', accent: true },
        { text: 'مشاوره کسب‌وکار و توسعه فناوری', accent: false },
      ]
    : [
        { text: 'Ilya Holding:', accent: false },
        { text: 'an integrated investment,', accent: true },
        { text: 'business & technology platform', accent: false },
      ];

  const stats = [
    { value: 165, prefix: '+', label: fa ? 'پروژه موفق' : 'Projects' },
    { value: fa ? 1392 : 2013, from: fa ? 1380 : 2000, label: fa ? 'آغاز فعالیت' : 'Founded' },
    { value: 280, prefix: '+', label: fa ? 'نیروی متخصص' : 'Team' },
    { value: 98.4, decimals: 1, suffix: fa ? '٪' : '%', label: fa ? 'رضایت مشتری' : 'Success' },
  ];

  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-[100dvh] flex flex-col overflow-hidden pt-24 sm:pt-28"
    >
      {/* ================= BACKDROP ================= */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {isDark ? (
          <>
            <div className="absolute inset-0 hero-space" />
            <Starfield className="absolute inset-0" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 hero-daylight" />
            <div className="hero-aurora hero-aurora--a" />
            <div className="hero-aurora hero-aurora--b" />
          </>
        )}
      </motion.div>
      {/* blend into the next section */}
      <div className="hero-bottom-fade" aria-hidden="true" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 pb-6 lg:pb-10 pointer-events-none">
        <div className="w-full">
          {/* Text column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[52%] xl:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-start pointer-events-auto"
          >
            <motion.div
              variants={rise}
              className="inline-flex items-center gap-2 ps-2 pe-3.5 py-1.5 mb-6 rounded-full hero-chip text-[13px] font-bold text-[#01427C] dark:text-[#E0F2FE]"
            >
              <span className="relative flex h-2 w-2 ms-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#027DF7] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#027DF7] dark:bg-[#38BDF8]" />
              </span>
              <span className="hidden sm:inline">
                {fa ? 'بیش از ۱۴ سال خلق ارزش و توسعه پایدار' : t.hero.eyebrow}
              </span>
              <span className="sm:hidden">{fa ? 'موفقیت یک انتخاب است' : 'Success is a choice'}</span>
              <span className="flex items-center gap-1 ps-2 border-s border-[#027DF7]/25 text-[#027DF7] dark:text-[#38BDF8]">
                <BadgeCheck className="w-3.5 h-3.5" />
                {fa ? 'سهامی خاص' : 'PJS Co'}
              </span>
            </motion.div>

            <h1 className="hero-title font-black tracking-tight text-[#01427C] dark:text-white mb-6">
              {titleLines.map((l, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                  <motion.span
                    variants={line}
                    className={`inline-block hero-line ${l.accent ? 'hero-title-accent' : ''}`}
                  >
                    {l.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={rise}
              className="text-base sm:text-lg leading-8 text-[#475569] dark:text-[#CBD5E1] max-w-xl mb-8"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={rise} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                id="hero-primary-cta"
                onClick={onGoToConsultation}
                className="hero-cta-primary group w-full sm:w-auto min-h-[52px] px-7 rounded-full text-white font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{fa ? 'درخواست مشاوره تخصصی' : t.hero.ctaPrimary}</span>
                <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
              </button>
              <a
                href="#subsidiaries"
                id="hero-secondary-cta"
                className="group w-full sm:w-auto min-h-[52px] px-7 rounded-full hero-chip font-bold text-[#01427C] dark:text-[#E0F2FE] flex items-center justify-center gap-2 transition-colors hover:text-[#027DF7] dark:hover:text-[#38BDF8]"
              >
                <Layers className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8] transition-transform duration-300 group-hover:rotate-6" />
                <span>{fa ? 'شرکت‌های زیرمجموعه' : t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.dl
              variants={rise}
              className="mt-10 grid grid-cols-4 w-full max-w-xl divide-x rtl:divide-x-reverse divide-[#027DF7]/15 dark:divide-[#38BDF8]/15"
            >
              {stats.map((s) => (
                <div key={s.label} className="px-2 sm:px-4 first:ps-0 last:pe-0 flex flex-col items-center lg:items-start">
                  <dd className="text-xl sm:text-3xl font-black text-[#01427C] dark:text-white leading-none">
                    <AnimatedNumber
                      value={s.value}
                      from={s.from ?? 0}
                      decimals={s.decimals ?? 0}
                      prefix={s.prefix ?? ''}
                      suffix={s.suffix ?? ''}
                      locale={fa ? 'fa' : 'en'}
                      duration={2.2}
                    />
                  </dd>
                  <dt className="mt-2 text-[11px] sm:text-[13px] font-semibold text-[#64748B] dark:text-[#94A3B8] whitespace-nowrap">
                    {s.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

        </div>
      </div>

      {/* Planet — desktop only, beside the text */}
      {isDesktop && (
        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
          className="hero-planet"
        >
          <HeroVisual isDark={isDark} className="w-full" onMoonReady={() => setMoonReady(true)} />

          {/* astronaut floating up toward the moon, pointing at it (dark mode) */}
          {isDark && (
            <div className="hero-astronaut" aria-hidden="true">
              <div className="hero-astronaut-float">
                <div className="hero-astronaut-flip">
                  <motion.img
                    src="/assets/hero/astronaut.webp"
                    alt=""
                    width={676}
                    height={900}
                    decoding="async"
                    draggable={false}
                    onLoad={() => setAstroLoaded(true)}
                    // drifts in from the outer edge (left in RTL), below, tilted
                    initial={{ opacity: 0, x: isRtl ? '-55%' : '55%', y: '60%', rotate: isRtl ? -16 : 16, scale: 0.82 }}
                    animate={
                      showAstronaut
                        ? { opacity: 1, x: '0%', y: '0%', rotate: 0, scale: 1 }
                        : { opacity: 0, x: isRtl ? '-55%' : '55%', y: '60%', rotate: isRtl ? -16 : 16, scale: 0.82 }
                    }
                    transition={{
                      duration: showAstronaut ? 2.6 : 0.4,
                      delay: showAstronaut ? 0.35 : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-auto select-none"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Scroll cue */}
      <a
        href="#stats"
        className="relative z-10 mx-auto mb-4 hidden lg:flex flex-col items-center gap-1 text-[#01427C]/60 dark:text-white/50 hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-colors"
        aria-label={fa ? 'ادامه' : 'Scroll down'}
      >
        <span className="w-5 h-8 rounded-full border border-current flex justify-center pt-1.5">
          <span className="hero-scroll-dot w-1 h-1.5 rounded-full bg-current" />
        </span>
        <ChevronDown className="w-3.5 h-3.5" />
      </a>
    </section>
  );
};
