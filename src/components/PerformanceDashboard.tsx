import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, PieChart, TrendingUp } from 'lucide-react';
import { getChartTimeframes } from '../data/mockData';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const PerformanceDashboard: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'annual'>('annual');
  const [activeDonutIndex, setActiveDonutIndex] = useState<number | null>(null);

  const chartData = getChartTimeframes(language);
  const data = chartData[timeframe];

  // Asset allocation donut segments
  const allocation = [
    { label: t.dashboard.allocationEquities, percentage: 42, color: '#027DF7' },
    { label: t.dashboard.allocationRealEstate, percentage: 30, color: '#01427C' },
    { label: t.dashboard.allocationFixedIncome, percentage: 18, color: '#D5ECFE' },
    { label: t.dashboard.allocationVenture, percentage: 10, color: '#10B981' },
  ];

  // Calculate SVG line points
  const maxVal = 100;
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.portfolioValue / maxVal) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathString = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaString = `${pathString} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <section id="dashboard" className="relative py-28 md:py-36 bg-[#F7FAFC] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')`,
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Blue Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#027DF7]/15 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-3">
              <Activity className="w-4 h-4 text-[#027DF7]" />
              <span>{t.dashboard.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-3">
              {t.dashboard.title}
            </h2>
            <p className="text-base text-[#64748B] font-normal max-w-xl">
              {t.dashboard.subtitle}
            </p>
          </div>

          {/* Timeframe Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-full liquid-glass-card self-start md:self-end border border-white/80">
            {[
              { id: 'monthly', label: t.dashboard.monthly },
              { id: 'quarterly', label: t.dashboard.quarterly },
              { id: 'annual', label: t.dashboard.annual },
            ].map((timeTab) => (
              <button
                key={timeTab.id}
                type="button"
                onClick={() => setTimeframe(timeTab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  timeframe === timeTab.id
                    ? 'bg-[#01427C] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#01427C]'
                }`}
              >
                {timeTab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Chart Card (8 columns) */}
          <div className="lg:col-span-8">
            <GlassCard className="p-6 md:p-8 h-full" liquidBorder={true}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]/80">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="text-xs text-[#64748B] font-bold block mb-1">
                    {t.dashboard.totalAssetsValue}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#01427C]">85.4</span>
                    <span className="text-xs font-bold text-[#10B981] flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.dashboard.yoyGrowth}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#027DF7]" />
                    <span>{t.dashboard.saramadPortfolio}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#E2E8F0]" />
                    <span>{t.dashboard.tseBenchmark}</span>
                  </div>
                </div>
              </div>

              {/* Animated SVG Line Chart */}
              <div className="w-full mt-6">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#027DF7" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#D5ECFE" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[25, 50, 75, 100].map((val, i) => {
                    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
                    return (
                      <g key={i}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={width - paddingX}
                          y2={y}
                          stroke="#E2E8F0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x={width - paddingX + 8}
                          y={y + 4}
                          fill="#64748B"
                          fontSize="12"
                          textAnchor="start"
                          className="font-sans"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Area fill */}
                  <motion.path
                    d={areaString}
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />

                  {/* Animated stroke line */}
                  <motion.path
                    d={pathString}
                    fill="none"
                    stroke="#027DF7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />

                  {/* Interactive Points */}
                  {points.map((p, i) => (
                    <g key={i} className="cursor-pointer group">
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="#FFFFFF"
                        stroke="#027DF7"
                        strokeWidth="3"
                        className="transition-all duration-200 group-hover:r-7"
                      />
                      {/* Tooltip on hover */}
                      <text
                        x={p.x}
                        y={p.y - 12}
                        textAnchor="middle"
                        fill="#01427C"
                        fontSize="12"
                        fontWeight="bold"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        {p.portfolioValue} {language === 'fa' ? 'ه.م.ر' : 'T Rls'}
                      </text>
                      {/* X Axis Labels */}
                      <text
                        x={p.x}
                        y={height - 8}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="12"
                        fontWeight="500"
                      >
                        {p.period}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Bottom Chart Bar Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E2E8F0]/80">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="text-[13px] text-[#64748B] block">{t.dashboard.betaLabel}</span>
                  <span className="text-base font-extrabold text-[#01427C]">0.72</span>
                  <span className="text-[12px] text-[#10B981] block">{t.dashboard.betaSub}</span>
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="text-[13px] text-[#64748B] block">{t.dashboard.sharpeLabel}</span>
                  <span className="text-base font-extrabold text-[#027DF7]">1.85</span>
                  <span className="text-[12px] text-[#027DF7] block">{t.dashboard.sharpeSub}</span>
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="text-[13px] text-[#64748B] block">{t.dashboard.maxDdLabel}</span>
                  <span className="text-base font-extrabold text-[#01427C]">-8.3%</span>
                  <span className="text-[12px] text-[#64748B] block">{t.dashboard.maxDdSub}</span>
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <span className="text-[13px] text-[#64748B] block">{t.dashboard.cumDivLabel}</span>
                  <span className="text-base font-extrabold text-[#10B981]">{language === 'fa' ? '۲۴.۵ ه.م.ر' : '24.5 T Rls'}</span>
                  <span className="text-[12px] text-[#10B981] block">{t.dashboard.cumDivSub}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Allocation Donut Chart Card (4 columns) */}
          <div className="lg:col-span-4">
            <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-between" glowOnHover={true}>
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]/80 mb-6">
                  <span className="text-xs font-bold text-[#64748B]">{t.dashboard.allocationTitle}</span>
                  <PieChart className="w-4 h-4 text-[#027DF7]" />
                </div>

                <h3 className={`text-xl font-bold text-[#01427C] mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t.dashboard.strategicComposition}
                </h3>

                {/* Donut SVG */}
                <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="14"
                    />
                    {(() => {
                      let accumulatedOffset = 0;
                      const circumference = 2 * Math.PI * 38;

                      return allocation.map((seg, idx) => {
                        const dashLength = (seg.percentage / 100) * circumference;
                        const dashOffset = -accumulatedOffset;
                        accumulatedOffset += dashLength;

                        return (
                          <motion.circle
                            key={idx}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke={seg.color}
                            strokeWidth="14"
                            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                            strokeDashoffset={dashOffset}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: dashOffset }}
                            transition={{ duration: 1.2, delay: idx * 0.2 }}
                            className="cursor-pointer transition-all hover:stroke-width-[16]"
                            onMouseEnter={() => setActiveDonutIndex(idx)}
                            onMouseLeave={() => setActiveDonutIndex(null)}
                          />
                        );
                      });
                    })()}
                  </svg>

                  {/* Center Stat */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xs text-[#64748B]">{t.dashboard.totalAssetsLabel}</span>
                    <span className="text-xl font-extrabold text-[#01427C]">100%</span>
                    <span className="text-[12px] text-[#027DF7] font-bold">{t.dashboard.balancedLabel}</span>
                  </div>
                </div>
              </div>

              {/* Donut Legend */}
              <div className="space-y-3 pt-6 border-t border-[#E2E8F0]/80">
                {allocation.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                      activeDonutIndex === idx ? 'bg-[#D5ECFE]/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-md shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-bold text-[#01427C]">{item.label}</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#01427C]">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
