import { ServiceItem, PortfolioItem, SubsidiaryNode, StatItem, NewsItem, ChartDataPoint } from '../types';
import { Language } from '../utils/translations';

export interface HoldingInfo {
  name: string;
  nameFa: string;
  nameEn: string;
  shortName: string;
  domain: string;
  parentCompany: string;
  license: string;
  tagline: string;
  subTagline: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  phoneIntl: string;
  workingHours: string;
}

export const HOLDING_INFO_FA: HoldingInfo = {
  name: 'هلدینگ سرآمد سرمایه ایلیا',
  nameFa: 'هلدینگ سرآمد سرمایه ایلیا',
  nameEn: 'Ilya Saramad Capital Holding',
  shortName: 'سرآمد',
  domain: 'ssiholding.co',
  parentCompany: 'شرکت بیمه سامان (سهامی خاص)',
  license: 'تحت نظارت سازمان بورس و اوراق بهادار تهران',
  tagline: 'آینده را با اطمینان می‌سازیم',
  subTagline: 'مدیریت دارایی‌های پیشرو، سرمایه‌گذاری جسورانه و هم‌افزایی ارزش‌آفرین در بستر شفافیت و فناوری مالی',
  address: 'مشهد، بلوار سجاد، بزرگمهر شمالی ۲، پلاک ۴۴، طبقه ۳',
  city: 'مشهد',
  email: 'info@ssiholding.co',
  phone: '05137622222',
  phoneFormatted: '۰۵۱-۳۷۶۲۲۲۲۲',
  phoneIntl: '+98 51 3762 2222',
  workingHours: 'شنبه تا پنج‌شنبه: ۸:۰۰ الی ۲۰:۰۰ (۸ صبح تا ۸ شب)',
};

export const HOLDING_INFO_EN: HoldingInfo = {
  name: 'Ilya Saramad Capital Holding',
  nameFa: 'هلدینگ سرآمد سرمایه ایلیا',
  nameEn: 'Ilya Saramad Capital Holding',
  shortName: 'Saramad',
  domain: 'ssiholding.co',
  parentCompany: 'Saman Insurance (Private Joint Stock)',
  license: 'Regulated by Securities and Exchange Organization of Iran (SEO)',
  tagline: 'Building The Future With Certainty',
  subTagline: 'Leading asset management, high-conviction ventures, and value synergy built upon transparency and financial technology',
  address: 'Floor 3, No. 44, Bozorgmehr Shomali 2, Sajjad Blvd, Mashhad, Iran',
  city: 'Mashhad',
  email: 'info@ssiholding.co',
  phone: '05137622222',
  phoneFormatted: '+98 51 3762 2222',
  phoneIntl: '+98 51 3762 2222',
  workingHours: 'Saturday to Thursday: 8:00 AM to 8:00 PM (20:00)',
};

export const HOLDING_INFO = HOLDING_INFO_FA;

export const getHoldingInfo = (lang: Language = 'fa'): HoldingInfo => {
  return lang === 'en' ? HOLDING_INFO_EN : HOLDING_INFO_FA;
};

export const SERVICES_DATA_FA: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'مدیریت دارایی و سبدگردانی اختصاصی',
    description: 'بهینه‌سازی مستمر سبد سرمایه‌گذاری اشخاص حقیقی و حقوقی با رویکرد مدیریت ریسک چندلایه‌ای و بازدهی پایدار.',
    iconName: 'TrendingUp',
    tag: 'بازار سرمایه',
  },
  {
    id: 'srv-2',
    title: 'سرمایه‌گذاری خطرپذیر و نوآوری مالی',
    description: 'تأمین مالی استراتژیک برای استارتاپ‌ها و شرکت‌های پیشگام در حوزه فین‌تک، هوش مصنوعی و زنجیره تأمین.',
    iconName: 'Zap',
    tag: 'فناوری و استارتاپ',
  },
  {
    id: 'srv-3',
    title: 'تأمین مالی و بانکداری سرمایه‌گذاری',
    description: 'طراحی ابزارهای نوین بدهی، انتشار صکوک و ساختاردهی عرضه‌های عمومی اولیه در بورس اوراق بهادار.',
    iconName: 'Building2',
    tag: 'بانکداری شرکتی',
  },
  {
    id: 'srv-4',
    title: 'سرمایه‌گذاری در املاک و دارایی‌های کلان',
    description: 'توسعه پروژه‌های تجاری و اداری شاخص با استانداردهای معماری نوین و بازدهی بالای جریان نقدی.',
    iconName: 'Compass',
    tag: 'دارایی‌های پایدار',
  },
  {
    id: 'srv-5',
    title: 'مشاوره ادغام و تملیک (M&A)',
    description: 'ارزیابی جامع، ارزش‌گذاری ساختاریافته و هدایت مذاکرات پیچیده انتقال مالکیت در صنایع پیشران ملی.',
    iconName: 'Briefcase',
    tag: 'استراتژی شرکتی',
  },
  {
    id: 'srv-6',
    title: 'تحقیقات و هوشمندی داده‌های بازار',
    description: 'ارائه تحلیل‌های عمیق بنیادی و اقتصاد کلان با اتکا به مدل‌های ریاضی و الگوریتم‌های پیش‌بینی بازار.',
    iconName: 'BarChart3',
    tag: 'تحلیل داده‌ها',
  },
];

export const SERVICES_DATA_EN: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Dedicated Portfolio & Wealth Management',
    description: 'Continuous optimization of investment portfolios for institutions and HNWIs with multi-tiered risk mitigation and steady returns.',
    iconName: 'TrendingUp',
    tag: 'Capital Markets',
  },
  {
    id: 'srv-2',
    title: 'Venture Capital & FinTech Acceleration',
    description: 'Strategic equity financing for pioneering startups in AI, financial technology, and InsurTech ecosystems.',
    iconName: 'Zap',
    tag: 'Tech & Ventures',
  },
  {
    id: 'srv-3',
    title: 'Corporate Financing & Investment Banking',
    description: 'Structuring innovative debt instruments, Sukuk issuance, and orchestrating Initial Public Offerings (IPOs) on the stock exchange.',
    iconName: 'Building2',
    tag: 'Corporate Banking',
  },
  {
    id: 'srv-4',
    title: 'Commercial Real Estate & Megaprojects',
    description: 'Developing iconic commercial and office headquarters with high ESG standards and robust rental yields.',
    iconName: 'Compass',
    tag: 'Sustainable Assets',
  },
  {
    id: 'srv-5',
    title: 'Mergers & Acquisitions Advisory (M&A)',
    description: 'Comprehensive due diligence, valuation modeling, and executing complex corporate ownership transitions in key industries.',
    iconName: 'Briefcase',
    tag: 'Corporate Strategy',
  },
  {
    id: 'srv-6',
    title: 'Macro Intelligence & Quantitative Research',
    description: 'Delivering econometric research, predictive algorithms, and industry valuations to empower institutional decision-making.',
    iconName: 'BarChart3',
    tag: 'Data Analytics',
  },
];

export const SERVICES_DATA = SERVICES_DATA_FA;

export const getServicesData = (lang: Language = 'fa'): ServiceItem[] => {
  return lang === 'en' ? SERVICES_DATA_EN : SERVICES_DATA_FA;
};

export const STATS_DATA_FA: StatItem[] = [
  {
    id: 'stat-1',
    label: 'ارزش بازار پرتفوی بورسی',
    value: 33441,
    suffix: ' میلیارد ریال',
    subtext: 'نسبت ارزش بازار به بهای تمام‌شده: ۲.۶۶ برابر',
  },
  {
    id: 'stat-2',
    label: 'سرمایه اسمی ثبت‌شده',
    value: 50,
    suffix: ' هزار میلیارد ریال',
    subtext: '۵۰,۰۰۰,۰۰۰ میلیون ریال سرمایه ثبتی',
  },
  {
    id: 'stat-3',
    label: 'کل بهای تمام‌شده سرمایه‌گذاری‌ها',
    value: 17563,
    suffix: ' میلیارد ریال',
    subtext: 'شامل ۲۲ شرکت غیربورسی و صنایع پیشران',
  },
  {
    id: 'stat-4',
    label: 'سهم بزرگترین صنعت پرتفوی',
    value: 30,
    suffix: '٪',
    subtext: 'بانک‌ها و مؤسسات اعتباری با بیشترین بازده نقدی',
  },
];

export const STATS_DATA_EN: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Listed Portfolio Market Value',
    value: 33441,
    suffix: ' Billion Rials',
    subtext: 'Market-to-cost multiple: 2.66x',
  },
  {
    id: 'stat-2',
    label: 'Registered Capital Base',
    value: 50,
    suffix: ' Trillion Rials',
    subtext: '50,000,000 Million Rials nominal capital',
  },
  {
    id: 'stat-3',
    label: 'Total Investment Cost',
    value: 17563,
    suffix: ' Billion Rials',
    subtext: 'Including 22 non-listed high-yield companies',
  },
  {
    id: 'stat-4',
    label: 'Core Sector Allocation',
    value: 30,
    suffix: '%',
    subtext: 'Banks & Credit Institutions with robust yield',
  },
];

export const STATS_DATA = STATS_DATA_FA;

export const getStatsData = (lang: Language = 'fa'): StatItem[] => {
  return lang === 'en' ? STATS_DATA_EN : STATS_DATA_FA;
};

export const PORTFOLIO_DATA_FA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'سبد سرمایه‌گذاری سهام بورسی و بانکی',
    category: 'بانک‌ها و بازار سرمایه',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    alt: 'نمودار رشد سهام و بانکداری',
    returnRate: '۲.۶۶ برابر',
    assetValue: '۳۳,۴۴۱ میلیارد ریال',
    description: 'تخصیص راهبردی در بانک‌ها، مؤسسات اعتباری و شرکت‌های بنیادی با بهای تمام‌شده ۱۲,۵۷۶ میلیارد ریال و ارزش روز ۳۳.۴ همت.',
  },
  {
    id: 'port-2',
    title: 'پرتفوی شرکت‌های غیربورسی و صنایع استراتژیک',
    category: 'سرمایه‌گذاری‌های مستقیم و غیربورسی',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'سرمایه‌گذاری در صنایع',
    returnRate: '+۳۸.۵٪',
    assetValue: '۴,۹۸۷ میلیارد ریال',
    description: 'سرمایه‌گذاری در ۲۲ شرکت غیربورسی ارزش‌آفرین در حوزه‌های خدمات مالی، گردشگری، هتلداری و زیرساخت‌های ملی.',
  },
  {
    id: 'port-3',
    title: 'صندوق‌های تحت مدیریت و ابزارهای درآمد ثابت',
    category: 'مدیریت صندوق و اوراق',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    alt: 'مدیریت صندوق سرمایه‌گذاری',
    returnRate: '+۲۹.۵٪',
    assetValue: '۱۵ هزار میلیارد ریال',
    description: 'مدیریت دارایی توسط سبدگردان سرآمد با مجوز سازمان بورس، تضمین نقدشوندگی و نقدینگی تحت نظارت گروه سامان.',
  },
  {
    id: 'port-4',
    title: 'اکوسیستم نوآوری، اینشورتک و فین‌تک (پلنت و ایلیا)',
    category: 'نوآوری و فناوری مالی',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
    alt: 'نوآوری در فناوری مالی',
    returnRate: 'رتبه ۱ کشور',
    assetValue: 'شتاب‌دهی برتر',
    description: 'راهبری شبکه نوآفرینی سرآمد (مرکز پلنت) به عنوان برترین شتاب‌دهنده صنعت بیمه و سرمایه‌گذاری خطرپذیر در ایلیا ونچرز.',
  },
];

export const PORTFOLIO_DATA_EN: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Listed Equities & Banking Portfolio',
    category: 'Banking & Capital Markets',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Stock chart growth and banking',
    returnRate: '2.66x Multiple',
    assetValue: '33,441 Billion Rials',
    description: 'Strategic allocation across banks and prime equities with a cost base of 12,576B Rials and market value of 33.4T Rials.',
  },
  {
    id: 'port-2',
    title: 'Non-Listed Strategic Corporate Holdings',
    category: 'Direct Investments & Private Equity',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Industrial and commercial assets',
    returnRate: '+38.5%',
    assetValue: '4,987 Billion Rials',
    description: 'Investment in 22 high-potential private companies spanning financial services, hospitality, tourism, and infrastructure.',
  },
  {
    id: 'port-3',
    title: 'Managed Mutual Funds & Fixed Income',
    category: 'Fund Management & Debt Instruments',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fund management visual',
    returnRate: '+29.5%',
    assetValue: '15,000 Billion Rials',
    description: 'Professional portfolio management via Saramad Asset Management licensed by SEO, backed by Saman Group guarantee.',
  },
  {
    id: 'port-4',
    title: 'InsurTech & FinTech Ecosystem (Plannet & Ilya)',
    category: 'Financial Innovation & VC',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
    alt: 'Financial technology concept',
    returnRate: 'Ranked #1',
    assetValue: 'National Hub',
    description: 'Spearheading Plannet Innovation Hub (ranked #1 national accelerator) and early-stage investments through Ilya Ventures.',
  },
];

export const PORTFOLIO_DATA = PORTFOLIO_DATA_FA;

export const getPortfolioData = (lang: Language = 'fa'): PortfolioItem[] => {
  return lang === 'en' ? PORTFOLIO_DATA_EN : PORTFOLIO_DATA_FA;
};

export const SUBSIDIARIES_DATA_FA: SubsidiaryNode[] = [
  {
    id: 'bhasa',
    name: 'شرکت دارویی و درمانی بهاسا',
    shortName: 'بهاسا',
    role: 'فرآورده‌های درمانی، طب سنتی علمی و داروهای گیاهی',
    category: 'درمانی و گیاهی',
    equity: 'شرکت تابعه هلدینگ SSI',
    color: '#16A34A',
    secondaryColor: '#15803D',
    badgeColor: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/80',
    website: 'https://bhasa.ir',
    websiteLabel: 'bhasa.ir',
    logoImage: '/subsidiaries/bhasa.webp',
    logoMonogram: 'بهاسا',
    logoSubtitle: 'درمان گیاهی',
    description: 'تولید، فرمولاسیون و فرآوری تخصصی داروهای گیاهی، دمنوش‌های سلامت‌محور و مکمل‌های ارگانیک درمانی با استانداردهای داروسازی نوین و دانش‌بنیان.',
    metrics: [
      { label: 'فرآورده‌های دارویی', value: '+۴۵ فرآورده' },
      { label: 'مراکز سلامت همکار', value: '+۲۱۰ مرکز' },
      { label: 'تاییدیه غذا و دارو', value: '۱۰۰٪ استاندارد' },
    ],
    highlights: ['فرمولاسیون ۱۰۰٪ طبیعی و گیاهی', 'پایش سلامت با طب سنتی علمی', 'بسته‌بندی دارویی استاندارد'],
  },
  {
    id: 'virgool',
    name: 'آکادمی و پلتفرم آموزشی ویرگول',
    shortName: 'ویرگول',
    role: 'آموزش‌های تخصصی، پکیج‌های مهارتی و توسعه شغلی',
    category: 'آموزش و پکیج‌ها',
    equity: 'شرکت تابعه هلدینگ SSI',
    color: '#0284C7',
    secondaryColor: '#0F2744',
    badgeColor: 'bg-sky-50 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-700/80',
    website: 'https://virgol.ac',
    websiteLabel: 'virgol.ac',
    logoImage: '/subsidiaries/virgool.webp',
    logoMonogram: 'ویرگول',
    logoSubtitle: 'مهارت و آموزش',
    description: 'پلتفرم جامع دوره‌های تخصصی، پکیج‌های کاربردی مهارت‌محور، توانمندسازی حرفه‌ای در حوزه فناوری و کسب‌وکار با همراهی اساتید برتر.',
    metrics: [
      { label: 'پکیج‌ها و دوره‌ها', value: '+۱۴۰ عنوان' },
      { label: 'دانش‌پذیران و فراگیران', value: '+۲۸,۰۰۰ نفر' },
      { label: 'رضایت فراگیران', value: '۹۸.۶٪' },
    ],
    highlights: ['پکیج‌های مهارت‌محور گام‌به‌گام', 'اساتید و منتورهای ارشد صنعت', 'اعطای گواهینامه معتبر'],
  },
  {
    id: 'adl-aram',
    name: 'موسسه حقوقی عدل آرام دانا',
    shortName: 'عدل آرام دانا',
    role: 'خدمات جامع حقوقی، کیفری، قراردادها و مشاوره اشخاص حقیقی و حقوقی',
    category: 'امور حقوقی و حقیقی',
    equity: 'شرکت تابعه هلدینگ SSI',
    color: '#0F2744',
    secondaryColor: '#1E3A8A',
    badgeColor: 'bg-slate-100 text-[#0F2744] dark:bg-slate-900 dark:text-blue-200 border-slate-300 dark:border-blue-900',
    website: 'https://adlaramdana.ir',
    websiteLabel: 'adlaramdana.ir',
    logoImage: '/subsidiaries/adl-aram.webp',
    logoMonogram: 'عدل آرام',
    logoSubtitle: 'حقوق و وکالت',
    description: 'ارائه راهکارهای حقوقی و وکالت تخصصی برای اشخاص حقیقی و حقوقی، تدوین قراردادهای تجاری کلان، داوری مالی و صیانت از حقوق سرمایه‌گذاران.',
    metrics: [
      { label: 'پرونده‌های موفق حقوقی', value: '+۱,۵۰۰ پرونده' },
      { label: 'وکلای پایه یک همکار', value: '+۳۰ وکیل' },
      { label: 'پوشش تضمین قرارداد', value: '۱۰۰٪ امن' },
    ],
    highlights: ['مشاوره تخصصی اشخاص حقیقی و شرکت‌ها', 'دعاوی تجاری، بانکی و ملکی', 'قراردادنویسی استراتژیک'],
  },
  {
    id: 'hodhod',
    name: 'آژانس خلاق و رسانه‌ای هدهد',
    shortName: 'هدهد',
    role: 'تولید محتوا، سناریونویسی، موشن‌گرافیک و طراحی هویت بصری',
    category: 'تولید محتوا و گرافیک',
    equity: 'شرکت تابعه هلدینگ SSI',
    color: '#EA580C',
    secondaryColor: '#18181B',
    badgeColor: 'bg-orange-50 text-orange-900 dark:bg-zinc-900 dark:text-orange-300 border-orange-300 dark:border-orange-800/80',
    website: 'https://hodhodagency.com',
    websiteLabel: 'hodhodagency.com',
    logoImage: '/subsidiaries/hodhod.webp',
    logoMonogram: 'هدهد',
    logoSubtitle: 'رسانه و گرافیک',
    description: 'استراتژی و تولید محتوا، سناریونویسی و فیلم‌نامه‌نویسی، طراحی گرافیک، موشن‌گرافیک و کمپین‌های تبلیغاتی ۳۶۰ درجه چندرسانه‌ای برای برندهای مطرح.',
    metrics: [
      { label: 'پروژه‌های محتوایی و ویدیویی', value: '+۳۸۰ پروژه' },
      { label: 'کمپین‌های رسانه‌ای', value: '+۸۵ کمپین' },
      { label: 'بازدید محتواهای برند', value: '+۱۶ میلیون' },
    ],
    highlights: ['فیلم‌نامه‌نویسی و کارگردانی خلاق', 'موشن‌گرافیک سه‌بعدی و جلوه‌های ویژه', 'طراحی هویت بصری و لوگو'],
  },
  {
    id: 'dehkadeh-tandorosti',
    name: 'مجموعه تخصصی دهکده تندرستی',
    shortName: 'دهکده تندرستی',
    role: 'تغذیه سلامت، رژیم‌های طبیعی و سبک زندگی ارگانیک',
    category: 'تغذیه سلامت',
    equity: 'شرکت تابعه هلدینگ SSI',
    color: '#0D9488',
    secondaryColor: '#059669',
    badgeColor: 'bg-teal-50 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-700/80',
    website: 'https://dehkadehtandorosti.ir',
    websiteLabel: 'dehkadehtandorosti.ir',
    logoMonogram: 'تندرستی',
    logoSubtitle: 'تغذیه سلامت',
    description: 'ترویج سبک زندگی تندرست با رژیم‌های تغذیه‌ای علمی، عرضه بسته‌های غذایی ارگانیک، مشاوره‌های تغذیه فردی و پایش مداوم شاخص‌های سلامت.',
    metrics: [
      { label: 'اعضای باشگاه تندرستی', value: '+۱۹,۰۰۰ عضو' },
      { label: 'سبد محصولات ارگانیک', value: '+۶۵ فرآورده' },
      { label: 'بهبود شاخص‌های سلامت', value: '۹۷٪ اثربخشی' },
    ],
    highlights: ['رژیم‌های تغذیه علمی و اختصاصی', 'محصولات غذایی ۱۰۰٪ طبیعی و سالم', 'پایش و مشاوره آنلاین متخصصین'],
  },
];

export const SUBSIDIARIES_DATA_EN: SubsidiaryNode[] = [
  {
    id: 'bhasa',
    name: 'Bhasa Herbal & Healthcare Co.',
    shortName: 'Bhasa',
    role: 'Therapeutic Formulations, Herbal Medicine & Health Supplements',
    category: 'Herbal & Healthcare',
    equity: 'SSI Holding Subsidiary',
    color: '#16A34A',
    secondaryColor: '#15803D',
    badgeColor: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/80',
    website: 'https://bhasa.ir',
    websiteLabel: 'bhasa.ir',
    logoImage: '/subsidiaries/bhasa.webp',
    logoMonogram: 'Bhasa',
    logoSubtitle: 'Herbal Care',
    description: 'Formulation, processing, and manufacturing of premium scientific herbal remedies, therapeutic teas, and organic wellness supplements.',
    metrics: [
      { label: 'Therapeutic Products', value: '+45 Products' },
      { label: 'Partner Healthcare Centers', value: '+210 Centers' },
      { label: 'Food & Drug Approval', value: '100% Certified' },
    ],
    highlights: ['100% Organic & Herbal Compounds', 'Evidence-Based Traditional Formulations', 'Standard Packaging'],
  },
  {
    id: 'virgool',
    name: 'Virgool Educational Academy',
    shortName: 'Virgool',
    role: 'Specialized Courses, Practical Training Packages & Career Growth',
    category: 'Education & Packages',
    equity: 'SSI Holding Subsidiary',
    color: '#0284C7',
    secondaryColor: '#0F2744',
    badgeColor: 'bg-sky-50 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-700/80',
    website: 'https://virgol.ac',
    websiteLabel: 'virgol.ac',
    logoImage: '/subsidiaries/virgool.webp',
    logoMonogram: 'Virgool',
    logoSubtitle: 'Skills & EdTech',
    description: 'Comprehensive digital learning platform delivering practical skill packages, career acceleration programs, and modern business certifications.',
    metrics: [
      { label: 'Training Packages', value: '+140 Titles' },
      { label: 'Enrolled Learners', value: '+28,000 Users' },
      { label: 'Satisfaction Rate', value: '98.6%' },
    ],
    highlights: ['Hands-On Step-by-Step Bundles', 'Industry-Leading Mentors', 'Accredited Certificates'],
  },
  {
    id: 'adl-aram',
    name: 'Adl Aram Dana Law Institute',
    shortName: 'Adl Aram Dana',
    role: 'Comprehensive Juridical, Commercial Law, Contracts & Advisory',
    category: 'Legal & Juridical',
    equity: 'SSI Holding Subsidiary',
    color: '#0F2744',
    secondaryColor: '#1E3A8A',
    badgeColor: 'bg-slate-100 text-[#0F2744] dark:bg-slate-900 dark:text-blue-200 border-slate-300 dark:border-blue-900',
    website: 'https://adlaramdana.ir',
    websiteLabel: 'adlaramdana.ir',
    logoImage: '/subsidiaries/adl-aram.webp',
    logoMonogram: 'Adl Aram',
    logoSubtitle: 'Law & Justice',
    description: 'Full-service legal advocacy and consultancy for individuals and corporate entities, multi-million dollar contracts, and commercial arbitration.',
    metrics: [
      { label: 'Successful Legal Cases', value: '+1,500 Cases' },
      { label: 'Senior Attorneys', value: '+30 Counsel' },
      { label: 'Contract Assurance', value: '100% Secure' },
    ],
    highlights: ['Civil & Corporate Advisory', 'Commercial Litigation', 'Strategic Contract Drafting'],
  },
  {
    id: 'hodhod',
    name: 'Hodhod Creative Agency',
    shortName: 'Hodhod',
    role: 'Content Production, Screenwriting, Motion Graphics & Visual Identity',
    category: 'Content & Graphic Design',
    equity: 'SSI Holding Subsidiary',
    color: '#EA580C',
    secondaryColor: '#18181B',
    badgeColor: 'bg-orange-50 text-orange-900 dark:bg-zinc-900 dark:text-orange-300 border-orange-300 dark:border-orange-800/80',
    website: 'https://hodhodagency.com',
    websiteLabel: 'hodhodagency.com',
    logoImage: '/subsidiaries/hodhod.webp',
    logoMonogram: 'Hodhod',
    logoSubtitle: 'Media & Design',
    description: 'Content strategy, scriptwriting, creative video production, 3D motion graphics, and full 360-degree digital advertising campaigns for top brands.',
    metrics: [
      { label: 'Media & Video Projects', value: '+380 Works' },
      { label: 'Successful Brand Campaigns', value: '+85 Campaigns' },
      { label: 'Brand Impressions', value: '+16 Million' },
    ],
    highlights: ['Screenwriting & Directing', '3D Motion Graphics & VFX', 'Corporate Identity'],
  },
  {
    id: 'dehkadeh-tandorosti',
    name: 'Dehkadeh Tandorosti Health Village',
    shortName: 'Dehkadeh Tandorosti',
    role: 'Healthy Nutrition, Organic Diets & Holistic Lifestyle',
    category: 'Healthy Nutrition',
    equity: 'SSI Holding Subsidiary',
    color: '#0D9488',
    secondaryColor: '#059669',
    badgeColor: 'bg-teal-50 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-700/80',
    website: 'https://dehkadehtandorosti.ir',
    websiteLabel: 'dehkadehtandorosti.ir',
    logoMonogram: 'Tandorosti',
    logoSubtitle: 'Wellness & Food',
    description: 'Promoting holistic vitality with scientific nutritional regimens, 100% natural organic food baskets, and personalized dietitian consulting.',
    metrics: [
      { label: 'Active Wellness Members', value: '+19,000 Users' },
      { label: 'Organic Food Baskets', value: '+65 Products' },
      { label: 'Vitality Improvement', value: '97% Success' },
    ],
    highlights: ['Scientific Nutrition Plans', '100% Organic Healthy Foods', 'Online Dietitian Support'],
  },
];

export const SUBSIDIARIES_DATA = SUBSIDIARIES_DATA_FA;

export const getSubsidiariesData = (lang: Language = 'fa'): SubsidiaryNode[] => {
  return lang === 'en' ? SUBSIDIARIES_DATA_EN : SUBSIDIARIES_DATA_FA;
};

export const CHART_TIMEFRAMES_FA: Record<string, ChartDataPoint[]> = {
  monthly: [
    { period: 'فروردین', portfolioValue: 72, benchmarkIndex: 65, growth: 10.7 },
    { period: 'اردیبهشت', portfolioValue: 75, benchmarkIndex: 66, growth: 13.6 },
    { period: 'خرداد', portfolioValue: 79, benchmarkIndex: 68, growth: 16.1 },
    { period: 'تیر', portfolioValue: 81, benchmarkIndex: 70, growth: 15.7 },
    { period: 'مرداد', portfolioValue: 83, benchmarkIndex: 71, growth: 16.9 },
    { period: 'شهریور', portfolioValue: 85, benchmarkIndex: 72, growth: 18.0 },
  ],
  quarterly: [
    { period: 'بهار ۱۴۰۳', portfolioValue: 64, benchmarkIndex: 58, growth: 10.3 },
    { period: 'تابستان ۱۴۰۳', portfolioValue: 71, benchmarkIndex: 62, growth: 14.5 },
    { period: 'پاییز ۱۴۰۳', portfolioValue: 78, benchmarkIndex: 67, growth: 16.4 },
    { period: 'زمستان ۱۴۰۳', portfolioValue: 85, benchmarkIndex: 71, growth: 19.7 },
  ],
  annual: [
    { period: '۱۴۰۰', portfolioValue: 32, benchmarkIndex: 30, growth: 6.6 },
    { period: '۱۴۰۱', portfolioValue: 46, benchmarkIndex: 39, growth: 17.9 },
    { period: '۱۴۰۲', portfolioValue: 65, benchmarkIndex: 52, growth: 25.0 },
    { period: '۱۴۰۳', portfolioValue: 85, benchmarkIndex: 66, growth: 28.7 },
  ],
};

export const CHART_TIMEFRAMES_EN: Record<string, ChartDataPoint[]> = {
  monthly: [
    { period: 'Apr', portfolioValue: 72, benchmarkIndex: 65, growth: 10.7 },
    { period: 'May', portfolioValue: 75, benchmarkIndex: 66, growth: 13.6 },
    { period: 'Jun', portfolioValue: 79, benchmarkIndex: 68, growth: 16.1 },
    { period: 'Jul', portfolioValue: 81, benchmarkIndex: 70, growth: 15.7 },
    { period: 'Aug', portfolioValue: 83, benchmarkIndex: 71, growth: 16.9 },
    { period: 'Sep', portfolioValue: 85, benchmarkIndex: 72, growth: 18.0 },
  ],
  quarterly: [
    { period: 'Q1 2024', portfolioValue: 64, benchmarkIndex: 58, growth: 10.3 },
    { period: 'Q2 2024', portfolioValue: 71, benchmarkIndex: 62, growth: 14.5 },
    { period: 'Q3 2024', portfolioValue: 78, benchmarkIndex: 67, growth: 16.4 },
    { period: 'Q4 2024', portfolioValue: 85, benchmarkIndex: 71, growth: 19.7 },
  ],
  annual: [
    { period: '2021', portfolioValue: 32, benchmarkIndex: 30, growth: 6.6 },
    { period: '2022', portfolioValue: 46, benchmarkIndex: 39, growth: 17.9 },
    { period: '2023', portfolioValue: 65, benchmarkIndex: 52, growth: 25.0 },
    { period: '2024', portfolioValue: 85, benchmarkIndex: 66, growth: 28.7 },
  ],
};

export const CHART_TIMEFRAMES = CHART_TIMEFRAMES_FA;

export const getChartData = (lang: Language = 'fa'): Record<string, ChartDataPoint[]> => {
  return lang === 'en' ? CHART_TIMEFRAMES_EN : CHART_TIMEFRAMES_FA;
};

export const getChartTimeframes = getChartData;

export const NEWS_DATA_FA: NewsItem[] = [
  {
    id: 'news-1',
    title: 'کسب تندیس جایزه ملی مدیریت مالی برای دومین سال متوالی توسط هلدینگ سرآمد',
    summary: 'در پی ارزیابی انضباط مالی، شفافیت صورت‌های مالی و مدیریت علمی ریسک، تندیس بلورین جایزه ملی مدیریت مالی کشور به هلدینگ سرآمد سرمایه ایلیا اعطا شد.',
    date: '۲۲ شهریور ۱۴۰۳',
    readTime: '۴ دقیقه',
    category: 'افتخارات ملی',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'جایزه ملی مدیریت مالی',
  },
  {
    id: 'news-2',
    title: 'خرید ۵٪ سهام هتل‌های بین‌المللی ملل توسط بیمه سامان و انتقال مدیریت به سرآمد',
    summary: 'با مشارکت استراتژیک شرکت بیمه سامان، ۵ درصد از سهام گروه هتل‌های ملل خریداری و راهبری سبد سرمایه‌گذاری آن به هلدینگ سرآمد سرمایه ایلیا واگذار گردید.',
    date: '۱۵ شهریور ۱۴۰۳',
    readTime: '۳ دقیقه',
    category: 'سرمایه‌گذاری راهبردی',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    alt: 'هتل‌های بین‌المللی ملل',
  },
  {
    id: 'news-3',
    title: 'کسب رتبه اول شتاب‌دهنده‌های کشور توسط مرکز نوآوری پلنت در ارزیابی ۱۴۰۴',
    summary: 'شبکه نوآفرینی سرآمد (پلنت) به عنوان اولین مرکز نوآوری صنعت بیمه، در جدیدترین ارزیابی ملی رتبه نخست را در میان شتاب‌دهنده‌های سراسر کشور کسب کرد.',
    date: '۰۸ شهریور ۱۴۰۳',
    readTime: '۵ دقیقه',
    category: 'نوآوری و اینشورتک',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
    alt: 'مرکز نوآوری پلنت',
  },
  {
    id: 'news-4',
    title: 'ثبت ارزش بازار ۳۳,۴۴۱ میلیارد ریالی پرتفوی بورسی با ضریب ۲.۶۶ برابری',
    summary: 'بر اساس آخرین صورت‌های مالی، ارزش بازار سبد سهام بورسی هلدینگ سرآمد به بیش از ۳۳.۴ هزار میلیارد ریال رسید که ۲.۶۶ برابر بهای تمام‌شده می‌باشد.',
    date: '۰۱ شهریور ۱۴۰۳',
    readTime: '۳ دقیقه',
    category: 'گزارش مالی و بورس',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    alt: 'گزارش پرتفوی بورسی',
  },
  {
    id: 'news-5',
    title: 'تکمیل ساختار سرمایه ۵۰ هزار میلیارد ریالی (۵ همت) هلدینگ سرآمد',
    summary: 'با ثبت رسمی سرمایه ۵۰,۰۰۰,۰۰۰ میلیون ریالی، زیرساخت توانمند تأمین مالی و توسعه ابزارهای نوین سبدگردانی در بازار سرمایه تثبیت گردید.',
    date: '۲۵ مرداد ۱۴۰۳',
    readTime: '۶ دقیقه',
    category: 'سرمایه و حاکمیت شرکتی',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    alt: 'ساختار سرمایه هلدینگ',
  },
];

export const NEWS_DATA_EN: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Saramad Holding Wins National Financial Management Award for 2nd Consecutive Year',
    summary: 'Recognized for rigorous financial discipline, transparent accounting, and scientific risk governance, Ilya Saramad received the Crystal Trophy at the National Financial Management Awards.',
    date: 'Sep 12, 2024',
    readTime: '4 min read',
    category: 'National Honors',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'National Financial Award',
  },
  {
    id: 'news-2',
    title: 'Saman Insurance Acquires 5% Stake in Melal International Hotels Under Saramad Governance',
    summary: 'Through strategic group alignment, a 5% equity stake in Melal International Hotels was secured with portfolio steering entrusted to Ilya Saramad Capital Holding.',
    date: 'Sep 05, 2024',
    readTime: '3 min read',
    category: 'Strategic Acquisition',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    alt: 'Melal International Hotels',
  },
  {
    id: 'news-3',
    title: 'Plannet Innovation Hub Ranked #1 Startup Accelerator Nationwide in 2025 Evaluation',
    summary: 'Saramad Innovation Network (Plannet), the nation’s pioneering insurance innovation center, achieved the #1 ranking among all accelerators in the annual state assessment.',
    date: 'Aug 29, 2024',
    readTime: '5 min read',
    category: 'InsurTech & Innovation',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
    alt: 'Plannet Innovation Hub',
  },
  {
    id: 'news-4',
    title: 'Listed Portfolio Market Value Reaches 33,441 Billion Rials with 2.66x Multiple',
    summary: 'Audited financial reports confirmed Saramad’s listed equity portfolio surged to 33.4T Rials, representing 2.66 times its original cost basis.',
    date: 'Aug 22, 2024',
    readTime: '3 min read',
    category: 'Financial Disclosures',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    alt: 'Portfolio disclosures',
  },
  {
    id: 'news-5',
    title: 'Completion of 50,000,000 Million Rials Nominal Capital Base',
    summary: 'Registered capital reaching 50 Trillion Rials solidifies Saramad’s capacity for megaproject financing, asset management, and novel market instruments.',
    date: 'Aug 15, 2024',
    readTime: '6 min read',
    category: 'Corporate Governance',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    alt: 'Capital base structure',
  },
];

export const NEWS_DATA = NEWS_DATA_FA;

export const getNewsData = (lang: Language = 'fa'): NewsItem[] => {
  return lang === 'en' ? NEWS_DATA_EN : NEWS_DATA_FA;
};
