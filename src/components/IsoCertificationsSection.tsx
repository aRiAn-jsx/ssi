import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Lock,
  GraduationCap,
  Smile,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface IsoCertification {
  code: string;
  year: string;
  title: string;
  titleEn: string;
  category: string;
  scope: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ISO_CERTIFICATIONS: IsoCertification[] = [
  {
    code: 'ISO 9001',
    year: '2015',
    title: 'سیستم‌های مدیریت کیفیت',
    titleEn: 'Quality Management Systems (QMS)',
    category: 'کیفیت و فرآیندها',
    scope: 'تضمین انطباق فرآیندهای هلدینگ و شرکت‌های تابعه با بالاترین استانداردهای تضمین کیفیت.',
    icon: Award,
    accentColor: '#027DF7',
  },
  {
    code: 'ISO 14001',
    year: '2015',
    title: 'سیستم‌های مدیریت زیست‌محیطی',
    titleEn: 'Environmental Management Systems (EMS)',
    category: 'محیط زیست و پایداری',
    scope: 'کاهش اثرات زیست‌محیطی و پایبندی به تولید سبز و مصرف بهینه منابع در زنجیره تأمین.',
    icon: ShieldCheck,
    accentColor: '#16A34A',
  },
  {
    code: 'ISO 45001',
    year: '2018',
    title: 'سیستم‌های مدیریت ایمنی و بهداشت شغلی',
    titleEn: 'Occupational Health & Safety (OH&S)',
    category: 'ایمنی و سرمایه انسانی',
    scope: 'صیانت کامل از سلامت جسمی و روانی کارکنان و ارتقای استانداردهای ارگونومی و محیط کار.',
    icon: FileCheck2,
    accentColor: '#EA580C',
  },
  {
    code: 'ISO 10002',
    year: '2018',
    title: 'مدیریت کیفیت و رسیدگی به شکایات مشتریان',
    titleEn: 'Customer Complaints Handling',
    category: 'مشتری‌مداری',
    scope: 'فرآیند نظام‌مند دریافت، ارزیابی، پیگیری سریع و شفاف شکایات و بازخوردهای مخاطبان.',
    icon: MessageSquare,
    accentColor: '#0284C7',
  },
  {
    code: 'ISO 10004',
    year: '2018',
    title: 'پایش و اندازه‌گیری رضایت مشتریان',
    titleEn: 'Customer Satisfaction Monitoring',
    category: 'رضایت مشتریان',
    scope: 'سنجش منظم و داده‌محور سطح رضایتمندی مشتریان از خدمات دپارتمان‌های ۵گانه هلدینگ.',
    icon: Smile,
    accentColor: '#0D9488',
  },
  {
    code: 'ISO/IEC 27001',
    year: '2022',
    title: 'امنیت اطلاعات و امنیت سایبری',
    titleEn: 'Information Security Management (ISMS)',
    category: 'امنیت اطلاعات',
    scope: 'صیانت حداکثری از داده‌های محرمانه مشتریان، اسناد شرکتی و زیرساخت‌های سرور و نرم‌افزار.',
    icon: Lock,
    accentColor: '#01427C',
  },
  {
    code: 'ISO 21001',
    year: '2018',
    title: 'سیستم‌های مدیریت سازمان‌های آموزشی و پژوهشی',
    titleEn: 'Educational Organizations Management (EOMS)',
    category: 'آموزش و پژوهش',
    scope: 'استانداردسازی آموزش‌های آکادمی ویرگول و تطابق سیلابس‌های مهارتی با استانداردهای جهانی.',
    icon: GraduationCap,
    accentColor: '#8B5CF6',
  },
  {
    code: 'ISO/IEC 24752-8',
    year: '2018',
    title: 'فناوری اطلاعات و رابط‌های کاربری جامع',
    titleEn: 'Information Technology & User Interfaces',
    category: 'فناوری اطلاعات و UI/UX',
    scope: 'بهینه‌سازی تجربه کاربری (UX) و دسترسی‌پذیری پلتفرم‌های دیجیتال هلدینگ برای عموم کاربران.',
    icon: Globe2,
    accentColor: '#027DF7',
  },
];

export const IsoCertificationsSection: React.FC = () => {
  const { language, isRtl } = useLanguage();

  return (
    <section
      id="certifications"
      className="relative py-20 md:py-28 bg-[#0B1528] text-white overflow-hidden border-t border-b border-[#027DF7]/30 transition-colors duration-300"
    >
      {/* Background Subtle Mesh Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#027DF7]/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#38BDF8]/10 blur-[140px] pointer-events-none -z-10" />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold mb-4 shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'استانداردهای بین‌المللی و گواهینامه‌ها' : 'Global Standards & ISO'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5"
          >
            {language === 'fa'
              ? 'گواهینامه‌های بین‌المللی و انطباق جهانی هلدینگ ایلیا'
              : 'International Certifications & Global Compliance'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-normal"
          >
            {language === 'fa'
              ? 'تعهد بنیادین هلدینگ سرآمد سرمایه ایلیا به انطباق با پروتکل‌های شرکت مالی بین‌المللی (IFC)، کنسرسیوم خرده‌فروشی بریتانیا (BRC) و کسب ۸ نشان رسمی ISO.'
              : 'Our steadfast commitment to IFC corporate governance, BRC global standards, and 8 accredited ISO certifications.'}
          </motion.p>

          {/* IFC & BRC Compliance Badges Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 p-3 sm:px-6 sm:py-3 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
              <span>{language === 'fa' ? 'تبعیت از استانداردهای IFC' : 'IFC Global Protocols'}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
              <span>{language === 'fa' ? 'انطباق با چارچوب‌های BRC' : 'BRC Global Standards'}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F59E0B]">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'fa' ? '۸ گواهینامه معتبر ISO' : '8 ISO Certifications'}</span>
            </div>
          </motion.div>
        </div>

        {/* 8 ISO Certification Cards Grid: 1 col on Mobile, 2 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {ISO_CERTIFICATIONS.map((cert, idx) => {
            const Icon = cert.icon;

            return (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/15 hover:border-[#38BDF8]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                {/* Specular Top Edge Glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent rounded-t-2xl sm:rounded-t-3xl" />

                <div>
                  {/* Top: Code & Year with Strict LTR Alignment */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span
                      dir="ltr"
                      className="font-mono text-xs sm:text-sm font-extrabold text-[#38BDF8] tracking-wider text-left inline-block"
                    >
                      {cert.code}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-left inline-block"
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#027DF7]/20 border border-[#027DF7]/40 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                        {language === 'fa' ? cert.title : cert.titleEn}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#D5ECFE]/70 block mt-0.5">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Scope */}
                  <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed font-normal mt-2 sm:mt-3">
                    {cert.scope}
                  </p>
                </div>

                {/* Bottom Verification Seal */}
                <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-[#38BDF8] font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{language === 'fa' ? 'دارای تاییدیه معتبر' : 'Verified'}</span>
                  </div>
                  <span dir="ltr" className="text-white/50 text-[10px] font-mono">SSI Holding</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
