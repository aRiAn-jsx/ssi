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
import { Globe, SARAMAD_GLOBE_CONFIG } from './ui/globe';
import { useLanguage } from '../context/LanguageContext';
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
  const holdingInfo = getHoldingInfo(language);
  const headingWords = t.hero.titleWords;
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Parallax subtle vertical movement on scroll
  const { scrollY } = useScroll();
  const globeParallaxY = useTransform(scrollY, [0, 600], [0, -70]);

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 flex flex-col justify-center overflow-hidden"
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
        } w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[680px] xl:w-[740px] xl:h-[740px] pointer-events-auto z-0 select-none`}
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
          className="absolute inset-0 rounded-full bg-radial from-[#027DF7]/25 via-[#D5ECFE]/35 to-transparent blur-2xl md:blur-3xl pointer-events-none -z-10"
        />

        {/* The 3D WebGL Globe canvas */}
        <Globe
          className="w-full h-full"
          config={SARAMAD_GLOBE_CONFIG}
          speed={0.013}
        />

        {/* Soft Light Overlay over Globe for 100% Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#F7FAFC]/35 to-[#F7FAFC]/80 pointer-events-none" />
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
        } w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#D5ECFE]/40 blur-3xl pointer-events-none -z-10`}
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
        } w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-[#027DF7]/10 blur-3xl pointer-events-none -z-10`}
      />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* HERO FOREGROUND CONTENT (Kept 100% Intact with high contrast z-index)     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 pointer-events-none">
        {/* Text Column (Right side in RTL) */}
        <div
          className={`lg:col-span-7 flex flex-col items-start ${
            isRtl ? 'text-right' : 'text-left'
          } pointer-events-auto`}
        >
          {/* Eyebrow Tag - Minimalist Iconographic Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-[#E2E8F0] shadow-2xs backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#027DF7] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#027DF7]" />
            </span>
            <span className="text-xs font-bold text-[#01427C]">
              {t.hero.eyebrow}
            </span>
            <div
              className={`flex items-center gap-1 text-[13px] font-semibold text-[#027DF7] ${
                isRtl ? 'border-r pr-2' : 'border-l pl-2'
              } border-[#E2E8F0]`}
            >
              <BadgeCheck className="w-3.5 h-3.5 text-[#027DF7]" />
              <span>{language === 'fa' ? 'سهامی عام' : 'PJSC'}</span>
            </div>
          </motion.div>

          {/* H1 Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-[#01427C] leading-[1.22] tracking-tight mb-6 flex flex-wrap gap-x-3 gap-y-1 drop-shadow-2xs">
            <span className="sr-only">{holdingInfo.name}: </span>
            {headingWords.map((word, index) => (
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
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            className="text-lg md:text-xl text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              id="hero-primary-cta"
              onClick={onGoToConsultation}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white font-semibold text-base shadow-lg shadow-[#027DF7]/25 hover:shadow-xl hover:shadow-[#027DF7]/40 transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>

            {onGoToArticles ? (
              <button
                type="button"
                id="hero-secondary-cta"
                onClick={onGoToArticles}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full liquid-glass-card hover:bg-white text-[#01427C] font-semibold text-base transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 border border-white/80 shadow-xs cursor-pointer group"
              >
                <Layers className="w-4 h-4 text-[#027DF7] group-hover:rotate-6 transition-transform" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            ) : (
              <a
                href="#services"
                id="hero-secondary-cta"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full liquid-glass-card hover:bg-white text-[#01427C] font-semibold text-base transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 border border-white/80 shadow-xs group"
              >
                <Layers className="w-4 h-4 text-[#027DF7] group-hover:rotate-6 transition-transform" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            )}
          </motion.div>

          {/* Bottom Micro Badges - Minimalist Graphic Indicators replacing verbose sentences */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-8 pt-5 border-t border-[#E2E8F0]/70 flex flex-wrap items-center gap-2.5 sm:gap-3.5"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-[#E2E8F0]/80 shadow-2xs text-[#01427C] hover:border-[#027DF7]/30 transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#027DF7] shrink-0" />
              <span className="font-bold text-[13px]">{language === 'fa' ? 'نظارت سازمان بورس (SEO)' : 'SEO Regulated'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-[#E2E8F0]/80 shadow-2xs text-[#01427C] hover:border-[#10B981]/30 transition-colors">
              <TrendingUp className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="font-bold text-[13px]">{language === 'fa' ? 'آلفای پایدار (+۳۴٪)' : 'Sustained Alpha (+34%)'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-[#E2E8F0]/80 shadow-2xs text-[#01427C] hover:border-[#027DF7]/30 transition-colors">
              <Globe2 className="w-4 h-4 text-[#027DF7] shrink-0" />
              <span className="font-bold text-[13px]">{language === 'fa' ? 'هاب‌های منطقه‌ای' : 'Global Hubs'}</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Hero Visual Graphic & Glass Stats HUD (Left side in RTL) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center pointer-events-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] flex items-center justify-center select-none"
          >
            {/* Pure Hero Image - Original 1024x1024 1:1 Aspect Ratio with zero background */}
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
                alt={holdingInfo.name}
                width={1024}
                height={1024}
                className="w-full h-full object-contain select-none pointer-events-none"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          {/* EXACTLY BELOW HERO IMAGE (Overlapping by 20px): Ultra-Sleek Liquid Glass Stat Dock */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="statistics-numbers-container w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[480px] -mt-5 relative z-20 px-2 sm:px-0"
          >
            <div className="relative rounded-2xl sm:rounded-3xl px-3 py-2.5 sm:px-4 sm:py-3 bg-white/80 backdrop-blur-2xl border border-white/90 shadow-lg shadow-[#01427C]/12 overflow-hidden group">
              {/* Shimmer Ambient Sweep */}
              <motion.div
                animate={{ x: ['-200%', '300%'] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 2.5,
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 pointer-events-none"
              />

              {/* Top Accent Subtle Glow Line */}
              <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#027DF7]/45 to-transparent" />

              {/* 4 Minimalist High-Precision Stat Columns */}
              <div className="grid grid-cols-4 items-center relative z-10 divide-x divide-[#E2E8F0]/70 rtl:divide-x-reverse">
                {/* 1. تعداد پروژه‌ها */}
                <div className="flex flex-col items-center justify-center text-center px-1 group/item">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Briefcase className="w-3 h-3 text-[#027DF7] opacity-80 group-hover/item:scale-110 transition-transform shrink-0" />
                    <div className="text-base sm:text-lg font-black text-[#01427C] tracking-tight group-hover/item:text-[#027DF7] transition-colors leading-none">
                      <AnimatedCounter end={165} prefix="+" language={language} />
                    </div>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#64748B] group-hover/item:text-[#0A2540] transition-colors whitespace-nowrap">
                    {language === 'fa' ? 'پروژه‌ها' : 'Projects'}
                  </span>
                </div>

                {/* 2. شروع کار */}
                <div className="flex flex-col items-center justify-center text-center px-1 group/item">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Calendar className="w-3 h-3 text-[#01427C] opacity-80 group-hover/item:scale-110 transition-transform shrink-0" />
                    <div className="text-base sm:text-lg font-black text-[#01427C] tracking-tight group-hover/item:text-[#027DF7] transition-colors leading-none">
                      <AnimatedCounter
                        start={language === 'fa' ? 1380 : 2000}
                        end={language === 'fa' ? 1392 : 2013}
                        language={language}
                      />
                    </div>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#64748B] group-hover/item:text-[#0A2540] transition-colors whitespace-nowrap">
                    {language === 'fa' ? 'شروع کار' : 'Founded'}
                  </span>
                </div>

                {/* 3. تعداد کارکنان */}
                <div className="flex flex-col items-center justify-center text-center px-1 group/item">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Users className="w-3 h-3 text-[#0284C7] opacity-80 group-hover/item:scale-110 transition-transform shrink-0" />
                    <div className="text-base sm:text-lg font-black text-[#01427C] tracking-tight group-hover/item:text-[#027DF7] transition-colors leading-none">
                      <AnimatedCounter end={280} prefix="+" language={language} />
                    </div>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#64748B] group-hover/item:text-[#0A2540] transition-colors whitespace-nowrap">
                    {language === 'fa' ? 'کارکنان' : 'Team'}
                  </span>
                </div>

                {/* 4. پروژه‌های موفق */}
                <div className="flex flex-col items-center justify-center text-center px-1 group/item">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Award className="w-3 h-3 text-[#10B981] opacity-80 group-hover/item:scale-110 transition-transform shrink-0" />
                    <div className="text-base sm:text-lg font-black text-[#10B981] tracking-tight leading-none">
                      <AnimatedCounter
                        end={98.4}
                        suffix={language === 'fa' ? '٪' : '%'}
                        decimals={1}
                        language={language}
                      />
                    </div>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#64748B] group-hover/item:text-[#10B981] transition-colors whitespace-nowrap">
                    {language === 'fa' ? 'موفقیت' : 'Success'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator - Pure Minimalist Graphic Animation */}
      <div className="relative mt-8 md:mt-0 md:absolute md:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10 pb-4 md:pb-0">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-1.5 border-[#01427C]/35 flex justify-center pt-1.5 bg-white/50 backdrop-blur-xs shadow-2xs"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-[#027DF7]"
          />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.35, 0.9, 0.35], y: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#01427C]/60" />
        </motion.div>
      </div>
    </section>
  );
};
