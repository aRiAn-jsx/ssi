import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';

interface AnimatedNumberProps {
  value: number;
  from?: number;
  decimals?: number;
  /** seconds */
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** 'fa' renders Persian digits */
  locale?: 'fa' | 'en';
  /** group thousands (1,234 / ۱٬۲۳۴) */
  grouping?: boolean;
  className?: string;
}

/**
 * Count-up number that writes straight to the DOM node instead of setting
 * React state every frame. Starts once when scrolled into view.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  from = 0,
  decimals = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  locale = 'fa',
  grouping = false,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const reduceMotion = useReducedMotion();

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const num = grouping
      ? Number(fixed).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : locale === 'fa'
      ? fixed.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]).replace('.', '٫')
      : fixed;
    // Persian: "+" sits on the right of the number ("۲۸۰ +"); the span is LTR-isolated
    if (locale === 'fa' && prefix === '+') return `${num} +${suffix}`;
    return `${prefix}${num}${suffix}`;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView) return;
    if (reduceMotion) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value, from, duration, decimals, prefix, suffix, locale, grouping, reduceMotion]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      dir="ltr"
      className={`inline-block tabular-nums ${className}`}
    >
      {format(from)}
    </motion.span>
  );
};
