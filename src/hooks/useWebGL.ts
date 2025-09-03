import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WebGLShaftOptions {
  color?: number;
  intensity?: number;
  height?: number;
  baseRadius?: number;
}

export const useWebGLShaft = (options: WebGLShaftOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { color = 0x3b82f6, intensity = 1, height = 8, baseRadius = 2 } = options;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create light shaft geometry
    const shaftGeometry = new THREE.ConeGeometry(0.1, height, 8);
    const baseGeometry = new THREE.RingGeometry(0, baseRadius, 32);

    // Shader material for glowing effect
    const shaftMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float intensity;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float glow = pow(1.0 - abs(vPosition.x) * 0.5, 2.0);
          float pulse = sin(time * 2.0) * 0.3 + 0.7;
          vec3 finalColor = color * glow * intensity * pulse;
          float alpha = glow * 0.8;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity * 0.3 },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float intensity;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - vec2(0.5));
          float ripple = sin(dist * 10.0 - time * 3.0) * 0.1 + 0.9;
          float fade = 1.0 - smoothstep(0.0, 0.5, dist);
          vec3 finalColor = color * intensity * ripple;
          float alpha = fade * 0.6;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    // Create meshes
    const shaftMesh = new THREE.Mesh(shaftGeometry, shaftMaterial);
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    
    shaftMesh.position.y = height / 2;
    baseMesh.rotation.x = -Math.PI / 2;
    baseMesh.position.y = -0.1;

    scene.add(shaftMesh);
    scene.add(baseMesh);

    // Position camera
    camera.position.z = 10;
    camera.position.y = height / 2;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      if (!scene || !renderer) return;
      
      const time = Date.now() * 0.001;
      shaftMaterial.uniforms.time.value = time;
      baseMaterial.uniforms.time.value = time;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container && renderer?.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      shaftGeometry.dispose();
      baseGeometry.dispose();
      shaftMaterial.dispose();
      baseMaterial.dispose();
    };
  }, [options]);

  return containerRef;
};