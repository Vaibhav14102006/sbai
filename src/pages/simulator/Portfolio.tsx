import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, TrendingDown, DollarSign, BarChart3, Eye } from 'lucide-react';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

const Portfolio: React.FC = () => {
  const [viewMode, setViewMode] = useState<'holdings' | 'performance'>('holdings');

  const holdings: Holding[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      avgCost: 165.20,
      currentPrice: 175.43,
      marketValue: 8771.50,
      gainLoss: 511.50,
      gainLossPercent: 6.19
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 25,
      avgCost: 320.00,
      currentPrice: 338.50,
      marketValue: 8462.50,
      gainLoss: 462.50,
      gainLossPercent: 5.78
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 75,
      avgCost: 120.00,
      currentPrice: 125.89,
      marketValue: 9441.75,
      gainLoss: 441.75,
      gainLossPercent: 4.91
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 30,
      avgCost: 260.00,
      currentPrice: 248.50,
      marketValue: 7455.00,
      gainLoss: -345.00,
      gainLossPercent: -4.42
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Portfolio Overview
          </h1>
          <p className="text-gray-300">Track your investments and performance</p>
        </motion.div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <span className="text-gray-400">Total Value</span>
            </div>
            <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
              <span className="text-gray-400">Total P&L</span>
            </div>
            <div className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <span className="text-gray-400">Day Change</span>
            </div>
            <div className="text-3xl font-bold text-green-400">+$1,240</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <PieChart className="w-6 h-6 text-purple-400" />
              <span className="text-gray-400">Holdings</span>
            </div>
            <div className="text-3xl font-bold text-white">{holdings.length}</div>
          </motion.div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2">
            <motion.button
              onClick={() => setViewMode('holdings')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'holdings'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Holdings
            </motion.button>
            <motion.button
              onClick={() => setViewMode('performance')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'performance'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Performance
            </motion.button>
          </div>
        </div>

        {viewMode === 'holdings' ? (
          /* Holdings Table */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Current Holdings</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Symbol</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Shares</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Avg Cost</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Current Price</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Market Value</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Gain/Loss</th>
                    <th className="text-center p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {holdings.map((holding, index) => (
                    <motion.tr
                      key={holding.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="text-lg font-semibold text-white">{holding.symbol}</div>
                          <div className="text-sm text-gray-400">{holding.name}</div>
                        </div>
                      </td>
                      <td className="p-4 text-right text-white">{holding.shares}</td>
                      <td className="p-4 text-right text-white">${holding.avgCost.toFixed(2)}</td>
                      <td className="p-4 text-right text-white">${holding.currentPrice.toFixed(2)}</td>
                      <td className="p-4 text-right text-white font-semibold">
                        ${holding.marketValue.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className={`font-semibold ${
                          holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toFixed(2)}
                        </div>
                        <div className={`text-sm ${
                          holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          ({holding.gainLossPercent >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <motion.button
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          /* Performance Chart */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Performance</h2>
            
            {/* Performance Chart Placeholder */}
            <div className="h-80 bg-gray-900/50 rounded-lg flex items-end justify-between p-4 mb-6">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-t"
                  style={{ width: '2.5%' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{ duration: 1, delay: i * 0.03 }}
                />
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">1 Month Return</div>
                <div className="text-2xl font-bold text-green-400">+8.5%</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">3 Month Return</div>
                <div className="text-2xl font-bold text-green-400">+15.2%</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">YTD Return</div>
                <div className="text-2xl font-bold text-green-400">+22.8%</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
