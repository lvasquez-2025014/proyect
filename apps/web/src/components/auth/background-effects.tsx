import { ParticleCanvas } from './particle-canvas';
import { AmbientGlow } from './ambient-glow';
import { TextureOverlay } from './texture-overlay';

export function BackgroundEffects() {
  return (
    <>
      <TextureOverlay />
      <AmbientGlow />
      <ParticleCanvas />
    </>
  );
}
