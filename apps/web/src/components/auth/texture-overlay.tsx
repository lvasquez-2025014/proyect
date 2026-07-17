export function TextureOverlay() {
  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.003) 1px, transparent 1px)',
          backgroundSize: '80px 80px, 40px 40px',
        }}
      />
      <svg className="fixed inset-0 z-[999] pointer-events-none opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </>
  );
}
