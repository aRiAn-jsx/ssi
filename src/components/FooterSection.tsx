import React, { useState } from 'react';
import { ArrowUp, ArrowUpLeft, ArrowUpRight, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { getHoldingInfo } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface FooterSectionProps {
  onNavigateView?: (view: 'home' | 'articles' | 'article' | 'consultation' | 'team', sectionId?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigateView }) => {
  const { language, isRtl, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const holdingInfo = getHoldingInfo(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const handleLinkClick = (view: 'home' | 'articles' | 'article' | 'consultation' | 'team', sectionId?: string) => {
    if (onNavigateView) {
      onNavigateView(view, sectionId);
    }
    if (view === 'home' && sectionId) {
      const target = document.querySelector(`#${sectionId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#01427C] text-white pt-20 pb-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-cover bg-center filter blur-md"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1600&q=80')`,
        }}
        aria-hidden="true"
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#027DF7]/30">
          {/* Column 1: About Holding (4 cols) */}
          <div className={`lg:col-span-4 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-5 ${isRtl ? '' : 'flex-row'}`}>
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-[#027DF7]/40 p-1.5 flex items-center justify-center text-white shadow-md shadow-[#01427C]/30 shrink-0">
                <img
                  src="/logo.webp"
                  alt={language === 'fa' ? holdingInfo.nameFa : holdingInfo.nameEn}
                  className="w-full h-full object-contain filter drop-shadow-xs brightness-110"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {language === 'fa' ? holdingInfo.nameFa : holdingInfo.nameEn}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D5ECFE]/80 leading-relaxed mb-6 font-normal">
              {holdingInfo.subTagline}
            </p>

            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-[#027DF7]/30 text-xs text-[#D5ECFE]">
              <ShieldCheck className="w-4 h-4 text-[#027DF7] shrink-0" />
              <span>{holdingInfo.license}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className={`lg:col-span-2 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="text-sm font-bold text-white mb-5 pb-2 border-b border-[#027DF7]/30">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3 text-xs text-[#D5ECFE]/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('articles')}
                  className={`hover:text-[#027DF7] transition-colors flex items-center gap-1 font-semibold text-white ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <span>{t.nav.articles}</span>
                  <span className="text-[12px] px-1.5 py-0.2 rounded-full bg-[#027DF7] text-white">
                    {language === 'fa' ? 'ویژه' : 'Featured'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('consultation')}
                  className={`hover:text-[#027DF7] transition-colors flex items-center gap-1 font-semibold text-white ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <span>{t.nav.consultation}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('team')}
                  className={`hover:text-[#027DF7] transition-colors flex items-center gap-1 font-semibold text-white ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <span>{t.nav.team}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'about')}
                  className={`hover:text-[#027DF7] transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'services')}
                  className={`hover:text-[#027DF7] transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'portfolio')}
                  className={`hover:text-[#027DF7] transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'subsidiaries')}
                  className={`hover:text-[#027DF7] transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  {t.nav.subsidiaries}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Subsidiaries & Contact (3 cols) */}
          <div className={`lg:col-span-3 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="text-sm font-bold text-white mb-5 pb-2 border-b border-[#027DF7]/30">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-3.5 text-xs text-[#D5ECFE]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#027DF7] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{holdingInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#027DF7] shrink-0" />
                <a
                  href={`tel:${holdingInfo.phone}`}
                  dir="ltr"
                  className="font-bold text-white hover:text-[#027DF7] transition-colors"
                >
                  {holdingInfo.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#027DF7] shrink-0" />
                <a
                  href={`mailto:${holdingInfo.email}`}
                  className="font-mono text-white hover:text-[#027DF7] transition-colors"
                >
                  {holdingInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#027DF7] shrink-0" />
                <span>{holdingInfo.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social (3 cols) */}
          <div className={`lg:col-span-3 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="text-sm font-bold text-white mb-5 pb-2 border-b border-[#027DF7]/30">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-[#D5ECFE]/70 mb-4 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            {!newsletterSubscribed ? (
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="flex items-center p-1 rounded-2xl bg-white/10 border border-[#027DF7]/40 backdrop-blur-md">
                  <input
                    type="email"
                    id="footer-newsletter-email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    required
                    className={`w-full px-3 py-2 text-xs text-white placeholder:text-white/50 bg-transparent outline-none font-medium ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                  <button
                    type="submit"
                    id="footer-newsletter-btn"
                    className="shrink-0 p-2.5 rounded-xl bg-[#027DF7] text-white hover:bg-white hover:text-[#01427C] transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#D5ECFE] text-xs font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{t.footer.subscribedSuccess}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-[#D5ECFE]">
              <span>{t.footer.affiliatedWith}</span>
              <span className="font-bold text-white">{holdingInfo.parentCompany}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright + Back-to-Top Floating Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D5ECFE]/60">
          <div className="text-center sm:text-right">
            {language === 'fa' 
              ? `کلیه حقوق مادی و معنوی متعلق به ${holdingInfo.nameFa} (سهامی عام) است. © ۲۰۲۶`
              : `All rights reserved for ${holdingInfo.nameEn} (Public Joint Stock). © 2026`}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            id="back-to-top-btn"
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-card bg-white/10 hover:bg-white/20 text-white border border-[#027DF7]/40 transition-all hover:scale-105"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-4 h-4 text-[#027DF7]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
