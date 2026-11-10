import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Megaphone,
  Globe2,
  Scale,
  GraduationCap,
  Leaf,
  ArrowUpLeft,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Layers,
  PhoneCall,
  Search,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface DepartmentItem {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  category: 'marketing' | 'investment' | 'legal' | 'education' | 'health';
  description: string;
  services: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradient: string;
  glowColor: string;
  website?: string;
  websiteLabel?: string;
  image: string;
  alt: string;
}

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'hodhod',
    name: 'آژانس دیجیتال مارکتینگ و فناوری هدهد',
    shortName: 'آژانس هدهد',
    badge: 'دیجیتال مارکتینگ و سئو',
    category: 'marketing',
    description:
      'بازوی تخصصی تحول دیجیتال و رشد آنلاین کسب‌وکارها با بهره‌گیری از متدهای مدرن سئو، طراحی زیرساخت وب و کمپین‌های چندرسانه‌ای خلاق.',
    services: [
      'سئو تکنیکال و محتوایی (SEO)',
      'طراحی و کد نویسی سایت اختصاصی',
      'تولید محتوا متنی و ویدیویی باکیفیت',
      'کمپین‌های تبلیغاتی ۳۶۰ درجه چندکاناله',
    ],
    icon: Megaphone,
    accentColor: '#EA580C',
    gradient: 'from-[#EA580C] to-[#C2410C]',
    glowColor: 'rgba(234, 88, 12, 0.25)',
    website: 'https://hodhodagency.com',
    websiteLabel: 'hodhodagency.com',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    alt: 'آژانس دیجیتال مارکتینگ هدهد و خدمات سئو تکنیکال',
  },
  {
    id: 'investment-trade',
    name: 'دپارتمان سرمایه گذاری و تجارت بین‌الملل',
    shortName: 'تجارت بین‌الملل',
    badge: 'سرمایه‌گذاری، صادرات و واردات',
    category: 'investment',
    description:
      'مدیریت راهبردی جریان سرمایه و تسهیل فرایندهای بازرگانی فرامرزی؛ پلی امن میان فعالان اقتصادی داخلی و بازارهای پرپتانسیل آسیایی و اروپایی.',
    services: [
      'جذب سرمایه و مدیریت سبد سرمایه گذاری',
      'مشاوره تجاری و استراتژی بازرگانی',
      'صادرات و واردات کالا به مقاصد اروپایی و آسیایی',
      'امکان‌سنجی پروژه‌ها و طرح‌های توجیهی',
    ],
    icon: Globe2,
    accentColor: '#027DF7',
    gradient: 'from-[#027DF7] to-[#01427C]',
    glowColor: 'rgba(2, 125, 247, 0.28)',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    alt: 'دپارتمان سرمایه گذاری و بازرگانی بین‌المللی هلدینگ ایلیا',
  },
  {
    id: 'adl-aram',
    name: 'دپارتمان حقوقی، مهاجرت و مشاوره تخصصی (عدل آرام دانا)',
    shortName: 'عدل آرام دانا',
    badge: 'امور حقوقی، خانواده و مهاجرت قانونی',
    category: 'legal',
    description:
      'حفاظت همه‌جانبه از منافع اشخاص حقیقی و حقوقی با حضور تیم وکلای پایه یک و کارشناسان ارشد حقوقی، مهاجرت و روانشناسی خانواده.',
    services: [
      'تنظیم قراردادهای تجاری و داوری مالی',
      'مشاوره تخصصی دعاوی حقوقی و کیفری',
      'مشاوره تخصصی خانواده و روانشناسی',
      'خدمات امور مهاجرت و اخذ اقامت قانونی',
    ],
    icon: Scale,
    accentColor: '#1E3A8A',
    gradient: 'from-[#1E3A8A] to-[#0F172A]',
    glowColor: 'rgba(30, 58, 138, 0.25)',
    website: 'https://adlaramdana.ir',
    websiteLabel: 'adlaramdana.ir',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    alt: 'موسسه حقوقی عدل آرام دانا و خدمات امور مهاجرت قانونی',
  },
  {
    id: 'virgol',
    name: 'مرکز آموزش، پژوهش و مهارت‌آموزی (آکادمی ویرگول)',
    shortName: 'آکادمی ویرگول',
    badge: 'آموزش و اتصال دانشگاه به صنعت',
    category: 'education',
    description:
      'مرکز پیشرو ارتقای مهارت‌های فردی و سازمانی؛ تسهیل‌کننده ورود نخبگان دانشگاهی و جوانان مستعد به پروژه‌های اجرایی صنعت و کسب‌وکار.',
    services: [
      'برگزاری همایش‌ها و سمینارهای تخصصی کشوری',
      'کارگاه‌های مهارتی کاربردی و پروژه محور',
      'بستر اتصال نخبگان دانشگاهی به بازار کار و صنعت',
      'ارائه مدارک معتبر آموزشی و پژوهشی',
    ],
    icon: GraduationCap,
    accentColor: '#0284C7',
    gradient: 'from-[#0284C7] to-[#0369A1]',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    website: 'https://virgool.ac',
    websiteLabel: 'virgool.ac',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    alt: 'آکادمی ویرگول پلتفرم آموزش و پژوهش تخصصی مهارت‌های کسب و کار',
  },
  {
    id: 'bhasa',
    name: 'دپارتمان سلامت، اصلاح سبک زندگی و طب طبیعی (بهاسا)',
    shortName: 'سلامت بهاسا',
    badge: 'سلامت طبیعی و طب سنتی علمی',
    category: 'health',
    description:
      'توسعه پایدار سلامت عمومی با استانداردسازی فرآورده‌های طبیعی، مکمل‌های گیاهی و مشاوره‌های جامع اصلاح سبک زندگی مبتنی بر شواهد علمی.',
    services: [
      'تولید و عرضه محصولات طبیعی (گیاهی، حیوانی، معدنی)',
      'مشاوره اصلاح سبک زندگی با رویکرد طب سنتی و مکمل',
      'استانداردسازی و فرآوری فرآورده‌ها با پشتوانه علمی',
      'پایش مستمر شاخص‌های سلامت خانواده‌ها',
    ],
    icon: Leaf,
    accentColor: '#16A34A',
    gradient: 'from-[#16A34A] to-[#15803D]',
    glowColor: 'rgba(22, 163, 74, 0.25)',
    website: 'https://bhasa.ir',
    websiteLabel: 'bhasa.ir',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    alt: 'دپارتمان سلامت بهاسا طب سنتی علمی و محصولات طبیعی سلامت محور',
  },
];

interface DepartmentsSectionProps {
  onGoToConsultation?: () => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({ onGoToConsultation }) => {
  const { isRtl, language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const filtered = activeCategory === 'all'
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.category === activeCategory);

  const categories = [
    { id: 'all', label: language === 'fa' ? 'تمام دپارتمان‌ها (۵ بازو)' : 'All Departments' },
    { id: 'marketing', label: language === 'fa' ? 'مارکتینگ و سئو' : 'Marketing & SEO' },
    { id: 'investment', label: language === 'fa' ? 'سرمایه‌گذاری و تجارت' : 'Trade & Investment' },
    { id: 'legal', label: language === 'fa' ? 'حقوقی و مهاجرت' : 'Legal & Immigration' },
    { id: 'education', label: language === 'fa' ? 'آموزش و پژوهش' : 'Education' },
    { id: 'health', label: language === 'fa' ? 'سلامت و طب طبیعی' : 'Healthcare' },
  ];

  return (
    <section
      id="departments"
      className="relative py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#060D17] overflow-hidden border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Anchor for backward compatibility with #services navigation links */}
      <div id="services" className="absolute -top-24 pointer-events-none" />
      {/* Background Subtle Accent Gradients */}
      <div className={`absolute top-1/4 ${isRtl ? '-right-48' : '-left-48'} w-[550px] h-[550px] rounded-full bg-[#027DF7]/8 dark:bg-[#027DF7]/15 blur-3xl pointer-events-none -z-10`} />
      <div className={`absolute bottom-1/4 ${isRtl ? '-left-48' : '-right-48'} w-[550px] h-[550px] rounded-full bg-[#38BDF8]/10 dark:bg-[#38BDF8]/10 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 border border-[#027DF7]/30 dark:border-[#027DF7]/50 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
            <span>{t.services.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] dark:text-white leading-tight mb-5"
          >
            {t.services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1] leading-relaxed font-normal"
          >
            {t.services.subtitle}
          </motion.p>

          {/* Interactive Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#01427C] to-[#027DF7] text-white shadow-md shadow-[#027DF7]/30 scale-103'
                      : 'bg-white dark:bg-[#071325] text-[#64748B] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#027DF7]/40 hover:text-[#01427C] dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Bento Grid Layout: 5 Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((dept, index) => {
              const Icon = dept.icon;
              // Bento span logic:
              // Mobile: 1 col
              // Tablet (md): First card (Hodhod) is md:col-span-2, others md:col-span-1
              // Desktop (lg): Top 2 cards are lg:col-span-6, bottom 3 are lg:col-span-4 (or balanced)
              const isFirst = index === 0;
              const tabletSpan = isFirst ? 'md:col-span-2' : 'md:col-span-1';
              const desktopSpan = activeCategory === 'all'
                ? index < 2
                  ? 'lg:col-span-6'
                  : 'lg:col-span-4'
                : 'lg:col-span-6';

              return (
                <motion.div
                  key={dept.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`col-span-1 ${tabletSpan} ${desktopSpan} flex h-full`}
                  onMouseEnter={() => setHoveredCard(dept.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="relative w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 bg-white/90 dark:bg-[#071325]/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-[#01427C]/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 h-full"
                    style={{
                      boxShadow: hoveredCard === dept.id ? `0 20px 45px ${dept.glowColor}` : undefined,
                      borderColor: hoveredCard === dept.id ? dept.accentColor : undefined,
                    }}
                  >
                    {/* Subtle Top Glow Gradient Bar */}
                    <div
                      className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundImage: `linear-gradient(to right, transparent, ${dept.accentColor}, transparent)`,
                      }}
                    />

                    {/* Ambient Glow inside card */}
                    <div
                      className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ backgroundColor: dept.accentColor }}
                    />

                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${dept.accentColor}, #01427C)`,
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full border"
                          style={{
                            backgroundColor: `${dept.accentColor}15`,
                            color: dept.accentColor,
                            borderColor: `${dept.accentColor}35`,
                          }}
                        >
                          {dept.badge}
                        </span>
                      </div>

                      {/* Title (H3) */}
                      <h3 className="text-xl sm:text-2xl font-black text-[#01427C] dark:text-white leading-snug mb-3 group-hover:text-[#027DF7] dark:group-hover:text-[#38BDF8] transition-colors">
                        {dept.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#64748B] dark:text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                        {dept.description}
                      </p>

                      {/* Core Services List (Glass Pills) */}
                      <div className="space-y-2.5 mb-6">
                        <span className="text-xs font-bold text-[#01427C] dark:text-slate-200 block mb-2">
                          {language === 'fa' ? 'محورهای اصلی خدمات:' : 'Key Services:'}
                        </span>
                        {dept.services.map((srv, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-xs text-[#0F172A] dark:text-slate-200 font-medium"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: dept.accentColor }}
                            />
                            <span className="leading-snug">{srv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row: Website / Action CTA */}
                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                      {dept.website ? (
                        <a
                          href={dept.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] dark:text-slate-300 hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-colors group/link"
                        >
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:rotate-12 transition-transform" />
                          <span dir="ltr">{dept.websiteLabel}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-[#94A3B8] font-medium">
                          {language === 'fa' ? 'دفتر مشهد و همکاران بین‌المللی' : 'Global & Local'}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={onGoToConsultation}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#01427C] dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-[#027DF7] hover:text-white dark:hover:bg-[#027DF7] transition-all duration-300 cursor-pointer shadow-2xs group/btn"
                      >
                        <span>{language === 'fa' ? 'مشاوره این دپارتمان' : 'Consult'}</span>
                        <ArrowIcon className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
