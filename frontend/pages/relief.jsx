import { useEffect, useRef, useState } from 'react';
import { Layout, Navbar } from '../components/layout';

export default function ReliefCanvasPage() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [bg, setBg] = useState('#101426');
  const [size, setSize] = useState(6);
  const [strokes, setStrokes] = useState([]); // history of images for undo
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      const rect = wrapRef.current.getBoundingClientRect();
      c.width = Math.floor(rect.width * dpr);
      c.height = Math.floor((window.innerHeight - 180) * dpr);
      c.style.width = rect.width + 'px';
      c.style.height = (window.innerHeight - 180) + 'px';
      const _ctx = c.getContext('2d');
      _ctx.scale(dpr, dpr);
      _ctx.lineCap = 'round';
      _ctx.lineJoin = 'round';
      _ctx.strokeStyle = color;
      _ctx.lineWidth = size;
      setCtx(_ctx);
      // Fill background
      _ctx.save();
      _ctx.fillStyle = bg;
      _ctx.fillRect(0,0,c.width, c.height);
      _ctx.restore();
    };
    resize();
    window.addEventListener('resize', resize);
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
  }, [ctx, color, size]);

  useEffect(() => {
    if (!ctx || !canvasRef.current) return;
    // repaint bg when bg changes
    const c = canvasRef.current;
    const img = ctx.getImageData(0, 0, c.width, c.height);
    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,c.width, c.height);
    ctx.putImageData(img, 0, 0);
    ctx.restore();
  }, [bg]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e) => {
    if (!ctx) return;
    // push snapshot for undo
    const c = canvasRef.current;
    const snap = ctx.getImageData(0, 0, c.width, c.height);
    setStrokes((s) => [...s, snap]);

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };
  const move = (e) => {
    if (!drawing || !ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = () => {
    if (!ctx) return;
    ctx.closePath();
    setDrawing(false);
  };

  const undo = () => {
    if (!ctx || strokes.length === 0) return;
    const c = canvasRef.current;
    const last = strokes[strokes.length - 1];
    ctx.putImageData(last, 0, 0);
    setStrokes((s) => s.slice(0, -1));
  };
  const clear = () => {
    if (!ctx) return;
    const c = canvasRef.current;
    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.restore();
    setStrokes([]);
  };
  const save = () => {
    const c = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'clarity-relief.png';
    link.href = c.toDataURL('image/png');
    link.click();
  };

  return (
    <Layout>
      <Navbar />
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Ambient gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1023] via-[#1a1940] to-[#0e6579]" />
        <div className="absolute -top-28 -right-16 h-[360px] w-[360px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-[360px] w-[360px] rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-10">
          <header className="mb-6 flex items-end justify-between">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">Painting Relief Canvas</h1>
              <p className="text-white/70 mt-1">Draw freely to relax. Save your artwork or simply enjoy the moment.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={undo} className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white cursor-pointer hover:bg-white/15">Undo</button>
              <button onClick={clear} className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white cursor-pointer hover:bg-white/15">Clear</button>
              <button onClick={save} className="px-4 py-2 rounded-xl bg-white text-black font-semibold cursor-pointer hover:opacity-90">Save PNG</button>
            </div>
          </header>

          {/* Controls */}
          <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
            <div ref={wrapRef} className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <canvas
                ref={canvasRef}
                className="touch-none select-none block"
                onMouseDown={start}
                onMouseMove={move}
                onMouseUp={end}
                onMouseLeave={end}
                onTouchStart={(e)=>{ e.preventDefault(); start(e); }}
                onTouchMove={(e)=>{ e.preventDefault(); move(e); }}
                onTouchEnd={(e)=>{ e.preventDefault(); end(e); }}
              />
            </div>

            <aside className="md:ml-2 flex md:flex-col gap-3 md:gap-4">
              <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-white/80">
                <div className="text-xs mb-2">Brush</div>
                <input type="range" min="1" max="48" value={size} onChange={(e)=>setSize(parseInt(e.target.value))} className="w-40 md:w-28" />
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-white/30" style={{ background: color }} />
                  <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="cursor-pointer" />
                </div>
              </div>

              <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-white/80">
                <div className="text-xs mb-2">Background</div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded border border-white/30" style={{ background: bg }} />
                  <input type="color" value={bg} onChange={(e)=>setBg(e.target.value)} className="cursor-pointer" />
                </div>
              </div>

              <div className="md:hidden flex gap-2">
                <button onClick={undo} className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white cursor-pointer hover:bg-white/15">Undo</button>
                <button onClick={clear} className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white cursor-pointer hover:bg-white/15">Clear</button>
                <button onClick={save} className="flex-1 px-4 py-2 rounded-xl bg-white text-black font-semibold cursor-pointer hover:opacity-90">Save</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
