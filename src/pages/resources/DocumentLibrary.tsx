import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Search, Filter, Star, Calendar } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: 'Guide' | 'Report' | 'Whitepaper' | 'Template';
  size: string;
  pages: number;
  downloadCount: number;
  rating: number;
  uploadDate: string;
  description: string;
}

const DocumentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Complete Investment Guide 2024',
      category: 'Guide',
      size: '2.4 MB',
      pages: 45,
      downloadCount: 1250,
      rating: 4.8,
      uploadDate: '2024-01-15',
      description: 'Comprehensive guide covering all aspects of modern investing'
    },
    {
      id: '2',
      title: 'Market Analysis Report Q1 2024',
      category: 'Report',
      size: '1.8 MB',
      pages: 28,
      downloadCount: 890,
      rating: 4.6,
      uploadDate: '2024-01-10',
      description: 'Detailed quarterly market analysis and predictions'
    },
    {
      id: '3',
      title: 'Cryptocurrency Investment Whitepaper',
      category: 'Whitepaper',
      size: '3.2 MB',
      pages: 67,
      downloadCount: 2100,
      rating: 4.9,
      uploadDate: '2024-01-08',
      description: 'In-depth analysis of cryptocurrency investment strategies'
    },
    {
      id: '4',
      title: 'Portfolio Tracking Template',
      category: 'Template',
      size: '0.5 MB',
      pages: 12,
      downloadCount: 3400,
      rating: 4.7,
      uploadDate: '2024-01-05',
      description: 'Excel template for tracking investment portfolio performance'
    }
  ];

  const categories = ['All', 'Guide', 'Report', 'Whitepaper', 'Template'];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Guide': return 'text-blue-400 bg-blue-500/20';
      case 'Report': return 'text-green-400 bg-green-500/20';
      case 'Whitepaper': return 'text-purple-400 bg-purple-500/20';
      case 'Template': return 'text-orange-400 bg-orange-500/20';
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
            Document Library
          </h1>
          <p className="text-gray-300">Access comprehensive financial documents and resources</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
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

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-sm">{doc.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{doc.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{doc.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                  {doc.category}
                </span>
                <div className="text-gray-400 text-sm">{doc.pages} pages</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-400">Size</div>
                  <div className="text-white font-semibold">{doc.size}</div>
                </div>
                <div>
                  <div className="text-gray-400">Downloads</div>
                  <div className="text-white font-semibold">{doc.downloadCount.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </motion.button>
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;
