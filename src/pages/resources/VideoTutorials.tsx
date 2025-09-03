import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Eye, Star, Filter, Search, BookOpen } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  rating: number;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  thumbnail: string;
  level: number;
}

const VideoTutorials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const videos: Video[] = [
    {
      id: '1',
      title: 'Stock Market Basics for Beginners',
      description: 'Learn the fundamentals of stock market investing, including how to read charts and analyze companies.',
      duration: '45:30',
      views: 125000,
      rating: 4.8,
      category: 'Beginner',
      instructor: 'Sarah Johnson',
      thumbnail: '📈',
      level: 1
    },
    {
      id: '2',
      title: 'Advanced Options Trading Strategies',
      description: 'Master complex options strategies including spreads, straddles, and advanced risk management techniques.',
      duration: '1:32:15',
      views: 67000,
      rating: 4.9,
      category: 'Advanced',
      instructor: 'Michael Chen',
      thumbnail: '⚡',
      level: 5
    },
    {
      id: '3',
      title: 'Portfolio Diversification Masterclass',
      description: 'Build a well-balanced portfolio using modern portfolio theory and risk management principles.',
      duration: '58:45',
      views: 89000,
      rating: 4.7,
      category: 'Intermediate',
      instructor: 'Emma Rodriguez',
      thumbnail: '🎯',
      level: 3
    },
    {
      id: '4',
      title: 'Technical Analysis Deep Dive',
      description: 'Comprehensive guide to chart patterns, indicators, and technical analysis for better trading decisions.',
      duration: '2:15:30',
      views: 156000,
      rating: 4.6,
      category: 'Intermediate',
      instructor: 'David Kim',
      thumbnail: '📊',
      level: 4
    }
  ];

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < level ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Video Tutorials
          </h1>
          <p className="text-gray-300">Learn from expert instructors with comprehensive video courses</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
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

        {/* Featured Video */}
        {filteredVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Featured Tutorial</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative bg-gray-800 rounded-xl mb-6 aspect-video flex items-center justify-center">
                  <div className="text-6xl">{filteredVideos[0].thumbnail}</div>
                  <motion.button
                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl hover:bg-black/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </motion.button>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{filteredVideos[0].title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{filteredVideos[0].description}</p>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(filteredVideos[0].category)}`}>
                    {filteredVideos[0].category}
                  </span>
                  <div className="flex items-center gap-1">
                    {getDifficultyStars(filteredVideos[0].level)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800/30 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">{filteredVideos[0].duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{filteredVideos[0].views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white">{filteredVideos[0].rating}/5</span>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-white mb-3">Instructor</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {filteredVideos[0].instructor.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{filteredVideos[0].instructor}</div>
                      <div className="text-gray-400 text-sm">Expert Instructor</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.slice(1).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              {/* Video Thumbnail */}
              <div className="relative bg-gray-800 aspect-video flex items-center justify-center">
                <div className="text-4xl">{video.thumbnail}</div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-sm">
                  {video.duration}
                </div>
                <motion.button
                  className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/30 transition-colors opacity-0 hover:opacity-100"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </motion.button>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(video.category)}`}>
                    {video.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm">{video.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-400 text-sm">{video.instructor}</div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{(video.views / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-gray-400 text-sm mr-2">Difficulty:</span>
                  {getDifficultyStars(video.level)}
                </div>
                
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  Watch Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Path CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Complete Learning Path</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Follow our structured learning path from beginner to advanced with personalized recommendations.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Path
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-purple-500/50 text-purple-400 rounded-lg font-medium hover:bg-purple-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Videos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoTutorials;
