import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Target, Shield, AlertTriangle, TrendingDown, BarChart3, PieChart, Activity, Zap } from 'lucide-react';

interface RiskLevel {
  level: string;
  color: string;
  description: string;
  percentage: number;
}

const RiskAssessment: React.FC = () => {
  const [selectedRiskType, setSelectedRiskType] = useState('market');
  const [hoveredRisk, setHoveredRisk] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const riskTypes = [
    {
      id: 'market',
      name: 'Market Risk',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'from-red-500 to-pink-400',
      description: 'Risk of losses due to market movements',
      examples: ['Stock price volatility', 'Market crashes', 'Economic downturns']
    },
    {
      id: 'credit',
      name: 'Credit Risk',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-yellow-400',
      description: 'Risk of default by borrowers or counterparties',
      examples: ['Bond defaults', 'Company bankruptcies', 'Credit rating downgrades']
    },
    {
      id: 'liquidity',
      name: 'Liquidity Risk',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-400',
      description: 'Risk of not being able to sell investments quickly',
      examples: ['Low trading volume', 'Market freezes', 'Asset illiquidity']
    },
    {
      id: 'operational',
      name: 'Operational Risk',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-400',
      description: 'Risk from internal processes and systems',
      examples: ['System failures', 'Human errors', 'Fraud']
    }
  ];

  const riskLevels: RiskLevel[] = [
    { level: 'Conservative', color: 'from-green-500 to-emerald-400', description: 'Low risk, stable returns', percentage: 25 },
    { level: 'Moderate', color: 'from-yellow-500 to-orange-400', description: 'Balanced risk-return', percentage: 45 },
    { level: 'Aggressive', color: 'from-red-500 to-pink-400', description: 'High risk, high potential returns', percentage: 30 }
  ];

  const managementStrategies = [
    {
      title: 'Diversification',
      description: 'Spread investments across different assets',
      icon: <PieChart className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      effectiveness: 85
    },
    {
      title: 'Hedging',
      description: 'Use derivatives to offset potential losses',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      effectiveness: 75
    },
    {
      title: 'Stop Loss Orders',
      description: 'Automatically sell when losses reach a limit',
      icon: <Target className="w-8 h-8" />,
      color: 'from-orange-500 to-red-400',
      effectiveness: 70
    },
    {
      title: 'Position Sizing',
      description: 'Limit exposure by controlling investment amounts',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      effectiveness: 80
    }
  ];

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating Warning Particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/40 rounded-full"
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
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              Risk Assessment
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-red-400/20 to-orange-500/20 blur-xl rounded-full"
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
            Understand and manage investment risks to protect your portfolio
          </p>
        </motion.div>

        {/* Risk Profile Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Investor Risk Profiles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {riskLevels.map((risk, index) => (
              <motion.div
                key={risk.level}
                className="relative group"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${risk.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-700"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className={`bg-gradient-to-r ${risk.color} bg-clip-text text-transparent`}
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - risk.percentage / 100)}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - risk.percentage / 100) }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{risk.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{risk.level}</h3>
                  <p className="text-gray-400 text-sm">{risk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Types */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Types of Investment Risk</h2>
          
          {/* Risk Type Selector */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {riskTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedRiskType(type.id)}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedRiskType === type.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedRiskType === type.id && (
                  <motion.div
                    layoutId="activeRiskType"
                    className={`absolute inset-0 bg-gradient-to-r ${type.color} rounded-full`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {type.icon}
                  {type.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Selected Risk Type Details */}
          <AnimatePresence mode="wait">
            {riskTypes.map((type) => (
              selectedRiskType === type.id && (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} p-0.5`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        {type.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{type.name}</h3>
                      <p className="text-gray-400">{type.description}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Common Examples:</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {type.examples.map((example, index) => (
                        <motion.div
                          key={example}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg"
                        >
                          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300">{example}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Risk Management Strategies */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Risk Management Strategies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                variants={cardVariants}
                className="relative group perspective-1000"
                onHoverStart={() => setHoveredRisk(strategy.title)}
                onHoverEnd={() => setHoveredRisk(null)}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Holographic Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${strategy.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Strategy Card */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
                  {/* Strategy Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${strategy.color} p-0.5 mx-auto`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        {strategy.icon}
                      </div>
                    </div>

                    {/* Sparkle Effects */}
                    {hoveredRisk === strategy.title && (
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

                  {/* Strategy Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3">{strategy.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{strategy.description}</p>
                    
                    {/* Effectiveness Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Effectiveness</span>
                        <span>{strategy.effectiveness}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${strategy.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${strategy.effectiveness}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>

                    <motion.button
                      className={`w-full py-2 bg-gradient-to-r ${strategy.color} text-white rounded-lg font-medium text-sm`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Assessment Tool */}
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
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Take Your Risk Assessment</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Complete our comprehensive risk assessment questionnaire to determine your risk tolerance and get personalized investment recommendations.
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg font-medium text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Assessment
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RiskAssessment;
