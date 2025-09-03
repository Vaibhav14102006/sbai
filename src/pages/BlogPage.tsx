import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const tags = ['All', 'Market Analysis', 'Investment Tips', 'SEBI Updates', 'Beginner Guide', 'Advanced Strategies'];

  const articles = [
    {
      id: 1,
      title: 'Understanding Market Volatility: A Beginner\'s Guide',
      excerpt: 'Learn how to navigate market ups and downs with confidence and make informed investment decisions during volatile periods.',
      author: 'Dr. Rajesh Kumar',
      date: '2024-01-10',
      readTime: '8 min read',
      tags: ['Beginner Guide', 'Market Analysis'],
      featured: true,
      image: '/blog/market-volatility.jpg'
    },
    {
      id: 2,
      title: 'SEBI\'s New Guidelines for Mutual Fund Investments',
      excerpt: 'Breaking down the latest SEBI regulations and what they mean for your mutual fund portfolio.',
      author: 'Priya Sharma',
      date: '2024-01-08',
      readTime: '6 min read',
      tags: ['SEBI Updates', 'Investment Tips'],
      featured: false,
      image: '/blog/sebi-guidelines.jpg'
    },
    {
      id: 3,
      title: 'Options Trading Strategies for Conservative Investors',
      excerpt: 'Explore low-risk options strategies that can enhance your portfolio returns while managing downside risk.',
      author: 'Amit Patel',
      date: '2024-01-05',
      readTime: '12 min read',
      tags: ['Advanced Strategies', 'Investment Tips'],
      featured: false,
      image: '/blog/options-trading.jpg'
    },
    {
      id: 4,
      title: 'Building Your First Investment Portfolio',
      excerpt: 'Step-by-step guide to creating a diversified portfolio that aligns with your financial goals and risk tolerance.',
      author: 'Sneha Gupta',
      date: '2024-01-03',
      readTime: '10 min read',
      tags: ['Beginner Guide', 'Investment Tips'],
      featured: false,
      image: '/blog/first-portfolio.jpg'
    },
    {
      id: 5,
      title: 'Technical Analysis: Chart Patterns Every Trader Should Know',
      excerpt: 'Master the essential chart patterns that can help you identify potential trading opportunities and market trends.',
      author: 'Dr. Rajesh Kumar',
      date: '2024-01-01',
      readTime: '15 min read',
      tags: ['Advanced Strategies', 'Market Analysis'],
      featured: false,
      image: '/blog/chart-patterns.jpg'
    },
    {
      id: 6,
      title: 'Tax-Saving Investment Options for 2024',
      excerpt: 'Comprehensive guide to tax-efficient investment strategies and instruments available under Indian tax laws.',
      author: 'Priya Sharma',
      date: '2023-12-28',
      readTime: '9 min read',
      tags: ['Investment Tips', 'Beginner Guide'],
      featured: false,
      image: '/blog/tax-saving.jpg'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesTag = selectedTag === 'All' || article.tags.includes(selectedTag);
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Investment Insights
              <br />
              & Market Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest market trends, investment strategies, and regulatory changes from our team of experts
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-2xl overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📈</span>
                      </div>
                      <p className="text-sm">Featured Article Image</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                      Featured
                    </span>
                    {featuredArticle.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 hover:text-blue-300 transition-colors cursor-pointer">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-gray-400">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg">📊</span>
                    </div>
                    <p className="text-xs">Article Image</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Reading Progress Bar */}
                <div className="h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-400">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl mb-2">No articles found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest investment insights and market analysis delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
