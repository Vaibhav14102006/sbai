import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { TrendingUp, Play, CheckCircle, Lock, ArrowRight, BookOpen, Target, Award, Clock, Star } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
}

const StockBasics: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const lessons: Lesson[] = [
    { id: '1', title: 'What is the Stock Market?', duration: '15 min', completed: true, locked: false, type: 'video' },
    { id: '2', title: 'Understanding Stocks and Shares', duration: '20 min', completed: true, locked: false, type: 'reading' },
    { id: '3', title: 'How Stock Exchanges Work', duration: '18 min', completed: true, locked: false, type: 'interactive' },
    { id: '4', title: 'Types of Stock Orders', duration: '25 min', completed: false, locked: false, type: 'video' },
    { id: '5', title: 'Reading Stock Charts', duration: '30 min', completed: false, locked: false, type: 'interactive' },
    { id: '6', title: 'Market Indices Explained', duration: '22 min', completed: false, locked: true, type: 'reading' },
    { id: '7', title: 'Bull vs Bear Markets', duration: '16 min', completed: false, locked: true, type: 'video' },
    { id: '8', title: 'Stock Valuation Basics', duration: '28 min', completed: false, locked: true, type: 'reading' },
    { id: '9', title: 'Dividends and Stock Splits', duration: '20 min', completed: false, locked: true, type: 'interactive' },
    { id: '10', title: 'Module Assessment', duration: '15 min', completed: false, locked: true, type: 'quiz' }
  ];

  const moduleStats = {
    totalLessons: lessons.length,
    completedLessons: lessons.filter(l => l.completed).length,
    totalDuration: '3.5 hours',
    difficulty: 'Beginner',
    rating: 4.8,
    enrolled: 15420
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'interactive': return <Target className="w-4 h-4" />;
      case 'quiz': return <Award className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'from-red-500 to-pink-400';
      case 'reading': return 'from-blue-500 to-cyan-400';
      case 'interactive': return 'from-green-500 to-emerald-400';
      case 'quiz': return 'from-purple-500 to-violet-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const lessonVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-0.5"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Stock Market Basics
              </h1>
              <p className="text-gray-400 text-lg">Master the fundamentals of stock market investing</p>
            </div>
          </div>

          {/* Module Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Lessons', value: moduleStats.totalLessons, icon: <BookOpen className="w-5 h-5" /> },
              { label: 'Duration', value: moduleStats.totalDuration, icon: <Clock className="w-5 h-5" /> },
              { label: 'Difficulty', value: moduleStats.difficulty, icon: <Target className="w-5 h-5" /> },
              { label: 'Rating', value: moduleStats.rating, icon: <Star className="w-5 h-5" /> },
              { label: 'Enrolled', value: `${(moduleStats.enrolled / 1000).toFixed(1)}K`, icon: <Award className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-white font-semibold">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-4"
              >
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    variants={lessonVariants}
                    className={`relative group cursor-pointer ${lesson.locked ? 'opacity-50' : ''}`}
                    onHoverStart={() => setHoveredLesson(index)}
                    onHoverEnd={() => setHoveredLesson(null)}
                    whileHover={!lesson.locked ? { 
                      scale: 1.02,
                      rotateY: 2,
                      z: 10
                    } : {}}
                    onClick={() => !lesson.locked && setCurrentLesson(index)}
                  >
                    {/* Holographic Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${getTypeColor(lesson.type)} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <div className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      currentLesson === index 
                        ? 'bg-blue-500/20 border-blue-500/50' 
                        : 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50'
                    }`}>
                      {/* Lesson Status */}
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : lesson.locked ? (
                          <Lock className="w-6 h-6 text-gray-500" />
                        ) : (
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getTypeColor(lesson.type)} flex items-center justify-center text-white`}>
                            {getTypeIcon(lesson.type)}
                          </div>
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${lesson.locked ? 'text-gray-500' : 'text-white'}`}>
                            {index + 1}. {lesson.title}
                          </h3>
                          <span className="text-gray-400 text-sm">{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getTypeColor(lesson.type)} text-white capitalize`}>
                            {lesson.type}
                          </span>
                          {lesson.completed && (
                            <span className="text-green-400 text-xs">Completed</span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      {!lesson.locked && (
                        <ArrowRight className={`w-5 h-5 transition-transform ${
                          hoveredLesson === index ? 'translate-x-1' : ''
                        } ${lesson.completed ? 'text-green-400' : 'text-gray-400'}`} />
                      )}

                      {/* Sparkle Effects */}
                      {hoveredLesson === index && !lesson.locked && (
                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: Math.random() * 1.2
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Progress Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
              
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-gray-700"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-blue-400"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - moduleStats.completedLessons / moduleStats.totalLessons)}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - moduleStats.completedLessons / moduleStats.totalLessons) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {Math.round((moduleStats.completedLessons / moduleStats.totalLessons) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-white font-semibold">
                  {moduleStats.completedLessons} of {moduleStats.totalLessons} lessons completed
                </div>
                <div className="text-gray-400 text-sm">Keep going! You're doing great</div>
              </div>

              <motion.button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Learning
              </motion.button>
            </motion.div>

            {/* Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-yellow-400 font-semibold mb-2">Earn Your Certificate</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Complete all lessons and pass the final assessment to earn your Stock Market Basics certificate.
                </p>
                <div className="text-yellow-400 text-sm font-medium">
                  Progress: {moduleStats.completedLessons}/{moduleStats.totalLessons}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockBasics;
