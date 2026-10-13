import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { forwardToBot } from './botForms';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ConsultationBooking {
  id: string;
  trackingCode: string;
  fullName: string;
  phoneNumber: string;
  categoryId: string;
  categoryTitle: string;
  meetingFormat: 'in-person' | 'online';
  formatTitle: string;
  dayLabel: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending_review';
}

interface ContactInquiry {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
}

// In-memory persistent collections for runtime session
const bookingsStore: ConsultationBooking[] = [];
const contactInquiriesStore: ContactInquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security & Performance Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Robots-Tag', 'index, follow');
    // Enable keep-alive
    res.setHeader('Connection', 'keep-alive');
    next();
  });

  // ==========================================
  // BACKEND API ROUTES
  // ==========================================

  // 1. Health check & Server Telemetry
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'operational',
      service: 'SSI Holding API Gateway',
      version: '2.5.0',
      nodeEnv: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  // 2. Market Statistics & Performance Metrics
  app.get('/api/market-stats', (req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        totalAum: '۱۲,۴۵۰ میلیارد ریال',
        annualizedReturn: '+۵۲.۴٪',
        activePortfolios: '۱,۲۴۰+',
        institutionalClients: '۸۵+',
        sharpeRatio: '۲.۱۸',
        tedpixChange: '+۱.۲۴٪',
        marketSentiment: 'صعودی باثبات (Bullish Steady)',
        lastUpdated: new Date().toISOString(),
      },
    });
  });

  // 3. Subsidiaries Ecosystem API
  app.get('/api/subsidiaries', (req: Request, res: Response) => {
    res.json({
      success: true,
      holding: 'هلدینگ سرآمد سرمایه ایلیا (سهامی خاص)',
      parentCompany: 'شرکت بیمه سامان (سهامی خاص)',
      companies: [
        {
          id: 'bahasa',
          nameFa: 'بهار سا',
          nameEn: 'Bahasa Herbal & Care',
          specialtyFa: 'درمانی و گیاهی',
          specialtyEn: 'Therapeutic & Herbal Formulations',
          color: '#10B981',
          url: 'https://bahasa-care.ir',
          status: 'فعال در شبکه سلامت',
        },
        {
          id: 'virgol',
          nameFa: 'ویرگول',
          nameEn: 'Virgol Academy',
          specialtyFa: 'بخش آموزش و پکیج‌های مهارتی',
          specialtyEn: 'Financial Education & Professional Packages',
          color: '#0284C7',
          url: 'https://virgol.ac',
          status: 'پلتفرم جامع آموزشی',
        },
        {
          id: 'adl-aram-dana',
          nameFa: 'عدل آرام دانا',
          nameEn: 'Adl Aram Dana Legal Firm',
          specialtyFa: 'کارهای حقوقی و حقیقی شرکت‌ها',
          specialtyEn: 'Corporate & Legal Governance',
          color: '#1E3A8A',
          url: 'https://adlaramdana.ir',
          status: 'خدمات تخصصی حقوقی',
        },
        {
          id: 'hodhod',
          nameFa: 'هدهد',
          nameEn: 'Hodhod Creative Agency',
          specialtyFa: 'تولید محتوا و طراحی گرافیک',
          specialtyEn: 'Creative Production, Branding & Motion',
          color: '#EA580C',
          url: 'https://hodhodagency.com',
          status: 'آژانس دیجیتال مارکتینگ و مدیا',
        },
        {
          id: 'dehkadeh-tondorosti',
          nameFa: 'دهکده تندرستی',
          nameEn: 'Dehkadeh Tondorosti Wellness',
          specialtyFa: 'تغذیه، رژیم درمانی و سلامت',
          specialtyEn: 'Clinical Nutrition, Lifestyle & Wellness',
          color: '#059669',
          url: 'https://dehkadehtondorosti.ir',
          status: 'کلینیک سبک زندگی سالم',
        },
      ],
    });
  });

  // 4. Consultation Booking POST
  app.post('/api/consultation', (req: Request, res: Response) => {
    try {
      const {
        fullName,
        phoneNumber,
        categoryId,
        categoryTitle,
        meetingFormat,
        formatTitle,
        dayLabel,
        timeSlot,
        notes,
      } = req.body;

      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'نام و نام خانوادگی الزامی است (حداقل ۲ نویسه).',
        });
      }

      if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.trim().length < 8) {
        return res.status(400).json({
          success: false,
          error: 'شماره تلفن معتبر الزامی است.',
        });
      }

      // Generate a unique authenticated tracking code
      const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
      const trackingCode = `SSI-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, '0')}-${uniqueSuffix}`;

      const booking: ConsultationBooking = {
        id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        trackingCode,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        categoryId: categoryId || 'general',
        categoryTitle: categoryTitle || 'مشاوره عمومی',
        meetingFormat: meetingFormat === 'online' ? 'online' : 'in-person',
        formatTitle: formatTitle || (meetingFormat === 'online' ? 'آنلاین' : 'حضوری'),
        dayLabel: dayLabel || 'تعیین شده در فرم',
        timeSlot: timeSlot || '۱۰:۰۰',
        notes: notes ? String(notes).trim() : '',
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      bookingsStore.push(booking);

      // Telegram bot integration: the holding bot's admins receive this booking too.
      void forwardToBot({
        form: 'consultation',
        form_title: 'رزرو جلسه مشاوره',
        site_ref: booking.trackingCode,
        name: booking.fullName,
        phone: booking.phoneNumber,
        message: booking.notes,
        fields: {
          'حوزه مشاوره': booking.categoryTitle,
          'نحوه برگزاری': booking.formatTitle,
          'روز': booking.dayLabel,
          'ساعت': booking.timeSlot,
        },
        page: '/consultation',
      });

      return res.status(201).json({
        success: true,
        message: 'درخواست مشاوره با موفقیت در سیستم ثبت گردید.',
        trackingCode: booking.trackingCode,
        booking,
      });
    } catch (err: unknown) {
      console.error('Error processing consultation:', err);
      return res.status(500).json({
        success: false,
        error: 'خطای سیستمی در پردازش نوبت. لطفاً دوباره تلاش کنید.',
      });
    }
  });

  // 5. Query Consultation Booking by Tracking Code
  app.get('/api/consultation/:trackingCode', (req: Request, res: Response) => {
    const { trackingCode } = req.params;
    const booking = bookingsStore.find(
      (b) => b.trackingCode.toLowerCase() === trackingCode.toLowerCase()
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'کد پیگیری مورد نظر یافت نشد.',
      });
    }

    return res.json({
      success: true,
      booking,
    });
  });

  // 6. Contact Inquiries POST
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, contact, subject, message } = req.body;

    if (!name || !contact || !message) {
      return res.status(400).json({
        success: false,
        error: 'لطفاً نام، راه ارتباطی و متن پیام را وارد فرمایید.',
      });
    }

    const inquiry: ContactInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: String(name).trim(),
      contact: String(contact).trim(),
      subject: subject ? String(subject).trim() : 'درخواست اطلاعات عمومی',
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    contactInquiriesStore.push(inquiry);

    // Telegram bot integration. "contact" is free text: an email address or a phone number.
    void forwardToBot({
      form: 'contact',
      form_title: 'تماس با ما',
      site_ref: inquiry.id,
      name: inquiry.name,
      subject: inquiry.subject,
      message: inquiry.message,
      ...(inquiry.contact.includes('@') ? { email: inquiry.contact } : { phone: inquiry.contact }),
    });

    return res.status(201).json({
      success: true,
      message: 'پیام شما دریافت شد و کارشناسان هلدینگ با شما تماس خواهند گرفت.',
      inquiryId: inquiry.id,
    });
  });

  // 7. Callback request (home page CTA) — delivered to the holding's Telegram bot
  app.post('/api/callback', (req: Request, res: Response) => {
    const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : '';

    if (phone.length < 8 || phone.length > 20) {
      return res.status(400).json({
        success: false,
        error: 'شماره تلفن معتبر الزامی است.',
      });
    }

    void forwardToBot({
      form: 'callback',
      form_title: 'درخواست تماس',
      site_ref: `cb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      phone,
      page: '/',
    });

    return res.status(201).json({
      success: true,
      message: 'درخواست تماس شما ثبت شد.',
    });
  });

  // 8. Newsletter subscription — delivered to the holding's Telegram bot
  app.post('/api/newsletter', (req: Request, res: Response) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return res.status(400).json({
        success: false,
        error: 'ایمیل معتبر الزامی است.',
      });
    }

    void forwardToBot({
      form: 'newsletter',
      form_title: 'عضویت در خبرنامه',
      site_ref: `nl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email,
    });

    return res.status(201).json({
      success: true,
      message: 'عضویت شما در خبرنامه ثبت شد.',
    });
  });

  // ==========================================
  // SEO STATIC FILES HANDLERS
  // ==========================================

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.sendFile(sitemapPath);
    }
    return res.status(404).send('Sitemap not found');
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.sendFile(robotsPath);
    }
    return res.status(404).send('Robots.txt not found');
  });

  // ==========================================
  // VITE DEV MIDDLEWARE OR PRODUCTION STATIC
  // ==========================================

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        etag: true,
      })
    );

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SSI Holding Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
