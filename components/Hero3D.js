'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingOrb({ position, color, speed = 1, distort = 0.4, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField({ count = 500 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseParallax({ children }) {
  const group = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (group.current) {
      const x = (state.pointer.x * viewport.width) / 50;
      const y = (state.pointer.y * viewport.height) / 50;
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.1);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.1);
    }
  });

  return <group ref={group}>{children}</group>;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={1} />
      <pointLight position={[10, 10, 10]} color="#ec4899" intensity={0.5} />

      <MouseParallax>
        <FloatingOrb position={[-4, 2, -5]} color="#a855f7" scale={1.5} distort={0.5} />
        <FloatingOrb position={[4, -1, -3]} color="#ec4899" scale={0.8} distort={0.3} />
        <FloatingOrb position={[0, 3, -8]} color="#6366f1" scale={2} distort={0.6} speed={0.5} />
        <FloatingOrb position={[-3, -2, -4]} color="#8b5cf6" scale={0.6} distort={0.4} />
      </MouseParallax>

      <ParticleField count={300} />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/50 to-stone-950 pointer-events-none" />
    </div>
  );
}
