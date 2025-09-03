import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  quizzesCompleted: number;
  streak: number;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
}

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'Alex Chen', avatar: '👨‍💼', score: 2850, quizzesCompleted: 45, streak: 12, badge: 'gold' },
    { rank: 2, name: 'Sarah Johnson', avatar: '👩‍💼', score: 2720, quizzesCompleted: 42, streak: 8, badge: 'silver' },
    { rank: 3, name: 'Mike Rodriguez', avatar: '👨‍🎓', score: 2650, quizzesCompleted: 38, streak: 15, badge: 'bronze' },
    { rank: 4, name: 'Emma Wilson', avatar: '👩‍🎓', score: 2580, quizzesCompleted: 35, streak: 6, badge: 'none' },
    { rank: 5, name: 'David Kim', avatar: '👨‍💻', score: 2520, quizzesCompleted: 33, streak: 9, badge: 'none' },
    { rank: 6, name: 'Lisa Zhang', avatar: '👩‍💻', score: 2480, quizzesCompleted: 31, streak: 4, badge: 'none' },
    { rank: 7, name: 'James Brown', avatar: '👨‍🔬', score: 2420, quizzesCompleted: 29, streak: 7, badge: 'none' },
    { rank: 8, name: 'Maria Garcia', avatar: '👩‍🔬', score: 2380, quizzesCompleted: 28, streak: 3, badge: 'none' }
  ];

  const getBadgeIcon = (badge: string, rank: number) => {
    switch (badge) {
      case 'gold': return <Crown className="w-6 h-6 text-yellow-400" />;
      case 'silver': return <Medal className="w-6 h-6 text-gray-400" />;
      case 'bronze': return <Trophy className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500 to-orange-400';
      case 2: return 'from-gray-400 to-gray-500';
      case 3: return 'from-orange-500 to-red-400';
      default: return 'from-blue-500 to-purple-500';
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Compete with fellow learners and climb the ranks
          </p>
        </motion.div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2">
            {(['weekly', 'monthly', 'alltime'] as const).map((period) => (
              <motion.button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {period === 'alltime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {leaderboardData.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2]; // Center 1st, left 2nd, right 3rd
            const actualIndex = positions[index];
            const actualEntry = leaderboardData[actualIndex];
            
            return (
              <motion.div
                key={actualEntry.rank}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`text-center ${actualEntry.rank === 1 ? 'order-2' : actualEntry.rank === 2 ? 'order-1' : 'order-3'}`}
              >
                <div className={`relative mx-auto mb-4 ${actualEntry.rank === 1 ? 'w-24 h-24' : 'w-20 h-20'}`}>
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${getRankColor(actualEntry.rank)} p-1`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-4xl">
                      {actualEntry.avatar}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    {getBadgeIcon(actualEntry.badge, actualEntry.rank)}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{actualEntry.name}</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-1">{actualEntry.score.toLocaleString()}</div>
                <div className="text-sm text-gray-400">{actualEntry.quizzesCompleted} quizzes</div>
                
                {/* Podium Base */}
                <div className={`mt-4 mx-auto bg-gradient-to-t ${getRankColor(actualEntry.rank)} rounded-t-lg ${
                  actualEntry.rank === 1 ? 'w-16 h-20' : actualEntry.rank === 2 ? 'w-14 h-16' : 'w-12 h-12'
                }`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-yellow-400" />
              Full Rankings
            </h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(entry.rank)} flex items-center justify-center text-white font-bold`}>
                        {entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{entry.quizzesCompleted} quizzes</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {entry.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">points</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Your Ranking</h3>
              <div className="flex items-center gap-4">
                <span className="text-3xl">👤</span>
                <div>
                  <div className="text-lg font-semibold text-white">You</div>
                  <div className="text-purple-400">#15 • 1,850 points</div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Next Rank</div>
              <div className="text-lg font-semibold text-white">#14 • 1,920 points</div>
              <div className="text-sm text-purple-400">70 points to go!</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
