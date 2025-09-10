import React, { useEffect, useRef } from 'react';

export default function BackgroundVideo({ excludeSection }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slower playback for smoother look
    }

    // Hide video when scrolling past hero section if excludeSection is true
    if (excludeSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (containerRef.current) {
            containerRef.current.style.opacity = entry.isIntersecting ? '0' : '1';
          }
        },
        { threshold: 0.1 }
      );

      const heroSection = document.querySelector('#hero-section');
      if (heroSection) {
        observer.observe(heroSection);
      }

      return () => {
        if (heroSection) {
          observer.unobserve(heroSection);
        }
      };
    }
  }, [excludeSection]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 transition-opacity duration-700"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/90 via-[#0b1020]/80 to-[#0b1020]/90 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover scale-105"
        style={{ 
          filter: 'brightness(0.4) blur(2px)',
          transform: 'scale(1.05)',
          willChange: 'transform'
        }}
      >
        <source src="/Intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
