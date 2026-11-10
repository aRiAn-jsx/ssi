import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { getTeamPeople, orgChart, initialsOf } from '../data/teamData';
import { TeamPhotoCard } from './TeamPhotoCard';
import { TeamMemberProfileModal } from './TeamMemberProfileModal';
import { useLanguage } from '../context/LanguageContext';
import './TeamSection.css';

interface TeamSectionProps {
  onGoToTeamPage?: () => void;
  onGoToConsultation?: () => void;
}

type Person = ReturnType<typeof getTeamPeople>[0];

/**
 * Home-page team block, laid out like the org chart:
 * council + CEO → three deputies → everyone else as compact chips.
 */
export const TeamSection: React.FC<TeamSectionProps> = ({ onGoToTeamPage, onGoToConsultation }) => {
  const { language, isRtl, t } = useLanguage();
  const fa = language === 'fa';
  const team = getTeamPeople(language);
  const byId = (id: string) => team.find((p) => p.id === id)!;
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const leaders = [byId(orgChart.councilId), byId(orgChart.ceoId)];
  const deputies = orgChart.deputies.map((d) => ({ title: fa ? d.titleFa : d.titleEn, person: byId(d.deputyId) }));
  const rest = team.filter((p) => p.placement === 'manager' || p.placement === 'member');

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="team" className="relative py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#060D17] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 dark:bg-[#027DF7]/20 border border-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4">
            <Users className="w-4 h-4 text-[#027DF7]" />
            <span>{t.team.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] dark:text-white leading-tight mb-4">
            {t.team.title}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-300 leading-relaxed">
            {fa ? 'شورای عالی، مدیریت ارشد و معاونت‌های هلدینگ ایلیا' : 'The Supreme Council, executive management and deputies of Ilya Holding'}
          </p>
        </div>

        {/* Tier 1 */}
        <div className="team-home__leaders">
          {leaders.map((person, i) => (
            <motion.div key={person.id} className="team-home__card team-home__card--lead" {...reveal(i * 0.08)}>
              <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
            </motion.div>
          ))}
        </div>

        <div className="team-home__spine" aria-hidden="true" />

        {/* Tier 2 */}
        <div className="team-home__deputies">
          {deputies.map(({ title, person }, i) => (
            <motion.div key={person.id} className="team-home__deputy" {...reveal(0.15 + i * 0.08)}>
              <span className="team-home__deputy-title">{title}</span>
              <div className="team-home__card">
                <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Everyone else */}
        <motion.div className="team-home__crew" {...reveal(0.25)}>
          <div className="team-home__crew-title">{fa ? 'مدیران واحدها و اعضای تیم' : 'Unit managers & team members'}</div>
          <ul className="team-home__chips">
            {rest.map((person) => (
              <li key={person.id}>
                <button type="button" className="team-chip" onClick={() => setSelectedPerson(person)}>
                  <span className="team-chip__avatar">
                    {person.image ? (
                      <img src={person.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span>{initialsOf(person.displayName)}</span>
                    )}
                  </span>
                  <span className="team-chip__text">
                    <strong>{person.displayName}</strong>
                    <small>{person.displayRole}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {onGoToTeamPage && (
          <div className="text-center mt-10">
            <button
              type="button"
              id="view-all-team-btn"
              onClick={onGoToTeamPage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#01427C] dark:bg-[#0284C7] text-white text-sm font-bold shadow-md shadow-[#027DF7]/25 transition-transform hover:-translate-y-0.5 group"
            >
              <span>{fa ? 'مشاهده چارت سازمانی کامل' : 'View the full org chart'}</span>
              <ArrowIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <TeamMemberProfileModal
        person={selectedPerson}
        isOpen={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
        onGoToConsultation={onGoToConsultation || onGoToTeamPage}
      />
    </section>
  );
};
