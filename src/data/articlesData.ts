import { ArticleItem } from '../types';
import { Language } from '../utils/translations';

export const ARTICLES_CATEGORIES_FA = [
  'همه مقالات',
  'اقتصاد کلان و سیاست‌های پولی',
  'بازار سرمایه و بورس تهران',
  'سرمایه‌گذاری خطرپذیر و فین‌تک',
  'مدیریت دارایی و املاک تجاری',
  'صنعت بیمه و مدیریت ریسک',
];

export const ARTICLES_CATEGORIES_EN = [
  'All Articles',
  'Macroeconomics & Monetary Policy',
  'Capital Markets & Equities',
  'Venture Capital & FinTech',
  'Asset Management & Commercial Real Estate',
  'Insurance Industry & Risk Governance',
];

export const getArticlesCategories = (lang: Language = 'fa'): string[] => {
  return lang === 'en' ? ARTICLES_CATEGORIES_EN : ARTICLES_CATEGORIES_FA;
};

export const ARTICLES_CATEGORIES = ARTICLES_CATEGORIES_FA;

export const ARTICLES_DATA_FA: ArticleItem[] = [
  {
    id: 'article-1',
    title: 'چشم‌انداز متغیرهای اقتصاد کلان ۱۴۰۵ و راهبردهای تاب‌آوری سبد دارایی‌ها',
    summary: 'بررسی جامع روندهای تورمی، نرخ بهره بین‌بانکی، بازده اوراق با درآمد ثابت و اثرات آن بر تخصیص بهینه سبد سرمایه‌گذاری هلدینگ‌ها.',
    content: [
      'در شرایط پیچیدگی‌های ساختاری اقتصاد کلان و تغییرات مستمر در متغیرهای پولی، تنظیم پورتفوی سرمایه‌گذاری فراتر از روش‌های سنتی نیازمند درک عمیق همبستگی میان بازارهای دارایی است. تحلیل داده‌های تاریخی نشان می‌دهد که هلدینگ‌های چندرشته‌ای با تنوع‌بخشی ساختاریافته توانسته‌اند نرخ شارپ بالاتری نسبت به شاخص کل بورس ثبت کنند.',
      'یکی از استراتژی‌های کلیدی هلدینگ سرآمد سرمایه ایلیا، استفاده از مدل تخصیص دارایی پویا (Dynamic Asset Allocation) است. در این چارچوب، سهم اوراق با درآمد ثابت با نوسانات نرخ بهره هماهنگ شده و از فرصت‌های سرمایه‌گذاری ضدتورمی مانند املاک اداری تجاری شاخص و سهام صادرات‌محور بهره‌برداری می‌شود.',
      'همچنین استقرار سامانه‌های هوشمند پایش ریسک به هلدینگ اجازه می‌دهد نسبت اهرم مالی و جریان‌های نقدینگی را به صورت برخط و روزانه کنترل کند تا در چرخه‌های رکودی از منابع نقدینگی آماده برای شکار دارایی‌های ارزشمند زیر ارزش ذاتی (Under-valued) استفاده شود.',
    ],
    category: 'اقتصاد کلان و سیاست‌های پولی',
    author: {
      name: 'دکتر محمدرضا شریفی',
      role: 'مدیر ارشد سرمایه‌گذاری (CIO)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'دکترای اقتصاد مالی از دانشگاه تهران، با بیش از ۱۵ سال سابقه راهبری کمیته‌های تخصصی سرمایه‌گذاری در نهادهای مالی و صندوق‌های بازنشستگی کشور.',
      education: 'دکتری اقتصاد مالی، دانشگاه تهران',
    },
    date: '۲۲ شهریور ۱۴۰۵',
    readTime: '۸ دقیقه',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    alt: 'نمودار تحلیل اقتصاد کلان و بازارهای مالی',
    featured: true,
    tags: ['اقتصاد کلان', 'سبدگردانی', 'نرخ بهره', 'بورس تهران', 'مدیریت دارایی'],
    keyTakeaways: [
      'لزوم به‌کارگیری مدل‌های تخصیص دارایی پویا در مواجهه با نوسانات تورمی و چرخه نرخ بهره',
      'ایجاد جریان نقد پایدار با ترکیب متوازن اوراق با درآمد ثابت و سهام ارزشی نقدی',
      'حفظ نسبت اهرم ایمن در ساختار ترازنامه و بهره‌گیری از فرصت‌های افت موقت بازار',
    ],
    quote: {
      text: 'تاب‌آوری در بازارهای مالی به معنای پرهیز از ریسک نیست؛ بلکه هنر درک همبستگی منفی میان دارایی‌ها و زمان‌بندی هوشمندانه چرخه نقدینگی است.',
      author: 'دکتر محمدرضا شریفی',
      role: 'مدیر ارشد سرمایه‌گذاری هلدینگ',
    },
    statsHighlight: {
      label: 'افزایش نرخ شارپ پورتفوی',
      value: '۲.۴x',
      change: '+۳۸٪',
      note: 'در مقایسه با میانگین شاخص کل بازارهای رقیب',
    },
    sections: [
      {
        id: 'macro-framework',
        title: '۱. چارچوب نظری تخصیص دارایی در افق میان‌مدت',
        paragraphs: [
          'در ادبیات مالی نوین، ساختار بهینه پورتفوی بر اساس ماتریس واریانس-کوواریانس دارایی‌ها بازتعریف می‌شود. تجارب سال‌های اخیر در اقتصاد ایران نشان داده است که تک‌بعدی نگریستن به بازار سرمایه یا تمرکز صرف بر دارایی‌های فیزیکی، بازدهی واقعی سبد را در بلندمدت مستهلک می‌سازد.',
          'هلدینگ سرآمد با بازطراحی سیستم وزن‌دهی به دارایی‌ها، همواره ۴۰٪ از منابع پورتفوی را در ابزارهای اهرمی با نقدشوندگی سریع، ۳۰٪ در دارایی‌های مصون از تورم (مانند REITs) و ۳۰٪ در سهام بنیادین صادرات‌محور تخصیص می‌دهد.',
        ],
        bulletPoints: [
          'پایش مستمر نرخ بهره بدون ریسک و اسپرد اوراق اخزا',
          'تحلیل کشش تقاضا و اثر تغییرات نرخ ارز بر حاشیه سود ناخالص',
          'بهینه‌سازی مستمر نقطه تعادل ترازنامه هلدینگ و شرکت‌های تابعه',
        ],
      },
      {
        id: 'monetary-policy-impact',
        title: '۲. تاثیر سیاست‌های انقباضی و متغیرهای پولی بر نقدشوندگی',
        paragraphs: [
          'یکی از مهم‌ترین چالش‌های نهادهای مالی در شرایط کنترل ترازنامه بانک‌ها، مدیریت بهینه نقدینگی روزانه است. ایجاد صندوق‌های سرمایه‌گذاری اختصاصی با نقدشوندگی آنی، راهکار اصلی سرآمد سرمایه ایلیا برای حفظ استقلال عملیاتی در سخت‌ترین تنگناهای اعتباری بوده است.',
          'استفاده از ابزارهای مشتقه و قراردادهای آتی به عنوان سپرهای محافظتی در برابر نوسانات ناگهانی بازار سهام، ضریب اطمینان سبدهای تحت مدیریت را به حداکثر رسانده است.',
        ],
        callout: 'نکته کلیدی: ایجاد ذخیره احتیاطی نقدینگی هوشمند، توان مانور سرمایه‌گذاری را در زمان ریزش‌های هیجانی تا ۴۰٪ ارتقا می‌دهد.',
      },
      {
        id: 'conclusion-recommendations',
        title: '۳. توصیه‌های راهبردی برای سرمایه‌گذاران نهادی',
        paragraphs: [
          'توصیه می‌شود سرمایه‌گذاران بزرگ نهادی به جای پیش‌بینی کوتاه‌مدت قیمت‌ها، بر ساختار حاکمیت ریسک و تنظیم خودکار پورتفوی تمرکز نمایند. بهره‌گیری از خدمات سبدگردانی اختصاصی سرآمد سرمایه، دستیابی به این اهداف راهبردی را تضمین می‌کند.',
        ],
      },
    ],
    initialLikes: 142,
    comments: [
      {
        id: 'c1',
        name: 'مهندس بهزاد کمالی',
        role: 'تحلیل‌گر ارشد بازار سرمایه',
        date: '۲۳ شهریور ۱۴۰۵',
        content: 'تحلیل بسیار عمیقی بود. توجه به نسبت شارپ در هلدینگ‌های چندرشته‌ای نکته‌ای است که کمتر در گزارش‌های تحلیلی به آن پرداخته می‌شود.',
        likes: 12,
      },
      {
        id: 'c2',
        name: 'دکتر مریم سجادی',
        role: 'استاد اقتصاد دانشگاه فردوسی',
        date: '۲۴ شهریور ۱۴۰۵',
        content: 'استفاده از مدل تخصیص دارایی پویا دقیقاً همان پارادایمی است که بازارهای نوین به آن نیاز دارند. خسته نباشید به تیم پژوهش ایلیا سرآمد.',
        likes: 8,
      },
    ],
  },
  {
    id: 'article-2',
    title: 'انقلاب هوش مصنوعی در مدیریت دارایی: از الگوریتم‌های سنتی تا مدل‌های شناختی',
    summary: 'چگونه یادگیری ماشین و پردازش زبان طبیعی، فرایند غربالگری سهام و کشف فرصت‌های سرمایه‌گذاری را در هلدینگ سرآمد دگرگون کرده‌اند.',
    content: [
      'استفاده از الگوریتم‌های تحلیل احساسات بازار (Sentiment Analysis) در کنار پردازش صورت‌های مالی سامانه کدال، مزیت رقابتی بی‌سابقه‌ای در سرعت تصمیم‌گیری سرمایه‌گذاران نهادی ایجاد کرده است. در سبدگردان سرآمد، داده‌های بنیادی شرکت‌ها با سرعت پردازش بالا غربالگری می‌شوند.',
      'الگوریتم‌های پیش‌بینی جریان سفارشات، ناهنجاری‌های قیمتی را در کسری از ثانیه شناسایی کرده و ریسک سرایت نوسانات شدید بازار را مهار می‌کنند. این نوآوری به سرمایه‌گذاران صندوق‌های ما اجازه می‌دهد از بازدهی تعدیل‌شده بر اساس ریسک بالاتر برخوردار شوند.',
    ],
    category: 'سرمایه‌گذاری خطرپذیر و فین‌تک',
    author: {
      name: 'مهندس آرش کریمی',
      role: 'مدیر واحد سرمایه‌گذاری جسورانه ایلیا ونچرز',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'کارشناس ارشد مهندسی نرم‌افزار و هوش مصنوعی از دانشگاه صنعتی شریف، پیشگام در پیاده‌سازی سیستم‌های معاملات الگوریتمی و پردازش زبان طبیعی در بازارهای مالی.',
      education: 'کارشناسی ارشد هوش مصنوعی، دانشگاه صنعتی شریف',
    },
    date: '۱۸ شهریور ۱۴۰۵',
    readTime: '۶ دقیقه',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    alt: 'تحلیل الگوریتمی بازارهای مالی و هوش مصنوعی',
    tags: ['هوش مصنوعی', 'فین‌تک', 'الگوهای معاملاتی', 'سبدگردانی', 'یادگیری ماشین'],
    keyTakeaways: [
      'کاهش سوگیری‌های رفتاری در معاملات از طریق غربالگری الگوریتمی و هوش مصنوعی',
      'پایش خودکار اطلاعیه‌های سامانه کدال با مدل‌های پردازش زبان طبیعی فارسی در کمتر از ۳ ثانیه',
      'پیاده‌سازی استراتژی‌های آربیتراژ آماری با سرعت اجرای میکروثانیه',
    ],
    quote: {
      text: 'هوش مصنوعی جایگزین مدیران سرمایه‌گذاری نمی‌شود؛ بلکه مدیرانی که از هوش مصنوعی استفاده می‌کنند جایگزین کسانی خواهند شد که از آن غافل مانده‌اند.',
      author: 'مهندس آرش کریمی',
      role: 'مدیر فناوری و فین‌تک سرآمد',
    },
    statsHighlight: {
      label: 'سرعت غربالگری صورت‌های مالی',
      value: '۲.۸ ثانیه',
      change: '۹۵٪ سریع‌تر',
      note: 'استخراج داده‌های کلیدی کدال و گزارش‌های ماهانه',
    },
    sections: [
      {
        id: 'nlp-codal-parsing',
        title: '۱. معماری پردازش زبان طبیعی برای اسناد مالی فارسی',
        paragraphs: [
          'یکی از بزرگ‌ترین موانع تصمیم‌گیری سریع در بازار سرمایه ایران، حجم انبوه گزارش‌های متنی و اطلاعیه‌های افشای اطلاعات بااهمیت در سامانه کدال است. مدل‌های پردازش زبان طبیعی توسعه‌یافته در هلدینگ، متن اطلاعیه‌ها را بی‌درنگ تحلیل کرده و بار معنایی سود یا زیان را استخراج می‌کنند.',
        ],
        bulletPoints: [
          'دسته‌بندی خودکار اطلاعیه‌های گروه الف و ب',
          'تحلیل مقایسه‌ای نرخ فروش ماهانه نسبت به میانگین فصل گذشته',
          'هشدار فوری مغایرت‌های مالی و تغییرات عمده در حاشیه سود',
        ],
      },
      {
        id: 'quant-risk-models',
        title: '۲. مدیریت ریسک مقداری و مدل‌های شناختی پیش‌بینی',
        paragraphs: [
          'در کنار تحلیل‌های بنیادی، مدل‌های یادگیری عمیق (Deep Learning) الگوهای ناهنجار در سفارش‌گذاری و دستکاری‌های قیمتی را شناسایی می‌کنند تا پرتفوی هلدینگ از دام تله‌های نقدینگی در امان بماند.',
        ],
        callout: 'دستاورد: ضریب خطای پیش‌بینی جریان ورودی و خروجی نقدینگی در صندوق‌های هلدینگ با این مدل‌ها به زیر ۴٪ رسیده است.',
      },
    ],
    initialLikes: 198,
    comments: [
      {
        id: 'c3',
        name: 'علی تقوی',
        role: 'توسعه‌دهنده سیستم‌های مالی',
        date: '۱۹ شهریور ۱۴۰۵',
        content: 'معماری پردازش اسناد کدال بسیار الهام‌بخش است. آیا این سیستم‌ها به صورت API برای سایر نهادها نیز در دسترس خواهد بود؟',
        likes: 15,
      },
    ],
  },
  {
    id: 'article-3',
    title: 'نقش صندوق‌های املاک و مستغلات (REITs) در بازدهی بدون نوسان هلدینگ‌ها',
    summary: 'تحلیل راهبردی پتانسیل تجاری‌سازی املاک اداری و استفاده از ابزارهای نوین بورس برای نقدپذیری دارایی‌های ملکی.',
    content: [
      'املاک و مستغلات همواره یکی از ارکان اصلی حفظ ارزش پول در تاریخ اقتصادی ایران بوده است. با این حال، سنتی بودن معاملات و عدم نقدشوندگی سریع، نقطه ضعف این دارایی‌ها به شمار می‌رود.',
      'تاسیس صندوق‌های املاک و مستغلات (REITs) توسط هلدینگ سرآمد و بهره‌گیری از ظرفیت‌های بورس، این امکان را فراهم ساخته تا جریان نقدینگی حاصل از اجاره پروژه‌های مدرن اداری در شریان‌های مالی شرکت تابعه املاک جریان داشته و سرمایه‌گذاران خرد و کلان نیز از سود مستمر آن بهره‌مند شوند.',
    ],
    category: 'مدیریت دارایی و املاک تجاری',
    author: {
      name: 'مهندس سارا یوسفی',
      role: 'معاونت توسعه املاک و مستغلات سرآمد',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'کارشناس ارشد مدیریت ساخت و اقتصاد مسکن با ۱۰ سال سابقه هدایت پروژه‌های عظیم تجاری-اداری در کلان‌شهرهای مشهد و تهران.',
      education: 'کارشناسی ارشد مدیریت ساخت، دانشگاه فردوسی مشهد',
    },
    date: '۱۲ شهریور ۱۴۰۵',
    readTime: '۵ دقیقه',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'برج‌های مدرن اداری و مدیریت املاک و مستغلات',
    tags: ['املاک', 'صندوق املاک', 'نقدشوندگی', 'سرمایه‌گذاری پایدار', 'REITs'],
    keyTakeaways: [
      'نقدپذیری بالا از طریق بورس برای دارایی‌های فیزیکی سنگین و دیرنقدشونده',
      'کسب بازدهی نقدی مستمر از اجاره واحدهای اداری و تجاری پریمیوم',
      'معافیت‌های مالیاتی ساختاریافته برای صندوق‌های سرمایه‌گذاری املاک',
    ],
    quote: {
      text: 'تبدیل دارایی‌های سنگین ملکی به واحدهای خرد بورسی، دموکراتیزه کردن سرمایه‌گذاری در مطمئن‌ترین کلاس دارایی کشور است.',
      author: 'مهندس سارا یوسفی',
      role: 'معاونت املاک و مستغلات',
    },
    statsHighlight: {
      label: 'بازدهی نقدی تقسیمی مستمر',
      value: '۳۴.۵٪',
      change: '+۶.۲٪',
      note: 'سود نقدی سالانه حاصل از اجاره‌داری واحدهای مدرن',
    },
    sections: [
      {
        id: 'reits-structure',
        title: '۱. ساختار حقوقی و عملیاتی صندوق‌های زمین و ساختمان',
        paragraphs: [
          'صندوق‌های زمین و ساختمان و املاک و مستغلات در چارچوب قوانین سازمان بورس، این بستر را ایجاد می‌کنند که پروژه‌های ساختمانی بدون وابستگی به تسهیلات گران‌قیمت بانکی تامین مالی شوند.',
        ],
      },
      {
        id: 'liquidity-advantage',
        title: '۲. مزیت نقدشوندگی روزانه برای سرمایه‌گذاران',
        paragraphs: [
          'خرید و فروش یونیت‌های سرمایه‌گذاری در کسری از ثانیه در بورس، ریسک قفل شدن سرمایه در بازار راکد مسکن را برای همیشه برطرف ساخته است.',
        ],
      },
    ],
    initialLikes: 112,
    comments: [],
  },
  {
    id: 'article-4',
    title: 'هم‌افزایی بیمه و سرمایه‌گذاری: معماری مدیریت ریسک زنجیره‌ای در گروه سامان',
    summary: 'چگونگی ایجاد پوشش‌های چندلایه اعتباری و بیمه‌ای برای تضمین امنیت سود تقسیمی و پایداری عملیاتی شرکت‌های زیرمجموعه.',
    content: [
      'وابستگی هلدینگ سرآمد سرمایه ایلیا به شرکت بیمه سامان (سهامی عام)، فرصتی کم‌نظیر در طراحی ابزارهای مالی بیمه‌محور (InsurTech & Guaranteed Yield) ایجاد نموده است.',
      'با ادغام ارزیابی‌های ریسک اکچوئری بیمه در غربالگری فرصت‌های سرمایه‌گذاری، هلدینگ توانسته ضریب ورشکستگی یا نکول شرکت‌های هدف در زنجیره تامین را به حداقل ممکن برساند و در عین حال پوشش‌های اعتباری لازم برای قراردادهای بزرگ را مستقیماً تضمین کند.',
    ],
    category: 'صنعت بیمه و مدیریت ریسک',
    author: {
      name: 'دکتر پیمان نادری',
      role: 'مشاور ریسک و حاکمیت شرکتی',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'عضو انجمن اکچوئری‌های بین‌المللی و مشاور ارشد بیمه سامان در امور مدیریت ریسک اعتباری و حاکمیت شرکتی هلدینگ‌ها.',
      education: 'دکتری ریاضیات مالی و اکچوئری',
    },
    date: '۰۵ شهریور ۱۴۰۵',
    readTime: '۷ دقیقه',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    alt: 'مدیریت ریسک شرکتی و بیمه سرمایه‌گذاری',
    tags: ['بیمه سامان', 'مدیریت ریسک', 'تضمین اصل سرمایه', 'اعتبارسنجی', 'حاکمیت شرکتی'],
    keyTakeaways: [
      'هم‌پوشانی اعتباری و بیمه‌ای برای پروژه‌های بزرگ زیربنایی و قراردادهای صادراتی',
      'کاهش ریسک نکول سرمایه‌گذاری‌ها با مدل‌های اکچوئری پیشرفته',
      'تضمین اصل و حداقل سود سرمایه‌گذاری برای سرمایه‌گذاران کم‌ریسک',
    ],
    quote: {
      text: 'قدرت یک هلدینگ مالی در روزهای بحرانی نمایان می‌شود؛ جایی که چتر بیمه‌ای سامان ریسک‌های سیستماتیک را بی‌اثر می‌کند.',
      author: 'دکتر پیمان نادری',
      role: 'مشاور ریسک و حاکمیت شرکتی',
    },
    statsHighlight: {
      label: 'پوشش ریسک اعتباری پورتفوی',
      value: '۹۹.۲٪',
      change: 'ایمن',
      note: 'تضمین کامل قراردادها و سبدهای با درآمد ثابت',
    },
    sections: [
      {
        id: 'risk-mesh',
        title: '۱. طراحی ماتریس ریسک چندلایه در گروه مالی سامان',
        paragraphs: [
          'پوشش‌های بیمه اتکایی و ضمانت‌نامه‌های معتبر بانکی و بیمه‌ای، ریسک نکول تعهدات شرکت‌های زیرمجموعه را به صفر نزدیک می‌کند.',
        ],
      },
    ],
    initialLikes: 87,
    comments: [],
  },
];

export const ARTICLES_DATA_EN: ArticleItem[] = [
  {
    id: 'article-1',
    title: 'Macroeconomic Outlook 2026 & Resilient Asset Allocation Strategies',
    summary: 'A comprehensive evaluation of inflation trends, interbank lending rates, fixed-income yields, and their impact on optimal holding portfolio allocation.',
    content: [
      'Amidst macroeconomic structural complexities and ongoing shifts in monetary policy, portfolio optimization demands a rigorous understanding of multi-asset cross-correlations. Historical empirical data confirms that multi-sector holdings with systematic diversification have consistently achieved superior Sharpe ratios compared to the broad stock exchange benchmark.',
      'A cornerstone of Ilya Saramad Capital Holding’s philosophy is Dynamic Asset Allocation (DAA). Within this paradigm, fixed-income weighting is actively calibrated against interest rate curves while counter-cyclical opportunities in prime commercial real estate and export-oriented equities are harvested.',
      'Furthermore, enterprise risk telemetry platforms enable holding directors to monitor real-time leverage and liquidity metrics, ensuring surplus capital reserves are prepared to capture high-conviction assets trading beneath their intrinsic fundamental value during market dislocations.',
    ],
    category: 'Macroeconomics & Monetary Policy',
    author: {
      name: 'Dr. Mohammadreza Sharifi',
      role: 'Chief Investment Officer (CIO)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Ph.D. in Financial Economics from University of Tehran with over 15 years leading institutional investment committees and sovereign pension funds.',
      education: 'Ph.D. in Financial Economics',
    },
    date: 'Sep 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Macroeconomic and financial analytics chart',
    featured: true,
    tags: ['Macroeconomics', 'Asset Allocation', 'Interest Rates', 'TSE Equities', 'Portfolio Risk'],
    keyTakeaways: [
      'Implementing dynamic asset allocation models to counter inflationary volatility and rate cycle shifts',
      'Generating predictable cash flow using balanced fixed-income instruments and dividend value equities',
      'Maintaining conservative balance sheet leverage to seize market overcorrection opportunities',
    ],
    quote: {
      text: 'Resilience in volatile capital markets does not mean risk avoidance; it is the art of negative correlation mapping and disciplined liquidity timing.',
      author: 'Dr. Mohammadreza Sharifi',
      role: 'Chief Investment Officer',
    },
    statsHighlight: {
      label: 'Sharpe Ratio Improvement',
      value: '2.4x',
      change: '+38%',
      note: 'Compared to peer multi-sector institutional benchmarks',
    },
    sections: [
      {
        id: 'macro-framework',
        title: '1. Theoretical Framework of Mid-Term Asset Allocation',
        paragraphs: [
          'In modern quantitative finance, portfolio efficiency is fundamentally determined by asset variance-covariance matrices. Recent empirical history proves that single-asset concentration severely erodes real purchasing power over multi-year cycles.',
          'Saramad Capital re-engineered its weighting matrix to continuously allocate 40% into high-liquidity instruments, 30% into inflation-shielded REITs, and 30% into export-driven value equities.',
        ],
        bulletPoints: [
          'Continuous real-time tracking of risk-free yields and interbank spreads',
          'Elasticity modeling on foreign exchange fluctuation pass-through to corporate EBITDA margins',
          'Dynamic stress-testing across holding subsidiary balance sheets',
        ],
      },
      {
        id: 'monetary-policy-impact',
        title: '2. Impact of Monetary Tightening on Corporate Liquidity',
        paragraphs: [
          'Managing institutional day-to-day liquidity during credit rationing cycles is a core survival parameter. Dedicated private funds engineered by Saramad ensure zero dependency on emergency bank facilities.',
        ],
        callout: 'Executive Insight: Maintaining dedicated tactical cash reserves increases investment acquisition agility by up to 40% during market panics.',
      },
      {
        id: 'conclusion-recommendations',
        title: '3. Strategic Recommendations for Institutional Allocators',
        paragraphs: [
          'Institutional directors should prioritize systematic governance over short-term price forecasting. Partnering with Saramad Capital guarantees institutional-grade fiduciary stewardship.',
        ],
      },
    ],
    initialLikes: 142,
    comments: [
      {
        id: 'c1',
        name: 'Behzad Kamali',
        role: 'Senior Market Strategist',
        date: 'Sep 13, 2026',
        content: 'Extraordinarily rigorous paper. The Sharpe ratio analysis for multi-sector conglomerates is a rare gem.',
        likes: 12,
      },
    ],
  },
  {
    id: 'article-2',
    title: 'The AI Revolution in Asset Management: From Heuristics to Cognitive Quant Models',
    summary: 'How machine learning, sentiment classification, and natural language processing are transforming fundamental screening at Saramad Holding.',
    content: [
      'Applying natural language sentiment analysis alongside direct automated parsing of audited financial filings has established an unprecedented institutional decision-making advantage. At Saramad Asset Management, corporate fundamentals are continuously screened with ultra-high compute speeds.',
      'Predictive order-flow algorithms identify short-term microstructural pricing anomalies in fractions of a second, effectively insulating core portfolios from contagion risk. This technological breakthrough delivers consistently superior risk-adjusted alpha for fund participants.',
    ],
    category: 'Venture Capital & FinTech',
    author: {
      name: 'Eng. Arash Karimi',
      role: 'Director of Ilya Ventures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'M.Sc. in Artificial Intelligence from Sharif University of Technology, pioneering algorithmic market-making and real-time financial NLP pipelines.',
      education: 'M.Sc. in Artificial Intelligence',
    },
    date: 'Sep 08, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    alt: 'Algorithmic trading and artificial intelligence',
    tags: ['Artificial Intelligence', 'FinTech', 'Quant Models', 'Asset Management', 'Machine Learning'],
    keyTakeaways: [
      'Eliminating human cognitive bias via systematic algorithmic screening and neural feature extraction',
      'Automating regulatory financial disclosure analysis through NLP pipelines in sub-3-second latency',
      'Executing statistical arbitrage with microsecond risk verification safeguards',
    ],
    quote: {
      text: 'AI will not replace investment managers; rather, investment managers who leverage AI will replace those who do not.',
      author: 'Eng. Arash Karimi',
      role: 'VP of Technology & FinTech',
    },
    statsHighlight: {
      label: 'Financial Filing Parsing Latency',
      value: '2.8s',
      change: '95% faster',
      note: 'Automated Codal parsing and metrics extraction',
    },
    sections: [
      {
        id: 'nlp-codal-parsing',
        title: '1. Natural Language Processing for Persian Financial Filings',
        paragraphs: [
          'Processing hundreds of daily regulatory filings on Codal manually introduces latency that destroys alpha. Our transformer pipelines classify key material events in real time.',
        ],
      },
    ],
    initialLikes: 198,
    comments: [],
  },
  {
    id: 'article-3',
    title: 'The Strategic Role of REITs in Delivering Low-Beta Holding Cash Flows',
    summary: 'A strategic blueprint for commercial property securitization and leveraging public exchange mechanisms for real estate liquidity.',
    content: [
      'Real estate has historically stood as a premier store of value throughout economic history. Nonetheless, illiquidity and high friction transaction costs have traditionally restricted its flexibility.',
      'By pioneering Real Estate Investment Trusts (REITs), Saramad Holding unlocks institutional liquidity from premium office towers. Continuous rental streams flow directly into subsidiary treasury operations while offering public market investors steady, quarterly cash dividends.',
    ],
    category: 'Asset Management & Commercial Real Estate',
    author: {
      name: 'Eng. Sara Yousefi',
      role: 'VP of Real Estate Development',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Real estate economist and construction director managing major Grade-A corporate towers across Iran.',
      education: 'M.Sc. in Construction Management',
    },
    date: 'Sep 02, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern commercial office towers',
    tags: ['Real Estate', 'REITs', 'Liquidity', 'Sustainable Yield'],
    keyTakeaways: [
      'Achieving high market liquidity for heavy physical infrastructure assets',
      'Capturing recurring rental yields from Grade-A commercial office towers',
      'Tax-advantaged structuring under Securities and Exchange Organization regulations',
    ],
    quote: {
      text: 'Securitizing prime commercial real estate into fractional exchange units democratizes access to Iran’s most reliable asset class.',
      author: 'Eng. Sara Yousefi',
      role: 'VP of Real Estate',
    },
    statsHighlight: {
      label: 'Annual Cash Dividend Yield',
      value: '34.5%',
      change: '+6.2%',
      note: 'Quarterly distributed cash yields from corporate leases',
    },
    sections: [],
    initialLikes: 112,
    comments: [],
  },
  {
    id: 'article-4',
    title: 'Insurance and Capital Synergy: Structuring Chain Risk Architecture in Saman Group',
    summary: 'Developing multi-tier credit protections and actuarial risk frameworks to secure dividend reliability across subsidiaries.',
    content: [
      'The strategic alignment of Ilya Saramad Capital Holding with Saman Insurance (Public Joint Stock) presents rare competitive advantages in structuring InsurTech solutions and capital-guaranteed instruments.',
      'By embedding actuarial risk modeling directly into holding due-diligence protocols, default probabilities across supplier and counterparty networks are substantially compressed while credit guarantees facilitate landmark infrastructure contracts.',
    ],
    category: 'Insurance Industry & Risk Governance',
    author: {
      name: 'Dr. Peyman Naderi',
      role: 'Senior Governance & Risk Advisor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Fellow of Actuarial Society and Senior Risk Consultant at Saman Insurance.',
      education: 'Ph.D. in Actuarial Mathematics',
    },
    date: 'Aug 26, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate risk management and insurance analytics',
    tags: ['Saman Insurance', 'Risk Management', 'Capital Guarantee', 'Underwriting'],
    keyTakeaways: [
      'Integrated credit and insurance wrappers for landmark infrastructure',
      'Mitigating investment counterparty default through actuarial modeling',
      'Principal protection guarantees for institutional capital partners',
    ],
    quote: {
      text: 'A financial holding’s true strength is proven in systemic stress periods, where Saman’s insurance umbrella neutralizes volatility.',
      author: 'Dr. Peyman Naderi',
      role: 'Senior Risk Advisor',
    },
    statsHighlight: {
      label: 'Credit Risk Shield Coverage',
      value: '99.2%',
      change: 'Secured',
      note: 'Comprehensive underwriting on fixed-income debt',
    },
    sections: [],
    initialLikes: 87,
    comments: [],
  },
];

export const ARTICLES_DATA = ARTICLES_DATA_FA;

export const getArticlesData = (lang: Language = 'fa'): ArticleItem[] => {
  return lang === 'en' ? ARTICLES_DATA_EN : ARTICLES_DATA_FA;
};

export const getArticleById = (id: string, lang: Language = 'fa'): ArticleItem | undefined => {
  const articles = getArticlesData(lang);
  return articles.find((item) => item.id === id);
};
