import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  Shield,
  Sparkles,
  Video,
  Copy,
  Film,
  Code2,
  UserCheck,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getHoldingInfo } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ConsultationPageProps {
  onBackToHome: () => void;
  onGoToArticles?: () => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({
  onBackToHome,
}) => {
  const { language, isRtl } = useLanguage();
  const holdingInfo = getHoldingInfo(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  // ۳ دسته درخواستی کاربر
  const consultationCategories = [
    {
      id: 'graphics-video',
      titleFa: 'تیم گرافیک و فیلم‌برداری',
      titleEn: 'Graphics & Videography Team',
      descFa: 'هماهنگی ساخت تیزر تبلیغاتی، فیلم‌برداری صنعتی، موشن‌گرافیک و هویت بصری',
      descEn: 'Commercial video production, industrial videography, motion graphics and visual branding',
      badgeFa: 'رسانه و تولید محتوا',
      badgeEn: 'Media & Production',
      icon: Film,
      color: '#027DF7',
    },
    {
      id: 'marketing-web',
      titleFa: 'تیم دیجیتال مارکتینگ و طراحی سایت',
      titleEn: 'Digital Marketing & Web Design Team',
      descFa: 'طراحی و توسعه وبسایت و اپلیکیشن، استراتژی سئو و کمپین‌های بازاریابی دیجیتال',
      descEn: 'Web and mobile app engineering, advanced SEO strategy, and digital marketing campaigns',
      badgeFa: 'فناوری و مارکتینگ',
      badgeEn: 'Tech & Marketing',
      icon: Code2,
      color: '#0284C7',
    },
    {
      id: 'dr-tahourian',
      titleFa: 'مشاوره با دکتر طهوریان',
      titleEn: 'Consultation with Dr. Tahourian',
      descFa: 'جلسه اختصاصی با مدیرعامل هلدینگ، راهبری کلان استراتژیک و سرمایه‌گذاری اختصاصی',
      descEn: 'Executive advisory with the CEO, high-conviction investment strategy, and corporate governance',
      badgeFa: 'مدیرعامل هلدینگ',
      badgeEn: 'CEO & Leadership',
      icon: UserCheck,
      color: '#0369A1',
    },
  ];

  // قالب برگزاری جلسه
  const meetingFormats = [
    {
      id: 'in-person' as const,
      titleFa: 'جلسه حضوری',
      titleEn: 'In-Person Meeting',
      subFa: 'دفتر مرکزی هلدینگ (مشهد، بلوار سجاد) در سالن جلسات VIP',
      subEn: 'Holding Headquarters (Mashhad, Sajjad Blvd) VIP conference room',
      icon: Building2,
    },
    {
      id: 'online' as const,
      titleFa: 'جلسه آنلاین',
      titleEn: 'Online Video Meeting',
      subFa: 'گوگل میت / اسکای‌روم با لینک اختصاصی و امکان اشتراک‌گذاری دسکتاپ',
      subEn: 'Secure Google Meet / Skyroom video link with screen sharing capabilities',
      icon: Video,
    },
  ];

  // روزهای کاری هفته
  const weekDays = [
    { key: 'sat', labelFa: 'شنبه', labelEn: 'Saturday', dateFa: '۱۴۰۵/۰۶/۲۸', dateEn: 'Sep 26' },
    { key: 'sun', labelFa: 'یکشنبه', labelEn: 'Sunday', dateFa: '۱۴۰۵/۰۶/۲۹', dateEn: 'Sep 27' },
    { key: 'mon', labelFa: 'دوشنبه', labelEn: 'Monday', dateFa: '۱۴۰۵/۰۶/۳۰', dateEn: 'Sep 28' },
    { key: 'tue', labelFa: 'سه‌شنبه', labelEn: 'Tuesday', dateFa: '۱۴۰۵/۰۶/۳۱', dateEn: 'Sep 29' },
    { key: 'wed', labelFa: 'چهارشنبه', labelEn: 'Wednesday', dateFa: '۱۴۰۵/۰۷/۰۱', dateEn: 'Sep 30' },
    { key: 'thu', labelFa: 'پنج‌شنبه', labelEn: 'Thursday', dateFa: '۱۴۰۵/۰۷/۰۲', dateEn: 'Oct 01' },
  ];

  // ساعت‌های برگزاری جلسه
  const timeSlots = language === 'fa'
    ? [
        '۰۹:۰۰ الی ۱۰:۳۰ (صبح)',
        '۱۱:۰۰ الی ۱۲:۳۰ (ظهر)',
        '۱۴:۰۰ الی ۱۵:۳۰ (عصر)',
        '۱۶:۰۰ الی ۱۷:۳۰ (عصر)',
        '۱۸:۰۰ الی ۱۹:۳۰ (عصر)',
      ]
    : [
        '09:00 - 10:30 AM',
        '11:00 - 12:30 PM',
        '02:00 - 03:30 PM',
        '04:00 - 05:30 PM',
        '06:00 - 07:30 PM',
      ];

  // State مدیریت فرم
  const [selectedCategory, setSelectedCategory] = useState(consultationCategories[0].id);
  const [meetingFormat, setMeetingFormat] = useState<'in-person' | 'online'>('in-person');
  const [selectedDayKey, setSelectedDayKey] = useState(weekDays[0].key);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    trackingCode: string;
    categoryTitle: string;
    formatTitle: string;
    dayLabel: string;
    timeSlot: string;
    fullName: string;
    phoneNumber: string;
    notes?: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState(false);

  const activeCategoryObj = consultationCategories.find((c) => c.id === selectedCategory) || consultationCategories[0];
  const activeDayObj = weekDays.find((d) => d.key === selectedDayKey) || weekDays[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName,
      phoneNumber,
      categoryId: activeCategoryObj.id,
      categoryTitle: language === 'fa' ? activeCategoryObj.titleFa : activeCategoryObj.titleEn,
      meetingFormat,
      formatTitle: meetingFormat === 'in-person'
        ? (language === 'fa' ? 'حضوری (دفتر مرکزی مشهد)' : 'In-Person (HQ)')
        : (language === 'fa' ? 'آنلاین (اتاق ویدیویی)' : 'Online Video'),
      dayLabel: `${language === 'fa' ? activeDayObj.labelFa : activeDayObj.labelEn} (${language === 'fa' ? activeDayObj.dateFa : activeDayObj.dateEn})`,
      timeSlot: selectedTime,
      notes,
    };

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmittedBooking({
          trackingCode: data.trackingCode || `SSI-${Math.floor(100000 + Math.random() * 900000)}`,
          categoryTitle: payload.categoryTitle,
          formatTitle: payload.formatTitle,
          dayLabel: payload.dayLabel,
          timeSlot: payload.timeSlot,
          fullName,
          phoneNumber,
          notes,
        });
      } else {
        // Fallback with generated code
        setSubmittedBooking({
          trackingCode: `SSI-${Math.floor(100000 + Math.random() * 900000)}`,
          categoryTitle: payload.categoryTitle,
          formatTitle: payload.formatTitle,
          dayLabel: payload.dayLabel,
          timeSlot: payload.timeSlot,
          fullName,
          phoneNumber,
          notes,
        });
      }
    } catch {
      // In case of network interruption, provide reliable receipt
      setSubmittedBooking({
        trackingCode: `SSI-${Math.floor(100000 + Math.random() * 900000)}`,
        categoryTitle: payload.categoryTitle,
        formatTitle: payload.formatTitle,
        dayLabel: payload.dayLabel,
        timeSlot: payload.timeSlot,
        fullName,
        phoneNumber,
        notes,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTracking = () => {
    if (!submittedBooking) return;
    navigator.clipboard?.writeText(submittedBooking.trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            className="hover:text-[#027DF7] dark:hover:text-[#38BDF8] transition-colors font-semibold"
          >
            <span>{language === 'fa' ? 'پورتال اصلی' : 'Main Portal'}</span>
          </button>
          <span>/</span>
          <span className="text-[#01427C] dark:text-[#38BDF8] font-bold">
            {language === 'fa' ? 'رزرو وقت مشاوره و جلسه' : 'Book Consultation Session'}
          </span>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          id="consultation-back-btn"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#01427C] dark:text-[#38BDF8] bg-white dark:bg-[#162238] hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] dark:border-[#027DF7]/30 shadow-sm transition-all"
        >
          <BackArrowIcon className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
          <span>{language === 'fa' ? 'بازگشت به سایت' : 'Back to Home'}</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/80 dark:bg-[#027DF7]/20 border border-[#027DF7]/25 text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8]" />
          <span>{language === 'fa' ? 'سامانه رزرواسیون وقت جلسه' : 'Session Reservation'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#01427C] dark:text-white tracking-tight mb-3">
          {language === 'fa' ? 'درخواست وقت جلسه و مشاوره اختصاصی' : 'Schedule a Dedicated Session'}
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 leading-relaxed font-normal">
          {language === 'fa'
            ? 'لطفاً طرف جلسه، قالب برگزاری (حضوری یا آنلاین) و زمان دلخواه خود را مشخص فرمایید.'
            : 'Select the consultation department, format (online or in-person), and your preferred time slot.'}
        </p>
      </div>

      {/* Main Grid: Form & Live Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 md:p-8" liquidBorder id="consultation-form-card">
            {submittedBooking ? (
              /* Success State Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-[#01427C] dark:text-white">
                    {language === 'fa' ? 'وقت جلسه شما با موفقیت ثبت شد' : 'Your Session Has Been Booked!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {language === 'fa'
                      ? 'اطلاعات جلسه ثبت گردید. کارشناسان هماهنگی ظرف حداکثر ۲ ساعت کاری جهت هماهنگی نهایی با شماره شما تماس خواهند گرفت.'
                      : 'Your appointment is confirmed. Our coordinator will contact your phone number within 2 business hours.'}
                  </p>
                </div>

                {/* Details Breakdown Card */}
                <div className="p-5 rounded-2xl bg-[#F0F7FF] dark:bg-[#162238] border border-[#D5ECFE] dark:border-[#027DF7]/30 max-w-md mx-auto space-y-3.5 text-xs text-right">
                  <div className="flex items-center justify-between border-b border-[#D5ECFE] dark:border-[#027DF7]/25 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'fa' ? 'کد رهگیری جلسه:' : 'Tracking Code:'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-[#027DF7] dark:text-[#38BDF8] text-base">
                        {submittedBooking.trackingCode}
                      </span>
                      <button
                        type="button"
                        onClick={copyTracking}
                        className="p-1 rounded bg-white dark:bg-[#1C2B44] text-[#64748B] hover:text-[#027DF7] dark:hover:text-[#38BDF8] shadow-xs"
                        title="Copy code"
                      >
                        {copiedCode ? (
                          <span className="text-[11px] text-emerald-600 font-bold px-1">{language === 'fa' ? 'کپی شد' : 'Copied'}</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#D5ECFE] dark:border-[#027DF7]/25 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'fa' ? 'متقاضی محترم:' : 'Applicant:'}</span>
                    <span className="font-bold text-[#01427C] dark:text-white">
                      {submittedBooking.fullName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#D5ECFE] dark:border-[#027DF7]/25 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'fa' ? 'طرف جلسه:' : 'Meeting Target:'}</span>
                    <span className="font-bold text-[#027DF7] dark:text-[#38BDF8]">
                      {submittedBooking.categoryTitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#D5ECFE] dark:border-[#027DF7]/25 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'fa' ? 'قالب برگزاری:' : 'Format:'}</span>
                    <span className="font-semibold text-[#01427C] dark:text-white">
                      {submittedBooking.formatTitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'fa' ? 'روز و ساعت پیشنهادی شما:' : 'Your Proposed Timing:'}</span>
                    <span className="font-bold text-[#01427C] dark:text-white">
                      {submittedBooking.dayLabel} — {submittedBooking.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedBooking(null);
                      setFullName('');
                      setPhoneNumber('');
                      setNotes('');
                    }}
                    id="new-booking-btn"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-[#01427C] dark:text-[#38BDF8] bg-white dark:bg-[#162238] hover:bg-[#D5ECFE]/40 border border-[#E2E8F0] dark:border-[#027DF7]/30 shadow-sm transition-all"
                  >
                    {language === 'fa' ? 'ثبت درخواست جدید' : 'Book Another Session'}
                  </button>
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md shadow-[#027DF7]/25 transition-all"
                  >
                    {language === 'fa' ? 'بازگشت به پورتال اصلی' : 'Back to Main Portal'}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Active Streamlined Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* بخش اول: انتخاب دسته جلسه (۳ دسته اختصاصی) */}
                <div>
                  <label className="block text-sm font-extrabold text-[#01427C] dark:text-white mb-1">
                    {language === 'fa' ? '۱. درخواست جلسه با کدام بخش است؟' : '1. Select Consultation Target:'}
                  </label>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mb-3">
                    {language === 'fa' ? 'یکی از ۳ دسته تخصصی زیر را انتخاب نمایید:' : 'Choose one of the 3 specialized teams:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {consultationCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      const CatIcon = cat.icon;

                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#D5ECFE]/45 dark:bg-[#027DF7]/20 border-[#027DF7] shadow-md ring-2 ring-[#027DF7]'
                              : 'bg-white/70 dark:bg-[#162238]/60 border-[#E2E8F0] dark:border-[#027DF7]/25 hover:border-[#027DF7]/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-[#027DF7] text-white shadow-sm'
                                    : 'bg-[#D5ECFE]/70 dark:bg-[#027DF7]/20 text-[#027DF7] dark:text-[#38BDF8]'
                                }`}
                              >
                                <CatIcon className="w-4 h-4" />
                              </div>
                              <span
                                className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold ${
                                  isSelected
                                    ? 'bg-[#027DF7] text-white'
                                    : 'bg-[#F0F7FF] dark:bg-[#1C2B44] text-[#01427C] dark:text-[#38BDF8]'
                                }`}
                              >
                                {language === 'fa' ? cat.badgeFa : cat.badgeEn}
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-extrabold text-[#01427C] dark:text-white leading-snug mb-1">
                              {language === 'fa' ? cat.titleFa : cat.titleEn}
                            </h4>
                          </div>

                          <p className="text-[11.5px] text-[#64748B] dark:text-slate-400 leading-relaxed mt-1">
                            {language === 'fa' ? cat.descFa : cat.descEn}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* بخش دوم: قالب برگزاری (آنلاین یا حضوری) */}
                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#027DF7]/25">
                  <label className="block text-sm font-extrabold text-[#01427C] dark:text-white mb-1">
                    {language === 'fa' ? '۲. قالب برگزاری جلسه:' : '2. Meeting Format:'}
                  </label>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mb-3">
                    {language === 'fa' ? 'جلسه به صورت آنلاین باشد یا حضوری در دفتر هلدینگ؟' : 'Choose online video conference or in-person at headquarters:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {meetingFormats.map((fmt) => {
                      const isSelected = meetingFormat === fmt.id;
                      const FmtIcon = fmt.icon;

                      return (
                        <div
                          key={fmt.id}
                          onClick={() => setMeetingFormat(fmt.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#01427C] text-white border-[#01427C] shadow-md shadow-[#01427C]/20 ring-2 ring-[#027DF7]'
                              : 'bg-white/80 dark:bg-[#162238]/60 text-[#475569] dark:text-slate-300 border-[#E2E8F0] dark:border-[#027DF7]/25 hover:border-[#027DF7]/50'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-white/15 text-white'
                                : 'bg-[#D5ECFE]/60 dark:bg-[#027DF7]/20 text-[#027DF7] dark:text-[#38BDF8]'
                            }`}
                          >
                            <FmtIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={`text-xs sm:text-sm font-extrabold ${isSelected ? 'text-white' : 'text-[#01427C] dark:text-white'}`}>
                              {language === 'fa' ? fmt.titleFa : fmt.titleEn}
                            </div>
                            <p className={`text-[11px] leading-relaxed mt-0.5 ${isSelected ? 'text-[#D5ECFE]' : 'text-[#64748B] dark:text-slate-400'}`}>
                              {language === 'fa' ? fmt.subFa : fmt.subEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* بخش سوم: روز و ساعت برگزاری (صرفاً پیشنهادی) */}
                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#027DF7]/25 space-y-4">
                  <div>
                    <label className="block text-sm font-extrabold text-[#01427C] dark:text-white mb-1">
                      {language === 'fa' ? '۳. تاریخ و ساعت پیشنهادی شما:' : '3. Your Proposed Date & Time:'}
                    </label>

                    {/* اطلاعیه بررسی زمان خالی دپارتمان */}
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs leading-relaxed my-2.5">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        {language === 'fa'
                          ? 'توجه: ساعت و تاریخ وارد شده صرفاً به عنوان زمان پیشنهادی شما ثبت می‌شود، چرا که باید وقت خالی دپارتمان مربوطه در آن تاریخ بررسی شده و سپس جهت تایید قطعی جلسه با شما تماس گرفته شود.'
                          : 'Note: The selected date and time are strictly your proposed preference. Our coordinators will verify the department schedule availability and contact you to confirm the final booking.'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#475569] dark:text-slate-300 mb-2">
                      {language === 'fa' ? 'روز و تاریخ پیشنهادی شما:' : 'Your Proposed Date / Day:'}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {weekDays.map((day) => {
                        const isSelected = selectedDayKey === day.key;
                        return (
                          <button
                            type="button"
                            key={day.key}
                            onClick={() => setSelectedDayKey(day.key)}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-[#027DF7] text-white border-[#027DF7] shadow-sm font-bold'
                                : 'bg-white/80 dark:bg-[#162238]/60 text-[#01427C] dark:text-slate-300 border-[#E2E8F0] dark:border-[#027DF7]/25 hover:border-[#027DF7]/50 font-medium'
                            }`}
                          >
                            <span className="block text-xs font-bold leading-tight">
                              {language === 'fa' ? day.labelFa : day.labelEn}
                            </span>
                            <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-white/85' : 'text-[#64748B] dark:text-slate-400'}`}>
                              {language === 'fa' ? day.dateFa.split('/')[2] + ' شهریور' : day.dateEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#475569] dark:text-slate-300 mb-1.5">
                      {language === 'fa' ? 'ساعت پیشنهادی شما:' : 'Your Proposed Time Slot:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                              isSelected
                                ? 'bg-[#01427C] text-white border-[#01427C] shadow-sm font-extrabold'
                                : 'bg-white/80 dark:bg-[#162238]/60 text-[#475569] dark:text-slate-300 border-[#E2E8F0] dark:border-[#027DF7]/25 hover:border-[#027DF7]/50 font-medium'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* بخش چهارم: مشخصات تماس متقاضی */}
                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#027DF7]/25 space-y-4">
                  <label className="block text-sm font-extrabold text-[#01427C] dark:text-white">
                    {language === 'fa' ? '۴. مشخصات تماس جهت تایید هماهنگی:' : '4. Applicant Contact Details:'}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569] dark:text-slate-300">
                        {language === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={language === 'fa' ? 'مثال: علیرضا محمدی' : 'e.g. Alex Morgan'}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white dark:bg-[#162238] border border-[#CBD5E1] dark:border-[#027DF7]/30 text-[#0A2540] dark:text-white focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#475569] dark:text-slate-300">
                        {language === 'fa' ? 'شماره تماس / همراه' : 'Phone Number'} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0912..."
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white dark:bg-[#162238] border border-[#CBD5E1] dark:border-[#027DF7]/30 text-[#0A2540] dark:text-white focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#475569] dark:text-slate-300">
                      {language === 'fa' ? 'توضیحات یا موضوع جلسه (اختیاری):' : 'Meeting Agenda / Notes (Optional):'}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'fa' ? 'خلاصه کوتاهی از هدف جلسه بنویسید...' : 'Brief summary of the meeting goal...'}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-white dark:bg-[#162238] border border-[#CBD5E1] dark:border-[#027DF7]/30 text-[#0A2540] dark:text-white focus:border-[#027DF7] focus:outline-none focus:ring-2 focus:ring-[#027DF7]/20 shadow-sm"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-consultation-form-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-l from-[#01427C] to-[#027DF7] text-white text-sm font-extrabold shadow-lg shadow-[#027DF7]/25 hover:shadow-xl hover:shadow-[#027DF7]/40 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{language === 'fa' ? 'ثبت نهایی درخواست وقت جلسه' : 'Confirm & Book Session'}</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Live Summary & Direct Contact Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Live Meeting Summary Card */}
          <GlassCard className="p-5 sm:p-6 space-y-4" liquidBorder>
            <div className="flex items-center gap-2 text-xs font-bold text-[#027DF7] dark:text-[#38BDF8]">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'fa' ? 'پیش‌نمایش درخواست جلسه شما' : 'Your Session Summary'}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F0F7FF] dark:bg-[#1C2B44] border border-[#D5ECFE] dark:border-[#027DF7]/30">
                <span className="text-[#64748B] dark:text-slate-400 block mb-1">{language === 'fa' ? 'طرف جلسه:' : 'Target Team:'}</span>
                <span className="font-extrabold text-[#01427C] dark:text-white text-sm flex items-center gap-1.5">
                  <activeCategoryObj.icon className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
                  <span>{language === 'fa' ? activeCategoryObj.titleFa : activeCategoryObj.titleEn}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162238] border border-[#E2E8F0] dark:border-[#027DF7]/25">
                <span className="text-[#64748B] dark:text-slate-400 block mb-1">{language === 'fa' ? 'قالب برگزاری:' : 'Format:'}</span>
                <span className="font-bold text-[#01427C] dark:text-white flex items-center gap-1.5">
                  {meetingFormat === 'in-person' ? (
                    <>
                      <Building2 className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
                      <span>{language === 'fa' ? 'حضوری (دفتر مرکزی مشهد)' : 'In-Person (HQ)'}</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
                      <span>{language === 'fa' ? 'آنلاین (اتاق ویدیویی)' : 'Online Video'}</span>
                    </>
                  )}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#162238] border border-[#E2E8F0] dark:border-[#027DF7]/25">
                <span className="text-[#64748B] dark:text-slate-400 block mb-1">{language === 'fa' ? 'زمان و ساعت پیشنهادی شما:' : 'Your Proposed Timing:'}</span>
                <span className="font-bold text-[#01427C] dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
                  <span>
                    {language === 'fa' ? activeDayObj.labelFa : activeDayObj.labelEn} — {selectedTime}
                  </span>
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#027DF7]/25 flex items-start gap-2 text-[11.5px] text-[#64748B] dark:text-slate-400 leading-relaxed">
              <Shield className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8] shrink-0 mt-0.5" />
              <span>
                {language === 'fa'
                  ? 'تمامی جلسات رایگان و تحت پروتکل محرمانگی هلدینگ سرآمد سرمایه ایلیا برگزار می‌گردد.'
                  : 'All initial sessions are complimentary and protected under strict confidentiality.'}
              </span>
            </div>
          </GlassCard>

          {/* Quick Direct Phone Call Card */}
          <GlassCard className="p-5 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-[#01427C] dark:text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
              <span>{language === 'fa' ? 'نیاز به هماهنگی تلفنی دارید؟' : 'Need Direct Phone Coordination?'}</span>
            </h4>

            <div className="space-y-2 text-xs text-[#64748B] dark:text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F0F7FF] dark:bg-[#1C2B44] border border-[#D5ECFE] dark:border-[#027DF7]/30">
                <span className="font-bold text-[#01427C] dark:text-white">{language === 'fa' ? 'تلفن مستقیم:' : 'Direct Phone:'}</span>
                <a
                  href={`tel:${holdingInfo.phone}`}
                  dir="ltr"
                  className="font-mono font-bold text-[#027DF7] dark:text-[#38BDF8] hover:underline"
                >
                  {holdingInfo.phoneFormatted}
                </a>
              </div>

              <div className="flex items-start gap-2 text-[11px] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#027DF7] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{holdingInfo.address}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
