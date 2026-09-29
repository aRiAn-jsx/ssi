import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Calendar,
  Clock,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Share2,
  Bookmark,
  CheckCircle2,
  X,
  TrendingUp,
  Tag,
  Mail,
  Send,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getArticlesData, getArticlesCategories } from '../data/articlesData';
import { ArticleItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ArticlesPageProps {
  onBackToHome: () => void;
  onGoToConsultation: () => void;
  onSelectArticle?: (id: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onBackToHome,
  onGoToConsultation,
  onSelectArticle,
}) => {
  const { language, isRtl, t } = useLanguage();
  const categories = getArticlesCategories(language);
  const allArticles = getArticlesData(language);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Sync category when language changes
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [language]);

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  // Filter articles based on search & category
  const filteredArticles = useMemo(() => {
    const isAll = selectedCategory === categories[0] || selectedCategory === 'همه مقالات' || selectedCategory === 'All Articles';
    return allArticles.filter((article) => {
      const matchesCategory = isAll || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allArticles, categories]);

  const featuredArticle = useMemo(() => {
    return allArticles.find((a) => a.featured) || allArticles[0];
  }, [allArticles]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = (article: ArticleItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2500);
  };

  return (
    <div className={`w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Breadcrumb & Navigation Back */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#64748B]">
          <button
            type="button"
            onClick={onBackToHome}
            id="breadcrumb-home-btn"
            className="hover:text-[#027DF7] transition-colors flex items-center gap-1 font-semibold"
          >
            <span>{t.articles.mainPortal}</span>
          </button>
          <span>/</span>
          <span className="text-[#01427C] font-bold">{t.articles.title}</span>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          id="back-to-home-btn"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#01427C] bg-white hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] shadow-sm transition-all"
        >
          <BackArrowIcon className="w-4 h-4 text-[#027DF7]" />
          <span>{t.articles.backToPortal}</span>
        </button>
      </div>

      {/* Hero Header for Articles */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5ECFE]/80 border border-[#027DF7]/25 text-[#01427C] text-xs font-bold mb-4 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#027DF7]" />
          <span>{t.articles.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] tracking-tight mb-4">
          {t.articles.title}
        </h1>
        <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
          {t.articles.subtitle}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]`} />
          <input
            type="text"
            id="articles-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.articles.searchPlaceholder}
            className={`w-full ${isRtl ? 'pl-4 pr-10' : 'pr-4 pl-10'} py-2.5 rounded-full text-xs md:text-sm bg-white/90 border border-[#E2E8F0] text-[#0A2540] placeholder-[#94A3B8] focus:outline-none focus:border-[#027DF7] focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm transition-all font-medium`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#0A2540]`}
            >
              {language === 'fa' ? 'پاک کردن' : 'Clear'}
            </button>
          )}
        </div>

        {/* Category horizontal chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                id={`filter-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#01427C] text-white border-[#01427C] shadow-md shadow-[#01427C]/15'
                    : 'bg-white/80 text-[#64748B] border-[#E2E8F0] hover:border-[#027DF7]/40 hover:text-[#01427C]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Lead Article */}
      {!searchQuery && selectedCategory === categories[0] && featuredArticle && (
        <div className="mb-12">
          <GlassCard
            id="featured-article-card"
            className="p-6 md:p-8 cursor-pointer group"
            onClick={() => {
              if (onSelectArticle) {
                onSelectArticle(featuredArticle.id);
              } else {
                setActiveArticle(featuredArticle);
              }
            }}
            liquidBorder
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#027DF7] text-white text-[13px] font-extrabold tracking-wide">
                    {t.articles.featuredBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#D5ECFE] text-[#01427C] text-[13px] font-bold">
                    {featuredArticle.category}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#01427C] group-hover:text-[#027DF7] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm md:text-base text-[#475569] leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>

                {/* Key takeaways bullet preview */}
                {featuredArticle.keyTakeaways && (
                  <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80 space-y-1.5">
                    <span className="text-[13px] font-bold text-[#01427C] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#027DF7]" />
                      {t.articles.keyTakeawaysTitle}
                    </span>
                    <ul className={`text-xs text-[#64748B] space-y-1 ${isRtl ? 'pr-4' : 'pl-4'} list-disc`}>
                      {featuredArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E2E8F0]/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#027DF7]/30"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#01427C]">
                        {featuredArticle.author.name}
                      </div>
                      <div className="text-[13px] text-[#64748B]">
                        {featuredArticle.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01427C]/40 to-transparent" />
                <div className={`absolute bottom-3 ${isRtl ? 'left-3' : 'right-3'} bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#01427C] flex items-center gap-1`}>
                  <span>{t.articles.readFull}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#027DF7]" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Articles Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-[#01427C] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#027DF7]" />
            <span>{t.articles.listTitle} ({filteredArticles.length})</span>
          </h3>
          {selectedCategory !== categories[0] && (
            <button
              type="button"
              onClick={() => setSelectedCategory(categories[0])}
              className="text-xs text-[#027DF7] font-semibold hover:underline"
            >
              {t.articles.showAllCategories}
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-[#CBD5E1]">
            <BookOpen className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
            <div className="text-base font-bold text-[#01427C] mb-1">
              {t.articles.noArticlesFound}
            </div>
            <p className="text-xs text-[#64748B]">
              {t.articles.noArticlesSubtitle}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const isSaved = savedArticles.includes(article.id);

              return (
                <GlassCard
                  key={article.id}
                  id={`article-card-${article.id}`}
                  className="p-5 flex flex-col justify-between cursor-pointer group hover:shadow-lg hover:shadow-[#027DF7]/10 transition-all duration-300"
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(article.id);
                    } else {
                      setActiveArticle(article);
                    }
                  }}
                >
                  <div className="space-y-4">
                    {/* Card Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#E2E8F0]">
                      <img
                        src={article.image}
                        alt={article.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className={`absolute top-2.5 ${isRtl ? 'right-2.5' : 'left-2.5'}`}>
                        <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#01427C] text-[12px] font-extrabold shadow-sm border border-white/80">
                          {article.category}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(article.id, e)}
                        title={isSaved ? 'Bookmarked' : 'Bookmark article'}
                        className={`absolute top-2.5 ${isRtl ? 'left-2.5' : 'right-2.5'} p-1.5 rounded-lg backdrop-blur-md shadow-sm transition-colors ${
                          isSaved
                            ? 'bg-[#027DF7] text-white'
                            : 'bg-white/90 text-[#64748B] hover:text-[#027DF7]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[13px] text-[#64748B]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title & Summary */}
                    <h4 className="text-base font-extrabold text-[#01427C] group-hover:text-[#027DF7] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3 font-normal">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[12px] px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#64748B] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author footer */}
                  <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-[#01427C]">
                        {article.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-extrabold text-[#027DF7] group-hover:translate-x-0.5 transition-transform">
                      <span>{t.articles.read}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Newsletter Signup Glass Box */}
      <GlassCard className="p-8 md:p-12 mb-16 text-center max-w-3xl mx-auto" liquidBorder>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#01427C] to-[#027DF7] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#027DF7]/25">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black text-[#01427C] mb-2">
          {t.articles.newsletterTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mb-6">
          {t.articles.newsletterDesc}
        </p>

        {newsletterSubscribed ? (
          <div className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#01427C] text-xs font-bold max-w-md mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>{t.articles.newsletterSuccess}</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t.articles.newsletterPlaceholder}
              required
              className={`w-full px-4 py-2.5 rounded-full text-xs sm:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] outline-none focus:border-[#027DF7] focus:ring-2 focus:ring-[#027DF7]/20 ${isRtl ? 'text-right' : 'text-left'} font-medium`}
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#01427C] hover:bg-[#027DF7] text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>{t.articles.subscribeBtn}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </GlassCard>

      {/* Article Detail Full Reading Modal Dialog */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-white/80 overflow-y-auto z-10 p-6 sm:p-8 md:p-10 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                id="close-article-modal-btn"
                className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#0A2540] hover:bg-[#E2E8F0] transition-colors`}
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-[#D5ECFE] text-[#01427C] text-xs font-bold">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeArticle.date}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#01427C] leading-snug">
                  {activeArticle.title}
                </h2>

                {/* Author Info */}
                <div className="flex items-center justify-between gap-4 py-3 border-y border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeArticle.author.avatar}
                      alt={activeArticle.author.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-[#027DF7]/30"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#01427C]">
                        {activeArticle.author.name}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {activeArticle.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleShare(activeArticle, e)}
                      id="share-article-btn"
                      className="p-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#027DF7] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      title="Share link"
                    >
                      <Share2 className="w-4 h-4" />
                      {copiedLink ? <span>{language === 'fa' ? 'کپی شد!' : 'Copied!'}</span> : <span>{language === 'fa' ? 'اشتراک' : 'Share'}</span>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Banner Image */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-md">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyTakeaways && (
                <div className="mb-6 p-5 rounded-2xl bg-[#F0F7FF] border border-[#D5ECFE] space-y-2">
                  <div className="text-xs font-bold text-[#01427C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#027DF7]" />
                    <span>{t.articles.keyTakeawaysTitle}</span>
                  </div>
                  <ul className={`text-xs md:text-sm text-[#334155] space-y-1.5 ${isRtl ? 'pr-5' : 'pl-5'} list-disc leading-relaxed`}>
                    {activeArticle.keyTakeaways.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Content Paragraphs */}
              <div className="space-y-4 text-sm md:text-base text-[#334155] leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#64748B]" />
                <span className="text-xs text-[#64748B]">{t.articles.tagsLabel}</span>
                {activeArticle.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-[#F1F5F9] text-[#01427C] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons in Modal */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-[#64748B] hover:text-[#0A2540] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors"
                >
                  {t.articles.closeModal}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    onGoToConsultation();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>{t.articles.requestConsultationOnTopic}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
