import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Filter, Download, Search } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

const TransactionHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-15 10:30:00',
      type: 'buy',
      symbol: 'AAPL',
      quantity: 50,
      price: 165.20,
      total: 8260.00,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-14 14:45:00',
      type: 'buy',
      symbol: 'MSFT',
      quantity: 25,
      price: 320.00,
      total: 8000.00,
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-13 09:15:00',
      type: 'sell',
      symbol: 'GOOGL',
      quantity: 10,
      price: 118.50,
      total: 1185.00,
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-01-12 16:20:00',
      type: 'buy',
      symbol: 'TSLA',
      quantity: 30,
      price: 260.00,
      total: 7800.00,
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-01-11 11:00:00',
      type: 'buy',
      symbol: 'GOOGL',
      quantity: 75,
      price: 120.00,
      total: 9000.00,
      status: 'completed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Transaction History
          </h1>
          <p className="text-gray-300">Review your trading activity and performance</p>
        </motion.div>

        {/* Filters and Search */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by symbol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="flex gap-2">
                {(['all', 'buy', 'sell'] as const).map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filterType === type
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'border border-gray-600 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Transaction Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" />
              Recent Transactions
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Date & Time</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Symbol</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Quantity</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Price</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Total</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-white">{new Date(transaction.date).toLocaleDateString()}</div>
                      <div className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleTimeString()}</div>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center gap-2 ${
                        transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'buy' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-white">{transaction.symbol}</div>
                    </td>
                    <td className="p-4 text-right text-white">{transaction.quantity}</td>
                    <td className="p-4 text-right text-white">${transaction.price.toFixed(2)}</td>
                    <td className="p-4 text-right text-white font-semibold">
                      ${transaction.total.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Total Trades</div>
            <div className="text-3xl font-bold text-white">{transactions.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Total Volume</div>
            <div className="text-3xl font-bold text-white">
              ${transactions.reduce((sum, t) => sum + t.total, 0).toLocaleString()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Buy Orders</div>
            <div className="text-3xl font-bold text-green-400">
              {transactions.filter(t => t.type === 'buy').length}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Sell Orders</div>
            <div className="text-3xl font-bold text-red-400">
              {transactions.filter(t => t.type === 'sell').length}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
