import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Brain, Code, BarChart3, Zap, Cpu, TrendingUp, Activity, Settings, Play, Pause } from 'lucide-react';

interface Algorithm {
  id: string;
  name: string;
  description: string;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  performance: number;
  winRate: number;
  active: boolean;
  color: string;
}

const AlgoTrading: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);
  const [hoveredAlgo, setHoveredAlgo] = useState<string | null>(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const algorithms: Algorithm[] = [
    {
      id: 'momentum',
      name: 'Momentum Strategy',
      description: 'Follows trending stocks with strong price movements',
      complexity: 'Basic',
      performance: 12.5,
      winRate: 68,
      active: true,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'meanreversion',
      name: 'Mean Reversion',
      description: 'Exploits price deviations from historical averages',
      complexity: 'Intermediate',
      performance: 8.7,
      winRate: 72,
      active: false,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'arbitrage',
      name: 'Statistical Arbitrage',
      description: 'Identifies price discrepancies between related assets',
      complexity: 'Advanced',
      performance: 15.2,
      winRate: 78,
      active: true,
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      description: 'Uses AI to predict price movements and optimize trades',
      complexity: 'Advanced',
      performance: 18.9,
      winRate: 82,
      active: false,
      color: 'from-pink-500 to-rose-400'
    }
  ];

  const tradingMetrics = [
    { label: 'Total Trades', value: '1,247', change: '+12%' },
    { label: 'Win Rate', value: '74.3%', change: '+2.1%' },
    { label: 'Avg Return', value: '13.8%', change: '+0.9%' },
    { label: 'Sharpe Ratio', value: '2.14', change: '+0.15%' }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'text-green-400 bg-green-500/20';
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

  const algoVariants = {
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
        
        {/* Circuit-like Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              Algorithmic Trading
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
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
            Master automated trading strategies powered by advanced algorithms and AI
          </p>
        </motion.div>

        {/* Trading Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {tradingMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="relative group"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center mb-3 text-purple-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
                <div className="text-green-400 text-xs font-medium">{metric.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Algorithm Portfolio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Algorithm Portfolio</h2>
            <motion.button
              onClick={() => setIsSimulationRunning(!isSimulationRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isSimulationRunning 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSimulationRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isSimulationRunning ? 'Stop Simulation' : 'Start Simulation'}
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithms.map((algo, index) => (
              <motion.div
                key={algo.id}
                variants={algoVariants}
                className="relative group perspective-1000 cursor-pointer"
                onHoverStart={() => setHoveredAlgo(algo.id)}
                onHoverEnd={() => setHoveredAlgo(null)}
                onClick={() => setSelectedAlgo(selectedAlgo === algo.id ? null : algo.id)}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Holographic Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${algo.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Algorithm Card */}
                <div className={`relative bg-black/60 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300 ${
                  selectedAlgo === algo.id ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10'
                }`}>
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-3 h-3 rounded-full ${algo.active ? 'bg-green-400' : 'bg-gray-500'}`}>
                      {algo.active && isSimulationRunning && (
                        <motion.div
                          className="w-3 h-3 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(algo.complexity)}`}>
                      {algo.complexity}
                    </span>
                  </div>

                  {/* Algorithm Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${algo.color} p-0.5 mx-auto`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        <Brain className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Circuit Effects */}
                    {hoveredAlgo === algo.id && (
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
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

                  {/* Algorithm Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{algo.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{algo.description}</p>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-lg font-bold text-green-400">+{algo.performance}%</div>
                        <div className="text-gray-400 text-xs">Performance</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-400">{algo.winRate}%</div>
                        <div className="text-gray-400 text-xs">Win Rate</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        className={`flex-1 py-2 bg-gradient-to-r ${algo.color} text-white rounded-lg font-medium text-sm`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Configure
                      </motion.button>
                      <motion.button
                        className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Algorithm Details */}
        <AnimatePresence>
          {selectedAlgo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {algorithms.map((algo) => (
                selectedAlgo === algo.id && (
                  <div key={algo.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Code Preview */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Code className="w-6 h-6 text-purple-400" />
                          Algorithm Code
                        </h3>
                        <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
                          <div className="text-gray-500">// {algo.name} Implementation</div>
                          <div className="text-blue-400">function <span className="text-yellow-400">{algo.id}Strategy</span>() &#123;</div>
                          <div className="ml-4 text-gray-300">
                            <div>const signals = analyzeMarketData();</div>
                            <div>const position = calculatePosition(signals);</div>
                            <div className="text-green-400">return executeOrder(position);</div>
                          </div>
                          <div className="text-blue-400">&#125;</div>
                        </div>
                      </div>

                      {/* Performance Chart */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <BarChart3 className="w-6 h-6 text-green-400" />
                          Performance Chart
                        </h3>
                        <div className="bg-gray-900/50 rounded-lg p-4 h-48 flex items-end justify-between">
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`bg-gradient-to-t ${algo.color} rounded-t`}
                              style={{ width: '6%' }}
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.random() * 80 + 20}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Build Your First Algorithm</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Start with our interactive algorithm builder and learn to create, backtest, and deploy your own trading strategies.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Tutorials
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgoTrading;
