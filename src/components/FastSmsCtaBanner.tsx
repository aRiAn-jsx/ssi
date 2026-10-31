import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall,
  MessageSquare,
  Sparkles,
  ArrowUpLeft,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FastSmsCtaBanner: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const [copied, setCopied] = useState(false);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const handleCopySms = () => {
    navigator.clipboard.writeText('777');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-12 md:py-16 bg-[#F8FAFC] dark:bg-[#060D17] transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#01427C] via-[#013564] to-[#027DF7] text-white shadow-2xl shadow-[#01427C]/30 overflow-hidden border border-[#38BDF8]/40"
        >
          {/* Animated Background Mesh & Beams */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#027DF7]/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#38BDF8]/30 blur-3xl pointer-events-none" />

          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Column (7 cols) - Centered on mobile */}
            <div className={`lg:col-span-7 flex flex-col items-center lg:items-start text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-[#D5ECFE] text-xs font-bold mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{language === 'fa' ? 'مشاوره فوری و سامانه پیامکی' : 'Fast Hotline & SMS'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 text-center lg:text-right rtl:lg:text-right ltr:lg:text-left">
                {language === 'fa'
                  ? 'مسیر رشد کسب و کار و سرمایه گذاری شما از اینجا آغاز می‌شود'
                  : 'Your Growth & Investment Journey Begins Here'}
              </h2>

              <p className="text-sm sm:text-base text-[#D5ECFE]/90 leading-relaxed max-w-xl mb-6 font-normal text-center lg:text-right rtl:lg:text-right ltr:lg:text-left">
                {language === 'fa'
                  ? 'جهت دریافت مشاوره رایگان یا شروع همکاری تجاری، با کارشناسان هلدینگ ایلیا در تماس باشید. یا عدد ۷۷۷ را به شماره ۰۹۳۵۹۳۵۶۶۶۸ پیامک فرمایید.'
                  : 'Contact Ilya Holding specialists for free consultation or partnership. Or SMS 777 to 09359356668 for an immediate callback.'}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#D5ECFE]/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#38BDF8]" />
                  <span>{language === 'fa' ? 'پاسخگویی سریع' : 'Fast Response'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                  <span>{language === 'fa' ? 'مشاوره محرمانه و اختصاصی' : 'Confidential Advisory'}</span>
                </div>
              </div>
            </div>

            {/* Actions Card (5 cols) - Full Width on Mobile */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
              {/* Action 1: Call Directly */}
              <a
                href="tel:05137622222"
                id="fast-call-cta"
                className="w-full min-h-[48px] flex items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-white text-[#01427C] hover:bg-[#D5ECFE] transition-all duration-300 shadow-lg hover:scale-101 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#027DF7] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[11px] sm:text-xs font-bold text-[#64748B] block">
                      {language === 'fa' ? 'تماس تلفنی با دفتر مرکزی' : 'Direct Call'}
                    </span>
                    <span dir="ltr" className="text-base sm:text-xl font-black text-[#01427C] inline-block font-mono text-left">
                      051-37622222
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#027DF7] group-hover:bg-[#027DF7] group-hover:text-white transition-colors shrink-0">
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </a>

              {/* Action 2: Send SMS 777 */}
              <a
                href="sms:09359356668?body=777"
                id="fast-sms-cta"
                className="w-full min-h-[48px] flex items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/25 backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-101 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[11px] sm:text-xs font-bold text-[#D5ECFE] block">
                      {language === 'fa' ? 'سامانه پیامکی فوری (ارسال عدد ۷۷۷)' : 'SMS Code 777'}
                    </span>
                    <span dir="ltr" className="text-sm sm:text-lg font-black text-white inline-block font-mono text-left">
                      09359356668
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopySms();
                  }}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold flex items-center gap-1 text-white cursor-pointer transition-colors shrink-0"
                  title="کپی کد ۷۷۷"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{language === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'fa' ? 'کد ۷۷۷' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
