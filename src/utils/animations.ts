import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Central animation timing tokens
export const TIMING = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  verySlow: 2.0,
};

// Easing presets
export const EASING = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  spring: 'power3.out',
};

// Text reveal animations
export const textReveal = {
  letterByLetter: (element: HTMLElement, delay = 0) => {
    const text = element.textContent || '';
    element.innerHTML = text
      .split('')
      .map((char, i) => `<span style="display:inline-block;opacity:0;transform:translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    
    const chars = element.querySelectorAll('span');
    gsap.fromTo(chars, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: TIMING.fast,
        stagger: 0.05,
        delay,
        ease: EASING.smooth
      }
    );
  },

  holographicSheen: (element: HTMLElement) => {
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform -skew-x-12';
    overlay.style.left = '-100%';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(overlay);

    gsap.to(overlay, {
      left: '100%',
      duration: TIMING.slow,
      repeat: -1,
      repeatDelay: 3,
      ease: EASING.smooth
    });
  }
};

// Icon animations
export const iconAnimations = {
  idle: (element: HTMLElement) => {
    gsap.to(element, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  },

  hover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.06,
      duration: TIMING.fast,
      ease: EASING.spring
    });
  },

  unhover: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: TIMING.fast,
      ease: EASING.spring
    });
  }
};

// Page transitions
export const pageTransitions = {
  fadeOut: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      duration: TIMING.medium,
      ease: EASING.smooth
    });
  },

  fadeIn: (element: HTMLElement) => {
    return gsap.fromTo(element, 
      { opacity: 0, scale: 1.05 },
      { 
        opacity: 1, 
        scale: 1,
        duration: TIMING.medium,
        ease: EASING.smooth
      }
    );
  }
};

// Scroll animations
export const scrollAnimations = {
  fadeInUp: (element: HTMLElement, trigger?: HTMLElement) => {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: TIMING.medium,
        ease: EASING.smooth,
        scrollTrigger: {
          trigger: trigger || element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  },

  staggeredCards: (elements: NodeListOf<Element>) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: TIMING.medium,
        stagger: 0.1,
        ease: EASING.smooth,
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
};

// Utility functions
export const animationUtils = {
  // Check for reduced motion preference
  respectsReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Safe animation wrapper
  safeAnimate: (animationFn: () => void) => {
    if (!animationUtils.respectsReducedMotion()) {
      animationFn();
    }
  }
};

export default {
  TIMING,
  EASING,
  textReveal,
  iconAnimations,
  pageTransitions,
  scrollAnimations,
  animationUtils
};
