import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

function Cube() {
  const meshRef = useRef();
  const { viewport } = useThree();

  const cubeSize = viewport.height * 0.6;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.15 * delta;
    meshRef.current.rotation.y += 0.2 * delta;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshBasicMaterial color="#141414" />
    </mesh>
  );
}

export default function CubeBackground() {
  return (
    <div className="cube-background">
      <div className="cube-background__glow" />
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1000], zoom: 1, near: 0.1, far: 3000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Cube />
      </Canvas>
    </div>
  );
}
