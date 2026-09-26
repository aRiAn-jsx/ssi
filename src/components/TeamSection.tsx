import React from 'react';
import { motion } from 'motion/react';
import { Users, Linkedin, Mail, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { getTeamData } from '../data/mockData';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

interface TeamSectionProps {
  onGoToTeamPage?: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onGoToTeamPage }) => {
  const { language, isRtl, t } = useLanguage();
  const teamData = getTeamData(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="team" className="relative py-28 md:py-36 bg-[#F7FAFC] overflow-hidden">
      {/* Ambient background blur */}
      <div className={`absolute top-1/2 ${isRtl ? '-left-20' : '-right-20'} w-96 h-96 rounded-full bg-[#D5ECFE]/50 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-4">
            <Users className="w-4 h-4 text-[#027DF7]" />
            <span>{t.team.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-4">
            {t.team.title}
          </h2>
          <p className="text-base text-[#64748B] font-normal leading-relaxed">
            {t.team.subtitle}
          </p>
        </div>

        {/* 4 Team Member Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {teamData.slice(0, 4).map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <GlassCard
                tilt={true}
                glowOnHover={true}
                className="p-6 h-full flex flex-col items-center text-center group"
              >
                {/* Circular Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-white to-[#D5ECFE] shadow-md relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-[#027DF7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {/* Small expertise pill */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/95 text-[#01427C] text-[10px] font-bold border border-[#E2E8F0] shadow-sm whitespace-nowrap">
                    {member.expertise}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors mb-1">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-xs font-semibold text-[#027DF7] mb-4">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-normal">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="mt-auto pt-4 border-t border-[#E2E8F0]/80 w-full flex items-center justify-center gap-3 text-[#64748B]">
                  <a
                    href="#contact"
                    className="p-2 rounded-full hover:bg-[#D5ECFE]/60 hover:text-[#027DF7] transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="p-2 rounded-full hover:bg-[#D5ECFE]/60 hover:text-[#027DF7] transition-colors"
                    aria-label={`LinkedIn ${member.name}`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Action Button to Full Team Page */}
        {onGoToTeamPage && (
          <div className="text-center">
            <button
              type="button"
              id="view-all-team-btn"
              onClick={onGoToTeamPage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#D5ECFE]/60 text-[#01427C] hover:text-[#027DF7] text-xs sm:text-sm font-bold border border-[#E2E8F0] shadow-sm transition-all duration-200 hover:scale-102 group"
            >
              <span>{t.team.viewAllBoard}</span>
              <ArrowIcon className="w-4 h-4 text-[#027DF7] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
