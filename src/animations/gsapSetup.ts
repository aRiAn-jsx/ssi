/**
 * GSAP 3 + ScrollTrigger Registration & Reference File
 * Ilya Saramad Capital Holding (ssiholding.co)
 * 
 * Deliverable #6: GSAP setup file with all scroll animations registered
 */

export const GSAP_SETUP_CODE = `
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// 1. Register Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 2. Initialize Smooth Scrolling (Optional Lenis or ScrollSmoother)
export const initSmoothScroll = () => {
  return ScrollSmoother.create({
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.1,
  });
};

// 3. Register Hero Split-Text Reveal
export const registerHeroAnimations = (headingSelector = '#hero-h1', ctaSelector = '#hero-ctas') => {
  const tl = gsap.timeline();
  tl.from(headingSelector + ' span', {
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.05,
    ease: 'power3.out',
  }).from(ctaSelector, {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
  }, '-=0.4');
  return tl;
};

// 4. Register Staggered Cards Reveal on Scroll
export const registerStaggerCards = (cardsSelector = '.liquid-glass-card') => {
  return gsap.from(cardsSelector, {
    scrollTrigger: {
      trigger: cardsSelector,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 40,
    opacity: 0,
    scale: 0.96,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
  });
};

// 5. Register Horizontal Pinning Scroll for Portfolio
export const registerPortfolioPinning = (containerSelector = '#portfolio-track', sectionSelector = '#portfolio') => {
  return gsap.to(containerSelector, {
    xPercent: -100 * 3 / 4,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionSelector,
      pin: true,
      scrub: 1,
      snap: 1 / 3,
      end: () => '+=' + document.querySelector(containerSelector)?.scrollWidth,
    },
  });
};

// 6. Register Count-Up Numbers
export const registerCountUp = (targetSelector = '.count-number', endVal = 100) => {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: endVal,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: targetSelector,
      start: 'top 80%',
    },
    onUpdate: () => {
      const el = document.querySelector(targetSelector);
      if (el) el.innerText = Math.floor(obj.val).toLocaleString('fa-IR');
    },
  });
};
`;
