import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Globe } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const MarketOverview: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const marketData = {
    indices: [
      { name: 'S&P 500', value: 4185.47, change: 23.45, changePercent: 0.56 },
      { name: 'NASDAQ', value: 12756.33, change: -45.67, changePercent: -0.36 },
      { name: 'DOW JONES', value: 33875.40, change: 156.82, changePercent: 0.47 }
    ],
    topStocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35, volume: '45.2M' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 338.50, change: -1.25, changePercent: -0.37, volume: '28.7M' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.89, change: 3.45, changePercent: 2.82, volume: '32.1M' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -5.67, changePercent: -2.23, volume: '67.8M' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 142.75, change: 1.89, changePercent: 1.34, volume: '41.3M' }
    ]
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent mb-4">
            Market Overview
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time market data and trading simulator
          </p>
        </motion.div>

        {/* Market Indices */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {marketData.indices.map((index, i) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{index.name}</h3>
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {index.value.toLocaleString()}
              </div>
              <div className={`flex items-center gap-2 ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {index.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Market Chart</h2>
            <div className="flex gap-2">
              {(['1D', '1W', '1M', '1Y'] as const).map((timeframe) => (
                <motion.button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white border border-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {timeframe}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 bg-gray-900/50 rounded-lg flex items-end justify-between p-4">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-t from-green-500 to-blue-400 rounded-t"
                style={{ width: '3%' }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Top Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Top Movers
            </h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {marketData.topStocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {stock.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{stock.symbol}</h3>
                      <p className="text-gray-400 text-sm">{stock.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">${stock.price.toFixed(2)}</div>
                    <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">Volume</div>
                    <div className="text-white font-semibold">{stock.volume}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trading CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <DollarSign className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Start Trading</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Practice trading with virtual money in our realistic market simulator.
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Trading Platform
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketOverview;
