import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Users,
  Leaf,
  Rocket,
  CheckCircle2,
  Target,
  Globe2,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ValueItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ORGANIZATIONAL_VALUES: ValueItem[] = [
  {
    id: 'val-1',
    title: 'نوآوری مستمر و تفکر خلاق',
    titleEn: 'Continuous Innovation',
    description: 'خلق راهکارهای نوآورانه در سرمایه‌گذاری، طراحی فناوری‌های نوین و تفکر پویای خارج از چارچوب‌های سنتی.',
    descriptionEn: 'Innovative solutions in investment, new technology design and dynamic thinking beyond traditional frameworks.',
    icon: Sparkles,
    accentColor: '#027DF7',
  },
  {
    id: 'val-2',
    title: 'تعهد به کیفیت و استانداردسازی جهانی',
    titleEn: 'Global Standards & Quality',
    description: 'پایبندی خدشه‌ناپذیر به استانداردهای بین‌المللی با اخذ ۸ نشان رسمی ISO و رعایت چارچوب‌های IFC و BRC.',
    descriptionEn: 'Uncompromising adherence to international standards, with 8 official ISO certifications and IFC and BRC frameworks.',
    icon: ShieldCheck,
    accentColor: '#01427C',
  },
  {
    id: 'val-3',
    title: 'توسعه سرمایه انسانی و شایسته‌سالاری',
    titleEn: 'Human Capital Development',
    description: 'حضور حداکثری جوانان متخصص و دانشگاهی در کنار اساتید و صنعتگران باتجربه در فضایی شایسته‌سالار.',
    descriptionEn: 'Young specialists and graduates working alongside experienced professors and industry leaders in a merit-based culture.',
    icon: Users,
    accentColor: '#0284C7',
  },
  {
    id: 'val-4',
    title: 'حفظ سلامت جامعه و محیط زیست',
    titleEn: 'Public Health & Sustainability',
    description: 'ترویج سبک زندگی سالم، اصلاح تغذیه، تولید محصولات طبیعی ارگانیک و تعهد به حفاظت از محیط زیست.',
    descriptionEn: 'Promoting healthy lifestyles and nutrition, producing natural organic products and protecting the environment.',
    icon: Leaf,
    accentColor: '#16A34A',
  },
  {
    id: 'val-5',
    title: 'کارآفرینی پایدار و اشتغال‌زایی',
    titleEn: 'Sustainable Entrepreneurship',
    description: 'تسهیل راه‌اندازی استارتاپ‌ها، ایجاد اشتغال مولد و پیوند دادن نخبگان دانشگاهی به پروژه‌های صنعتی.',
    descriptionEn: 'Helping startups launch, creating productive jobs and connecting academic talent with industrial projects.',
    icon: Rocket,
    accentColor: '#EA580C',
  },
  {
    id: 'val-6',
    title: 'شفافیت، صداقت و رفتار اخلاقی',
    titleEn: 'Ethics & Transparency',
    description: 'حکمرانی شفاف، رعایت اخلاق حرفه‌ای در معاملات و ارتباط صادقانه با سهامداران، مشتریان و شرکای تجاری.',
    descriptionEn: 'Transparent governance, professional ethics in every deal and honest relations with shareholders, clients and partners.',
    icon: CheckCircle2,
    accentColor: '#0D9488',
  },
  {
    id: 'val-7',
    title: 'مشتری‌مداری و ایجاد ارزش مشترک',
    titleEn: 'Client Focus & Shared Value',
    description: 'درک عمیق نیازهای ذی‌نفعان و تمرکز بر ایجاد سود دوجانبه پایدار در تمامی قراردادها و همکاری‌ها.',
    descriptionEn: 'Deep understanding of stakeholder needs and a focus on lasting mutual value in every contract and partnership.',
    icon: Target,
    accentColor: '#6366F1',
  },
  {
    id: 'val-8',
    title: 'ارتقای فرهنگ و مسئولیت اجتماعی',
    titleEn: 'Social Responsibility',
    description: 'مشارکت فعالانه در پیشرفت علمی، پژوهشی و فرهنگی جامعه از طریق همایش‌ها و کارگاه‌های آکادمی ویرگول.',
    descriptionEn: 'Active contribution to the scientific, research and cultural growth of society through Virgol Academy events and workshops.',
    icon: Globe2,
    accentColor: '#8B5CF6',
  },
];

export const OrganizationalValuesSection: React.FC = () => {
  const { language, isRtl } = useLanguage();

  return (
    <section
      id="values"
      className="relative py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#060D17] overflow-hidden border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Soft Glow */}
      <div className={`absolute top-1/2 ${isRtl ? 'right-0' : 'left-0'} -translate-y-1/2 w-96 h-96 rounded-full bg-[#027DF7]/8 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 border border-[#027DF7]/30 dark:border-[#027DF7]/50 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4 shadow-2xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'اصول راهبردی و فرهنگ سازمانی' : 'Corporate Principles'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] dark:text-white leading-tight mb-5"
          >
            {language === 'fa' ? 'ارزش‌ها و اصول راهبردی هلدینگ ایلیا' : 'Strategic Values of Ilya Holding'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1] leading-relaxed font-normal"
          >
            {language === 'fa'
              ? 'باورهای بنیادین و معیارهای اخلاقی که مسیر حرکت ما را در خلق ارزش اقتصادی پایدار، مسئولیت اجتماعی و رضایت ذی‌نفعان هدایت می‌کنند.'
              : 'Core values and ethical standards steering our path in creating sustainable economic value, social responsibility, and stakeholder trust.'}
          </motion.p>
        </div>

        {/* 8 Glassmorphic Value Cards Grid: 2 cols on Mobile/Tablet, 4 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {ORGANIZATIONAL_VALUES.map((val, idx) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-white/85 dark:bg-[#071325]/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-[#01427C]/5 dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#027DF7]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md mb-2.5 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${val.accentColor}, #01427C)`,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#01427C] dark:text-white mb-1 sm:mb-2 leading-snug group-hover:text-[#027DF7] dark:group-hover:text-[#38BDF8] transition-colors">
                    {language === 'fa' ? val.title : val.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-[11.5px] sm:text-xs md:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                    {language === 'fa' ? val.description : val.descriptionEn}
                  </p>
                </div>

                <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11.5px] sm:text-[11px] font-bold text-[#64748B] dark:text-slate-400">
                  <span>{language === 'fa' ? `اصل ۰${idx + 1}` : `Principle 0${idx + 1}`}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: val.accentColor }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
