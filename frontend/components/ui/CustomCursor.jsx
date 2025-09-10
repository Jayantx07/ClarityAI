import { useRef, useState, useEffect } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePosition.current.x}px, ${mousePosition.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(updateCursorPosition);
    };

    const updateMousePosition = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
      setIsVisible(true);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target && typeof target.matches === 'function') {
        const isInteractive = target.matches('button, a, [role="button"], input, textarea, select, [data-cursor-hover]') ||
                             target.closest('button, a, [role="button"], input, textarea, select, [data-cursor-hover]');
        setIsHovering(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    // Start animation loop
    rafId.current = requestAnimationFrame(updateCursorPosition);

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.body.style.cursor = 'none';

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* Outer circle */}
      <div
        className={`rounded-full border-2 border-white will-change-transform ${
          isHovering ? 'w-10 h-10 border-opacity-100' : 'w-6 h-6 border-opacity-100'
        }`}
        style={{
          transition: 'width 0.2s ease, height 0.2s ease'
        }}
      />
      {/* Inner dot */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full will-change-transform ${
          isHovering ? 'w-1.5 h-1.5' : 'w-1 h-1'
        }`}
        style={{
          transition: 'width 0.2s ease, height 0.2s ease'
        }}
      />
    </div>
  );
}
