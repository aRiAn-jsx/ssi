import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  Send,
  User,
  Quote,
  TrendingUp,
  Tag,
  ChevronDown,
  ChevronUp,
  Type,
  Copy,
  Check,
  Building2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getArticleById, getArticlesData } from '../data/articlesData';
import { ArticleItem, ArticleComment } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ArticleDetailPageProps {
  articleId: string;
  onBackToArticles: () => void;
  onGoToHome: () => void;
  onSelectArticle: (id: string) => void;
  onGoToConsultation: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  articleId,
  onBackToArticles,
  onGoToHome,
  onSelectArticle,
  onGoToConsultation,
}) => {
  const { language, isRtl, t } = useLanguage();
  const article = useMemo(() => getArticleById(articleId, language), [articleId, language]);
  const allArticles = useMemo(() => getArticlesData(language), [language]);

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);
  // Mobile text size adjuster: 'normal' | 'large' | 'xlarge'
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  // Reactions state
  const [reactions, setReactions] = useState({
    helpful: article?.initialLikes || 42,
    insightful: 28,
    recommend: 19,
  });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});
  // Comments state
  const [comments, setComments] = useState<ArticleComment[]>(article?.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  // Mobile Table of Contents open/close
  const [isTocOpen, setIsTocOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;
  const PrevArrowIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  // Track reading progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollPos = windowHeight - rect.top;
      const percent = Math.min(Math.max((scrollPos / totalHeight) * 100, 0), 100);
      setReadingProgress(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);

  // Sync bookmark state from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saramad_saved_articles') || '[]');
      setIsBookmarked(saved.includes(articleId));
    } catch {
      // ignore
    }
  }, [articleId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('saramad_saved_articles') || '[]');
      let updated: string[];
      if (saved.includes(articleId)) {
        updated = saved.filter((id: string) => id !== articleId);
        setIsBookmarked(false);
        showToast(language === 'fa' ? 'از نشان‌شده‌ها حذف شد' : 'Removed from bookmarks');
      } else {
        updated = [...saved, articleId];
        setIsBookmarked(true);
        showToast(t.articleDetail.bookmarked);
      }
      localStorage.setItem('saramad_saved_articles', JSON.stringify(updated));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleShareClick = async () => {
    const shareData = {
      title: article ? article.title : 'Ilya Saramad Capital Holding',
      text: article ? article.summary : '',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to modal if dismissed or failed
      }
    }
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast(t.articleDetail.shareSuccess);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReaction = (type: 'helpful' | 'insightful' | 'recommend') => {
    if (userReacted[type]) return;
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setUserReacted((prev) => ({ ...prev, [type]: true }));
    showToast(t.articleDetail.helpfulBtn || 'بازخورد شما ثبت شد');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    const newComment: ArticleComment = {
      id: 'c_' + Date.now(),
      name: commentName.trim(),
      role: commentRole.trim() || (language === 'fa' ? 'پژوهشگر مالی' : 'Market Researcher'),
      date: language === 'fa' ? 'لحظاتی پیش' : 'Just now',
      content: commentContent.trim(),
      likes: 1,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentSubmitted(true);
    setCommentContent('');
    setCommentName('');
    setCommentRole('');
    showToast(t.articleDetail.commentSuccess);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Find index for Next / Prev navigation
  const currentIndex = allArticles.findIndex((a) => a.id === articleId);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Related articles (same category or others, excluding current)
  const relatedArticles = useMemo(() => {
    return allArticles
      .filter((a) => a.id !== articleId)
      .slice(0, 3);
  }, [allArticles, articleId]);

  if (!article) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <BookOpen className="w-16 h-16 text-[#027DF7] mx-auto opacity-70" />
          <h2 className="text-2xl font-black text-[#01427C]">{t.articleDetail.notFoundTitle}</h2>
          <p className="text-sm text-[#64748B]">{t.articleDetail.notFoundDesc}</p>
          <button
            type="button"
            onClick={onBackToArticles}
            className="px-6 py-3 rounded-full bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-all shadow-md"
          >
            {t.articleDetail.notFoundBtn}
          </button>
        </div>
      </div>
    );
  }

  // Text size class mapping for mobile & desktop comfortable reading
  const bodyTextClass =
    textSize === 'xlarge'
      ? 'text-xl sm:text-2xl leading-[2.1] tracking-wide'
      : textSize === 'large'
      ? 'text-lg sm:text-xl leading-[2] tracking-normal'
      : 'text-base sm:text-lg leading-[1.95] tracking-normal';

  return (
    <div className={`w-full min-h-screen pt-24 md:pt-28 pb-28 md:pb-24 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* 1. TOP MOBILE & DESKTOP READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#01427C] via-[#027DF7] to-[#00D4B2] transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. DEDICATED STICKY MOBILE READING SUB-HEADER */}
      <div className="sticky top-16 md:top-20 z-30 w-full bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0]/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            type="button"
            onClick={onBackToArticles}
            id="mobile-back-to-articles-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#01427C] hover:text-[#027DF7] bg-[#F1F5F9]/80 hover:bg-[#D5ECFE]/60 border border-[#E2E8F0] transition-all active:scale-95"
            title={t.articleDetail.backToArticles}
          >
            <BackArrowIcon className="w-3.5 h-3.5 text-[#027DF7]" />
            <span className="hidden xs:inline">{t.articleDetail.backToArticles}</span>
            <span className="xs:hidden">{language === 'fa' ? 'مقالات' : 'Articles'}</span>
          </button>

          {/* Center Reading status & Time */}
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#64748B]">
            <span className="hidden sm:inline-block max-w-[260px] truncate text-[#01427C] font-bold">
              {article.title}
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#D5ECFE]/50 text-[#01427C] font-bold text-[12px]">
              <Clock className="w-3 h-3 text-[#027DF7]" />
              {article.readTime}
            </span>
            <span className="tabular-nums font-bold text-[#027DF7]">
              {Math.round(readingProgress)}%
            </span>
          </div>

          {/* Quick Reader Controls: Font Size, Bookmark, Share */}
          <div className="flex items-center gap-1.5">
            {/* Text size selector for mobile readability */}
            <div className="flex items-center bg-[#F1F5F9] rounded-full p-0.5 border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                title="Normal Font Size"
                className={`px-2 py-1 rounded-full text-[12px] font-bold transition-all ${
                  textSize === 'normal'
                    ? 'bg-white text-[#01427C] shadow-xs'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                title="Large Font Size"
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${
                  textSize === 'large'
                    ? 'bg-white text-[#01427C] shadow-xs'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setTextSize('xlarge')}
                title="Extra Large Font Size"
                className={`px-2 py-1 rounded-full text-sm font-black transition-all ${
                  textSize === 'xlarge'
                    ? 'bg-white text-[#027DF7] shadow-xs'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              onClick={toggleBookmark}
              id="article-bookmark-toggle-btn"
              className={`p-2 rounded-full border transition-all active:scale-90 ${
                isBookmarked
                  ? 'bg-[#027DF7] text-white border-[#027DF7] shadow-sm shadow-[#027DF7]/30'
                  : 'bg-white text-[#64748B] hover:text-[#027DF7] border-[#E2E8F0]'
              }`}
              title={isBookmarked ? t.articleDetail.bookmarked : t.articleDetail.bookmarkArticle}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShareClick}
              id="article-share-btn"
              className="p-2 rounded-full bg-white text-[#64748B] hover:text-[#027DF7] border border-[#E2E8F0] transition-all active:scale-90"
              title={t.articleDetail.shareArticle}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN ARTICLE CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mb-6">
          <button
            type="button"
            onClick={onGoToHome}
            className="hover:text-[#027DF7] transition-colors font-medium"
          >
            {t.nav.home}
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onBackToArticles}
            className="hover:text-[#027DF7] transition-colors font-medium"
          >
            {t.articles.title}
          </button>
          <span>/</span>
          <span className="text-[#01427C] font-semibold truncate max-w-[200px] sm:max-w-none">
            {article.category}
          </span>
        </div>

        {/* ARTICLE HERO & HEADER */}
        <header className="space-y-4 mb-8">
          {/* Category & Badges Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#D5ECFE] text-[#01427C] text-xs font-bold shadow-xs">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 rounded-full bg-[#027DF7] text-white text-[13px] font-extrabold flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                {t.articles.featuredBadge}
              </span>
            )}
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#64748B] text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-[#027DF7]" />
              {article.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#01427C] leading-[1.3] sm:leading-[1.25] tracking-tight">
            {article.title}
          </h1>

          {/* Article Lead Summary */}
          <p className="text-base sm:text-lg md:text-xl text-[#475569] leading-relaxed font-medium pt-1">
            {article.summary}
          </p>

          {/* Author & Publish Date Bar */}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#027DF7]/20"
              />
              <div>
                <div className="text-sm font-bold text-[#01427C] flex items-center gap-1.5">
                  <span>{article.author.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#027DF7]" title="Verified Analyst" />
                </div>
                <div className="text-xs text-[#64748B] font-medium">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <Calendar className="w-3.5 h-3.5 text-[#027DF7]" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </header>

        {/* FEATURED COVER IMAGE WITH GLASS CORNERS */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-[#01427C]/10 mb-8 border border-white/80">
          <img
            src={article.image}
            alt={article.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01427C]/60 via-transparent to-transparent pointer-events-none" />
          <div className={`absolute bottom-3 ${isRtl ? 'right-4' : 'left-4'} text-white/90 text-xs font-medium backdrop-blur-md bg-black/30 px-3 py-1 rounded-full`}>
            {article.alt}
          </div>
        </div>

        {/* KEY STRATEGIC TAKEAWAYS (EXECUTIVE SUMMARY) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <GlassCard className="p-5 sm:p-7 mb-8 border-l-4 sm:border-l-4 border-l-[#027DF7] liquid-border" liquidBorder>
            <div className="flex items-center gap-2 mb-3 text-[#01427C]">
              <Award className="w-5 h-5 text-[#027DF7]" />
              <h2 className="text-sm sm:text-base font-extrabold tracking-wide">
                {t.articleDetail.keyTakeawaysTitle}
              </h2>
            </div>
            <ul className={`space-y-2.5 text-xs sm:text-sm text-[#334155] ${isRtl ? 'pr-2' : 'pl-2'}`}>
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#027DF7] mt-2 shrink-0" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        )}

        {/* STATS HIGHLIGHT CALLOUT IF PRESENT */}
        {article.statsHighlight && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="sm:col-span-3 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#01427C] to-[#027DF7] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-inherit">
                <div className="text-xs uppercase tracking-wider text-[#D5ECFE] font-bold">
                  {t.articleDetail.statsLabel}
                </div>
                <div className="text-sm sm:text-base font-bold">{article.statsHighlight.label}</div>
                {article.statsHighlight.note && (
                  <div className="text-xs text-white/80">{article.statsHighlight.note}</div>
                )}
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {article.statsHighlight.value}
                </span>
                {article.statsHighlight.change && (
                  <span className="px-2 py-1 rounded-md bg-[#10B981] text-white text-xs font-bold">
                    {article.statsHighlight.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE TABLE OF CONTENTS (COLLAPSIBLE DRAWER) */}
        {article.sections && article.sections.length > 0 && (
          <div className="mb-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
            <button
              type="button"
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full flex items-center justify-between text-xs sm:text-sm font-bold text-[#01427C]"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#027DF7]" />
                <span>{t.articleDetail.tableOfContents}</span>
              </div>
              {isTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {isTocOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pt-3 border-t border-[#E2E8F0] mt-3"
                >
                  <ul className="space-y-2 text-xs text-[#64748B]">
                    {article.sections.map((sec, idx) => (
                      <li key={sec.id || idx}>
                        <a
                          href={`#${sec.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="hover:text-[#027DF7] transition-colors flex items-center gap-2 py-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#027DF7]" />
                          <span>{sec.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 4. ARTICLE BODY CONTENT CANVAS */}
        <article ref={contentRef} className="space-y-8 text-[#1E293B] mb-12">
          {/* Main Paragraphs */}
          <div className={`space-y-6 ${bodyTextClass}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-justify font-normal leading-loose">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Expert Quote Highlight */}
          {article.quote && (
            <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-[#D5ECFE]/50 to-white border border-[#027DF7]/25 relative overflow-hidden shadow-xs">
              <Quote className={`absolute -bottom-4 ${isRtl ? '-left-4' : '-right-4'} w-24 h-24 text-[#027DF7]/10 pointer-events-none`} />
              <div className="relative z-10 space-y-3">
                <div className="text-[13px] font-black uppercase tracking-wider text-[#027DF7] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.articleDetail.expertQuote}</span>
                </div>
                <blockquote className="text-base sm:text-xl font-bold text-[#01427C] leading-relaxed italic">
                  «{article.quote.text}»
                </blockquote>
                <div className="pt-2 text-xs font-semibold text-[#64748B]">
                  — {article.quote.author} {article.quote.role && `(${article.quote.role})`}
                </div>
              </div>
            </div>
          )}

          {/* Structured Sections */}
          {article.sections && article.sections.map((section) => (
            <section key={section.id} id={section.id} className="pt-4 space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#01427C] tracking-tight border-b border-[#E2E8F0] pb-2">
                {section.title}
              </h2>
              <div className={`space-y-4 ${bodyTextClass}`}>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-justify font-normal leading-loose">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <ul className={`space-y-2 text-xs sm:text-sm text-[#475569] ${isRtl ? 'pr-4' : 'pl-4'} list-disc`}>
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="font-medium leading-relaxed">
                        {bp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section Callout */}
              {section.callout && (
                <div className="p-4 rounded-2xl bg-[#027DF7]/10 border-r-4 border-[#027DF7] text-xs sm:text-sm text-[#01427C] font-semibold leading-relaxed">
                  {section.callout}
                </div>
              )}
            </section>
          ))}
        </article>

        {/* 5. ARTICLE TAGS */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pt-6 border-t border-[#E2E8F0]">
          <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#027DF7]" />
            {t.articles.tagsLabel}
          </span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-[#F1F5F9] hover:bg-[#D5ECFE]/60 text-[#01427C] font-semibold transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 6. INTERACTIVE FEEDBACK & REACTIONS */}
        <GlassCard className="p-6 sm:p-8 mb-10 text-center" liquidBorder>
          <h3 className="text-base sm:text-lg font-bold text-[#01427C] mb-2">
            {t.articleDetail.helpfulQuestion}
          </h3>
          <p className="text-xs text-[#64748B] mb-5">
            {language === 'fa'
              ? 'بازخورد شما به بهبود کیفیت تحلیل‌های سرمایه‌گذاری کمک می‌کند.'
              : 'Your feedback enhances our institutional research quality.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleReaction('helpful')}
              id="reaction-helpful-btn"
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                userReacted.helpful
                  ? 'bg-[#027DF7] text-white border-[#027DF7] shadow-sm scale-105'
                  : 'bg-white hover:bg-[#D5ECFE]/40 text-[#01427C] border-[#E2E8F0]'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{t.articleDetail.helpfulBtn}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/10 text-[12px] font-extrabold tabular-nums">
                {reactions.helpful}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleReaction('insightful')}
              id="reaction-insightful-btn"
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                userReacted.insightful
                  ? 'bg-[#01427C] text-white border-[#01427C] shadow-sm scale-105'
                  : 'bg-white hover:bg-[#D5ECFE]/40 text-[#01427C] border-[#E2E8F0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#00D4B2]" />
              <span>{t.articleDetail.insightfulBtn}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/10 text-[12px] font-extrabold tabular-nums">
                {reactions.insightful}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleReaction('recommend')}
              id="reaction-recommend-btn"
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                userReacted.recommend
                  ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm scale-105'
                  : 'bg-white hover:bg-[#D5ECFE]/40 text-[#01427C] border-[#E2E8F0]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.articleDetail.recommendBtn}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/10 text-[12px] font-extrabold tabular-nums">
                {reactions.recommend}
              </span>
            </button>
          </div>
        </GlassCard>

        {/* 7. AUTHOR PROFILE DEEP CARD */}
        <GlassCard className="p-6 sm:p-8 mb-10" liquidBorder>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="space-y-1">
                <div className="text-xs uppercase font-bold text-[#027DF7] tracking-wider">
                  {t.articleDetail.aboutAuthor}
                </div>
                <h3 className="text-lg font-black text-[#01427C] flex items-center gap-1.5">
                  <span>{article.author.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#027DF7]" />
                </h3>
                <div className="text-xs text-[#64748B] font-semibold">{article.author.role}</div>
                {article.author.education && (
                  <div className="text-[13px] text-[#475569]">
                    <span className="font-bold text-[#01427C]">{t.articleDetail.educationLabel} </span>
                    {article.author.education}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onGoToConsultation}
              id="author-consult-btn"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>{t.articleDetail.requestConsultation}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {article.author.bio && (
            <p className="mt-4 pt-4 border-t border-[#E2E8F0] text-xs sm:text-sm text-[#475569] leading-relaxed">
              {article.author.bio}
            </p>
          )}
        </GlassCard>

        {/* 8. NEXT / PREVIOUS ARTICLE NAVIGATOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {prevArticle ? (
            <GlassCard
              className="p-4 cursor-pointer hover:shadow-md transition-all group"
              onClick={() => onSelectArticle(prevArticle.id)}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#027DF7] mb-1">
                <PrevArrowIcon className="w-4 h-4" />
                <span>{t.articleDetail.prevArticle}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors line-clamp-2">
                {prevArticle.title}
              </div>
            </GlassCard>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextArticle && (
            <GlassCard
              className="p-4 cursor-pointer hover:shadow-md transition-all group text-right"
              onClick={() => onSelectArticle(nextArticle.id)}
            >
              <div className="flex items-center justify-end gap-2 text-xs font-bold text-[#027DF7] mb-1">
                <span>{t.articleDetail.nextArticle}</span>
                <NextArrowIcon className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors line-clamp-2">
                {nextArticle.title}
              </div>
            </GlassCard>
          )}
        </div>

        {/* 9. CONSULTATION CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#01427C] to-[#027DF7] text-white mb-12 relative overflow-hidden shadow-xl shadow-[#01427C]/15">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              {t.nav.consultation}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-snug">
              {t.articleDetail.consultationBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {t.articleDetail.consultationBannerDesc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onGoToConsultation}
                id="article-bottom-consultation-cta"
                className="px-6 py-3 rounded-full bg-white text-[#01427C] hover:bg-[#D5ECFE] text-xs sm:text-sm font-black transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>{t.articleDetail.consultationBannerBtn}</span>
                <ArrowIcon className="w-4 h-4 text-[#027DF7]" />
              </button>
            </div>
          </div>
        </div>

        {/* 10. COMMENTS & EXPERT THOUGHTS SECTION */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#01427C] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#027DF7]" />
              <span>{t.articleDetail.commentsTitle} ({comments.length})</span>
            </h3>
          </div>

          {/* Comment Form */}
          <GlassCard className="p-5 sm:p-7 mb-8" liquidBorder>
            <h4 className="text-sm font-extrabold text-[#01427C] mb-4">
              {t.articleDetail.leaveComment}
            </h4>
            <form onSubmit={handleCommentSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder={t.articleDetail.commentNamePlaceholder}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#E2E8F0] focus:border-[#027DF7] focus:ring-2 focus:ring-[#027DF7]/20 outline-none font-medium"
                />
                <input
                  type="text"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  placeholder={t.articleDetail.commentRolePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#E2E8F0] focus:border-[#027DF7] focus:ring-2 focus:ring-[#027DF7]/20 outline-none font-medium"
                />
              </div>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={t.articleDetail.commentContentPlaceholder}
                rows={3}
                required
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#E2E8F0] focus:border-[#027DF7] focus:ring-2 focus:ring-[#027DF7]/20 outline-none font-medium resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{t.articleDetail.submitComment}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </GlassCard>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="p-6 text-center bg-white/60 rounded-2xl border border-dashed border-[#CBD5E1] text-xs text-[#64748B]">
                {t.articleDetail.noCommentsYet}
              </div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#D5ECFE] text-[#01427C] flex items-center justify-center font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-[#01427C]">{c.name}</div>
                        <div className="text-[13px] text-[#64748B]">{c.role}</div>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#94A3B8]">{c.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed pt-1">
                    {c.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 11. RELATED RESEARCH & ARTICLES */}
        {relatedArticles.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-[#01427C] mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#027DF7]" />
              <span>{t.articleDetail.relatedArticles}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <GlassCard
                  key={rel.id}
                  className="p-4 flex flex-col justify-between cursor-pointer group hover:shadow-md transition-all"
                  onClick={() => onSelectArticle(rel.id)}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#E2E8F0]">
                      <img
                        src={rel.image}
                        alt={rel.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-[#D5ECFE] text-[#01427C]">
                      {rel.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[13px] text-[#64748B]">
                    <span>{rel.readTime}</span>
                    <span className="text-[#027DF7] font-bold flex items-center gap-1">
                      {t.articles.read}
                      <ArrowIcon className="w-3 h-3" />
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 12. DEDICATED FLOATING MOBILE ACTION BAR (DOCK) */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <div className="p-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl shadow-[#01427C]/20 flex items-center justify-between gap-2">
          {/* Reaction like count */}
          <button
            type="button"
            onClick={() => handleReaction('helpful')}
            className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold transition-all ${
              userReacted.helpful
                ? 'bg-[#027DF7] text-white'
                : 'bg-[#F1F5F9] text-[#01427C]'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="tabular-nums text-[13px]">{reactions.helpful}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-all ${
              isBookmarked
                ? 'bg-[#027DF7] text-white'
                : 'bg-[#F1F5F9] text-[#01427C]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShareClick}
            className="p-2 rounded-full bg-[#F1F5F9] text-[#01427C]"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Consultation CTA */}
          <button
            type="button"
            onClick={onGoToConsultation}
            className="flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-[#01427C] to-[#027DF7] text-white text-xs font-black text-center shadow-sm truncate"
          >
            {t.articleDetail.requestConsultation}
          </button>
        </div>
      </div>

      {/* 13. SHARE MODAL DIALOG */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#01427C]">{t.articleDetail.shareVia}</h4>
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1 rounded-full text-[#64748B] hover:text-[#0A2540]"
                >
                  ✕
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + '\n' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.articleDetail.whatsapp}</span>
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.articleDetail.telegram}</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.articleDetail.linkedin}</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-black/5 hover:bg-black/10 text-black flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.articleDetail.twitter}</span>
                </a>
              </div>

              {/* Copy Link Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0]">
                  <input
                    type="text"
                    readOnly
                    value={window.location.href}
                    className="w-full px-2 text-xs bg-transparent text-[#64748B] outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-xl bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? t.articleDetail.copied : t.articleDetail.copyLink}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 14. TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#01427C] text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#00D4B2]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
