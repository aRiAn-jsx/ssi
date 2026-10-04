import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  Briefcase,
  Layers,
  PieChart,
  Newspaper,
  Users,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  LayoutGrid,
  TrendingUp,
  BarChart3,
  MapPin,
  Mail,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
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
  const { language, setLanguage, isRtl, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const holdingInfo = getHoldingInfo(language);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarToolbarOpen, setSidebarToolbarOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  // EXACTLY & ONLY the routes with separate page views in the navbar
  const routeNavItems = [
    { id: 'home', label: t.nav.home, view: 'home' as const, icon: Building2 },
    { id: 'articles', label: t.nav.articles, view: 'articles' as const, badge: t.nav.researchBadge, icon: Newspaper },
    { id: 'team', label: t.nav.team, view: 'team' as const, icon: Users },
    { id: 'consultation', label: t.nav.consultation, view: 'consultation' as const, icon: Sparkles },
  ];

  // The non-route on-page sections housed exclusively in the sidebar toolbar
  const sidebarSections = [
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

  // Auto-hide on fast scroll down, reveal on scroll up
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

  // Lock scroll when mobile menu or sidebar toolbar is active
  useEffect(() => {
    if (mobileMenuOpen || sidebarToolbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, sidebarToolbarOpen]);

  const handleRouteClick = (item: {
    view: 'home' | 'articles' | 'consultation' | 'team';
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

    if (onNavigateView) {
      onNavigateView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionHref: string) => {
    setSidebarToolbarOpen(false);
    setMobileMenuOpen(false);

    const sectionId = sectionHref.replace('#', '');
    if (onNavigateView) {
      onNavigateView('home', sectionId);
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
      {/* ========================================================= */}
      {/* DESKTOP & MOBILE FLOATING CAPSULE HEADER                  */}
      {/* ========================================================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -110,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 md:px-8 pt-3 sm:pt-5 pointer-events-none"
      >
        <div className="w-full max-w-7xl pointer-events-auto px-3.5 sm:px-5 py-2.5 rounded-full flex items-center justify-between border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-xl shadow-[#01427C]/10 dark:shadow-black/60 backdrop-blur-xl bg-white/85 dark:bg-[#060D17]/90 transition-all duration-300">
          
          {/* Brand Logo & Title */}
          <button
            type="button"
            id="brand-logo-button"
            className={`flex items-center gap-2.5 sm:gap-3 group ${isRtl ? 'text-right' : 'text-left'}`}
            onClick={() => handleRouteClick({ id: 'home', view: 'home' })}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white dark:bg-[#081325] p-1 backdrop-blur-md border border-[#027DF7]/35 dark:border-[#027DF7]/60 shadow-md shadow-[#027DF7]/15 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#027DF7]/35 transition-all duration-300 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.webp"
                alt={holdingInfo.name}
                className="w-full h-full object-contain"
                width={40}
                height={40}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#01427C] dark:text-white tracking-tight group-hover:text-[#027DF7] dark:group-hover:text-[#38BDF8] transition-colors">
                  {holdingInfo.shortName}
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/25 text-[#01427C] dark:text-[#38BDF8] border border-[#027DF7]/25 dark:border-[#027DF7]/40 whitespace-nowrap">
                  {language === 'fa' ? 'سهامی عام' : 'PJSC'}
                </span>
              </div>
              <span className="text-[11.5px] font-medium text-[#64748B] dark:text-slate-300 hidden md:block whitespace-nowrap">
                {holdingInfo.name}
              </span>
            </div>
          </button>

          {/* Center: ONLY THE ROUTES with animated liquid pill */}
          <nav className="hidden lg:flex items-center gap-1.5 px-1 py-1">
            {routeNavItems.map((item, index) => {
              const isActive =
                item.view === currentView ||
                (item.view === 'articles' && currentView === 'article');
              const isHovered = hoveredNavIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-route-${item.id}`}
                  onMouseEnter={() => setHoveredNavIndex(index)}
                  onMouseLeave={() => setHoveredNavIndex(null)}
                  onClick={() => handleRouteClick(item)}
                  className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 z-10 select-none flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#01427C] dark:text-[#38BDF8]'
                      : isHovered
                      ? 'text-[#027DF7] dark:text-white'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#01427C] dark:hover:text-white'
                  }`}
                >
                  {/* Floating active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white dark:bg-[#027DF7]/30 shadow-sm border border-[#027DF7]/30 dark:border-[#38BDF8]/50 -z-10"
                    />
                  )}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHoverPill"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-[#D5ECFE]/50 dark:bg-[#027DF7]/20 border border-[#027DF7]/20 dark:border-[#38BDF8]/30 -z-10"
                    />
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#027DF7] text-white font-extrabold leading-tight shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Sidebar Toolbar Trigger, Language, Theme, & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* The Sidebar Toolbar Trigger Button (Sections without routes) */}
            <button
              type="button"
              id="open-sidebar-toolbar-btn"
              onClick={() => setSidebarToolbarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#01427C] dark:text-[#E0F2FE] bg-[#D5ECFE]/70 hover:bg-[#D5ECFE] dark:bg-[#027DF7]/20 dark:hover:bg-[#027DF7]/35 border border-[#027DF7]/35 dark:border-[#027DF7]/55 shadow-xs transition-all duration-200 hover:scale-102 active:scale-95 cursor-pointer"
              title={language === 'fa' ? 'مشاهده تول‌بار بخش‌های صفحه' : 'View Sections Toolbar'}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
              <span className="hidden sm:inline">
                {language === 'fa' ? 'تول‌بار بخش‌ها' : 'Sections'}
              </span>
            </button>

            {/* Quick Language Toggle */}
            <div className="flex items-center p-0.5 rounded-full bg-slate-100/80 dark:bg-[#071325]/90 border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-xs">
              <button
                type="button"
                id="lang-btn-fa"
                onClick={() => setLanguage('fa')}
                className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  language === 'fa'
                    ? 'bg-[#01427C] dark:bg-[#027DF7] text-white shadow-xs'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#01427C] dark:hover:text-white'
                }`}
              >
                فا
              </button>
              <button
                type="button"
                id="lang-btn-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#01427C] dark:bg-[#027DF7] text-white shadow-xs'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#01427C] dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              id="header-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[#01427C] dark:text-[#38BDF8] bg-slate-100/80 dark:bg-[#071325]/90 hover:bg-[#D5ECFE] dark:hover:bg-[#027DF7]/25 border border-[#027DF7]/25 dark:border-[#027DF7]/45 shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
              title={isDark ? t.nav.lightMode : t.nav.darkMode}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#027DF7]" />
              )}
            </button>

            {/* Clean Mobile Hamburger Button */}
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-slate-100/80 dark:bg-[#071325]/90 text-[#01427C] dark:text-[#38BDF8] hover:bg-[#D5ECFE] dark:hover:bg-[#027DF7]/25 border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-xs transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ========================================================= */}
      {/* SIDEBAR TOOLBAR DRAWER (Sections without routes)          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {sidebarToolbarOpen && (
          <div className="fixed inset-0 z-[80] overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarToolbarOpen(false)}
              className="absolute inset-0 bg-[#030A14]/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Sidebar Drawer */}
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`absolute inset-y-0 ${
                isRtl ? 'right-0 border-l' : 'left-0 border-r'
              } max-w-md w-full bg-white/95 dark:bg-[#071325]/95 backdrop-blur-2xl shadow-2xl border-[#027DF7]/30 dark:border-[#027DF7]/50 flex flex-col justify-between p-6 sm:p-7 overflow-y-auto ${
                isRtl ? 'text-right' : 'text-left'
              }`}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#027DF7]/20 dark:border-[#027DF7]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#027DF7] to-[#01427C] text-white flex items-center justify-center shadow-md shadow-[#027DF7]/20">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#01427C] dark:text-white">
                        {language === 'fa' ? 'تول‌بار بخش‌های صفحه' : 'Sections Toolbar'}
                      </h3>
                      <p className="text-[11.5px] text-[#64748B] dark:text-slate-300">
                        {language === 'fa' ? 'دسترسی سریع به بخش‌های داخلی هلدینگ' : 'Quick jump to on-page sections'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSidebarToolbarOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#D5ECFE] dark:bg-[#0D2038] dark:hover:bg-[#027DF7]/25 text-[#01427C] dark:text-[#E0F2FE] border border-[#027DF7]/20 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Non-route Sections Grid / List */}
                <div className="space-y-2 mb-6">
                  {sidebarSections.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        id={`sidebar-section-${item.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        onClick={() => handleSectionClick(item.href)}
                        className={`w-full ${
                          isRtl ? 'text-right' : 'text-left'
                        } p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B192F] hover:bg-[#D5ECFE]/40 dark:hover:bg-[#027DF7]/20 border border-[#027DF7]/20 dark:border-[#027DF7]/35 hover:border-[#027DF7]/50 transition-all flex items-start gap-3 group cursor-pointer shadow-2xs`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#027DF7]/10 dark:bg-[#027DF7]/25 text-[#027DF7] dark:text-[#38BDF8] group-hover:bg-[#027DF7] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#01427C] dark:text-[#E0F2FE] group-hover:text-[#027DF7] dark:group-hover:text-[#38BDF8] transition-colors mb-0.5">
                            {item.label}
                          </div>
                          <div className="text-[12px] text-[#64748B] dark:text-slate-300 leading-relaxed line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                        <ChevronIcon className="w-4 h-4 text-[#94A3B8] group-hover:-translate-x-1 transition-transform shrink-0 mt-2" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Toolbar Footer */}
              <div className="pt-4 border-t border-[#027DF7]/20 dark:border-[#027DF7]/30 space-y-2.5">
                {onOpenDesignDoc && (
                  <button
                    type="button"
                    onClick={() => {
                      setSidebarToolbarOpen(false);
                      onOpenDesignDoc();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#D5ECFE]/50 dark:bg-[#0D2038] dark:hover:bg-[#027DF7]/25 border border-[#027DF7]/20 text-[#01427C] dark:text-[#E0F2FE] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
                    <span>{t.drawer.designSystemBadge}</span>
                  </button>
                )}

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#091527] border border-[#027DF7]/15 dark:border-[#027DF7]/30 text-xs text-[#64748B] dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#01427C] dark:text-white font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
                    <span>{holdingInfo.phoneFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
                    <span className="font-mono text-[12px]">{holdingInfo.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MOBILE FULL-SCREEN SHEET (Routes on top, Sections below)  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#030A14]/70 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-x-3 top-3 bottom-3 max-w-lg mx-auto rounded-[28px] bg-white/95 dark:bg-[#071325]/95 backdrop-blur-2xl border border-[#027DF7]/35 dark:border-[#027DF7]/55 shadow-2xl flex flex-col justify-between p-5 overflow-hidden ${
                isRtl ? 'text-right' : 'text-left'
              }`}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Top Bar: Brand & Close */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#027DF7]/20 dark:border-[#027DF7]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#081325] p-1 shadow-sm border border-[#027DF7]/30 dark:border-[#027DF7]/50 flex items-center justify-center shrink-0">
                    <img
                      src="/logo.webp"
                      alt={holdingInfo.name}
                      className="w-full h-full object-contain"
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#01427C] dark:text-white leading-tight">
                      {holdingInfo.shortName}
                    </h3>
                    <p className="text-[11px] text-[#64748B] dark:text-slate-300">
                      {language === 'fa' ? 'منوی دسترسی و ناوبری' : 'Navigation Menu'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#D5ECFE] dark:bg-[#0D2038] dark:hover:bg-[#027DF7]/25 text-[#01427C] dark:text-[#E0F2FE] border border-[#027DF7]/20 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="py-3 space-y-4 overflow-y-auto max-h-[55vh]">
                {/* 1. Routes (صفحات اصلی) */}
                <div>
                  <span className="text-[11px] font-extrabold text-[#027DF7] dark:text-[#38BDF8] block mb-2 px-1">
                    {language === 'fa' ? 'صفحات اصلی (روت‌ها)' : 'Main Routes'}
                  </span>
                  <div className="space-y-1.5">
                    {routeNavItems.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive =
                        item.view === currentView ||
                        (item.view === 'articles' && currentView === 'article');

                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          onClick={() => handleRouteClick(item)}
                          className={`w-full px-4 py-2.5 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-[#027DF7]/15 dark:bg-[#027DF7]/25 text-[#027DF7] dark:text-[#38BDF8] font-black border border-[#027DF7]/30'
                              : 'text-[#01427C] dark:text-[#E0F2FE] hover:bg-slate-100/70 dark:hover:bg-[#0B1E38] font-bold border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-[#027DF7] text-white'
                                : 'bg-[#027DF7]/10 dark:bg-[#027DF7]/15 text-[#027DF7] dark:text-[#38BDF8]'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm">{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#027DF7] text-white font-extrabold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronIcon className="w-4 h-4 opacity-50" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. On-Page Sections (بخش‌های بدون روت در تول‌بار) */}
                <div className="pt-2 border-t border-[#027DF7]/15 dark:border-[#027DF7]/25">
                  <span className="text-[11px] font-extrabold text-[#64748B] dark:text-slate-300 block mb-2 px-1">
                    {language === 'fa' ? 'بخش‌های داخلی صفحه اصلی (تول‌بار)' : 'On-Page Sections (Toolbar)'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {sidebarSections.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleSectionClick(sec.href)}
                        className={`p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B192F] hover:bg-[#D5ECFE]/40 dark:hover:bg-[#027DF7]/20 border border-[#027DF7]/15 dark:border-[#027DF7]/30 text-xs font-bold text-[#01427C] dark:text-[#E0F2FE] flex items-center justify-between cursor-pointer ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      >
                        <span className="truncate">{sec.label}</span>
                        <ChevronIcon className="w-3 h-3 text-[#94A3B8]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Call & Consultation */}
              <div className="pt-3 border-t border-[#027DF7]/20 dark:border-[#027DF7]/30 space-y-2.5">
                <button
                  type="button"
                  id="mobile-drawer-consultation-btn"
                  onClick={() => handleRouteClick({ id: 'consultation', view: 'consultation' })}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#027DF7]/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.nav.bookConsultationShort}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${holdingInfo.phone}`}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 dark:bg-[#0D2038] text-[#01427C] dark:text-slate-200 border border-[#027DF7]/20 flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span className="font-semibold">{holdingInfo.phoneFormatted}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B] dark:text-slate-400">
                    {language === 'fa' ? 'تماس فوری' : 'Quick Call'}
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
