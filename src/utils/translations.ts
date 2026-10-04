export type Language = 'fa' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    stats: string;
    portfolio: string;
    subsidiaries: string;
    dashboard: string;
    news: string;
    articles: string;
    consultation: string;
    team: string;
    researchBadge: string;
    otherSections: string;
    designSpec: string;
    menuTitle: string;
    menuSubtitle: string;
    close: string;
    bookConsultationShort: string;
    phoneLabel: string;
    hoursLabel: string;
    themeToggle: string;
    darkMode: string;
    lightMode: string;
  };

  drawer: {
    about: { label: string; desc: string };
    services: { label: string; desc: string };
    stats: { label: string; desc: string };
    portfolio: { label: string; desc: string };
    subsidiaries: { label: string; desc: string };
    dashboard: { label: string; desc: string };
    news: { label: string; desc: string };
    contact: { label: string; desc: string };
    designSystemBadge: string;
    designSystemDesc: string;
    holdingGroupTitle: string;
    holdingGroupDesc: string;
    headquartersTitle: string;
    headquartersAddress: string;
  };
  hero: {
    badge: string;
    subBadge: string;
    eyebrow: string;
    affiliated: string;
    titleWords: string[];
    subtitle: string;
    ctaConsultation: string;
    ctaArticles: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metric1Val: string;
    metric1Lbl: string;
    metric2Val: string;
    metric2Lbl: string;
    trustTitle: string;
    supervisedBy: string;
    scrollDown: string;
    badgeAudit: string;
    badgeGrowth: string;
    cardDashboardTitle: string;
    cardDashboardSubtitle: string;
    cardLive: string;
    correlationTitle: string;
    correlationValue: string;
    workingCapitalLabel: string;
    workingCapitalValue: string;
    workingCapitalGrowth: string;
    netAlphaLabel: string;
    netAlphaValue: string;
    netAlphaGrowth: string;
    realtimeCalc: string;
  };
  about: {
    badge: string;
    eyebrow: string;
    title: string;
    desc1: string;
    desc2: string;
    readMore: string;
    pillarsTitle: string;
    pillars: Array<{ title: string; desc: string }>;
    valuesTitle: string;
    values: Array<{ title: string; desc: string }>;
    historyTitle: string;
    historyYears: string;
    historyText: string;
    ctaNetwork: string;
    badgeOffice: string;
    badgeOfficeDesc: string;
    cardAuditLabel: string;
    cardAuditValue: string;
    cardGrowthLabel: string;
    cardGrowthValue: string;
  };
  services: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    requestService: string;
    viewAll: string;
    viewDetails: string;
    closeModal: string;
    advantagesTitle: string;
    requestConsultationFor: string;
  };
  stats: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    sourceAudit: string;
  };
  portfolio: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    returnRateLabel: string;
    assetValueLabel: string;
    detailsBtn: string;
    periodReturn: string;
    allocatedValue: string;
    metricBadgeValue: string;
    metricBadgeLabel: string;
    metricBadgeGrowth: string;
    socialProofCount: string;
    socialProofLabel: string;
    blueCardTitle: string;
    blueCardSubtitle: string;
    blueCardCta: string;
    pill1: string;
    pill2: string;
    pill3: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    reasons: Array<{ title: string; desc: string }>;
  };
  subsidiaries: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    groupTitle: string;
    parentCompany: string;
    clickNodeHint: string;
    ownership: string;
    coreHub: string;
    codalAudit: string;
    samanGovernance: string;
    visitPortal: string;
  };
  dashboard: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    monthly: string;
    quarterly: string;
    annual: string;
    portfolioLine: string;
    benchmarkLine: string;
    growthRate: string;
    sharpeRatio: string;
    auditBadge: string;
    auditDesc: string;
    totalAssetsValue: string;
    yoyGrowth: string;
    saramadPortfolio: string;
    tseBenchmark: string;
    allocationEquities: string;
    allocationRealEstate: string;
    allocationFixedIncome: string;
    allocationVenture: string;
    betaLabel: string;
    betaSub: string;
    sharpeLabel: string;
    sharpeSub: string;
    maxDdLabel: string;
    maxDdSub: string;
    cumDivLabel: string;
    cumDivSub: string;
    allocationTitle: string;
    strategicComposition: string;
    totalAssetsLabel: string;
    balancedLabel: string;
  };
  news: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    readMore: string;
    readFullReport: string;
    viewAllNews: string;
    viewAllResearch: string;
    minsRead: string;
  };
  teamSection: {
    badge: string;
    title: string;
    subtitle: string;
    viewAllTeam: string;
    viewAllBoard: string;
  };
  team: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAllTeam: string;
    viewAllBoard: string;
  };
  cta: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    hoursLabel: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    serviceType: string;
    serviceSelect: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    bookDirect: string;
    requestCall: string;
    bookMeetingLink: string;
    successMsg: string;
  };
  footer: {
    tagline: string;
    subTagline: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    contactInfo: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    subscribedSuccess: string;
    affiliatedWith: string;
    backToTop: string;
    rights: string;
    privacy: string;
    terms: string;
    compliance: string;
    licenseInfo: string;
  };
  teamPage: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    mainPortal: string;
    bookMeetingWithExecutives: string;
    statYears: string;
    statCommittees: string;
    statDegree: string;
    statSectors: string;
    searchPlaceholder: string;
    allCategories: string;
    board: string;
    investment: string;
    governance: string;
    fintech: string;
    experience: string;
    education: string;
    achievements: string;
    directMeeting: string;
    contactModalTitle: string;
    backToHome: string;
    viewProfile: string;
    noMembersFound: string;
    noMembersSubtitle: string;
    showAllMembers: string;
    coreValuesEyebrow: string;
    coreValuesTitle: string;
    val1Title: string;
    val1Desc: string;
    val2Title: string;
    val2Desc: string;
    val3Title: string;
    val3Desc: string;
    meetingBoxTitle: string;
    meetingBoxSubtitle: string;
    bookMeetingBtn: string;
    bioTitle: string;
    achievementsTitle: string;
    bookWithThisLeader: string;
    valuesTitle: string;
    charterTitle: string;
    charterPillars: Array<{ title: string; desc: string }>;
  };
  articlesPage: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    mainPortal: string;
    backToPortal: string;
    backToHome: string;
    backToArticles: string;
    searchPlaceholder: string;
    allArticles: string;
    featured: string;
    featuredBadge: string;
    keyTakeaways: string;
    keyTakeawaysTitle: string;
    shareArticle: string;
    shareCopied: string;
    requestConsultationOnTopic: string;
    author: string;
    minsRead: string;
    noResults: string;
    readFull: string;
    read: string;
    listTitle: string;
    showAllCategories: string;
    noArticlesFound: string;
    noArticlesSubtitle: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterSuccess: string;
    newsletterPlaceholder: string;
    subscribeBtn: string;
    tagsLabel: string;
    closeModal: string;
  };
  articleDetail: {
    backToArticles: string;
    readingProgress: string;
    textSize: string;
    shareArticle: string;
    shareSuccess: string;
    bookmarkArticle: string;
    bookmarked: string;
    keyTakeawaysTitle: string;
    tableOfContents: string;
    aboutAuthor: string;
    educationLabel: string;
    requestConsultation: string;
    helpfulQuestion: string;
    helpfulBtn: string;
    insightfulBtn: string;
    recommendBtn: string;
    commentsTitle: string;
    noCommentsYet: string;
    leaveComment: string;
    commentNamePlaceholder: string;
    commentRolePlaceholder: string;
    commentContentPlaceholder: string;
    submitComment: string;
    commentSuccess: string;
    relatedArticles: string;
    prevArticle: string;
    nextArticle: string;
    shareVia: string;
    whatsapp: string;
    telegram: string;
    linkedin: string;
    twitter: string;
    copyLink: string;
    copied: string;
    consultationBannerTitle: string;
    consultationBannerDesc: string;
    consultationBannerBtn: string;
    notFoundTitle: string;
    notFoundDesc: string;
    notFoundBtn: string;
    expertQuote: string;
    viewAuthorArticles: string;
    statsLabel: string;
  };
  articles: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    mainPortal: string;
    backToPortal: string;
    backToHome: string;
    backToArticles: string;
    searchPlaceholder: string;
    allArticles: string;
    featured: string;
    featuredBadge: string;
    keyTakeaways: string;
    keyTakeawaysTitle: string;
    shareArticle: string;
    shareCopied: string;
    requestConsultationOnTopic: string;
    author: string;
    minsRead: string;
    noResults: string;
    readFull: string;
    read: string;
    listTitle: string;
    showAllCategories: string;
    noArticlesFound: string;
    noArticlesSubtitle: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterSuccess: string;
    newsletterPlaceholder: string;
    subscribeBtn: string;
    tagsLabel: string;
    closeModal: string;
  };
  consultation: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    mainPortal: string;
    backToPortal: string;
    backToHome: string;
    successTitle: string;
    successDesc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    formatInPerson: string;
    formatOnline: string;
    preferredSlotLabel: string;
    step3Title: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    consultationType: string;
    meetingFormat: string;
    inPerson: string;
    inPersonDesc: string;
    online: string;
    onlineDesc: string;
    preferredDate: string;
    preferredTime: string;
    portfolioRange: string;
    notes: string;
    notesPlaceholder: string;
    privacyNote: string;
    submitBtn: string;
    submitBooking: string;
    bookingSuccessTitle: string;
    bookingSuccessDesc: string;
    mashhadOfficeTitle: string;
    mashhadOfficeAddress: string;
    hqTitle: string;
    directPhone: string;
    workingHours: string;
    emailLabel: string;
    subsidiaryLines: string;
    faqEyebrow: string;
    faqTitle: string;
    callDirect: string;
    trackingCode: string;
  };
  consultationPage: {
    badge: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    mainPortal: string;
    backToPortal: string;
    backToHome: string;
    successTitle: string;
    successDesc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    formatInPerson: string;
    formatOnline: string;
    preferredSlotLabel: string;
    step3Title: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    consultationType: string;
    meetingFormat: string;
    inPerson: string;
    inPersonDesc: string;
    online: string;
    onlineDesc: string;
    preferredDate: string;
    preferredTime: string;
    portfolioRange: string;
    notes: string;
    notesPlaceholder: string;
    privacyNote: string;
    submitBtn: string;
    submitBooking: string;
    bookingSuccessTitle: string;
    bookingSuccessDesc: string;
    mashhadOfficeTitle: string;
    mashhadOfficeAddress: string;
    hqTitle: string;
    directPhone: string;
    workingHours: string;
    emailLabel: string;
    subsidiaryLines: string;
    faqEyebrow: string;
    faqTitle: string;
    callDirect: string;
    trackingCode: string;
  };
  specModal: {
    title: string;
    subtitle: string;
    close: string;
  };
  common: {
    languageName: string;
    switchTo: string;
    persian: string;
    english: string;
    scrollProgress: string;
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fa: {
    nav: {
      home: 'صفحه اصلی',
      about: 'درباره ما',
      services: 'خدمات',
      stats: 'شاخص‌ها',
      portfolio: 'پرتفوی',
      subsidiaries: 'شرکت‌های تابعه',
      dashboard: 'بازدهی و عملکرد',
      news: 'اخبار',
      articles: 'مقالات و تحلیل‌ها',
      consultation: 'وقت مشاوره',
      team: 'تیم ما',
      researchBadge: 'پژوهش‌ها',
      otherSections: 'سایر بخش‌ها',
      designSpec: 'هویت بصری',
      menuTitle: 'دسترسی سریع',
      menuSubtitle: 'پرتال رسمی هلدینگ سرآمد سرمایه ایلیا',
      close: 'بستن',
      bookConsultationShort: 'رزرو جلسه',
      phoneLabel: '۰۵۱-۳۷۶۲۲۲۲۲',
      hoursLabel: 'همه روزه ۹ الی ۱۸',
      themeToggle: 'تغییر حالت شب و روز',
      darkMode: 'حالت تاریک',
      lightMode: 'حالت روشن',
    },
    drawer: {
      about: { label: 'درباره هلدینگ', desc: 'تاریخچه، چشم‌انداز، ساختار سهامداری و اصول راهبری' },
      services: { label: 'خدمات و مدیریت ثروت', desc: 'سبدگردانی، تأمین مالی، مشاوره سرمایه‌گذاری و M&A' },
      stats: { label: 'آمار و شاخص‌های کلیدی', desc: 'ارقام عملکرد، رتبه بورس و حجم دارایی تحت مدیریت' },
      portfolio: { label: 'نمونه سرمایه‌گذاری‌ها', desc: 'پرتفوی سهامی، پروژه‌های ملکی و طرح‌های دانش‌بنیان' },
      subsidiaries: { label: 'شبکه شرکت‌های تابعه', desc: 'زنجیره هم‌افزایی گروه سرآمد و بیمه سامان' },
      dashboard: { label: 'داشبورد عملکرد و بازدهی', desc: 'نمودار تعاملی بازدهی فصلی و سالانه در مقایسه با شاخص' },
      news: { label: 'اخبار و گزارش‌های رسمی', desc: 'مصوبات مجامع عمومی، افشای اطلاعات و اطلاعیه‌ها' },
      contact: { label: 'اطلاعات تماس و دفتر مشهد', desc: 'مشهد، بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم' },
      designSystemBadge: 'طراحی شیشه مایع',
      designSystemDesc: 'سیستم دیزاین اختصاصی Liquid Glass',
      holdingGroupTitle: 'گروه مالی سامان',
      holdingGroupDesc: 'سهامدار عمده و پشتیبان استراتژیک هلدینگ',
      headquartersTitle: 'دفتر مرکزی (مشهد)',
      headquartersAddress: 'بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم',
    },
    hero: {
      badge: 'هلدینگ سرمایه‌گذاری سرآمد سرمایه ایلیا',
      subBadge: 'وابسته به بیمه سامان',
      eyebrow: 'هلدینگ سرمایه‌گذاری سرآمد سرمایه ایلیا',
      affiliated: 'وابسته به بیمه سامان',
      titleWords: ['آینده', 'را', 'با', 'اطمینان', 'می‌سازیم'],
      subtitle: 'خلق ارزش پایدار برای سرمایه‌گذاران نهادی و حقیقی با اتکا به حکمرانی شفاف، سبدگردانی هوشمند و مدیریت راهبردی دارایی‌ها در اقتصاد کلان.',
      ctaConsultation: 'درخواست مشاوره اختصاصی',
      ctaArticles: 'مطالعه تحلیل‌ها و مقالات',
      ctaPrimary: 'درخواست مشاوره اختصاصی',
      ctaSecondary: 'مشاهده خدمات سرمایه‌گذاری',
      metric1Val: '۸۵ هزار میلیارد ریال',
      metric1Lbl: 'حجم دارایی تحت مدیریت (AUM)',
      metric2Val: '+۴۲٪',
      metric2Lbl: 'میانگین بازدهی مرکب سالانه',
      trustTitle: 'نهاد مالی مورد تایید و تحت نظارت سازمان بورس و اوراق بهادار',
      supervisedBy: 'پشتیبانی شده توسط شبکه مالی بیمه سامان (سهامی عام)',
      scrollDown: 'مشاهده بخش‌های هلدینگ',
      badgeAudit: 'حسابرسی رسمی و شفافیت بورس',
      badgeGrowth: 'بیش از ۱۵ سال بازدهی مستمر',
      cardDashboardTitle: 'هوشمندی دارایی و سبدگردانی',
      cardDashboardSubtitle: 'نرخ رشد پرتفوی اختصاصی سرآمد',
      cardLive: 'زنده',
      correlationTitle: 'ضریب همبستگی با بازار',
      correlationValue: '۰.۷۲ (ریسک کنترل‌شده)',
      workingCapitalLabel: 'دارایی تحت مدیریت',
      workingCapitalValue: '۸۵ همت',
      workingCapitalGrowth: '+۴۲٪ سالانه',
      netAlphaLabel: 'بازدهی مازاد (آلفا)',
      netAlphaValue: '+۱۸.۴٪',
      netAlphaGrowth: 'نسبت به شاخص',
      realtimeCalc: 'سامانه تحلیل بلادرنگ ریسک',
    },
    about: {
      badge: 'درباره هلدینگ سرآمد سرمایه ایلیا',
      eyebrow: 'اصالت، شفافیت و هم‌افزایی سرمایه',
      title: 'معماری سرمایه‌گذاری هوشمند و مدیریت ثروت پایدار',
      desc1: 'هلدینگ سرآمد سرمایه ایلیا (سهامی عام) به عنوان یکی از بازوهای پیشرو سرمایه‌گذاری و مدیریت دارایی در کشور، با تکیه بر تخصص نخبگان مالی، زیرساخت‌های فین‌تک و پشتوانه بیمه سامان بنیان‌گذاری شده است.',
      desc2: 'رویکرد ما مبتنی بر شناسایی ساختاریافته فرصت‌های پربازده، مدیریت دقیق ریسک نامتقارن و ایجاد ارزش مشترک برای سهامداران و شرکای استراتژیک است.',
      readMore: 'مطالعه سوابق و منشور اخلاقی',
      pillarsTitle: 'ارکان چهارگانه راهبری سرآمد',
      pillars: [
        { title: 'حکمرانی شفاف و انطباق', desc: 'رعایت بالاترین استانداردهای شفافیت بورس و نظارت چندلایه‌ای.' },
        { title: 'سبدگردانی داده‌محور', desc: 'استفاده از الگوریتم‌های هوش مصنوعی و مدل‌سازی پیشرفته ریسک.' },
        { title: 'هم‌افزایی اکوسیستمی', desc: 'اتصال منابع هلدینگ به زنجیره خدمات مالی و بیمه‌ای سامان.' },
        { title: 'نوآوری در ابزارهای مالی', desc: 'طراحی صندوق‌های تخصصی، انتشار اوراق و تأمین مالی نوین.' },
      ],
      valuesTitle: 'ارزش‌های کلیدی سازمان',
      values: [
        { title: 'حکمرانی شفاف و نظارت چندلایه', desc: 'رعایت دقیق الزامات سازمان بورس و گزارش‌دهی حسابرسی شده.' },
        { title: 'مدیریت علمی و نامتقارن ریسک', desc: 'تضمین حفظ اصل سرمایه و بهره‌مندی حداکثری از صعود بازارها.' },
        { title: 'هم‌افزایی با اکوسیستم بیمه سامان', desc: 'اتصال به شبکه گسترده خدمات مالی، سرمایه‌ای و بیمه‌ای در سراسر کشور.' },
        { title: 'توسعه فناوری و زیرساخت فین‌تک', desc: 'به‌کارگیری سیستم‌های هوشمند معاملات الگوریتمی و هوش مصنوعی.' },
      ],
      historyTitle: 'تجربه و اصالت حرفه‌ای',
      historyYears: 'بیش از ۱۵ سال',
      historyText: 'حضور مستمر در ارکان تصمیم‌گیری بازار سرمایه، طراحی ابزارهای بدهی و مدیریت صندوق‌های سرمایه‌گذاری ممتاز کشوری.',
      ctaNetwork: 'مشاهده شبکه شرکت‌های تابعه و هم‌افزایی',
      badgeOffice: 'دفتر مرکزی هلدینگ در مشهد',
      badgeOfficeDesc: 'مرکز راهبری دارایی‌ها و سرمایه‌گذاری‌های شرق کشور',
      cardAuditLabel: 'حسابرسی رسمی بورس',
      cardAuditValue: 'گزارش مقبول و شفاف',
      cardGrowthLabel: 'ارزش دارایی تحت مدیریت',
      cardGrowthValue: '۸۵ هزار میلیارد ریال',
    },
    services: {
      badge: 'خدمات تخصصی و مدیریت ثروت',
      eyebrow: 'طیف جامع راهکارهای ثروت',
      title: 'راهکارهای جامع سرمایه‌گذاری برای نهادها و اشخاص',
      subtitle: 'طیف کاملی از خدمات مهندسی مالی، سبدگردانی اختصاصی، تأمین مالی شرکتی و شتاب‌دهی استارتاپ‌های فین‌تک.',
      requestService: 'ثبت درخواست خدمت',
      viewAll: 'مشاهده تمام خدمات',
      viewDetails: 'مشاهده جزئیات و ساختار',
      closeModal: 'بستن',
      advantagesTitle: 'مزیت‌ها و ویژگی‌های کلیدی',
      requestConsultationFor: 'درخواست مشاوره پیرامون',
    },
    stats: {
      badge: 'شاخص‌های کلیدی عملکرد',
      eyebrow: 'انطباق و حسابرسی رسمی',
      title: 'قدرت مالی و بازدهی در آینه ارقام',
      subtitle: 'عملکرد قابل اتکا و شفاف هلدینگ سرآمد سرمایه ایلیا در طول سال‌های متمادی در بازار سرمایه ایران.',
      sourceAudit: 'بر اساس آخرین گزارش صورت‌های مالی تایید شده سازمان بورس',
    },
    portfolio: {
      badge: 'دپارتمان مدیریت ثروت و سرمایه‌گذاری',
      eyebrow: 'دپارتمان مدیریت ثروت و سرمایه‌گذاری هوشمند',
      title: 'سرمایه‌گذاری راهبردی و سبدگردانی اختصاصی',
      subtitle: 'ما به شما کمک می‌کنیم تا با اتکا به تحلیل‌های عمیق بنیادی و زیرساخت بیمه سامان، از تمامی ظرفیت‌های بازار سرمایه بهره‌مند شوید و بالاترین بازدهی را با ریسک کنترل‌شده کسب نمایید.',
      returnRateLabel: 'بازدهی دوره',
      assetValueLabel: 'ارزش برآوردی دارایی',
      detailsBtn: 'مشاهده جزئیات پروژه',
      periodReturn: 'بازدهی دوره',
      allocatedValue: 'ارزش برآوردی دارایی',
      metricBadgeValue: '+۸۵ همت',
      metricBadgeLabel: 'دارایی تحت مدیریت و مشاوره تخصصی',
      metricBadgeGrowth: '+۴۲٪ بازدهی سالانه',
      socialProofCount: '+۵۰۰',
      socialProofLabel: 'همراه با بیش از ۵۰۰ سرمایه‌گذار نهادی و شریک تجاری معتبر',
      blueCardTitle: 'یک قدم تا دستیابی به بالاترین بازدهی پایدار',
      blueCardSubtitle: 'شروع سرمایه‌گذاری هوشمند فقط با یک کلیک!',
      blueCardCta: 'دریافت مشاوره رایگان سرمایه‌گذاری',
      pill1: 'مشاور و مدیر پرتفوی اختصاصی',
      pill2: 'تضمین اعتبار و پشتوانه بیمه سامان',
      pill3: 'ارزیابی رایگان ریسک و بازدهی',
      whyChooseTitle: 'چرا سرمایه‌گذاری با هلدینگ سرآمد بهترین گزینه است؟',
      whyChooseSubtitle: 'مزیت‌های رقابتی هلدینگ سرآمد نسبت به سایر روش‌های سرمایه‌گذاری سنتی',
      reasons: [
        {
          title: 'نتیجه‌گرایی و بازدهی مازاد (Alpha)',
          desc: 'استراتژی‌های پویای سبدگردانی به شما کمک می‌کند تا با سرعت و دقت به اهداف مالی خود دست یابید و همواره بازدهی بالاتری نسبت به شاخص کل بورس تجربه کنید.',
        },
        {
          title: 'صرفه‌جویی در هزینه و بهینه‌سازی ریسک',
          desc: 'تنها زمانی کارمزد توافقی دریافت می‌شود که سبد سرمایه‌گذاری شما به سودآوری هدف برسد؛ امری که منافع ما را مستقیماً با موفقیت مالی شما پیوند می‌زند.',
        },
        {
          title: 'پشتوانه بیمه سامان و اعتبار رسمی بورس',
          desc: 'نظارت چندلایه سازمان بورس و اوراق بهادار همراه با پوشش‌های تضمین و اعتبار شبکه مالی بیمه سامان، بالاترین ضریب اطمینان را برای سرمایه شما فراهم می‌سازد.',
        },
        {
          title: 'تحلیل هوشمند و دسترسی به سامانه‌های بلادرنگ',
          desc: 'گزارش‌دهی شفاف هفتگی، پنل اختصاصی مانیتورینگ عملکرد دارایی‌ها و تیم تحلیل‌گران زبده در تمام مراحل در کنار شما خواهند بود.',
        },
      ],
    },
    subsidiaries: {
      badge: 'زنجیره ارزش و شبکه شرکت‌ها',
      eyebrow: 'هم‌افزایی اکوسیستمی',
      title: 'شبکه شرکت‌های تابعه و هم‌پیمانان استراتژیک',
      subtitle: 'هم‌افزایی ساختاریافته میان ارکان گروه سرآمد و بیمه سامان برای پوشش حداکثری نیازهای مالی و سرمایه‌گذاری کشور.',
      groupTitle: 'هلدینگ سرآمد سرمایه ایلیا',
      parentCompany: 'بیمه سامان (سهامی عام)',
      clickNodeHint: 'برای مشاهده اطلاعات و شاخص‌های هر شرکت تابعه، روی کارت آن کلیک کنید.',
      ownership: 'سهم مالکیت',
      coreHub: 'مرکز راهبری گروه',
      codalAudit: 'گزارش‌های افشای رسمی سامانه کدال',
      samanGovernance: 'تحت نظارت و راهبری گروه مالی سامان',
      visitPortal: 'مشاهده پرتال و جزئیات شرکت',
    },
    dashboard: {
      badge: 'داشبورد برخط عملکرد مالی',
      eyebrow: 'سامانه تحلیل داده و بازدهی',
      title: 'روند بازدهی تجمیعی در مقایسه با شاخص کل',
      subtitle: 'عملکرد دارایی‌های تحت مدیریت هلدینگ سرآمد سرمایه ایلیا به طور مستمر بازدهی بالاتری نسبت به میانگین بازار سرمایه ثبت نموده است.',
      monthly: 'عملکرد ماهانه',
      quarterly: 'عملکرد فصلی',
      annual: 'روند چندساله',
      portfolioLine: 'بازدهی پرتفوی هلدینگ سرآمد',
      benchmarkLine: 'شاخص کل بورس تهران',
      growthRate: 'نرخ بازدهی مازاد (Alpha)',
      sharpeRatio: 'نسبت شارپ پورتفوی',
      auditBadge: 'گزارش حسابرسی تایید شده',
      auditDesc: 'صورت‌های مالی منتهی به پایان دوره مالی با اخذ گزارش مقبول از جامعه حسابداران رسمی و حسابرس مستقل مورد تایید قرار گرفته است.',
      totalAssetsValue: 'ارزش کل دارایی تحت مدیریت (همت)',
      yoyGrowth: '+۳۴٪ رشد سالانه',
      saramadPortfolio: 'پرتفوی سرآمد',
      tseBenchmark: 'شاخص بورس',
      allocationEquities: 'سهام بورسی و فرابورسی',
      allocationRealEstate: 'املاک و مستغلات',
      allocationFixedIncome: 'اوراق با درآمد ثابت',
      allocationVenture: 'سرمایه‌گذاری خطرپذیر و فین‌تک',
      betaLabel: 'ضریب بتای پورتفوی',
      betaSub: 'ریسک کنترل‌شده',
      sharpeLabel: 'نسبت شارپ',
      sharpeSub: 'عملکرد عالی',
      maxDdLabel: 'حداکثر افت سرمایه (MDD)',
      maxDdSub: 'ریسک نامتقارن',
      cumDivLabel: 'سود نقدی تقسیمی',
      cumDivSub: 'سال مالی اخیر',
      allocationTitle: 'ترکیب دارایی‌های هلدینگ',
      strategicComposition: 'تخصیص استراتژیک پرتفوی',
      totalAssetsLabel: 'کل دارایی',
      balancedLabel: 'متعادل و تنوع‌بخش',
    },
    news: {
      badge: 'رویدادها و اطلاعیه‌های رسمی',
      eyebrow: 'اخبار و گزارش‌های رسمی',
      title: 'تازه‌ترین اخبار، افشای اطلاعات و مجامع',
      subtitle: 'اطلاع‌رسانی بلادرنگ از دستاوردهای بورسی، رویدادهای راهبردی و گزارش‌های مدیریتی هلدینگ سرآمد سرمایه ایلیا.',
      readMore: 'مطالعه کامل خبر',
      readFullReport: 'مطالعه کامل گزارش',
      viewAllNews: 'مشاهده تمام اخبار و گزارش‌ها',
      viewAllResearch: 'مشاهده تمام مقالات و پژوهش‌ها',
      minsRead: 'دقیقه زمان مطالعه',
    },
    teamSection: {
      badge: 'سرمایه انسانی و ارکان راهبری',
      title: 'مدیران ارشد و هیئت مدیره هلدینگ',
      subtitle: 'تیمی از نخبگان مالی، اساتید دانشگاهی و مدیران باسابقه در بازار سرمایه، هدایت استراتژیک هلدینگ را بر عهده دارند.',
      viewAllTeam: 'مشاهده تمام اعضای تیم، کمیته‌ها و سوابق تحصیلی',
      viewAllBoard: 'مشاهده تمام اعضای تیم و مدیران',
    },
    team: {
      badge: 'سرمایه انسانی و ارکان راهبری',
      eyebrow: 'راهبری و هدایت استراتژیک',
      title: 'مدیران ارشد و هیئت مدیره هلدینگ',
      subtitle: 'تیمی از نخبگان مالی، اساتید دانشگاهی و مدیران باسابقه در بازار سرمایه، هدایت استراتژیک هلدینگ را بر عهده دارند.',
      viewAllTeam: 'مشاهده تمام اعضای تیم، کمیته‌ها و سوابق تحصیلی',
      viewAllBoard: 'مشاهده تمام اعضای تیم و مدیران',
    },
    cta: {
      badge: 'همکاری و مشاوره سرمایه‌گذاری',
      eyebrow: 'مشاوره اختصاصی و پذیرش سرمایه‌گذار',
      title: 'آغاز همکاری استراتژیک با هلدینگ سرآمد',
      subtitle: 'جهت رزرو جلسه حضوری در دفتر مشهد، بررسی سبدگردانی اختصاصی یا طرح فرصت‌های سرمایه‌گذاری با ما در ارتباط باشید.',
      phoneLabel: 'تماس مستقیم با دفتر مرکزی',
      emailLabel: 'پست الکترونیکی امور سرمایه‌گذاران',
      addressLabel: 'نشانی دفتر مرکزی',
      hoursLabel: 'ساعات پذیرش و پاسخگویی',
      fullName: 'نام و نام خانوادگی',
      fullNamePlaceholder: 'مثال: علیرضا احمدی',
      phone: 'شماره تماس همراه',
      phonePlaceholder: 'شماره همراه خود را وارد نمایید (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)',
      email: 'آدرس ایمیل',
      emailPlaceholder: 'name@example.com',
      serviceType: 'موضوع درخواست',
      serviceSelect: 'انتخاب حوزه همکاری...',
      message: 'شرح مختصر درخواست یا حجم سرمایه‌گذاری',
      messagePlaceholder: 'توضیحات تکمیلی یا سوالات خود را مطرح فرمایید...',
      submit: 'ارسال درخواست مشاوره',
      submitting: 'در حال ثبت اطلاعات...',
      successTitle: 'درخواست شما با موفقیت ثبت گردید',
      successDesc: 'کارشناسان ارشد مدیریت دارایی هلدینگ ظرف کمتر از ۲۴ ساعت کاری با شما تماس خواهند گرفت.',
      bookDirect: 'رزرو آنلاین وقت ملاقات حضوری',
      requestCall: 'درخواست تماس فوری',
      bookMeetingLink: 'رزرو وقت جلسه تخصصی در دفتر مشهد',
      successMsg: 'درخواست تماس شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.',
    },
    footer: {
      tagline: 'هلدینگ سرآمد سرمایه ایلیا (سهامی عام)',
      subTagline: 'پیشرو در مدیریت ثروت، سبدگردانی و توسعه ابزارهای نوین مالی با اتکا به شبکه ارزشمند بیمه سامان.',
      quickLinks: 'دسترسی سریع',
      servicesTitle: 'خدمات اصلی',
      contactTitle: 'ارتباط با ما',
      contactInfo: 'ارتباط با دفتر مرکزی (مشهد)',
      newsletterTitle: 'عضویت در خبرنامه تحلیلی',
      newsletterDesc: 'دریافت هفتگی تحلیل‌های اقتصاد کلان، وضعیت بورس و گزارش‌های عملکرد هلدینگ.',
      newsletterPlaceholder: 'آدرس ایمیل خود را وارد نمایید...',
      subscribedSuccess: 'عضویت شما در خبرنامه تحلیلی با موفقیت ثبت گردید.',
      affiliatedWith: 'عضو و وابسته به گروه مالی و',
      backToTop: 'بازگشت به بالا',
      rights: 'تمامی حقوق مادی و معنوی متعلق به هلدینگ سرآمد سرمایه ایلیا (سهامی عام) می‌باشد.',
      privacy: 'حریم خصوصی',
      terms: 'قوانین و مقررات',
      compliance: 'انطباق و حاکمیت شرکتی',
      licenseInfo: 'تحت نظارت سازمان بورس و اوراق بهادار تهران | وابسته به گروه مالی سامان',
    },
    teamPage: {
      badge: 'سرمایه انسانی و ارکان راهبری',
      eyebrow: 'سرمایه انسانی و ارکان راهبری',
      title: 'ارکان راهبری و اعضای هیئت مدیره',
      subtitle: 'شناسایی و راهبری فرصت‌های مالی با اتکا به نخبگان اقتصادی، مدیران ریسک و معماران فین‌تک.',
      mainPortal: 'پرتال اصلی هلدینگ',
      bookMeetingWithExecutives: 'رزرو جلسه با مدیران ارشد',
      statYears: 'میانگین سابقه مدیریتی اعضا',
      statCommittees: 'کمیته‌های تخصصی راهبری',
      statDegree: 'مدارک دکتری و ارشد اقتصاد و مالی',
      statSectors: 'تنوع صنایع تحت پوشش راهبری',
      searchPlaceholder: 'جستجوی نام، تخصص یا دپارتمان...',
      allCategories: 'همه اعضا',
      board: 'هیئت مدیره و مدیران ارشد',
      investment: 'کمیته سرمایه‌گذاری و دارایی',
      governance: 'امور حقوقی و حاکمیت شرکتی',
      fintech: 'نوآوری مالی و فین‌تک',
      experience: 'تخصص اصلی',
      education: 'سوابق تحصیلی',
      achievements: 'دستاوردهای برجسته',
      directMeeting: 'درخواست جلسه مشاوره مستقیم',
      contactModalTitle: 'رزرو جلسه با',
      backToHome: 'بازگشت به صفحه اصلی',
      viewProfile: 'مشاهده سوابق و رزومه',
      noMembersFound: 'عضوی با این مشخصات یافت نشد',
      noMembersSubtitle: 'لطفاً عبارت جستجو را تغییر دهید یا دسته‌بندی دیگری را انتخاب فرمایید.',
      showAllMembers: 'نمایش تمامی اعضای تیم',
      coreValuesEyebrow: 'ارزش‌های بنیادین و منشور حرفه‌ای',
      coreValuesTitle: 'ارکان راهبری، انضباط مالی و شفافیت سازمانی',
      val1Title: 'حاکمیت شرکتی و امانت‌داری سرمایه',
      val1Desc: 'تعهد تزلزل‌ناپذیر به حفظ منافع سهامداران و رعایت دقیق الزامات قانونی سازمان بورس.',
      val2Title: 'تصمیم‌گیری مبتنی بر داده و هوش مالی',
      val2Desc: 'تحلیل دقیق اقتصادی و استفاده از مدل‌های کمی برای بهینه‌سازی ریسک و بازده دارایی‌ها.',
      val3Title: 'هم‌افزایی درون‌گروهی و خلق ارزش پایدار',
      val3Desc: 'بهره‌برداری حداکثری از زنجیره ارزش گروه مالی و بیمه سامان در مقیاس ملی.',
      meetingBoxTitle: 'برگزاری جلسه راهبردی با اعضای کمیته سرمایه‌گذاری',
      meetingBoxSubtitle: 'جهت بررسی فرصت‌های مشارکت کلان، تأمین مالی پروژه‌ها یا سبدگردانی اختصاصی، نوبت جلسه خود را رزرو فرمایید.',
      bookMeetingBtn: 'درخواست جلسه حضوری یا آنلاین',
      bioTitle: 'درباره و سوابق حرفه‌ای',
      achievementsTitle: 'دستاوردهای کلیدی و پروژه‌های شاخص',
      bookWithThisLeader: 'درخواست جلسه با این مدیر',
      valuesTitle: 'اصول بنیادین راهبری تیم',
      charterTitle: 'منشور اخلاقی و میثاق‌نامه سرمایه انسانی',
      charterPillars: [
        { title: 'امانت‌داری و صداقت حرفه‌ای', desc: 'حفاظت بدون قید و شرط از منافع سهامداران و رعایت دقیق الزامات قانونی.' },
        { title: 'تصمیم‌گیری مبتنی بر داده', desc: 'پرهیز از تصمیمات سلیقه‌ای و اتکا به شبیه‌سازی‌های دقیق آماری.' },
        { title: 'هم‌افزایی درون‌گروهی', desc: 'بهره‌برداری حداکثری از پتانسیل‌های زنجیره مالی گروه سامان.' },
      ],
    },
    articlesPage: {
      badge: 'پایگاه تحلیل و دانش مالی',
      eyebrow: 'تحلیل‌های تخصصی و راهبردی',
      title: 'مقالات، گزارش‌های پژوهشی و تحلیل بازار',
      subtitle: 'دیدگاه‌های تخصصی مدیران سرمایه‌گذاری هلدینگ پیرامون روندهای اقتصاد کلان، بورس و نوآوری‌های فین‌تک.',
      mainPortal: 'پرتال اصلی هلدینگ',
      backToPortal: 'بازگشت به پرتال اصلی',
      backToHome: 'بازگشت به صفحه اصلی',
      backToArticles: 'بازگشت به فهرست مقالات',
      searchPlaceholder: 'جستجو در مقالات و کلمات کلیدی...',
      allArticles: 'همه مقالات',
      featured: 'مقاله ویژه تحلیلی',
      featuredBadge: 'مقاله ویژه',
      keyTakeaways: 'نکات کلیدی و راهبردی گزارش',
      keyTakeawaysTitle: 'نکات کلیدی و راهبردی گزارش',
      shareArticle: 'اشتراک‌گذاری گزارش',
      shareCopied: 'لینک گزارش با موفقیت کپی شد',
      requestConsultationOnTopic: 'درخواست مشاوره پیرامون این تحلیل',
      author: 'نویسنده',
      minsRead: 'دقیقه زمان مطالعه',
      noResults: 'مقاله‌ای با این مشخصات یافت نشد.',
      readFull: 'مطالعه کامل تحلیل',
      read: 'مطالعه',
      listTitle: 'فهرست مقالات و گزارش‌های تخصصی',
      showAllCategories: 'مشاهده همه دسته‌ها',
      noArticlesFound: 'مقاله‌ای یافت نشد',
      noArticlesSubtitle: 'لطفاً عبارت جستجو را تغییر دهید یا دسته‌بندی دیگری را انتخاب فرمایید.',
      newsletterTitle: 'عضویت در خبرنامه تحلیلی هلدینگ',
      newsletterDesc: 'دریافت جدیدترین تحلیل‌های بازار سرمایه و گزارش‌های ماهانه به صورت مستقیم در ایمیل شما.',
      newsletterSuccess: 'ایمیل شما با موفقیت در خبرنامه ثبت گردید.',
      newsletterPlaceholder: 'آدرس ایمیل خود را وارد نمایید...',
      subscribeBtn: 'عضویت در خبرنامه',
      tagsLabel: 'برچسب‌ها:',
      closeModal: 'بستن پنجره',
    },
    articleDetail: {
      backToArticles: 'بازگشت به مقالات و تحلیل‌ها',
      readingProgress: 'پیشرفت مطالعه',
      textSize: 'اندازه متن',
      shareArticle: 'اشتراک‌گذاری گزارش',
      shareSuccess: 'لینک گزارش در حافظه کپی شد',
      bookmarkArticle: 'نشان کردن مقاله',
      bookmarked: 'نشان‌شده',
      keyTakeawaysTitle: 'نکات کلیدی و نتایج راهبردی گزارش',
      tableOfContents: 'فهرست عناوین و بخش‌ها',
      aboutAuthor: 'درباره تحلیل‌گر و نویسنده',
      educationLabel: 'تحصیلات و تخصص:',
      requestConsultation: 'درخواست جلسه مشاوره اختصاصی',
      helpfulQuestion: 'آیا این پژوهش برای شما مفید بود؟',
      helpfulBtn: 'مفید و کاربردی بود',
      insightfulBtn: 'تحلیل دقیق و نوآورانه',
      recommendBtn: 'پیشنهاد به دیگران',
      commentsTitle: 'دیدگاه‌ها و پرسش‌های پژوهشگران',
      noCommentsYet: 'هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که دیدگاه خود را مطرح می‌کند.',
      leaveComment: 'ثبت دیدگاه یا پرسش تحلیلی',
      commentNamePlaceholder: 'نام و نام خانوادگی یا نام سازمان...',
      commentRolePlaceholder: 'سمت شغلی یا تخصص (اختیاری)...',
      commentContentPlaceholder: 'دیدگاه، نقد یا سوال خود درباره متغیرهای این تحلیل را بنویسید...',
      submitComment: 'ارسال دیدگاه تخصصی',
      commentSuccess: 'دیدگاه شما با موفقیت ثبت شد و پس از بررسی تیم پژوهش نمایش داده خواهد شد.',
      relatedArticles: 'پژوهش‌ها و تحلیل‌های مرتبط',
      prevArticle: 'تحلیل قبلی',
      nextArticle: 'تحلیل بعدی',
      shareVia: 'اشتراک در شبکه‌های حرفه‌ای',
      whatsapp: 'واتس‌اپ',
      telegram: 'تلگرام',
      linkedin: 'لینکدین',
      twitter: 'توییتر (X)',
      copyLink: 'کپی لینک مستقیم',
      copied: 'کپی شد!',
      consultationBannerTitle: 'نیاز به راهبرد اختصاصی سبدگردانی متناسب با این تحلیل دارید؟',
      consultationBannerDesc: 'با مدیران ارشد سرمایه‌گذاری هلدینگ سرآمد سرمایه ایلیا جلسه حضوری یا آنلاین رزرو نمایید.',
      consultationBannerBtn: 'رزرو جلسه مشاوره سرمایه‌گذاری',
      notFoundTitle: 'گزارش تحلیلی مورد نظر یافت نشد',
      notFoundDesc: 'ممکن است پیوند مقاله تغییر کرده یا به بایگانی منتقل شده باشد.',
      notFoundBtn: 'مشاهده همه گزارش‌ها و مقالات',
      expertQuote: 'دیدگاه کلیدی و نقل‌قول کارشناسی',
      viewAuthorArticles: 'مشاهده تمام گزارش‌های این تحلیل‌گر',
      statsLabel: 'شاخص آماری برجسته',
    },
    articles: {
      badge: 'پایگاه تحلیل و دانش مالی',
      eyebrow: 'تحلیل‌های تخصصی و راهبردی',
      title: 'مقالات، گزارش‌های پژوهشی و تحلیل بازار',
      subtitle: 'دیدگاه‌های تخصصی مدیران سرمایه‌گذاری هلدینگ پیرامون روندهای اقتصاد کلان، بورس و نوآوری‌های فین‌تک.',
      mainPortal: 'پرتال اصلی هلدینگ',
      backToPortal: 'بازگشت به پرتال اصلی',
      backToHome: 'بازگشت به صفحه اصلی',
      backToArticles: 'بازگشت به فهرست مقالات',
      searchPlaceholder: 'جستجو در مقالات و کلمات کلیدی...',
      allArticles: 'همه مقالات',
      featured: 'مقاله ویژه تحلیلی',
      featuredBadge: 'مقاله ویژه',
      keyTakeaways: 'نکات کلیدی و راهبردی گزارش',
      keyTakeawaysTitle: 'نکات کلیدی و راهبردی گزارش',
      shareArticle: 'اشتراک‌گذاری گزارش',
      shareCopied: 'لینک گزارش با موفقیت کپی شد',
      requestConsultationOnTopic: 'درخواست مشاوره پیرامون این تحلیل',
      author: 'نویسنده',
      minsRead: 'دقیقه زمان مطالعه',
      noResults: 'مقاله‌ای با این مشخصات یافت نشد.',
      readFull: 'مطالعه کامل تحلیل',
      read: 'مطالعه',
      listTitle: 'فهرست مقالات و گزارش‌های تخصصی',
      showAllCategories: 'مشاهده همه دسته‌ها',
      noArticlesFound: 'مقاله‌ای یافت نشد',
      noArticlesSubtitle: 'لطفاً عبارت جستجو را تغییر دهید یا دسته‌بندی دیگری را انتخاب فرمایید.',
      newsletterTitle: 'عضویت در خبرنامه تحلیلی هلدینگ',
      newsletterDesc: 'دریافت جدیدترین تحلیل‌های بازار سرمایه و گزارش‌های ماهانه به صورت مستقیم در ایمیل شما.',
      newsletterSuccess: 'ایمیل شما با موفقیت در خبرنامه ثبت گردید.',
      newsletterPlaceholder: 'آدرس ایمیل خود را وارد نمایید...',
      subscribeBtn: 'عضویت در خبرنامه',
      tagsLabel: 'برچسب‌ها:',
      closeModal: 'بستن پنجره',
    },
    consultation: {
      badge: 'وقت مشاوره و ملاقات حضوری',
      eyebrow: 'سامانه رسمی رزرواسیون جلسات',
      title: 'رزرو وقت مشاوره سرمایه‌گذاری و جلسه حضوری',
      subtitle: 'امکان هماهنگی جلسه در دفتر مرکزی مشهد یا مشاوره آنلاین با مدیران ارشد مدیریت دارایی هلدینگ.',
      mainPortal: 'پرتال اصلی هلدینگ',
      backToPortal: 'بازگشت به پرتال اصلی',
      backToHome: 'بازگشت به صفحه اصلی',
      successTitle: 'درخواست مشاوره با موفقیت ثبت گردید',
      successDesc: 'همکاران ما در واحد روابط سرمایه‌گذاران جهت تایید نهایی زمان و پروتکل‌های جلسه با شما تماس خواهند گرفت.',
      step1Title: '۱. موضوع و حوزه تخصصی مشاوره',
      step1Desc: 'لطفاً حوزه سرمایه‌گذاری یا خدمات مالی مورد نظر خود را تعیین فرمایید:',
      step2Title: '۲. قالب برگزاری و زمان پیشنهادی جلسه',
      formatInPerson: 'جلسه حضوری (دفتر مرکزی مشهد)',
      formatOnline: 'مشاوره آنلاین تصویری امن',
      preferredSlotLabel: 'بازه زمانی مورد نظر جهت جلسه:',
      step3Title: '۳. اطلاعات متقاضی و مشخصات تماس',
      fullName: 'نام و نام خانوادگی متقاضی',
      fullNamePlaceholder: 'مثال: مهندس علیرضا احمدی',
      phone: 'شماره تلفن همراه (جهت هماهنگی)',
      phonePlaceholder: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'آدرس ایمیل رسمی',
      emailPlaceholder: 'name@company.com',
      company: 'نام شرکت / سازمان (اختیاری)',
      companyPlaceholder: 'مثال: شرکت توسعه تجارت نوین',
      consultationType: 'موضوع مشاوره سرمایه‌گذاری',
      meetingFormat: 'نحوه برگزاری جلسه',
      inPerson: 'جلسه حضوری در دفتر مشهد',
      inPersonDesc: 'بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم',
      online: 'مشاوره آنلاین / تلفنی',
      onlineDesc: 'تماس تصویری امن یا مشاوره تلفنی با مدیران ارشد',
      preferredDate: 'تاریخ مورد نظر',
      preferredTime: 'ساعت پیشنهادی جلسه',
      portfolioRange: 'حجم سرمایه یا ارزش پروژه مدنظر',
      notes: 'توضیحات تکمیلی یا محورهای جلسه',
      notesPlaceholder: 'لطفاً خلاصه اهداف جلسه یا طرح پیشنهادی را مرقوم بفرمایید...',
      privacyNote: 'تمامی اطلاعات متقاضیان و طرح‌های مالی تحت پروتکل‌های محرمانگی (NDA) نگهداری و بررسی می‌گردد.',
      submitBtn: 'تایید و ثبت نهایی درخواست جلسه',
      submitBooking: 'ثبت و تایید نهایی وقت مشاوره',
      bookingSuccessTitle: 'وقت مشاوره با موفقیت ثبت شد',
      bookingSuccessDesc: 'همکاران ما در واحد روابط سرمایه‌گذاران جهت تایید نهایی زمان با شما تماس خواهند گرفت.',
      mashhadOfficeTitle: 'دفتر مرکزی هلدینگ سرآمد',
      mashhadOfficeAddress: 'مشهد، بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم',
      hqTitle: 'دفتر مرکزی هلدینگ',
      directPhone: 'خط مستقیم ارتباط با مراجعین',
      workingHours: 'ساعات پذیرش مراجعین',
      emailLabel: 'پست الکترونیکی امور سرمایه‌گذاران',
      subsidiaryLines: 'خطوط مستقیم شرکت‌های تابعه',
      faqEyebrow: 'سوالات متداول و راهنمای مراجعین',
      faqTitle: 'پرسش‌های متداول پیش از جلسه مشاوره',
      callDirect: 'تماس مستقیم با دفتر مشهد',
      trackingCode: 'کد پیگیری درخواست',
    },
    consultationPage: {
      badge: 'وقت مشاوره و ملاقات حضوری',
      eyebrow: 'سامانه رسمی رزرواسیون جلسات',
      title: 'رزرو وقت مشاوره سرمایه‌گذاری و جلسه حضوری',
      subtitle: 'امکان هماهنگی جلسه در دفتر مرکزی مشهد یا مشاوره آنلاین با مدیران ارشد مدیریت دارایی هلدینگ.',
      mainPortal: 'پرتال اصلی هلدینگ',
      backToPortal: 'بازگشت به پرتال اصلی',
      backToHome: 'بازگشت به صفحه اصلی',
      successTitle: 'درخواست مشاوره با موفقیت ثبت گردید',
      successDesc: 'همکاران ما در واحد روابط سرمایه‌گذاران جهت تایید نهایی زمان و پروتکل‌های جلسه با شما تماس خواهند گرفت.',
      step1Title: '۱. موضوع و حوزه تخصصی مشاوره',
      step1Desc: 'لطفاً حوزه سرمایه‌گذاری یا خدمات مالی مورد نظر خود را تعیین فرمایید:',
      step2Title: '۲. قالب برگزاری و زمان پیشنهادی جلسه',
      formatInPerson: 'جلسه حضوری (دفتر مرکزی مشهد)',
      formatOnline: 'مشاوره آنلاین تصویری امن',
      preferredSlotLabel: 'بازه زمانی مورد نظر جهت جلسه:',
      step3Title: '۳. اطلاعات متقاضی و مشخصات تماس',
      fullName: 'نام و نام خانوادگی متقاضی',
      fullNamePlaceholder: 'مثال: مهندس علیرضا احمدی',
      phone: 'شماره تلفن همراه (جهت هماهنگی)',
      phonePlaceholder: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'آدرس ایمیل رسمی',
      emailPlaceholder: 'name@company.com',
      company: 'نام شرکت / سازمان (اختیاری)',
      companyPlaceholder: 'مثال: شرکت توسعه تجارت نوین',
      consultationType: 'موضوع مشاوره سرمایه‌گذاری',
      meetingFormat: 'نحوه برگزاری جلسه',
      inPerson: 'جلسه حضوری در دفتر مشهد',
      inPersonDesc: 'بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم',
      online: 'مشاوره آنلاین / تلفنی',
      onlineDesc: 'تماس تصویری امن یا مشاوره تلفنی با مدیران ارشد',
      preferredDate: 'تاریخ مورد نظر',
      preferredTime: 'ساعت پیشنهادی جلسه',
      portfolioRange: 'حجم سرمایه یا ارزش پروژه مدنظر',
      notes: 'توضیحات تکمیلی یا محورهای جلسه',
      notesPlaceholder: 'لطفاً خلاصه اهداف جلسه یا طرح پیشنهادی را مرقوم بفرمایید...',
      privacyNote: 'تمامی اطلاعات متقاضیان و طرح‌های مالی تحت پروتکل‌های محرمانگی (NDA) نگهداری و بررسی می‌گردد.',
      submitBtn: 'تایید و ثبت نهایی درخواست جلسه',
      submitBooking: 'ثبت و تایید نهایی وقت مشاوره',
      bookingSuccessTitle: 'وقت مشاوره با موفقیت ثبت شد',
      bookingSuccessDesc: 'همکاران ما در واحد روابط سرمایه‌گذاران جهت تایید نهایی زمان با شما تماس خواهند گرفت.',
      mashhadOfficeTitle: 'دفتر مرکزی هلدینگ سرآمد',
      mashhadOfficeAddress: 'مشهد، بزرگمهر شمالی ۲، پلاک ۴۴، طبقه سوم',
      hqTitle: 'دفتر مرکزی هلدینگ',
      directPhone: 'خط مستقیم ارتباط با مراجعین',
      workingHours: 'ساعات پذیرش مراجعین',
      emailLabel: 'پست الکترونیکی امور سرمایه‌گذاران',
      subsidiaryLines: 'خطوط مستقیم شرکت‌های تابعه',
      faqEyebrow: 'سوالات متداول و راهنمای مراجعین',
      faqTitle: 'پرسش‌های متداول پیش از جلسه مشاوره',
      callDirect: 'تماس مستقیم با دفتر مشهد',
      trackingCode: 'کد پیگیری درخواست',
    },
    specModal: {
      title: 'مشخصات طراحی شیشه مایع (Liquid Glass Spec)',
      subtitle: 'دفترچه راهنمای هویت بصری، رنگ‌ها و الگوهای تعاملی هلدینگ سرآمد سرمایه ایلیا',
      close: 'بستن پنجره',
    },
    common: {
      languageName: 'فارسی',
      switchTo: 'English',
      persian: 'فارسی',
      english: 'English',
      scrollProgress: 'پیشرفت مطالعه',
      backToTop: 'ابتدای صفحه',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      stats: 'Metrics',
      portfolio: 'Portfolio',
      subsidiaries: 'Subsidiaries',
      dashboard: 'Yield & Performance',
      news: 'News',
      articles: 'Research & Insights',
      consultation: 'Book Consultation',
      team: 'Our Team',
      researchBadge: 'Research',
      otherSections: 'All Sections',
      designSpec: 'Design System',
      menuTitle: 'Quick Navigation',
      menuSubtitle: 'Ilya Saramad Capital Holding Portal',
      close: 'Close',
      bookConsultationShort: 'Book Meeting',
      phoneLabel: '+98 51 3762 2222',
      hoursLabel: 'Everyday 9:00 - 18:00',
      themeToggle: 'Toggle Dark / Light Mode',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
    drawer: {
      about: { label: 'About Holding', desc: 'History, vision, shareholding structure & governance' },
      services: { label: 'Services & Wealth Management', desc: 'Portfolio management, corporate financing, investment advisory & M&A' },
      stats: { label: 'Key Financial Metrics', desc: 'Performance figures, stock market ranking & AUM' },
      portfolio: { label: 'Investment Portfolio', desc: 'Equity assets, commercial real estate & high-yield ventures' },
      subsidiaries: { label: 'Subsidiaries Network', desc: 'Synergy chain across Saramad Group & Saman Insurance' },
      dashboard: { label: 'Performance Dashboard', desc: 'Interactive quarterly & annual returns vs benchmark index' },
      news: { label: 'Official News & Filings', desc: 'Shareholder assembly resolutions, disclosures & announcements' },
      contact: { label: 'Contact & Mashhad Office', desc: 'Mashhad, Bozorgmehr Shomali 2, No 44, Floor 3' },
      designSystemBadge: 'Liquid Glass Design',
      designSystemDesc: 'Proprietary Liquid Glass & Quiet Luxury Visual System',
      holdingGroupTitle: 'Saman Financial Group',
      holdingGroupDesc: 'Major shareholder and strategic corporate backer',
      headquartersTitle: 'Headquarters (Mashhad)',
      headquartersAddress: 'Bozorgmehr Shomali 2, No 44, 3rd Floor, Mashhad, Iran',
    },
    hero: {
      badge: 'Ilya Saramad Capital Holding',
      subBadge: 'Affiliated with Saman Insurance',
      eyebrow: 'Ilya Saramad Capital Holding',
      affiliated: 'Affiliated with Saman Insurance',
      titleWords: ['Building', 'The', 'Future', 'With', 'Certainty'],
      subtitle: 'Creating sustainable value for institutional and private investors through transparent governance, intelligent portfolio management, and strategic asset allocation across macro markets.',
      ctaConsultation: 'Request VIP Consultation',
      ctaArticles: 'Explore Research & Articles',
      ctaPrimary: 'Request VIP Consultation',
      ctaSecondary: 'Explore Investment Services',
      metric1Val: '85,000 Billion Rials',
      metric1Lbl: 'Assets Under Management (AUM)',
      metric2Val: '+42%',
      metric2Lbl: 'Average Compound Annual Return',
      trustTitle: 'Regulated financial entity licensed by the Securities and Exchange Organization (SEO)',
      supervisedBy: 'Backed by the comprehensive financial network of Saman Insurance (Public Joint Stock)',
      scrollDown: 'Explore holding sections',
      badgeAudit: 'Regulated Disclosures & Bourse Transparency',
      badgeGrowth: '15+ Years Sustained Alpha',
      cardDashboardTitle: 'Asset Intelligence & Advisory',
      cardDashboardSubtitle: 'Saramad Proprietary Portfolio Growth',
      cardLive: 'Live',
      correlationTitle: 'Market Correlation Beta',
      correlationValue: '0.72 (Managed Risk)',
      workingCapitalLabel: 'Assets Under Management',
      workingCapitalValue: '85 T Rls',
      workingCapitalGrowth: '+42% YoY',
      netAlphaLabel: 'Generated Net Alpha',
      netAlphaValue: '+18.4%',
      netAlphaGrowth: 'vs TSE Index',
      realtimeCalc: 'Real-Time Risk Analytics',
    },
    about: {
      badge: 'About Ilya Saramad Capital Holding',
      eyebrow: 'Heritage, Transparency & Capital Synergy',
      title: 'Architecting Smart Investments & Sustainable Wealth Management',
      desc1: 'Ilya Saramad Capital Holding (Public Joint Stock) stands as a premier investment and asset management institution in Iran, built upon elite financial expertise, state-of-the-art fintech infrastructure, and the strategic backing of Saman Insurance.',
      desc2: 'Our investment methodology is grounded in systematic discovery of high-yield opportunities, asymmetric risk mitigation, and creating shared long-term value for stakeholders and institutional partners.',
      readMore: 'Review track record & code of ethics',
      pillarsTitle: 'The Four Governance Pillars of Saramad',
      pillars: [
        { title: 'Transparent Governance & Compliance', desc: 'Adhering to the highest stock exchange disclosure standards and multi-tier oversight.' },
        { title: 'Data-Driven Portfolio Management', desc: 'Leveraging AI algorithms, econometric modeling, and automated risk scoring.' },
        { title: 'Ecosystem Synergy', desc: 'Connecting holding resources with Saman Financial Group’s insurance and banking network.' },
        { title: 'Financial Instrument Innovation', desc: 'Pioneering specialized funds, debt issuance, and modern corporate financing.' },
      ],
      valuesTitle: 'Core Corporate Values',
      values: [
        { title: 'Transparent Governance & Multi-Tier Audit', desc: 'Strict adherence to SEO regulations with audited financial disclosures.' },
        { title: 'Scientific & Asymmetric Risk Engineering', desc: 'Capital preservation coupled with optimized upside capture in dynamic markets.' },
        { title: 'Saman Financial Ecosystem Synergy', desc: 'Seamless access to nationwide banking, investment, and insurance infrastructure.' },
        { title: 'FinTech Innovation & Algorithmic Engines', desc: 'Deploying quantitative trading, cloud analytics, and AI models.' },
      ],
      historyTitle: 'Professional Heritage & Authority',
      historyYears: 'Over 15 Years',
      historyText: 'Continuous presence across capital market leadership councils, structuring debt securities, and managing top-tier national investment funds.',
      ctaNetwork: 'Explore Subsidiaries Network & Synergy',
      badgeOffice: 'Mashhad Corporate Headquarters',
      badgeOfficeDesc: 'Strategic Asset Management & Regional Investment Center',
      cardAuditLabel: 'SEO Certified Audit',
      cardAuditValue: 'Clean Unqualified Opinion',
      cardGrowthLabel: 'Assets Under Management',
      cardGrowthValue: '85,000 Billion Rials',
    },
    services: {
      badge: 'Specialized Wealth & Financial Services',
      eyebrow: 'Comprehensive Wealth Solutions',
      title: 'Comprehensive Investment Solutions for Institutions & High-Net-Worth Individuals',
      subtitle: 'A full suite of financial engineering, dedicated portfolio management, corporate debt financing, and fintech venture acceleration.',
      requestService: 'Request Service',
      viewAll: 'View All Services',
      viewDetails: 'View Details & Structure',
      closeModal: 'Close',
      advantagesTitle: 'Key Advantages & Value Drivers',
      requestConsultationFor: 'Request Consultation For',
    },
    stats: {
      badge: 'Key Performance Indicators',
      eyebrow: 'Official Audit & Compliance',
      title: 'Financial Strength & Superior Returns in Numbers',
      subtitle: 'Consistent, audited, and transparent track record of Ilya Saramad Capital Holding across diverse market cycles.',
      sourceAudit: 'Based on the latest audited financial disclosures registered with the SEO',
    },
    portfolio: {
      badge: 'Wealth & Asset Management Department',
      eyebrow: 'Wealth Management & Intelligent Advisory',
      title: 'Strategic Asset Allocation & Tailored Portfolio Management',
      subtitle: 'We empower institutional and private investors to capture maximum market upside while preserving capital through rigorous fundamental research and the backing of Saman Insurance.',
      returnRateLabel: 'Period Return',
      assetValueLabel: 'Estimated Asset Value',
      detailsBtn: 'View Project Details',
      periodReturn: 'Period Return',
      allocatedValue: 'Estimated Asset Value',
      metricBadgeValue: '+85 T Rls',
      metricBadgeLabel: 'Assets Under Management & Advisory',
      metricBadgeGrowth: '+42% Annualized Return',
      socialProofCount: '+500',
      socialProofLabel: 'Trusted by 500+ Institutional & High-Net-Worth Investors',
      blueCardTitle: 'One Step Closer to Sustainable Alpha Returns',
      blueCardSubtitle: 'Start smart investing with Ilya Saramad Holding in one click!',
      blueCardCta: 'Request Free Investment Assessment',
      pill1: 'Dedicated VIP Portfolio Manager',
      pill2: 'Guaranteed by Saman Insurance',
      pill3: 'Free Quantitative Risk Profiling',
      whyChooseTitle: 'Why Choose Ilya Saramad Holding?',
      whyChooseSubtitle: 'Key competitive advantages over traditional investment methods',
      reasons: [
        {
          title: 'Result-Driven & Net Alpha Generation',
          desc: 'Dynamic quantitative asset allocation engineered to consistently outperform benchmark indices with agility and mathematical precision.',
        },
        {
          title: 'Cost Optimization & Aligned Risk Control',
          desc: 'Performance fees are only accrued once your portfolio reaches agreed profitability hurdles, aligning our success directly with yours.',
        },
        {
          title: 'Saman Insurance Backing & Official SEO Audit',
          desc: 'Multi-layer SEO regulation coupled with the financial credit and risk guarantees of the Saman Insurance network provides unmatched peace of mind.',
        },
        {
          title: 'Intelligent Real-Time Market Analytics',
          desc: 'Transparent reporting, proprietary asset monitoring dashboards, and a dedicated team of certified CFA analysts supporting you at every stage.',
        },
      ],
    },
    subsidiaries: {
      badge: 'Value Chain & Corporate Network',
      eyebrow: 'Ecosystem Synergy',
      title: 'Subsidiaries Network & Strategic Alliances',
      subtitle: 'Structured synergy between Saramad Group entities and Saman Insurance to meet comprehensive financial and investment needs.',
      groupTitle: 'Ilya Saramad Capital Holding',
      parentCompany: 'Saman Insurance (Public Joint Stock)',
      clickNodeHint: 'Click on any subsidiary node to view detailed operational metrics and description.',
      ownership: 'Equity Stake',
      coreHub: 'Group Headquarters Hub',
      codalAudit: 'Official Codal Public Disclosures',
      samanGovernance: 'Supervised under Saman Financial Group Governance',
      visitPortal: 'Visit Corporate Portal',
    },
    dashboard: {
      badge: 'Live Financial Performance Dashboard',
      eyebrow: 'Data Intelligence & Yield Engine',
      title: 'Cumulative Returns Trend vs Market Benchmark',
      subtitle: 'Assets under management at Ilya Saramad Capital Holding have consistently generated significant alpha above the Tehran Stock Exchange Index.',
      monthly: 'Monthly Performance',
      quarterly: 'Quarterly Performance',
      annual: 'Multi-Year Trend',
      portfolioLine: 'Saramad Holding Portfolio Yield',
      benchmarkLine: 'TSE Benchmark Index',
      growthRate: 'Generated Alpha (Excess Return)',
      sharpeRatio: 'Portfolio Sharpe Ratio',
      auditBadge: 'Unqualified Audit Opinion',
      auditDesc: 'Financial statements for the fiscal period have received clean unqualified audit opinions from certified independent chartered accountants.',
      totalAssetsValue: 'Total Assets Under Management (T Rls)',
      yoyGrowth: '+34% YoY Growth',
      saramadPortfolio: 'Saramad Portfolio',
      tseBenchmark: 'TSE Index Benchmark',
      allocationEquities: 'Listed Equities',
      allocationRealEstate: 'Real Estate & Infrastructure',
      allocationFixedIncome: 'Fixed-Income Securities',
      allocationVenture: 'Venture Capital & Fintech',
      betaLabel: 'Portfolio Beta',
      betaSub: 'Controlled Risk',
      sharpeLabel: 'Sharpe Ratio',
      sharpeSub: 'High Efficiency',
      maxDdLabel: 'Max Drawdown (MDD)',
      maxDdSub: 'Asymmetric Protection',
      cumDivLabel: 'Distributed Cash Dividends',
      cumDivSub: 'Recent Fiscal Year',
      allocationTitle: 'Holding Asset Allocation',
      strategicComposition: 'Strategic Portfolio Breakdown',
      totalAssetsLabel: 'Total AUM',
      balancedLabel: 'Balanced & Diversified',
    },
    news: {
      badge: 'Official Corporate News & Filings',
      eyebrow: 'Official News & Disclosures',
      title: 'Latest News, Disclosures & Shareholder Assemblies',
      subtitle: 'Real-time updates regarding capital market milestones, strategic events, and executive disclosures from Ilya Saramad Holding.',
      readMore: 'Read Full Story',
      readFullReport: 'Read Full Report',
      viewAllNews: 'View All News & Filings',
      viewAllResearch: 'Explore Research & Articles',
      minsRead: 'min read',
    },
    teamSection: {
      badge: 'Human Capital & Governance Leadership',
      title: 'Executive Leadership & Board of Directors',
      subtitle: 'A leadership team comprising elite financial economists, university professors, and seasoned capital market executives.',
      viewAllTeam: 'View All Team Members, Committees & Academic Credentials',
      viewAllBoard: 'View All Team & Board Members',
    },
    team: {
      badge: 'Human Capital & Governance Leadership',
      eyebrow: 'Strategic Governance & Leadership',
      title: 'Executive Leadership & Board of Directors',
      subtitle: 'A leadership team comprising elite financial economists, university professors, and seasoned capital market executives.',
      viewAllTeam: 'View All Team Members, Committees & Academic Credentials',
      viewAllBoard: 'View All Team & Board Members',
    },
    cta: {
      badge: 'Strategic Collaboration & Advisory',
      eyebrow: 'Exclusive Consultation & Onboarding',
      title: 'Initiate Strategic Collaboration with Saramad Holding',
      subtitle: 'Connect with our leadership team to schedule an in-person meeting in Mashhad, discuss tailored portfolio management, or propose investment opportunities.',
      phoneLabel: 'Direct Headquarters Phone',
      emailLabel: 'Investor Relations Email',
      addressLabel: 'Headquarters Address',
      hoursLabel: 'Office & Advisory Hours',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Alireza Ahmadi',
      phone: 'Mobile / Phone Number',
      phonePlaceholder: 'Enter your phone number (e.g. +98 912 345 6789)',
      email: 'Email Address',
      emailPlaceholder: 'name@example.com',
      serviceType: 'Inquiry Category',
      serviceSelect: 'Select collaboration scope...',
      message: 'Brief Project Summary or Investment Capital',
      messagePlaceholder: 'Provide additional details or inquiries regarding your proposal...',
      submit: 'Submit Advisory Request',
      submitting: 'Processing inquiry...',
      successTitle: 'Inquiry Successfully Submitted',
      successDesc: 'Senior asset management directors will contact you within 24 business hours.',
      bookDirect: 'Book In-Person Meeting Online',
      requestCall: 'Request Immediate Callback',
      bookMeetingLink: 'Schedule In-Person Meeting in Mashhad',
      successMsg: 'Callback request registered successfully. Our team will reach out shortly.',
    },
    footer: {
      tagline: 'Ilya Saramad Capital Holding (Public Joint Stock)',
      subTagline: 'Pioneering wealth management, dedicated portfolio advisory, and innovative financial instruments backed by Saman Insurance.',
      quickLinks: 'Quick Links',
      servicesTitle: 'Core Services',
      contactTitle: 'Contact Us',
      contactInfo: 'Mashhad Headquarters Contact',
      newsletterTitle: 'Subscribe to Market Intelligence',
      newsletterDesc: 'Receive weekly macro analysis, TSE market reviews, and official holding filings.',
      newsletterPlaceholder: 'Enter your email address...',
      subscribedSuccess: 'Successfully subscribed to Market Intelligence newsletter.',
      affiliatedWith: 'Member and subsidiary of',
      backToTop: 'Back to Top',
      rights: 'All rights reserved. © Ilya Saramad Capital Holding (Public Joint Stock).',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      compliance: 'Governance & Compliance',
      licenseInfo: 'Regulated by Securities and Exchange Organization (SEO) | Affiliated with Saman Financial Group',
    },
    teamPage: {
      badge: 'Human Capital & Governance',
      eyebrow: 'Human Capital & Governance Leadership',
      title: 'Board of Directors & Governance Bodies',
      subtitle: 'Navigating financial opportunities with top-tier economists, risk officers, and fintech architects.',
      mainPortal: 'Main Portal',
      bookMeetingWithExecutives: 'Book Meeting With Directors',
      statYears: 'Average Executive Experience',
      statCommittees: 'Specialized Governance Committees',
      statDegree: 'PhD & Master Financial Credentials',
      statSectors: 'Industry Sectors Under Governance',
      searchPlaceholder: 'Search by name, expertise or department...',
      allCategories: 'All Members',
      board: 'Board of Directors & Executives',
      investment: 'Investment & Asset Committee',
      governance: 'Legal Affairs & Compliance',
      fintech: 'Financial Innovation & FinTech',
      experience: 'Primary Expertise',
      education: 'Education',
      achievements: 'Key Achievements',
      directMeeting: 'Request Direct Meeting',
      contactModalTitle: 'Book Meeting With',
      backToHome: 'Back to Home',
      viewProfile: 'View Biography & Track Record',
      noMembersFound: 'No members found matching your search',
      noMembersSubtitle: 'Please adjust your search terms or select another category.',
      showAllMembers: 'Show All Team Members',
      coreValuesEyebrow: 'Core Values & Professional Charter',
      coreValuesTitle: 'Governance Pillars, Financial Rigor & Transparency',
      val1Title: 'Corporate Governance & Fiduciary Trust',
      val1Desc: 'Uncompromising commitment to safeguarding shareholder capital and strictly following regulatory frameworks.',
      val2Title: 'Data-Driven Decision Making & Quantitative Rigor',
      val2Desc: 'Advanced econometric modeling and algorithmic portfolio optimization to maximize risk-adjusted yields.',
      val3Title: 'Intra-Group Synergy & Sustainable Value Creation',
      val3Desc: 'Capitalizing on the full national footprint and value chain of Saman Financial Group.',
      meetingBoxTitle: 'Schedule an Executive Meeting with Investment Committees',
      meetingBoxSubtitle: 'Reserve a private session to evaluate strategic equity partnerships, corporate debt underwriting, or dedicated wealth management.',
      bookMeetingBtn: 'Request In-Person or Online Session',
      bioTitle: 'Executive Biography & Career Background',
      achievementsTitle: 'Key Milestones & Landmark Deals',
      bookWithThisLeader: 'Request Meeting with This Director',
      valuesTitle: 'Core Governance Principles',
      charterTitle: 'Executive Code of Ethics & Human Capital Charter',
      charterPillars: [
        { title: 'Fiduciary Duty & Integrity', desc: 'Uncompromising protection of shareholder capital and strict adherence to regulatory guidelines.' },
        { title: 'Data-Driven Decision Making', desc: 'Eliminating emotional bias through econometric simulations and quantitative risk modeling.' },
        { title: 'Intra-Group Synergy', desc: 'Maximizing value creation across Saman Financial Group’s broader ecosystem.' },
      ],
    },
    articlesPage: {
      badge: 'Financial Research & Knowledge Hub',
      eyebrow: 'Strategic & Market Research',
      title: 'Articles, Research Reports & Market Insights',
      subtitle: 'Expert perspectives from holding directors on macroeconomic developments, capital markets, and fintech trends.',
      mainPortal: 'Main Portal',
      backToPortal: 'Back to Main Portal',
      backToHome: 'Back to Home',
      backToArticles: 'Back to Articles List',
      searchPlaceholder: 'Search articles and topics...',
      allArticles: 'All Articles',
      featured: 'Featured Strategic Report',
      featuredBadge: 'Featured Analysis',
      keyTakeaways: 'Strategic Key Takeaways',
      keyTakeawaysTitle: 'Strategic Key Takeaways',
      shareArticle: 'Share Report',
      shareCopied: 'Report link copied to clipboard',
      requestConsultationOnTopic: 'Request Consultation on this Topic',
      author: 'Author',
      minsRead: 'min read',
      noResults: 'No articles matched your criteria.',
      readFull: 'Read Full Analysis',
      read: 'Read',
      listTitle: 'All Research Articles & Reports',
      showAllCategories: 'View All Categories',
      noArticlesFound: 'No articles found',
      noArticlesSubtitle: 'Please adjust your search criteria or select another category.',
      newsletterTitle: 'Subscribe to Holding Research Letter',
      newsletterDesc: 'Receive key capital market briefings and executive macroeconomic reports directly in your inbox.',
      newsletterSuccess: 'Your email has been subscribed to our research newsletter.',
      newsletterPlaceholder: 'Enter your business email...',
      subscribeBtn: 'Subscribe to Insights',
      tagsLabel: 'Tags:',
      closeModal: 'Close Window',
    },
    articleDetail: {
      backToArticles: 'Back to All Research & Articles',
      readingProgress: 'Reading Progress',
      textSize: 'Font Size',
      shareArticle: 'Share Report',
      shareSuccess: 'Report link copied to clipboard',
      bookmarkArticle: 'Bookmark Article',
      bookmarked: 'Bookmarked',
      keyTakeawaysTitle: 'Strategic Key Takeaways & Executive Summary',
      tableOfContents: 'Table of Contents',
      aboutAuthor: 'About the Analyst & Author',
      educationLabel: 'Credentials & Domain:',
      requestConsultation: 'Request Dedicated Advisory Session',
      helpfulQuestion: 'Was this research report helpful?',
      helpfulBtn: 'Helpful & Practical',
      insightfulBtn: 'Insightful & Novel',
      recommendBtn: 'Recommend',
      commentsTitle: 'Executive Discussions & Comments',
      noCommentsYet: 'No discussions posted yet. Be the first to share your market perspectives.',
      leaveComment: 'Submit an Expert Thought or Question',
      commentNamePlaceholder: 'Full Name / Organization...',
      commentRolePlaceholder: 'Designation / Specialty (optional)...',
      commentContentPlaceholder: 'Write your analytical comment or question regarding this report...',
      submitComment: 'Post Perspective',
      commentSuccess: 'Your comment has been submitted and will appear following editorial review.',
      relatedArticles: 'Related Research & Publications',
      prevArticle: 'Previous Analysis',
      nextArticle: 'Next Analysis',
      shareVia: 'Share via Professional Channels',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      linkedin: 'LinkedIn',
      twitter: 'Twitter (X)',
      copyLink: 'Copy Direct Link',
      copied: 'Copied!',
      consultationBannerTitle: 'Need a customized portfolio strategy aligned with this research?',
      consultationBannerDesc: 'Book a private meeting with senior directors at Ilya Saramad Capital Holding.',
      consultationBannerBtn: 'Schedule Investment Consultation',
      notFoundTitle: 'Research Report Not Found',
      notFoundDesc: 'The article link may have been updated or archived.',
      notFoundBtn: 'Browse All Research & Articles',
      expertQuote: 'Strategic Executive Quote',
      viewAuthorArticles: 'View all research by this author',
      statsLabel: 'Key Highlight Metric',
    },
    articles: {
      badge: 'Financial Research & Knowledge Hub',
      eyebrow: 'Strategic & Market Research',
      title: 'Articles, Research Reports & Market Insights',
      subtitle: 'Expert perspectives from holding directors on macroeconomic developments, capital markets, and fintech trends.',
      mainPortal: 'Main Portal',
      backToPortal: 'Back to Main Portal',
      backToHome: 'Back to Home',
      backToArticles: 'Back to Articles List',
      searchPlaceholder: 'Search articles and topics...',
      allArticles: 'All Articles',
      featured: 'Featured Strategic Report',
      featuredBadge: 'Featured Analysis',
      keyTakeaways: 'Strategic Key Takeaways',
      keyTakeawaysTitle: 'Strategic Key Takeaways',
      shareArticle: 'Share Report',
      shareCopied: 'Report link copied to clipboard',
      requestConsultationOnTopic: 'Request Consultation on this Topic',
      author: 'Author',
      minsRead: 'min read',
      noResults: 'No articles matched your criteria.',
      readFull: 'Read Full Analysis',
      read: 'Read',
      listTitle: 'All Research Articles & Reports',
      showAllCategories: 'View All Categories',
      noArticlesFound: 'No articles found',
      noArticlesSubtitle: 'Please adjust your search criteria or select another category.',
      newsletterTitle: 'Subscribe to Holding Research Letter',
      newsletterDesc: 'Receive key capital market briefings and executive macroeconomic reports directly in your inbox.',
      newsletterSuccess: 'Your email has been subscribed to our research newsletter.',
      newsletterPlaceholder: 'Enter your business email...',
      subscribeBtn: 'Subscribe to Insights',
      tagsLabel: 'Tags:',
      closeModal: 'Close Window',
    },
    consultation: {
      badge: 'VIP Consultation & In-Person Meeting',
      eyebrow: 'Official Advisory Booking Portal',
      title: 'Book Investment Consultation & In-Person Meeting',
      subtitle: 'Schedule a private session at our Mashhad headquarters or arrange an online advisory call with senior directors.',
      mainPortal: 'Main Portal',
      backToPortal: 'Back to Main Portal',
      backToHome: 'Back to Home',
      successTitle: 'Consultation Request Confirmed',
      successDesc: 'Our Investor Relations department will reach out shortly to finalize your appointment details and conference protocols.',
      step1Title: '1. Advisory Scope & Subject Matter',
      step1Desc: 'Please select your intended investment scope or financial service requirement:',
      step2Title: '2. Meeting Format & Timing',
      formatInPerson: 'In-Person Meeting (Mashhad HQ)',
      formatOnline: 'Secure Video Advisory Session',
      preferredSlotLabel: 'Preferred Meeting Time Slot:',
      step3Title: '3. Applicant Information & Contact',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Dr. Alireza Ahmadi',
      phone: 'Mobile Phone Number',
      phonePlaceholder: '+98 912 345 6789',
      email: 'Corporate Email Address',
      emailPlaceholder: 'name@company.com',
      company: 'Company / Organization (Optional)',
      companyPlaceholder: 'e.g. Modern Trade Development Co.',
      consultationType: 'Consultation Subject',
      meetingFormat: 'Meeting Format',
      inPerson: 'In-Person Meeting at Mashhad Office',
      inPersonDesc: 'Bozorgmehr Shomali 2, No 44, Floor 3, Mashhad',
      online: 'Online / Phone Consultation',
      onlineDesc: 'Secure video conference or telephone advisory with senior executives',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time Slot',
      portfolioRange: 'Anticipated Capital or Project Scope',
      notes: 'Session Objectives & Notes (Optional)',
      notesPlaceholder: 'Please briefly outline session objectives, pitch overview or topics...',
      privacyNote: 'All inquiries and materials are safeguarded under strict Non-Disclosure Agreements (NDA).',
      submitBtn: 'Confirm & Schedule VIP Session',
      submitBooking: 'Confirm & Submit Booking',
      bookingSuccessTitle: 'Consultation Request Confirmed',
      bookingSuccessDesc: 'Our Investor Relations department will reach out shortly to finalize your appointment details.',
      mashhadOfficeTitle: 'Headquarters Office',
      mashhadOfficeAddress: 'Bozorgmehr Shomali 2, No 44, Floor 3, Mashhad, Iran',
      hqTitle: 'Holding Headquarters',
      directPhone: 'Direct Client Relations Line',
      workingHours: 'Visitor & Consultation Hours',
      emailLabel: 'Investor Relations Department',
      subsidiaryLines: 'Direct Subsidiary Extensions',
      faqEyebrow: 'Frequently Asked Questions',
      faqTitle: 'Frequently Asked Consultation Questions',
      callDirect: 'Call Mashhad Office Directly',
      trackingCode: 'Inquiry Reference Code',
    },
    consultationPage: {
      badge: 'VIP Consultation & In-Person Meeting',
      eyebrow: 'Official Advisory Booking Portal',
      title: 'Book Investment Consultation & In-Person Meeting',
      subtitle: 'Schedule a private session at our Mashhad headquarters or arrange an online advisory call with senior directors.',
      mainPortal: 'Main Portal',
      backToPortal: 'Back to Main Portal',
      backToHome: 'Back to Home',
      successTitle: 'Consultation Request Confirmed',
      successDesc: 'Our Investor Relations department will reach out shortly to finalize your appointment details and conference protocols.',
      step1Title: '1. Advisory Scope & Subject Matter',
      step1Desc: 'Please select your intended investment scope or financial service requirement:',
      step2Title: '2. Meeting Format & Timing',
      formatInPerson: 'In-Person Meeting (Mashhad HQ)',
      formatOnline: 'Secure Video Advisory Session',
      preferredSlotLabel: 'Preferred Meeting Time Slot:',
      step3Title: '3. Applicant Information & Contact',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Dr. Alireza Ahmadi',
      phone: 'Mobile Phone Number',
      phonePlaceholder: '+98 912 345 6789',
      email: 'Corporate Email Address',
      emailPlaceholder: 'name@company.com',
      company: 'Company / Organization (Optional)',
      companyPlaceholder: 'e.g. Modern Trade Development Co.',
      consultationType: 'Consultation Subject',
      meetingFormat: 'Meeting Format',
      inPerson: 'In-Person Meeting at Mashhad Office',
      inPersonDesc: 'Bozorgmehr Shomali 2, No 44, Floor 3, Mashhad',
      online: 'Online / Phone Consultation',
      onlineDesc: 'Secure video conference or telephone advisory with senior executives',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time Slot',
      portfolioRange: 'Anticipated Capital or Project Scope',
      notes: 'Session Objectives & Notes (Optional)',
      notesPlaceholder: 'Please briefly outline session objectives, pitch overview or topics...',
      privacyNote: 'All inquiries and materials are safeguarded under strict Non-Disclosure Agreements (NDA).',
      submitBtn: 'Confirm & Schedule VIP Session',
      submitBooking: 'Confirm & Submit Booking',
      bookingSuccessTitle: 'Consultation Request Confirmed',
      bookingSuccessDesc: 'Our Investor Relations department will reach out shortly to finalize your appointment details.',
      mashhadOfficeTitle: 'Headquarters Office',
      mashhadOfficeAddress: 'Bozorgmehr Shomali 2, No 44, Floor 3, Mashhad, Iran',
      hqTitle: 'Holding Headquarters',
      directPhone: 'Direct Client Relations Line',
      workingHours: 'Visitor & Consultation Hours',
      emailLabel: 'Investor Relations Department',
      subsidiaryLines: 'Direct Subsidiary Extensions',
      faqEyebrow: 'Frequently Asked Questions',
      faqTitle: 'Frequently Asked Consultation Questions',
      callDirect: 'Call Mashhad Office Directly',
      trackingCode: 'Inquiry Reference Code',
    },
    specModal: {
      title: 'Liquid Glass Design Specifications',
      subtitle: 'Visual identity manual, color tokens & interaction patterns for Ilya Saramad Capital Holding',
      close: 'Close Window',
    },
    common: {
      languageName: 'English',
      switchTo: 'فارسی',
      persian: 'فارسی',
      english: 'English',
      scrollProgress: 'Reading Progress',
      backToTop: 'Back to Top',
    },
  },
};
