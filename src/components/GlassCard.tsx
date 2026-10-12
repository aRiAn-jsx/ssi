import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  liquidBorder?: boolean;
  glowOnHover?: boolean;
  dark?: boolean;
  id?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  tilt = false,
  liquidBorder = false,
  glowOnHover = true,
  dark = false,
  id,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Track relative mouse position for dynamic specular light
    setMousePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    if (!tilt) return;
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 4.5 degrees subtle luxury tilt
    const rotX = ((y - centerY) / centerY) * -4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        scale: isHovered && tilt ? 1.015 : 1,
        y: isHovered && glowOnHover ? -4 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative transition-all duration-300 rounded-[24px] overflow-hidden ${
        dark ? 'liquid-glass-dark text-white' : 'liquid-glass-card text-[#0A2540]'
      } ${liquidBorder ? 'liquid-metal-border' : ''} dark:border dark:border-[#027DF7]/25 dark:hover:border-[#38BDF8]/60 dark:hover:shadow-[0_16px_44px_-8px_rgba(0,0,0,0.85),0_0_30px_rgba(2,125,247,0.22)] ${className}`}
    >
      {/* Dynamic ambient hover glow — Sapphire & Cyan jewel-tone in dark mode, zero milky white */}
      {glowOnHover && (
        <div
          className={`absolute -inset-0.5 rounded-[26px] bg-gradient-to-r from-[#027DF7]/20 via-[#0284C7]/20 to-[#01427C]/25 dark:from-[#027DF7]/35 dark:via-[#38BDF8]/25 dark:to-[#01427C]/40 blur-xl pointer-events-none transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-95'
          }`}
        />
      )}

      {/* Dynamic Interactive Liquid Glass Specular Spotlight (Tracks mouse on hover) */}
      <div
        className={`absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-300 z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(56, 189, 248, 0.12), transparent 65%)`,
        }}
      />

      {/* Glass Top Specular Edge Highlight (Authentic polished glass edge) */}
      <div
        className={`absolute inset-x-0 top-0 h-[1.5px] rounded-t-[24px] bg-gradient-to-r from-transparent via-white/50 dark:via-[#38BDF8]/70 to-transparent pointer-events-none transition-opacity duration-300 z-20 ${
          isHovered ? 'opacity-100' : 'opacity-25'
        }`}
      />

      {/* Glass card interior surface */}
      <div className="relative z-10 w-full h-full rounded-[24px]">
        {children}
      </div>
    </motion.div>
  );
};
