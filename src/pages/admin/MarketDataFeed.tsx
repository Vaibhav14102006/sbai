import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, TrendingDown, Activity, RefreshCw, Settings, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  status: 'active' | 'delayed' | 'error';
  lastUpdate: string;
}

const MarketDataFeed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Sample market data
  const marketData: MarketData[] = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: 45678900,
      marketCap: '2.8T',
      status: 'active',
      lastUpdate: '2025-09-03 22:40:00'
    },
    {
      id: '2',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 138.21,
      change: -1.87,
      changePercent: -1.33,
      volume: 23456789,
      marketCap: '1.7T',
      status: 'active',
      lastUpdate: '2025-09-03 22:40:00'
    },
    {
      id: '3',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 378.85,
      change: 4.32,
      changePercent: 1.15,
      volume: 34567890,
      marketCap: '2.8T',
      status: 'delayed',
      lastUpdate: '2025-09-03 22:35:00'
    },
    {
      id: '4',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: -8.75,
      changePercent: -3.40,
      volume: 67890123,
      marketCap: '790B',
      status: 'active',
      lastUpdate: '2025-09-03 22:40:00'
    },
    {
      id: '5',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.30,
      change: 15.60,
      changePercent: 1.81,
      volume: 45123678,
      marketCap: '2.2T',
      status: 'error',
      lastUpdate: '2025-09-03 22:30:00'
    }
  ];

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'gainers' && item.change > 0) ||
                           (selectedCategory === 'losers' && item.change < 0) ||
                           (selectedCategory === 'high-volume' && item.volume > 40000000);
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch(status) {
      case 'active': 
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>
          <CheckCircle className="w-3 h-3" />Live
        </span>;
      case 'delayed':
        return <span className={`${baseClasses} bg-yellow-900/30 text-yellow-400`}>
          <AlertTriangle className="w-3 h-3" />Delayed
        </span>;
      case 'error':
        return <span className={`${baseClasses} bg-red-900/30 text-red-400`}>
          <XCircle className="w-3 h-3" />Error
        </span>;
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    return volume.toLocaleString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full p-6"
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Market Data Feed</h1>
              <p className="text-gray-400">Monitor real-time market data and feed status</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  autoRefresh 
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span>Auto Refresh</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{marketData.filter(d => d.status === 'active').length}</div>
                  <div className="text-sm text-gray-400">Active Feeds</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{marketData.filter(d => d.status === 'delayed').length}</div>
                  <div className="text-sm text-gray-400">Delayed</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg p-4 border border-red-500/20">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{marketData.filter(d => d.status === 'error').length}</div>
                  <div className="text-sm text-gray-400">Errors</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{Math.round((marketData.filter(d => d.status === 'active').length / marketData.length) * 100)}%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search symbols or companies..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Stocks</option>
                <option value="gainers">Top Gainers</option>
                <option value="losers">Top Losers</option>
                <option value="high-volume">High Volume</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="delayed">Delayed</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>

        {/* Market Data List */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-700/50 bg-gray-800/30 text-gray-400 text-sm font-medium">
              <div className="col-span-3">Symbol</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Change</div>
              <div className="col-span-2">Volume</div>
              <div className="col-span-2">Market Cap</div>
              <div className="col-span-1">Status</div>
            </div>

            {/* Table Rows */}
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors duration-200"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {item.change >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{item.symbol}</div>
                      <div className="text-xs text-gray-400">{item.name}</div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="text-white font-medium">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className={`text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="font-medium">
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                      </div>
                      <div className="text-xs">
                        ({item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-300">
                    {formatVolume(item.volume)}
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-300">
                    {item.marketCap}
                  </div>
                  <div className="col-span-1 flex items-center">
                    {getStatusBadge(item.status)}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <Activity className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white">No market data found</h3>
                <p className="mt-1 text-sm text-gray-400 max-w-md">
                  {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                    ? 'No data matches your search criteria. Try adjusting your filters.'
                    : 'Market data feed is currently unavailable.'}
                </p>
                <button className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh Data</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50 text-xs text-gray-400 flex justify-between items-center">
          <div>Last updated: {new Date().toLocaleString()}</div>
          <div className="flex items-center gap-4">
            <span>Data Provider: Alpha Vantage</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketDataFeed;
