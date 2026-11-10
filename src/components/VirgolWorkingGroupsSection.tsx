import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
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
  ExternalLink,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2,
  X,
  Clock,
  Award,
  Layers,
  CalendarCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface WorkingGroup {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  characterTitle: string;
  characterTitleEn: string;
  category: 'business' | 'tech-creative' | 'lifestyle';
  categoryLabelFa: string;
  categoryLabelEn: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradient: string;
  popular?: boolean;
  badgeFa: string;
  badgeEn: string;
  durationFa: string;
  durationEn: string;
  syllabusFa: string[];
  syllabusEn: string[];
  outcomesFa: string[];
  outcomesEn: string[];
}

export const VIRGOL_WORKING_GROUPS: WorkingGroup[] = [
  {
    id: 'digital-marketing',
    number: '۰۱',
    title: 'بازاریابی دیجیتال و سئو',
    titleEn: 'Digital Marketing & SEO',
    subtitle: 'استراتژی‌های سئو پیشرفته، گوگل ادز، کمپین‌های ۳۶۰ درجه و اتومیشن فروش',
    subtitleEn: 'Advanced SEO, Google Ads, 360-degree performance marketing and marketing automation',
    characterTitle: 'کاراکتر متخصص مارکتینگ و تحلیلگر رشد داده‌محور',
    characterTitleEn: 'Digital Marketer & Growth Strategist Character',
    category: 'business',
    categoryLabelFa: 'کسب‌وکار و رشد',
    categoryLabelEn: 'Business & Growth',
    image: '/assets/vector-virgol/11.webp',
    icon: Megaphone,
    accentColor: '#EA580C',
    gradient: 'from-[#EA580C] to-[#C2410C]',
    popular: true,
    badgeFa: 'پرمخاطب‌ترین کارگروه',
    badgeEn: 'Most Popular Group',
    durationFa: '۵۰ ساعت کارگاه پروژه‌محور',
    durationEn: '50-hour hands-on workshop',
    syllabusFa: [
      'سئو تکنیکال، ساختار داده‌ای و سئو محتوایی پیشرفته',
      'راه‌اندازی و بهینه‌سازی حرفه‌ای کمپین‌های گوگل ادز (Google Ads)',
      'قیف بازاریابی، طراحی لندینگ‌پیج با نرخ تبدیل بالا',
      'مدیریت شبکه‌های اجتماعی، تدوین تقویم محتوا و تبلیغات کلیکی',
    ],
    syllabusEn: [
      'Technical SEO, Schema markup & Content Optimization',
      'Google Ads campaign launch, bidding & ROI optimization',
      'Conversion funnels and high-performing landing pages',
      'Social media strategy, editorial calendars and performance campaigns',
    ],
    outcomesFa: [
      'توانایی اجرای کمپین‌های فروش با بازدهی تضمین‌شده',
      'ارائه نمونه‌کار عملی و پورتفولیو کمپین‌های واقعی',
      'اعطای گواهینامه معتبر آکادمی ویرگول و هلدینگ سرآمد',
    ],
    outcomesEn: [
      'Execution of measurable digital campaigns with proven ROI',
      'Hands-on portfolio featuring live marketing assets',
      'Certified credential from Virgol Academy & SSI Holding',
    ],
  },
  {
    id: 'entrepreneurship',
    number: '۰۲',
    title: 'کارآفرینی و استارتاپ',
    titleEn: 'Entrepreneurship & Startup',
    subtitle: 'طراحی مدل کسب‌وکار، توسعه MVP، جذب سرمایه‌گذار خطرپذیر و مقیاس‌پذیری',
    subtitleEn: 'Business model canvas, MVP development, VC fundraising and venture scaling',
    characterTitle: 'کاراکتر بنیان‌گذار نوآور و لیدر اکوسیستم استارتاپی',
    characterTitleEn: 'Startup Founder & Venture Builder Character',
    category: 'business',
    categoryLabelFa: 'کسب‌وکار و رشد',
    categoryLabelEn: 'Business & Growth',
    image: '/assets/vector-virgol/5.webp',
    icon: Rocket,
    accentColor: '#0284C7',
    gradient: 'from-[#0284C7] to-[#0369A1]',
    popular: true,
    badgeFa: 'شتاب‌دهی و سرمایه‌گذاری',
    badgeEn: 'Venture Incubation',
    durationFa: '۴۵ ساعت منتورینگ تخصصی',
    durationEn: '45-hour specialized mentoring',
    syllabusFa: [
      'طراحی و اعتبارسنجی بوم مدل کسب‌وکار (Business Model Canvas)',
      'تدوین ارائه برای سرمایه‌گذار (Pitch Deck) و مدل مالی استارتاپ',
      'روش‌شناسی Lean Startup و طراحی محصول کمینه (MVP)',
      'استراتژی‌های ورود به بازار (Go-To-Market) و جذب مخاطبان اولیه',
    ],
    syllabusEn: [
      'Business Model Canvas design and rapid hypothesis validation',
      'Investor-ready Pitch Deck formulation and financial modeling',
      'Lean startup methodology and agile MVP execution',
      'Go-To-Market strategy and early customer acquisition loops',
    ],
    outcomesFa: [
      'آمادگی کامل جهت جذب سرمایه از صندوق‌های سرمایه‌گذاری خطرپذیر (VC)',
      'اتصال مستقیم به شبکه سرمایه‌گذاران هلدینگ سرآمد سرمایه ایلیا',
      'امکان استقرار در شتاب‌دهنده و فضای کار اشتراکی همکار',
    ],
    outcomesEn: [
      'Readiness for Angel & VC fundraising rounds',
      'Direct pitch opportunities to SSI Holding investment committee',
      'Access to incubator co-working and advisory pipelines',
    ],
  },
  {
    id: 'management',
    number: '۰۳',
    title: 'مدیریت و رهبری کسب‌وکار',
    titleEn: 'Management & Leadership',
    subtitle: 'رهبری تیم‌های چابک، مدیریت مالی و KPIها، مذاکره تجاری و توسعه سازمانی',
    subtitleEn: 'Agile leadership, corporate finance, executive KPIs and strategic negotiation',
    characterTitle: 'کاراکتر مدیر ارشد اجرایی و استراتژیست ارشد',
    characterTitleEn: 'Executive CEO & Leadership Strategist Character',
    category: 'business',
    categoryLabelFa: 'کسب‌وکار و رشد',
    categoryLabelEn: 'Business & Growth',
    image: '/assets/vector-virgol/7.webp',
    icon: Briefcase,
    accentColor: '#01427C',
    gradient: 'from-[#01427C] to-[#027DF7]',
    badgeFa: 'ویژه مدیران و کارشناسان',
    badgeEn: 'Executive Program',
    durationFa: '۴۰ ساعت کلاس اجرایی',
    durationEn: '40-hour executive masterclass',
    syllabusFa: [
      'رهبری مدرن و اصول تیم‌سازی در سازمان‌های پویا و چابک',
      'هدف‌گذاری سازمانی با متدولوژی OKR و طراحی ماتریس KPI',
      'اصول و فنون پیشرفته مذاکره تجاری و عقد تفاهم‌نامه‌ها',
      'مدیریت تعارض، هوش هیجانی مدیران و تصمیم‌گیری در بحران',
    ],
    syllabusEn: [
      'Modern leadership principles and agile organizational design',
      'Corporate OKR goal setting and KPI dashboard creation',
      'Advanced commercial negotiation and contract closing skills',
      'Crisis decision-making and executive emotional intelligence',
    ],
    outcomesFa: [
      'ارتقای مهارت‌های رهبری راهبردی و هدایت تیم‌های بزرگ',
      'تسلط بر ابزارهای نظارت و ارزیابی عملکرد کارکنان',
      'مدرک مدیریت پیشرفته با تاییدیه نهادهای آموزشی معتبر',
    ],
    outcomesEn: [
      'Strategic executive toolkit for leading high-growth teams',
      'Mastery of data-driven performance management frameworks',
      'Accredited executive leadership certificate',
    ],
  },
  {
    id: 'tech-code',
    number: '۰۴',
    title: 'شبکه، کامپیوتر و کدنویسی',
    titleEn: 'Network & Programming',
    subtitle: 'توسعه وب فرانت‌اند و بک‌اند، زیرساخت شبکه، دوآپس (DevOps) و امنیت سایبری',
    subtitleEn: 'Full-stack web engineering, modern cloud infra, DevOps pipelines and cyber security',
    characterTitle: 'کاراکتر مهندس نرم‌افزار و برنامه‌نویس فول‌استک',
    characterTitleEn: 'Software Engineer & Full-Stack Developer Character',
    category: 'tech-creative',
    categoryLabelFa: 'فناوری و مهندسی',
    categoryLabelEn: 'Tech & Engineering',
    image: '/assets/vector-virgol/6.webp',
    icon: Code,
    accentColor: '#6366F1',
    gradient: 'from-[#6366F1] to-[#4F46E5]',
    popular: true,
    badgeFa: 'ورود مستقیم به بازار کار',
    badgeEn: 'Direct Employment Pipeline',
    durationFa: '۸۰ ساعت بوت‌کمپ کاربردی',
    durationEn: '80-hour intensive bootcamp',
    syllabusFa: [
      'فرانت‌اند مدرن با React ،TypeScript و Tailwind CSS',
      'بک‌اند مقیاس‌پذیر با Node.js ،Express و دیتابیس‌های PostgreSQL/MongoDB',
      'مبانی لینوکس سرور، داکر (Docker) و مفاهیم پایه‌ای دواپس',
      'اصول کلین‌کد (Clean Code)، تست‌نویسی و استانداردهای امنیت وب',
    ],
    syllabusEn: [
      'Modern Frontend engineering with React, TypeScript & Tailwind CSS',
      'Scalable backend REST/GraphQL APIs with Node.js & relational databases',
      'Linux server management, Docker containers and CI/CD pipelines',
      'Clean architecture, unit testing and web security hardening',
    ],
    outcomesFa: [
      'پیاده‌سازی و دیپلوی چند پروژه نرم‌افزاری فول‌استک واقعی',
      'امکان استخدام و کارآموزی در پروژه‌های دیجیتال هلدینگ سرآمد',
      'پروفایل گیت‌هاب حرفه‌ای و پورتفولیو آماده مصاحبه‌های فنی',
    ],
    outcomesEn: [
      'Fully deployed full-stack production-grade applications',
      'Internship and recruitment pipeline into SSI tech ventures',
      'Polished GitHub showcase ready for senior tech interviews',
    ],
  },
  {
    id: 'legal-contracts',
    number: '۰۵',
    title: 'حقوق و قراردادها',
    titleEn: 'Legal & Contracts',
    subtitle: 'قراردادنویسی استارتاپی، حقوق کار و تأمین اجتماعی، مالکیت فکری و حل اختلاف',
    subtitleEn: 'Commercial contract drafting, corporate compliance, IP protection and arbitration',
    characterTitle: 'کاراکتر وکیل حقوقی و مشاور قراردادهای تجاری',
    characterTitleEn: 'Corporate Legal Counsel & Contract Specialist Character',
    category: 'business',
    categoryLabelFa: 'کسب‌وکار و رشد',
    categoryLabelEn: 'Business & Growth',
    image: '/assets/vector-virgol/2.webp',
    icon: Scale,
    accentColor: '#1E293B',
    gradient: 'from-[#1E3A8A] to-[#0F172A]',
    badgeFa: 'امنیت حقوقی کسب‌وکار',
    badgeEn: 'Legal Safety',
    durationFa: '۳۵ ساعت کارگاه تخصصی',
    durationEn: '35-hour practical workshop',
    syllabusFa: [
      'تنظیم قراردادهای هم‌بنیان‌گذاران (Founders Agreement) و توافق عدم افشا (NDA)',
      'قوانین حقوق کار، بیمه تأمین اجتماعی و تنظیم قرارداد پرسنلی',
      'ثبت شرکت‌ها، علائم تجاری و حفاظت از حقوق مالکیت فکری (IP)',
      'شروط حل و فصل اختلافات، داوری تجاری و کاهش ریسک‌های قضایی',
    ],
    syllabusEn: [
      'Founders agreements, vesting schedules and robust NDAs',
      'Labor law compliance, social security and employment structuring',
      'Corporate registration, trademark protection and IP licensing',
      'Dispute resolution clauses, commercial arbitration and litigation defense',
    ],
    outcomesFa: [
      'تسلط کامل بر تنظیم و بررسی حقوقی انواع قراردادهای تجاری',
      'پیشگیری از دعاوی مالیاتی، کارگری و اختلافات شرکا',
      'پکیج جامع نمونه قراردادهای استاندارد و تاییدشده وکلا',
    ],
    outcomesEn: [
      'Mastery of drafting and vetting complex business agreements',
      'Mitigation of partner disputes, tax friction, and labor risks',
      'Certified legal drafting toolkit vetted by corporate attorneys',
    ],
  },
  {
    id: 'psychology-family',
    number: '۰۶',
    title: 'روانشناسی و مشاوره خانواده',
    titleEn: 'Psychology & Family Counseling',
    subtitle: 'مهارت‌های فردی، هوش هیجانی، سلامت روان سازمانی و تحکیم بنیان خانواده',
    subtitleEn: 'Personal development, emotional intelligence, workplace wellness and family dynamics',
    characterTitle: 'کاراکتر روانشناس مهربان و مشاور تحکیم خانواده',
    characterTitleEn: 'Empathetic Psychologist & Family Counselor Character',
    category: 'lifestyle',
    categoryLabelFa: 'سبک زندگی و مهارت',
    categoryLabelEn: 'Lifestyle & Skills',
    image: '/assets/vector-virgol/10.webp',
    icon: HeartPulse,
    accentColor: '#DB2777',
    gradient: 'from-[#EC4899] to-[#BE185D]',
    badgeFa: 'توسعه فردی و سلامت روان',
    badgeEn: 'Mental Health & Wellness',
    durationFa: '۳۶ ساعت دوره مهارتی',
    durationEn: '36-hour interactive program',
    syllabusFa: [
      'تقویت هوش هیجانی (EQ) و مهارت‌های خودآگاهی و خودتنظیمی',
      'مدیریت استرس، اضطراب شغلی و پیشگیری از فرسودگی شغلی (Burnout)',
      'اصول ارتباط مؤثر زوجین و ارتقای کیفیت روابط بین‌فردی',
      'تربیت فرزند در عصر دیجیتال و اصلاح تعاملات خانوادگی',
    ],
    syllabusEn: [
      'Emotional intelligence cultivation, self-awareness and regulation',
      'Stress management, workplace anxiety mitigation and burnout recovery',
      'Couples communication frameworks and relational enhancement',
      'Mindful parenting and family wellness in the digital era',
    ],
    outcomesFa: [
      'دستیابی به تعادل روانی پایدار در زندگی شخصی و حرفه‌ای',
      'کسب مهارت‌های حل تعارض در خانواده و محیط‌های کاری',
      'دریافت گواهی شرکت در دوره از دپارتمان روانشناسی آکادمی',
    ],
    outcomesEn: [
      'Sustainable emotional resilience in personal and professional realms',
      'Constructive conflict mediation skills within households and teams',
      'Psychological competence credential issued by Virgol Academy',
    ],
  },
  {
    id: 'architecture-civil',
    number: '۰۷',
    title: 'معماری و عمران',
    titleEn: 'Architecture & Civil Engineering',
    subtitle: 'مدلسازی نوین BIM، طراحی داخلی پایدار، نقشه‌کشی و نظارت مهندسی سازه',
    subtitleEn: 'Modern BIM modeling, sustainable interior design, construction oversight and AutoCAD',
    characterTitle: 'کاراکتر مهندس معمار و ناظر ارشد سازه',
    characterTitleEn: 'Lead Architect & Civil Engineer Character',
    category: 'tech-creative',
    categoryLabelFa: 'فناوری و مهندسی',
    categoryLabelEn: 'Tech & Engineering',
    image: '/assets/vector-virgol/4.webp',
    icon: Building2,
    accentColor: '#0D9488',
    gradient: 'from-[#0D9488] to-[#0F766E]',
    badgeFa: 'پروژه‌های عمرانی واقعی',
    badgeEn: 'Real Construction Projects',
    durationFa: '۶۰ ساعت کارگاه نرم‌افزاری',
    durationEn: '60-hour software & site workshop',
    syllabusFa: [
      'مدلسازی اطلاعات ساختمان (BIM) با نرم‌افزار Autodesk Revit',
      'اصول نقشه‌کشی فاز ۱ و فاز ۲ معماری مطابق آیین‌نامه‌های ملی',
      'طراحی دکوراسیون داخلی، متریال‌شناسی و رندرینگ واقع‌گرایانه',
      'مدیریت کارگاه‌های ساختمانی، متره و برآورد و کنترل پروژه',
    ],
    syllabusEn: [
      'Building Information Modeling (BIM) with Autodesk Revit',
      'Phase 1 and 2 architectural documentation following building codes',
      'Sustainable interior design, material selection and photorealistic 3D rendering',
      'Construction site supervision, cost estimation and project scheduling',
    ],
    outcomesFa: [
      'توانایی انجام کامل پروژه‌های نقشه‌کشی و مدلسازی سه‌بعدی ساختمان',
      'تسلط بر نرم‌افزارهای استاندارد بازار معماری و عمران',
      'فرصت معرفی به پروژه‌های سرمایه‌گذاری ملکی و عمرانی هلدینگ',
    ],
    outcomesEn: [
      'End-to-end execution of architectural BIM projects',
      'Command of industry-standard architectural software suites',
      'Career networking with real-estate and development units of SSI',
    ],
  },
  {
    id: 'media-video',
    number: '۰۸',
    title: 'صدا و تصویر (مدیا و تولید محتوا)',
    titleEn: 'Audio & Video Media',
    subtitle: 'تصویربرداری سینمایی، تدوین ویدیو، پادکست، سناریونویسی و تولید محتوای سوشال',
    subtitleEn: 'Cinematography, video editing, podcast production, commercial storytelling and color grading',
    characterTitle: 'کاراکتر کارگردان، تصویربردار و تولیدکننده محتوای رسانه‌ای',
    characterTitleEn: 'Cinema Director & Content Producer Character',
    category: 'tech-creative',
    categoryLabelFa: 'فناوری و مهندسی',
    categoryLabelEn: 'Tech & Engineering',
    image: '/assets/vector-virgol/8.webp',
    icon: Video,
    accentColor: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
    popular: true,
    badgeFa: 'استودیو اختصاصی مدیا',
    badgeEn: 'Equipped Media Studio',
    durationFa: '۵۵ ساعت آموزش عملیاتی',
    durationEn: '55-hour hands-on studio training',
    syllabusFa: [
      'تکنیک‌های تصویربرداری، شناخت دوربین، لنزها و نورپردازی استودیویی',
      'تدوین ویدیو با Adobe Premiere Pro و اصول اصلاح رنگ در DaVinci Resolve',
      'ضبط، پالایش صوت و ساخت پادکست با نرم‌افزارهای صوتی حرفه‌ای',
      'سناریونویسی تبلیغاتی، ریلز اینستاگرام و یوتیوب مارکتینگ',
    ],
    syllabusEn: [
      'Cinematic camera operation, lens choices and multi-point studio lighting',
      'Advanced editing in Adobe Premiere Pro and color grading in DaVinci Resolve',
      'Studio voice recording, audio post-production and podcast distribution',
      'Commercial scripting, viral short-form video creation and YouTube workflows',
    ],
    outcomesFa: [
      'تولید تیزرهای تبلیغاتی و ویدیوهای صنعتی در محیط استودیو واقعی',
      'پورتفولیو ویدیویی قدرتمند برای جذب سفارش‌های تجاری و رسانه‌ای',
      'امکان همکاری در پروژه‌های رسانه‌ای و تبلیغاتی هلدینگ',
    ],
    outcomesEn: [
      'Production of broadcast-quality commercial videos and podcasts',
      'High-impact media showreel ready for commercial clients',
      'Direct collaboration with SSI creative and media agencies',
    ],
  },
  {
    id: 'natural-health',
    number: '۰۹',
    title: 'طب طبیعی و سبک زندگی سالم',
    titleEn: 'Natural Medicine & Healthy Lifestyle',
    subtitle: 'تغذیه سلامت‌محور، اصلاح علمی سبک زیست شهری و فرآوری گیاهان دارویی',
    subtitleEn: 'Evidence-based natural health, wellness regimens, medicinal herbs and holistic lifestyle',
    characterTitle: 'کاراکتر پزشک طب سنتی علمی و محقق طب طبیعی',
    characterTitleEn: 'Holistic Health & Medicinal Herb Specialist Character',
    category: 'lifestyle',
    categoryLabelFa: 'سبک زندگی و مهارت',
    categoryLabelEn: 'Lifestyle & Skills',
    image: '/assets/vector-virgol/3.webp',
    icon: Leaf,
    accentColor: '#16A34A',
    gradient: 'from-[#16A34A] to-[#15803D]',
    badgeFa: 'رویکرد شواهد‌محور',
    badgeEn: 'Evidence-Based Holistic',
    durationFa: '۴۰ ساعت کارگاه آموزشی',
    durationEn: '40-hour wellness workshop',
    syllabusFa: [
      'اصلاح سبک زندگی و الگوهای تغذیه ارگانیک متناسب با شرایط اقلیمی',
      'شناخت خواص درمانی، فرآوری و استانداردسازی گیاهان دارویی بومی',
      'مزاج‌شناسی علمی و پایش شاخص‌های ارتقای ایمنی بدن',
      'تدابیر پیشگیرانه سلامت، سم‌زدایی طبیعی و خواب ترمیمی',
    ],
    syllabusEn: [
      'Lifestyle optimization, natural circadian rhythm and wholesome nutrition',
      'Medicinal botanicals: safe formulation, active compounds and extraction',
      'Evidence-informed constitutional assessment and immune resilience',
      'Preventative holistic wellness, restorative sleep and natural vitality',
    ],
    outcomesFa: [
      'شناخت تخصصی فرآورده‌های طبیعی استاندارد با پشتوانه علمی',
      'توانایی مشاوره تغذیه سالم و سبک زندگی به خانواده‌ها',
      'گواهی پایان دوره از مرکز پژوهش و سلامت بهاسا',
    ],
    outcomesEn: [
      'Deep scientific understanding of standardized botanical products',
      'Skillset to advise families and organizations on holistic wellness',
      'Certificate from Bhasa Natural Health & Lifestyle Institute',
    ],
  },
  {
    id: 'sports-fitness',
    number: '۱۰',
    title: 'تربیت بدنی و علوم ورزشی',
    titleEn: 'Sports Science & Fitness Coaching',
    subtitle: 'طراحی تمرینات قدرتی، آناتومی کاربردی، ارگونومی محیط کار و تغذیه ورزشی',
    subtitleEn: 'Strength conditioning, applied anatomy, athletic nutrition and corporate ergonomics',
    characterTitle: 'کاراکتر مربی فیتنس و متخصص علوم ورزشی',
    characterTitleEn: 'Certified Fitness Coach & Sports Scientist Character',
    category: 'lifestyle',
    categoryLabelFa: 'سبک زندگی و مهارت',
    categoryLabelEn: 'Lifestyle & Skills',
    image: '/assets/vector-virgol/9.webp',
    icon: Trophy,
    accentColor: '#D97706',
    gradient: 'from-[#EAB308] to-[#CA8A04]',
    badgeFa: 'همراه با گواهی مربیگری',
    badgeEn: 'Fitness Coaching Certificate',
    durationFa: '۴۵ ساعت دوره تئوری و عملی',
    durationEn: '45-hour applied fitness lab',
    syllabusFa: [
      'اصول فیزیولوژی ورزش، آناتومی سیستم عضلانی و بیومکانیک حرکات',
      'طراحی برنامه‌های تمرین مقاومتی، بدنسازی و فیتنس تخصصی',
      'تغذیه کاربردی ورزشکاران، زمان‌بندی مصرف مواد مغذی و مکمل‌ها',
      'ارگونومی اداری، حرکات اصلاحی و پیشگیری از آسیب‌های اسکلتی',
    ],
    syllabusEn: [
      'Exercise physiology, musculoskeletal biomechanics and kinetics',
      'Periodized strength training and customized functional fitness design',
      'Sports nutrition, nutrient timing and evidence-based supplementation',
      'Workplace ergonomics, postural correction and injury prevention',
    ],
    outcomesFa: [
      'مهارت کامل در نگارش برنامه‌های تمرین و تغذیه استاندارد',
      'تسلط بر آموزش صحیح حرکات ورزشی و ایمنی تمرین',
      'گواهینامه تخصصی مربیگری تناسب اندام آکادمی ویرگول',
    ],
    outcomesEn: [
      'Capability to construct bespoke workout regimens and nutrition programs',
      'Safe coaching protocols for corrective exercise and hypertrophy',
      'Specialized fitness coaching credential from Virgol Academy',
    ],
  },
  {
    id: 'art-design',
    number: '۱۱',
    title: 'هنر و طراحی گرافیک',
    titleEn: 'Art & Visual Design',
    subtitle: 'هویت بصری برند، تایپوگرافی، طراحی رابط کاربری (UI/UX) و تصویرسازی دیجیتال',
    subtitleEn: 'Brand visual identity, typography, UI/UX in Figma and digital vector illustration',
    characterTitle: 'کاراکتر تصویرساز و دیزاینر هویت بصری',
    characterTitleEn: 'Visual Designer & Digital Illustrator Character',
    category: 'tech-creative',
    categoryLabelFa: 'فناوری و مهندسی',
    categoryLabelEn: 'Tech & Engineering',
    image: '/assets/vector-virgol/12.webp',
    icon: Palette,
    accentColor: '#E11D48',
    gradient: 'from-[#F43F5E] to-[#E11D48]',
    badgeFa: 'خلق پورتفولیو بین‌المللی',
    badgeEn: 'Design Portfolio Showcase',
    durationFa: '۵۰ ساعت کارگاه خلاقیت',
    durationEn: '50-hour creative studio lab',
    syllabusFa: [
      'طراحی لوگو، برندبوک و هویت بصری جامع شرکت‌ها در Illustrator',
      'مبانی رنگ‌شناسی، ترکیب‌بندی، چیدمان و تایپوگرافی فارسی/انگلیسی',
      'طراحی رابط کاربری وب و اپلیکیشن (UI/UX Design) در نرم‌افزار Figma',
      'تصویرسازی دیجیتال، روتوش عکس حرفه‌ای و ساخت موکاپ‌های صنعتی',
    ],
    syllabusEn: [
      'Comprehensive brand identity, logo design and brand guidelines in Illustrator',
      'Color theory, layout harmony, and bilingual Persian/English typography',
      'Web and mobile UI/UX design systems and interactive prototyping in Figma',
      'Digital illustration, high-end photo manipulation and 3D mockups',
    ],
    outcomesFa: [
      'ساخت یک پورتفولیو هنری قوی در سایت‌های بین‌المللی Dribbble و Behance',
      'تسلط حرفه‌ای بر ابزارهای ادوبی و فیگما در بالاترین سطح بازار کار',
      'فرصت همکاری مستقیم با دپارتمان بازاریابی و طراحی هلدینگ ایلیا',
    ],
    outcomesEn: [
      'Stunning Dribbble and Behance portfolio showcasing verified client projects',
      'High-proficiency mastery of Adobe Creative Cloud and Figma suites',
      'Priority consideration for creative branding commissions across SSI units',
    ],
  },
  {
    id: 'coffee-barista',
    number: '۱۲',
    title: 'تخصصی قهوه و باریستا',
    titleEn: 'Specialty Coffee & Barista',
    subtitle: 'عصاره‌گیری تخصصی، مهارت‌های لاته آرت، طعم‌شناسی (Sensory) و مدیریت کافه',
    subtitleEn: 'Espresso extraction, latte art mastery, sensory evaluation and cafe business management',
    characterTitle: 'کاراکتر باریستای حرفه‌ای و متخصص طعم‌شناسی قهوه',
    characterTitleEn: 'Master Barista & Specialty Coffee Cupper Character',
    category: 'lifestyle',
    categoryLabelFa: 'سبک زندگی و مهارت',
    categoryLabelEn: 'Lifestyle & Skills',
    image: '/assets/vector-virgol/1.webp',
    icon: Coffee,
    accentColor: '#78350F',
    gradient: 'from-[#92400E] to-[#78350F]',
    badgeFa: 'مدرک بین‌المللی باریستا',
    badgeEn: 'International Barista Badge',
    durationFa: '۳۵ ساعت کار در بار تخصصی',
    durationEn: '35-hour hands-on espresso bar training',
    syllabusFa: [
      'شناخت خاستگاه‌های دانه قهوه، فرآوری‌ها، برشته‌کاری (Roasting) و کاپینگ',
      'تنظیم دقیق آسیاب (Grind size) و عصاره‌گیری استاندارد جهانی اسپرسو',
      'تکنیک‌های فوم‌گیری شیر، کنترل دما و طراحی انواع الگوهای لاته آرت',
      'دم‌آوری‌های دستی موج سوم (V60 ،Aeropress ،Chemex) و مدیریت مالی کافه',
    ],
    syllabusEn: [
      'Coffee bean origins, processing methods, roast profiles and cupping protocols',
      'Grind calibration, extraction yield, TDS measurements and espresso perfection',
      'Milk texturing micro-foam mechanics, temperature control and advanced latte art',
      'Third-wave manual pour-overs (V60, Chemex, Aeropress) and cafe unit economics',
    ],
    outcomesFa: [
      'آمادگی کامل جهت فعالیت به عنوان سر‌باریستا در بهترین کافه‌های کشور',
      'تسلط بر کلیه بار گرم و بار سرد و تجهیزات صنعتی قهوه',
      'گواهینامه بین‌المللی پایان دوره با امکان ترجمه و مهاجرت کاری',
    ],
    outcomesEn: [
      'Job-ready skills for Head Barista roles in premium hospitality venues',
      'Operational mastery across commercial espresso machines and coffee equipment',
      'Internationally translatable barista certificate for career mobility',
    ],
  },
];

interface VirgolWorkingGroupsSectionProps {
  onGoToConsultation?: () => void;
}

type FilterId = 'all' | WorkingGroup['category'];

// Optimised character renders live in vector-virgol/opt/{n}-{height}.webp
const charSrc = (image: string, height: 360 | 720) =>
  image.replace(/\/(\d+)\.webp$/, `/opt/$1-${height}.webp`);

const toFaDigits = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const VirgolWorkingGroupsSection: React.FC<VirgolWorkingGroupsSectionProps> = ({
  onGoToConsultation,
}) => {
  const { isRtl, language } = useLanguage();
  const fa = language === 'fa';
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [selectedGroup, setSelectedGroup] = useState<WorkingGroup | null>(null);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const filteredGroups =
    activeFilter === 'all'
      ? VIRGOL_WORKING_GROUPS
      : VIRGOL_WORKING_GROUPS.filter((g) => g.category === activeFilter);

  const filterTabs: { id: FilterId; fa: string; en: string }[] = [
    { id: 'all', fa: 'همه', en: 'All' },
    { id: 'business', fa: 'کسب‌وکار', en: 'Business' },
    { id: 'tech-creative', fa: 'فناوری و خلاقیت', en: 'Tech & Creative' },
    { id: 'lifestyle', fa: 'سبک زندگی', en: 'Lifestyle' },
  ];

  // Close the modal with Escape and lock page scroll while it's open
  useEffect(() => {
    if (!selectedGroup) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedGroup(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedGroup]);

  const categoryLabel = (c: WorkingGroup['category']) =>
    ({
      business: fa ? 'کسب‌وکار' : 'Business',
      'tech-creative': fa ? 'فناوری و خلاقیت' : 'Tech & Creative',
      lifestyle: fa ? 'سبک زندگی' : 'Lifestyle',
    })[c];

  const hours = (g: WorkingGroup) =>
    fa ? `${g.durationFa.split(' ')[0]} ساعت` : `${g.durationEn.split('-')[0]} hrs`;

  return (
    <section
      id="virgol-groups"
      className="relative py-20 sm:py-28 bg-[#F7FAFC] dark:bg-[#060D17]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0284C7] dark:text-[#38BDF8] mb-3">
              <GraduationCap className="w-4 h-4" />
              {fa ? 'آکادمی ویرگول' : 'Virgol Academy'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-[#01427C] dark:text-white leading-tight">
              {fa ? '۱۲ کارگروه تخصصی' : '12 Specialized Working Groups'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] leading-8">
              {fa
                ? 'آموزش پروژه‌محور، منتورینگ و گواهی‌نامه معتبر — هر کارگروه با کاراکتر اختصاصی خودش.'
                : 'Project-based training, mentoring and accredited certificates — each group with its own character.'}
            </p>
          </div>

          {/* Filter */}
          <div
            role="tablist"
            aria-label={fa ? 'دسته‌بندی کارگروه‌ها' : 'Group categories'}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-1 px-1"
          >
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'text-white'
                      : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#01427C] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="vg-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-[#01427C] dark:bg-[#0284C7]"
                    />
                  )}
                  <span className="relative">{fa ? tab.fa : tab.en}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards — one size, character + text in a single row */}
        <motion.div
          key={activeFilter}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-9 pt-5"
        >
          {filteredGroups.map((group) => {
            const Icon = group.icon;
            const number = fa ? group.number : group.number.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
            return (
              <motion.button
                key={group.id}
                type="button"
                variants={cardVariants}
                onClick={() => setSelectedGroup(group)}
                className="vg-card group text-start cursor-pointer"
                style={{ '--accent': group.accentColor } as React.CSSProperties}
                aria-label={fa ? group.title : group.titleEn}
              >
                {/* clipped background: glow circle + big faded number */}
                <span className="vg-card-bg" aria-hidden="true">
                  <span className="vg-spot" />
                  <span className="vg-watermark">{number}</span>
                </span>

                <span className="vg-figure">
                  <img
                    src={charSrc(group.image, 360)}
                    alt={fa ? group.characterTitle : group.characterTitleEn}
                    loading="lazy"
                    decoding="async"
                    width={120}
                    height={180}
                    className="vg-character"
                  />
                </span>

                <span className="vg-body">
                  <span className="flex items-center gap-2">
                    <span className="vg-icon">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] truncate">
                      {categoryLabel(group.category)}
                    </span>
                  </span>

                  <h3 className="text-[15px] sm:text-base font-black text-[#01427C] dark:text-white leading-snug line-clamp-2">
                    {fa ? group.title : group.titleEn}
                  </h3>

                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                      <Clock className="w-3.5 h-3.5" />
                      {hours(group)}
                    </span>
                    <span className="vg-go">
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Academy link row */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#01427C]/10 dark:border-[rgba(255,255,255,0.08)]">
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] text-center sm:text-start">
            {fa
              ? 'دوره‌ها، سمینارها و ثبت‌نام همه کارگروه‌ها در پرتال آکادمی ویرگول'
              : 'Courses, seminars and enrolment for every group on the Virgol Academy portal'}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://virgool.ac"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#01427C] dark:bg-[#0284C7] text-white text-sm font-bold flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4" />
              virgool.ac
            </a>
            <button
              type="button"
              onClick={onGoToConsultation}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-[#01427C] dark:text-[#E0F2FE] border border-[#01427C]/20 dark:border-[rgba(255,255,255,0.15)] hover:border-[#027DF7] dark:hover:border-[#38BDF8] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              {fa ? 'مشاوره آموزشی' : 'Consultation'}
            </button>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedGroup && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-[#030A14]/75"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="vg-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#081324] rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col md:flex-row text-start"
              style={{ '--accent': selectedGroup.accentColor } as React.CSSProperties}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <button
                type="button"
                onClick={() => setSelectedGroup(null)}
                className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-[#F1F5F9] dark:bg-[#0F1E36] text-[#334155] dark:text-[#E2E8F0] flex items-center justify-center transition-colors hover:bg-[#E0F2FE] dark:hover:bg-[#13294A] cursor-pointer"
                aria-label={fa ? 'بستن' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Character */}
              <div className="vg-modal-stage w-full md:w-5/12 p-6 sm:p-8 flex flex-col items-center justify-end shrink-0 relative overflow-hidden">
                <span className="vg-spot" aria-hidden="true" />
                <img
                  src={charSrc(selectedGroup.image, 720)}
                  alt={fa ? selectedGroup.characterTitle : selectedGroup.characterTitleEn}
                  className="relative w-full max-h-72 md:max-h-96 object-contain object-bottom select-none drop-shadow-xl"
                />
                <p className="relative mt-4 text-xs sm:text-sm font-bold text-center text-[#334155] dark:text-[#CBD5E1]">
                  {fa ? selectedGroup.characterTitle : selectedGroup.characterTitleEn}
                </p>
              </div>

              {/* Info */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="vg-icon">
                      <selectedGroup.icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">
                      {fa ? `کارگروه ${selectedGroup.number}` : `Group ${selectedGroup.number}`} ·{' '}
                      {fa ? selectedGroup.durationFa : selectedGroup.durationEn}
                    </span>
                  </div>

                  <h3 id="vg-modal-title" className="text-xl sm:text-2xl font-black text-[#01427C] dark:text-white leading-tight mb-2">
                    {fa ? selectedGroup.title : selectedGroup.titleEn}
                  </h3>
                  <p className="text-sm text-[#64748B] dark:text-[#CBD5E1] leading-7 mb-6">
                    {fa ? selectedGroup.subtitle : selectedGroup.subtitleEn}
                  </p>

                  <h4 className="text-sm font-extrabold text-[#01427C] dark:text-white mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                    {fa ? 'سرفصل‌ها' : 'Syllabus'}
                  </h4>
                  <ol className="space-y-2 mb-6">
                    {(fa ? selectedGroup.syllabusFa : selectedGroup.syllabusEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#334155] dark:text-[#E2E8F0] leading-7">
                        <span className="vg-step">{fa ? toFaDigits(idx + 1) : idx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>

                  <h4 className="text-sm font-extrabold text-[#01427C] dark:text-white mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#16A34A]" />
                    {fa ? 'دستاوردها' : 'Outcomes'}
                  </h4>
                  <ul className="space-y-1.5 mb-6">
                    {(fa ? selectedGroup.outcomesFa : selectedGroup.outcomesEn).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#64748B] dark:text-[#CBD5E1] leading-7">
                        <CheckCircle2 className="w-4 h-4 mt-1.5 text-[#16A34A] shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGroup(null);
                      onGoToConsultation?.();
                    }}
                    className="w-full sm:flex-1 py-3 px-5 rounded-full text-white font-extrabold text-sm bg-[#01427C] dark:bg-[#0284C7] transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    {fa ? 'مشاوره و ثبت‌نام' : 'Enroll & Consult'}
                  </button>
                  <a
                    href="https://virgool.ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-5 rounded-full text-[#01427C] dark:text-[#E0F2FE] border border-[#01427C]/20 dark:border-[rgba(255,255,255,0.15)] font-bold text-sm transition-colors hover:border-[#027DF7] flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    virgool.ac
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
