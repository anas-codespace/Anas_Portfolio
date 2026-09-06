"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";

function AnimatedShape() {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Icosahedron args={[1, 2]} ref={meshRef} scale={2}>
      <MeshDistortMaterial
        color="#333333"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </Icosahedron>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-reveal",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-24">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div ref={textRef} className="flex flex-col gap-8 z-10">
          <h2 className="about-reveal text-4xl md:text-6xl font-bold tracking-tighter">
            {PORTFOLIO_DATA.personal.aboutHeading}
          </h2>
          
          <div className="about-reveal space-y-6 text-lg text-gray-400 leading-relaxed max-w-xl">
            {PORTFOLIO_DATA.personal.aboutText.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full about-reveal">
          <Canvas camera={{ position: [0, 0, 5] }} className="pointer-events-none">
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedShape />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
