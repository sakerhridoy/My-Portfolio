import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
} from '@react-three/drei';

const Hero3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 3, 3] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />

        <Float speed={4} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1.15, 64, 64]}>
            <MeshDistortMaterial
              color="#38bdf8"
              distort={0.35}
              speed={2}
              roughness={0.2}
              metalness={0.6}
            />
          </Sphere>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
