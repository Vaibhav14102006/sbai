import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Brain, Trophy, Clock, Users, Star, Play, Target, Zap } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  category: 'Basics' | 'Intermediate' | 'Advanced' | 'Expert';
  difficulty: number;
  questions: number;
  duration: number;
  attempts: number;
  bestScore: number;
  color: string;
}

const QuizzesIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const categories = ['All', 'Basics', 'Intermediate', 'Advanced', 'Expert'];

  const quizzes: Quiz[] = [
    {
      id: 'stock-basics-quiz',
      title: 'Stock Market Fundamentals',
      category: 'Basics',
      difficulty: 2,
      questions: 15,
      duration: 10,
      attempts: 3,
      bestScore: 85,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'portfolio-quiz',
      title: 'Portfolio Management',
      category: 'Intermediate',
      difficulty: 3,
      questions: 20,
      duration: 15,
      attempts: 2,
      bestScore: 78,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'options-quiz',
      title: 'Options Trading',
      category: 'Advanced',
      difficulty: 4,
      questions: 25,
      duration: 20,
      attempts: 1,
      bestScore: 72,
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: 'derivatives-quiz',
      title: 'Advanced Derivatives',
      category: 'Expert',
      difficulty: 5,
      questions: 30,
      duration: 25,
      attempts: 0,
      bestScore: 0,
      color: 'from-red-500 to-pink-400'
    }
  ];

  const filteredQuizzes = selectedCategory === 'All' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Knowledge Quizzes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your financial knowledge with interactive quizzes
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white border border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${quiz.color} p-0.5 mx-auto mb-6`}>
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center">{quiz.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{quiz.questions}</div>
                  <div className="text-gray-400 text-sm">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{quiz.duration}m</div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < quiz.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-green-400 font-semibold">
                  {quiz.bestScore > 0 ? `${quiz.bestScore}%` : 'Not attempted'}
                </div>
              </div>

              <motion.button
                className={`w-full py-3 bg-gradient-to-r ${quiz.color} text-white rounded-lg font-medium flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                {quiz.attempts > 0 ? 'Retake Quiz' : 'Start Quiz'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizzesIndex;
