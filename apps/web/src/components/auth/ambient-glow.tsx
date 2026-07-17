'use client';

import { useEffect, useRef } from 'react';

export function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      const ox = (e.clientX - window.innerWidth / 2) * 0.25;
      const oy = (e.clientY - window.innerHeight / 2) * 0.25;
      glow.style.marginLeft = `${ox}px`;
      glow.style.marginTop = `${oy}px`;
    };

    const onLeave = () => {
      glow.style.marginLeft = '0px';
      glow.style.marginTop = '0px';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2">
        <div
          ref={glowRef}
          className="w-[1100px] h-[1100px] rounded-full bg-[radial-gradient(circle,rgba(214,179,106,0.12)_0%,rgba(214,179,106,0)_75%)] blur-[120px] animate-breathe-glow will-change-[transform,opacity,margin] transition-[margin] duration-300"
        />
      </div>
    </div>
  );
}
