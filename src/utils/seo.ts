import { Language } from '../utils/translations';
import { getArticleById } from '../data/articlesData';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  locale: string;
  image?: string;
}

export const SEO_PAGE_CONFIGS: Record<Language, Record<string, SeoConfig>> = {
  fa: {
    home: {
      title: 'هلدینگ سرآمد سرمایه ایلیا (سهامی عام) | پرتال رسمی',
      description:
        'پرتال رسمی هلدینگ سرمایه‌گذاری سرآمد سرمایه ایلیا (سهامی عام) - مدیریت دارایی، سبدگردانی اختصاصی، تأمین مالی و نوآوری‌های فین‌تک تحت نظارت سازمان بورس و وابسته به بیمه سامان.',
      url: 'https://ssiholding.co/',
      locale: 'fa_IR',
    },
    articles: {
      title: 'مقالات و تحلیل‌های تخصصی بازار سرمایه | هلدینگ سرآمد سرمایه ایلیا',
      description:
        'گزارش‌های تحلیلی، پیش‌بینی روندهای اقتصاد کلان، ارزش‌گذاری سهام، استراتژی‌های پوشش ریسک و تحلیل صنایع بورسی هلدینگ سرآمد.',
      url: 'https://ssiholding.co/#articles',
      locale: 'fa_IR',
    },
    consultation: {
      title: 'وقت مشاوره و رزرو جلسه حضوری | هلدینگ سرآمد سرمایه ایلیا',
      description:
        'ثبت آنلاین درخواست وقت مشاوره سرمایه‌گذاری و رزرو جلسه حضوری با مدیران ارشد در دفتر مشهد هلدینگ سرآمد سرمایه ایلیا.',
      url: 'https://ssiholding.co/#consultation',
      locale: 'fa_IR',
    },
    team: {
      title: 'تیم ما و اعضای هیئت مدیره | هلدینگ سرآمد سرمایه ایلیا',
      description:
        'آشنایی با اعضای هیئت مدیره، کمیته سرمایه‌گذاری، مدیران ریسک، معماران فین‌تک و ارکان راهبری هلدینگ سرآمد سرمایه ایلیا.',
      url: 'https://ssiholding.co/#team',
      locale: 'fa_IR',
    },
  },
  en: {
    home: {
      title: 'Ilya Saramad Capital Holding | Official Portal',
      description:
        'Official Portal of Ilya Saramad Capital Holding (Public Joint Stock) - Wealth Management, Dedicated Portfolios, Corporate Financing & FinTech Innovation affiliated with Saman Insurance.',
      url: 'https://ssiholding.co/',
      locale: 'en_US',
    },
    articles: {
      title: 'Research & Macroeconomic Insights | Ilya Saramad Capital Holding',
      description:
        'Analytical research reports, macroeconomic trend forecasts, equity valuations, portfolio risk hedging strategies, and industry studies by Saramad Holding.',
      url: 'https://ssiholding.co/#articles',
      locale: 'en_US',
    },
    consultation: {
      title: 'Book VIP Consultation & In-Person Meeting | Ilya Saramad Capital Holding',
      description:
        'Schedule an investment consultation or arrange a private in-person session with senior directors at our Mashhad headquarters.',
      url: 'https://ssiholding.co/#consultation',
      locale: 'en_US',
    },
    team: {
      title: 'Leadership & Board of Directors | Ilya Saramad Capital Holding',
      description:
        'Meet the Board of Directors, Investment Committee members, risk officers, fintech architects, and executive leaders of Ilya Saramad Holding.',
      url: 'https://ssiholding.co/#team',
      locale: 'en_US',
    },
  },
};

/**
 * Updates document title, description, and social meta tags for client-side routing & language switching.
 */
export function updatePageSeo(
  view: 'home' | 'articles' | 'article' | 'consultation' | 'team',
  lang: Language = 'fa',
  articleId?: string
) {
  const langConfigs = SEO_PAGE_CONFIGS[lang] || SEO_PAGE_CONFIGS.fa;
  let config: SeoConfig;

  if (view === 'article' && articleId) {
    const article = getArticleById(articleId, lang);
    if (article) {
      config = {
        title: `${article.title} | ${lang === 'fa' ? 'هلدینگ سرآمد سرمایه ایلیا' : 'Ilya Saramad Capital'}`,
        description: article.summary,
        url: `https://ssiholding.co/#article/${article.id}`,
        locale: lang === 'fa' ? 'fa_IR' : 'en_US',
        image: article.image,
      };
    } else {
      config = langConfigs.articles;
    }
  } else {
    config = langConfigs[view] || langConfigs.home;
  }

  // Title
  document.title = config.title;

  // HTML Attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', config.description);
  }

  // OG Title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', config.title);
  }

  // OG Description
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', config.description);
  }

  // OG Locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute('content', config.locale);
  }

  // Twitter Title
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) {
    twTitle.setAttribute('content', config.title);
  }

  // Twitter Description
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) {
    twDesc.setAttribute('content', config.description);
  }

  // Canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink && config.url) {
    canonicalLink.setAttribute('href', config.url);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && config.url) {
    ogUrl.setAttribute('content', config.url);
  }
}
