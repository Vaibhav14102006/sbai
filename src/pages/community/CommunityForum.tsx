import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Pin, Clock, Eye, ChevronRight, Search, Filter } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned: boolean;
  isHot: boolean;
}

const CommunityForum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Weekly Market Analysis Discussion - January 2024',
      author: 'MarketExpert',
      category: 'Market Analysis',
      replies: 45,
      views: 1234,
      lastActivity: '2 minutes ago',
      isPinned: true,
      isHot: true
    },
    {
      id: '2',
      title: 'Best dividend stocks for beginners?',
      author: 'NewInvestor',
      category: 'Investment Advice',
      replies: 23,
      views: 567,
      lastActivity: '15 minutes ago',
      isPinned: false,
      isHot: true
    },
    {
      id: '3',
      title: 'Crypto portfolio allocation strategies',
      author: 'CryptoTrader99',
      category: 'Cryptocurrency',
      replies: 67,
      views: 2341,
      lastActivity: '1 hour ago',
      isPinned: false,
      isHot: false
    },
    {
      id: '4',
      title: 'Options trading for income generation',
      author: 'OptionsGuru',
      category: 'Options Trading',
      replies: 34,
      views: 892,
      lastActivity: '3 hours ago',
      isPinned: false,
      isHot: false
    }
  ];

  const categories = ['All', 'Market Analysis', 'Investment Advice', 'Cryptocurrency', 'Options Trading', 'General Discussion'];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market Analysis': return 'text-blue-400 bg-blue-500/20';
      case 'Investment Advice': return 'text-green-400 bg-green-500/20';
      case 'Cryptocurrency': return 'text-orange-400 bg-orange-500/20';
      case 'Options Trading': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Community Forum
          </h1>
          <p className="text-gray-300">Join discussions and share insights with fellow investors</p>
        </motion.div>

        {/* Forum Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Topics', value: '2,847', icon: <MessageSquare className="w-6 h-6" /> },
            { label: 'Active Members', value: '1,234', icon: <Users className="w-6 h-6" /> },
            { label: 'Posts Today', value: '89', icon: <Clock className="w-6 h-6" /> },
            { label: 'Online Now', value: '156', icon: <Eye className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 text-white">
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
                placeholder="Search forum posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
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

        {/* New Topic Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-2xl font-medium text-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-5 h-5" />
            Start New Discussion
          </motion.button>
        </motion.div>

        {/* Forum Posts */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Recent Discussions</h2>
          </div>

          <div className="divide-y divide-white/10">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-white/5 transition-colors cursor-pointer group"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {post.isPinned && (
                        <Pin className="w-4 h-4 text-yellow-400" />
                      )}
                      {post.isHot && (
                        <div className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                          HOT
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>by {post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Forum Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Forum Guidelines</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Be Respectful', desc: 'Treat all members with courtesy and respect' },
              { title: 'Stay On Topic', desc: 'Keep discussions relevant to financial education' },
              { title: 'No Spam', desc: 'Avoid promotional content and repetitive posts' },
              { title: 'Share Knowledge', desc: 'Help others learn and grow their expertise' }
            ].map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-cyan-400 font-semibold mb-2">{guideline.title}</div>
                <div className="text-gray-400 text-sm">{guideline.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityForum;
