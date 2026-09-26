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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 5 degrees tilt
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

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
      className={`relative transition-all duration-300 ${
        dark ? 'liquid-glass-dark text-white' : 'liquid-glass-card text-[#0A2540]'
      } ${liquidBorder ? 'liquid-metal-border' : ''} ${className}`}
    >
      {/* Dynamic ambient hover glow */}
      {glowOnHover && (
        <div
          className={`absolute -inset-0.5 rounded-[26px] bg-gradient-to-r from-[#027DF7]/20 via-[#D5ECFE]/20 to-[#027DF7]/20 blur-xl opacity-0 transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Glass card interior surface */}
      <div className="relative z-10 w-full h-full rounded-[24px]">
        {children}
      </div>
    </motion.div>
  );
};
