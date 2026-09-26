import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Sparkles, ArrowUpLeft, ArrowUpRight, Building, CheckCircle2 } from 'lucide-react';
import { getSubsidiariesData } from '../data/mockData';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const SubsidiariesSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const [activeNodeId, setActiveNodeId] = useState<string>('sub-1');
  const subsidiariesData = getSubsidiariesData(language);
  const activeNode = subsidiariesData.find((n) => n.id === activeNodeId) || subsidiariesData[0];
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="subsidiaries" className="relative py-28 md:py-36 bg-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D5ECFE]/40 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-4">
            <Network className="w-4 h-4 text-[#027DF7]" />
            <span>{t.subsidiaries.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-4">
            {t.subsidiaries.title}
          </h2>
          <p className="text-base text-[#64748B] font-normal leading-relaxed">
            {t.subsidiaries.subtitle}
          </p>
        </div>

        {/* Constellation / Orbital Visual Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Orbital Interactive Canvas (7 cols on desktop) */}
          <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center p-4">
            {/* Ambient concentric orbital rings */}
            <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full border border-[#027DF7]/15 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[400px] sm:w-[480px] h-[400px] sm:h-[480px] rounded-full border border-dashed border-[#01427C]/15" />

            {/* SVG Connecting Animated Dashed Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#027DF7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#01427C" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="25%"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="28%"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="82%"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Center: Main Holding Glass Orb */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full liquid-glass-card border-2 border-white flex flex-col items-center justify-center p-3 shadow-2xl text-center cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#027DF7] to-[#01427C] flex items-center justify-center text-white mb-1 shadow-md shadow-[#027DF7]/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#01427C]">
                {language === 'fa' ? 'هلدینگ سرآمد' : 'Saramad Holding'}
              </span>
              <span className="text-[9px] text-[#64748B]">{t.subsidiaries.coreHub}</span>

              {/* Pulsing ring */}
              <div className="absolute -inset-2 rounded-full border border-[#027DF7]/40 animate-ping opacity-25 pointer-events-none" />
            </motion.div>

            {/* Node 1: Top Left */}
            <div className={`absolute top-[8%] ${isRtl ? 'left-[8%] sm:left-[15%]' : 'right-[8%] sm:right-[15%]'} sm:top-[12%] z-20`}>
              <button
                type="button"
                onClick={() => setActiveNodeId('sub-1')}
                className={`flex flex-col items-center group transition-all ${
                  activeNodeId === 'sub-1' ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                    activeNodeId === 'sub-1'
                      ? 'bg-[#027DF7] text-white shadow-xl shadow-[#027DF7]/40 ring-4 ring-[#D5ECFE]'
                      : 'liquid-glass-card text-[#01427C] hover:border-[#027DF7]'
                  }`}
                >
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-bold">
                    {language === 'fa' ? 'سبدگردان' : 'Asset Mgt'}
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold text-[#01427C] bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm">
                  {subsidiariesData[0]?.name || ''}
                </span>
              </button>
            </div>

            {/* Node 2: Top Right */}
            <div className={`absolute top-[12%] ${isRtl ? 'right-[8%] sm:right-[15%]' : 'left-[8%] sm:left-[15%]'} sm:top-[15%] z-20`}>
              <button
                type="button"
                onClick={() => setActiveNodeId('sub-2')}
                className={`flex flex-col items-center group transition-all ${
                  activeNodeId === 'sub-2' ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                    activeNodeId === 'sub-2'
                      ? 'bg-[#10B981] text-white shadow-xl shadow-[#10B981]/40 ring-4 ring-[#D5ECFE]'
                      : 'liquid-glass-card text-[#01427C] hover:border-[#10B981]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-bold">
                    {language === 'fa' ? 'ایلیا ونچرز' : 'Ventures'}
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold text-[#01427C] bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm">
                  {subsidiariesData[1]?.name || ''}
                </span>
              </button>
            </div>

            {/* Node 3: Bottom Center */}
            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveNodeId('sub-3')}
                className={`flex flex-col items-center group transition-all ${
                  activeNodeId === 'sub-3' ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                    activeNodeId === 'sub-3'
                      ? 'bg-[#01427C] text-white shadow-xl shadow-[#01427C]/40 ring-4 ring-[#D5ECFE]'
                      : 'liquid-glass-card text-[#01427C] hover:border-[#01427C]'
                  }`}
                >
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-bold">
                    {language === 'fa' ? 'املاک' : 'Real Estate'}
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold text-[#01427C] bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm">
                  {subsidiariesData[2]?.name || ''}
                </span>
              </button>
            </div>
          </div>

          {/* Detailed Glass Card Panel (5 cols on desktop) */}
          <div className={`lg:col-span-5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.35 }}
              >
                <GlassCard className="p-8 shadow-xl" liquidBorder={true}>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#D5ECFE] text-[#01427C]">
                      {activeNode.equity}
                    </span>
                    <span className="text-xs text-[#64748B] font-semibold">{activeNode.role}</span>
                  </div>

                  <h3 className="text-2xl font-black text-[#01427C] mb-3">
                    {activeNode.name}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                    {activeNode.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {activeNode.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/80 border border-[#E2E8F0] shadow-sm"
                      >
                        <span className="text-[11px] text-[#64748B] block mb-1">{m.label}</span>
                        <span className="text-base font-extrabold text-[#01427C]">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Operational Tags */}
                  <div className="space-y-2 mb-6 text-xs text-[#0A2540]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#027DF7]" />
                      <span>{t.subsidiaries.codalAudit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#027DF7]" />
                      <span>{t.subsidiaries.samanGovernance}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#027DF7] hover:underline cursor-pointer">
                    <span>{t.subsidiaries.visitPortal}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
