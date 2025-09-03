import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Award, Users } from 'lucide-react';
import { useWebGLShaft } from '../../hooks/useWebGL';

const HeroSection: React.FC = () => {
  const webglRef = useWebGLShaft({
    color: 0x3b82f6,
    intensity: 1.2,
    height: 12,
    baseRadius: 3
  });

  const stats = [
    { label: 'Active Learners', value: '50K+', icon: Users },
    { label: 'Courses Completed', value: '100K+', icon: Award },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Background */}
      <div 
        ref={webglRef}
        className="absolute inset-0 opacity-30"
      />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-secondary-900/20 to-accent-900/20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-primary-400 font-medium">
              🚀 Trusted by 50,000+ investors worldwide
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent">
              Master the Art of
            </span>
            <motion.span 
              className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-neon-glow"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              Investment
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn, practice, and perfect your investment skills with our comprehensive
            <span className="text-primary-400 font-semibold"> SEBI-aligned </span>
            education platform. Join thousands of successful investors today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/auth">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-holographic animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </Link>

            <motion.button
              className="group flex items-center space-x-3 px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl mb-4 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 dark:from-black to-transparent" />
    </div>
  );
};

export default HeroSection;