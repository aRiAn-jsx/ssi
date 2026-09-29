import type { Language } from '../utils/translations';

export interface TeamPerson {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  placement: 'lead' | 'advisor' | 'executive' | 'member';
  role: string;
  roleEn: string;
}

export const teamPeople: TeamPerson[] = [
  { id: 'tahourian', name: 'حسین طهوریان', nameEn: 'Hossein Tahourian', image: '/team/حسین طهوریان.png', placement: 'lead', role: 'مدیرعامل', roleEn: 'Chief Executive Officer' },
  { id: 'rad', name: 'هادی راد', nameEn: 'Hadi Rad', image: '/team/هادی راد.png', placement: 'advisor', role: 'مشاور', roleEn: 'Advisor' },
  { id: 'rasouli', name: 'جلال رسولی', nameEn: 'Jalal Rasouli', image: '/team/جلال رسولی.jpg', placement: 'executive', role: 'مدیر برنامه‌نویسی', roleEn: 'Programming Manager' },
  { id: 'sajjad-azad', name: 'سجاد آزاد', nameEn: 'Sajjad Azad', image: '/team/سجاد آزاد.jpg', placement: 'executive', role: 'مدیر تولید محتوا', roleEn: 'Content Production Manager' },
  { id: 'hamidi', name: 'حمید حمیدی', nameEn: 'Hamid Hamidi', image: '/team/حمید حمیدی.jpg', placement: 'executive', role: 'مدیر اداری', roleEn: 'Administrative Manager' },
  { id: 'javan', name: 'آرین جوان', nameEn: 'Arian Javan', image: '/team/آرین جوان.jpg', placement: 'member', role: 'متخصص سئو', roleEn: 'SEO Specialist' },
  { id: 'alizadeh', name: 'حسین علیزاده', nameEn: 'Hossein Alizadeh', image: '/team/حسین علیزاده.jpg', placement: 'member', role: 'توسعه‌دهنده وب', roleEn: 'Web Developer' },
  { id: 'ramezani', name: 'امین رمضانی', nameEn: 'Amin Ramezani', image: '/team/امین رمضانی.png', placement: 'member', role: 'کارشناس بخش اداری', roleEn: 'Administrative Specialist' },
  { id: 'vaziri', name: 'امیررضا وزیری', nameEn: 'Amirreza Vaziri', image: '/team/امیررضا وزیری.jpg', placement: 'member', role: 'پشتیبانی', roleEn: 'Support Specialist' },
  { id: 'khoshkho', name: 'مسعود خوشخو', nameEn: 'Masoud Khoshkho', image: '/team/مسعود خوشخو.png', placement: 'member', role: 'تدوینگر', roleEn: 'Video Editor' },
];

export const getTeamPeople = (language: Language) =>
  teamPeople.map((person) => ({
    ...person,
    displayName: language === 'fa' ? person.name : person.nameEn,
    displayRole: language === 'fa' ? person.role : person.roleEn,
  }));
