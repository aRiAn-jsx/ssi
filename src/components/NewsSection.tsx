import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight, Calendar, Clock, Newspaper } from 'lucide-react';
import { getNewsData } from '../data/mockData';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

interface NewsSectionProps {
  onGoToArticles?: () => void;
  onSelectArticle?: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onGoToArticles, onSelectArticle }) => {
  const { language, isRtl, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const newsData = getNewsData(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? (isRtl ? 360 : -360) : (isRtl ? -360 : 360);
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="news" className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute top-10 ${isRtl ? 'left-1/3' : 'right-1/3'} w-80 h-80 rounded-full bg-[#D5ECFE]/30 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-3">
              <Newspaper className="w-4 h-4 text-[#027DF7]" />
              <span>{t.news.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-3">
              {t.news.title}
            </h2>
            <p className="text-base text-[#64748B] max-w-xl font-normal">
              {t.news.subtitle}
            </p>
          </div>

          {/* Navigation Controls & Go to Articles Button */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {onGoToArticles && (
              <button
                type="button"
                onClick={onGoToArticles}
                id="view-all-articles-btn"
                className="px-4 py-2.5 rounded-full bg-[#D5ECFE]/80 hover:bg-[#027DF7] text-[#01427C] hover:text-white text-xs font-extrabold transition-all border border-[#027DF7]/20 flex items-center gap-1.5"
              >
                <span>{t.news.viewAllResearch}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full liquid-glass-card hover:bg-white text-[#01427C] dark:text-[#E0F2FE] flex items-center justify-center border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-sm transition-transform hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 text-[#027DF7] dark:text-[#38BDF8]" />
              </button>
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full liquid-glass-card hover:bg-white text-[#01427C] dark:text-[#E0F2FE] flex items-center justify-center border border-[#027DF7]/30 dark:border-[#027DF7]/50 shadow-sm transition-transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 text-[#027DF7] dark:text-[#38BDF8]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory"
        >
          {newsData.map((item) => (
            <div
              key={item.id}
              className="w-[min(85vw,380px)] sm:w-[380px] xl:w-[420px] snap-center shrink-0"
            >
              <GlassCard
                tilt={true}
                glowOnHover={true}
                className="h-full p-4 flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  const articleKey = item.id.replace('news-', 'article-');
                  if (onSelectArticle) {
                    onSelectArticle(articleKey);
                  } else {
                    setSelectedNews(item.id);
                  }
                }}
              >
                <div>
                  {/* Image with Blue Brand Tint */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#027DF7]/10 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01427C]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge */}
                    <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'}`}>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#01427C] shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Read time pill */}
                    <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#01427C]/70 backdrop-blur-md text-white text-[13px]`}>
                      <Clock className="w-3 h-3 text-[#D5ECFE]" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#027DF7]" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors line-clamp-2 leading-snug mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className={`text-xs sm:text-sm text-[#64748B] line-clamp-2 leading-relaxed font-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                    {item.summary}
                  </p>
                </div>

                {/* Read arrow action */}
                <div className="pt-4 mt-6 border-t border-[#E2E8F0]/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors flex items-center gap-1">
                    {t.news.readFullReport}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 flex items-center justify-center text-[#027DF7] group-hover:bg-[#027DF7] group-hover:text-white transition-all duration-300">
                    <ArrowIcon className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for News details */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 bg-[#01427C]/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white dark:bg-[#071325] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-[#027DF7]/30 dark:border-[#027DF7]/50 ${isRtl ? 'text-right' : 'text-left'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const newsItem = newsData.find((n) => n.id === selectedNews);
              if (!newsItem) return null;
              return (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D5ECFE] text-[#01427C]">
                      {newsItem.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedNews(null)}
                      className="text-xs font-bold text-[#64748B] hover:text-[#01427C] p-1"
                    >
                      {language === 'fa' ? 'بستن' : 'Close'} ✕
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#01427C] mb-3 leading-snug">
                    {newsItem.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#64748B] mb-4">
                    <span>{newsItem.date}</span>
                    <span>•</span>
                    <span>{newsItem.readTime}</span>
                  </div>
                  <img
                    src={newsItem.image}
                    alt={newsItem.alt}
                    className="w-full h-52 object-cover rounded-2xl mb-4"
                  />
                  <p className="text-sm text-[#0A2540] leading-relaxed mb-6">
                    {newsItem.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const articleKey = selectedNews.replace('news-', 'article-');
                      setSelectedNews(null);
                      if (onSelectArticle) {
                        onSelectArticle(articleKey);
                      } else if (onGoToArticles) {
                        onGoToArticles();
                      }
                    }}
                    className="w-full py-3 rounded-full bg-[#01427C] text-white text-xs font-bold hover:bg-[#027DF7] transition-colors"
                  >
                    {t.news.readFullReport || t.news.viewAllResearch}
                  </button>
                </div>
              );
            })()}
          </motion.div>
        </div>
      )}
    </section>
  );
};
