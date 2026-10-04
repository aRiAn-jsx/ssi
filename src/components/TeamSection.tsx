import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { getTeamPeople } from '../data/teamData';
import { TeamPhotoCard } from './TeamPhotoCard';
import { TeamMemberProfileModal } from './TeamMemberProfileModal';
import { useLanguage } from '../context/LanguageContext';
import './TeamSection.css';

interface TeamSectionProps {
  onGoToTeamPage?: () => void;
  onGoToConsultation?: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onGoToTeamPage, onGoToConsultation }) => {
  const { language, isRtl, t } = useLanguage();
  const team = getTeamPeople(language);
  const [selectedPerson, setSelectedPerson] = useState<ReturnType<typeof getTeamPeople>[0] | null>(null);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateArrows = () => {
      const first = carousel.firstElementChild?.getBoundingClientRect();
      const last = carousel.lastElementChild?.getBoundingClientRect();
      const viewport = carousel.getBoundingClientRect();
      setCanScrollLeft(Boolean(first && last && Math.min(first.left, last.left) < viewport.left - 1));
      setCanScrollRight(Boolean(first && last && Math.max(first.right, last.right) > viewport.right + 1));
    };

    updateArrows();
    carousel.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      carousel.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [isRtl]);

  const scrollTeam = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width ?? carousel.clientWidth) + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section id="team" className="relative py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#060D17] overflow-hidden border-t border-b border-[#027DF7]/20 dark:border-[#027DF7]/35 transition-colors duration-300">
      <div className={`absolute top-1/2 ${isRtl ? '-left-20' : '-right-20'} w-96 h-96 rounded-full bg-[#D5ECFE]/40 dark:bg-[#027DF7]/10 blur-3xl pointer-events-none -z-10`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 dark:bg-[#027DF7]/20 border border-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4">
            <Users className="w-4 h-4 text-[#027DF7]" />
            <span>{t.team.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] dark:text-white leading-tight mb-4">
            {t.team.title}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-300 leading-relaxed">
            {language === 'fa' ? 'با اعضای تیم سرآمد سرمایه ایلیا آشنا شوید.' : 'Meet the Saramad Capital Ilya team.'}
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="team-carousel" dir={isRtl ? 'rtl' : 'ltr'} role="region" aria-label={t.team.title} tabIndex={0}>
          {team.map((person, index) => (
            <motion.div
              key={person.id}
              className="team-carousel__item"
              dir={isRtl ? 'rtl' : 'ltr'}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.1 }}
            >
              <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6 mb-8" dir="ltr">
          <button type="button" onClick={() => scrollTeam(-1)} disabled={!canScrollLeft} aria-label={language === 'fa' ? 'نمایش اعضای سمت چپ' : 'Show team members to the left'} className="team-carousel__arrow">
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollTeam(1)} disabled={!canScrollRight} aria-label={language === 'fa' ? 'نمایش اعضای سمت راست' : 'Show team members to the right'} className="team-carousel__arrow">
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {onGoToTeamPage && (
          <div className="text-center">
            <button
              type="button"
              id="view-all-team-btn"
              onClick={onGoToTeamPage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#071325] hover:bg-[#D5ECFE]/60 dark:hover:bg-[#027DF7]/25 text-[#01427C] dark:text-[#E0F2FE] hover:text-[#027DF7] dark:hover:text-[#38BDF8] text-xs sm:text-sm font-bold border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-sm transition-all duration-200 group"
            >
              <span>{language === 'fa' ? 'مشاهده صفحه تیم' : 'View team page'}</span>
              <ArrowIcon className="w-4 h-4 text-[#027DF7] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Professional Profile Modal */}
      <TeamMemberProfileModal
        person={selectedPerson}
        isOpen={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
        onGoToConsultation={onGoToConsultation || onGoToTeamPage}
      />
    </section>
  );
};
