import { useState } from 'react';
import Link from 'next/link';

const AnimatedButton = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'lg',
  className = '',
  ...props 
}) => {
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, moving, final

  // Match the reference button exactly - pill shape with proper sizing
  const baseClasses = 'relative inline-flex items-center justify-center font-medium tracking-wider transition-all duration-500 ease-out rounded-full overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-t from-[#1e3a5f] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-blue-500/25',
    secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
    ghost: 'text-white/80 hover:text-white hover:bg-white/5'
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleMouseEnter = () => {
    setAnimationPhase('moving');
    
    // After dot movement, show final state
    setTimeout(() => {
      setAnimationPhase('final');
    }, 400);
  };

  const handleMouseLeave = () => {
    setAnimationPhase('idle');
  };

  const buttonContent = (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated dot - positioned before text */}
      <div
        className={`absolute w-2 h-2 bg-white rounded-full transition-all duration-500 ease-out ${
          animationPhase === 'moving' ? 'translate-x-16' : 
          animationPhase === 'final' ? 'translate-x-20' : 'translate-x-0'
        }`}
        style={{
          left: animationPhase === 'final' ? 'calc(100% - 2rem)' : '0.5rem'
        }}
      />
      
      {/* Text content with proper spacing */}
      <span
        className={`transition-all duration-500 ease-out ${
          animationPhase === 'moving' ? 'opacity-30' : 
          animationPhase === 'final' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </span>
      
      {/* Final state content */}
      <span
        className={`absolute transition-all duration-500 ease-out ${
          animationPhase === 'final' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={classes}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
