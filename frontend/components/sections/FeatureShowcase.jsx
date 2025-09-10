// React imports
import React, { useRef, useEffect, useState } from 'react';
// Framer Motion imports
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// Next.js imports
import Image from 'next/image';

const features = [
  {
    title: "AI-Powered Conversations",
    description: "Experience natural, empathetic conversations with our advanced AI that understands and adapts to your needs.",
    image: "/features/ai-chat.png", // Add your image
    color: "rgba(108, 99, 255, 0.8)" // Main theme purple
  },
  {
    title: "Mood Analytics",
    description: "Track your emotional journey with interactive visualizations and personalized insights.",
    image: "/features/mood-track.png", // Add your image
    color: "rgba(99, 202, 255, 0.8)" // Cyan accent
  },
  {
    title: "Therapeutic Activities",
    description: "Engage in evidence-based exercises designed to reduce stress and improve mental well-being.",
    image: "/features/therapy.png", // Add your image
    color: "rgba(147, 99, 255, 0.8)" // Secondary purple
  }
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const scaleSpring = useSpring(scale, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        scale: scaleSpring,
        y: ySpring,
        opacity,
        transform: isHovered ? `
          perspective(1000px)
          rotateX(${mousePosition.y * 20}deg)
          rotateY(${mousePosition.x * 20}deg)
          scale3d(1.02, 1.02, 1.02)
        ` : 'none'
      }}
      className="relative group cursor-pointer"
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-20 blur-xl transition-all duration-300"
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.1 : 1
        }}
        style={{ 
          backgroundColor: feature.color,
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative card overflow-hidden backdrop-blur-sm bg-white/[0.01] group-hover:border-[#6C63FF]/30 transition-all duration-300">
        {/* Feature Image/Visualization with Parallax */}
        <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1020]/80"
            animate={{
              opacity: isHovered ? 0.7 : 0.5
            }}
          />
          <motion.div
            animate={{
              x: isHovered ? mousePosition.x * 20 : 0,
              y: isHovered ? mousePosition.y * 20 : 0
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative w-full h-full"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-700"
            />
          </motion.div>

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%'
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "linear"
            }}
          />
        </div>

        {/* Content with hover animation */}
        <motion.div 
          className="relative z-10 p-6"
          animate={{
            y: isHovered ? -5 : 0
          }}
        >
          <motion.h3 
            className="text-2xl font-light mb-3 bg-clip-text text-transparent bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${feature.color}, rgba(147, 99, 255, 0.8))`
            }}
          >
            {feature.title}
          </motion.h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {feature.description}
          </p>

          {/* Interactive button */}
          <motion.button
            className="mt-6 px-4 py-2 rounded-lg text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{
              backgroundColor: feature.color,
              color: '#fff'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More →
          </motion.button>
        </motion.div>

        {/* Dynamic border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl transition-all duration-300"
          animate={{
            boxShadow: isHovered 
              ? `0 0 20px ${feature.color}, inset 0 0 20px ${feature.color}`
              : 'none'
          }}
          style={{
            border: `1px solid ${feature.color}`
          }}
        />
      </div>
    </motion.div>
  );
}

export default function FeatureShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.1) 0%, transparent 60%)",
      "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.15) 0%, transparent 70%)",
      "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.1) 0%, transparent 60%)"
    ]
  );

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ background }}
      />
      
      {/* Content Container */}
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Experience Mental Wellness
              <span className="text-[#6C63FF] block mt-2">Reimagined</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover how our innovative features work together to provide you with comprehensive mental health support.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
          }}
          className="absolute -right-48 top-1/4 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-[100px]"
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
          }}
          className="absolute -left-48 bottom-1/4 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/20 to-transparent" />
    </section>
  );
}
