import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Globe2,
  ChevronDown,
  Layers,
  Briefcase,
  Calendar,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { Globe, SARAMAD_GLOBE_CONFIG, SARAMAD_GLOBE_DARK_CONFIG } from './ui/globe';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getHoldingInfo } from '../data/mockData';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  language: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  decimals = 0,
  duration = 2.4,
  prefix = '',
  suffix = '',
  language,
}) => {
  const [val, setVal] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const initialStart = start !== undefined && start > 0 ? start : 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Smooth exponential/cubic easeOut
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = initialStart + eased * (end - initialStart);
      setVal(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setVal(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, start, duration]);

  const numStr = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  const displayVal = language === 'fa'
    ? numStr.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)])
    : numStr;

  return (
    <motion.span
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="tabular-nums font-extrabold tracking-tight inline-block"
    >
      {prefix}
      {displayVal}
      {suffix}
    </motion.span>
  );
};

interface HeroSectionProps {
  onGoToConsultation?: () => void;
  onGoToArticles?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGoToConsultation,
  onGoToArticles,
}) => {
  const { language, isRtl, t } = useLanguage();
  const { isDark } = useTheme();
  const holdingInfo = getHoldingInfo(language);
  const headingWords = t.hero.titleWords;
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Parallax subtle vertical movement on scroll
  const { scrollY } = useScroll();
  const globeParallaxY = useTransform(scrollY, [0, 600], [0, -70]);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] lg:h-screen lg:min-h-screen pt-24 sm:pt-28 lg:pt-24 pb-3 sm:pb-5 flex flex-col justify-between overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 3D WEBGL GLOBE BACKGROUND LAYER (Magic UI / COBE)                         */}
      {/* Interactive, auto-rotating financial globe visible on both Mobile & Desktop*/}
      {/* ========================================================================= */}
      <motion.div
        style={{ y: globeParallaxY }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-20 sm:top-24 md:top-1/2 md:-translate-y-1/2 ${
          isRtl ? '-right-10 sm:-right-14 md:-right-24 lg:-right-16 xl:right-4' : '-left-10 sm:-left-14 md:-left-24 lg:-left-16 xl:left-4'
        } w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] xl:w-[700px] xl:h-[700px] pointer-events-auto z-0 select-none overflow-hidden max-w-full`}
      >
        {/* Soft Radial Ambient Aura behind Globe with subtle breathing animation */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-radial from-[#38BDF8]/15 via-[#D5ECFE]/20 dark:from-[#38BDF8]/12 dark:via-[#1E3A8A]/15 to-transparent blur-3xl pointer-events-none -z-10"
        />

        {/* The 3D WebGL Globe canvas */}
        <Globe
          className="w-full h-full"
          config={isDark ? SARAMAD_GLOBE_DARK_CONFIG : SARAMAD_GLOBE_CONFIG}
          speed={0.009}
        />

        {/* Soft Light Overlay over Globe for 100% Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#F7FAFC]/30 to-[#F7FAFC]/80 dark:via-[#0B1324]/30 dark:to-[#0B1324]/85 pointer-events-none" />
      </motion.div>

      {/* Floating Ambient Glow Orbs in Background */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 ${
          isRtl ? 'right-4 md:right-10' : 'left-4 md:left-10'
        } w-60 h-60 md:w-96 md:h-96 rounded-full bg-[#D5ECFE]/40 blur-3xl pointer-events-none -z-10 max-w-full`}
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-20 ${
          isRtl ? 'left-4 md:left-10' : 'right-4 md:right-10'
        } w-60 h-60 md:w-[400px] md:h-[400px] rounded-full bg-[#027DF7]/10 blur-3xl pointer-events-none -z-10 max-w-full`}
      />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* HERO FOREGROUND CONTENT                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full my-auto flex-1 flex items-center relative z-10 pointer-events-none py-4 sm:py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          {/* Text Column (Right side in RTL) */}
          <div
            className={`lg:col-span-7 flex flex-col items-center lg:items-start ${
              isRtl ? 'text-center lg:text-right' : 'text-center lg:text-left'
            } pointer-events-auto`}
          >
            {/* Eyebrow Tag - Minimalist Iconographic Brand Badge (Hidden on mobile per user request) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#071325]/90 border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-2xs backdrop-blur-md mb-4 lg:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#027DF7] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#027DF7]" />
              </span>
              <span className="text-xs font-bold text-[#01427C] dark:text-[#E0F2FE]">
                {language === 'fa' 
                  ? 'بیش از ۱۴ سال خلق ارزش، نوآوری و توسعه پایدار | موفقیت یک انتخاب است'
                  : t.hero.eyebrow}
              </span>
              <div
                className={`flex items-center gap-1 text-[13px] font-semibold text-[#027DF7] dark:text-[#38BDF8] ${
                  isRtl ? 'border-r pr-2' : 'border-l pl-2'
                } border-[#027DF7]/25 dark:border-[#027DF7]/40`}
              >
                <BadgeCheck className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
                <span>{language === 'fa' ? 'سهامی خاص' : 'PJS Co'}</span>
              </div>
            </motion.div>

            {/* H1 Heading - SEO Optimized with Fluid Typography & Highlights */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] font-extrabold text-[#01427C] dark:text-white leading-snug sm:leading-tight lg:leading-[1.25] tracking-tight mb-4 sm:mb-6 drop-shadow-2xs ${isRtl ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
              {language === 'fa' ? (
                <>
                  <span className="inline-block">هلدینگ ایلیا؛ </span>{' '}
                  <span className="inline-block bg-gradient-to-r from-[#027DF7] via-[#0284C7] to-[#38BDF8] bg-clip-text text-transparent">
                    پلتفرم جامع سرمایه گذاری،
                  </span>{' '}
                  <span className="inline-block">مشاوره کسب و کار </span>{' '}
                  <span className="inline-block bg-gradient-to-l from-[#027DF7] to-[#01427C] dark:from-[#38BDF8] dark:to-white bg-clip-text text-transparent">
                    و توسعه فناوری
                  </span>
                </>
              ) : (
                headingWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.12 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {word}{' '}
                  </motion.span>
                ))
              )}
            </h1>

            {/* Subtitle - Centered on mobile with readable line-height */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-[#64748B] dark:text-[#CBD5E1] font-normal leading-7 sm:leading-relaxed max-w-2xl mb-6 sm:mb-8 ${isRtl ? 'text-center lg:text-right' : 'text-center lg:text-left'} mx-auto lg:mx-0`}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Buttons - Full Width Stacked on Mobile, Side by Side on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                id="hero-primary-cta"
                onClick={onGoToConsultation}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white font-bold text-sm sm:text-base min-h-[48px] shadow-lg shadow-[#027DF7]/25 hover:shadow-xl hover:shadow-[#027DF7]/40 transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>{language === 'fa' ? 'درخواست مشاوره تخصصی' : t.hero.ctaPrimary}</span>
                <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform shrink-0" />
              </button>

              <a
                href="#subsidiaries"
                id="hero-secondary-cta"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full liquid-glass-card hover:bg-white text-[#01427C] dark:text-[#E0F2FE] font-bold text-sm sm:text-base min-h-[48px] transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-xs group whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-[#027DF7] group-hover:rotate-6 transition-transform shrink-0" />
                <span>{language === 'fa' ? 'آشنایی با شرکت‌های زیرمجموعه' : t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* Bottom Micro Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#027DF7]/20 dark:border-[#027DF7]/40 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-[#071325]/80 backdrop-blur-xs border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-2xs text-[#01427C] dark:text-[#E0F2FE]">
                <ShieldCheck className="w-4 h-4 text-[#027DF7] shrink-0" />
                <span className="font-bold text-xs sm:text-[13px]">{language === 'fa' ? 'دانش‌بنیان (تأسیس ۱۳۸۸/۰۸/۰۸)' : 'Est. 2009'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-[#071325]/80 backdrop-blur-xs border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-2xs text-[#01427C] dark:text-[#E0F2FE]">
                <Award className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="font-bold text-xs sm:text-[13px]">{language === 'fa' ? '۸ نشان بین‌المللی ISO' : '8 ISO Badges'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-[#071325]/80 backdrop-blur-xs border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-2xs text-[#01427C] dark:text-[#E0F2FE]">
                <Globe2 className="w-4 h-4 text-[#027DF7] shrink-0" />
                <span className="font-bold text-xs sm:text-[13px]">{language === 'fa' ? 'همکاری بین‌المللی (اروپا و آسیا)' : 'Europe & Asia Partners'}</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Hero Visual Graphic & Glass Stats HUD (Left side in RTL) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pointer-events-auto w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] xl:max-w-[480px] flex items-center justify-center select-none"
            >
              {/* Pure Hero Image - 1:1 Aspect Ratio with zero background */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full aspect-square flex items-center justify-center"
              >
                <img
                  src="/hero-img.webp"
                  alt="پلتفرم هلدینگ ایلیا پیشرو در سرمایه گذاری و مشاوره کسب و کار"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  loading="eager"
                />
              </motion.div>
            </motion.div>

            {/* HORIZONTAL ULTRA-SLEEK LIQUID GLASS COMMAND DOCK */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="statistics-numbers-container w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[500px] -mt-3 lg:-mt-4 relative z-20 px-1 sm:px-0"
            >
              {/* Ambient Cyan-Sapphire Glow Halo */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#027DF7]/25 via-[#38BDF8]/20 to-[#01427C]/25 blur-lg opacity-70 dark:opacity-90 pointer-events-none -z-10" />

              <div className="relative rounded-2xl sm:rounded-full px-2.5 py-2 sm:px-4 sm:py-2.5 bg-white/90 dark:bg-[#071325]/90 backdrop-blur-2xl border border-white/80 dark:border-[#38BDF8]/40 shadow-xl shadow-[#01427C]/12 dark:shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(2,125,247,0.25)] overflow-hidden group">
                {/* Top Specular Edge Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#027DF7]/70 dark:via-[#38BDF8]/80 to-transparent pointer-events-none" />

                {/* Shimmer Sweep Animation */}
                <motion.div
                  animate={{ x: isRtl ? ['200%', '-250%'] : ['-200%', '250%'] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 2.5,
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 dark:via-[#38BDF8]/20 to-transparent -skew-x-12 pointer-events-none"
                />

                {/* 4 Horizontal Items in Single Sleek Row */}
                <div className="grid grid-cols-4 items-center relative z-10 divide-x divide-slate-200/80 rtl:divide-x-reverse dark:divide-[#027DF7]/30">
                  {/* 1. پروژه‌ها */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left group/item cursor-pointer">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#027DF7] to-[#01427C] flex items-center justify-center text-white shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start rtl:sm:items-start ltr:sm:items-start leading-none">
                      <span className="text-sm sm:text-base md:text-lg font-black text-[#01427C] dark:text-white group-hover/item:text-[#027DF7] dark:group-hover/item:text-[#38BDF8] transition-colors tracking-tight">
                        <AnimatedCounter end={165} prefix="+" language={language} />
                      </span>
                      <span className="text-[10px] sm:text-[11.5px] font-bold text-[#64748B] dark:text-slate-300 mt-0.5 whitespace-nowrap">
                        {language === 'fa' ? 'پروژه‌ها' : 'Projects'}
                      </span>
                    </div>
                  </div>

                  {/* 2. شروع کار */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left group/item cursor-pointer">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#01427C] to-[#0369A1] flex items-center justify-center text-white shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start rtl:sm:items-start ltr:sm:items-start leading-none">
                      <span className="text-sm sm:text-base md:text-lg font-black text-[#01427C] dark:text-white group-hover/item:text-[#027DF7] dark:group-hover/item:text-[#38BDF8] transition-colors tracking-tight">
                        <AnimatedCounter
                          start={language === 'fa' ? 1380 : 2000}
                          end={language === 'fa' ? 1392 : 2013}
                          language={language}
                        />
                      </span>
                      <span className="text-[10px] sm:text-[11.5px] font-bold text-[#64748B] dark:text-slate-300 mt-0.5 whitespace-nowrap">
                        {language === 'fa' ? 'شروع کار' : 'Founded'}
                      </span>
                    </div>
                  </div>

                  {/* 3. کارکنان */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left group/item cursor-pointer">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0284C7] to-[#004E8C] flex items-center justify-center text-white shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start rtl:sm:items-start ltr:sm:items-start leading-none">
                      <span className="text-sm sm:text-base md:text-lg font-black text-[#01427C] dark:text-white group-hover/item:text-[#027DF7] dark:group-hover/item:text-[#38BDF8] transition-colors tracking-tight">
                        <AnimatedCounter end={280} prefix="+" language={language} />
                      </span>
                      <span className="text-[10px] sm:text-[11.5px] font-bold text-[#64748B] dark:text-slate-300 mt-0.5 whitespace-nowrap">
                        {language === 'fa' ? 'کارکنان' : 'Team'}
                      </span>
                    </div>
                  </div>

                  {/* 4. موفقیت */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left group/item cursor-pointer">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center text-white shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start rtl:sm:items-start ltr:sm:items-start leading-none">
                      <span className="text-sm sm:text-base md:text-lg font-black text-[#10B981] dark:text-[#34D399] tracking-tight">
                        <AnimatedCounter
                          end={98.4}
                          suffix={language === 'fa' ? '٪' : '%'}
                          decimals={1}
                          language={language}
                        />
                      </span>
                      <span className="text-[10px] sm:text-[11.5px] font-bold text-[#64748B] dark:text-slate-300 mt-0.5 whitespace-nowrap">
                        {language === 'fa' ? 'موفقیت' : 'Success'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator - Positioned naturally at bottom */}
      <div className="w-full flex flex-col items-center justify-center gap-1 pb-2 sm:pb-3 pointer-events-none z-10 shrink-0">
        <a href="#stats" className="pointer-events-auto flex flex-col items-center gap-1 group">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-1.5 border-[#01427C]/35 dark:border-white/40 flex justify-center pt-1 bg-white/50 dark:bg-white/10 backdrop-blur-xs shadow-2xs group-hover:border-[#027DF7]"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-[#027DF7]"
            />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.35, 0.9, 0.35], y: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#01427C]/60 dark:text-white/60 group-hover:text-[#027DF7]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
