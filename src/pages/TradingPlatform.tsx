import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Activity, Eye } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const TradingPlatform: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [portfolio, setPortfolio] = useState({
    balance: 100000,
    totalValue: 125000,
    dayChange: 2500,
    dayChangePercent: 2.04
  });

  const stocks: Stock[] = [
  { symbol: 'RELIANCE', name: "Reliance Industries (InvestEd: India's Multilingual Stock Market Learning Platform)", price: 2456.75, change: 45.20, changePercent: 1.87, volume: '2.5M' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90, change: -23.45, changePercent: -0.63, volume: '1.8M' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1534.25, change: 18.75, changePercent: 1.24, volume: '3.2M' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1687.50, change: -12.30, changePercent: -0.72, volume: '4.1M' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: 945.80, change: 8.90, changePercent: 0.95, volume: '2.9M' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', price: 876.45, change: 15.60, changePercent: 1.81, volume: '1.7M' }
  ];

  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'INFY']);

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Trading Platform
        </motion.h1>
        <p className="text-gray-400">Practice trading with virtual money in real market conditions</p>
      </div>

      {/* Portfolio Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Portfolio Value</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹{portfolio.totalValue.toLocaleString()}</div>
          <div className={`text-sm ${portfolio.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.dayChange >= 0 ? '+' : ''}₹{portfolio.dayChange.toLocaleString()} ({portfolio.dayChangePercent}%)
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Available Balance</span>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹{portfolio.balance.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Ready to invest</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active Positions</span>
            <PieChart className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-sm text-gray-400">Stocks held</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Today's P&L</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">+₹2,500</div>
          <div className="text-sm text-green-400">+2.04%</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stock List */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-6 text-white">Market Watch</h2>
            <div className="space-y-4">
              {stocks.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStock(stock)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{stock.symbol}</div>
                      <div className="text-sm text-gray-400">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-white">₹{stock.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent}%)
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        watchlist.includes(stock.symbol) ? removeFromWatchlist(stock.symbol) : addToWatchlist(stock.symbol);
                      }}
                      className={`p-2 rounded-full transition-all ${
                        watchlist.includes(stock.symbol) 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-gray-700/50 text-gray-400 hover:bg-yellow-500/20 hover:text-yellow-400'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trading Panel */}
        <div>
          <motion.div 
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Quick Trade</h3>
            {selectedStock ? (
              <div>
                <div className="mb-4">
                  <div className="font-semibold text-white">{selectedStock.symbol}</div>
                  <div className="text-2xl font-bold text-white">₹{selectedStock.price.toFixed(2)}</div>
                  <div className={`text-sm ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}₹{selectedStock.change.toFixed(2)} ({selectedStock.changePercent}%)
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Quantity</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      placeholder="Enter quantity"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all">
                      BUY
                    </button>
                    <button className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition-all">
                      SELL
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Select a stock to start trading
              </div>
            )}
          </motion.div>

          {/* Watchlist */}
          <motion.div 
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Watchlist</h3>
            <div className="space-y-3">
              {watchlist.map((symbol) => {
                const stock = stocks.find(s => s.symbol === symbol);
                if (!stock) return null;
                return (
                  <div key={symbol} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                      <div className="text-xs text-gray-400">₹{stock.price.toFixed(2)}</div>
                    </div>
                    <div className={`text-xs ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.changePercent}%
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TradingPlatform;
