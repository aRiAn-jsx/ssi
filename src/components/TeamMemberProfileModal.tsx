import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Briefcase, ExternalLink, MessageCircle, Send, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import type { TeamPerson } from '../data/teamData';
import { useLanguage } from '../context/LanguageContext';

interface TeamMemberProfileModalProps {
  person: (TeamPerson & { displayName: string; displayRole: string; displayBio: string; displaySkills: string[]; displayExperience: string }) | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToConsultation?: () => void;
}

export const TeamMemberProfileModal: React.FC<TeamMemberProfileModalProps> = ({
  person,
  isOpen,
  onClose,
  onGoToConsultation,
}) => {
  const { language, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!person) return null;

  const placementLabel = {
    lead: language === 'fa' ? 'مدیریت ارشد و استراتژیک' : 'Executive Leadership',
    advisor: language === 'fa' ? 'مشاور عالی هیئت‌مدیره' : 'Senior Board Advisor',
    executive: language === 'fa' ? 'مدیریت دپارتمان تخصصی' : 'Executive Department Manager',
    member: language === 'fa' ? 'متخصص و عضو کلیدی تیم' : 'Key Team Specialist',
  }[person.placement];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={person.displayName}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030A14]/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[36px] bg-white/95 dark:bg-[#071325]/95 backdrop-blur-2xl border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-2xl shadow-[#01427C]/25 dark:shadow-black/80 z-10 flex flex-col p-6 sm:p-8 md:p-10 ${
              isRtl ? 'text-right' : 'text-left'
            }`}
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#027DF7]/15 dark:bg-[#027DF7]/25 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#01427C]/10 dark:bg-[#01427C]/30 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={language === 'fa' ? 'بستن' : 'Close'}
              className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-[#D5ECFE] dark:bg-[#0D2038] dark:hover:bg-[#027DF7]/30 text-[#01427C] dark:text-[#E0F2FE] border border-[#027DF7]/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Profile Header (Photo + Identity) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-6 border-b border-[#027DF7]/20 dark:border-[#027DF7]/30">
              {/* Photo Frame */}
              <div className="relative shrink-0 group">
                <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-[#01427C]/20 border-2 border-[#027DF7]/40 dark:border-[#027DF7]/60 bg-gradient-to-b from-[#D5ECFE] to-[#01427C]/30 relative">
                  <img
                    src={person.image}
                    alt={person.displayName}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012140]/40 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-2.5 inset-x-2 py-0.5 sm:py-1 rounded-full bg-[#027DF7] text-white text-[10px] sm:text-[11px] font-bold text-center shadow-md">
                  {person.nameEn}
                </div>
              </div>

              {/* Identity & Placement */}
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-start pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] border border-[#027DF7]/30 text-xs font-bold mb-2.5">
                  <Award className="w-3.5 h-3.5 text-[#027DF7]" />
                  <span>{placementLabel}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01427C] dark:text-white leading-tight mb-1">
                  {person.displayName}
                </h2>

                <p className="text-sm sm:text-base font-semibold text-[#027DF7] dark:text-[#38BDF8] mb-3">
                  {person.displayRole}
                </p>

                {person.displayExperience && (
                  <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-slate-300 mb-4">
                    <Briefcase className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span>{person.displayExperience}</span>
                  </div>
                )}

                {/* Minimal Quick Social Links */}
                <div className="flex items-center gap-2.5 pt-1">
                  {/* Telegram */}
                  <a
                    href={person.telegram || 'https://t.me/saramad_ilya'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#027DF7]/10 hover:bg-[#027DF7] text-[#027DF7] hover:text-white dark:bg-[#027DF7]/20 dark:text-[#38BDF8] dark:hover:bg-[#027DF7] dark:hover:text-white border border-[#027DF7]/30 text-xs font-bold transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                    </svg>
                    <span>{language === 'fa' ? 'تلگرام' : 'Telegram'}</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href={person.instagram || 'https://instagram.com/saramad_holding'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-pink-600 hover:text-white dark:bg-pink-500/20 dark:text-pink-400 dark:hover:text-white border border-pink-500/30 text-xs font-bold transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>{language === 'fa' ? 'اینستاگرام' : 'Instagram'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Body */}
            <div className="py-6 space-y-6">
              {/* Bio Section */}
              <div>
                <h3 className="text-sm font-bold text-[#01427C] dark:text-[#E0F2FE] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7]" />
                  <span>{language === 'fa' ? 'درباره و شرح مسئولیت‌ها' : 'Biography & Responsibilities'}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
                  {person.displayBio}
                </p>
              </div>

              {/* Competencies / Skills */}
              {person.displaySkills && person.displaySkills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#01427C] dark:text-[#E0F2FE] mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7]" />
                    <span>{language === 'fa' ? 'حوزه‌های تخصص و مهارت‌های کلیدی' : 'Core Competencies & Expertise'}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {person.displaySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-[#027DF7]/10 dark:bg-[#027DF7]/20 text-[#01427C] dark:text-[#38BDF8] border border-[#027DF7]/25 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Affiliation Note */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#D5ECFE]/40 to-transparent dark:from-[#027DF7]/10 dark:to-transparent border border-[#027DF7]/20 flex items-center justify-between text-xs text-[#64748B] dark:text-slate-300">
                <span>
                  {language === 'fa'
                    ? 'هلدینگ سرآمد سرمایه ایلیا (سهامی عام)'
                    : 'Saramad Capital Ilya Holding (P.J.S.C)'}
                </span>
                <span className="font-semibold text-[#027DF7] dark:text-[#38BDF8]">
                  {language === 'fa' ? 'تیم سازمانی' : 'Corporate Team'}
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#027DF7]/20 dark:border-[#027DF7]/30 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#0D2038] dark:hover:bg-[#027DF7]/20 text-[#01427C] dark:text-[#E0F2FE] text-xs font-bold transition-colors"
              >
                {language === 'fa' ? 'بستن پنجره' : 'Close window'}
              </button>

              {onGoToConsultation && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToConsultation();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-lg shadow-[#027DF7]/30 hover:shadow-[#027DF7]/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>{language === 'fa' ? 'درخواست ارتباط و جلسه' : 'Request a Meeting'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
