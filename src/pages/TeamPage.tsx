import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Mail,
  ArrowUpLeft,
  ArrowUpRight,
  Search,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Brain,
  Calendar,
  PhoneCall,
  X,
} from 'lucide-react';
import { getTeamData, getHoldingInfo } from '../data/mockData';
import { GlassCard } from '../components/GlassCard';
import { TeamMember } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TeamPageProps {
  onBackToHome: () => void;
  onGoToConsultation: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  onBackToHome,
  onGoToConsultation,
}) => {
  const { language, isRtl, t } = useLanguage();
  const holdingInfo = getHoldingInfo(language);
  const allMembers = getTeamData(language);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const categories = [
    { id: 'all', label: language === 'fa' ? 'همه اعضا و ارکان' : 'All Members & Organs' },
    { id: 'board', label: language === 'fa' ? 'هیئت مدیره و مدیریت ارشد' : 'Board & Senior Management' },
    { id: 'investment', label: language === 'fa' ? 'کمیته سرمایه‌گذاری و مدیریت دارایی' : 'Investment Committee & Asset Mgmt' },
    { id: 'governance', label: language === 'fa' ? 'امور حقوقی، ریسک و حاکمیت شرکتی' : 'Legal, Risk & Corporate Governance' },
    { id: 'fintech', label: language === 'fa' ? 'نوآوری مالی، فین‌تک و فناوری' : 'Financial Innovation, FinTech & Tech' },
  ];

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      const matchCategory =
        activeCategory === 'all' || member.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        (member.department && member.department.toLowerCase().includes(q)) ||
        member.expertise.toLowerCase().includes(q) ||
        (member.education && member.education.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, allMembers]);

  return (
    <div className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Top Breadcrumbs & Quick Back */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E2E8F0]/70">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <button
            type="button"
            onClick={onBackToHome}
            className="hover:text-[#027DF7] transition-colors flex items-center gap-1"
          >
            <span>{t.teamPage.mainPortal}</span>
          </button>
          <span>/</span>
          <span className="text-[#01427C] font-bold">{t.teamPage.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoToConsultation}
            className="px-4 py-2 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <span>{t.teamPage.bookMeetingWithExecutives}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl p-8 sm:p-12 mb-12 overflow-hidden liquid-glass-card border border-white/80 shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#027DF7]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#01427C]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/80 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-4">
            <Users className="w-4 h-4 text-[#027DF7]" />
            <span>{t.teamPage.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-4">
            {t.teamPage.title}
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6 font-normal">
            {t.teamPage.subtitle}
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E2E8F0]/80">
            <div>
              <div className="text-2xl font-black text-[#01427C]">{language === 'fa' ? '۱۸+ سال' : '18+ Yrs'}</div>
              <div className="text-xs text-[#64748B]">{t.teamPage.statYears}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#027DF7]">{language === 'fa' ? '۴ کمیته' : '4 Committees'}</div>
              <div className="text-xs text-[#64748B]">{t.teamPage.statCommittees}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#01427C]">100%</div>
              <div className="text-xs text-[#64748B]">{t.teamPage.statDegree}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#027DF7]">{language === 'fa' ? '۱۲+ صنعت' : '12+ Sectors'}</div>
              <div className="text-xs text-[#64748B]">{t.teamPage.statSectors}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`team-cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#01427C] text-white shadow-md shadow-[#01427C]/20'
                    : 'bg-white/80 hover:bg-[#D5ECFE]/50 text-[#64748B] hover:text-[#01427C] border border-[#E2E8F0]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            id="team-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.teamPage.searchPlaceholder}
            className={`w-full ${isRtl ? 'pl-4 pr-10' : 'pr-4 pl-10'} py-2.5 rounded-full text-xs bg-white/90 border border-[#E2E8F0] focus:border-[#027DF7] outline-none shadow-inner font-medium`}
          />
          <Search className={`w-4 h-4 text-[#94A3B8] absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`text-xs text-[#94A3B8] hover:text-[#01427C] absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`}
            >
              {language === 'fa' ? 'پاک کردن' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {/* Team Cards Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <GlassCard
                tilt={true}
                glowOnHover={true}
                className="p-6 h-full flex flex-col items-center text-center group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-white to-[#D5ECFE] shadow-md relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-[#027DF7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white text-[#01427C] text-[10px] font-bold border border-[#E2E8F0] shadow-xs whitespace-nowrap">
                    {member.expertise}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#027DF7] mb-2 leading-snug">
                  {member.role}
                </p>

                {member.department && (
                  <span className="inline-block text-[10px] font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full mb-3">
                    {member.department}
                  </span>
                )}

                {/* Short Bio */}
                <p className="text-xs text-[#64748B] leading-relaxed mb-4 font-normal line-clamp-3">
                  {member.bio}
                </p>

                {/* Education Pill */}
                {member.education && (
                  <div className="w-full pt-3 mt-auto border-t border-[#E2E8F0]/80 flex items-center justify-center gap-1.5 text-[11px] text-[#475569]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#027DF7] shrink-0" />
                    <span className="truncate">{member.education}</span>
                  </div>
                )}

                {/* Card Action Hint */}
                <div className="pt-3 w-full flex items-center justify-between text-[11px] font-bold text-[#027DF7]">
                  <span>{t.teamPage.viewProfile}</span>
                  <ArrowIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-[#E2E8F0] mb-16">
          <Users className="w-12 h-12 text-[#94A3B8] mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-[#01427C] mb-1">{t.teamPage.noMembersFound}</h3>
          <p className="text-xs text-[#64748B] mb-4">
            {t.teamPage.noMembersSubtitle}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-full bg-[#01427C] text-white text-xs font-bold"
          >
            {t.teamPage.showAllMembers}
          </button>
        </div>
      )}

      {/* Leadership & Organizational Pillars */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#027DF7] bg-[#D5ECFE]/60 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.teamPage.coreValuesEyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01427C]">
            {t.teamPage.coreValuesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-[#027DF7]/10 text-[#027DF7] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#01427C] mb-2">
              {t.teamPage.val1Title}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-normal">
              {t.teamPage.val1Desc}
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-[#027DF7]/10 text-[#027DF7] flex items-center justify-center mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#01427C] mb-2">
              {t.teamPage.val2Title}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-normal">
              {t.teamPage.val2Desc}
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-[#027DF7]/10 text-[#027DF7] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#01427C] mb-2">
              {t.teamPage.val3Title}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-normal">
              {t.teamPage.val3Desc}
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Consultation & Meeting CTA */}
      <div className="rounded-3xl p-8 sm:p-10 liquid-glass-card border border-white/90 bg-gradient-to-l from-white to-[#F0F7FF] text-center shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#027DF7]/10 text-[#027DF7] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#01427C] mb-3">
            {t.teamPage.meetingBoxTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
            {t.teamPage.meetingBoxSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="team-page-book-btn"
              onClick={onGoToConsultation}
              className="px-6 py-3 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#027DF7]/25 hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.teamPage.bookMeetingBtn}</span>
            </button>
            <a
              href={`tel:${holdingInfo.phone}`}
              className="px-6 py-3 rounded-full bg-white text-[#01427C] hover:text-[#027DF7] text-xs sm:text-sm font-bold border border-[#E2E8F0] shadow-sm transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#027DF7]" />
              <span dir="ltr">{holdingInfo.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Member Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white z-10 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#01427C] transition-colors`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-white shrink-0"
                />

                <div className="text-center sm:text-right">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#D5ECFE] text-[#01427C] text-[11px] font-bold mb-2">
                    {selectedMember.department || (language === 'fa' ? 'دپارتمان تخصصی هلدینگ' : 'Executive Department')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#01427C] mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#027DF7] mb-2">
                    {selectedMember.role}
                  </p>
                  {selectedMember.education && (
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#64748B]">
                      <GraduationCap className="w-4 h-4 text-[#027DF7]" />
                      <span>{selectedMember.education}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#01427C] mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#027DF7]" />
                  <span>{t.teamPage.bioTitle}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Achievements */}
              {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <h4 className="text-xs font-bold text-[#01427C] mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#027DF7]" />
                    <span>{t.teamPage.achievementsTitle}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#475569]">
                    {selectedMember.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact / Action footer inside modal */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="px-3.5 py-2 rounded-full bg-[#F1F5F9] hover:bg-[#D5ECFE] text-[#01427C] text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#027DF7]" />
                      <span>{selectedMember.email}</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMember(null);
                    onGoToConsultation();
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.teamPage.bookWithThisLeader}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
