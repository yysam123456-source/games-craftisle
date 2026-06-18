"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  speed?: number;
  mouseInteraction?: boolean;
}

export function ParticleBackground({
  className = "",
  particleCount = 100,
  particleColor = "#8b5cf6",
  particleSize = 2,
  speed = 0.5,
  mouseInteraction = true,
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    animationId: number;
    mouse: { x: number; y: number };
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Parse color
    const color = new THREE.Color(particleColor);
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Color variation
      colors[i * 3] = color.r + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 1] = color.g + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 2] = color.b + (Math.random() - 0.5) * 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Points
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    
    if (mouseInteraction) {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      };
      
      container.addEventListener("mousemove", handleMouseMove);
      
      // Cleanup
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }

    // Animation
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate particles
      particles.rotation.x += speed * 0.001;
      particles.rotation.y += speed * 0.002;
      
      // Mouse interaction
      if (mouseInteraction) {
        particles.rotation.x += mouse.y * 0.0005;
        particles.rotation.y += mouse.x * 0.0005;
      }
      
      // Update particle positions for floating effect
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      }
      geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      animationId,
      mouse,
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isClient, particleCount, particleColor, particleSize, speed, mouseInteraction]);

  if (!isClient) {
    return (
      <div className={`${className}`} style={{ width: "100%", height: "100%" }} />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  );
}
