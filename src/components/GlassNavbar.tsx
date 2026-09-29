import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowUpLeft,
  ArrowUpRight,
  BookOpen,
  LayoutGrid,
  Building2,
  Briefcase,
  TrendingUp,
  PieChart,
  Layers,
  BarChart3,
  Newspaper,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getHoldingInfo } from '../data/mockData';

interface GlassNavbarProps {
  currentView?: 'home' | 'articles' | 'article' | 'consultation' | 'team';
  onNavigateView?: (view: 'home' | 'articles' | 'article' | 'consultation' | 'team', sectionId?: string) => void;
  onOpenDesignDoc?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  currentView = 'home',
  onNavigateView,
  onOpenDesignDoc,
}) => {
  const { language, setLanguage, toggleLanguage, isRtl, t } = useLanguage();
  const holdingInfo = getHoldingInfo(language);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarToolbarOpen, setSidebarToolbarOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  // EXACTLY the 4 requested items in the visible header navigation
  const mainNavItems = [
    { id: 'home', label: t.nav.home, view: 'home' as const, href: '#home' },
    { id: 'articles', label: t.nav.articles, view: 'articles' as const, badge: t.nav.researchBadge },
    { id: 'consultation', label: t.nav.consultation, view: 'consultation' as const },
    { id: 'team', label: t.nav.team, view: 'team' as const },
  ];

  // All other sections housed in the sidebar drawer toolbar
  const sidebarToolbarItems = [
    {
      id: 'about',
      label: t.drawer.about.label,
      description: t.drawer.about.desc,
      href: '#about',
      icon: Building2,
    },
    {
      id: 'services',
      label: t.drawer.services.label,
      description: t.drawer.services.desc,
      href: '#services',
      icon: Briefcase,
    },
    {
      id: 'stats',
      label: t.drawer.stats.label,
      description: t.drawer.stats.desc,
      href: '#stats',
      icon: TrendingUp,
    },
    {
      id: 'portfolio',
      label: t.drawer.portfolio.label,
      description: t.drawer.portfolio.desc,
      href: '#portfolio',
      icon: PieChart,
    },
    {
      id: 'subsidiaries',
      label: t.drawer.subsidiaries.label,
      description: t.drawer.subsidiaries.desc,
      href: '#subsidiaries',
      icon: Layers,
    },
    {
      id: 'dashboard',
      label: t.drawer.dashboard.label,
      description: t.drawer.dashboard.desc,
      href: '#dashboard',
      icon: BarChart3,
    },
    {
      id: 'news',
      label: t.drawer.news.label,
      description: t.drawer.news.desc,
      href: '#news',
      icon: Newspaper,
    },
    {
      id: 'contact',
      label: t.drawer.contact.label,
      description: t.drawer.contact.desc,
      href: '#contact',
      icon: MapPin,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleItemClick = (item: {
    view: 'home' | 'articles' | 'consultation' | 'team';
    href?: string;
    id: string;
  }) => {
    setMobileMenuOpen(false);
    setSidebarToolbarOpen(false);

    if (item.view !== 'home') {
      if (onNavigateView) {
        onNavigateView(item.view);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to Home view or section inside Home
    if (onNavigateView) {
      onNavigateView('home', item.href ? item.href.replace('#', '') : undefined);
    }

    if (currentView === 'home' && item.href) {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSidebarItemClick = (sectionHref: string) => {
    setSidebarToolbarOpen(false);
    setMobileMenuOpen(false);

    if (onNavigateView) {
      onNavigateView('home', sectionHref.replace('#', ''));
    }

    setTimeout(() => {
      const el = document.querySelector(sectionHref);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -110,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 md:px-8 pt-4 md:pt-6 pointer-events-none"
      >
        <div className="w-full max-w-7xl liquid-glass-navbar pointer-events-auto px-3.5 sm:px-4 md:px-7 py-2.5 md:py-3 rounded-2xl md:rounded-full flex items-center justify-between transition-all duration-300">
          {/* Brand Logo */}
          <button
            type="button"
            id="brand-logo-button"
            className={`flex items-center gap-2.5 md:gap-3 group ${isRtl ? 'text-right' : 'text-left'}`}
            onClick={() => handleItemClick({ id: 'home', view: 'home', href: '#home' })}
          >
            {/* Holding Official Logo with Liquid Glass Glow */}
            <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-white/90 p-1 backdrop-blur-md border border-white/90 shadow-md shadow-[#027DF7]/20 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#027DF7]/30 transition-all duration-300 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.webp"
                alt={holdingInfo.name}
                className="w-full h-full object-contain filter drop-shadow-xs"
                width={44}
                height={44}
              />
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-[#027DF7]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base md:text-lg text-[#01427C] tracking-tight group-hover:text-[#027DF7] transition-colors">
                  {holdingInfo.shortName}
                </span>
                <span className="text-[12px] md:text-[12px] font-semibold px-1.5 md:px-2 py-0.5 rounded-full bg-[#D5ECFE]/80 text-[#01427C] border border-[#027DF7]/20 whitespace-nowrap">
                  {language === 'fa' ? 'سهامی عام' : 'PJSC'}
                </span>
              </div>
              <span className="text-[13px] font-medium text-[#64748B] hidden sm:block whitespace-nowrap">
                {holdingInfo.name}
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 relative px-3 py-1 rounded-full bg-white/40 border border-white/60">
            {mainNavItems.map((item, index) => {
              const isActive =
                item.view === currentView ||
                (item.view === 'articles' && currentView === 'article');
              const isHovered = hoveredNavIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-link-${item.id}`}
                  onMouseEnter={() => setHoveredNavIndex(index)}
                  onMouseLeave={() => setHoveredNavIndex(null)}
                  onClick={() => handleItemClick(item)}
                  className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 z-10 select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#01427C]'
                      : isHovered
                      ? 'text-[#027DF7]'
                      : 'text-[#0A2540]/80 hover:text-[#01427C]'
                  }`}
                >
                  {/* Liquid bubble pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBubble"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D5ECFE] to-white/90 shadow-sm border border-white/90 -z-10"
                    />
                  )}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverBubble"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="absolute inset-0 rounded-full bg-[#D5ECFE]/40 -z-10"
                    />
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[12px] px-1.5 py-0.2 rounded-full bg-[#027DF7] text-white font-extrabold leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right/End Controls: Language Toggle, Sidebar Toolbar Trigger, CTA (Desktop only) & Hamburger (Mobile) */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Button (Desktop only) */}
            <div
              id="language-toggle-wrapper"
              className="hidden lg:flex items-center p-0.5 rounded-full bg-white/80 border border-[#E2E8F0] shadow-xs backdrop-blur-md"
              title={language === 'fa' ? 'تغییر زبان به انگلیسی (Switch to English)' : 'تغییر زبان به فارسی (Switch to Persian)'}
            >
              <button
                type="button"
                id="lang-btn-fa"
                onClick={() => setLanguage('fa')}
                className={`relative px-2.5 py-1 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                  language === 'fa'
                    ? 'text-[#01427C] shadow-xs'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                {language === 'fa' && (
                  <motion.div
                    layoutId="activeLanguagePill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#D5ECFE] border border-[#027DF7]/25 -z-10"
                  />
                )}
                <span>فا</span>
              </button>

              <button
                type="button"
                id="lang-btn-en"
                onClick={() => setLanguage('en')}
                className={`relative px-2.5 py-1 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                  language === 'en'
                    ? 'text-[#01427C] shadow-xs'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                {language === 'en' && (
                  <motion.div
                    layoutId="activeLanguagePill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#D5ECFE] border border-[#027DF7]/25 -z-10"
                  />
                )}
                <span>EN</span>
              </button>
            </div>

            {/* The Sidebar Toolbar Trigger Button (Desktop only) - Icon only */}
            <button
              type="button"
              id="open-sidebar-toolbar-btn"
              onClick={() => setSidebarToolbarOpen(true)}
              className="hidden lg:flex items-center justify-center p-2 rounded-full text-[#01427C] bg-white/80 hover:bg-[#D5ECFE]/80 border border-[#E2E8F0] shadow-xs transition-all duration-200 hover:scale-105 group cursor-pointer"
              title={t.nav.otherSections}
              aria-label={t.nav.otherSections}
            >
              <LayoutGrid className="w-4 h-4 text-[#027DF7] group-hover:rotate-12 transition-transform" />
            </button>

            {/* Primary Action Button (Desktop only) */}
            <button
              type="button"
              id="cta-nav-button"
              onClick={() => handleItemClick({ id: 'consultation', view: 'consultation' })}
              className="hidden lg:flex relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs md:text-sm font-semibold shadow-md shadow-[#027DF7]/25 hover:shadow-lg hover:shadow-[#027DF7]/40 transition-all duration-300 hover:scale-102 items-center gap-1.5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span>{t.nav.bookConsultationShort}</span>
              <ArrowIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile-Only Clean Hamburger Button */}
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/90 text-[#01427C] hover:bg-[#D5ECFE]/80 border border-[#E2E8F0] shadow-xs transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ========================================================= */}
      {/* SIDEBAR TOOLBAR DRAWER */}
      {/* ========================================================= */}
      <AnimatePresence>
        {sidebarToolbarOpen && (
          <div className="fixed inset-0 z-[70] overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarToolbarOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`absolute inset-y-0 ${
                isRtl ? 'right-0 border-l' : 'left-0 border-r'
              } max-w-md w-full bg-white/95 backdrop-blur-xl shadow-2xl border-[#E2E8F0] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto`}
            >
              {/* Drawer Top */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#027DF7]/10 text-[#027DF7] flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#01427C]">{t.nav.menuTitle}</h3>
                      <p className="text-[13px] text-[#64748B]">{t.nav.menuSubtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Language Switcher inside Drawer */}
                    <button
                      type="button"
                      onClick={toggleLanguage}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F0F7FF] text-[#01427C] border border-[#D5ECFE] hover:bg-[#D5ECFE] transition-colors flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#027DF7]" />
                      <span>{language === 'fa' ? 'English' : 'فارسی'}</span>
                    </button>

                    <button
                      type="button"
                      id="close-sidebar-toolbar-btn"
                      onClick={() => setSidebarToolbarOpen(false)}
                      className="p-2 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#01427C] transition-colors"
                      title={t.nav.close}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 4 Main pages pill row inside toolbar */}
                <div className="mb-6 p-3 rounded-2xl bg-[#F0F7FF] border border-[#D5ECFE]">
                  <div className="text-[13px] font-bold text-[#01427C] mb-2">{t.drawer.holdingGroupTitle}:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {mainNavItems.map((nav) => (
                      <button
                        key={nav.id}
                        type="button"
                        onClick={() => handleItemClick(nav)}
                        className={`p-2 rounded-xl text-xs font-bold ${
                          isRtl ? 'text-right' : 'text-left'
                        } transition-colors flex items-center justify-between ${
                          currentView === nav.view
                            ? 'bg-[#01427C] text-white'
                            : 'bg-white text-[#01427C] hover:bg-[#D5ECFE]/60'
                        }`}
                      >
                        <span>{nav.label}</span>
                        <ChevronIcon className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other sections list */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-[#64748B] px-1 mb-2">{t.nav.otherSections}:</div>
                  {sidebarToolbarItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        id={`sidebar-item-${item.id}`}
                        onClick={() => handleSidebarItemClick(item.href)}
                        className={`w-full ${
                          isRtl ? 'text-right' : 'text-left'
                        } p-3 rounded-2xl bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#027DF7]/30 transition-all flex items-start gap-3 group shadow-2xs`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F0F7FF] text-[#027DF7] group-hover:bg-[#027DF7] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors mb-0.5">
                            {item.label}
                          </div>
                          <div className="text-[13px] text-[#64748B] leading-relaxed line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                        <ChevronIcon className="w-4 h-4 text-[#94A3B8] group-hover:-translate-x-1 transition-transform shrink-0 mt-2.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom: Quick Info & Documentation */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                {onOpenDesignDoc && (
                  <button
                    type="button"
                    onClick={() => {
                      setSidebarToolbarOpen(false);
                      onOpenDesignDoc();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] text-[#01427C] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#027DF7]" />
                    <span>{t.drawer.designSystemBadge} ({t.drawer.designSystemDesc})</span>
                  </button>
                )}

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] space-y-2">
                  <div className="flex items-center gap-2 text-[#01427C] font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span>{t.drawer.headquartersTitle}: {holdingInfo.phoneFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span className="font-mono text-[13px]">{holdingInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span>{holdingInfo.workingHours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* Mobile Full-Screen Glass Overlay Menu */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#F7FAFC]/98 backdrop-blur-2xl flex flex-col justify-between px-5 pt-5 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-3.5">
              {/* Mobile Menu Top Header with Brand Logo and Prominent Close Button */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <img
                      src="/logo.webp"
                      alt={holdingInfo.name}
                      className="w-full h-full object-contain"
                      width={36}
                      height={36}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#01427C] leading-tight">
                      {holdingInfo.shortName}
                    </span>
                    <span className="text-[12px] text-[#64748B]">
                      {language === 'fa' ? 'منوی دسترسی سریع' : 'Quick Navigation'}
                    </span>
                  </div>
                </div>

                {/* Prominent Close Button */}
                <button
                  type="button"
                  id="mobile-menu-close-top-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-4 h-4" />
                  <span className="text-xs font-bold">{t.nav.close}</span>
                </button>
              </div>

              {/* Primary Mobile CTA Button */}
              <button
                type="button"
                id="mobile-drawer-cta-btn"
                onClick={() => handleItemClick({ id: 'consultation', view: 'consultation' })}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-sm font-extrabold shadow-md shadow-[#027DF7]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
              >
                <span>{t.nav.bookConsultationShort}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              {/* Language Switcher in Mobile Header */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F0F7FF] border border-[#D5ECFE]">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#027DF7]" />
                  <span className="text-xs font-bold text-[#01427C]">Language / انتخاب زبان</span>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#D5ECFE]">
                  <button
                    type="button"
                    onClick={() => setLanguage('fa')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      language === 'fa' ? 'bg-[#01427C] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    فارسی
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      language === 'en' ? 'bg-[#01427C] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* 4 Main highlighted items */}
              <div className="pt-2">
                <div className="text-xs font-extrabold text-[#01427C] px-1 mb-2 flex items-center justify-between">
                  <span>{t.nav.menuTitle}</span>
                  <span className="text-[12px] text-[#027DF7] bg-[#D5ECFE]/60 px-2 py-0.5 rounded-full font-bold">
                    {t.nav.menuSubtitle}
                  </span>
                </div>

                <div className="space-y-2">
                  {mainNavItems.map((link) => {
                    const isSelected =
                      link.view === currentView ||
                      (link.view === 'articles' && currentView === 'article');
                    return (
                      <button
                        key={link.id}
                        type="button"
                        id={`mobile-main-${link.id}`}
                        onClick={() => handleItemClick(link)}
                        className={`w-full ${
                          isRtl ? 'text-right' : 'text-left'
                        } px-4 py-3 text-sm font-bold rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#01427C] text-white shadow-sm'
                            : 'bg-white text-[#01427C] hover:bg-[#D5ECFE]/40 border border-[#E2E8F0]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.label}</span>
                          {link.badge && (
                            <span
                              className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-[#D5ECFE] text-[#01427C]'
                              }`}
                            >
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <ArrowIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#64748B]'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Other sections collapsible list */}
              <div className="pt-2">
                <div className="text-xs font-extrabold text-[#64748B] px-1 mb-2">
                  {t.nav.otherSections}:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sidebarToolbarItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSidebarItemClick(item.href)}
                      className={`p-2.5 rounded-xl bg-white border border-[#E2E8F0] ${
                        isRtl ? 'text-right' : 'text-left'
                      } text-xs font-bold text-[#01427C] hover:bg-[#F0F7FF] transition-colors flex items-center justify-between cursor-pointer`}
                    >
                      <span className="truncate">{item.label}</span>
                      <ChevronIcon className="w-3.5 h-3.5 text-[#94A3B8]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#E2E8F0] flex flex-col gap-2.5">
              {/* Bottom Quick Close Button */}
              <button
                type="button"
                id="mobile-menu-close-bottom-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#01427C] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4 text-[#01427C]" />
                <span>{language === 'fa' ? 'بستن منو' : 'Close Menu'}</span>
              </button>

              {onOpenDesignDoc && (
                <button
                  type="button"
                  id="mobile-open-design-spec"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDesignDoc();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E2E8F0] text-[#01427C] font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#027DF7]" />
                  <span>{t.drawer.designSystemBadge}</span>
                </button>
              )}

              <div className="text-center text-[13px] text-[#64748B] font-medium">
                {holdingInfo.name} • {holdingInfo.phoneFormatted}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
