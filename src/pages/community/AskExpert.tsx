import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Clock, CheckCircle, Star, Send, Filter, Search } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  responseTime: string;
  questionsAnswered: number;
  isOnline: boolean;
}

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: string;
  status: 'pending' | 'answered' | 'closed';
  expert?: string;
  likes: number;
}

const AskExpert: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Senior Portfolio Manager',
      expertise: ['Portfolio Management', 'Risk Assessment', 'Asset Allocation'],
      rating: 4.9,
      responseTime: '< 2 hours',
      questionsAnswered: 1247,
      isOnline: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Options Trading Specialist',
      expertise: ['Options Trading', 'Derivatives', 'Risk Management'],
      rating: 4.8,
      responseTime: '< 4 hours',
      questionsAnswered: 892,
      isOnline: true
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      title: 'Market Analyst',
      expertise: ['Technical Analysis', 'Market Research', 'Sector Analysis'],
      rating: 4.7,
      responseTime: '< 6 hours',
      questionsAnswered: 1534,
      isOnline: false
    }
  ];

  const recentQuestions: Question[] = [
    {
      id: '1',
      title: 'Best strategy for dividend growth investing?',
      content: 'I\'m looking to build a dividend growth portfolio for long-term wealth building...',
      author: 'InvestorJoe',
      category: 'Investment Strategy',
      timestamp: '2 hours ago',
      status: 'answered',
      expert: 'Dr. Sarah Johnson',
      likes: 23
    },
    {
      id: '2',
      title: 'How to hedge portfolio during market volatility?',
      content: 'With recent market uncertainty, what are the best hedging strategies...',
      author: 'RiskManager',
      category: 'Risk Management',
      timestamp: '4 hours ago',
      status: 'pending',
      likes: 15
    },
    {
      id: '3',
      title: 'Technical indicators for swing trading',
      content: 'Which technical indicators work best for identifying swing trading opportunities...',
      author: 'SwingTrader99',
      category: 'Technical Analysis',
      timestamp: '6 hours ago',
      status: 'answered',
      expert: 'Emma Rodriguez',
      likes: 31
    }
  ];

  const categories = ['general', 'Investment Strategy', 'Risk Management', 'Technical Analysis', 'Options Trading', 'Portfolio Management'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'closed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionTitle.trim() && questionContent.trim()) {
      // Handle question submission
      console.log('Question submitted:', { questionTitle, questionContent, selectedCategory, selectedExpert });
      setQuestionTitle('');
      setQuestionContent('');
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Ask the Experts
          </h1>
          <p className="text-gray-300">Get personalized advice from certified financial professionals</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ask Question Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Ask Your Question</h2>
              
              <form onSubmit={handleSubmitQuestion} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Question Title</label>
                  <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder="Brief summary of your question"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Question</label>
                  <textarea
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    rows={6}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                    placeholder="Provide detailed context about your situation and what specific advice you're looking for..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Preferred Expert (Optional)</label>
                  <select
                    value={selectedExpert || ''}
                    onChange={(e) => setSelectedExpert(e.target.value || null)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Any available expert</option>
                    {experts.map(expert => (
                      <option key={expert.id} value={expert.id}>
                        {expert.name} - {expert.title}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Submit Question
                </motion.button>
              </form>
            </motion.div>

            {/* Recent Questions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Questions</h2>
              
              <div className="space-y-6">
                {recentQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-700/30 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{question.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                        {question.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">{question.content}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {question.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {question.timestamp}
                        </div>
                        {question.expert && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Answered by {question.expert}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Star className="w-4 h-4" />
                        {question.likes}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Experts Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Our Experts</h2>
              
              <div className="space-y-6">
                {experts.map((expert, index) => (
                  <motion.div
                    key={expert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{expert.name}</h3>
                          <p className="text-gray-400 text-sm">{expert.title}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${expert.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400">{expert.rating}</span>
                      </div>
                      <div className="text-gray-400">
                        {expert.questionsAnswered} answers
                      </div>
                    </div>
                    
                    <div className="text-gray-400 text-sm mb-3">
                      Response time: {expert.responseTime}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div>1. Submit your detailed question</div>
                <div>2. Our experts review and respond</div>
                <div>3. Get personalized advice within hours</div>
                <div>4. Follow up with additional questions</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskExpert;
