import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { PieChart, BarChart3, TrendingUp, Shield, Globe, Building, Coins, Zap } from 'lucide-react';

interface Asset {
  name: string;
  allocation: number;
  color: string;
  risk: 'Low' | 'Medium' | 'High';
  return: number;
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Conservative' | 'Moderate' | 'Aggressive';
  expectedReturn: number;
  volatility: number;
  assets: Asset[];
}

const PortfolioDiversification: React.FC = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('balanced');
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const portfolios: Portfolio[] = [
    {
      id: 'conservative',
      name: 'Conservative Portfolio',
      description: 'Low risk, stable returns with capital preservation focus',
      riskLevel: 'Conservative',
      expectedReturn: 6.5,
      volatility: 8.2,
      assets: [
        { name: 'Government Bonds', allocation: 40, color: '#10B981', risk: 'Low', return: 4.5 },
        { name: 'Corporate Bonds', allocation: 25, color: '#3B82F6', risk: 'Low', return: 5.2 },
        { name: 'Large Cap Stocks', allocation: 20, color: '#8B5CF6', risk: 'Medium', return: 8.1 },
        { name: 'REITs', allocation: 10, color: '#F59E0B', risk: 'Medium', return: 7.3 },
        { name: 'Cash/Money Market', allocation: 5, color: '#6B7280', risk: 'Low', return: 2.1 }
      ]
    },
    {
      id: 'balanced',
      name: 'Balanced Portfolio',
      description: 'Moderate risk with balanced growth and income approach',
      riskLevel: 'Moderate',
      expectedReturn: 9.2,
      volatility: 12.5,
      assets: [
        { name: 'Large Cap Stocks', allocation: 30, color: '#8B5CF6', risk: 'Medium', return: 8.1 },
        { name: 'Mid Cap Stocks', allocation: 20, color: '#EC4899', risk: 'Medium', return: 10.5 },
        { name: 'International Stocks', allocation: 15, color: '#06B6D4', risk: 'Medium', return: 9.8 },
        { name: 'Corporate Bonds', allocation: 20, color: '#3B82F6', risk: 'Low', return: 5.2 },
        { name: 'REITs', allocation: 10, color: '#F59E0B', risk: 'Medium', return: 7.3 },
        { name: 'Commodities', allocation: 5, color: '#EF4444', risk: 'High', return: 12.1 }
      ]
    },
    {
      id: 'aggressive',
      name: 'Aggressive Portfolio',
      description: 'High growth potential with higher risk tolerance',
      riskLevel: 'Aggressive',
      expectedReturn: 12.8,
      volatility: 18.7,
      assets: [
        { name: 'Growth Stocks', allocation: 35, color: '#EC4899', risk: 'High', return: 15.2 },
        { name: 'Small Cap Stocks', allocation: 25, color: '#8B5CF6', risk: 'High', return: 14.8 },
        { name: 'Emerging Markets', allocation: 15, color: '#06B6D4', risk: 'High', return: 13.5 },
        { name: 'Technology Stocks', allocation: 10, color: '#10B981', risk: 'High', return: 16.3 },
        { name: 'Crypto/Alternative', allocation: 10, color: '#F59E0B', risk: 'High', return: 22.1 },
        { name: 'High Yield Bonds', allocation: 5, color: '#EF4444', risk: 'Medium', return: 7.8 }
      ]
    }
  ];

  const diversificationPrinciples = [
    {
      title: 'Asset Class Diversification',
      description: 'Spread investments across stocks, bonds, real estate, and commodities',
      icon: <PieChart className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      benefit: 'Reduces correlation risk'
    },
    {
      title: 'Geographic Diversification',
      description: 'Invest in domestic and international markets',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      benefit: 'Minimizes country-specific risks'
    },
    {
      title: 'Sector Diversification',
      description: 'Distribute investments across different industry sectors',
      icon: <Building className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-400',
      benefit: 'Reduces sector concentration risk'
    },
    {
      title: 'Time Diversification',
      description: 'Invest regularly over time through dollar-cost averaging',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-red-400',
      benefit: 'Smooths market timing risk'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const selectedPortfolioData = portfolios.find(p => p.id === selectedPortfolio)!;

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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Portfolio Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.8, 1]
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
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Portfolio Diversification
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-purple-500/20 blur-xl rounded-full"
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
            Build resilient portfolios through strategic asset allocation and risk management
          </p>
        </motion.div>

        {/* Portfolio Selector */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {portfolios.map((portfolio) => (
            <motion.button
              key={portfolio.id}
              onClick={() => setSelectedPortfolio(portfolio.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedPortfolio === portfolio.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedPortfolio === portfolio.id && (
                <motion.div
                  layoutId="activePortfolio"
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{portfolio.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Portfolio Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Portfolio Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{selectedPortfolioData.name}</h3>
            <p className="text-gray-400 mb-8">{selectedPortfolioData.description}</p>
            
            {/* Asset Allocation Visualization */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <svg className="w-80 h-80 transform -rotate-90">
                  {selectedPortfolioData.assets.map((asset, index) => {
                    const previousTotal = selectedPortfolioData.assets
                      .slice(0, index)
                      .reduce((sum, a) => sum + a.allocation, 0);
                    const circumference = 2 * Math.PI * 120;
                    const strokeDasharray = circumference;
                    const strokeDashoffset = circumference - (asset.allocation / 100) * circumference;
                    const rotation = (previousTotal / 100) * 360;
                    
                    return (
                      <motion.circle
                        key={asset.name}
                        cx="160"
                        cy="160"
                        r="120"
                        stroke={asset.color}
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transformOrigin: '160px 160px', transform: `rotate(${rotation}deg)` }}
                        className="cursor-pointer hover:stroke-width-24 transition-all"
                        onMouseEnter={() => setHoveredAsset(asset.name)}
                        onMouseLeave={() => setHoveredAsset(null)}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    );
                  })}
                </svg>
                
                {/* Center Info */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {selectedPortfolioData.expectedReturn}%
                    </div>
                    <div className="text-gray-400">Expected Return</div>
                  </div>
                </div>
              </div>

              {/* Asset Legend */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {selectedPortfolioData.assets.map((asset) => (
                  <motion.div
                    key={asset.name}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      hoveredAsset === asset.name ? 'bg-white/10' : 'bg-gray-800/30'
                    }`}
                    onHoverStart={() => setHoveredAsset(asset.name)}
                    onHoverEnd={() => setHoveredAsset(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{asset.name}</div>
                      <div className="text-gray-400 text-xs">{asset.allocation}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+{asset.return}%</div>
                      <span className={`px-2 py-1 rounded text-xs ${getRiskColor(asset.risk)}`}>
                        {asset.risk}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Portfolio Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Risk Metrics */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Risk Metrics
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Risk Level</span>
                    <span className="text-white font-semibold">{selectedPortfolioData.riskLevel}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Expected Return</span>
                    <span className="text-green-400 font-semibold">{selectedPortfolioData.expectedReturn}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Volatility</span>
                    <span className="text-orange-400 font-semibold">{selectedPortfolioData.volatility}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Sharpe Ratio</span>
                    <span className="text-purple-400 font-semibold">
                      {(selectedPortfolioData.expectedReturn / selectedPortfolioData.volatility).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rebalancing Alert */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h4 className="text-lg font-bold text-white">Rebalancing Alert</h4>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Your portfolio has drifted 3.2% from target allocation. Consider rebalancing.
              </p>
              <motion.button
                className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-400 text-white rounded-lg font-medium text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Rebalance Now
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Diversification Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Diversification Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diversificationPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                variants={cardVariants}
                className="relative group perspective-1000"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Holographic Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${principle.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Principle Card */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
                  {/* Principle Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${principle.color} p-0.5 mx-auto`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        {principle.icon}
                      </div>
                    </div>
                  </div>

                  {/* Principle Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{principle.description}</p>
                    
                    {/* Benefit */}
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <div className="text-green-400 text-sm font-medium">{principle.benefit}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Builder CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Coins className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Build Your Diversified Portfolio</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Use our interactive portfolio builder to create a personalized investment strategy based on your risk tolerance and financial goals.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-green-500/50 text-green-400 rounded-lg font-medium hover:bg-green-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Examples
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioDiversification;
