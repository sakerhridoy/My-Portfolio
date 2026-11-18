import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment } from '@react-three/drei';
import { sharedEnvironment, materials } from '../Utils/ThreeConfig';

export default function HeroScene() {
  return (
    <Canvas className="!absolute inset-0 z-10 pointer-events-none">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={sharedEnvironment.ambientIntensity} />
      <directionalLight position={[10, 10, 5]} intensity={sharedEnvironment.directionalIntensity} />
      <Environment preset="city" />

      <Float speed={4} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#22d3ee"
            {...materials.glass}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}
