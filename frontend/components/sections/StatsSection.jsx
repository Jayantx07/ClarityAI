import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function StatsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/10 to-transparent opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#6C63FF]/5 to-transparent" />
      </div>

      {/* Content Container */}
      <motion.div 
        style={{ scale, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Stats */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-light">
                Making Mental Health
                <span className="text-[#6C63FF] block mt-2">More Accessible</span>
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                Our platform has helped thousands of individuals on their journey to better mental health through innovative AI technology and personalized support.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-[#6C63FF]/5 rounded-xl blur-xl group-hover:bg-[#6C63FF]/10 transition-colors duration-300" />
                  <div className="relative card group-hover:border-[#6C63FF]/30 transition-all duration-300">
                    <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 to-transparent rounded-2xl blur-2xl" />
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              {/* Replace with your 3D visualization or image */}
              <Image
                src="/stats-visual.png" // Add your image
                alt="Mental Health Statistics Visualization"
                layout="fill"
                objectFit="cover"
                className="transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/20 to-transparent" />
    </section>
  );
}

const stats = [
  {
    value: "50k+",
    label: "Active Users"
  },
  {
    value: "92%",
    label: "User Satisfaction"
  },
  {
    value: "24/7",
    label: "Support Available"
  },
  {
    value: "150+",
    label: "Wellness Resources"
  }
];
