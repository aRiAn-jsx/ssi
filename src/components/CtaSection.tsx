import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, Sparkles, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { getHoldingInfo } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onGoToConsultation?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onGoToConsultation }) => {
  const { language, isRtl, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const holdingInfo = getHoldingInfo(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-gradient-to-br from-[#01427C] via-[#01427C] to-[#027DF7] overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')`,
        }}
        aria-hidden="true"
      />

      {/* Animated Light Beams Behind Card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20"
        >
          <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,#027DF7_60deg,transparent_120deg,#D5ECFE_180deg,transparent_240deg,#027DF7_300deg,transparent_360deg)] blur-2xl" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="liquid-glass-card bg-white/95 dark:bg-[#071325]/95 text-[#0A2540] dark:text-[#F8FAFC] p-8 sm:p-12 md:p-16 rounded-[32px] shadow-2xl text-center relative border border-[#027DF7]/30 dark:border-[#027DF7]/55">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE] dark:bg-[#027DF7]/20 border border-[#027DF7]/30 dark:border-[#027DF7]/50 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4">
              <Sparkles className="w-4 h-4 text-[#027DF7]" />
              <span>{t.cta.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-4">
              {t.cta.title}
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-8">
              {t.cta.subtitle}
            </p>

            {/* Interactive Callback Form */}
            {!formSubmitted ? (
              <div className="space-y-4 mb-8">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-full bg-[#F7FAFC] border border-[#E2E8F0] shadow-inner">
                    <input
                      type="tel"
                      id="contact-phone-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.cta.phonePlaceholder}
                      required
                      className={`w-full px-5 py-3 rounded-full text-xs sm:text-sm text-[#0A2540] bg-transparent outline-none font-medium ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#027DF7]/30 hover:shadow-lg transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 animate-pulse hover:animate-none"
                    >
                      <span>{t.cta.requestCall}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {onGoToConsultation && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={onGoToConsultation}
                      id="full-consultation-page-btn"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#027DF7] hover:text-[#01427C] hover:underline"
                    >
                      <span>{t.cta.bookMeetingLink}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#01427C] text-sm font-bold max-w-md mx-auto mb-8 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>{t.cta.successMsg}</span>
              </motion.div>
            )}

            {/* Quick Contact Links */}
            <div className="pt-8 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#64748B]">
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-[#027DF7]" />
                <a
                  href={`tel:${holdingInfo.phone}`}
                  dir="ltr"
                  className="font-bold text-[#01427C] hover:text-[#027DF7] transition-colors"
                >
                  {holdingInfo.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-[#027DF7]" />
                <a
                  href={`mailto:${holdingInfo.email}`}
                  className="font-semibold text-[#01427C] hover:text-[#027DF7] transition-colors"
                >
                  {holdingInfo.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#027DF7] shrink-0" />
                <span>{holdingInfo.address}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
