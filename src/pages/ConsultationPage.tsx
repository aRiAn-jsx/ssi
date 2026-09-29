import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  Shield,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Users,
  Briefcase,
  Video,
  Copy,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ConsultationFormData } from '../types';
import { getHoldingInfo } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ConsultationPageProps {
  onBackToHome: () => void;
  onGoToArticles?: () => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({
  onBackToHome,
  onGoToArticles,
}) => {
  const { language, isRtl, t } = useLanguage();
  const holdingInfo = getHoldingInfo(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const consultationTypes = [
    {
      id: 'wealth',
      title: language === 'fa' ? 'سبدگردانی و مدیریت ثروت اختصاصی' : 'Discretionary Portfolio & Wealth Management',
      desc: language === 'fa' ? 'پورتفوی حقیقی یا حقوقی بالای ۲ میلیارد تومان با استراتژی بازده متناسب با ریسک' : 'Individual or corporate portfolios above $50k with risk-adjusted alpha strategies',
      badge: language === 'fa' ? 'سبدگردان سرآمد' : 'Saramad Asset Mgmt',
    },
    {
      id: 'venture',
      title: language === 'fa' ? 'سرمایه‌گذاری جسورانه و استارتاپی (VC)' : 'Venture Capital & FinTech Startups',
      desc: language === 'fa' ? 'جذب سرمایه مراحل Seed تا Series B در حوزه‌های فین‌تک، سلامت و لجستیک' : 'Seed to Series B venture funding in FinTech, healthtech, and AI solutions',
      badge: language === 'fa' ? 'ایلیا ونچرز' : 'Ilya Ventures',
    },
    {
      id: 'corporate',
      title: language === 'fa' ? 'تامین مالی شرکتی و پذیرش در بورس' : 'Corporate Finance & IPO Advisory',
      desc: language === 'fa' ? 'مشاوره عرضه اولیه (IPO)، انتشار صکوک و اوراق مرابحه، تجدید ارزیابی دارایی‌ها' : 'IPO advisory, sukuk & debt underwriting, asset revaluation, M&A services',
      badge: language === 'fa' ? 'تامین سرمایه' : 'Investment Banking',
    },
    {
      id: 'real-estate',
      title: language === 'fa' ? 'مشارکت و سرمایه‌گذاری در املاک تجاری' : 'Commercial Real Estate & REITs',
      desc: language === 'fa' ? 'پروژه‌های ساختمانی شاخص، صندوق‌های املاک و مستغلات (REITs) و ارزش‌افزوده ملکی' : 'Landmark commercial development, REIT funds, and real estate asset management',
      badge: language === 'fa' ? 'املاک سرآمد' : 'Saramad Real Estate',
    },
    {
      id: 'insurance-risk',
      title: language === 'fa' ? 'مدیریت ریسک شرکتی و بیمه‌های اعتباری' : 'Enterprise Risk Management & Insurance',
      desc: language === 'fa' ? 'پوشش‌های زنجیره ارزش، بیمه‌های جامع مهندسی و بازرگانی تحت چتر بیمه سامان' : 'Value-chain liability, trade credit, and commercial risk policies by Saman Insurance',
      badge: language === 'fa' ? 'گروه سامان' : 'Saman Group',
    },
  ];

  const timeSlots = language === 'fa'
    ? ['۱۰:۰۰ الی ۱۱:۳۰ (صبح)', '۱۱:۳۰ الی ۱۳:۰۰ (ظهر)', '۱۴:۰۰ الی ۱۵:۳۰ (عصر)', '۱۶:۰۰ الی ۱۷:۳۰ (عصر)']
    : ['10:00 - 11:30 AM', '11:30 AM - 1:00 PM', '2:00 - 3:30 PM', '4:00 - 5:30 PM'];

  const faqs = [
    {
      question: language === 'fa'
        ? 'آیا جلسات مشاوره تخصصی اولیه شامل هزینه است؟'
        : 'Are initial strategic consultation sessions complimentary?',
      answer: language === 'fa'
        ? 'خیر، تمامی جلسات اولیه غربالگری نیازمندی‌ها، ارزیابی طرح‌های توجیهی و تحلیل استراتژیک اولیه پورتفوی با حضور مدیران ارشد هلدینگ سرآمد سرمایه ایلیا بدون دریافت هزینه و به صورت محرمانه برگزار می‌گردد.'
        : 'No. All initial screening sessions, pitch evaluation, and portfolio strategy reviews with executive directors are completely complimentary and protected by strict NDAs.',
    },
    {
      question: language === 'fa'
        ? 'حداقل سرمایه برای عقد قرارداد سبدگردانی اختصاصی چقدر است؟'
        : 'What is the minimum capital for discretionary asset management?',
      answer: language === 'fa'
        ? 'بر اساس دستورالعمل سازمان بورس و اوراق بهادار و سیاست‌های شرکت سبدگردان سرآمد، حداقل حجم پورتفوی برای سبدگردانی اختصاصی با کد PRX مجزا ۲ میلیارد تومان می‌باشد. برای مبالغ کمتر، صندوق‌های سرمایه‌گذاری مشترک و ETF سرآمد پیشنهاد می‌گردد.'
        : 'In accordance with regulatory guidelines and company policy, dedicated managed accounts (PRX) begin at approx. 2 billion Tomans (~$50,000 USD). For smaller amounts, Saramad mutual funds and ETFs are available.',
    },
    {
      question: language === 'fa'
        ? 'جلسات حضوری در کدام دفتر هلدینگ برگزار می‌شود؟'
        : 'Where are in-person consultation sessions held?',
      answer: language === 'fa'
        ? `تمامی جلسات رسمی حضوری در دفتر مرکزی هلدینگ سرآمد سرمایه ایلیا واقع در ${holdingInfo.address} و در سالن‌های کنفرانس مجهز به همراه پذیرایی VIP برگزار می‌گردد.`
        : `All formal in-person sessions are hosted at the executive headquarters at ${holdingInfo.address} with full VIP conference amenities.`,
    },
    {
      question: language === 'fa'
        ? 'چقدر پس از ثبت فرم با ما تماس گرفته خواهد شد؟'
        : 'How soon will your team contact us after submission?',
      answer: language === 'fa'
        ? 'کارشناسان ارشد واحد امور مشتریان ظرف حداکثر ۲ ساعت کاری پس از ثبت درخواست جهت تایید نهایی ساعت و هماهنگی پروتکل‌های جلسه (حضوری یا آنلاین) با شما تماس تلفنی برقرار خواهند کرد.'
        : 'Senior client relationship managers will contact you within 2 business hours to confirm time slots and session protocols (in-person or secure video conference).',
    },
  ];

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
    consultationType: 'wealth',
    meetingFormat: 'in-person',
    preferredDate: language === 'fa' ? '۱۴۰۵/۰۶/۲۵' : '2026/09/25',
    preferredTime: timeSlots[0],
    portfolioRange: language === 'fa' ? '۵ الی ۲۰ میلیارد تومان' : '$100k - $500k',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    trackingCode: string;
    details: ConsultationFormData;
  } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomCode = `SSI-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedBooking({
        trackingCode: randomCode,
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 900);
  };

  const copyTelephone = () => {
    navigator.clipboard?.writeText(holdingInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className={`w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#64748B]">
          <button
            type="button"
            onClick={onBackToHome}
            id="consultation-home-btn"
            className="hover:text-[#027DF7] transition-colors font-semibold"
          >
            <span>{t.consultationPage.mainPortal}</span>
          </button>
          <span>/</span>
          <span className="text-[#01427C] font-bold">{t.consultationPage.title}</span>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          id="consultation-back-btn"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#01427C] bg-white hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] shadow-sm transition-all"
        >
          <BackArrowIcon className="w-4 h-4 text-[#027DF7]" />
          <span>{t.consultationPage.backToPortal}</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5ECFE]/80 border border-[#027DF7]/25 text-[#01427C] text-xs font-bold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#027DF7]" />
          <span>{t.consultationPage.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01427C] tracking-tight mb-4">
          {t.consultationPage.title}
        </h1>
        <p className="text-sm md:text-base text-[#64748B] leading-relaxed font-normal">
          {t.consultationPage.subtitle}
        </p>
      </div>

      {/* Main Grid: Form & Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Booking Form Column */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-8" liquidBorder id="consultation-form-card">
            {submittedBooking ? (
              /* Success State Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-lg shadow-emerald-600/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#01427C]">
                    {t.consultationPage.successTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                    {t.consultationPage.successDesc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-[#D5ECFE] max-w-md mx-auto space-y-3">
                  <div className="flex items-center justify-between border-b border-[#D5ECFE] pb-2 text-xs">
                    <span className="text-[#64748B]">{language === 'fa' ? 'کد رهگیری جلسه:' : 'Tracking Code:'}</span>
                    <span className="font-mono font-extrabold text-[#027DF7] text-sm">
                      {submittedBooking.trackingCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#D5ECFE] pb-2 text-xs">
                    <span className="text-[#64748B]">{language === 'fa' ? 'متقاضی محترم:' : 'Applicant:'}</span>
                    <span className="font-bold text-[#01427C]">
                      {submittedBooking.details.fullName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#D5ECFE] pb-2 text-xs">
                    <span className="text-[#64748B]">{language === 'fa' ? 'حوزه مشاوره:' : 'Topic:'}</span>
                    <span className="font-semibold text-[#01427C]">
                      {consultationTypes.find((item) => item.id === submittedBooking.details.consultationType)?.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">{language === 'fa' ? 'فرمت و زمان:' : 'Format & Time:'}</span>
                    <span className="font-bold text-[#01427C]">
                      {submittedBooking.details.meetingFormat === 'in-person'
                        ? (language === 'fa' ? 'حضوری (دفتر مشهد)' : 'In-Person (HQ)')
                        : (language === 'fa' ? 'آنلاین' : 'Secure Online Video')}{' '}
                      — {submittedBooking.details.preferredTime}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    id="new-booking-btn"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-[#01427C] bg-white hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] shadow-sm transition-all"
                  >
                    {language === 'fa' ? 'ثبت درخواست جدید' : 'New Request'}
                  </button>
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 transition-all"
                  >
                    {t.consultationPage.backToPortal}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-[#01427C] mb-1 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#027DF7]" />
                    <span>{t.consultationPage.step1Title}</span>
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {t.consultationPage.step1Desc}
                  </p>
                </div>

                {/* Types Grid */}
                <div className="grid grid-cols-1 gap-2.5">
                  {consultationTypes.map((type) => {
                    const isSelected = formData.consultationType === type.id;
                    return (
                      <label
                        key={type.id}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#D5ECFE]/50 border-[#027DF7] shadow-sm ring-1 ring-[#027DF7]'
                            : 'bg-white/70 border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="consultationType"
                          value={type.id}
                          checked={isSelected}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, consultationType: type.id }))
                          }
                          className="mt-1 text-[#027DF7] focus:ring-[#027DF7]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs md:text-sm font-bold text-[#01427C]">
                              {type.title}
                            </span>
                            <span className="text-[12px] px-2 py-0.5 rounded-full bg-white text-[#027DF7] border border-[#027DF7]/20 font-semibold">
                              {type.badge}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#64748B] mt-0.5 leading-relaxed font-normal">
                            {type.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Meeting Format & Timing */}
                <div className="pt-2 border-t border-[#E2E8F0] space-y-4">
                  <h3 className="text-lg font-black text-[#01427C] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#027DF7]" />
                    <span>{t.consultationPage.step2Title}</span>
                  </h3>

                  {/* Format Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="format-in-person-btn"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, meetingFormat: 'in-person' }))
                      }
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        formData.meetingFormat === 'in-person'
                          ? 'bg-[#01427C] text-white border-[#01427C] shadow-md shadow-[#01427C]/15'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#027DF7]/40'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>{t.consultationPage.formatInPerson}</span>
                    </button>

                    <button
                      type="button"
                      id="format-online-btn"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, meetingFormat: 'online' }))
                      }
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        formData.meetingFormat === 'online'
                          ? 'bg-[#01427C] text-white border-[#01427C] shadow-md shadow-[#01427C]/15'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#027DF7]/40'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>{t.consultationPage.formatOnline}</span>
                    </button>
                  </div>

                  {/* Time slot buttons */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#64748B]">
                      {t.consultationPage.preferredSlotLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.preferredTime === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, preferredTime: slot }))
                            }
                            className={`p-2.5 rounded-xl border text-[13px] font-bold text-center transition-all ${
                              isSelected
                                ? 'bg-[#027DF7] text-white border-[#027DF7]'
                                : 'bg-white/80 text-[#64748B] border-[#E2E8F0] hover:border-[#027DF7]/40'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Personal & Corporate Contact Details */}
                <div className="pt-2 border-t border-[#E2E8F0] space-y-4">
                  <h3 className="text-lg font-black text-[#01427C] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#027DF7]" />
                    <span>{t.consultationPage.step3Title}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569]">
                        {t.consultationPage.fullName} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="form-full-name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                        placeholder={t.consultationPage.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569]">
                        {t.consultationPage.phone} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        id="form-phone-number"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                        placeholder={t.consultationPage.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569]">
                        {t.consultationPage.email} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        id="form-email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder={t.consultationPage.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569]">
                        {t.consultationPage.company}
                      </label>
                      <input
                        type="text"
                        id="form-company-name"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, companyName: e.target.value }))
                        }
                        placeholder={t.consultationPage.companyPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#475569]">
                      {t.consultationPage.notes}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder={t.consultationPage.notesPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-[#CBD5E1] text-[#0A2540] focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                    />
                  </div>
                </div>

                {/* Privacy & Guarantee Note */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#64748B] leading-relaxed">
                  <Shield className="w-4 h-4 text-[#027DF7] shrink-0 mt-0.5" />
                  <span>{t.consultationPage.privacyNote}</span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="submit-consultation-form-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-sm font-extrabold shadow-lg shadow-[#027DF7]/25 hover:shadow-xl hover:shadow-[#027DF7]/40 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t.consultationPage.submitBtn}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Contact Information & HQ Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Headquarters Card */}
          <GlassCard className="p-6 md:p-7 space-y-5" liquidBorder>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#027DF7] to-[#01427C] text-white flex items-center justify-center shadow-md shadow-[#027DF7]/25">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#01427C]">
                  {t.consultationPage.hqTitle}
                </h3>
                <span className="text-xs text-[#64748B]">
                  {language === 'fa' ? holdingInfo.nameFa : holdingInfo.nameEn}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3 text-xs md:text-sm text-[#475569]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#027DF7] shrink-0 mt-1" />
                <p className="leading-relaxed">
                  {holdingInfo.address}
                </p>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F0F7FF] border border-[#D5ECFE]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#01427C]">
                  <Phone className="w-4 h-4 text-[#027DF7]" />
                  <span>{t.consultationPage.directPhone}:</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${holdingInfo.phone}`}
                    dir="ltr"
                    className="font-mono font-bold text-[#027DF7] text-sm hover:underline"
                  >
                    {holdingInfo.phoneFormatted}
                  </a>
                  <button
                    type="button"
                    onClick={copyTelephone}
                    title="Copy phone number"
                    className="p-1 rounded bg-white text-[#64748B] hover:text-[#027DF7] shadow-xs"
                  >
                    {copiedPhone ? (
                      <span className="text-[12px] text-emerald-600 font-bold px-1">{language === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-2.5 text-xs text-[#64748B]">
                <Clock className="w-4 h-4 text-[#027DF7] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0A2540]">{t.consultationPage.workingHours}:</div>
                  <div className="font-medium text-[#01427C]">{holdingInfo.workingHours}</div>
                </div>
              </div>

              {/* Official Emails */}
              <div className="flex items-start gap-2.5 text-xs text-[#64748B]">
                <Mail className="w-4 h-4 text-[#027DF7] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0A2540]">{t.consultationPage.emailLabel}:</div>
                  <a
                    href={`mailto:${holdingInfo.email}`}
                    className="font-mono text-[#027DF7] hover:underline block"
                  >
                    {holdingInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Subsidiary Direct Lines */}
          <GlassCard className="p-6 space-y-4">
            <h4 className="text-sm font-extrabold text-[#01427C] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#027DF7]" />
              <span>{t.consultationPage.subsidiaryLines}</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/70 border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#01427C]">{language === 'fa' ? 'شرکت سبدگردان سرآمد' : 'Saramad Asset Management'}</div>
                  <div className="text-[13px] text-[#64748B]">{language === 'fa' ? 'پورتفوی اختصاصی و صندوق‌ها' : 'Managed Accounts & Funds'}</div>
                </div>
                <span className="font-mono font-bold text-[#027DF7]">{language === 'fa' ? 'داخلی ۱۰۴' : 'Ext. 104'}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#01427C]">{language === 'fa' ? 'ایلیا ونچرز (سرمایه‌گذاری خطرپذیر)' : 'Ilya Ventures (VC)'}</div>
                  <div className="text-[13px] text-[#64748B]">{language === 'fa' ? 'ارزیابی طرح‌ها و جذب سرمایه' : 'Deal Flow & Startup Pitch'}</div>
                </div>
                <span className="font-mono font-bold text-[#027DF7]">{language === 'fa' ? 'داخلی ۱۰۸' : 'Ext. 108'}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#01427C]">{language === 'fa' ? 'توسعه املاک و مستغلات سرآمد' : 'Saramad Real Estate Development'}</div>
                  <div className="text-[13px] text-[#64748B]">{language === 'fa' ? 'مشارکت در ساخت و پروژه‌های تجاری' : 'Commercial Development'}</div>
                </div>
                <span className="font-mono font-bold text-[#027DF7]">{language === 'fa' ? 'داخلی ۱۱۲' : 'Ext. 112'}</span>
              </div>
            </div>
          </GlassCard>

          {/* Parent Company Guarantee Badge */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#01427C]/10 via-[#D5ECFE]/40 to-[#027DF7]/10 border border-[#D5ECFE] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#01427C] text-white flex items-center justify-center shrink-0 font-black text-sm shadow-sm">
              {language === 'fa' ? 'سامان' : 'SAMAN'}
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#01427C] block">
                {language === 'fa' ? 'تحت نظارت و وابسته به بیمه سامان (سهامی عام)' : 'Affiliated with Saman Insurance (Public Joint Stock)'}
              </span>
              <span className="text-[#64748B]">
                {language === 'fa' ? 'دارای مجوز رسمی سبدگردانی از سازمان بورس و اوراق بهادار تهران' : 'Licensed and regulated by the Securities and Exchange Organization'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#027DF7] mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{t.consultationPage.faqEyebrow}</span>
          </div>
          <h3 className="text-2xl font-black text-[#01427C]">
            {t.consultationPage.faqTitle}
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <GlassCard
                key={idx}
                className="overflow-hidden cursor-pointer"
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
              >
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#D5ECFE] text-[#01427C] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#01427C]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#027DF7]' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0]/60 font-normal"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Articles Cross-Link */}
      {onGoToArticles && (
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#01427C]">
              {language === 'fa' ? 'آشنایی با دیدگاه‌های تحلیلی مدیران هلدینگ' : 'Explore Strategic Insights from Executives'}
            </h4>
            <p className="text-xs text-[#64748B]">
              {language === 'fa'
                ? 'پیش از جلسه می‌توانید آخرین گزارش‌های راهبردی و یادداشت‌های پژوهشی را در صفحه مقالات مطالعه فرمایید.'
                : 'Review our latest economic bulletins and research publications before your session.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToArticles}
            id="go-to-articles-btn"
            className="px-5 py-2.5 rounded-full bg-[#D5ECFE] text-[#01427C] hover:bg-[#027DF7] hover:text-white text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>{language === 'fa' ? 'مشاهده صفحه مقالات' : 'View Articles & Research'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
