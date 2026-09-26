/**
 * Ilya Saramad Capital Holding (هلدینگ سرآمد سرمایه ایلیا)
 * Domain: ssiholding.co
 * Parent Company: Saman Insurance (Public Joint Stock)
 * Design System: Liquid Glass (Glassmorphism 2.0) & Quiet Luxury
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassNavbar } from './components/GlassNavbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { StatisticsSection } from './components/StatisticsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SubsidiariesSection } from './components/SubsidiariesSection';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { NewsSection } from './components/NewsSection';
import { TeamSection } from './components/TeamSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { DesignSpecModal } from './components/DesignSpecModal';
import { LiquidPreloader } from './components/LiquidPreloader';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { TeamPage } from './pages/TeamPage';
import { updatePageSeo } from './utils/seo';
import { useLanguage } from './context/LanguageContext';
import { BookOpen } from 'lucide-react';

export default function App() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<'home' | 'articles' | 'article' | 'consultation' | 'team'>('home');
  const [activeArticleId, setActiveArticleId] = useState<string>('article-1');
  const [isDesignSpecOpen, setIsDesignSpecOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(() => {
    try {
      return sessionStorage.getItem('saramad_preloader_seen') !== 'true';
    } catch {
      return true;
    }
  });

  // Synchronize SEO Meta Tags with current route, active language & specific article
  useEffect(() => {
    updatePageSeo(currentView, language, activeArticleId);
  }, [currentView, language, activeArticleId]);

  // Sync with URL Hash on load and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      
      // Match #article/id or #articles/id or #article-id
      if (hash.startsWith('#article/') || hash.startsWith('#articles/')) {
        const parts = hash.split('/');
        const articleId = parts[1] || 'article-1';
        setActiveArticleId(articleId);
        setCurrentView('article');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#articles') {
        setCurrentView('articles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#consultation') {
        setCurrentView('consultation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#team') {
        setCurrentView('team');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '#home') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateView = (
    view: 'home' | 'articles' | 'article' | 'consultation' | 'team',
    param?: string
  ) => {
    setCurrentView(view);
    if (view === 'article') {
      const targetId = param || 'article-1';
      setActiveArticleId(targetId);
      window.location.hash = `article/${targetId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'articles') {
      window.location.hash = 'articles';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'consultation') {
      window.location.hash = 'consultation';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'team') {
      window.location.hash = 'team';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = param ? param : 'home';
      if (param) {
        setTimeout(() => {
          const el = document.getElementById(param);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSelectArticle = (id: string) => {
    handleNavigateView('article', id);
  };

  return (
    <div className="relative min-h-screen bg-[#F7FAFC] text-[#0A2540] font-sans selection:bg-[#027DF7]/20 selection:text-[#01427C]">
      {/* Liquid Glass Splash Preloader (Runs only once on initial entrance) */}
      {showPreloader && (
        <LiquidPreloader onComplete={() => setShowPreloader(false)} minDuration={1100} />
      )}

      {/* Micro-interaction: Custom Cursor (Optimized for desktop fine pointers) */}
      <CustomCursor />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* FLOATING GLASS HEADER */}
      <GlassNavbar
        currentView={currentView}
        onNavigateView={handleNavigateView}
        onOpenDesignDoc={() => setIsDesignSpecOpen(true)}
      />

      {/* Page Content View Switching with Motion Fade */}
      <AnimatePresence mode="wait">
        {currentView === 'article' ? (
          <motion.div
            key={`article-detail-${activeArticleId}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <ArticleDetailPage
              articleId={activeArticleId}
              onBackToArticles={() => handleNavigateView('articles')}
              onGoToHome={() => handleNavigateView('home')}
              onSelectArticle={handleSelectArticle}
              onGoToConsultation={() => handleNavigateView('consultation')}
            />
          </motion.div>
        ) : currentView === 'articles' ? (
          <motion.div
            key="articles-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <ArticlesPage
              onBackToHome={() => handleNavigateView('home')}
              onGoToConsultation={() => handleNavigateView('consultation')}
              onSelectArticle={handleSelectArticle}
            />
          </motion.div>
        ) : currentView === 'consultation' ? (
          <motion.div
            key="consultation-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <ConsultationPage
              onBackToHome={() => handleNavigateView('home')}
              onGoToArticles={() => handleNavigateView('articles')}
            />
          </motion.div>
        ) : currentView === 'team' ? (
          <motion.div
            key="team-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <TeamPage
              onBackToHome={() => handleNavigateView('home')}
              onGoToConsultation={() => handleNavigateView('consultation')}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full overflow-hidden"
          >
            {/* SECTION 1 — HERO (Interactive Polygonal Pattern, Mouse & Scroll Reactive) */}
            <HeroSection
              onGoToConsultation={() => handleNavigateView('consultation')}
              onGoToArticles={() => handleNavigateView('articles')}
            />

            {/* SECTION 2 — ABOUT / درباره ما */}
            <AboutSection />

            {/* SECTION 3 — SERVICES / خدمات */}
            <ServicesSection />

            {/* SECTION 4 — STATISTICS / آمار */}
            <StatisticsSection />

            {/* SECTION 5 — PORTFOLIO / نمونه سرمایه‌گذاری‌ها */}
            <PortfolioSection />

            {/* SECTION 6 — SUBSIDIARIES / شرکت‌های تابعه */}
            <SubsidiariesSection />

            {/* SECTION 7 — PERFORMANCE DASHBOARD */}
            <PerformanceDashboard />

            {/* SECTION 8 — NEWS / اخبار و مقالات تحلیلی */}
            <NewsSection
              onGoToArticles={() => handleNavigateView('articles')}
              onSelectArticle={handleSelectArticle}
            />

            {/* SECTION 9 — TEAM / تیم مدیریت */}
            <TeamSection onGoToTeamPage={() => handleNavigateView('team')} />

            {/* SECTION 10 — FINAL CTA / فرم تماس و مشاوره */}
            <CtaSection onGoToConsultation={() => handleNavigateView('consultation')} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <FooterSection onNavigateView={handleNavigateView} />

      {/* Quick Access Floating Pill for Design Specs & Deliverables Review */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsDesignSpecOpen(true)}
          id="floating-spec-toggle-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full liquid-glass-card hover:bg-white text-[#01427C] text-xs font-bold shadow-lg shadow-[#01427C]/10 border border-white/80 transition-all duration-300 hover:scale-105"
        >
          <BookOpen className="w-4 h-4 text-[#027DF7]" />
          <span>مشاهده مستندات فنی و Lottie</span>
        </button>
      </div>

      {/* Agency Deliverables & Design Spec Modal */}
      <DesignSpecModal
        isOpen={isDesignSpecOpen}
        onClose={() => setIsDesignSpecOpen(false)}
      />
    </div>
  );
}
