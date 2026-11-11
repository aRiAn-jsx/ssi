/**
 * Ilya Saramad Capital Holding (هلدینگ سرآمد سرمایه ایلیا)
 * Domain: ssiholding.co
 * Parent Company: Saman Insurance (Private Joint Stock)
 * Design System: Liquid Glass (Glassmorphism 2.0) & Quiet Luxury
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassNavbar } from './components/GlassNavbar';
import { HeroSection } from './components/HeroSection';
import { StatisticsSection } from './components/StatisticsSection';
import { AboutSection } from './components/AboutSection';
import { VirgolWorkingGroupsSection } from './components/VirgolWorkingGroupsSection';
import { OrganizationalValuesSection } from './components/OrganizationalValuesSection';
import { IsoCertificationsSection } from './components/IsoCertificationsSection';
import { SubsidiariesSection } from './components/SubsidiariesSection';
import { NewsSection } from './components/NewsSection';
import { TeamSection } from './components/TeamSection';
import { FastSmsCtaBanner } from './components/FastSmsCtaBanner';
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

type View = 'home' | 'articles' | 'article' | 'consultation' | 'team';

type Route = { view: View; articleId?: string };

// Articles get real paths (/articles/<id>) so search engines index each one;
// the rest of the single-page site keeps its #section anchors.
export const articlePath = (id: string) => `/articles/${encodeURIComponent(id)}`;

// Resolve the route from the path first, then the hash, so deep links render
// the right page on first paint instead of flashing the home page.
const resolveRoute = (): Route => {
  if (typeof window === 'undefined') return { view: 'home' };
  const hash = window.location.hash.toLowerCase();
  // section hashes win, so in-page links work from an article URL too
  if (hash === '#articles') return { view: 'articles' };
  if (hash === '#consultation') return { view: 'consultation' };
  if (hash === '#team') return { view: 'team' };
  const m = window.location.pathname.match(/^\/articles\/([^/]+)\/?$/i);
  if (m) return { view: 'article', articleId: decodeURIComponent(m[1]) };
  if (hash.startsWith('#article/') || hash.startsWith('#articles/')) {
    return { view: 'article', articleId: hash.split('/')[1] || 'article-1' };
  }
  if (hash === '#articles') return { view: 'articles' };
  if (hash === '#consultation') return { view: 'consultation' };
  if (hash === '#team') return { view: 'team' };
  return { view: 'home' };
};

export default function App() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<View>(() => resolveRoute().view);
  const [activeArticleId, setActiveArticleId] = useState<string>(() => resolveRoute().articleId ?? 'article-1');
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

  // Keep the view in sync with the URL (path, hash, back/forward)
  useEffect(() => {
    const sync = () => {
      const route = resolveRoute();
      // leaving an article for a section anchor: drop the article path
      if (route.view !== 'article' && window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/' + window.location.hash);
      }
      setCurrentView(route.view);
      if (route.articleId) setActiveArticleId(route.articleId);
      if (route.view !== 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);

    const handleReplayPreloader = () => {
      setShowPreloader(true);
    };
    window.addEventListener('open-preloader', handleReplayPreloader);

    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
      window.removeEventListener('open-preloader', handleReplayPreloader);
    };
  }, []);

  const handleNavigateView = (
    view: 'home' | 'articles' | 'article' | 'consultation' | 'team',
    param?: string
  ) => {
    if (view === 'article') {
      const targetId = param || 'article-1';
      window.history.pushState(null, '', articlePath(targetId));
    } else if (view === 'articles') {
      window.history.pushState(null, '', '/#articles');
    } else if (view === 'consultation') {
      window.history.pushState(null, '', '/#consultation');
    } else if (view === 'team') {
      window.history.pushState(null, '', '/#team');
    } else {
      window.history.pushState(null, '', '/' + (param ? `#${param}` : ''));
      if (param) {
        setTimeout(() => {
          document.getElementById(param)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    const route = resolveRoute();
    setCurrentView(route.view);
    if (route.articleId) setActiveArticleId(route.articleId);
    if (view === 'article') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (id: string) => {
    handleNavigateView('article', id);
  };

  return (
    <div className="relative min-h-screen bg-[#F7FAFC] dark:bg-[#060D17] text-[#0A2540] dark:text-[#F8FAFC] font-sans selection:bg-[#027DF7]/20 selection:text-[#01427C] dark:selection:text-[#38BDF8] transition-colors duration-300 overflow-x-hidden max-w-full">
      {/* Liquid Glass Splash Preloader (Runs on initial entrance and selectable designs) */}
      {showPreloader && (
        <LiquidPreloader onComplete={() => setShowPreloader(false)} minDuration={1600} />
      )}

      {/* Micro-interaction: Custom Cursor (Optimized for desktop fine pointers) */}
      <CustomCursor />

      {/* Top Scroll Progress Bar & Side Section Navigation (Only on Home / Root page) */}
      {currentView === 'home' && <ScrollProgress />}

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
            {/* SECTION 1 — HERO (Preserved structure, updated official keywords & alt) */}
            <HeroSection
              introReady={!showPreloader}
              onGoToConsultation={() => handleNavigateView('consultation')}
              onGoToArticles={() => handleNavigateView('articles')}
            />

            {/* SECTION 2 — STATS & TRUST BAR / نوار شاخص‌های واقعی هلدینگ */}
            <StatisticsSection />

            {/* SECTION 3 — ABOUT / درباره هلدینگ سرآمد سرمایه ایلیا (تاسیس ۱۳۸۸/۰۸/۰۸) */}
            <AboutSection />

            {/* SECTION 4 — SUBSIDIARIES / شرکت‌های زیرمجموعه هلدینگ (انتقال‌یافته به جای دپارتمان‌ها) */}
            <SubsidiariesSection />

            {/* SECTION 5 — VIRGOL WORKING GROUPS / ۱۲ کارگروه تخصصی آکادمی ویرگول */}
            <VirgolWorkingGroupsSection onGoToConsultation={() => handleNavigateView('consultation')} />

            {/* SECTION 6 — VALUES / ارزش‌ها و اصول راهبردی هلدینگ ایلیا */}
            <OrganizationalValuesSection />

            {/* SECTION 7 — ISO CERTIFICATIONS / گواهینامه‌های بین‌المللی و استانداردها */}
            <IsoCertificationsSection />

            {/* SECTION 9 — TEAM / تیم مدیریت و ارکان راهبری هلدینگ */}
            <TeamSection
              onGoToTeamPage={() => handleNavigateView('team')}
              onGoToConsultation={() => handleNavigateView('consultation')}
            />

            {/* SECTION 10 — NEWS & ARTICLES / اخبار و مقالات تحلیلی */}
            <NewsSection
              onGoToArticles={() => handleNavigateView('articles')}
              onSelectArticle={handleSelectArticle}
            />

            {/* SECTION 10 — FAST SMS & CALL BANNER / بنر ارتباط سریع، سامانه پیامکی ۷۷۷ */}
            <FastSmsCtaBanner />
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <FooterSection onNavigateView={handleNavigateView} />

      {/* Agency Deliverables & Design Spec Modal */}
      <DesignSpecModal
        isOpen={isDesignSpecOpen}
        onClose={() => setIsDesignSpecOpen(false)}
      />
    </div>
  );
}
