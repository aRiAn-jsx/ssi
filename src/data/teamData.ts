import type { Language } from '../utils/translations';

export interface TeamPerson {
  id: string;
  name: string;
  nameEn: string;
  /** empty → an initials placeholder is shown */
  image?: string;
  placement: 'board' | 'ceo' | 'deputy' | 'manager' | 'member';
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
    placement: 'board',
    role: 'مشاور عالی',
    roleEn: 'Senior Advisor',
    bioFa: 'عضو هیات مدیره و مشاور عالی هلدینگ؛ سیاست‌گذاری کلان، نظارت راهبردی و مشاوره به مدیرعامل در تصمیم‌های بلندمدت مجموعه.',
    bioEn: 'Board member and senior advisor of the holding: high-level policy, strategic oversight and advice to the CEO on the group’s long-term decisions.',
  },
  {
    id: 'khorsand',
    name: 'دکتر مجید خرسند',
    nameEn: 'Dr. Majid Khorsand',
    image: '/team/2026/khorsand.webp',
    placement: 'deputy',
    role: 'معاون برنامه‌ریزی و توسعه راهبردی',
    roleEn: 'Deputy of Planning & Strategic Development',
    bioFa: 'دارای مدرک دکتری (PhD)؛ راهبری برنامه‌ریزی راهبردی، برنامه و بودجه و مطالعات و تحلیل هلدینگ.',
    bioEn: 'Holds a PhD; leads the holding’s strategic planning, programs and budget, and studies and analysis.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    experienceFa: 'دکتری (PhD)',
    experienceEn: 'PhD',
  },
  {
    id: 'choupanzadeh',
    name: 'امید چوپان‌زاده',
    nameEn: 'Omid Choupanzadeh',
    image: '/team/2026/choupanzadeh.webp',
    placement: 'member',
    role: 'کارشناس تولید محتوا',
    roleEn: 'Content Production Specialist',
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
    placement: 'deputy',
    role: 'معاون فروش، بازاریابی و توسعه بازار',
    roleEn: 'Deputy of Sales, Marketing & Market Development',
    bioFa: 'معاون فروش، بازاریابی و توسعه بازار هلدینگ؛ راهبری فروش، بازاریابی، توسعه بازار و ارتباط با مشتریان.',
    bioEn: 'Deputy of Sales, Marketing & Market Development: leads sales, marketing, market development and customer relations.',
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
    placement: 'deputy',
    role: 'معاون اداری، مالی و پشتیبانی',
    roleEn: 'Deputy of Administration, Finance & Support',
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
    role: 'مسئول تولید محتوا',
    roleEn: 'Head of Content Production',
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
    placement: 'deputy',
    role: 'معاون اداری، مالی و پشتیبانی',
    roleEn: 'Deputy of Administration, Finance & Support',
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
    role: 'تحقیق و طراحی (R&D) · برنامه‌نویس فول‌استک',
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
    role: 'تحقیق و طراحی (R&D) · برنامه‌نویس بک‌اند و متخصص یادگیری ماشین',
    roleEn: 'R&D · Backend Developer & Machine Learning Specialist',
    bioFa: 'برنامه‌نویسی بک‌اند با Python، طراحی و پیاده‌سازی مدل‌های یادگیری ماشین، تحلیل داده و علم داده، و معماری پایگاه‌های داده ساختاریافته و مقیاس‌پذیر برای سامانه‌های هلدینگ.',
    bioEn: 'Backend development in Python, designing and building machine learning models, data analysis and data science, and architecting structured, scalable databases for the holding’s systems.',
    telegram: 'https://t.me/saramad_ilya',
    instagram: 'https://instagram.com/saramad_holding',
    skillsFa: ['برنامه‌نویسی بک‌اند با Python', 'یادگیری ماشین (Machine Learning)', 'علم داده و تحلیل داده', 'معماری پایگاه داده ساختاریافته'],
    skillsEn: ['Python Backend Development', 'Machine Learning', 'Data Science & Analytics', 'Structured Database Architecture'],
  },
  {
    id: 'ramezani',
    name: 'امین رمضانی',
    nameEn: 'Amin Ramezani',
    image: '/team/2026/ramezani.webp',
    placement: 'manager',
    role: 'مسئول اداری',
    roleEn: 'Head of Administration',
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
    role: 'کارشناس پشتیبانی',
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

/** Organisational chart (ids refer to teamPeople). A missing id is a vacant seat. */
export interface OrgSeat {
  id: string;
  titleFa: string;
  titleEn: string;
  personId?: string;
}
export interface OrgUnit {
  id: string;
  titleFa: string;
  titleEn: string;
  /** "مسئول" of the unit */
  leadId?: string;
  /** "کارشناس"s; empty → one vacant specialist seat */
  memberIds: string[];
}
export interface OrgDeputy {
  id: string;
  titleFa: string;
  titleEn: string;
  deputyId?: string;
  /** shown in facing pairs either side of the deputy's stem */
  units: OrgUnit[];
}

/** "معاونت X" → "معاون X": shown on a deputy seat that has no named person */
export const deputyRole = (d: { titleFa: string; titleEn: string }, fa: boolean) =>
  fa ? d.titleFa.replace(/^معاونت/, 'معاون') : `Deputy of ${d.titleEn}`;

/** A unit is drawn only once somebody sits in it */
export const isStaffed = (u: OrgUnit) => Boolean(u.leadId) || u.memberIds.length > 0;

const vacant = (id: string, titleFa: string, titleEn: string): OrgUnit => ({ id, titleFa, titleEn, memberIds: [] });

export const orgChart: { ceoId: string; boardIds: string[]; staff: OrgSeat[]; deputies: OrgDeputy[] } = {
  ceoId: 'tahourian',
  boardIds: ['sabeghi'],
  // board members (مشاور عالی, رئیس دفتر) sit in the board panel, so they're not repeated here
  staff: [
    { id: 'advisors', titleFa: 'مشاورین', titleEn: 'Advisors' },
    { id: 'audit', titleFa: 'حسابرسی داخلی', titleEn: 'Internal Audit' },
    { id: 'pr', titleFa: 'روابط عمومی و ارتباطات', titleEn: 'Public Relations & Communications' },
    { id: 'legal', titleFa: 'حقوقی و امور قراردادها', titleEn: 'Legal & Contracts' },
  ],
  deputies: [
    {
      id: 'tech',
      titleFa: 'معاونت فنی و اجرایی',
      titleEn: 'Technical & Operations',
      deputyId: 'rasouli',
      units: [
        { id: 'content', titleFa: 'تولید محتوا', titleEn: 'Content Production', leadId: 'sajjad-azad', memberIds: ['choupanzadeh'] },
        { id: 'rnd', titleFa: 'تحقیق و طراحی (R&D)', titleEn: 'Research & Design (R&D)', memberIds: ['javan', 'alizadeh'] },
      ],
    },
    {
      id: 'admin',
      titleFa: 'معاونت اداری، مالی و پشتیبانی',
      titleEn: 'Administration, Finance & Support',
      deputyId: 'hamidi',
      units: [
        { id: 'administration', titleFa: 'اداری', titleEn: 'Administration', leadId: 'ramezani', memberIds: [] },
        vacant('finance', 'مالی', 'Finance'),
        { id: 'support', titleFa: 'پشتیبانی', titleEn: 'Support', memberIds: ['vaziri'] },
        vacant('training', 'آموزش', 'Training'),
      ],
    },
    {
      id: 'sales',
      titleFa: 'معاونت فروش، بازاریابی و توسعه بازار',
      titleEn: 'Sales, Marketing & Market Development',
      deputyId: 'pahlevan',
      units: [
        vacant('sales', 'فروش', 'Sales'),
        vacant('market-dev', 'توسعه بازار', 'Market Development'),
        vacant('marketing', 'بازاریابی', 'Marketing'),
        vacant('crm', 'ارتباط با مشتریان', 'Customer Relations'),
      ],
    },
    {
      id: 'planning',
      titleFa: 'معاونت برنامه‌ریزی و توسعه راهبردی',
      titleEn: 'Planning & Strategic Development',
      deputyId: 'khorsand',
      units: [
        vacant('strategy', 'برنامه‌ریزی راهبردی', 'Strategic Planning'),
        vacant('budget', 'برنامه و بودجه', 'Programs & Budget'),
        vacant('studies', 'مطالعات و تحلیل', 'Studies & Analysis'),
      ],
    },
  ],
};

// display order, top of the chart down
const ORDER = [
  'tahourian',
  'sabeghi', 'hamidi',
  'rasouli', 'rad', 'pahlevan', 'khorsand',
  'sajjad-azad', 'vaziri',
  'choupanzadeh', 'javan', 'alizadeh', 'ramezani',
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
