'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Minimal starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      opacity: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.opacity += (Math.random() - 0.5) * 0.02;
        s.opacity = Math.max(0.05, Math.min(0.9, s.opacity));
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] flex flex-col">
      {/* Starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Ambient glow orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-3xl pointer-events-none z-0 animate-pulse-slow" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#007DB8] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-white/60 text-sm tracking-widest uppercase">Dell Technologies</span>
        </div>
        <div className="flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Black Friday
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: isReady ? 1 : 0,
            transform: isReady ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Eyebrow */}
          <p className="text-[#007DB8] text-xs tracking-[0.3em] uppercase font-medium mb-6">
            A Black Friday unlike any other
          </p>

          {/* Main headline */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-4">
            Find Your
          </h1>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-10"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #007DB8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Next Era
          </h1>

          {/* Subhead */}
          <p className="text-white/50 text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-12">
            Something&apos;s shifting. A new chapter is calling.
            <br />
            Let&apos;s figure out exactly where you&apos;re headed — and equip you for it.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push('/chat')}
            className="group relative inline-flex items-center gap-3 bg-white text-[#0A0A0F] font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-2xl"
          >
            Begin Your Journey
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full ring-2 ring-white/20 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </button>

          {/* Social proof */}
          <p className="mt-8 text-white/25 text-sm">
            A 5-minute conversation. A lifetime of momentum.
          </p>
        </div>
      </main>

      {/* Era previews strip */}
      <footer className="relative z-10 pb-10 px-8">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {[
            { name: 'The Creator', color: '#8B5CF6' },
            { name: 'The Innovator', color: '#06B6D4' },
            { name: 'The Achiever', color: '#F59E0B' },
            { name: 'The Explorer', color: '#10B981' },
            { name: 'The Visionary', color: '#DC2626' },
            { name: 'The Performer', color: '#EF4444' },
          ].map((era) => (
            <div
              key={era.name}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: era.color }}
              />
              {era.name}
            </div>
          ))}
        </div>
        <p className="text-center text-white/15 text-xs mt-4">
          Which era is yours?
        </p>
      </footer>
    </div>
  );
}
