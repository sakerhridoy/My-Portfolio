import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { createNoise3D } from 'simplex-noise';

const PARTICLE_COUNT = 260;

const createParticlePositions = () => {
  const posArray = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 14;
    posArray[i + 1] = (Math.random() - 0.5) * 14;
    posArray[i + 2] = (Math.random() - 0.5) * 6;
  }
  return posArray;
};

const createCircleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.45, 'rgba(186, 230, 253, 0.55)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const PARTICLE_POSITIONS = createParticlePositions();

const ParticleField = () => {
  const mesh = useRef();
  const light = useRef();
  const simplex = useMemo(() => createNoise3D(), []);
  const positions = useMemo(() => new Float32Array(PARTICLE_POSITIONS), []);
  const circleTexture = useMemo(() => createCircleTexture(), []);

  useFrame(state => {
    const { clock, mouse } = state;
    const t = clock.getElapsedTime();
    if (!mesh.current || !mesh.current.geometry) return;
    const p = mesh.current.geometry.attributes.position;

    const mx = THREE.MathUtils.lerp(0, mouse.x, 0.2);
    const my = THREE.MathUtils.lerp(0, mouse.y, 0.2);

    for (let i = 0; i < p.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const dx = simplex(ix * 0.02, iy * 0.02, t * 0.12) * 0.0022;
      const dy = simplex(ix * 0.03, iy * 0.03, t * 0.1) * 0.0022;
      const dz = simplex(ix * 0.04, iy * 0.04, t * 0.11) * 0.0022;

      const nx = p.array[ix] + dx + mx * 0.004;
      const ny = p.array[iy] + dy + my * 0.004;
      const nz = p.array[iz] + dz;

      p.array[ix] = Math.abs(nx) > 7 ? -Math.sign(nx) * 6.8 : nx;
      p.array[iy] = Math.abs(ny) > 7 ? -Math.sign(ny) * 6.8 : ny;
      p.array[iz] = Math.abs(nz) > 3 ? -Math.sign(nz) * 2.8 : nz;
    }

    p.needsUpdate = true;

    if (light.current) {
      light.current.position.x = mx * 6;
      light.current.position.y = -my * 6;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry
        attach="geometry"
        onUpdate={self => self.computeBoundingSphere()}
      >
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.045}
        map={circleTexture}
        color="#7dd3fc"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        opacity={0.48}
      />

      <pointLight ref={light} distance={10} intensity={2.2} color="#ffffff" />
    </points>
  );
};

const HeroBackground = () => {
  return (
    <div id="hero-canvas-container" className="absolute inset-0 w-full max-w-full overflow-hidden z-0 pointer-events-none opacity-75">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          return () => {
            gl.dispose();
          };
        }}
      >
        <ParticleField />
        <EffectComposer>
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.35}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
