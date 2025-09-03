import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface WebGLSceneProps {
  className?: string;
  children?: React.ReactNode;
}

const WebGLScene: React.FC<WebGLSceneProps> = ({ className = '', children }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Position camera
    camera.position.z = 5;

    // Create vertical light shaft
    const shaftGeometry = new THREE.PlaneGeometry(0.5, 8);
    const shaftMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.6 },
        color: { value: new THREE.Color(0x00ffff) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
          float glow = 1.0 - abs(vUv.x - 0.5) * 2.0;
          float pulse = sin(time * 2.0) * 0.3 + 0.7;
          float alpha = glow * opacity * pulse;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const lightShaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    lightShaft.position.z = -2;
    scene.add(lightShaft);

    // Create expanding base ripple
    const rippleGeometry = new THREE.RingGeometry(0.1, 2, 32);
    const rippleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.3 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float ripple = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
          float fade = 1.0 - smoothstep(0.0, 1.0, dist);
          
          gl_FragColor = vec4(0.0, 1.0, 1.0, ripple * fade * opacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.y = -3;
    ripple.rotation.x = -Math.PI / 2;
    scene.add(ripple);

    // Create floating 3D icons
    const iconGeometry = new THREE.OctahedronGeometry(0.2);
    const iconMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.7
    });

    const icons: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3;
      icon.position.x = Math.cos(angle) * radius;
      icon.position.y = Math.sin(angle) * radius;
      icon.position.z = Math.random() * 2 - 1;
      icons.push(icon);
      scene.add(icon);
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Update shader uniforms
      if (shaftMaterial.uniforms) {
        shaftMaterial.uniforms.time.value = time;
      }
      if (rippleMaterial.uniforms) {
        rippleMaterial.uniforms.time.value = time;
      }
      
      // Animate floating icons
      icons.forEach((icon, i) => {
        const angle = (i / 8) * Math.PI * 2 + time * 0.2;
        const radius = 3;
        icon.position.x = Math.cos(angle) * radius;
        icon.position.y = Math.sin(angle) * radius;
        icon.rotation.x += 0.01;
        icon.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      {children && (
        <div className="absolute inset-0 pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default WebGLScene;
