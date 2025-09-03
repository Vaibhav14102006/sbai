import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Pin, Lock, Eye, Clock, ChevronRight } from 'lucide-react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  lastActivity: string;
  icon: string;
  color: string;
}

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned: boolean;
  isLocked: boolean;
  category: string;
}

const Forums: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: ForumCategory[] = [
    {
      id: '1',
      name: 'Stock Market Discussion',
      description: 'General discussions about stock market trends and analysis',
      topics: 1247,
      posts: 8934,
      lastActivity: '5 minutes ago',
      icon: '📈',
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: '2',
      name: 'Investment Strategies',
      description: 'Share and discuss various investment approaches',
      topics: 892,
      posts: 5621,
      lastActivity: '12 minutes ago',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: '3',
      name: 'Cryptocurrency',
      description: 'Digital assets, blockchain, and crypto trading',
      topics: 2156,
      posts: 12847,
      lastActivity: '2 minutes ago',
      icon: '₿',
      color: 'from-orange-500 to-yellow-400'
    },
    {
      id: '4',
      name: 'Options & Derivatives',
      description: 'Advanced trading instruments and strategies',
      topics: 634,
      posts: 3892,
      lastActivity: '18 minutes ago',
      icon: '⚡',
      color: 'from-purple-500 to-violet-400'
    }
  ];

  const topics: ForumTopic[] = [
    {
      id: '1',
      title: 'Market Outlook for Q2 2024 - What are your predictions?',
      author: 'MarketGuru',
      replies: 45,
      views: 1234,
      lastReply: '3 minutes ago',
      isPinned: true,
      isLocked: false,
      category: 'Stock Market Discussion'
    },
    {
      id: '2',
      title: 'Best dividend stocks for long-term portfolio',
      author: 'DividendHunter',
      replies: 28,
      views: 892,
      lastReply: '15 minutes ago',
      isPinned: false,
      isLocked: false,
      category: 'Investment Strategies'
    },
    {
      id: '3',
      title: 'Bitcoin ETF approval impact discussion',
      author: 'CryptoAnalyst',
      replies: 67,
      views: 2341,
      lastReply: '8 minutes ago',
      isPinned: false,
      isLocked: false,
      category: 'Cryptocurrency'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Discussion Forums
          </h1>
          <p className="text-gray-300">Join conversations with the investment community</p>
        </motion.div>

        {!selectedCategory ? (
          /* Forum Categories */
          <div className="space-y-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-400 mb-3">{category.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{category.topics} topics</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{category.posts} posts</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Last activity: {category.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Forum Topics */
          <div>
            <div className="flex items-center justify-between mb-8">
              <motion.button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                whileHover={{ x: -5 }}
              >
                ← Back to Categories
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
              >
                New Topic
              </motion.button>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
              </div>

              <div className="divide-y divide-white/10">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-white/5 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {topic.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                          {topic.isLocked && <Lock className="w-4 h-4 text-red-400" />}
                          <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                            {topic.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>by {topic.author}</span>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{topic.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{topic.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div>Last reply</div>
                        <div className="text-white">{topic.lastReply}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Online Users */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Community Activity</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">247</div>
              <div className="text-gray-300">Online Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">1,234</div>
              <div className="text-gray-300">Active Today</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15,678</div>
              <div className="text-gray-300">Total Members</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Forums;
