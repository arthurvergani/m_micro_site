import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Cube({ isExpanded }) {
  const meshRef = useRef();
  const targetPos = useRef(new THREE.Vector3());

  useFrame(({ viewport }, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.15 * delta;
    meshRef.current.rotation.y += 0.2 * delta;

    // When expanded, main-view is 50vw (left half) → shift cube left by 1/4 viewport
    targetPos.current.x = isExpanded ? -viewport.width / 4 : 0;
    meshRef.current.position.lerp(targetPos.current, 1 - Math.pow(0.001, delta));

    const s = viewport.height * 0.6;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#141414" />
    </mesh>
  );
}

export default function CubeBackground({ isExpanded }) {
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    const menu = document.querySelector('.menu-container');
    if (!menu) return;

    const update = () => setMenuHeight(menu.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(menu);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="cube-background" style={{ bottom: menuHeight }}>
      <div className={`cube-background__glow ${isExpanded ? 'cube-background__glow--expanded' : ''}`} />
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1000], zoom: 1, near: 0.1, far: 3000 }}
        gl={{ antialias: true, alpha: true, toneMapping: 0 }}
        style={{ background: 'transparent' }}
      >
        <Cube isExpanded={isExpanded} />
      </Canvas>
    </div>
  );
}
