import { useEffect } from 'react';
import { CustomCursor } from '../ui';

export default function Layout({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize GSAP animations
    const initAnimations = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Register GSAP plugin
      gsap.registerPlugin(ScrollTrigger);

      // Parallax background accents
      const circles = gsap.utils.toArray('.bg-circle');
      circles.forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? 10 : -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            scrub: 0.5
          }
        });
      });

      // Hero parallax text layers
      gsap.utils.toArray('.hero-text').forEach((el, i) => {
        gsap.to(el, {
          yPercent: (i + 1) * -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      // Scroll-jacked section snapping
      gsap.utils.toArray('.section').forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          snap: {
            snapTo: 'top',
            duration: 0.5,
            delay: 0.1
          }
        });
      });

      // Section divider transitions
      gsap.utils.toArray('.section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' }
        });
      });

      // Reveal animations
      const elements = gsap.utils.toArray('.reveal');
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%'
            }
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    };

    // Initialize animations
    initAnimations();
  }, []);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {children}
    </div>
  );
}
