import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, Code2, Film, Briefcase, ShieldCheck, Users, LayoutGrid, Network } from 'lucide-react';
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
  const [selectedPerson, setSelectedPerson] = useState<ReturnType<typeof getTeamPeople>[0] | null>(null);
  // Default view mode is 'classic' (large cards, non-tree) as requested by user
  const [viewMode, setViewMode] = useState<'classic' | 'tree'>('classic');
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const members = getTeamPeople(language);

  // Top Leadership & Advisor
  const leadAndAdvisor = [
    members.find((m) => m.id === 'tahourian')!,
    members.find((m) => m.id === 'rad')!,
  ].filter(Boolean);

  // Senior Managers
  const managers = [
    members.find((m) => m.id === 'rasouli')!,
    members.find((m) => m.id === 'sajjad-azad')!,
    members.find((m) => m.id === 'hamidi')!,
  ].filter(Boolean);

  // Specialists & Team Members
  const specialists = [
    members.find((m) => m.id === 'javan')!,
    members.find((m) => m.id === 'alizadeh')!,
    members.find((m) => m.id === 'khoshkho')!,
    members.find((m) => m.id === 'ramezani')!,
    members.find((m) => m.id === 'vaziri')!,
  ].filter(Boolean);

  // 3 Distinct Departments with Managers connected directly to their own teams (for tree view)
  const departments = [
    {
      id: 'tech',
      titleFa: 'دپارتمان فناوری و برنامه‌نویسی',
      titleEn: 'Engineering & Software Department',
      icon: Code2,
      manager: members.find((m) => m.id === 'rasouli')!,
      team: [
        members.find((m) => m.id === 'javan')!,      // آرین جوان (برنامه‌نویس فول‌استک)
        members.find((m) => m.id === 'alizadeh')!,   // حسین علیزاده (توسعه‌دهنده وب)
      ].filter(Boolean),
    },
    {
      id: 'media',
      titleFa: 'دپارتمان رسانه و تولید محتوا',
      titleEn: 'Content & Media Production',
      icon: Film,
      manager: members.find((m) => m.id === 'sajjad-azad')!,
      team: [
        members.find((m) => m.id === 'khoshkho')!,   // مسعود خوشخو (تدوینگر)
      ].filter(Boolean),
    },
    {
      id: 'admin',
      titleFa: 'دپارتمان امور اداری و پشتیبانی',
      titleEn: 'Administration & Operations',
      icon: Briefcase,
      manager: members.find((m) => m.id === 'hamidi')!,
      team: [
        members.find((m) => m.id === 'ramezani')!,   // امین رمضانی (کارشناس بخش اداری)
        members.find((m) => m.id === 'vaziri')!,     // امیررضا وزیری (پشتیبانی)
      ].filter(Boolean),
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
            <span>{language === 'fa' ? '۱۰ عضو متخصص' : '10 Team Members'}</span>
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
            {/* Tier 1: Board & Strategic Leadership (2 Large Cards) */}
            <div className="team-classic__tier">
              <div className="team-classic__tier-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]" />
                <span>{language === 'fa' ? 'هیئت‌مدیره و رهبری استراتژیک هلدینگ' : 'Board & Strategic Leadership'}</span>
              </div>
              <div className="team-classic__cards">
                {leadAndAdvisor.map((person, index) => (
                  <motion.div
                    key={person.id}
                    className="team-classic__card-wrapper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tier 2: Senior Managers (3 Large Cards) */}
            <div className="team-classic__tier">
              <div className="team-classic__tier-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]" />
                <span>{language === 'fa' ? 'مدیران ارشد دپارتمان‌ها' : 'Department Heads & Senior Managers'}</span>
              </div>
              <div className="team-classic__cards">
                {managers.map((person, index) => (
                  <motion.div
                    key={person.id}
                    className="team-classic__card-wrapper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
                  >
                    <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tier 3: Specialists & Team Members (5 Large Cards) */}
            <div className="team-classic__tier">
              <div className="team-classic__tier-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]" />
                <span>{language === 'fa' ? 'کارشناسان و متخصصان تیم' : 'Specialists & Engineering Team'}</span>
              </div>
              <div className="team-classic__cards">
                {specialists.map((person, index) => (
                  <motion.div
                    key={person.id}
                    className="team-classic__card-wrapper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 + index * 0.06 }}
                  >
                    <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                  </motion.div>
                ))}
              </div>
            </div>
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
            {/* Tier 1: Board & Strategic Leadership (2 Cards) */}
            <div className="team-tree__top-tier">
              <div className="team-tree__tier-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7] dark:bg-[#38BDF8]" />
                <span>{language === 'fa' ? 'هیئت‌مدیره و رهبری استراتژیک هلدینگ' : 'Board & Strategic Leadership'}</span>
              </div>
              <div className="team-tree__top-row">
                {leadAndAdvisor.map((person, index) => (
                  <motion.div
                    className="team-page__card"
                    key={person.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Trunk: Connecting Top Board to the 3 Department Heads */}
            <div className="team-tree__main-trunk">
              <div className="team-tree__stem-top" />
              <div className="team-tree__node" />
              <div className="team-tree__main-rail">
                {/* 3 Drop stems leading into each Department Head */}
                <div className="team-tree__trunk-drop" style={{ left: '18%' }}>
                  <div className="team-tree__trunk-node" />
                </div>
                <div className="team-tree__trunk-drop" style={{ left: '50%' }}>
                  <div className="team-tree__trunk-node" />
                </div>
                <div className="team-tree__trunk-drop" style={{ left: '82%' }}>
                  <div className="team-tree__trunk-node" />
                </div>
              </div>
            </div>

            {/* The 3 Dedicated Department Columns (each manager connected to their own team) */}
            <div className="team-tree__departments">
              {departments.map((dept, deptIndex) => {
                const DeptIcon = dept.icon;
                const hasMultipleMembers = dept.team.length > 1;

                return (
                  <div key={dept.id} className="team-tree__dept-column">
                    {/* Department Header Badge */}
                    <div className="team-tree__dept-badge">
                      <DeptIcon className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
                      <span>{language === 'fa' ? dept.titleFa : dept.titleEn}</span>
                    </div>

                    {/* Department Manager Card */}
                    <div className="team-tree__manager-card">
                      <motion.div
                        className="team-page__card"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 + deptIndex * 0.08 }}
                      >
                        <TeamPhotoCard person={dept.manager} onClick={() => setSelectedPerson(dept.manager)} />
                      </motion.div>
                    </div>

                    {/* Direct Branch from Manager to their Team */}
                    <div className="team-tree__dept-connector">
                      {hasMultipleMembers ? (
                        // Split branch for 2 team members
                        <>
                          <div className="team-tree__sub-stem" />
                          <div className="team-tree__node" style={{ width: 8, height: 8 }} />
                          <div className="team-tree__sub-rail">
                            <div className="team-tree__sub-drop" style={{ left: '25%' }}>
                              <div className="team-tree__drop-node" />
                            </div>
                            <div className="team-tree__sub-drop" style={{ left: '75%' }}>
                              <div className="team-tree__drop-node" />
                            </div>
                          </div>
                        </>
                      ) : (
                        // Direct straight line for single team member
                        <div className="team-tree__straight-stem">
                          <div className="team-tree__straight-node-bottom" />
                        </div>
                      )}
                    </div>

                    {/* Team Cards of this Department */}
                    <div className="team-tree__dept-team-row">
                      {dept.team.map((person, memberIndex) => (
                        <div key={person.id} className="team-tree__team-card">
                          <motion.div
                            className="team-page__card"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.3 + (deptIndex * 2 + memberIndex) * 0.06 }}
                          >
                            <TeamPhotoCard person={person} onClick={() => setSelectedPerson(person)} />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
