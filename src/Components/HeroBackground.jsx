import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
// The 'simplex-noise' package exposes a default class in ESM builds.
// Import it as the default export to ensure we get a constructor in both ESM and CJS interop.
import { createNoise3D } from 'simplex-noise';

const ParticleField = () => {
  const count = 500; // slight boost
  const mesh = useRef();
  const light = useRef();
  // simplex-noise v2+ exports factory functions for noise generators.
  // createNoise3D() returns a function (x,y,z) => value in [-1,1]
  const simplex = useMemo(() => createNoise3D(), []);

  // Generate stable positions
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }
    return posArray;
  }, []);

  useFrame(state => {
    const { clock, mouse } = state;
    const t = clock.getElapsedTime();
    // defensive checks — don't run if mesh not yet mounted
    if (!mesh.current || !mesh.current.geometry) return;
    const p = mesh.current.geometry.attributes.position;

    // Mouse smoothing (react-three-fiber provides mouse as a 2D vector)
    const mx = THREE.MathUtils.lerp(0, mouse.x, 0.25);
    const my = THREE.MathUtils.lerp(0, mouse.y, 0.25);

    for (let i = 0; i < p.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      p.array[iy] += simplex(ix * 0.02, iy * 0.02, t * 0.15) * 0.003;
      p.array[ix] += simplex(ix * 0.03, iy * 0.03, t * 0.12) * 0.003;
      p.array[iz] += simplex(ix * 0.04, iy * 0.04, t * 0.14) * 0.003;

      p.array[ix] += mx * 0.005;
      p.array[iy] += my * 0.005;
    }

    p.needsUpdate = true;

    // Light follow mouse
    if (light.current) {
      light.current.position.x = mx * 6;
      light.current.position.y = -my * 6;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.06}
        color={'#5ab9ff'}
        transparent
        sizeAttenuation
        opacity={0.85}
      />

      <pointLight ref={light} distance={10} intensity={3} color="#ffffff" />
    </points>
  );
};

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // boosts FPS
      >
        <ParticleField />

        {/* Dreamy bloom effect */}
        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.25}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
