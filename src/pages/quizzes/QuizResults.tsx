import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, RotateCcw, Share2, TrendingUp } from 'lucide-react';

const QuizResults: React.FC = () => {
  const score = 85;
  const totalQuestions = 15;
  const correctAnswers = 13;
  const timeSpent = "8:45";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h1>
          <p className="text-xl text-gray-300">Stock Market Fundamentals</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-green-400 mb-2">{score}%</div>
            <div className="text-gray-400">Final Score</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">{correctAnswers}/{totalQuestions}</div>
            <div className="text-gray-400">Correct Answers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-purple-400 mb-2">{timeSpent}</div>
            <div className="text-gray-400">Time Spent</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Performance Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Overall Performance</span>
                <span className="text-green-400 font-semibold">Excellent</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Strengths</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-green-400">
                    <Target className="w-4 h-4" />
                    <span>Portfolio Management</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <Target className="w-4 h-4" />
                    <span>Risk Assessment</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Areas to Improve</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-orange-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Options Trading</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
