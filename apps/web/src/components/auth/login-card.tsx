'use client';

import { useRef, useEffect } from 'react';

interface LoginCardProps {
  children: React.ReactNode;
}

export function LoginCard({ children }: LoginCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      const tiltX = -(y - window.innerHeight / 2) / (window.innerHeight / 2) * 3.5;
      const tiltY = (x - window.innerWidth / 2) / (window.innerWidth / 2) * 3.5;
      container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;

      const shinePercent = ((x - rect.left) / rect.width) * 200 - 50;
      card.style.setProperty('--shine-x', `${shinePercent}%`);

      const shadowX = -(x - window.innerWidth / 2) * 0.06;
      const shadowY = -(y - window.innerHeight / 2) * 0.06;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 120px rgba(0,0,0,0.85), ${-shadowX}px ${-shadowY}px 50px rgba(214,179,106,0.03)`;
    };

    const onLeave = () => {
      container.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 120px rgba(0,0,0,0.85)';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative transition-transform duration-500 [transform-style:preserve-3d] opacity-0 animate-fade-in [animation-delay:0.9s] [animation-duration:1.8s]"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-[440px] overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(22,22,22,0.5)] to-[rgba(10,10,10,0.75)] backdrop-blur-[50px] saturate-[140%] border border-hairline p-14 px-12 shadow-[0_4px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05),0_40px_120px_rgba(0,0,0,0.85)] transition-shadow duration-500 will-change-transform"
      >
        <div
          className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
          style={{ transform: 'translate3d(var(--shine-x, -100%), 0, 0) skewX(-20deg)', transition: 'transform 0.1s linear' }}
        />
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent opacity-45 transition-opacity duration-500 [background:linear-gradient(135deg,rgba(214,179,106,0.25)_0%,rgba(255,255,255,0.02)_50%,rgba(214,179,106,0.25)_100%)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] group-hover:opacity-95" />

        <div className="relative z-[3]">
          <div className="text-center mb-11">
            <h2 className="text-[1.45rem] font-normal tracking-[0.15em] uppercase mb-2">Sign In</h2>
            <p className="text-sm text-text-secondary font-light tracking-[0.04em]">
              Access your MaisonOS environment
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
