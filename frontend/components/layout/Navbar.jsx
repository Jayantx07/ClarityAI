import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import StaggeredMenu from '../StaggeredMenu';

export default function Navbar() {
  const router = useRouter();
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

  // Use white logo on the home page, black elsewhere
  const isHome = router?.pathname === '/';
  const logoSrc = isHome ? '/image/Logo%20White.png' : '/image/Logo%20Black.png';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Left: Menu Button (inline, flush to left edge) */}
      <div className="w-1/3 relative">
        <div className="fixed left-0 top-0 z-[70]">
          <StaggeredMenu
            position="left"
            className=""
            items={[
              { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
              { label: 'Profile', ariaLabel: 'View your profile', link: '/profile' },
              { label: 'Aira AI', ariaLabel: 'Open Aira AI', link: '/chat' },
              { label: 'Relief Canvas', ariaLabel: 'Open painting relief canvas', link: '/relief' },
              { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
            ]}
            socialItems={[]}
            displaySocials={false}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            logoUrl={logoSrc}
            accentColor="#5227FF"
            onMenuOpen={() => {}}
            onMenuClose={() => {}}
          />
        </div>
      </div>
      <div className="text-center">
        <Link href="/" aria-label="ClarityAI Home" className="inline-block">
          {/* White on home, black elsewhere; larger size */}
          <div className="relative w-36 h-10 mx-auto">
            <Image src={logoSrc} alt="ClarityAI" fill style={{ objectFit: 'contain' }} />
          </div>
        </Link>
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

