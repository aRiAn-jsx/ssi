import type { Language } from '../utils/translations';

export interface TeamPerson {
  id: string;
  name: string;
  nameEn: string;
  image: string;
}

export const teamPeople: TeamPerson[] = [
  { id: 'javan', name: 'آقای جوان', nameEn: 'Mr. Javan', image: '/team/javan.jpg' },
  { id: 'hamidi', name: 'آقای حمیدی', nameEn: 'Mr. Hamidi', image: '/team/hamidi.jpg' },
  { id: 'rasouli', name: 'آقای رسولی', nameEn: 'Mr. Rasouli', image: '/team/rasouli.jpg' },
  { id: 'ramezani', name: 'آقای رمضانی', nameEn: 'Mr. Ramezani', image: '/team/ramezani.jpg' },
  { id: 'vaziri', name: 'آقای وزیری', nameEn: 'Mr. Vaziri', image: '/team/vaziri.jpg' },
  { id: 'alizadeh', name: 'آقای علیزاده', nameEn: 'Mr. Alizadeh', image: '/team/alizadeh.jpg' },
  { id: 'sajjad-azad', name: 'سجاد آزاد', nameEn: 'Sajjad Azad', image: '/team/sajjad-azad.jpg' },
];

export const getTeamPeople = (language: Language) =>
  teamPeople.map((person) => ({
    ...person,
    displayName: language === 'fa' ? person.name : person.nameEn,
  }));
