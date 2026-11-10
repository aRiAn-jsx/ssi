import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, ShieldCheck, Users, LayoutGrid, Network } from 'lucide-react';
import { getTeamPeople, orgChart } from '../data/teamData';
import { TeamPhotoCard, TeamComingSoonCard } from '../components/TeamPhotoCard';
import { TeamOrgChart } from '../components/TeamOrgChart';
import { TeamMemberProfileModal } from '../components/TeamMemberProfileModal';
import { useLanguage } from '../context/LanguageContext';
import './TeamPage.css';

interface TeamPageProps {
  onBackToHome: () => void;
  onGoToConsultation: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onBackToHome, onGoToConsultation }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedPerson, setSelectedPerson] = useState<ReturnType<typeof getTeamPeople>[0] | null>(null);
  // Default view mode is 'classic' (large cards, non-tree) as requested by user
  const [viewMode, setViewMode] = useState<'classic' | 'tree'>('classic');
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const members = getTeamPeople(language);

  const byId = (id: string) => members.find((m) => m.id === id)!;
  const tiers = [
    {
      key: 'leadership',
      fa: 'شورای عالی و مدیریت ارشد',
      en: 'Supreme Council & Executive Management',
      people: members.filter((m) => m.placement === 'council' || m.placement === 'ceo'),
      soon: 0,
    },
    {
      key: 'deputies',
      fa: 'معاونت‌ها',
      en: 'Deputies',
      people: orgChart.deputies.map((d) => byId(d.deputyId)),
      soon: 0,
    },
    {
      key: 'managers',
      fa: 'مدیران واحدها',
      en: 'Unit Managers',
      people: members.filter((m) => m.placement === 'manager'),
      soon: 0,
    },
    {
      key: 'team',
      fa: 'کارشناسان و اعضای تیم',
      en: 'Specialists & Team Members',
      people: members.filter((m) => m.placement === 'member'),
      soon: orgChart.deputies.reduce((n, d) => n + d.units.reduce((u, x) => u + (x.comingSoon ?? 0), 0), 0),
    },
  ];

  return (
    <main className={`min-h-screen pt-24 sm:pt-28 pb-16 px-3 sm:px-6 md:px-10 max-w-[1440px] mx-auto ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Top Breadcrumb & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[#027DF7]/20 dark:border-[#027DF7]/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] dark:text-slate-300">
          <button type="button" onClick={onBackToHome} className="hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-colors">
            {t.teamPage.mainPortal}
          </button>
          <span>/</span>
          <span className="text-[#01427C] dark:text-[#38BDF8] font-bold">
            {language === 'fa' ? 'اعضای تیم و چارت سازمانی' : 'Team Members & Organizational Chart'}
          </span>
        </div>
        <button
          type="button"
          onClick={onGoToConsultation}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 hover:shadow-lg transition-all flex items-center gap-1.5"
        >
          <span>{language === 'fa' ? 'درخواست مشاوره' : 'Request Consultation'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header Bar with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 sm:p-5 rounded-2xl liquid-glass-card shadow-sm border-none">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 flex items-center justify-center text-[#027DF7] dark:text-[#38BDF8] shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-[#01427C] dark:text-white tracking-tight">
              {language === 'fa' ? 'تیم سرمایه انسانی هلدینگ سرآمد سرمایه ایلیا' : 'Human Capital & Team — Ilya Saramad Capital'}
            </h1>
            <p className="text-xs text-[#64748B] dark:text-slate-400">
              {language === 'fa' ? 'مشاهده اعضای هلدینگ در دو حالت نمایش شبکه‌ای و چارت سازمانی' : 'View holding team members in Grid or Departmental Tree mode'}
            </p>
          </div>
        </div>

        {/* View Switcher Toggle Buttons */}
        <div className="flex items-center gap-3 self-stretch sm:self-center justify-between sm:justify-end">
          <div className="team-view-toggle">
            <button
              type="button"
              onClick={() => setViewMode('classic')}
              className={`team-view-toggle__btn ${viewMode === 'classic' ? 'team-view-toggle__btn--active' : ''}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'کارت‌های بزرگ (شبکه‌ای)' : 'Grid (Large Cards)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tree')}
              className={`team-view-toggle__btn ${viewMode === 'tree' ? 'team-view-toggle__btn--active' : ''}`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'چارت ریشه‌ای (دپارتمانی)' : 'Tree (Departmental)'}</span>
            </button>
          </div>

          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5ECFE]/70 dark:bg-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
            <span>{language === 'fa' ? `${members.length.toLocaleString('fa-IR')} عضو` : `${members.length} Team Members`}</span>
          </span>
        </div>
      </div>

      {/* Content Rendering Based on View Mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'classic' ? (
          /* ======================================================== */
          /* MODE 1: CLASSIC GRID LAYOUT (LARGE CARDS, NO TREE LINES) */
          /* ======================================================== */
          <motion.div
            key="classic"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="team-classic"
          >
            {tiers.map((tier, ti) => (
              <div key={tier.key} className="team-classic__tier">
                <div className="team-classic__tier-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]" />
                  <span>{language === 'fa' ? tier.fa : tier.en}</span>
                </div>
                <div className="team-classic__cards">
                  {tier.people.map((person, index) => (
                    <motion.div
                      key={person.id}
                      className="team-classic__card-wrapper"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: ti * 0.1 + index * 0.06 }}
                    >
                      <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                    </motion.div>
                  ))}
                  {Array.from({ length: tier.soon }, (_, i) => (
                    <div key={`soon-${i}`} className="team-classic__card-wrapper">
                      <TeamComingSoonCard fa={language === 'fa'} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* ======================================================== */
          /* MODE 2: DEPARTMENTAL ORGANIZATIONAL TREE & BRANCHES      */
          /* ======================================================== */
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="team-tree"
          >
            <TeamOrgChart onSelect={setSelectedPerson} />
          </motion.div>
        )}
      </AnimatePresence>

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
