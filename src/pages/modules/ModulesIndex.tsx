import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, TrendingUp, BarChart3, Users, Brain, Award, Clock, Star, Sparkles } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  icon: React.ReactNode;
  category: string;
  lessons: number;
  enrolled: number;
  rating: number;
  color: string;
}

const ModulesIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const modules: Module[] = [
    {
      id: 'stock-basics',
      title: 'Stock Market Basics',
      description: 'Learn fundamental concepts of stock markets, how they work, and basic trading principles.',
      duration: '4 hours',
      difficulty: 'Beginner',
      progress: 75,
      icon: <TrendingUp className="w-8 h-8" />,
      category: 'fundamentals',
      lessons: 12,
      enrolled: 15420,
      rating: 4.8,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment & Management',
      description: 'Understand different types of investment risks and learn strategies to manage them effectively.',
      duration: '3 hours',
      difficulty: 'Intermediate',
      progress: 45,
      icon: <Target className="w-8 h-8" />,
      category: 'risk',
      lessons: 8,
      enrolled: 12800,
      rating: 4.7,
      color: 'from-orange-500 to-red-400'
    },
    {
      id: 'algo-trading',
      title: 'Algorithmic Trading',
      description: 'Explore automated trading strategies, backtesting, and algorithmic trading platforms.',
      duration: '6 hours',
      difficulty: 'Advanced',
      progress: 20,
      icon: <Brain className="w-8 h-8" />,
      category: 'advanced',
      lessons: 15,
      enrolled: 8900,
      rating: 4.9,
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: 'portfolio-diversification',
      title: 'Portfolio Diversification',
      description: 'Master the art of building diversified portfolios to optimize returns and minimize risks.',
      duration: '5 hours',
      difficulty: 'Intermediate',
      progress: 60,
      icon: <BarChart3 className="w-8 h-8" />,
      category: 'portfolio',
      lessons: 10,
      enrolled: 11200,
      rating: 4.6,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'case-studies',
      title: 'Market Case Studies',
      description: 'Analyze real-world market scenarios, crashes, and success stories from trading history.',
      duration: '4 hours',
      difficulty: 'Intermediate',
      progress: 0,
      icon: <Users className="w-8 h-8" />,
      category: 'analysis',
      lessons: 9,
      enrolled: 9500,
      rating: 4.5,
      color: 'from-yellow-500 to-orange-400'
    },
    {
      id: 'advanced-concepts',
      title: 'Advanced Trading Concepts',
      description: 'Deep dive into complex trading strategies, derivatives, and advanced market analysis.',
      duration: '8 hours',
      difficulty: 'Advanced',
      progress: 0,
      icon: <Award className="w-8 h-8" />,
      category: 'advanced',
      lessons: 20,
      enrolled: 6800,
      rating: 4.8,
      color: 'from-indigo-500 to-purple-400'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Modules', count: modules.length },
    { id: 'fundamentals', name: 'Fundamentals', count: modules.filter(m => m.category === 'fundamentals').length },
    { id: 'risk', name: 'Risk Management', count: modules.filter(m => m.category === 'risk').length },
    { id: 'portfolio', name: 'Portfolio', count: modules.filter(m => m.category === 'portfolio').length },
    { id: 'advanced', name: 'Advanced', count: modules.filter(m => m.category === 'advanced').length },
    { id: 'analysis', name: 'Analysis', count: modules.filter(m => m.category === 'analysis').length }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const moduleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-2xl animate-bounce" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              Learning Modules
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master financial markets through our comprehensive, interactive learning modules
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Total Modules', value: modules.length, icon: <BookOpen className="w-6 h-6" /> },
            { label: 'Hours of Content', value: '30+', icon: <Clock className="w-6 h-6" /> },
            { label: 'Active Learners', value: '50K+', icon: <Users className="w-6 h-6" /> },
            { label: 'Average Rating', value: '4.7', icon: <Star className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center mb-3 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {category.name} ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredModules.map((module) => (
              <motion.div
                key={module.id}
                variants={moduleVariants}
                layout
                className="relative group perspective-1000"
                onHoverStart={() => setHoveredModule(module.id)}
                onHoverEnd={() => setHoveredModule(null)}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Holographic Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Module Card */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transform-gpu transition-all duration-500">
                  {/* Module Icon & Title */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${module.color} p-0.5 mx-auto`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        {module.icon}
                      </div>
                    </div>
                    
                    {/* Sparkle Effects */}
                    {hoveredModule === module.id && (
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: Math.random() * 1.5
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Module Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                    
                    {/* Difficulty & Duration */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                      <div>
                        <div className="text-white font-semibold">{module.lessons}</div>
                        <div className="text-gray-400">Lessons</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{module.enrolled.toLocaleString()}</div>
                        <div className="text-gray-400">Enrolled</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {module.rating}
                        </div>
                        <div className="text-gray-400">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {module.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${module.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    className={`w-full py-3 bg-gradient-to-r ${module.color} text-white rounded-lg font-medium hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulesIndex;
