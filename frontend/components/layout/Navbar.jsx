import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize smooth scroll and progress tracking
    const initScrollProgress = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', () => {
        // Update progress line based on scroll
        const scrollProgress = lenis.progress;
        const progressLine = document.getElementById('progress-line');
        if (progressLine) {
          progressLine.style.width = `${scrollProgress * 100}%`;
        }
      });

      return () => {
        try { lenis.destroy(); } catch {}
      };
    };

    initScrollProgress();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <div className="w-1/3"></div>
      <div className="text-center">
        <div className="text-white font-medium text-lg tracking-wider">
          CLARITYAI
        </div>
      </div>
      <div className="w-1/3 flex justify-end">
        <div className="text-right">
          <a href="#vision" className="text-white/60 hover:text-white transition-colors text-xs tracking-wider block">
            VISION
          </a>
          <div className="w-16 h-px bg-white/20 mt-1 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: '0%' }}
              id="progress-line"
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

