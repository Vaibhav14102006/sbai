import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, TrendingUp, Award, Calendar, Search, Filter } from 'lucide-react';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'Discussion' | 'Question' | 'Analysis' | 'News';
  likes: number;
  replies: number;
  timestamp: string;
  tags: string[];
}

const CommunityHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      title: 'Market Analysis: Tech Stocks Outlook for Q2',
      content: 'After analyzing recent earnings reports and market trends, I believe tech stocks are positioned for...',
      author: 'TechTrader99',
      category: 'Analysis',
      likes: 45,
      replies: 12,
      timestamp: '2024-01-15T10:30:00Z',
      tags: ['tech', 'analysis', 'Q2']
    },
    {
      id: '2',
      title: 'Question: Best strategy for dividend investing?',
      content: 'I\'m new to dividend investing and looking for advice on building a solid dividend portfolio...',
      author: 'NewInvestor2024',
      category: 'Question',
      likes: 28,
      replies: 18,
      timestamp: '2024-01-15T08:45:00Z',
      tags: ['dividends', 'strategy', 'beginner']
    },
    {
      id: '3',
      title: 'Fed Rate Decision Impact Discussion',
      content: 'With the recent Fed announcement, how do you think this will affect different sectors?',
      author: 'MarketWatcher',
      category: 'Discussion',
      likes: 67,
      replies: 24,
      timestamp: '2024-01-14T16:20:00Z',
      tags: ['fed', 'rates', 'sectors']
    }
  ];

  const categories = ['All', 'Discussion', 'Question', 'Analysis', 'News'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Discussion': return 'text-blue-400 bg-blue-500/20';
      case 'Question': return 'text-green-400 bg-green-500/20';
      case 'Analysis': return 'text-purple-400 bg-purple-500/20';
      case 'News': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
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
            Community Hub
          </h1>
          <p className="text-gray-300">Connect with fellow investors and share market insights</p>
        </motion.div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Members', value: '12.5K', icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-emerald-400' },
            { label: 'Daily Posts', value: '234', icon: <MessageCircle className="w-6 h-6" />, color: 'from-blue-500 to-cyan-400' },
            { label: 'Top Contributors', value: '89', icon: <Award className="w-6 h-6" />, color: 'from-purple-500 to-violet-400' },
            { label: 'Trending Topics', value: '15', icon: <TrendingUp className="w-6 h-6" />, color: 'from-orange-500 to-red-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
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

        {/* Create Post Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            className="w-full p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-medium text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a New Discussion
          </motion.button>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{post.author}</div>
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatTimeAgo(post.timestamp)}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex items-center gap-4 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.button
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </motion.button>
                </div>
                <motion.button
                  className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  View Discussion
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Trending Topics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['#TechStocks', '#DividendInvesting', '#CryptoNews', '#MarketAnalysis', '#FedPolicy', '#ESGInvesting'].map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-black/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-green-400 font-semibold">{topic}</div>
                <div className="text-gray-400 text-sm mt-1">{Math.floor(Math.random() * 100) + 20} posts</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityHub;
