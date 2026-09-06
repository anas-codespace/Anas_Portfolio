"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// --- ERROR BOUNDARY FOR MISSING MODEL ---
class ModelErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- ACTUAL 3D MODEL LOADER ---
function AnasModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  // Enable shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Model positioning (adjust these once you generate your GLB)
  return <primitive object={scene} scale={1.8} position={[0, -2, 0]} rotation={[0, -Math.PI / 8, 0]} />;
}

// --- CINEMATIC CAMERA & MOUSE PARALLAX ---
function CinematicCamera() {
  const { camera, pointer } = useThree();
  
  useFrame(() => {
    // Subtle mouse parallax shifting the camera slightly
    gsap.to(camera.position, {
      x: pointer.x * 0.5,
      y: 1 + pointer.y * 0.3,
      duration: 1.5,
      ease: "power2.out"
    });
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// --- MAIN COMPONENT ---
export default function ThreePortrait() {
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  // Check if the user has provided the model file yet
  useEffect(() => {
    fetch("/models/anas.glb", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setModelExists(true);
        else setModelExists(false);
      })
      .catch(() => setModelExists(false));
  }, []);

  const FallbackImage = (
    <img 
      src="/portrait.png" 
      alt="Anas - Vibe Coder" 
      className="w-auto h-full max-h-full object-contain object-bottom pointer-events-auto filter drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 relative"
      style={{ 
        maskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)'
      }}
    />
  );

  // Still checking...
  if (modelExists === null) return null;

  // Fallback if model isn't uploaded yet or WebGL fails
  if (!modelExists) {
    return FallbackImage;
  }

  return (
    <div className="w-full h-full absolute inset-0 z-10 flex justify-center items-end cursor-grab active:cursor-grabbing">
      <ModelErrorBoundary fallback={FallbackImage}>
        <Canvas shadows camera={{ position: [0, 1, 5], fov: 45 }}>
          {/* Cinematic Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight 
            position={[-5, 5, -5]} 
            intensity={2} 
            color="#3b82f6" 
            penumbra={1} 
            distance={20}
          />
          
          <Suspense fallback={null}>
            <AnasModel url="/models/anas.glb" />
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
          </Suspense>

          {/* Interactive Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8}
            minDistance={3}
            maxDistance={8}
          />
          
          <CinematicCamera />
        </Canvas>
      </ModelErrorBoundary>
      
      {/* 3D Interaction Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-[0.2em] font-medium z-20 pointer-events-none uppercase">
        Drag to rotate • Scroll to zoom
      </div>
      
      {/* Loading Overlay */}
      <div id="3d-loader" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 text-xs tracking-widest font-bold z-0 pointer-events-none transition-opacity duration-1000 opacity-0">
        LOADING 3D EXPERIENCE...
      </div>
    </div>
  );
}
