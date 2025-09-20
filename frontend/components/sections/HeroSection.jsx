import { AnimatedButton } from '../ui';

export default function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center">
      {/* Background Video and Model Image */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.8)' }}
          >
            <source src="/Bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001242]/60 via-[#004080]/50 to-[#006d86]/40"></div>

        {/* Model Image */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
          <img
            src="/image/Model.png"
            alt="Background Model"
            className="h-[120vh] w-auto max-w-none object-contain opacity-95"
            style={{
              transform: 'translateX(15%)',
            }}
          />
        </div>
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
            <a href="/chat">
              <button className="button type1">
                <span className="btn-txt">START YOUR JOURNEY</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Description Text - Bottom */}
      <div className="absolute bottom-52 right-16 max-w-[280px] z-10">
        <p className="text-white/90 text-[13px] leading-[1.6] tracking-wide font-light">
          ClarityAI is a mental wellness platform working at the intersection of 
          technology and psychology to transform mental health support.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-12 z-10 flex items-center gap-2">
        <div className="scroll-wave">
          <div className="wave-line"></div>
        </div>
        <span className="uppercase text-xs tracking-[0.2em] text-white/70 font-light">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
