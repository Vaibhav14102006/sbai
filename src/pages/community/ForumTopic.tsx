import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Flag, Clock, User, Pin } from 'lucide-react';

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const ForumTopic: React.FC = () => {
  const [newReply, setNewReply] = useState('');
  const [likes, setLikes] = useState(47);
  const [isLiked, setIsLiked] = useState(false);

  const topicData = {
    id: '1',
    title: 'Weekly Market Analysis Discussion - January 2024',
    author: 'MarketExpert',
    content: `Welcome to our weekly market analysis discussion! This week we've seen some interesting movements in the tech sector, particularly with AI-related stocks showing strong momentum.

Key points to discuss:
1. Tech sector performance and AI stock surge
2. Federal Reserve policy implications
3. International market correlations
4. Upcoming earnings season impact

I'd love to hear everyone's thoughts on these developments and how they might affect our investment strategies going forward. What are you seeing in your portfolios?`,
    timestamp: '2 hours ago',
    category: 'Market Analysis',
    isPinned: true,
    views: 1234,
    replies: 23
  };

  const replies: Reply[] = [
    {
      id: '1',
      author: 'TechInvestor',
      content: 'Great analysis! I\'ve been particularly bullish on semiconductor stocks lately. The AI boom is creating unprecedented demand for chips, and I think we\'re still in the early stages.',
      timestamp: '1 hour ago',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      author: 'ValueHunter',
      content: 'While I agree on the tech momentum, I\'m concerned about valuations. Some of these AI stocks are trading at astronomical P/E ratios. Are we in bubble territory?',
      timestamp: '45 minutes ago',
      likes: 8,
      isLiked: true
    },
    {
      id: '3',
      author: 'DividendKing',
      content: 'Don\'t forget about defensive plays! With all this tech volatility, I\'ve been increasing my positions in utilities and consumer staples. Diversification is key.',
      timestamp: '30 minutes ago',
      likes: 15,
      isLiked: false
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim()) {
      // Handle reply submission
      console.log('New reply:', newReply);
      setNewReply('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Forum
        </motion.button>

        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {topicData.isPinned && (
                <Pin className="w-5 h-5 text-yellow-400" />
              )}
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                {topicData.category}
              </span>
            </div>
            <motion.button
              className="p-2 bg-gray-700/50 text-gray-400 rounded-lg hover:bg-gray-600/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Flag className="w-4 h-4" />
            </motion.button>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">{topicData.title}</h1>

          <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{topicData.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{topicData.timestamp}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{topicData.replies} replies</span>
            </div>
            <div>
              {topicData.views} views
            </div>
          </div>

          <div className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
            {topicData.content}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'bg-gray-700/50 text-gray-400 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likes}</span>
            </motion.button>
            
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-400 rounded-lg hover:text-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </motion.div>

        {/* Replies */}
        <div className="space-y-6 mb-8">
          {replies.map((reply, index) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {reply.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{reply.author}</div>
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {reply.timestamp}
                    </div>
                  </div>
                </div>
                <motion.button
                  className="p-2 bg-gray-700/50 text-gray-400 rounded-lg hover:bg-gray-600/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Flag className="w-4 h-4" />
                </motion.button>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">{reply.content}</p>

              <div className="flex items-center gap-4">
                <motion.button
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                    reply.isLiked 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-gray-700/50 text-gray-400 hover:text-cyan-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{reply.likes}</span>
                </motion.button>
                
                <motion.button
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Reply
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reply Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Add Your Reply</h3>
          
          <form onSubmit={handleReplySubmit}>
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Share your thoughts on this topic..."
              className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none mb-4"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                Be respectful and constructive in your response
              </div>
              <motion.button
                type="submit"
                disabled={!newReply.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: newReply.trim() ? 1.05 : 1 }}
                whileTap={{ scale: newReply.trim() ? 0.95 : 1 }}
              >
                Post Reply
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Related Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Related Discussions</h3>
          <div className="space-y-4">
            {[
              'Tech Stock Valuation Concerns - Are We in a Bubble?',
              'Federal Reserve Policy Impact on Growth Stocks',
              'International Market Opportunities in 2024'
            ].map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 hover:bg-black/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-cyan-400 hover:text-cyan-300 transition-colors">{topic}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForumTopic;
