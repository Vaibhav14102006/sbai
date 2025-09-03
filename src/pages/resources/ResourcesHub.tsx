import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { BookOpen, Video, FileText, Newspaper, Brain, Search, Filter, Star } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'article' | 'tool';
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  rating: number;
  views: number;
  duration?: string;
  color: string;
}

const ResourcesHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Guide to Stock Analysis',
      type: 'document',
      category: 'Beginner',
      description: 'Comprehensive PDF guide covering fundamental and technical analysis',
      rating: 4.8,
      views: 15420,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: '2',
      title: 'Options Trading Masterclass',
      type: 'video',
      category: 'Advanced',
      description: 'In-depth video series on advanced options strategies',
      rating: 4.9,
      views: 8750,
      duration: '3h 45m',
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: '3',
      title: 'Market News & Analysis',
      type: 'article',
      category: 'Intermediate',
      description: 'Daily market updates and expert analysis',
      rating: 4.6,
      views: 23100,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: '4',
      title: 'Portfolio Risk Calculator',
      type: 'tool',
      category: 'Intermediate',
      description: 'Interactive tool to calculate portfolio risk metrics',
      rating: 4.7,
      views: 12300,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-6 h-6" />;
      case 'video': return <Video className="w-6 h-6" />;
      case 'article': return <Newspaper className="w-6 h-6" />;
      case 'tool': return <Brain className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4">
            Resources Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive learning materials and tools for financial education
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
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

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { name: 'Documents', icon: <FileText className="w-8 h-8" />, count: 45, color: 'from-blue-500 to-cyan-400' },
            { name: 'Videos', icon: <Video className="w-8 h-8" />, count: 28, color: 'from-purple-500 to-violet-400' },
            { name: 'Articles', icon: <Newspaper className="w-8 h-8" />, count: 67, color: 'from-green-500 to-emerald-400' },
            { name: 'Tools', icon: <Brain className="w-8 h-8" />, count: 12, color: 'from-orange-500 to-red-400' }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} p-0.5 mx-auto mb-4`}>
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">{category.name}</h3>
              <div className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {category.count}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${resource.color} flex items-center justify-center text-white`}>
                  {getTypeIcon(resource.type)}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-semibold">{resource.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{resource.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{resource.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  resource.category === 'Beginner' ? 'text-green-400 bg-green-500/20' :
                  resource.category === 'Intermediate' ? 'text-yellow-400 bg-yellow-500/20' :
                  'text-red-400 bg-red-500/20'
                }`}>
                  {resource.category}
                </span>
                <div className="text-gray-400 text-sm">
                  {resource.views.toLocaleString()} views
                </div>
              </div>

              {resource.duration && (
                <div className="text-blue-400 text-sm mb-4">
                  Duration: {resource.duration}
                </div>
              )}

              <motion.button
                className={`w-full py-3 bg-gradient-to-r ${resource.color} text-white rounded-lg font-medium`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Access Resource
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Explore All Resources</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Access our complete library of educational materials, tools, and expert insights.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Recommendations
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesHub;
