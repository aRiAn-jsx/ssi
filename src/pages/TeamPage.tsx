import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, Search, Users, X } from 'lucide-react';
import { getTeamPeople } from '../data/teamData';
import { TeamPhotoCard } from '../components/TeamPhotoCard';
import { TeamMemberProfileModal } from '../components/TeamMemberProfileModal';
import { useLanguage } from '../context/LanguageContext';
import './TeamPage.css';

interface TeamPageProps {
  onBackToHome: () => void;
  onGoToConsultation: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onBackToHome, onGoToConsultation }) => {
  const { language, isRtl, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<ReturnType<typeof getTeamPeople>[0] | null>(null);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const members = getTeamPeople(language);
  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return members.filter((member) =>
      `${member.name} ${member.nameEn} ${member.role || ''} ${member.roleEn || ''}`.toLocaleLowerCase().includes(query),
    );
  }, [members, searchQuery]);

  const leadAndAdvisor = filteredMembers.filter((member) => member.placement === 'lead' || member.placement === 'advisor');
  const executives = filteredMembers.filter((member) => member.placement === 'executive');
  const otherMembers = filteredMembers.filter((member) => member.placement === 'member');
  
  const renderRow = (people: typeof filteredMembers, row: string, offset: number) => people.length > 0 && (
    <div className={`team-page__row team-page__row--${row}`}>
      {people.map((person, index) => (
        <motion.div
          className="team-page__card"
          key={person.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: Math.min(index + offset, 5) * 0.07 }}
        >
          <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <main className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-12 max-w-[1500px] mx-auto ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#027DF7]/25 dark:border-[#027DF7]/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] dark:text-slate-300">
          <button type="button" onClick={onBackToHome} className="hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-colors">
            {t.teamPage.mainPortal}
          </button>
          <span>/</span>
          <span className="text-[#01427C] dark:text-[#38BDF8] font-bold">{language === 'fa' ? 'اعضای تیم' : 'Team members'}</span>
        </div>
        <button
          type="button"
          onClick={onGoToConsultation}
          className="px-4 py-2 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 hover:shadow-lg transition-all flex items-center gap-1.5"
        >
          <span>{language === 'fa' ? 'درخواست مشاوره' : 'Request a consultation'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header Banner - Centered h1 & p */}
      <div className="relative rounded-3xl p-8 sm:p-12 mb-8 overflow-hidden liquid-glass-card border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-lg text-center flex flex-col items-center justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#027DF7]/10 dark:bg-[#027DF7]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 border border-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-4 mx-auto">
          <Users className="w-4 h-4 text-[#027DF7]" />
          <span>{t.teamPage.eyebrow}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] dark:text-white leading-tight mb-4 text-center max-w-3xl">
          {language === 'fa' ? 'مدیران ارشد، هیئت‌مدیره و مشاور' : 'Executive Leadership, Board & Advisor'}
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-300 leading-relaxed text-center max-w-2xl">
          {language === 'fa' ? 'با اعضای تیم سرآمد سرمایه ایلیا آشنا شوید.' : 'Meet the Saramad Capital Ilya team.'}
        </p>
      </div>

      {/* Search Input - Centered for balanced UX */}
      <div className="relative w-full max-w-md mx-auto mb-8">
        <input
          type="search"
          id="team-search-input"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={language === 'fa' ? 'جستجو بر اساس نام یا سمت' : 'Search by name or role'}
          aria-label={language === 'fa' ? 'جستجو بر اساس نام یا سمت' : 'Search by name or role'}
          className={`w-full ${isRtl ? 'pl-10 pr-10' : 'pr-10 pl-10'} py-2.5 rounded-full text-sm bg-white/90 dark:bg-[#071325]/90 text-[#01427C] dark:text-white border border-[#027DF7]/25 focus:border-[#027DF7] dark:border-[#027DF7]/40 dark:focus:border-[#38BDF8] outline-none shadow-inner`}
        />
        <Search className={`w-4 h-4 text-[#94A3B8] absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label={language === 'fa' ? 'پاک کردن جستجو' : 'Clear search'}
            className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#01427C] dark:text-slate-400 dark:hover:text-white`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Team Groups */}
      {filteredMembers.length ? (
        <div className="team-page__groups">
          {renderRow(leadAndAdvisor, 'lead', 0)}
          {renderRow(executives, 'executives', leadAndAdvisor.length)}
          {renderRow(otherMembers, 'members', leadAndAdvisor.length + executives.length)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/60 dark:bg-[#071325]/60 rounded-3xl border border-[#027DF7]/25">
          <Users className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[#01427C] dark:text-white font-bold mb-4">{t.teamPage.noMembersFound}</p>
          <button type="button" onClick={() => setSearchQuery('')} className="px-4 py-2 rounded-full bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-colors">
            {t.teamPage.showAllMembers}
          </button>
        </div>
      )}

      {/* Professional Profile Modal */}
      <TeamMemberProfileModal
        person={selectedPerson}
        isOpen={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
        onGoToConsultation={onGoToConsultation}
      />
    </main>
  );
};
