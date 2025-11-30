import React from 'react'
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
} from '@react-three/drei';

const Hero3D = () => {
  return (
    <>
      <section>
        <div className="w-full h-full">
          <Canvas camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} />

            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
              <Sphere args={[1, 100, 200]}>
                <MeshDistortMaterial color="#38bdf8" distort={0.3} speed={2} />
              </Sphere>
            </Float>

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </section>
    </>
  );
}

export default Hero3D