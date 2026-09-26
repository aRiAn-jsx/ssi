import { ServiceItem, PortfolioItem, SubsidiaryNode, StatItem, NewsItem, TeamMember, ChartDataPoint } from '../types';
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
  parentCompany: 'شرکت بیمه سامان (سهامی عام)',
  license: 'تحت نظارت سازمان بورس و اوراق بهادار تهران',
  tagline: 'آینده را با اطمینان می‌سازیم',
  subTagline: 'مدیریت دارایی‌های پیشرو، سرمایه‌گذاری جسورانه و هم‌افزایی ارزش‌آفرین در بستر شفافیت و فناوری مالی',
  address: 'تهران، خیابان ملاصدرا، خیابان شیخ بهایی، بن‌بست چهارم، پلاک ۵',
  city: 'تهران',
  email: 'info@ssiholding.co',
  phone: '02188626674',
  phoneFormatted: '۰۲۱-۸۸۶۲۶۶۷۴',
  phoneIntl: '+98 21 8862 6674',
  workingHours: 'شنبه تا چهارشنبه : ۸:۰۰ الی ۱۷:۰۰',
};

export const HOLDING_INFO_EN: HoldingInfo = {
  name: 'Ilya Saramad Capital Holding',
  nameFa: 'هلدینگ سرآمد سرمایه ایلیا',
  nameEn: 'Ilya Saramad Capital Holding',
  shortName: 'Saramad',
  domain: 'ssiholding.co',
  parentCompany: 'Saman Insurance (Public Joint Stock)',
  license: 'Regulated by Securities and Exchange Organization of Iran (SEO)',
  tagline: 'Building The Future With Certainty',
  subTagline: 'Leading asset management, high-conviction ventures, and value synergy built upon transparency and financial technology',
  address: 'No. 5, 4th Alley, Sheikh Bahaei St, Mollasadra Ave, Tehran, Iran',
  city: 'Tehran',
  email: 'info@ssiholding.co',
  phone: '02188626674',
  phoneFormatted: '+98 21 8862 6674',
  phoneIntl: '+98 21 8862 6674',
  workingHours: 'Saturday to Wednesday: 8:00 AM to 5:00 PM',
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
    id: 'sub-1',
    name: 'شرکت سبدگردان سرآمد',
    role: 'مدیریت دارایی و سبدهای اختصاصی',
    equity: '۱۰۰٪ مالکیت',
    color: '#027DF7',
    x: 18,
    y: 28,
    description: 'دارای مجوز رسمی سازمان بورس برای مدیریت صندوق‌های سرمایه‌گذاری، سبدگردانی اختصاصی اشخاص حقوقی و مشاوره تخصصی سرمایه‌گذاری.',
    metrics: [
      { label: 'ارزش صندوق‌ها', value: 'بیش از ۳۳ همت' },
      { label: 'سرمایه‌گذاران', value: '+۱۸,۰۰۰' },
    ],
  },
  {
    id: 'sub-2',
    name: 'شرکت سرمایه‌گذاری خطرپذیر ایلیا ونچرز',
    role: 'سرمایه‌گذاری جسورانه و فین‌تک',
    equity: '۸۵٪ سهامداری',
    color: '#10B981',
    x: 82,
    y: 28,
    description: 'بازوی سرمایه‌گذاری خطرپذیر هلدینگ در حوزه فناوری‌های مالی، هوش مصنوعی، زنجیره ارزش بیمه و مدل‌های نوین پردازش داده.',
    metrics: [
      { label: 'پروژه‌های تحت رشد', value: '۱۴ استارتاپ' },
      { label: 'ضریب بازگشت سرمایه', value: '۳.۴ برابر' },
    ],
  },
  {
    id: 'sub-3',
    name: 'شرکت توسعه املاک سرآمد',
    role: 'توسعه دارایی‌های ملکی و زیرساخت',
    equity: '۹۰٪ مالکیت',
    color: '#01427C',
    x: 28,
    y: 78,
    description: 'مدیریت، بهینه‌سازی و اجرای پروژه‌های شاخص ملکی، مجتمع‌های تجاری و اداری و طراحی صندوق‌های املاک و مستغلات (REIT).',
    metrics: [
      { label: 'متراژ در دست توسعه', value: '۱۲۵,۰۰۰ مترمربع' },
      { label: 'پروژه‌های فعال', value: '۶ مجتمع اداری' },
    ],
  },
  {
    id: 'sub-4',
    name: 'شبکه نوآفرینی سرآمد (مرکز نوآوری پلنت)',
    role: 'اولین مرکز نوآوری صنعت بیمه ایران',
    equity: 'شتاب‌دهنده برتر کشور',
    color: '#F59E0B',
    x: 72,
    y: 78,
    description: 'شتاب‌دهنده تخصصی اینشورتک و فین‌تک با کسب رتبه نخست شتاب‌دهنده‌های کشور در ارزیابی ۱۴۰۴ و کانون اتصال استارتاپ‌ها به بیمه سامان.',
    metrics: [
      { label: 'رتبه ملی', value: 'رتبه ۱ شتاب‌دهنده‌ها' },
      { label: 'تیم‌های مورد حمایت', value: '+۴۵ تیم' },
    ],
  },
];

export const SUBSIDIARIES_DATA_EN: SubsidiaryNode[] = [
  {
    id: 'sub-1',
    name: 'Saramad Asset Management Co.',
    role: 'Dedicated Portfolio & Fund Management',
    equity: '100% Wholly-Owned',
    color: '#027DF7',
    x: 18,
    y: 28,
    description: 'Licensed by Securities and Exchange Organization to manage high-yield mutual funds, institutional portfolios, and investment advisory.',
    metrics: [
      { label: 'Portfolio Value', value: '33+ Trillion Rials' },
      { label: 'Active Investors', value: '+18,000' },
    ],
  },
  {
    id: 'sub-2',
    name: 'Ilya Ventures (VC & FinTech)',
    role: 'Venture Capital & FinTech Acceleration',
    equity: '85% Majority Stake',
    color: '#10B981',
    x: 82,
    y: 28,
    description: 'Strategic VC vehicle financing AI, data science, financial technologies, and InsurTech ventures tied to Saman Financial Group.',
    metrics: [
      { label: 'Active Ventures', value: '14 Startups' },
      { label: 'Realized MOIC', value: '3.4x Multiple' },
    ],
  },
  {
    id: 'sub-3',
    name: 'Saramad Real Estate Development',
    role: 'Commercial Real Estate & Infrastructure',
    equity: '90% Equity Stake',
    color: '#01427C',
    x: 28,
    y: 78,
    description: 'Master planning, engineering, asset monetization of modern corporate headquarters and structuring Real Estate Investment Trusts (REITs).',
    metrics: [
      { label: 'Under Construction', value: '125,000 sqm' },
      { label: 'Active Projects', value: '6 Megacomplexes' },
    ],
  },
  {
    id: 'sub-4',
    name: 'Saramad Innovation Hub (Plannet)',
    role: 'First Insurance Innovation Center in Iran',
    equity: 'Top National Accelerator',
    color: '#F59E0B',
    x: 72,
    y: 78,
    description: 'Ranked #1 national startup accelerator in 2025 assessment, serving as the primary innovation and InsurTech bridge for Saman Insurance.',
    metrics: [
      { label: 'National Rank', value: '#1 Accelerator' },
      { label: 'Incubated Teams', value: '+45 Startups' },
    ],
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

export const TEAM_DATA_FA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'محمدرضا حسن‌پور',
    role: 'مدیرعامل و عضو هیئت مدیره',
    department: 'مدیریت عالی و راهبری استراتژیک',
    category: 'board',
    bio: 'بیش از ۲۰ سال سابقه مدیریت ارشد در نهادهای مالی، بانکداری سرمایه‌گذاری، طراحی ابزارهای نوین مالی و راهبری سبد دارایی‌های هلدینگ سرآمد سرمایه ایلیا تحت نظارت سازمان بورس و گروه مالی سامان.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    expertise: 'راهبری استراتژیک، مدیریت دارایی و M&A',
    education: 'کارشناسی ارشد مدیریت مالی و سرمایه‌گذاری',
    achievements: [
      'توسعه ارزش روز پرتفوی بورسی هلدینگ به بیش از ۳۳,۴۴۱ میلیارد ریال',
      'کسب تندیس بلورین جایزه ملی مدیریت مالی برای دو سال پیاپی',
      'هدایت راهبردی توسعه بازوهای تخصصی سبدگردانی، املاک و پلنت',
    ],
    email: 'm.hassanpour@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-2',
    name: 'دکتر مصطفی پرخوان',
    role: 'مدیر منابع انسانی و توسعه سازمانی',
    department: 'توسعه سرمایه انسانی و تعالی سازمانی',
    category: 'governance',
    bio: 'متخصص معماری سازمانی، مدیریت سرمایه انسانی، طراحی ساختارهای چابک و ارتقای فرهنگ تعالی در هلدینگ‌های چندرشته‌ای صنعتی و مالی کشور.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    expertise: 'توسعه سرمایه انسانی و معماری سازمانی',
    education: 'دکتری مدیریت رفتار سازمانی و منابع انسانی',
    achievements: [
      'پیاده‌سازی مدل شایستگی‌های راهبردی مدیران در هلدینگ سرآمد',
      'استقرار نظام‌های تعالی سازمانی و ارزیابی عملکرد مبتنی بر OKR',
      'طراحی برنامه‌های هم‌افزایی استعدادها میان هلدینگ و شرکت‌های تابعه',
    ],
    email: 'm.parkhan@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-3',
    name: 'دکتر سارا یزدانی',
    role: 'معاونت سرمایه‌گذاری و مدیریت دارایی‌ها',
    department: 'کمیته سرمایه‌گذاری و سبدگردانی',
    category: 'investment',
    bio: 'دکتری اقتصاد مالی از دانشگاه تهران، تحلیل‌گر ارشد پیشین بورس اوراق بهادار و طراح مدل‌های هوشمند سنجش ریسک پرتفوی و استراتژی‌های پوشش ریسک (Hedging).',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    expertise: 'سبدگردانی و مدیریت ریسک',
    education: 'دکتری علوم اقتصادی (گرایش اقتصاد سنجی مالی)',
    achievements: [
      'کسب نسبت ارزش بازار به بهای تمام‌شده ۲.۶۶ برابری در سبد بورسی',
      'طراحی سیستم ارزیابی خودکار نسبت شارپ پرتفوی‌های هلدینگ',
      'مولف کتب مرجع ارزش‌گذاری شرکت‌های سهامی',
    ],
    email: 's.yazdani@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-4',
    name: 'مهندس علیرضا بهرامی',
    role: 'معاونت توسعه بازار و نوآوری دیجیتال',
    department: 'سرمایه‌گذاری خطرپذیر و فین‌تک',
    category: 'fintech',
    bio: 'متخصص معماری سازمانی فین‌تک، مؤسس چندین صندوق سرمایه‌گذاری خطرپذیر و مجری پروژه‌های هم‌افزایی اکوسیستم‌های استارتاپی، بلاک‌چین و هوش مصنوعی در صنعت بیمه.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    expertise: 'سرمایه‌گذاری جسورانه (VC) و فین‌تک',
    education: 'کارشناسی ارشد مهندسی نرم‌افزار و MBA دانشگاه صنعتی شریف',
    achievements: [
      'کسب رتبه اول شتاب‌دهنده‌های کشور برای مرکز نوآوری پلنت در سال ۱۴۰۴',
      'توسعه پلتفرم معاملات هوشمند الگوریتمی اختصاصی هلدینگ',
      'سخنران کلیدی کنفرانس‌های بین‌المللی نوآوری بانکی و بیمه‌ای',
    ],
    email: 'a.bahrami@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-5',
    name: 'دکتر مهشید کیانی',
    role: 'مدیر امور حقوقی، حاکمیت شرکتی و انطباق',
    department: 'امور حقوقی و انطباق نظارتی',
    category: 'governance',
    bio: 'حقوقدان ارشد با سابقه در حوزه دعاوی بورسی، تنظیم قراردادهای ادغام شرکت‌های سهامی عام و استانداردهای بین‌المللی شفافیت حاکمیت شرکتی (Corporate Governance).',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    expertise: 'حاکمیت شرکتی و قوانین بورس',
    education: 'دکتری حقوق خصوصی از دانشگاه شهید بهشتی',
    achievements: [
      'تنظیم آیین‌نامه‌های انطباق و کنترل داخلی مورد تایید سازمان بورس',
      'مشاور حقوقی در خرید ۵٪ سهام هتل‌های بین‌المللی ملل',
      'داور تخصصی دعاوی مالی و تجاری اتاق بازرگانی',
    ],
    email: 'm.kiani@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-6',
    name: 'مهندس پژمان نوری',
    role: 'مدیر ارشد ریسک و فناوری اطلاعات (CTO)',
    department: 'زیرساخت فناوری و امنیت داده',
    category: 'fintech',
    bio: 'معمار سامانه‌های پردازش ابری، سیستم‌های رصد ریسک بلادرنگ و امنیت سایبری زیرساخت‌های مالی هلدینگ با بیش از ۱۵ سال سابقه کار تخصصی در مراکز داده بانکی.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    expertise: 'زیرساخت ابری و هوش مصنوعی مالی',
    education: 'کارشناسی ارشد هوش مصنوعی و رباتیک',
    achievements: [
      'پیاده‌سازی هسته امن معاملاتی با آپتایم ۹۹.۹۹٪',
      'طراحی معماری داده‌های کلان دریافتی از سامانه بورس',
      'گواهینامه بین‌المللی CISSP و امنیت شبکه مالی',
    ],
    email: 'p.nouri@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-7',
    name: 'دکتر کیوان سعادتمند',
    role: 'رئیس کمیته حسابرسی و عضو غیرموظف هیئت مدیره',
    department: 'نظارت مالی و حسابرسی',
    category: 'board',
    bio: 'حسابدار رسمی و عضو جامعه حسابداران رسمی ایران (IACPA)، کارشناس رسمی دادگستری در امور مالی و بانکی، با بیش از ۲۰ سال سابقه تدوین صورت‌های مالی تلفیقی هلدینگ‌ها.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    expertise: 'حسابرسی تلفیقی و استانداردهای IFRS',
    education: 'دکتری حسابداری از دانشگاه علامه طباطبایی',
    achievements: [
      'نظارت بر تطبیق کامل صورت‌های مالی با الزامات IFRS و سازمان بورس',
      'اخذ گزارش مقبول حسابرسی در دوره‌های مالی متوالی',
      'تدوین دستورالعمل کنترل‌های داخلی برای شرکت‌های بورسی',
    ],
    email: 'k.saadatmand@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-8',
    name: 'خانم مهندس هاله رادپور',
    role: 'مدیر سرمایه‌گذاری املاک و پروژه‌های زیربنایی',
    department: 'توسعه املاک و مستغلات',
    category: 'investment',
    bio: 'کارشناس ارشد مهندسی عمران و مدیریت پروژه، متخصص در امکان‌سنجی مالی مگاپروژه‌های تجاری، اداری و صنعتی با بیش از ۱۴ سال سابقه اجرای طرح‌های سرمایه‌گذاری ملکی.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    expertise: 'ارزش‌گذاری پروژه‌های کلان و REITS',
    education: 'کارشناسی ارشد مدیریت ساخت و پروژه‌های عمرانی',
    achievements: [
      'مدیریت و توسعه ۱۲۵,۰۰۰ مترمربع پروژه‌های تجاری و اداری سرآمد',
      'طراحی ساختار اولین صندوق سرمایه‌گذاری املاک و مستغلات (REIT) گروه',
      'بهینه‌سازی پرتفوی دارایی‌های ملکی با بالاترین بهره‌وری اقتصادی',
    ],
    email: 'h.radpour@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
];

export const TEAM_DATA_EN: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Mohammadreza Hassanpour',
    role: 'Chief Executive Officer (CEO) & Board Member',
    department: 'Executive Leadership & Strategic Governance',
    category: 'board',
    bio: 'Over 20 years of senior leadership across financial institutions, investment banking, capital allocation, and steering Ilya Saramad Capital Holding under the supervision of the Securities and Exchange Organization (SEO) and Saman Financial Group.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    expertise: 'Strategic Leadership, Wealth Management & M&A',
    education: 'M.Sc. in Financial Management & Investments',
    achievements: [
      'Scaled listed portfolio market value to over 33,441 Billion Rials',
      'Won the National Financial Management Crystal Award for 2 consecutive years',
      'Spearheaded the nationwide expansion of asset management, real estate, and Plannet hubs',
    ],
    email: 'm.hassanpour@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-2',
    name: 'Dr. Mostafa Parkhan',
    role: 'Director of Human Resources & Organizational Development',
    department: 'Human Capital & Organizational Excellence',
    category: 'governance',
    bio: 'Expert in organizational architecture, human capital strategy, agile operating models, and organizational excellence across diversified industrial and financial holdings.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    expertise: 'Human Capital Strategy & Organizational Design',
    education: 'Ph.D. in Organizational Behavior & Human Resources Management',
    achievements: [
      'Implemented strategic leadership competency architecture across Saramad Holding',
      'Established organizational excellence systems and OKR-driven performance evaluation',
      'Designed talent synergy initiatives between the holding and its subsidiaries',
    ],
    email: 'm.parkhan@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-3',
    name: 'Dr. Sara Yazdani',
    role: 'VP of Investment & Asset Management',
    department: 'Investment Committee & Asset Allocation',
    category: 'investment',
    bio: 'Ph.D. in Financial Economics, former chief equity analyst at TSE, and architect of proprietary multi-factor algorithmic portfolio hedging models.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    expertise: 'Portfolio Management & Quant Risk',
    education: 'Ph.D. in Financial Econometrics',
    achievements: [
      'Achieved a 2.66x market-to-cost multiple in listed securities portfolio',
      'Architect of automated Sharpe-ratio optimization engines',
      'Author of authoritative corporate valuation literature',
    ],
    email: 's.yazdani@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-4',
    name: 'Eng. Alireza Bahrami',
    role: 'VP of Market Development & Digital Innovation',
    department: 'Venture Capital & FinTech Acceleration',
    category: 'fintech',
    bio: 'Enterprise FinTech architect, founder of multiple venture funds, and leader of AI & blockchain integration projects within the insurance value chain.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    expertise: 'Venture Capital (VC) & FinTech',
    education: 'M.Sc. in Software Engineering & MBA, Sharif University of Tech',
    achievements: [
      'Ranked #1 national startup accelerator for Plannet Innovation Hub in 2025 assessment',
      'Developed proprietary algorithmic quantitative trading platform',
      'Keynote speaker at international banking and insurance conferences',
    ],
    email: 'a.bahrami@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-5',
    name: 'Dr. Mahshid Kiani',
    role: 'Head of Legal, Governance & Regulatory Compliance',
    department: 'Legal Affairs & Corporate Governance',
    category: 'governance',
    bio: 'Senior corporate counsel specializing in public joint-stock M&A agreements, securities arbitration, and international corporate governance frameworks.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    expertise: 'Corporate Governance & Securities Law',
    education: 'Ph.D. in Private Law, Shahid Beheshti University',
    achievements: [
      'Drafted SEO-approved internal compliance and risk manuals',
      'Lead legal counsel in the 5% strategic acquisition of Melal International Hotels',
      'Certified arbitrator at Chamber of Commerce Financial Tribunal',
    ],
    email: 'm.kiani@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-6',
    name: 'Eng. Pejman Nouri',
    role: 'Chief Risk & Technology Officer (CTO)',
    department: 'Technology Infrastructure & Cyber Defense',
    category: 'fintech',
    bio: 'Cloud systems architect with 15+ years of banking data center experience, engineering ultra-low-latency financial risk engines and encrypted trading clouds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    expertise: 'Cloud Architecture & Financial AI',
    education: 'M.Sc. in Artificial Intelligence and Robotics',
    achievements: [
      'Deployed enterprise trading core with 99.99% operational uptime',
      'Designed real-time big data pipeline streaming TSE market feeds',
      'Holder of CISSP and financial cyber defense certifications',
    ],
    email: 'p.nouri@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-7',
    name: 'Dr. Keyvan Saadatmand',
    role: 'Head of Audit Committee & Non-Executive Director',
    department: 'Financial Oversight & Internal Audit',
    category: 'board',
    bio: 'Certified Public Accountant (IACPA) and judicial banking expert with 20+ years directing consolidated financial statements for multi-billion dollar holdings.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    expertise: 'Consolidated Auditing & IFRS',
    education: 'Ph.D. in Accounting, Allameh Tabataba\'i University',
    achievements: [
      'Oversaw complete compliance with IFRS financial reporting and SEO standards',
      'Secured unqualified audit opinions across consecutive fiscal terms',
      'Formulated internal control frameworks for listed corporations',
    ],
    email: 'k.saadatmand@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-8',
    name: 'Eng. Haleh Radpour',
    role: 'Director of Real Estate & Megaprojects Investment',
    department: 'Real Estate & Infrastructure Development',
    category: 'investment',
    bio: 'Senior civil engineering and project management specialist with 14+ years conducting financial feasibility and construction execution for premier commercial developments.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    expertise: 'Megaproject Valuation & REITs',
    education: 'M.Sc. in Construction Management & Civil Engineering',
    achievements: [
      'Managed execution of 125,000+ sqm premium commercial developments',
      'Inaugurated group’s first Real Estate Investment Trust (REIT)',
      'Optimized corporate property portfolio generating strong sustainable cashflows',
    ],
    email: 'h.radpour@ssiholding.co',
    linkedin: 'https://linkedin.com',
  },
];

export const TEAM_DATA = TEAM_DATA_FA;

export const getTeamData = (lang: Language = 'fa'): TeamMember[] => {
  return lang === 'en' ? TEAM_DATA_EN : TEAM_DATA_FA;
};
