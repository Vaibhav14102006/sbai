import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Clock, Target, Zap } from 'lucide-react';

interface Order {
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'market' | 'limit' | 'stop';
}

const TradingExecution: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(10);
  const [limitPrice, setLimitPrice] = useState(175.43);
  const [balance] = useState(50000);

  const stockData = {
    AAPL: { price: 175.43, change: 2.34, changePercent: 1.35 },
    MSFT: { price: 338.50, change: -1.25, changePercent: -0.37 },
    GOOGL: { price: 125.89, change: 3.45, changePercent: 2.82 },
    TSLA: { price: 248.50, change: -5.67, changePercent: -2.23 }
  };

  const currentStock = stockData[selectedStock as keyof typeof stockData];
  const totalCost = quantity * (orderType === 'market' ? currentStock.price : limitPrice);

  const handlePlaceOrder = () => {
    console.log('Order placed:', {
      type: tradeType,
      symbol: selectedStock,
      quantity,
      price: orderType === 'market' ? currentStock.price : limitPrice,
      orderType
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Trading Platform
          </h1>
          <p className="text-gray-300">Execute trades with our advanced trading simulator</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stock Selection */}
          <div className="lg:col-span-2">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Select Stock</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stockData).map(([symbol, data]) => (
                  <motion.button
                    key={symbol}
                    onClick={() => setSelectedStock(symbol)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedStock === symbol
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-lg font-bold text-white">{symbol}</div>
                    <div className="text-2xl font-bold text-white">${data.price}</div>
                    <div className={`text-sm ${
                      data.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Place Order</h2>
              
              {/* Buy/Sell Toggle */}
              <div className="flex gap-4 mb-6">
                <motion.button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    tradeType === 'buy'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  Buy
                </motion.button>
                <motion.button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    tradeType === 'sell'
                      ? 'bg-gradient-to-r from-red-500 to-pink-400 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  Sell
                </motion.button>
              </div>

              {/* Order Type */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Order Type</label>
                <div className="flex gap-2">
                  {(['market', 'limit', 'stop'] as const).map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderType === type
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-600 text-gray-400 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  min="1"
                />
              </div>

              {/* Limit Price (if limit order) */}
              {orderType === 'limit' && (
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Limit Price</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    step="0.01"
                  />
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Symbol:</span>
                    <span className="text-white">{selectedStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white">{quantity} shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white">
                      ${orderType === 'market' ? currentStock.price.toFixed(2) : limitPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                onClick={handlePlaceOrder}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 ${
                  tradeType === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                    : 'bg-gradient-to-r from-red-500 to-pink-400'
                } text-white`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={totalCost > balance && tradeType === 'buy'}
              >
                <Zap className="w-5 h-5" />
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedStock}
              </motion.button>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account Balance</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${balance.toLocaleString()}
              </div>
              <div className="text-gray-400">Available Cash</div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Market Status</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold">Market Open</span>
              </div>
              <div className="text-gray-400 text-sm">
                Trading hours: 9:30 AM - 4:00 PM EST
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Portfolio Value:</span>
                  <span className="text-white font-semibold">$52,340</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Day P&L:</span>
                  <span className="text-green-400 font-semibold">+$1,240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total P&L:</span>
                  <span className="text-green-400 font-semibold">+$2,340</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingExecution;
