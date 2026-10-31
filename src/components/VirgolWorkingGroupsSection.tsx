import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Megaphone,
  Rocket,
  Briefcase,
  Code,
  Scale,
  HeartPulse,
  Building2,
  Video,
  Leaf,
  Trophy,
  Palette,
  Coffee,
  GraduationCap,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface WorkingGroup {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradient: string;
  popular?: boolean;
}

export const VIRGOL_WORKING_GROUPS: WorkingGroup[] = [
  {
    id: 'digital-marketing',
    title: 'بازاریابی دیجیتال و سئو',
    titleEn: 'Digital Marketing & SEO',
    subtitle: 'استراتژی‌های سئو، گوگل ادز، رسانه‌های اجتماعی و جذب مشتری',
    icon: Megaphone,
    accentColor: '#EA580C',
    gradient: 'from-[#EA580C] to-[#C2410C]',
    popular: true,
  },
  {
    id: 'entrepreneurship',
    title: 'کارآفرینی و استارتاپ',
    titleEn: 'Entrepreneurship & Startup',
    subtitle: 'طراحی مدل کسب‌وکار، جذب سرمایه‌گذار و مقیاس‌پذیری محصول',
    icon: Rocket,
    accentColor: '#0284C7',
    gradient: 'from-[#0284C7] to-[#0369A1]',
    popular: true,
  },
  {
    id: 'management',
    title: 'مدیریت و رهبری کسب‌وکار',
    titleEn: 'Management & Leadership',
    subtitle: 'رهبری تیم‌های چابک، توسعه سازمانی و مهارت‌های مذاکره',
    icon: Briefcase,
    accentColor: '#01427C',
    gradient: 'from-[#01427C] to-[#027DF7]',
  },
  {
    id: 'tech-code',
    title: 'شبکه، کامپیوتر و کدنویسی',
    titleEn: 'Network & Programming',
    subtitle: 'توسعه وب فرانت‌اند و بک‌اند، زیرساخت شبکه و امنیت سایبری',
    icon: Code,
    accentColor: '#6366F1',
    gradient: 'from-[#6366F1] to-[#4F46E5]',
    popular: true,
  },
  {
    id: 'legal-contracts',
    title: 'حقوق و قراردادها',
    titleEn: 'Legal & Contracts',
    subtitle: 'قراردادنویسی حرفه‌ای استارتاپی، حقوق کار، داوری و مالکیت فکری',
    icon: Scale,
    accentColor: '#0F172A',
    gradient: 'from-[#1E3A8A] to-[#0F172A]',
  },
  {
    id: 'psychology-family',
    title: 'روانشناسی و مشاوره خانواده',
    titleEn: 'Psychology & Counseling',
    subtitle: 'مهارت‌های فردی، هوش هیجانی، سلامت روان و تحکیم خانواده',
    icon: HeartPulse,
    accentColor: '#EC4899',
    gradient: 'from-[#EC4899] to-[#BE185D]',
  },
  {
    id: 'architecture-civil',
    title: 'معماری و عمران',
    titleEn: 'Architecture & Civil',
    subtitle: 'مدلسازی BIM، طراحی داخلی پایدار و نظارت مهندسی نوین',
    icon: Building2,
    accentColor: '#0D9488',
    gradient: 'from-[#0D9488] to-[#0F766E]',
  },
  {
    id: 'media-video',
    title: 'صدا و تصویر (مدیا و تولید محتوا)',
    titleEn: 'Audio & Video Media',
    subtitle: 'تصویربرداری، تدوین ویدیویی، پادکست و سناریونویسی تبلیغاتی',
    icon: Video,
    accentColor: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
    popular: true,
  },
  {
    id: 'natural-health',
    title: 'طب طبیعی و سبک زندگی سالم',
    titleEn: 'Natural Medicine & Lifestyle',
    subtitle: 'تغذیه سلامت، گیاه‌درمانی علمی و اصلاح سبک زیست شهری',
    icon: Leaf,
    accentColor: '#16A34A',
    gradient: 'from-[#16A34A] to-[#15803D]',
  },
  {
    id: 'sports-fitness',
    title: 'تربیت بدنی و علوم ورزشی',
    titleEn: 'Sports Science & Fitness',
    subtitle: 'تناسب اندام علمی، آناتومی تمرینی و ارگونومی محیط کار',
    icon: Trophy,
    accentColor: '#EAB308',
    gradient: 'from-[#EAB308] to-[#CA8A04]',
  },
  {
    id: 'art-design',
    title: 'هنر و طراحی گرافیک',
    titleEn: 'Art & Visual Design',
    subtitle: 'طراحی هویت بصری، UI/UX، تصویرسازی و نرم‌افزارهای دیزاین',
    icon: Palette,
    accentColor: '#F43F5E',
    gradient: 'from-[#F43F5E] to-[#E11D48]',
  },
  {
    id: 'coffee-barista',
    title: 'تخصصی قهوه و باریستا',
    titleEn: 'Specialty Coffee & Barista',
    subtitle: 'سنسوری و طعم‌شناسی، عصاره‌گیری قهوه تخصصی و مدیریت کافه',
    icon: Coffee,
    accentColor: '#78350F',
    gradient: 'from-[#92400E] to-[#78350F]',
  },
];

interface VirgolWorkingGroupsSectionProps {
  onGoToConsultation?: () => void;
}

export const VirgolWorkingGroupsSection: React.FC<VirgolWorkingGroupsSectionProps> = ({ onGoToConsultation }) => {
  const { isRtl, language } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id="virgol-groups"
      className="relative py-20 md:py-28 bg-white dark:bg-[#07101E] overflow-hidden border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Subtle Accent Gradients */}
      <div className={`absolute top-1/3 ${isRtl ? 'left-10' : 'right-10'} w-96 h-96 rounded-full bg-[#0284C7]/8 dark:bg-[#0284C7]/15 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] dark:bg-[#0284C7]/20 border border-[#0284C7]/30 dark:border-[#0284C7]/50 text-[#0284C7] dark:text-[#38BDF8] text-xs font-bold mb-4 shadow-2xs"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'مرکز آموزش، پژوهش و مهارت‌آموزی' : 'Virgol Academy'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] dark:text-white leading-tight mb-5"
          >
            {language === 'fa' ? '۱۲ کارگروه تخصصی آکادمی ویرگول' : '12 Specialized Working Groups'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1] leading-relaxed font-normal"
          >
            {language === 'fa'
              ? 'بستر اتصال نخبگان دانشگاهی و علاقه‌مندان به بازار کار و صنعت؛ برگزاری دوره‌های مهارتی، کارگاه‌های عملی و اعطای گواهینامه‌های معتبر.'
              : 'Connecting academia and enthusiastic professionals to industry through skill development, workshops, and certified learning paths.'}
          </motion.p>
        </div>

        {/* 12 Interactive Cards: 2 cols on Mobile, 3-4 on Tablet, 4-6 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4">
          {VIRGOL_WORKING_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            const isSelected = selectedGroup === group.id;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                onClick={() => setSelectedGroup(isSelected ? null : group.id)}
                className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white dark:bg-[#0B1728] border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-xl dark:shadow-black/60 -translate-y-1'
                    : 'border-slate-200 dark:border-slate-800/90 hover:border-[#0284C7]/50 shadow-xs hover:shadow-md dark:hover:shadow-black/50 hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {group.popular && (
                  <span className="absolute top-2 left-2 rtl:left-2 rtl:right-auto ltr:right-2 ltr:left-auto text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] dark:bg-[#0284C7]/20 dark:text-[#38BDF8] border border-[#0284C7]/25">
                    {language === 'fa' ? 'پرمخاطب' : 'Popular'}
                  </span>
                )}

                <div>
                  {/* Icon Container with subtle gradient */}
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-xs mb-2.5 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${group.accentColor}, #01427C)`,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#01427C] dark:text-white mb-1 group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                    {language === 'fa' ? group.title : group.titleEn}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {group.subtitle}
                  </p>
                </div>

                {/* Footer Micro-CTA */}
                <div className="mt-2.5 pt-2 sm:mt-4 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#0284C7] dark:text-[#38BDF8]">
                  <span>{language === 'fa' ? 'سرفصل‌ها' : 'Learn More'}</span>
                  <ArrowIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with Virgol Portal Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#01427C] via-[#0284C7] to-[#01427C] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-[#0284C7]/20"
        >
          <div className="flex items-center gap-4 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-1">
                {language === 'fa' ? 'آکادمی و پلتفرم آموزشی ویرگول (virgol.ac)' : 'Virgol Educational Academy'}
              </h4>
              <p className="text-xs sm:text-sm text-[#D5ECFE]/90">
                {language === 'fa'
                  ? 'برگزاری همایش‌ها، صدور گواهینامه معتبر، و ثبت‌نام در دوره‌های مهارتی کارگروه‌ها.'
                  : 'Workshops, certified programs, and professional group registration.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://virgol.ac"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-[#01427C] font-bold text-xs sm:text-sm hover:bg-[#D5ECFE] transition-colors shadow-md flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#0284C7]" />
              <span>{language === 'fa' ? 'ورود به پرتال ویرگول' : 'Visit Virgol.ac'}</span>
            </a>
            <button
              type="button"
              onClick={onGoToConsultation}
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/30 transition-colors"
            >
              {language === 'fa' ? 'مشاوره آموزشی' : 'Consultation'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
