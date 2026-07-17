'use client';

import { useEffect, useRef } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number; y: number; size: number;
      speedX: number; speedY: number; opacity: number;
      reset: () => void;
      update: (w: number, h: number) => void;
      draw: (c: CanvasRenderingContext2D) => void;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x = 0; y = 0; size = 0; speedX = 0; speedY = 0; opacity = 0;
      constructor() { this.reset(); }

      reset() {
        const w = canvas!.width;
        const h = canvas!.height;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = -Math.random() * 0.18 - 0.04;
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update(w: number, h: number) {
        this.x += this.speedX + Math.sin(this.y / 40) * 0.04;
        this.y += this.speedY;
        if (this.y < -10 || this.x < -10 || this.x > w + 10) {
          this.reset();
          this.y = h + 10;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(229, 197, 122, ${this.opacity})`;
        c.fill();
      }
    }

    const count = 27;
    for (let i = 0; i < count; i++) particles.push(new Particle());

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      for (const p of particles) { p.update(w, h); p.draw(ctx); }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
