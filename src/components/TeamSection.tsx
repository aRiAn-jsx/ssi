import React from 'react';
import { motion } from 'motion/react';
import { Users, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { getTeamPeople } from '../data/teamData';
import { TeamPhotoCard } from './TeamPhotoCard';
import { useLanguage } from '../context/LanguageContext';

interface TeamSectionProps {
  onGoToTeamPage?: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onGoToTeamPage }) => {
  const { language, isRtl, t } = useLanguage();
  const team = getTeamPeople(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="team" className="relative py-28 md:py-36 bg-[#F7FAFC] overflow-hidden">
      <div className={`absolute top-1/2 ${isRtl ? '-left-20' : '-right-20'} w-96 h-96 rounded-full bg-[#D5ECFE]/50 blur-3xl pointer-events-none -z-10`} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-4">
            <Users className="w-4 h-4 text-[#027DF7]" />
            <span>{t.team.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-4">
            {t.team.title}
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            {language === 'fa' ? 'با اعضای تیم سرآمد سرمایه ایلیا آشنا شوید.' : 'Meet the Saramad Capital Ilya team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {team.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.1 }}
            >
              <TeamPhotoCard person={person} memberLabel={language === 'fa' ? 'عضو تیم' : 'Team member'} />
            </motion.div>
          ))}
        </div>

        {onGoToTeamPage && (
          <div className="text-center">
            <button
              type="button"
              id="view-all-team-btn"
              onClick={onGoToTeamPage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#D5ECFE]/60 text-[#01427C] hover:text-[#027DF7] text-xs sm:text-sm font-bold border border-[#E2E8F0] shadow-sm transition-all duration-200 group"
            >
              <span>{language === 'fa' ? 'مشاهده صفحه تیم' : 'View team page'}</span>
              <ArrowIcon className="w-4 h-4 text-[#027DF7] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
