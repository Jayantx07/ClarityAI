import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BreathingExercise({ isActive, onComplete }) {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const animationRef = useRef(null);

  const phases = {
    inhale: { duration: 4000, text: 'Breathe In', color: '#6C63FF' },
    hold: { duration: 2000, text: 'Hold', color: '#8E89FF' },
    exhale: { duration: 6000, text: 'Breathe Out', color: '#4C46CC' },
    pause: { duration: 2000, text: 'Rest', color: '#6C63FF' }
  };

  useEffect(() => {
    if (isActive && !isRunning) {
      startBreathing();
    } else if (!isActive && isRunning) {
      stopBreathing();
    }
  }, [isActive]);

  const startBreathing = () => {
    setIsRunning(true);
    setCycle(0);
    runCycle();
  };

  const stopBreathing = () => {
    setIsRunning(false);
    if (animationRef.current) {
      gsap.killTweensOf([circleRef.current, textRef.current]);
    }
    gsap.set(circleRef.current, { scale: 1, opacity: 0.3 });
    gsap.set(textRef.current, { opacity: 0.5 });
  };

  const runCycle = () => {
    if (!isRunning) return;

    const currentPhase = phases[phase];
    
    // Animate circle
    gsap.to(circleRef.current, {
      scale: phase === 'inhale' ? 1.3 : phase === 'hold' ? 1.3 : 1,
      opacity: phase === 'inhale' ? 0.8 : phase === 'exhale' ? 0.4 : 0.6,
      duration: currentPhase.duration / 1000,
      ease: 'power2.inOut'
    });

    // Animate text
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Set next phase
    setTimeout(() => {
      if (!isRunning) return;
      
      const nextPhase = getNextPhase(phase);
      setPhase(nextPhase);
      
      if (nextPhase === 'inhale') {
        setCycle(prev => prev + 1);
        if (cycle >= 3) { // Complete 4 cycles
          onComplete && onComplete();
          return;
        }
      }
      
      runCycle();
    }, currentPhase.duration);
  };

  const getNextPhase = (current) => {
    const order = ['inhale', 'hold', 'exhale', 'pause'];
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % order.length];
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div 
          ref={circleRef}
          className="w-48 h-48 mx-auto rounded-full border-4 border-white/20 flex items-center justify-center"
          style={{ 
            backgroundColor: phases[phase].color + '20',
            borderColor: phases[phase].color + '60'
          }}
        >
          <div 
            ref={textRef}
            className="text-2xl font-semibold text-white"
            style={{ color: phases[phase].color }}
          >
            {phases[phase].text}
          </div>
        </div>
        <div className="mt-6 text-white/60">
          Cycle {cycle + 1} of 4
        </div>
        <button 
          onClick={stopBreathing}
          className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
