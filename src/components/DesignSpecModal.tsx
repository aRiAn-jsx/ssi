import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Layers, Code, Palette, Smartphone, Sparkles, Check, Copy } from 'lucide-react';
import { GSAP_SETUP_CODE } from '../animations/gsapSetup';

interface DesignSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSpecModal: React.FC<DesignSpecModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mockup' | 'lottie' | 'breakpoints' | 'tokens' | 'gsap'>('mockup');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-[#01427C]/60 backdrop-blur-lg flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[32px] w-full max-w-5xl max-h-[90vh] shadow-2xl border border-white/80 flex flex-col overflow-hidden text-right text-[#0A2540]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 md:px-8 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F7FAFC]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#027DF7] to-[#01427C] flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#01427C]">
                دفترچه مستندات طراحی و مشخصات فنی هلدینگ
              </h3>
              <p className="text-xs text-[#64748B]">
                Ilya Saramad Capital Holding • سیستم طراحی Liquid Glass
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#01427C] transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 md:px-8 pt-4 pb-2 border-b border-[#E2E8F0] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'mockup', label: '۱. توصیف موکاپ بخش‌ها', icon: Layers },
            { id: 'tokens', label: '۲. توکن‌های طراحی و CSS', icon: Palette },
            { id: 'lottie', label: '۳. فهرست انیمیشن‌های Lottie', icon: Sparkles },
            { id: 'breakpoints', label: '۴. طرح ریسپانسیو و گرید', icon: Smartphone },
            { id: 'gsap', label: '۵. کد رجیستری GSAP و اسکرول', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#01427C] text-white shadow-sm'
                    : 'text-[#64748B] hover:bg-[#F7FAFC] hover:text-[#01427C]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm">
          {/* Tab 1: Mockup Description */}
          {activeTab === 'mockup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#D5ECFE]/40 border border-[#027DF7]/20">
                <h4 className="font-extrabold text-[#01427C] mb-2">
                  معماری بصری و هویت برند (Quiet Power & Liquid Glass 2.0)
                </h4>
                <p className="text-xs text-[#0A2540] leading-relaxed">
                  طراحی بر اساس نسبت طلایی رنگ‌ها (۶۰٪ سفید خالص، ۲۵٪ آبی آسمانی ملایم، ۱۰٪ آبی پویا و ۵٪ سرمه‌ای عمیق) استوار است. هیچ‌گونه المان اضافی یا گرادیان‌های کلیشه‌ای بنفش/صورتی وجود ندارد؛ تمام تمرکز بر تایپوگرافی شفاف، فضای منفی متوازن و متریال شیشه صیقلی چندبعدی است.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    sec: 'بخش ۱ — نوبار معلق شیشه‌ای',
                    desc: 'عرض شناور، مارجین ۲۴ پیکسل از بالا، پدینگ ۱۲×۳۲ پیکسل، بردر ۱ پیکسلی با پس‌زمینه ۷۵٪ شیشه‌ای، انیمیشن محوشدن هنگام اسکرول به پایین و آشکار شدن در اسکرول به بالا.',
                  },
                  {
                    sec: 'بخش ۲ — هیرو تمام صفحه',
                    desc: 'تایپوگرافی ۷۲ پیکسلی استوار بر پس‌زمینه مِش و اورب‌های متحرک شناور. کارت پیش‌نمایش داشبورد سه‌بعدی با انیمیشن تیلت در سمت چپ.',
                  },
                  {
                    sec: 'بخش ۳ — درباره ما (۲ ستونه)',
                    desc: 'ترکیب تصویر مدرن اداری در قاب شیشه‌ای با درخشش نئونی آبی و مینی‌کارت‌های استاتوس پروازکننده بر روی عکس.',
                  },
                  {
                    sec: 'بخش ۴ — ماتریس خدمات ۳×۲',
                    desc: 'کارت‌های شیشه‌ای مجهز به افکت سه‌بعدی، لاتی آیکون‌های متحرک، تگ‌های دسته‌بندی و پالت فیدبک هاور.',
                  },
                  {
                    sec: 'بخش ۵ — آمار کلیدی در سرمه‌ای عمیق',
                    desc: 'کانتراست پرقدرت رنگ #01427C با اعداد شمارشگر خودکار (Count-Up) و خط ترسیم شونده متحرک آبی میان ستون‌ها.',
                  },
                  {
                    sec: 'بخش ۶ — سرمایه‌گذاری‌ها و پرتفوی افقی',
                    desc: 'مسیر اسکرول افقی کارت‌های عریض با حاشیه فلز مایع (Liquid Metal Border) و نرخ بازدهی سود تقسیمی.',
                  },
                  {
                    sec: 'بخش ۷ — منظومه صورت‌فلکی شرکت‌های تابعه',
                    desc: 'طراحی مداری با هسته هلدینگ سرآمد و ۳ نود تعاملی متصل با خطوط چین‌دار متحرک SVG.',
                  },
                  {
                    sec: 'بخش ۸ — داشبورد عملکرد مالی',
                    desc: 'نمودارهای برداری متحرک (Line + Area fill + Bar indicators + Donut allocation) با فیلتر بازه زمانی ماهانه، فصلی و سالانه.',
                  },
                  {
                    sec: 'بخش ۹ — رسانه و اخبار',
                    desc: 'اسلایدر افقی درگ‌محور کارت‌های اخبار رسمی، گزارش‌های مجامع و زمان مطالعه با ماژول پاپ‌آپ مشروح.',
                  },
                  {
                    sec: 'بخش ۱۰ — تیم راهبری و هیئت مدیره',
                    desc: 'آواتارهای گرد با رینگ آبی متحرک هنگام هاور و نمایش سوابق مدیریتی تخصصی در حوزه بانکداری و بورس.',
                  },
                  {
                    sec: 'بخش ۱۱ و ۱۲ — فراخوان همکاری و فوتر',
                    desc: 'گرادیان زاویه‌دار با پرتوهای نوری چرخشی در پشت کارت مرکزی، همراه با فرم مشاوره تلفنی و فوتر ۴ ستونه استاندارد.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0]">
                    <h5 className="font-bold text-sm text-[#01427C] mb-1.5">{item.sec}</h5>
                    <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Design Tokens */}
          {activeTab === 'tokens' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748B]">
                  متغیرهای رنگی و استایل‌های اصلی CSS
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(`
--color-soft-sky: #D5ECFE;
--color-vibrant-blue: #027DF7;
--color-deep-navy: #01427C;
--color-pure-white: #FFFFFF;
--color-off-white: #F7FAFC;
--color-text-primary: #0A2540;
--color-text-secondary: #64748B;
--color-border-subtle: #E2E8F0;
                    `)
                  }
                  className="flex items-center gap-1.5 text-xs text-[#027DF7] font-bold hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'کپی شد' : 'کپی توکن‌ها'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Soft Sky', hex: '#D5ECFE', role: 'پس‌زمینه‌ها و شیشه‌ها' },
                  { name: 'Vibrant Blue', hex: '#027DF7', role: 'دکمه‌های اصلی و آیکون‌ها' },
                  { name: 'Deep Navy', hex: '#01427C', role: 'عناوین و پس‌زمینه تیره' },
                  { name: 'Pure White', hex: '#FFFFFF', role: 'کارت‌ها و پس‌زمینه اصلی' },
                  { name: 'Off-White', hex: '#F7FAFC', role: 'سکشن‌های میانی' },
                  { name: 'Text Primary', hex: '#0A2540', role: 'متن‌های اصلی' },
                  { name: 'Text Secondary', hex: '#64748B', role: 'توضیحات و فرعی' },
                  { name: 'Success Green', hex: '#10B981', role: 'شاخص‌های مثبت' },
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl border border-[#E2E8F0] bg-white flex flex-col gap-2">
                    <div className="h-8 rounded-lg w-full border border-black/5" style={{ backgroundColor: c.hex }} />
                    <div>
                      <span className="text-xs font-bold text-[#01427C] block">{c.name}</span>
                      <span className="text-[10px] text-[#64748B] font-mono block">{c.hex}</span>
                      <span className="text-[10px] text-[#64748B] block mt-0.5">{c.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Lottie Animation Sources */}
          {activeTab === 'lottie' && (
            <div className="space-y-4">
              <p className="text-xs text-[#64748B] leading-relaxed">
                فهرست انیمیشن‌های برداری سبک پیشنهادی از منبع رسمی LottieFiles برای ادغام در فاز تولیدی:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: 'انیمیشن رشد نمودار مالی (Market Growth / Bullish)',
                    source: 'LottieFiles: "Financial Growth Chart Line" (by Jignesh)',
                    usage: 'سرویس مدیریت دارایی و سبدگردانی اختصاصی',
                    url: 'https://lottiefiles.com/featured/finance',
                  },
                  {
                    title: 'انیمیشن نوآوری و استارتاپ (Rocket / Fintech Pulse)',
                    source: 'LottieFiles: "Fintech Innovation & Spark"',
                    usage: 'سرویس سرمایه‌گذاری جسورانه ایلیا ونچرز',
                    url: 'https://lottiefiles.com/featured/startup',
                  },
                  {
                    title: 'انیمیشن برج‌های مدرن اداری (Corporate Architecture)',
                    source: 'LottieFiles: "Smart City & Commercial Buildings"',
                    usage: 'سرویس املاک و مستغلات لوکس',
                    url: 'https://lottiefiles.com/featured/architecture',
                  },
                  {
                    title: 'انیمیشن سپر امنیتی و نظارت بورس (Shield & Verification)',
                    source: 'LottieFiles: "Security Shield with Checkmark"',
                    usage: 'بخش درباره ما و نماد نظارت رسمی بورس تهران',
                    url: 'https://lottiefiles.com/featured/security',
                  },
                  {
                    title: 'انیمیشن اورب معلق سیال (Liquid Fluid Morph)',
                    source: 'LottieFiles: "Liquid Sphere Motion"',
                    usage: 'هسته مرکزی منظومه شرکت‌های تابعه',
                    url: 'https://lottiefiles.com/featured/abstract',
                  },
                ].map((lottie, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#01427C]">{lottie.title}</span>
                      <span className="text-[10px] text-[#027DF7] font-semibold">توصیه‌شده</span>
                    </div>
                    <p className="text-xs text-[#64748B] mb-1">منبع: {lottie.source}</p>
                    <p className="text-xs text-[#0A2540]">کاربرد در سایت: {lottie.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Responsive Breakpoints */}
          {activeTab === 'breakpoints' && (
            <div className="space-y-4">
              <p className="text-xs text-[#64748B] leading-relaxed">
                طرح گرید ۱۲ ستونه واکنش‌گرا با در نظر گرفتن رفتارهای تاچ موبایل و افکت‌های هاور دسکتاپ:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0]">
                  <span className="text-xs font-extrabold text-[#01427C] block mb-2">
                    موبایل (تا ۶۴۰ پیکسل)
                  </span>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li>• منوی تمام‌صفحه شیشه‌ای با انیمیشن Stagger</li>
                    <li>• چیدمان تک‌ستونه برای کارت‌های هیرو و درباره‌ما</li>
                    <li>• اسکرول افقی طبیعی با Touch Swipe در پرتفوی و اخبار</li>
                    <li>• تایپوگرافی سرتیتر H1: بین ۳۶ تا ۴۲ پیکسل</li>
                    <li>• غیرفعال‌سازی کرسر ماوس جهت عدم تداخل با تاچ</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0]">
                  <span className="text-xs font-extrabold text-[#01427C] block mb-2">
                    تبلت (۶۴۱ تا ۱۰۲۴ پیکسل)
                  </span>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li>• گرید ۲ ستونه در خدمات، تیم و آمار</li>
                    <li>• نمایش متوازن چارت داشبورد و نمودار دونات</li>
                    <li>• پدینگ جانبی کانتینر: ۳۲ پیکسل</li>
                    <li>• فعال بودن افکت‌های ترنزیشن و اسپرینگ</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0]">
                  <span className="text-xs font-extrabold text-[#01427C] block mb-2">
                    دسکتاپ و مانیتورهای عریض (+۱۰۲۴ پیکسل)
                  </span>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li>• نوبار کپسولی شناور کامل با بابل متحرک هاور</li>
                    <li>• گرید ۳ ستونه خدمات و ۴ ستونه آمار و تیم</li>
                    <li>• ناوبری نقطه‌ای کناری (Side Dot Navigation)</li>
                    <li>• کرسر سفارشی لوکس با هاله آبی نورانی</li>
                    <li>• اثر تیلت سه‌بعدی کارت‌های شیشه‌ای (تا ۶ درجه)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: GSAP Reference */}
          {activeTab === 'gsap' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748B]">
                  کد آماده ثبت انیمیشن‌های GSAP ScrollTrigger
                </span>
                <button
                  onClick={() => copyToClipboard(GSAP_SETUP_CODE)}
                  className="flex items-center gap-1.5 text-xs text-[#027DF7] font-bold hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'کپی شد' : 'کپی کد GSAP'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#01427C] text-[#D5ECFE] text-xs font-mono overflow-x-auto text-left dir-ltr max-h-72">
                {GSAP_SETUP_CODE}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between bg-[#F7FAFC]">
          <span className="text-xs text-[#64748B]">
            تمامی ۱۲ بخش بر اساس بریف پروژه و هویت هلدینگ سرآمد طراحی و پیاده‌سازی شده‌اند.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#01427C] text-white text-xs font-bold hover:bg-[#027DF7] transition-colors"
          >
            متوجه شدم
          </button>
        </div>
      </motion.div>
    </div>
  );
};
