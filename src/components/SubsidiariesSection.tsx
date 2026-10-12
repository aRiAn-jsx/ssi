import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network,
  ExternalLink,
  CheckCircle2,
  Leaf,
  GraduationCap,
  Scale,
  Palette,
  Apple,
  Globe,
  Building2,
  X,
  Layers,
  Sparkles,
  ArrowUpLeft,
  ArrowUpRight,
} from 'lucide-react';
import { getSubsidiariesData } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import type { SubsidiaryNode } from '../types';

// Coordinates and styling configuration for the 5 orbital nodes
const ORBITAL_NODES_CONFIG: Record<string, { x: string; y: string; posStyle: React.CSSProperties }> = {
  'bhasa': {
    x: '15%',
    y: '14%',
    posStyle: { top: '8%', left: '10%' },
  },
  'virgool': {
    x: '85%',
    y: '14%',
    posStyle: { top: '8%', right: '10%' },
  },
  'adl-aram': {
    x: '14%',
    y: '71%',
    posStyle: { top: '65%', left: '8%' },
  },
  'hodhod': {
    x: '86%',
    y: '71%',
    posStyle: { top: '65%', right: '8%' },
  },
  'dehkadeh-tandorosti': {
    x: '50%',
    y: '90%',
    posStyle: { bottom: '3%', left: '50%', transform: 'translateX(-50%)' },
  },
};

export const SubsidiariesSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const subsidiaries = getSubsidiariesData(language);
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<SubsidiaryNode | null>(null);
  const [activeOrbitalId, setActiveOrbitalId] = useState<string>('bhasa');
  const [hoveredOrbitalId, setHoveredOrbitalId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'orbital' | 'grid'>('orbital');

  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Icon fallback mapping
  const getSubsidiaryIcon = (id: string) => {
    switch (id) {
      case 'bhasa':
        return Leaf;
      case 'virgool':
        return GraduationCap;
      case 'adl-aram':
        return Scale;
      case 'hodhod':
        return Palette;
      case 'dehkadeh-tandorosti':
        return Apple;
      default:
        return Building2;
    }
  };

  // Generate customized conic rotating border colors per company (Solid accents, no tacky gradients)
  const getConicGradient = (sub: SubsidiaryNode) => {
    switch (sub.id) {
      case 'bhasa':
        // Bhasa: Pure Green rotating beam
        return 'conic-gradient(from 0deg, transparent 0deg, transparent 260deg, #15803D 290deg, #16A34A 330deg, #22C55E 360deg)';
      case 'virgool':
        // Virgool: Light Blue & Dark Blue rotating beam
        return 'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #0F2744 280deg, #0284C7 325deg, #38BDF8 360deg)';
      case 'adl-aram':
        // Adl Aram Dana: Dark Blue rich navy rotating beam
        return 'conic-gradient(from 0deg, transparent 0deg, transparent 260deg, #0A192F 290deg, #0F2744 330deg, #1E3A8A 360deg)';
      case 'hodhod':
        // Hodhod: Black & Orange rotating beam
        return 'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #18181B 280deg, #C2410C 315deg, #EA580C 345deg, #FB923C 360deg)';
      case 'dehkadeh-tandorosti':
        // Dehkadeh Tandorosti: Fresh healthy teal/emerald rotating beam
        return 'conic-gradient(from 0deg, transparent 0deg, transparent 260deg, #047857 290deg, #0D9488 330deg, #10B981 360deg)';
      default:
        return `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${sub.color} 340deg, #ffffff 360deg)`;
    }
  };

  const filteredSubsidiaries =
    activeTab === 'all'
      ? subsidiaries
      : subsidiaries.filter((item) => item.id === activeTab);

  const activeOrbitalNode =
    subsidiaries.find((s) => s.id === activeOrbitalId) || subsidiaries[0];

  return (
    <section
      id="subsidiaries"
      className="relative py-20 md:py-24 bg-[#F8FAFC] dark:bg-[#060D17] overflow-hidden border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1321] border border-[#01427C]/20 dark:border-blue-900/60 shadow-xs text-[#01427C] dark:text-[#38BDF8] text-xs font-bold mb-3.5"
          >
            <Network className="w-4 h-4 text-[#027DF7] dark:text-[#38BDF8]" />
            <span>{t.subsidiaries.eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#01427C] dark:text-white leading-tight mb-3 tracking-tight"
          >
            {t.subsidiaries.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            {t.subsidiaries.subtitle}
          </motion.p>

          {/* Interactive Controls Bar: Switch between Branched Hub vs Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            {/* Quick Category Filter Pills */}
            <div className="flex items-center flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#01427C] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0B1321] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'fa' ? 'تمام ۵ شرکت' : 'All 5 Companies'}
              </button>

              {subsidiaries.map((sub) => {
                const isSelected = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(sub.id);
                      setActiveOrbitalId(sub.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-[#0B1321] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor: isSelected ? sub.color : undefined,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isSelected ? '#ffffff' : sub.color }}
                    />
                    <span>{sub.shortName || sub.name}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Branched SSI Network (Default) vs Cards Grid */}
            <div className="flex items-center p-1 rounded-full bg-white dark:bg-[#0B1321] border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('orbital')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'orbital'
                    ? 'bg-[#01427C] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>{language === 'fa' ? 'شبکه شاخه‌ای SSI' : 'Branched SSI Hub'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#01427C] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'fa' ? 'نمای کارت‌ها' : 'Cards Grid'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: BRANCHED SSI HUB & CONSTELLATION NETWORK (DEFAULT)     */}
        {/* ============================================================== */}
        {viewMode === 'orbital' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Orbital Branched Interactive Canvas (7 cols on desktop) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center p-2 sm:p-4 select-none">
              {/* Concentric orbital circles */}
              <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-slate-300/70 dark:border-blue-900/40 pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] max-w-[calc(100vw-2rem)] max-h-[calc(100vw-2rem)] rounded-full border border-dashed border-slate-300/60 dark:border-slate-800 pointer-events-none" />

              {/* Connecting Laser Branches with Hover-Responsive Moving Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {subsidiaries.map((sub) => {
                  const config = ORBITAL_NODES_CONFIG[sub.id] || { x: '50%', y: '50%' };
                  const isHovered = hoveredOrbitalId === sub.id;
                  const isSelected = activeOrbitalId === sub.id;
                  const isHighlighted = isHovered || (!hoveredOrbitalId && isSelected);

                  return (
                    <g key={`branch-${sub.id}`}>
                      {/* Glow Ambient Aura beneath line when highlighted */}
                      {isHighlighted && (
                        <motion.line
                          x1="50%"
                          y1="50%"
                          x2={config.x}
                          y2={config.y}
                          stroke={sub.color}
                          strokeWidth="7"
                          strokeOpacity={isHovered ? 0.35 : 0.15}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pointer-events-none"
                        />
                      )}

                      {/* Animated Moving Dashed Line (Thicker, Vibrant, Flowing when hovered) */}
                      <motion.line
                        x1="50%"
                        y1="50%"
                        x2={config.x}
                        y2={config.y}
                        stroke={sub.color}
                        strokeWidth={isHighlighted ? 3 : 1.5}
                        strokeDasharray={isHighlighted ? '7 5' : '4 4'}
                        animate={{
                          strokeDashoffset: isHighlighted ? [0, -36] : 0,
                          strokeOpacity: isHovered
                            ? 1
                            : isSelected
                            ? 0.8
                            : hoveredOrbitalId
                            ? 0.2
                            : 0.45,
                        }}
                        transition={{
                          strokeDashoffset: isHighlighted
                            ? { repeat: Infinity, duration: 0.85, ease: 'linear' }
                            : { duration: 0.3 },
                          strokeOpacity: { duration: 0.25 },
                        }}
                        style={{
                          filter: isHighlighted
                            ? `drop-shadow(0 0 6px ${sub.color})`
                            : undefined,
                        }}
                      />

                      {/* Traveling Energy Light Pulse along branch line on hover */}
                      {isHovered && (
                        <motion.circle
                          r="4.5"
                          fill={sub.color}
                          filter={`drop-shadow(0 0 6px ${sub.color})`}
                          animate={{
                            cx: ['50%', config.x],
                            cy: ['50%', config.y],
                            opacity: [0, 1, 1, 0],
                            scale: [0.7, 1.4, 0.9],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.1,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* CENTER: Main SSI Holding Orb (Solid, Crisp, No Gradient) */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-white dark:bg-[#071325] border-2 border-[#01427C] dark:border-[#38BDF8] flex flex-col items-center justify-center p-3 shadow-xl text-center select-none"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#01427C] flex items-center justify-center text-white mb-1 shadow-xs">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#01427C] dark:text-white leading-tight">
                  {language === 'fa' ? 'هلدینگ SSI' : 'SSI Holding'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'fa' ? 'مرکز راهبری' : 'Central Hub'}
                </span>
                <div className="absolute -inset-2 rounded-full border border-[#01427C]/30 animate-ping opacity-20 pointer-events-none" />
              </motion.div>

              {/* 5 Orbiting Branched Nodes with Real Uploaded Logos */}
              {subsidiaries.map((sub) => {
                const Icon = getSubsidiaryIcon(sub.id);
                const isActive = activeOrbitalId === sub.id;
                const isHovered = hoveredOrbitalId === sub.id;
                const config = ORBITAL_NODES_CONFIG[sub.id] || { posStyle: { top: '10%', left: '10%' } };

                return (
                  <div key={sub.id} className="absolute z-20" style={config.posStyle}>
                    <button
                      type="button"
                      onMouseEnter={() => {
                        setHoveredOrbitalId(sub.id);
                        setActiveOrbitalId(sub.id);
                      }}
                      onMouseLeave={() => setHoveredOrbitalId(null)}
                      onFocus={() => {
                        setHoveredOrbitalId(sub.id);
                        setActiveOrbitalId(sub.id);
                      }}
                      onBlur={() => setHoveredOrbitalId(null)}
                      onClick={() => {
                        setActiveOrbitalId(sub.id);
                        setSelectedSubsidiary(sub);
                      }}
                      className={`flex flex-col items-center group transition-all duration-300 cursor-pointer ${
                        isHovered || isActive
                          ? 'scale-110 sm:scale-120'
                          : 'hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Logo Node Box */}
                      <div
                        className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 bg-white dark:bg-[#070D17] ${
                          isHovered || isActive
                            ? 'shadow-xl ring-3 ring-offset-2 scale-105'
                            : 'border border-slate-200 dark:border-slate-800 shadow-md'
                        }`}
                        style={{
                          borderColor: isHovered || isActive ? sub.color : undefined,
                          boxShadow:
                            isHovered || isActive
                              ? `0 10px 25px -5px ${sub.color}45`
                              : undefined,
                        }}
                      >
                        {sub.logoImage ? (
                          <img
                            src={sub.logoImage}
                            alt={sub.name}
                            className="w-full h-full object-contain filter dark:brightness-105"
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: sub.color }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Name Tag Pill */}
                      <span
                        className="mt-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap border transition-all duration-300"
                        style={{
                          backgroundColor: isHovered || isActive ? sub.color : undefined,
                          color: isHovered || isActive ? '#ffffff' : undefined,
                          borderColor: isHovered || isActive ? sub.color : '#e2e8f0',
                          transform: isHovered ? 'scale(1.05)' : undefined,
                        }}
                      >
                        {sub.shortName || sub.name}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Active Company Inspector: Compact Card with Continuous Rotating Border */}
            <div className={`lg:col-span-5 ${isRtl ? 'text-right' : 'text-left'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOrbitalNode.id}
                  initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer Rotating Border Frame */}
                  <div
                    onClick={() => setSelectedSubsidiary(activeOrbitalNode)}
                    className="relative rounded-2xl p-[1.5px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Rotating Border Beam */}
                    <div
                      className="absolute -inset-[160%] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: getConicGradient(activeOrbitalNode) }}
                    />

                    {/* Base border background track */}
                    <div className="absolute inset-0 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 pointer-events-none" />

                    {/* Ambient Hover Glow Shadow */}
                    <div
                      className="absolute -inset-1 rounded-2xl opacity-20 blur-xl pointer-events-none"
                      style={{ backgroundColor: activeOrbitalNode.color }}
                    />

                    {/* Solid Inner Card Body (No gradient) */}
                    <div className="relative z-10 w-full h-full bg-white dark:bg-[#0B1321] rounded-[calc(1rem-1.5px)] p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* Header: Real Logo & Category */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white dark:bg-[#070D17] border border-slate-200 dark:border-slate-800 p-2.5 flex items-center justify-center shrink-0 shadow-xs">
                            {activeOrbitalNode.logoImage ? (
                              <img
                                src={activeOrbitalNode.logoImage}
                                alt={activeOrbitalNode.name}
                                className="w-full h-full object-contain filter dark:brightness-105"
                              />
                            ) : (
                              <div
                                className="w-full h-full rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: activeOrbitalNode.color }}
                              >
                                {React.createElement(getSubsidiaryIcon(activeOrbitalNode.id), {
                                  className: 'w-8 h-8 text-white',
                                })}
                              </div>
                            )}
                          </div>

                          <div className={`flex flex-col gap-1 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
                            <span
                              className="inline-block px-3 py-0.5 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: activeOrbitalNode.color + '15',
                                color: activeOrbitalNode.color,
                                border: `1px solid ${activeOrbitalNode.color}35`,
                              }}
                            >
                              {activeOrbitalNode.category || activeOrbitalNode.role}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              {activeOrbitalNode.equity}
                            </span>
                          </div>
                        </div>

                        {/* Company Name */}
                        <h3 className="text-xl sm:text-2xl font-black text-[#01427C] dark:text-white leading-tight mb-1.5">
                          {activeOrbitalNode.name}
                        </h3>

                        {/* Role */}
                        <p
                          className="text-xs sm:text-sm font-semibold mb-3"
                          style={{ color: activeOrbitalNode.color }}
                        >
                          {activeOrbitalNode.role}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {activeOrbitalNode.description}
                        </p>

                        {/* 3 Key Metrics */}
                        {activeOrbitalNode.metrics && (
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {activeOrbitalNode.metrics.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center"
                              >
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate mb-0.5">
                                  {m.label}
                                </span>
                                <span className="block text-xs sm:text-sm font-black text-[#01427C] dark:text-white">
                                  {m.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Highlights */}
                        {activeOrbitalNode.highlights && (
                          <div className="space-y-1.5 mb-5">
                            {activeOrbitalNode.highlights.slice(0, 2).map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                              >
                                <CheckCircle2
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: activeOrbitalNode.color }}
                                />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Row: Solid Website Button + Details */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                        {activeOrbitalNode.website && (
                          <a
                            href={activeOrbitalNode.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-xs hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: activeOrbitalNode.color }}
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{language === 'fa' ? 'ورود به وب‌سایت' : 'Visit Website'}</span>
                            <ExternalLink className="w-3 h-3 opacity-80" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubsidiary(activeOrbitalNode);
                          }}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1 active:scale-95 shrink-0"
                        >
                          <span>{language === 'fa' ? 'پرونده کامل' : 'Full Dossier'}</span>
                          <ArrowIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* VIEW 2: COMPACT & SLEEK 5-CARD GRID WITH ROTATING BORDER       */
          /* ============================================================== */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
          >
            {filteredSubsidiaries.map((sub, index) => {
              const Icon = getSubsidiaryIcon(sub.id);
              const conicBorder = getConicGradient(sub);

              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="h-full flex"
                >
                  <div
                    onClick={() => setSelectedSubsidiary(sub)}
                    className="relative w-full h-full rounded-2xl p-[1.5px] overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    {/* Rotating Border Beam */}
                    <div
                      className="absolute -inset-[160%] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: conicBorder }}
                    />

                    {/* Stationary subtle border background track */}
                    <div className="absolute inset-0 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 pointer-events-none" />

                    {/* Ambient Colored Hover Shadow Aura under Card */}
                    <div
                      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: sub.color }}
                    />

                    {/* Solid Inner Card Body (No gradient) */}
                    <div className="relative z-10 w-full h-full bg-white dark:bg-[#0B1321] rounded-[calc(1rem-1.5px)] p-5 sm:p-5.5 flex flex-col justify-between">
                      <div>
                        {/* Top Header Row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-[#070D17] border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
                            {sub.logoImage ? (
                              <img
                                src={sub.logoImage}
                                alt={sub.name}
                                className="w-full h-full object-contain filter dark:brightness-105"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-full h-full rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: sub.color }}
                              >
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                            )}
                          </div>

                          <div className={`flex flex-col gap-1 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
                            <span
                              className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                              style={{
                                backgroundColor: sub.color + '15',
                                color: sub.color,
                                border: `1px solid ${sub.color}35`,
                              }}
                            >
                              {sub.category || sub.role}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              {sub.equity}
                            </span>
                          </div>
                        </div>

                        {/* Company Name */}
                        <h3
                          className={`text-base sm:text-lg font-black text-[#01427C] dark:text-white leading-snug mb-1.5 group-hover:text-slate-900 dark:group-hover:text-blue-200 transition-colors ${
                            isRtl ? 'text-right' : 'text-left'
                          }`}
                        >
                          {sub.name}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2 ${
                            isRtl ? 'text-right' : 'text-left'
                          }`}
                        >
                          {sub.description}
                        </p>

                        {/* Key Specialty Tags */}
                        {sub.highlights && sub.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {sub.highlights.slice(0, 2).map((h, hIdx) => (
                              <span
                                key={hIdx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                              >
                                <CheckCircle2
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: sub.color }}
                                />
                                <span className="truncate max-w-[180px]">{h}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Row */}
                      <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2.5">
                        {sub.website && (
                          <a
                            href={sub.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-xs hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: sub.color }}
                            title={sub.websiteLabel || sub.website}
                          >
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span>{language === 'fa' ? 'ورود به سایت' : 'Website'}</span>
                            <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubsidiary(sub);
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-95 shrink-0"
                        >
                          <span>{language === 'fa' ? 'جزئیات' : 'Details'}</span>
                          <ArrowIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* FULL SUBSIDIARY PROFILE MODAL (Crisp, Solid, No Gradient) */}
      <AnimatePresence>
        {selectedSubsidiary && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={selectedSubsidiary.name}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubsidiary(null)}
              className="fixed inset-0 bg-[#030A14]/75 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0B1321] border border-slate-200 dark:border-slate-800 shadow-2xl z-10 p-6 sm:p-8 ${
                isRtl ? 'text-right' : 'text-left'
              }`}
              dir={isRtl ? 'rtl' : 'ltr'}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSubsidiary(null)}
                aria-label={language === 'fa' ? 'بستن' : 'Close'}
                className="absolute top-5 left-5 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white dark:bg-[#070D17] border border-slate-200 dark:border-slate-800 p-2.5 flex items-center justify-center shrink-0 shadow-sm">
                  {selectedSubsidiary.logoImage ? (
                    <img
                      src={selectedSubsidiary.logoImage}
                      alt={selectedSubsidiary.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: selectedSubsidiary.color }}
                    >
                      {React.createElement(getSubsidiaryIcon(selectedSubsidiary.id), {
                        className: 'w-8 h-8 text-white',
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: selectedSubsidiary.color + '15',
                        color: selectedSubsidiary.color,
                        border: `1px solid ${selectedSubsidiary.color}35`,
                      }}
                    >
                      {selectedSubsidiary.category || selectedSubsidiary.role}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {selectedSubsidiary.equity}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#01427C] dark:text-white leading-tight mb-1">
                    {selectedSubsidiary.name}
                  </h3>

                  <p
                    className="text-xs font-semibold"
                    style={{ color: selectedSubsidiary.color }}
                  >
                    {selectedSubsidiary.role}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {language === 'fa' ? 'درباره و ماموریت' : 'About & Mission'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedSubsidiary.description}
                  </p>
                </div>

                {/* Key Metrics */}
                {selectedSubsidiary.metrics && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                      {language === 'fa' ? 'شاخص‌های کلیدی عملکرد' : 'Key Metrics'}
                    </h4>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {selectedSubsidiary.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center"
                        >
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1 truncate">
                            {m.label}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#01427C] dark:text-white">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {selectedSubsidiary.highlights && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                      {language === 'fa' ? 'حوزه‌های تخصصی' : 'Specializations'}
                    </h4>
                    <div className="space-y-1.5">
                      {selectedSubsidiary.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: selectedSubsidiary.color }}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Official Website Launch CTA (Solid brand color, no gradient) */}
                {selectedSubsidiary.website && (
                  <div className="pt-2">
                    <a
                      href={selectedSubsidiary.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all cursor-pointer active:scale-95"
                      style={{ backgroundColor: selectedSubsidiary.color }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>
                        {language === 'fa'
                          ? `ورود به وب‌سایت رسمی (${selectedSubsidiary.websiteLabel || selectedSubsidiary.website})`
                          : `Launch Website (${selectedSubsidiary.websiteLabel || selectedSubsidiary.website})`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
