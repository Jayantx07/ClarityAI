import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function PaintingCanvas({ isActive, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#6C63FF');
  const [brushSize, setBrushSize] = useState(5);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const colors = [
    '#6C63FF', '#4C46CC', '#8E89FF', '#FF6B6B', '#4ECDC4', 
    '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];

  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      
      // Set initial background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animate canvas entrance
      gsap.fromTo(canvas, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isActive, canvasSize]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `clarity-ai-painting-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Creative Expression</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">Color:</span>
            <div className="flex gap-1">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    color === c ? 'border-white' : 'border-white/30'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">Brush:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-white/60 text-xs">{brushSize}px</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition"
            >
              Clear
            </button>
            <button
              onClick={saveCanvas}
              className="px-3 py-1 bg-brand hover:bg-brand-dark rounded text-white text-sm transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-white/20 rounded-lg cursor-crosshair bg-black/20"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="mt-4 text-center text-white/60 text-sm">
          Express your emotions through color and movement. There are no rules here.
        </div>
      </div>
    </div>
  );
}
