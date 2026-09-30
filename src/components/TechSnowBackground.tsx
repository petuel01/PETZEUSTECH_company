import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Monitor, Eye } from 'lucide-react';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
  color: string;
  type: 'circle' | 'cross' | 'binary' | 'diamond';
  char?: string;
  rotation: number;
  rotationSpeed: number;
}

export const TechSnowBackground: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('petzeustech_snow_bg');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [activeBgImage, setActiveBgImage] = useState<'cyber' | 'global'>('cyber');

  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleAmbiance = () => {
    setIsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('petzeustech_snow_bg', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const shouldAnimateSnow = isEnabled && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAnimateSnow) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Color palette adapted to light or dark mode
    const techColors = isDark
      ? [
          'rgba(168, 85, 247, ',   // Purple-500
          'rgba(147, 51, 234, ',   // Purple-600
          'rgba(192, 132, 252, ',  // Purple-400
          'rgba(99, 102, 241, ',   // Indigo-500
          'rgba(6, 182, 212, ',    // Cyan-500
        ]
      : [
          'rgba(126, 34, 206, ',   // Purple-700
          'rgba(99, 102, 241, ',   // Indigo-500
          'rgba(14, 165, 233, ',   // Sky-500
          'rgba(168, 85, 247, ',   // Purple-500
        ];

    const binaryChars = ['0', '1', '<', '>', '{', '}', '/', '*', '+', '#'];

    // Optimal particle count
    const particleCount = Math.min(Math.floor((width * height) / 24000), 55);

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      let type: Particle['type'] = 'circle';
      if (typeRand > 0.85) type = 'binary';
      else if (typeRand > 0.65) type = 'diamond';
      else if (typeRand > 0.45) type = 'cross';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1.2,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.2,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
        opacity: Math.random() * 0.4 + 0.15,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        type,
        char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * (isDark ? 0.08 : 0.05);
            ctx.strokeStyle = isDark ? `rgba(168, 85, 247, ${alpha})` : `rgba(126, 34, 206, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.4 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Mouse gentle deflection
        if (mousePos.current.active) {
          const dx = p.x - mousePos.current.x;
          const dy = p.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        } else if (p.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size * 1.5, 0);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size * 1.5, 0);
          ctx.closePath();
          ctx.fillStyle = `${p.color}${p.opacity * 0.85})`;
          ctx.fill();
        } else if (p.type === 'cross') {
          ctx.strokeStyle = `${p.color}${p.opacity * 0.75})`;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.2, 0);
          ctx.lineTo(p.size * 1.2, 0);
          ctx.moveTo(0, -p.size * 1.2);
          ctx.lineTo(0, p.size * 1.2);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'binary' && p.char) {
          ctx.font = `600 ${p.size * 3}px monospace`;
          ctx.fillStyle = `${p.color}${p.opacity * 0.75})`;
          ctx.fillText(p.char, 0, 0);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldAnimateSnow, isDark]);

  const bgImageSrc = activeBgImage === 'cyber' ? APP_IMAGES.cyberTechBg : APP_IMAGES.globalTechBg;

  return (
    <>
      {/* 1. Global High-Tech Background Image & Matrix Grid (Dark vs Light mode) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
        id="global-tech-background"
      >
        <img
          src={bgImageSrc}
          alt="PETZEUSTECH Cyber Tech Background"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center scale-105 transition-all duration-700 ${
            isDark 
              ? 'opacity-35 mix-blend-screen animate-ambient-pulse' 
              : 'opacity-10 mix-blend-multiply'
          }`}
        />

        {/* Dynamic Dark vs Light Overlay Shading */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[#060714]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050614] via-[#07081a]/90 to-[#050614]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,50,220,0.18),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-slate-50/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-50/95 to-slate-100/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.08),rgba(255,255,255,0))]" />
          </>
        )}
      </div>

      {/* 2. Ambient Tech Particles Canvas */}
      {shouldAnimateSnow && (
        <canvas
          ref={canvasRef}
          className={`fixed inset-0 pointer-events-none z-0 ${isDark ? 'opacity-75' : 'opacity-40'}`}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}
    </>
  );
};
