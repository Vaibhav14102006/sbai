import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Clock, TrendingUp, ExternalLink, Filter, Search } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Market' | 'Economy' | 'Technology' | 'Policy';
  source: string;
  publishedAt: string;
  readTime: string;
  impact: 'High' | 'Medium' | 'Low';
  imageUrl?: string;
}

const NewsUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Federal Reserve Announces Interest Rate Decision',
      summary: 'The Fed maintains current rates while signaling potential changes in upcoming meetings based on inflation data.',
      category: 'Policy',
      source: 'Financial Times',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: '3 min',
      impact: 'High'
    },
    {
      id: '2',
      title: 'Tech Stocks Rally on AI Breakthrough News',
      summary: 'Major technology companies see significant gains following announcements of new AI capabilities and partnerships.',
      category: 'Technology',
      source: 'Reuters',
      publishedAt: '2024-01-15T08:45:00Z',
      readTime: '2 min',
      impact: 'Medium'
    },
    {
      id: '3',
      title: 'Global Markets React to Economic Data',
      summary: 'International markets show mixed reactions to latest employment and inflation figures from major economies.',
      category: 'Economy',
      source: 'Bloomberg',
      publishedAt: '2024-01-14T16:20:00Z',
      readTime: '4 min',
      impact: 'High'
    },
    {
      id: '4',
      title: 'Cryptocurrency Market Volatility Continues',
      summary: 'Digital assets experience significant price swings amid regulatory discussions and institutional adoption news.',
      category: 'Market',
      source: 'CoinDesk',
      publishedAt: '2024-01-14T14:15:00Z',
      readTime: '3 min',
      impact: 'Medium'
    }
  ];

  const categories = ['All', 'Market', 'Economy', 'Technology', 'Policy'];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-400 bg-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market': return 'from-green-500 to-emerald-400';
      case 'Economy': return 'from-blue-500 to-cyan-400';
      case 'Technology': return 'from-purple-500 to-violet-400';
      case 'Policy': return 'from-orange-500 to-red-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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
            Market News & Updates
          </h1>
          <p className="text-gray-300">Stay informed with the latest financial news and market insights</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured News */}
        {filteredNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Featured Story</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">{filteredNews[0].title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{filteredNews[0].summary}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(filteredNews[0].impact)}`}>
                    {filteredNews[0].impact} Impact
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(filteredNews[0].category)} text-white`}>
                    {filteredNews[0].category}
                  </span>
                </div>
                
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{formatTimeAgo(filteredNews[0].publishedAt)}</span>
                </div>
                <div className="text-gray-400 text-sm mb-2">Source: {filteredNews[0].source}</div>
                <div className="text-gray-400 text-sm">Read time: {filteredNews[0].readTime}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News List */}
        <div className="space-y-6">
          {filteredNews.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} flex items-center justify-center`}>
                      <Newspaper className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(item.publishedAt)}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{item.summary}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                      {item.impact} Impact
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(item.category)} text-white`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  className="p-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Market Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">+1.2%</div>
              <div className="text-gray-300">S&P 500</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">-0.8%</div>
              <div className="text-gray-300">NASDAQ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">+0.5%</div>
              <div className="text-gray-300">DOW JONES</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsUpdates;
