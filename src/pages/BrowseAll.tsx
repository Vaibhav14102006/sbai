import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, TrendingUp, BookOpen, Users, Award, Target, BarChart3 } from 'lucide-react';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'course' | 'article' | 'tool' | 'community';
  rating: number;
  participants: number;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ReactNode;
  color: string;
}

const BrowseAll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const items: Item[] = [
    {
      id: '1',
      title: 'Stock Market Fundamentals',
      description: 'Learn the basics of stock market investing and trading',
      category: 'education',
      type: 'course',
      rating: 4.8,
      participants: 15420,
      duration: '4 hours',
      difficulty: 'Beginner',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: '2',
      title: 'Advanced Portfolio Management',
      description: 'Master portfolio diversification and risk management strategies',
      category: 'education',
      type: 'course',
      rating: 4.9,
      participants: 8900,
      duration: '6 hours',
      difficulty: 'Advanced',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: '3',
      title: 'Trading Psychology Guide',
      description: 'Understand the psychological aspects of successful trading',
      category: 'resources',
      type: 'article',
      rating: 4.7,
      participants: 12500,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: '4',
      title: 'Options Trading Simulator',
      description: 'Practice options trading with real-time market data',
      category: 'tools',
      type: 'tool',
      rating: 4.6,
      participants: 6800,
      icon: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-red-400'
    },
    {
      id: '5',
      title: 'Investor Community Forum',
      description: 'Connect with fellow investors and share trading strategies',
      category: 'community',
      type: 'community',
      rating: 4.5,
      participants: 25000,
      icon: <Users className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-400'
    },
    {
      id: '6',
      title: 'Market Analysis Certification',
      description: 'Get certified in technical and fundamental analysis',
      category: 'education',
      type: 'course',
      rating: 4.8,
      participants: 5600,
      duration: '8 hours',
      difficulty: 'Advanced',
      icon: <Award className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-400'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: items.length },
    { id: 'education', name: 'Education', count: items.filter(i => i.category === 'education').length },
    { id: 'resources', name: 'Resources', count: items.filter(i => i.category === 'resources').length },
    { id: 'tools', name: 'Tools', count: items.filter(i => i.category === 'tools').length },
    { id: 'community', name: 'Community', count: items.filter(i => i.category === 'community').length }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Browse All
        </motion.h1>
        <p className="text-gray-400">Discover courses, tools, resources, and community content</p>
      </div>

      {/* Search and Filters */}
      <motion.div 
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, tools, resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredItems.length} Results Found
          </h2>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} p-0.5 mb-4`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-medium">{item.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{item.participants.toLocaleString()} participants</span>
                  </div>

                  {item.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      {item.duration && (
                        <span className="text-gray-400 text-sm">{item.duration}</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white font-medium">{item.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{item.participants.toLocaleString()} participants</span>
                      {item.difficulty && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                      )}
                      {item.duration && (
                        <span className="text-gray-400 text-sm">{item.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No results found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BrowseAll;
