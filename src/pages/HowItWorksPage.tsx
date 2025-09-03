import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, TrendingUp, Award, ArrowRight, Play } from 'lucide-react';
import * as THREE from 'three';

const HowItWorksPage: React.FC = () => {
  const cubesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cubesRef.current) return;

    // Create 3D cubes for each step
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(cubesRef.current.offsetWidth, 400);
    renderer.setClearColor(0x000000, 0);
    cubesRef.current.appendChild(renderer.domElement);

    // Create cubes
    const cubes: THREE.Mesh[] = [];
    const colors = [0x3b82f6, 0x10b981, 0x8b5cf6];
    
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ 
        color: colors[i],
        transparent: true,
        opacity: 0.8,
        wireframe: false
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = (i - 1) * 3;
      cube.position.y = 0;
      cubes.push(cube);
      scene.add(cube);

      // Add wireframe
      const wireframe = new THREE.WireframeGeometry(geometry);
      const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: colors[i] }));
      line.position.copy(cube.position);
      scene.add(line);
    }

    // Create connecting light beams
    const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
    const beamMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });

    const beam1 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam1.rotation.z = Math.PI / 2;
    beam1.position.x = -1.25;
    scene.add(beam1);

    const beam2 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam2.rotation.z = Math.PI / 2;
    beam2.position.x = 1.25;
    scene.add(beam2);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
      });

      // Animate beams
      beam1.material.opacity = 0.3 + Math.sin(Date.now() * 0.003) * 0.3;
      beam2.material.opacity = 0.3 + Math.sin(Date.now() * 0.003 + Math.PI) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (cubesRef.current && renderer.domElement) {
        cubesRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Learn',
      subtitle: 'Master the Fundamentals',
      description: 'Start with interactive modules covering stock market basics, risk assessment, and investment strategies. Our SEBI-aligned content ensures you learn the right concepts.',
      features: ['Interactive Video Lessons', 'Real-world Case Studies', 'Progress Tracking', 'Multi-language Support'],
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      number: 2,
      title: 'Quiz',
      subtitle: 'Test Your Knowledge',
      description: 'Reinforce learning through gamified quizzes and assessments. Earn badges, compete on leaderboards, and track your progress with detailed analytics.',
      features: ['Adaptive Questioning', 'Instant Feedback', 'Performance Analytics', 'Certification Prep'],
      icon: Brain,
      color: 'from-green-500 to-emerald-400'
    },
    {
      number: 3,
      title: 'Simulate',
      subtitle: 'Practice Risk-Free Trading',
      description: 'Apply your knowledge in our advanced trading simulator with real market data. Build confidence before investing real money.',
      features: ['Real Market Data', 'Portfolio Management', 'Risk Analysis', 'Performance Tracking'],
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Your Journey to
              <br />
              Investment Mastery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Follow our proven 3-step methodology: Learn the concepts, Quiz yourself, and Simulate real trading. 
              Master investing through hands-on experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-white"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 3D Interactive Flow */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Interactive Learning Flow</h2>
            <p className="text-xl text-gray-400">Experience our 3D learning methodology</p>
          </motion.div>

          <div ref={cubesRef} className="mb-16 flex justify-center" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all h-full">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <h4 className="text-lg text-gray-300 mb-4">{step.subtitle}</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mr-3`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Detailed Learning Process</h2>
            <p className="text-xl text-gray-400">Deep dive into each step of your learning journey</p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                step: 'STEP 1',
                title: 'Foundation Learning',
                description: 'Begin with comprehensive modules covering market fundamentals, regulatory frameworks, and investment principles.',
                details: [
                  'Stock Market Basics & Terminology',
                  'SEBI Guidelines & Compliance',
                  'Risk Assessment & Management',
                  'Portfolio Theory & Diversification'
                ],
                visual: 'Interactive video lessons with real-time examples'
              },
              {
                step: 'STEP 2',
                title: 'Knowledge Validation',
                description: 'Test your understanding through adaptive quizzes that adjust difficulty based on your performance.',
                details: [
                  'Adaptive Question Engine',
                  'Immediate Feedback & Explanations',
                  'Progress Tracking & Analytics',
                  'Certification Preparation'
                ],
                visual: 'Gamified assessments with instant results'
              },
              {
                step: 'STEP 3',
                title: 'Practical Application',
                description: 'Apply knowledge in our advanced simulator with real market conditions and comprehensive analytics.',
                details: [
                  'Real-time Market Data Integration',
                  'Advanced Order Types & Strategies',
                  'Portfolio Performance Analysis',
                  'Risk Simulation & Stress Testing'
                ],
                visual: 'Professional trading interface with full analytics'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2">
                  <div className="text-blue-400 font-semibold mb-2">{process.step}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{process.title}</h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{process.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {process.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="text-sm text-gray-400 italic">
                    💡 {process.visual}
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-white">{index + 1}</span>
                        </div>
                        <p className="text-sm">Interactive Demo</p>
                        <p className="text-xs text-gray-500 mt-1">{process.title}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of learners who have mastered investing through our proven methodology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-white"
              >
                Start Learning Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
