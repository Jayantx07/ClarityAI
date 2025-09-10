import { memo } from 'react';

function SectionWrapper({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Background video - shared across sections */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.4)',
            transform: 'scale(1.01)', // Prevent white edges
            willChange: 'transform'   // Performance optimization
          }}
        >
          <source src="/Bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/80 to-[#0b1020]/90" />
      </div>
      {children}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(SectionWrapper);
