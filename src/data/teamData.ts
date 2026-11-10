import type { Language } from '../utils/translations';

export interface TeamPerson {
  id: string;
  name: string;
  nameEn: string;
  /** empty → an initials placeholder is shown */
  image?: string;
  placement: 'council' | 'ceo' | 'deputy' | 'manager' | 'member';
  role: string;
  roleEn: string;
  bioFa?: string;
  bioEn?: string;
  telegram?: string;
  instagram?: string;
  skillsFa?: string[];
  skillsEn?: string[];
  experienceFa?: string;
  experienceEn?: string;
  /** public, indexable profile page */
  profileUrl?: string;
}

export const teamPeople: TeamPerson[] = [
  {
    id: 'sabeghi',
    name: 'دکتر صابقی مقدم',
    nameEn: 'Dr. Sabeghi Moghaddam',
    placement: 'council',
    role: 'شورای عالی',
    roleEn: 'Supreme Council',
    bioFa: 'عضو شورای عالی هلدینگ؛ سیاست‌گذاری کلان، نظارت راهبردی و تصویب جهت‌گیری‌های بلندمدت مجموعه.',
    bioEn: 'Member of the Supreme Council: high-level policy, strategic oversight and approval of the group’s long-term direction.',
  },
  {
    id: 'khorsand',
    name: 'دکتر مجید خرسند',
    nameEn: 'Dr. Majid Khorsand',
    image: '/team/2026/khorsand.webp',
    placement: 'deputy',
    role: 'معاون طرح، برنامه و بودجه',
    roleEn: 'Deputy of Planning, Programs & Budget',
    bioFa: 'راهبری طرح‌ها و برنامه‌های هلدینگ، تدوین و کنترل بودجه و پایش تحقق اهداف سالانه.',
    bioEn: 'Leads the holding’s plans and programs, budget preparation and control, and tracking of annual targets.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
  },
  {
    id: 'choupanzadeh',
    name: 'امید چوپان‌زاده',
    nameEn: 'Omid Choupanzadeh',
    image: '/team/2026/choupanzadeh.webp',
    placement: 'member',
    role: 'تیم تولید محتوا',
    roleEn: 'Content Production Team',
    bioFa: 'عضو تیم تولید محتوای هلدینگ.',
    bioEn: 'Member of the holding’s content production team.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
  },
  {
    id: 'pahlevan',
    name: 'متین پهلوان',
    nameEn: 'Matin Pahlevan',
    image: '/team/2026/pahlevan.webp',
    placement: 'member',
    role: 'آموزش',
    roleEn: 'Training',
    bioFa: 'مسئول آموزش در معاونت اداری، پشتیبانی و مالی هلدینگ.',
    bioEn: 'Responsible for training within the Administration, Support & Finance deputy.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
  },
  {
    id: 'tahourian',
    name: 'حسین طهوریان',
    nameEn: 'Hossein Tahourian',
    image: '/team/2026/tahourian.webp',
    placement: 'ceo',
    role: 'مدیرعامل',
    roleEn: 'Chief Executive Officer',
    bioFa: 'راهبری کلان استراتژیک، نظارت بر سبد شرکت‌های تابعه هلدینگ، مدیریت پرتفوی سرمایه‌گذاری و پیاده‌سازی حکمرانی شرکتی در تراز بازارهای مدرن سرمایه.',
    bioEn: 'Strategic leadership, overseeing holding subsidiary portfolios, capital market asset management, and enforcing modern corporate governance.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['مدیریت استراتژیک', 'بازار سرمایه', 'حاکمیت شرکتی', 'سرمایه‌گذاری خطرپذیر'],
    skillsEn: ['Strategic Management', 'Capital Markets', 'Corporate Governance', 'Venture Capital'],
    experienceFa: 'بیش از ۱۵ سال سابقه راهبری سازمانی',
    experienceEn: '+15 Years Leadership Experience',
  },
  {
    id: 'rad',
    name: 'هادی قلی‌نیاراد',
    nameEn: 'Hadi Gholiniarad',
    image: '/team/هادی راد.png',
    placement: 'deputy',
    role: 'معاون اداری، پشتیبانی و مالی',
    roleEn: 'Deputy of Administration, Support & Finance',
    bioFa: 'هدایت مشاوره‌ای در تدوین مدل‌های مالی، مهندسی سرمایه‌گذاری، مدیریت ریسک‌های سیستماتیک و ارتقای بازدهی اقتصادی ساختارهای هلدینگ.',
    bioEn: 'Advisory guidance in financial modeling, investment structuring, risk management, and economic asset optimization.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['مشاوره سرمایه‌گذاری', 'تحلیل مالی و ریسک', 'مدیریت دارایی', 'استراتژی‌های رشد'],
    skillsEn: ['Investment Advisory', 'Financial Risk', 'Asset Management', 'Growth Strategies'],
    experienceFa: 'بیش از ۱۲ سال تجربه مشاوره مالی',
    experienceEn: '+12 Years Financial Advisory',
  },
  {
    id: 'rasouli',
    name: 'دکتر جلال رسولی',
    nameEn: 'Dr. Jalal Rasouli',
    image: '/team/دکتر رسولی.png',
    placement: 'deputy',
    role: 'معاون فنی و اجرایی',
    roleEn: 'Deputy of Technical & Operations',
    bioFa: 'رهبری معماری و مهندسی نرم‌افزار، توسعه سیستم‌های ابری با مقیاس‌پذیری بالا، مدیریت متدولوژی‌های چابک و خلق پلتفرم‌های دیجیتال هلدینگ.',
    bioEn: 'Leading software engineering and system architecture, scalable cloud infrastructure, agile engineering culture, and digital product suites.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['معماری نرم‌افزار', 'زیرساخت ابری و DevOps', 'مدیریت تیم فنی', 'توسعه Full-Stack'],
    skillsEn: ['Software Architecture', 'Cloud Infrastructure', 'Tech Leadership', 'Full-Stack Dev'],
    experienceFa: 'بیش از ۱۰ سال توسعه نرم‌افزار سازمانی',
    experienceEn: '+10 Years Software Engineering',
  },
  {
    id: 'sajjad-azad',
    name: 'سجاد آزاد',
    nameEn: 'Sajjad Azad',
    image: '/team/2026/sajjad-azad.webp',
    placement: 'manager',
    role: 'مدیر تولید محتوا',
    roleEn: 'Content Production Manager',
    bioFa: 'نگارش فیلم‌نامه، طراحی سناریوهای خلاقانه چندرسانه‌ای، تدوین استراتژی جامع رسانه‌ای، رهبری کمپین‌های تبلیغاتی، داستان‌سرایی برند و مدیریت تولید محتوای هلدینگ.',
    bioEn: 'Screenwriting and creative script development, directing omnichannel media strategy, multimedia production, brand narrative, and corporate communications.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['فیلم‌نامه‌نویسی و سناریوپردازی', 'استراتژی رسانه', 'کارگردانی محتوا', 'برندینگ دیجیتال', 'کمپین‌های ۳۶۰ درجه'],
    skillsEn: ['Screenwriting & Scriptwriting', 'Media Strategy', 'Content Direction', 'Digital Branding', 'Omnichannel Campaigns'],
    experienceFa: 'بیش از ۸ سال فیلم‌نامه‌نویسی و مدیریت رسانه',
    experienceEn: '+8 Years Screenwriting & Media Direction',
  },
  {
    id: 'hamidi',
    name: 'حمید حمیدی',
    nameEn: 'Hamid Hamidi',
    image: '/team/حمید حمیدی.png',
    placement: 'manager',
    role: 'مسئول دفتر',
    roleEn: 'Office Manager',
    bioFa: 'یکپارچه‌سازی فرآیندهای اداری، هماهنگی دپارتمان‌های تابعه، استانداردهای تعالی سازمانی و ارتقای بهره‌وری زنجیره لجستیک هلدینگ.',
    bioEn: 'Operations and administrative workflow harmonization, corporate logistics standards, and operational excellence across subsidiaries.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['مدیریت اداری', 'بهینه‌سازی فرآیندها', 'روابط عمومی سازمانی', 'امور پرسنلی'],
    skillsEn: ['Administrative Ops', 'Process Optimization', 'Organizational Excellence', 'Logistics'],
    experienceFa: 'بیش از ۱۰ سال مدیریت اداری و منابع',
    experienceEn: '+10 Years Operations Management',
  },
  {
    id: 'javan',
    name: 'آرین جوان',
    nameEn: 'Arian Javan',
    image: '/team/ارین.png',
    profileUrl: '/team/arian-javan/',
    placement: 'member',
    role: 'تحقیق و توسعه (R&D) · برنامه‌نویس فول‌استک',
    roleEn: 'R&D · Full-Stack Developer',
    bioFa: 'توسعه جامع فول‌استک سامانه‌ها، پیاده‌سازی معماری‌های مقیاس‌پذیر فرانت‌اند و بک‌اند، بهینه‌سازی پرفورمنس نرم‌افزار و مهندسی پلتفرم‌های دیجیتال هلدینگ.',
    bioEn: 'Full-stack engineering of scalable software systems, high-performance frontend and backend architectures, modern UI/UX, and robust digital platforms.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['توسعه Full-Stack', 'معماری فرانت‌اند و بک‌اند', 'React & Next.js', 'TypeScript & Node.js'],
    skillsEn: ['Full-Stack Development', 'Frontend & Backend Architecture', 'React & Next.js', 'TypeScript & Node.js'],
    experienceFa: 'بیش از ۵ سال توسعه فول‌استک',
    experienceEn: '+5 Years Full-Stack Engineering',
  },
  {
    id: 'alizadeh',
    name: 'حسین علیزاده',
    nameEn: 'Hossein Alizadeh',
    image: '/team/2026/alizadeh.webp',
    placement: 'member',
    role: 'تحقیق و توسعه (R&D) · توسعه‌دهنده وب',
    roleEn: 'R&D · Web Developer',
    bioFa: 'پیاده‌سازی رابط‌های کاربری مدرن با React و Next.js، بهینه‌سازی پرفورمنس وب، انیمیشن‌های تعاملی و یکپارچه‌سازی رابط‌های کاربری پاسخ‌گرا.',
    bioEn: 'Modern UI development with React & Next.js, web performance optimization, fluid interactive micro-animations, and responsive UX.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'پرفورمنس فرانت‌اند'],
    skillsEn: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Frontend Performance'],
    experienceFa: 'بیش از ۴ سال مهندسی فرانت‌اند',
    experienceEn: '+4 Years Web Engineering',
  },
  {
    id: 'ramezani',
    name: 'امین رمضانی',
    nameEn: 'Amin Ramezani',
    image: '/team/2026/ramezani.webp',
    placement: 'member',
    role: 'کارشناس دفتر',
    roleEn: 'Office Specialist',
    bioFa: 'مدیریت پرونده‌های سازمانی، دبیرخانه مرکزی، تعامل با سهامداران و سازمان‌ها و پایش فرآیندهای انطباق مستندات هلدینگ.',
    bioEn: 'Corporate record coordination, executive documentation management, stakeholder coordination, and administrative compliance.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['امور دفتری و اداری', 'سیستم‌های اتوماسیون', 'مستندسازی استاندارد', 'ارتباطات شرکتی'],
    skillsEn: ['Office Coordination', 'Automation Systems', 'Standard Documentation', 'Corporate Comms'],
    experienceFa: 'بیش از ۶ سال سابقه کارشناسی اداری',
    experienceEn: '+6 Years Administration',
  },
  {
    id: 'vaziri',
    name: 'امیررضا وزیری',
    nameEn: 'Amirreza Vaziri',
    image: '/team/وزیری.png',
    placement: 'member',
    role: 'پشتیبانی',
    roleEn: 'Support Specialist',
    bioFa: 'پاسخگویی به درخواست‌های مشتریان و ذینفعان، حل مسائل فنی سامانه‌ها، پایش رضایت کاربران و ارائه خدمات پایدار پشتیبانی.',
    bioEn: 'Direct client relationship management, resolution of customer queries, SLA uptime monitoring, and reliable user support.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['پشتیبانی مشتریان (CRM)', 'حل مسئله بلادرنگ', 'تضمین کیفیت خدمت', 'پایش سیستم'],
    skillsEn: ['Customer Support (CRM)', 'Issue Resolution', 'Service Quality', 'System Monitoring'],
    experienceFa: 'بیش از ۴ سال پشتیبانی تخصصی',
    experienceEn: '+4 Years Technical Support',
  },
];

/** Organisational chart (ids refer to teamPeople) */
export interface OrgUnit {
  id: string;
  titleFa: string;
  titleEn: string;
  leadId?: string;
  memberIds: string[];
  /** open seats shown as "Coming soon" cards */
  comingSoon?: number;
}
export interface OrgDeputy {
  id: string;
  titleFa: string;
  titleEn: string;
  deputyId: string;
  units: OrgUnit[];
}

export const orgChart: { councilId: string; ceoId: string; deputies: OrgDeputy[] } = {
  councilId: 'sabeghi',
  ceoId: 'tahourian',
  deputies: [
    {
      id: 'tech',
      titleFa: 'معاونت فنی و اجرایی',
      titleEn: 'Technical & Operations',
      deputyId: 'rasouli',
      units: [
        { id: 'content', titleFa: 'تولید محتوا', titleEn: 'Content Production', leadId: 'sajjad-azad', memberIds: ['choupanzadeh'], comingSoon: 1 },
        { id: 'rnd', titleFa: 'تحقیق و توسعه (R&D)', titleEn: 'Research & Development', memberIds: ['javan', 'alizadeh'], comingSoon: 1 },
      ],
    },
    {
      id: 'planning',
      titleFa: 'معاونت طرح، برنامه و بودجه',
      titleEn: 'Planning, Programs & Budget',
      deputyId: 'khorsand',
      units: [],
    },
    {
      id: 'admin',
      titleFa: 'معاونت اداری، پشتیبانی و مالی',
      titleEn: 'Administration, Support & Finance',
      deputyId: 'rad',
      units: [
        { id: 'office', titleFa: 'دفتر، آموزش و پشتیبانی', titleEn: 'Office, Training & Support', leadId: 'hamidi', memberIds: ['ramezani', 'pahlevan', 'vaziri'] },
      ],
    },
  ],
};

// display order, top of the chart down
const ORDER = [
  'sabeghi', 'tahourian',
  'rasouli', 'khorsand', 'rad',
  'sajjad-azad', 'hamidi',
  'choupanzadeh', 'javan', 'alizadeh', 'ramezani', 'pahlevan', 'vaziri',
];

/** two-letter monogram for people without a photo */
export const initialsOf = (name: string) =>
  name.replace(/^(دکتر|Dr\.)\s*/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('‌');

export const getTeamPeople = (language: Language) =>
  [...teamPeople]
    .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id))
    .map((person) => ({
    ...person,
    displayName: language === 'fa' ? person.name : person.nameEn,
    displayRole: language === 'fa' ? person.role : person.roleEn,
    displayBio: language === 'fa' ? (person.bioFa || '') : (person.bioEn || ''),
    displaySkills: language === 'fa' ? (person.skillsFa || []) : (person.skillsEn || []),
    displayExperience: language === 'fa' ? (person.experienceFa || '') : (person.experienceEn || ''),
  }));
