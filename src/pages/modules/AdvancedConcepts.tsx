import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, BarChart3, Activity, Layers, Cpu, Settings, ChevronRight } from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  category: 'Derivatives' | 'Quantitative' | 'Behavioral' | 'Alternative';
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  keyPoints: string[];
  applications: string[];
  color: string;
  icon: React.ReactNode;
}

const AdvancedConcepts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const categories = ['All', 'Derivatives', 'Quantitative', 'Behavioral', 'Alternative'];

  const concepts: Concept[] = [
    {
      id: 'options-strategies',
      title: 'Advanced Options Strategies',
      category: 'Derivatives',
      difficulty: 'Advanced',
      description: 'Complex multi-leg options strategies for sophisticated risk management and profit generation.',
      keyPoints: [
        'Iron Condor and Butterfly spreads',
        'Calendar and diagonal spreads',
        'Volatility trading strategies',
        'Greeks management and hedging'
      ],
      applications: [
        'Income generation in sideways markets',
        'Volatility arbitrage opportunities',
        'Portfolio hedging strategies',
        'Risk-defined speculation'
      ],
      color: 'from-purple-500 to-violet-400',
      icon: <Target className="w-8 h-8" />
    },
    {
      id: 'quantitative-models',
      title: 'Quantitative Trading Models',
      category: 'Quantitative',
      difficulty: 'Expert',
      description: 'Mathematical models and statistical methods for systematic trading and risk management.',
      keyPoints: [
        'Black-Scholes and extensions',
        'Monte Carlo simulations',
        'Factor models and PCA',
        'Machine learning applications'
      ],
      applications: [
        'Algorithmic trading systems',
        'Risk model development',
        'Portfolio optimization',
        'Derivative pricing'
      ],
      color: 'from-blue-500 to-cyan-400',
      icon: <Brain className="w-8 h-8" />
    },
    {
      id: 'behavioral-finance',
      title: 'Behavioral Finance Principles',
      category: 'Behavioral',
      difficulty: 'Intermediate',
      description: 'Understanding psychological biases and market anomalies that drive investor behavior.',
      keyPoints: [
        'Cognitive biases in decision making',
        'Market sentiment indicators',
        'Herding behavior patterns',
        'Prospect theory applications'
      ],
      applications: [
        'Contrarian investment strategies',
        'Market timing techniques',
        'Risk perception analysis',
        'Behavioral portfolio theory'
      ],
      color: 'from-green-500 to-emerald-400',
      icon: <Activity className="w-8 h-8" />
    },
    {
      id: 'alternative-investments',
      title: 'Alternative Investment Strategies',
      category: 'Alternative',
      difficulty: 'Advanced',
      description: 'Non-traditional investment vehicles and strategies beyond stocks and bonds.',
      keyPoints: [
        'Private equity and venture capital',
        'Hedge fund strategies',
        'Real estate investment trusts',
        'Commodity and currency trading'
      ],
      applications: [
        'Portfolio diversification',
        'Inflation hedging strategies',
        'Absolute return generation',
        'Risk-adjusted performance'
      ],
      color: 'from-orange-500 to-red-400',
      icon: <Layers className="w-8 h-8" />
    },
    {
      id: 'risk-parity',
      title: 'Risk Parity & Factor Investing',
      category: 'Quantitative',
      difficulty: 'Advanced',
      description: 'Advanced portfolio construction techniques based on risk contribution and factor exposure.',
      keyPoints: [
        'Risk budgeting frameworks',
        'Factor decomposition analysis',
        'Equal risk contribution',
        'Smart beta strategies'
      ],
      applications: [
        'Institutional portfolio management',
        'Risk-balanced allocations',
        'Factor-based investing',
        'Volatility targeting'
      ],
      color: 'from-teal-500 to-blue-400',
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      id: 'market-microstructure',
      title: 'Market Microstructure',
      category: 'Quantitative',
      difficulty: 'Expert',
      description: 'Deep dive into how markets operate, price discovery, and execution mechanisms.',
      keyPoints: [
        'Order book dynamics',
        'High-frequency trading impact',
        'Market making strategies',
        'Liquidity provision mechanisms'
      ],
      applications: [
        'Optimal execution algorithms',
        'Market impact modeling',
        'Liquidity risk management',
        'Trading cost analysis'
      ],
      color: 'from-pink-500 to-purple-400',
      icon: <Cpu className="w-8 h-8" />
    }
  ];

  const filteredConcepts = selectedCategory === 'All' 
    ? concepts 
    : concepts.filter(concept => concept.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Expert': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Derivatives': return <Target className="w-5 h-5" />;
      case 'Quantitative': return <Brain className="w-5 h-5" />;
      case 'Behavioral': return <Activity className="w-5 h-5" />;
      case 'Alternative': return <Layers className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
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

  const conceptVariants = {
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
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Neural Network Particles */}
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/70 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 3, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
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
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              Advanced Concepts
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-cyan-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
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
            Master sophisticated financial concepts and advanced trading strategies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {getCategoryIcon(category)}
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Concepts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              variants={conceptVariants}
              className="relative group perspective-1000 cursor-pointer"
              onHoverStart={() => setHoveredConcept(concept.id)}
              onHoverEnd={() => setHoveredConcept(null)}
              onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                z: 30
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Holographic Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${concept.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Concept Card */}
              <div className={`relative bg-black/60 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300 ${
                selectedConcept === concept.id ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(concept.difficulty)}`}>
                    {concept.difficulty}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {concept.category}
                  </div>
                </div>

                {/* Concept Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${concept.color} p-0.5 mx-auto`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      {concept.icon}
                    </div>
                  </div>

                  {/* Neural Connections */}
                  {hoveredConcept === concept.id && (
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 2, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Concept Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3">{concept.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{concept.description}</p>
                  
                  {/* Quick Preview */}
                  <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
                    <div className="text-left">
                      <div className="text-xs text-gray-400 mb-2">Key Areas:</div>
                      <div className="text-sm text-gray-300">
                        {concept.keyPoints.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className={`w-full py-2 bg-gradient-to-r ${concept.color} text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap className="w-4 h-4" />
                    Explore Concept
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Concept View */}
        <AnimatePresence>
          {selectedConcept && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {filteredConcepts.map((concept) => (
                selectedConcept === concept.id && (
                  <div key={concept.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Key Points */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          {concept.icon}
                          {concept.title}
                        </h3>
                        
                        <h4 className="text-xl font-bold text-white mb-4">Key Concepts</h4>
                        <div className="space-y-3 mb-8">
                          {concept.keyPoints.map((point, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg"
                            >
                              <ChevronRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Applications */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4">Practical Applications</h4>
                        <div className="space-y-3">
                          {concept.applications.map((application, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`p-4 bg-gradient-to-r ${concept.color} bg-opacity-10 border border-white/10 rounded-lg`}
                            >
                              <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-white" />
                                <span className="text-gray-300">{application}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Interactive Elements */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                          <motion.button
                            className={`py-3 bg-gradient-to-r ${concept.color} text-white rounded-lg font-medium text-sm`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Start Learning
                          </motion.button>
                          <motion.button
                            className="py-3 border border-white/20 text-gray-300 rounded-lg font-medium text-sm hover:bg-white/5 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Examples
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Master Advanced Finance</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take your financial knowledge to the next level with our comprehensive advanced concepts program.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Advanced Track
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-purple-500/50 text-purple-400 rounded-lg font-medium hover:bg-purple-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Prerequisites
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedConcepts;
