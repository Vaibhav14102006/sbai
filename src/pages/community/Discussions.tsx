import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Share2, Bookmark, Filter, Search, Plus } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  isBookmarked: boolean;
}

const Discussions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Recent');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'The Future of ESG Investing: Trends and Opportunities',
      content: 'Environmental, Social, and Governance (ESG) investing has gained significant momentum. What are your thoughts on the long-term sustainability of ESG funds?',
      author: 'SustainableInvestor',
      avatar: 'SI',
      timestamp: '2 hours ago',
      likes: 34,
      comments: 12,
      category: 'Investment Trends',
      tags: ['ESG', 'Sustainability', 'Future'],
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Market Volatility: How to Stay Calm During Turbulent Times',
      content: 'Recent market fluctuations have many investors on edge. Sharing some strategies that have helped me maintain composure during volatile periods.',
      author: 'CalmTrader',
      avatar: 'CT',
      timestamp: '4 hours ago',
      likes: 67,
      comments: 23,
      category: 'Psychology',
      tags: ['Volatility', 'Psychology', 'Strategy'],
      isBookmarked: true
    },
    {
      id: '3',
      title: 'AI and Machine Learning in Trading: Game Changer or Hype?',
      content: 'With the rise of AI-powered trading algorithms, how do you think this will impact retail investors? Are we being left behind?',
      author: 'TechTrader2024',
      avatar: 'TT',
      timestamp: '6 hours ago',
      likes: 89,
      comments: 45,
      category: 'Technology',
      tags: ['AI', 'Trading', 'Technology'],
      isBookmarked: false
    }
  ];

  const filters = ['Recent', 'Popular', 'Trending', 'Bookmarked'];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'Recent' || 
                         (selectedFilter === 'Bookmarked' && discussion.isBookmarked);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Discussions
          </h1>
          <p className="text-gray-300">Engage in meaningful conversations about investing and finance</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <Plus className="w-5 h-5" />
            Start New Discussion
          </motion.button>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {discussion.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{discussion.author}</div>
                    <div className="text-gray-400 text-sm">{discussion.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
                    {discussion.category}
                  </span>
                  <motion.button
                    className={`p-2 rounded-lg transition-colors ${
                      discussion.isBookmarked 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-gray-700/50 text-gray-400 hover:text-yellow-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Bookmark className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{discussion.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{discussion.content}</p>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                {discussion.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.button
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{discussion.likes}</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{discussion.comments}</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </motion.button>
                </div>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Join Discussion
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Trending Topics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { topic: 'Market Analysis', count: 156 },
              { topic: 'Crypto Trading', count: 134 },
              { topic: 'ESG Investing', count: 98 },
              { topic: 'Options Strategy', count: 87 }
            ].map((item, index) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-black/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-cyan-400 font-semibold">{item.topic}</div>
                <div className="text-gray-400 text-sm mt-1">{item.count} discussions</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Discussions;
