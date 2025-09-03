import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Trophy, Star, Target, Award, Zap, Crown, Medal, Gift } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  category: string;
}

const AchievementsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first learning module',
      icon: <Target className="w-8 h-8" />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common',
      xpReward: 100,
      category: 'learning'
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Score 100% on 5 different quizzes',
      icon: <Trophy className="w-8 h-8" />,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      rarity: 'rare',
      xpReward: 500,
      category: 'quizzes'
    },
    {
      id: '3',
      title: 'Trading Prodigy',
      description: 'Achieve 50% portfolio growth in simulator',
      icon: <Crown className="w-8 h-8" />,
      progress: 35,
      maxProgress: 50,
      unlocked: false,
      rarity: 'epic',
      xpReward: 1000,
      category: 'trading'
    },
    {
      id: '4',
      title: 'Community Leader',
      description: 'Help 10 users in the community forum',
      icon: <Star className="w-8 h-8" />,
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      rarity: 'rare',
      xpReward: 750,
      category: 'community'
    },
    {
      id: '5',
      title: 'Knowledge Seeker',
      description: 'Read 25 educational articles',
      icon: <Award className="w-8 h-8" />,
      progress: 18,
      maxProgress: 25,
      unlocked: false,
      rarity: 'common',
      xpReward: 300,
      category: 'learning'
    },
    {
      id: '6',
      title: 'Lightning Fast',
      description: 'Complete a quiz in under 2 minutes',
      icon: <Zap className="w-8 h-8" />,
      progress: 0,
      maxProgress: 1,
      unlocked: false,
      rarity: 'legendary',
      xpReward: 2000,
      category: 'quizzes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Achievements', count: achievements.length },
    { id: 'learning', name: 'Learning', count: achievements.filter(a => a.category === 'learning').length },
    { id: 'quizzes', name: 'Quizzes', count: achievements.filter(a => a.category === 'quizzes').length },
    { id: 'trading', name: 'Trading', count: achievements.filter(a => a.category === 'trading').length },
    { id: 'community', name: 'Community', count: achievements.filter(a => a.category === 'community').length }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-500/20';
      case 'rare': return 'shadow-blue-500/30';
      case 'epic': return 'shadow-purple-500/40';
      case 'legendary': return 'shadow-yellow-500/50';
      default: return 'shadow-gray-500/20';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-2xl animate-bounce" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Achievements
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your progress and unlock rewards as you master financial trading
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Total Achievements', value: achievements.length, icon: <Trophy className="w-6 h-6" /> },
            { label: 'Unlocked', value: achievements.filter(a => a.unlocked).length, icon: <Medal className="w-6 h-6" /> },
            { label: 'In Progress', value: achievements.filter(a => !a.unlocked && a.progress > 0).length, icon: <Target className="w-6 h-6" /> },
            { label: 'Total XP', value: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0), icon: <Gift className="w-6 h-6" /> }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="relative group"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center mb-3 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {category.name} ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={cardVariants}
              className="relative group perspective-1000"
              onHoverStart={() => setHoveredAchievement(achievement.id)}
              onHoverEnd={() => setHoveredAchievement(null)}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${getRarityGlow(achievement.rarity)}`} />
              
              {/* Card Content */}
              <div className={`relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transform-gpu transition-all duration-500 ${
                achievement.unlocked ? 'border-green-500/30' : ''
              }`}>
                {/* Achievement Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} p-0.5 mx-auto`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      {achievement.icon}
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                    >
                      <Star className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Achievement Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                  
                  {/* Rarity Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white capitalize mb-4`}>
                    {achievement.rarity}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* XP Reward */}
                <div className="text-center">
                  <div className="text-yellow-400 font-medium">
                    +{achievement.xpReward} XP
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {hoveredAchievement === achievement.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;
