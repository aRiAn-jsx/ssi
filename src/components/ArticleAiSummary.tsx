import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink } from 'lucide-react';

interface ArticleAiSummaryProps {
  title: string;
  summary: string;
  keyTakeaways?: string[];
  url: string;
  lang: 'fa' | 'en';
}

const MAX_PROMPT = 1400; // keep links comfortably under URL length limits

/** Builds the prompt the AI tools receive: the article's own text, not a link. */
const buildPrompt = (p: ArticleAiSummaryProps) => {
  const fa = p.lang === 'fa';
  const takeaways = (p.keyTakeaways ?? []).map((t) => `- ${t}`).join('\n');
  const body = [
    fa
      ? 'این مقاله‌ی تحلیلی را به فارسی خلاصه کن: ایده‌ی اصلی، نکات کلیدی و کاربردی آن را در چند بند کوتاه و فهرست‌وار بیان کن.'
      : 'Summarise this analytical article in English: the main idea, then the key practical takeaways as short bullet points.',
    '',
    fa ? `عنوان: ${p.title}` : `Title: ${p.title}`,
    '',
    p.summary,
    takeaways ? `\n${fa ? 'نکات کلیدی' : 'Key takeaways'}:\n${takeaways}` : '',
    '',
    `${fa ? 'منبع' : 'Source'}: ${p.url}`,
  ].join('\n');
  return body.length > MAX_PROMPT ? body.slice(0, MAX_PROMPT - 1) + '…' : body;
};

export const ArticleAiSummary: React.FC<ArticleAiSummaryProps> = (props) => {
  const fa = props.lang === 'fa';
  const [copied, setCopied] = useState(false);
  const prompt = buildPrompt(props);
  const enc = encodeURIComponent(prompt);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard blocked: the user can still open an AI tool below
    }
  };

  const btn =
    'inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-[13px] font-bold border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer';

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-[#F1F5F9] dark:bg-[#0c1d38] border border-[#CBD5E1] dark:border-sky-500/30">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
        <h3 className="text-sm font-black text-[#01427C] dark:text-[#F0F9FF]">
          {fa ? 'خلاصه‌ی این مقاله در هوش مصنوعی' : 'Summarise this article with AI'}
        </h3>
      </div>
      <p className="text-xs text-[#334155] dark:text-[#CBD5E1] mb-3 leading-relaxed">
        {fa
          ? 'با یک کلیک، متن مقاله به چت مورد نظرت منتقل می‌شود و خلاصه‌ی آن را می‌بینی.'
          : 'One click sends the article text to your AI chat and gets you a summary.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`https://chatgpt.com/?q=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-[#0F172A] text-white border-[#0F172A] hover:bg-[#1E293B] dark:bg-white dark:text-[#0F172A] dark:border-white`}
        >
          <span>ChatGPT</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
        <a
          href={`https://claude.ai/new?q=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-[#C2410C] text-white border-[#C2410C] hover:bg-[#9A3412] dark:bg-[#C2410C] dark:border-[#C2410C] dark:hover:bg-[#9A3412]`}
        >
          <span>Claude</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
        <button
          type="button"
          onClick={async () => {
            // Gemini does not take a prefilled prompt from a link: copy it, then open
            await copy();
            window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
          }}
          className={`${btn} bg-[#1D4ED8] text-white border-[#1D4ED8] hover:bg-[#1E40AF] dark:bg-[#2563EB] dark:border-[#2563EB] dark:hover:bg-[#3B82F6]`}
        >
          <span>Gemini</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </button>
        <button
          type="button"
          onClick={copy}
          className={`${btn} bg-white text-[#01427C] border-[#94A3B8] hover:bg-[#E2E8F0] dark:bg-transparent dark:text-[#E0F2FE] dark:border-sky-400/50 dark:hover:bg-sky-500/15`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>
            {copied
              ? fa ? 'کپی شد' : 'Copied'
              : fa ? 'کپی متن درخواست' : 'Copy prompt'}
          </span>
        </button>
      </div>
      {copied && (
        <p className="mt-2 text-[11px] text-[#334155] dark:text-[#CBD5E1]">
          {fa ? 'اگر از جمینای استفاده می‌کنی، متن کپی‌شده را در چت جدید paste کن.' : 'For Gemini, paste the copied prompt into a new chat.'}
        </p>
      )}
    </div>
  );
};
