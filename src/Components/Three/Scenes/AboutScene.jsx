import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { sharedEnvironment } from '../Utils/ThreeConfig';

export default function AboutScene() {
  return (
    <div className="w-full max-w-full overflow-hidden !absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        onCreated={({ gl }) => {
          return () => {
            gl.dispose();
          };
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={sharedEnvironment.ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={sharedEnvironment.directionalIntensity} />
        <Environment preset="night" />

        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color="#818cf8"
              roughness={0.2}
              metalness={0.5}
              distort={0.5}
              speed={3}
            />
          </Sphere>
        </Float>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
