import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, Star, Clock, Target, BarChart3, Shield, Zap } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'buy' | 'sell' | 'hold' | 'watch';
  stock: string;
  company: string;
  currentPrice: number;
  targetPrice: number;
  confidence: number;
  timeframe: string;
  reason: string;
  analyst: string;
  tags: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

const Recommendations: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'buy',
      stock: 'RELIANCE',
      company: 'Reliance Industries Ltd',
      currentPrice: 2456.75,
      targetPrice: 2800,
      confidence: 85,
      timeframe: '3-6 months',
      reason: 'Strong quarterly results and expansion in renewable energy sector',
      analyst: 'AI Market Analyzer',
      tags: ['Energy', 'Large Cap', 'Dividend'],
      riskLevel: 'Low'
    },
    {
      id: '2',
      type: 'watch',
      stock: 'TCS',
      company: 'Tata Consultancy Services',
      currentPrice: 3678.90,
      targetPrice: 3900,
      confidence: 72,
      timeframe: '2-4 months',
      reason: 'Awaiting Q3 results, potential for strong IT sector performance',
      analyst: 'Technical Analysis Bot',
      tags: ['IT', 'Large Cap', 'Export'],
      riskLevel: 'Medium'
    },
    {
      id: '3',
      type: 'buy',
      stock: 'HDFCBANK',
      company: 'HDFC Bank Limited',
      currentPrice: 1687.50,
      targetPrice: 1850,
      confidence: 78,
      timeframe: '4-8 months',
      reason: 'Banking sector recovery and improved NPA ratios',
      analyst: 'Fundamental Analysis AI',
      tags: ['Banking', 'Large Cap', 'Stable'],
      riskLevel: 'Low'
    },
    {
      id: '4',
      type: 'sell',
      stock: 'ZOMATO',
      company: 'Zomato Limited',
      currentPrice: 89.45,
      targetPrice: 75,
      confidence: 68,
      timeframe: '1-3 months',
      reason: 'Overvalued compared to fundamentals, market correction expected',
      analyst: 'Risk Assessment AI',
      tags: ['Food Tech', 'Mid Cap', 'Volatile'],
      riskLevel: 'High'
    },
    {
      id: '5',
      type: 'hold',
      stock: 'INFY',
      company: 'Infosys Limited',
      currentPrice: 1534.25,
      targetPrice: 1600,
      confidence: 75,
      timeframe: '6-12 months',
      reason: 'Stable performance with gradual growth expected',
      analyst: 'Portfolio Optimizer',
      tags: ['IT', 'Large Cap', 'Stable Growth'],
      riskLevel: 'Low'
    }
  ];

  const types = [
    { id: 'all', name: 'All Recommendations', count: recommendations.length },
    { id: 'buy', name: 'Buy', count: recommendations.filter(r => r.type === 'buy').length },
    { id: 'sell', name: 'Sell', count: recommendations.filter(r => r.type === 'sell').length },
    { id: 'hold', name: 'Hold', count: recommendations.filter(r => r.type === 'hold').length },
    { id: 'watch', name: 'Watch', count: recommendations.filter(r => r.type === 'watch').length }
  ];

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-400 bg-green-500/20';
      case 'sell': return 'text-red-400 bg-red-500/20';
      case 'hold': return 'text-yellow-400 bg-yellow-500/20';
      case 'watch': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="w-5 h-5" />;
      case 'sell': return <TrendingDown className="w-5 h-5" />;
      case 'hold': return <Target className="w-5 h-5" />;
      case 'watch': return <BarChart3 className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          AI Recommendations
        </motion.h1>
        <p className="text-gray-400">Get personalized investment recommendations powered by AI analysis</p>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active Recommendations</span>
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">{recommendations.length}</div>
          <div className="text-sm text-gray-400">Updated daily</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Confidence</span>
            <Star className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">76%</div>
          <div className="text-sm text-blue-400">High accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Success Rate</span>
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">82%</div>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Portfolio Impact</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">+12.5%</div>
          <div className="text-sm text-gray-400">Potential gain</div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedType === type.id
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            {type.name} ({type.count})
          </button>
        ))}
      </motion.div>

      {/* Recommendations List */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {filteredRecommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Stock Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${getTypeColor(rec.type)}`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{rec.stock}</h3>
                    <p className="text-gray-400">{rec.company}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium uppercase ${getTypeColor(rec.type)}`}>
                    {rec.type}
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{rec.reason}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>By {rec.analyst}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rec.timeframe}
                  </span>
                </div>
              </div>

              {/* Price & Stats */}
              <div className="lg:w-80">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Current Price</div>
                    <div className="text-lg font-bold text-white">₹{rec.currentPrice.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Target Price</div>
                    <div className="text-lg font-bold text-cyan-400">₹{rec.targetPrice.toFixed(2)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Potential Return</div>
                    <div className={`text-lg font-bold ${
                      rec.targetPrice > rec.currentPrice ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {rec.targetPrice > rec.currentPrice ? '+' : ''}
                      {(((rec.targetPrice - rec.currentPrice) / rec.currentPrice) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Confidence</div>
                    <div className="text-lg font-bold text-yellow-400">{rec.confidence}%</div>
                  </div>
                </div>

                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(rec.riskLevel)}`}>
                    {rec.riskLevel} Risk
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No recommendations found</div>
          <div className="text-gray-500">Try selecting a different filter</div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
