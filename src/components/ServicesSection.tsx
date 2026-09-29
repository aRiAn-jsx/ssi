import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, TrendingUp, Zap, Building2, Compass, Briefcase, BarChart3, CheckCircle } from 'lucide-react';
import { getServicesData } from '../data/mockData';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const servicesData = getServicesData(language);
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Map icon names to Lucide icons
  const renderIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#027DF7]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#027DF7]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#027DF7]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#027DF7]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#027DF7]" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-[#027DF7]" />;
      default:
        return <TrendingUp className="w-6 h-6 text-[#027DF7]" />;
    }
  };

  return (
    <section id="services" className="relative py-16 md:py-24 bg-white overflow-hidden bg-dot-grid">
      {/* Background Image: Very subtle */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')`,
        }}
        aria-hidden="true"
      />

      {/* Floating Soft Ambient Glows */}
      <div className={`absolute top-1/3 ${isRtl ? 'left-10' : 'right-10'} w-96 h-96 rounded-full bg-[#D5ECFE]/40 blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5ECFE]/60 border border-[#027DF7]/20 text-[#01427C] text-xs font-bold mb-4"
          >
            <span>{t.services.eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01427C] leading-tight mb-5"
          >
            {t.services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#64748B] leading-relaxed"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Grid: 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard
                tilt={true}
                glowOnHover={true}
                className="p-8 h-full flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedService(srv.id)}
              >
                <div>
                  {/* Top */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D5ECFE] to-white border border-[#027DF7]/20 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#027DF7]/10 transition-all duration-300">
                      {renderIcon(srv.iconName)}
                    </div>
                    <span className="text-[13px] font-bold px-2.5 py-1 rounded-full bg-white/80 border border-[#E2E8F0] text-[#64748B] group-hover:text-[#01427C] group-hover:border-[#027DF7]/30 transition-colors">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-[#01427C] mb-3 group-hover:text-[#027DF7] transition-colors leading-snug ${isRtl ? 'text-right' : 'text-left'}`}>
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm text-[#64748B] leading-relaxed line-clamp-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {srv.description}
                  </p>
                </div>

                {/* Arrow Link Bottom */}
                <div className="pt-6 mt-6 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#01427C] group-hover:text-[#027DF7] transition-colors">
                    {t.services.viewDetails}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-[#E2E8F0] flex items-center justify-center text-[#01427C] group-hover:bg-[#027DF7] group-hover:text-white group-hover:border-[#027DF7] transition-all duration-300">
                    <ArrowIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Modal for Service Details */}
        {selectedService && (
          <div
            className="fixed inset-0 z-50 bg-[#01427C]/40 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/80 ${isRtl ? 'text-right' : 'text-left'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const srv = servicesData.find((s) => s.id === selectedService);
                if (!srv) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D5ECFE] text-[#01427C]">
                        {srv.tag}
                      </span>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="text-xs font-bold text-[#64748B] hover:text-[#01427C] p-1"
                      >
                        {t.services.closeModal} ✕
                      </button>
                    </div>
                    <h3 className="text-2xl font-bold text-[#01427C] mb-3">{srv.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">{srv.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="text-xs font-bold text-[#01427C] uppercase tracking-wider">{t.services.advantagesTitle}</h4>
                      {srv.features?.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedService(null);
                        const consultEl = document.getElementById('consultation');
                        if (consultEl) {
                          consultEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#01427C] to-[#027DF7] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      {t.services.requestConsultationFor} "{srv.title}"
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
