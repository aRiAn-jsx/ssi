import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="about" className="relative py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#060D17] border-t border-b border-[#027DF7]/20 dark:border-[#027DF7]/35 overflow-hidden transition-colors duration-300">
      {/* Background Soft Sky Accent Glow */}
      <div className={`absolute top-1/2 ${isRtl ? '-right-40' : '-left-40'} w-[500px] h-[500px] rounded-full bg-[#D5ECFE]/50 dark:bg-[#027DF7]/10 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-7 flex flex-col items-start ${isRtl ? 'text-right' : 'text-left'}`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 dark:bg-[#027DF7]/20 border border-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4">
              <span>{t.about.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] dark:text-white leading-tight mb-6">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-300 leading-relaxed mb-6 font-normal">
              {t.about.desc1}
            </p>

            <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-300 leading-relaxed mb-8 font-normal">
              {t.about.desc2}
            </p>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {t.about.values.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-[#071325]/80 border border-[#E2E8F0] dark:border-[#027DF7]/30 shadow-sm flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#027DF7]/10 dark:bg-[#027DF7]/25 flex items-center justify-center text-[#027DF7] dark:text-[#38BDF8] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#01427C] dark:text-[#E0F2FE] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#subsidiaries"
              id="about-learn-more-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass-card hover:bg-[#D5ECFE]/40 text-[#01427C] dark:text-[#E0F2FE] font-semibold text-sm transition-all duration-300 hover:scale-102 border border-[#027DF7]/30 dark:border-[#027DF7]/50"
            >
              <span>{t.about.ctaNetwork}</span>
              <ArrowIcon className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
            </a>
          </motion.div>

          {/* Image in Glass Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Intense Blue Glow Behind Image */}
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#027DF7]/30 via-[#D5ECFE]/50 to-transparent blur-3xl -z-10" />

            <div className="relative w-full max-w-lg rounded-[28px] p-2.5 liquid-glass-card shadow-2xl">
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] sm:aspect-[4/4.5] group">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt={t.about.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#027DF7]/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01427C]/80 via-transparent to-transparent" />

                <div className={`absolute bottom-5 ${isRtl ? 'right-5 text-right' : 'left-5 text-left'} right-5 left-5 text-white`}>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/25 backdrop-blur-md inline-block mb-2">
                    {t.about.badgeOffice}
                  </span>
                  <p className="text-sm font-medium text-white/90">
                    {t.about.badgeOfficeDesc}
                  </p>
                </div>
              </div>

              {/* Floating Mini-Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className={`absolute -top-6 ${isRtl ? '-left-6 sm:-left-8' : '-right-6 sm:-right-8'}`}
              >
                <GlassCard className="p-3.5 shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#027DF7] to-[#01427C] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[12px] text-[#64748B] block font-bold">{t.about.cardAuditLabel}</span>
                      <span className="text-xs font-extrabold text-[#01427C]">{t.about.cardAuditValue}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Mini-Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className={`absolute -bottom-6 ${isRtl ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'}`}
              >
                <GlassCard className="p-3.5 shadow-xl max-w-[210px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[12px] text-[#64748B] block font-bold">{t.about.cardGrowthLabel}</span>
                      <span className="text-xs font-extrabold text-[#01427C]">{t.about.cardGrowthValue}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
