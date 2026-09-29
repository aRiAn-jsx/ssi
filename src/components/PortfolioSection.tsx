import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ArrowUpLeft,
  ArrowUpRight,
  Clock,
  Award,
  BarChart3,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PortfolioSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const handleCtaClick = () => {
    const ctaSection = document.querySelector('#cta') || document.querySelector('#contact');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reasonIcons = [
    { icon: TrendingUp, color: 'text-[#027DF7]', bg: 'bg-[#D5ECFE]/80' },
    { icon: Clock, color: 'text-[#01427C]', bg: 'bg-[#D5ECFE]/80' },
    { icon: ShieldCheck, color: 'text-[#027DF7]', bg: 'bg-[#D5ECFE]/80' },
    { icon: BarChart3, color: 'text-[#01427C]', bg: 'bg-[#D5ECFE]/80' },
  ];

  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-32 bg-[#F8FAFC] overflow-hidden border-t border-b border-[#E2E8F0]/70"
    >
      {/* Background Soft Atmospheric Ambient Orbs */}
      <div
        className={`absolute top-1/4 ${
          isRtl ? '-right-32' : '-left-32'
        } w-[480px] h-[480px] rounded-full bg-[#D5ECFE]/45 blur-3xl pointer-events-none -z-10`}
      />
      <div
        className={`absolute bottom-10 ${
          isRtl ? '-left-32' : '-right-32'
        } w-[420px] h-[420px] rounded-full bg-[#027DF7]/10 blur-3xl pointer-events-none -z-10`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Main 2-Column Responsive Showcase Layout (Faithful to the Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================================= */}
          {/* LEFT / FIRST CARD: Department Hero, Modern Visual & Metric Badges */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div className={`space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              {/* Eyebrow Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D5ECFE] border border-[#027DF7]/25 text-[#01427C] text-xs font-extrabold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#027DF7]" />
                <span>{t.portfolio.eyebrow}</span>
              </div>

              {/* Bold Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] leading-tight tracking-tight">
                {t.portfolio.title}
              </h2>

              {/* Descriptive Subtitle */}
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl font-normal">
                {t.portfolio.subtitle}
              </p>
            </div>

            {/* Visual Media Card with Overlapping Metric Badge & Social Proof (As Mockup) */}
            <div className="relative pt-4 pb-2">
              <div className="relative rounded-3xl bg-gradient-to-b from-[#E9F3FE] to-[#D5ECFE]/70 p-4 sm:p-6 overflow-hidden border border-[#D5ECFE] shadow-sm">
                {/* Character / Analyst Portrait Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                    alt="Wealth Management Analyst"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01427C]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Solid Electric Blue Metric Card (Matching +650 Badge in Image) */}
                <div
                  className={`absolute bottom-16 sm:bottom-20 ${
                    isRtl ? 'left-6 sm:left-10' : 'right-6 sm:right-10'
                  } bg-[#027DF7] text-white p-4 sm:p-5 rounded-2xl shadow-xl shadow-[#027DF7]/35 border border-white/20 z-10 max-w-[200px] sm:max-w-[230px] transform hover:scale-103 transition-transform duration-300`}
                >
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                    {t.portfolio.metricBadgeValue}
                  </div>
                  <p className="text-xs font-bold text-white/95 leading-snug">
                    {t.portfolio.metricBadgeLabel}
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1.5 text-[13px] font-extrabold text-[#D5ECFE]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#D5ECFE]" />
                    <span>{t.portfolio.metricBadgeGrowth}</span>
                  </div>
                </div>

                {/* Social Proof Avatars & Trust Label (Matching avatars in image) */}
                <div className="mt-5 pt-4 border-t border-[#027DF7]/15 flex flex-wrap items-center gap-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Investor Avatar 1"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Investor Avatar 2"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Investor Avatar 3"
                    />
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#01427C] text-white text-xs font-black ring-2 ring-white">
                      {t.portfolio.socialProofCount}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#01427C] flex-1">
                    {t.portfolio.socialProofLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT / SECOND CARD: High-Impact Blue Action Banner & 4 Key Reasons */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* 1. Deep Royal Blue Banner (Matching Right Card in Mockup) */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#027DF7] via-[#0158A8] to-[#01427C] p-6 sm:p-8 text-white shadow-xl shadow-[#027DF7]/25 overflow-hidden border border-white/20">
              {/* Subtle background graphic */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D5ECFE]/20 rounded-full blur-xl pointer-events-none -ml-16 -mb-16" />

              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                  <Award className="w-3.5 h-3.5 text-[#D5ECFE]" />
                  <span>{t.portfolio.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                  {t.portfolio.blueCardTitle}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  {t.portfolio.blueCardSubtitle}
                </p>

                {/* Feature / Benefits Pills Row (As in Mockup) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 flex items-center gap-2 border border-white/20 text-xs font-bold text-white">
                    <UserCheck className="w-4 h-4 text-[#D5ECFE] shrink-0" />
                    <span className="line-clamp-1">{t.portfolio.pill1}</span>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 flex items-center gap-2 border border-white/20 text-xs font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#D5ECFE] shrink-0" />
                    <span className="line-clamp-1">{t.portfolio.pill2}</span>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 flex items-center gap-2 border border-white/20 text-xs font-bold text-white">
                    <Sparkles className="w-4 h-4 text-[#D5ECFE] shrink-0" />
                    <span className="line-clamp-1">{t.portfolio.pill3}</span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCtaClick}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#01427C] hover:bg-[#D5ECFE] text-xs sm:text-sm font-black transition-all duration-300 shadow-md hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>{t.portfolio.blueCardCta}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Key Competitive Advantages List (Matching lower section in Mockup) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
              <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#01427C]">
                  {t.portfolio.whyChooseTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {t.portfolio.whyChooseSubtitle}
                </p>
              </div>

              {/* 4 Stacked Reasons with Circular Visual Badges */}
              <div className="space-y-4 pt-1">
                {t.portfolio.reasons.map((reason, idx) => {
                  const iconConfig = reasonIcons[idx % reasonIcons.length];
                  const IconComp = iconConfig.icon;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl bg-[#F8FAFC] hover:bg-[#F0F7FF] border border-[#E2E8F0]/80 hover:border-[#027DF7]/30 transition-all duration-200 flex items-start gap-4 ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    >
                      {/* Circular Blue Icon Badge (As seen in image) */}
                      <div
                        className={`w-11 h-11 rounded-2xl ${iconConfig.bg} ${iconConfig.color} flex items-center justify-center shrink-0 shadow-xs border border-[#027DF7]/15 mt-0.5`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-extrabold text-[#01427C]">
                          {reason.title}
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guarantee Footer */}
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                <div className="flex items-center gap-1.5 font-bold text-[#01427C]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>تأییدیه رسمی حسابرسی و بورس اوراق بهادار</span>
                </div>
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="font-bold text-[#027DF7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>درخواست تماس</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
