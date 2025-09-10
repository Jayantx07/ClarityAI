import { useEffect, useRef } from 'react';

export default function BgVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="bg-video-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      >
        <source src="/Bg.mp4" type="video/mp4" />
      </video>
      <div className="bg-video-overlay" />
      <div className="absolute inset-0 bg-noise opacity-10" />
    </div>
  );
}
