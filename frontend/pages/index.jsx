import Link from 'next/link';
import BreathingExercise from '../components/BreathingExercise';
import SoundTherapy from '../components/SoundTherapy';
import { useEffect, useState } from 'react';

export default function Home() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [soundFrequency, setSoundFrequency] = useState('alpha');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamic imports for client-side only
    const initAnimations = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const Lenis = (await import('@studio-freight/lenis')).default;

      // Register GSAP plugin
      gsap.registerPlugin(ScrollTrigger);

      // Smooth scroll with Lenis
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
        ScrollTrigger.update();
        
        // Update progress line based on scroll
        const scrollProgress = lenis.progress;
        const progressLine = document.getElementById('progress-line');
        if (progressLine) {
          progressLine.style.width = `${scrollProgress * 100}%`;
        }
      });

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
        try { lenis.destroy(); } catch {}
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    };

    // Initialize animations
    initAnimations();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation - Centered Logo with Right VISION */}
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

      <main className="relative min-h-screen overflow-hidden">
        {/* HERO SECTION - Full Width Video Background */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Full Width Video Background */}
          <div className="absolute inset-0 -z-10 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Intro.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="w-full text-center relative z-10 px-8">
            {/* Main Content */}
            <div className="space-y-12 max-w-4xl mx-auto">
              <h1 className="text-6xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight">
                <div className="block">Empower</div>
                <div className="block">your mental</div>
                <div className="block">health journey</div>
              </h1>
              
              <div className="pt-8">
                <Link 
                  href="/chat" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-t from-[#1e3a5f] to-[#3b82f6] text-white font-medium tracking-wider hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 rounded-lg border border-white/10"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  START YOUR JOURNEY
                </Link>
              </div>
            </div>
          </div>

          {/* Description Text - Bottom Right */}
          <div className="absolute bottom-8 right-8 max-w-sm text-right z-10">
            <p className="text-white/80 text-sm leading-relaxed">
              ClarityAI is a mental wellness platform working at the intersection of 
              technology and psychology to transform mental health support.
            </p>
          </div>
        </section>

        {/* SCROLLER SECTION 1 */}
        <section className="section mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-5xl font-bold">Sentiment-aware conversations</h2>
            <p className="mt-4 text-white/80">
              Detects stress, anxiety, restlessness, or positivity and adapts responses — empathetic, motivational,
              or uplifting — recommending the most relevant activity in real time.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/chat" className="btn-primary">Try the Chatbot</Link>
              <Link href="/journal" className="card">Open Journal</Link>
            </div>
          </div>
          <div className="reveal card">
            <div className="aspect-[4/3] w-full rounded-lg bg-white/5" />
          </div>
        </section>

        {/* SCROLLER SECTION 2 */}
        <section className="section mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal order-2 md:order-1 card">
            <div className="aspect-[4/3] w-full rounded-lg bg-white/5" />
          </div>
          <div className="reveal order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold">Sound therapy & breathing</h2>
            <p className="mt-4 text-white/80">
              Adaptive soundscapes (alpha for focus, theta for calm) and visual inhale–exhale sequences help
              you regulate in the moment, triggered when the chatbot senses rising stress.
            </p>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setBreathingActive(true)}
                className="btn-primary"
              >
                Start Breathing
              </button>
              <button 
                onClick={() => {
                  setSoundFrequency('theta');
                  setSoundActive(true);
                }}
                className="card"
              >
                Try Sound Therapy
              </button>
            </div>
          </div>
        </section>

        {/* PRINCIPLES GRID (visually echoing Amaterasu sectioning) */}
        <section className="section mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-center text-sm tracking-widest text-white/60">WHY CLARITYAI STANDS OUT</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Emotionally adaptive, not static',
              'AI + creativity + wellness in one',
              'Accessible for students & professionals',
              'Personal mood analytics over time',
              'Guided activities that meet your state',
              'Safe, empathetic companion 24/7'
            ].map((title, idx) => (
              <div key={idx} className="reveal card p-6 h-full">
                <div className="text-lg font-semibold">{title}</div>
                <p className="mt-2 text-sm text-white/75">
                  Built to understand you in real-time and guide you with gentle, effective practices.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section mx-auto max-w-4xl px-4 pb-28 text-center">
          <h4 className="reveal text-2xl md:text-4xl font-bold">Begin your journey</h4>
          <p className="reveal mt-4 text-white/80">Step into a calmer, clearer you — one breath at a time.</p>
          <div className="reveal mt-6 flex items-center justify-center gap-4">
            <Link href="/chat" className="btn-primary">Start Now</Link>
            <Link href="/resources" className="card">See Resources</Link>
          </div>
        </section>
      </main>

      {/* Wellness Components */}
      <BreathingExercise 
        isActive={breathingActive} 
        onComplete={() => setBreathingActive(false)} 
      />
      <SoundTherapy 
        isActive={soundActive} 
        frequency={soundFrequency}
        onClose={() => setSoundActive(false)}
      />
    </div>
  );
}

