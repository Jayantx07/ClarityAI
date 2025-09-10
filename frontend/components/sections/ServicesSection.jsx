// React imports
import React, { useRef, useState, useEffect } from 'react';
// Framer Motion imports
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BgVideo } from '../ui';
import { useLayoutEffect } from 'react';

const services = [
  {
    title: "Personal AI Therapist",
    description: "24/7 access to empathetic AI conversations designed to support your mental well-being journey.",
    gradient: "from-[#6C63FF] to-[#937FFF]",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    )
  },
  // ... rest of the services array
];

function ServiceCard({ service }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;
    if (isHovered && iconRef.current) {
      let angle = 0;
      const animate = () => {
        angle += 0.02;
        const x = Math.cos(angle) * 5;
        const y = Math.sin(angle) * 5;
        if (iconRef.current) {
          iconRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * 15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    setTiltX(tiltX);
    setTiltY(tiltY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
    if (iconRef.current) {
      iconRef.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden p-6 rounded-2xl cursor-pointer transform transition-transform duration-300"
      style={{
        background: `linear-gradient(135deg, ${service.gradient})`,
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10">
        <div ref={iconRef} className="text-white mb-4 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
        <p className="text-white/80">{service.description}</p>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12" />
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center py-20">
      {isClient && <BgVideo />}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Comprehensive
            <span className="text-[#6C63FF] block mt-2">Mental Health Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience our range of innovative mental health services designed to support your well-being journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/20 to-transparent" />
    </section>
  );
}
