import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slower playback for smoother look
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/90 via-[#0b1020]/80 to-[#0b1020]/90 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover scale-105"
        style={{ 
          filter: 'brightness(0.4) blur(1px)',
          transform: 'scale(1.05)',
          willChange: 'transform'
        }}
      >
        <source src="/Bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
