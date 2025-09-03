import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  Users,
  ChevronRight,
  Flame,
  Trophy,
  Play
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const Dashboard: React.FC = () => {
  const { user } = useStore();

  if (!user) return null;

  const quickStats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'from-blue-500 to-purple-600' },
    { label: 'Total Points', value: '2,450', icon: Award, color: 'from-green-500 to-teal-600' },
    { label: 'Current Streak', value: '15 days', icon: Flame, color: 'from-orange-500 to-red-600' },
    { label: 'Portfolio Value', value: '₹1,25,000', icon: TrendingUp, color: 'from-pink-500 to-rose-600' },
  ];

  const recentActivity = [
    { title: 'Completed "Risk Assessment" Module', time: '2 hours ago', points: 100 },
    { title: 'Earned "Portfolio Builder" Badge', time: '1 day ago', points: 250 },
    { title: 'Simulated trade: Bought 10 shares of INFY', time: '2 days ago', points: 50 },
    { title: 'Completed Quiz: Technical Analysis', time: '3 days ago', points: 150 },
  ];

  const recommendedCourses = [
    {
      title: 'Advanced Portfolio Management',
      description: 'Learn advanced techniques for portfolio optimization',
      progress: 0,
      duration: '4 hours',
      difficulty: 'Advanced',
    },
    {
      title: 'Options Trading Strategies',
      description: 'Master complex options strategies for different market conditions',
      progress: 25,
      duration: '6 hours',
      difficulty: 'Intermediate',
    },
    {
      title: 'ESG Investing Fundamentals',
      description: 'Understand sustainable and responsible investing principles',
      progress: 0,
      duration: '3 hours',
      difficulty: 'Beginner',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-neutral-400">
                Ready to continue your investment journey?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-neutral-400">Your Level</div>
                  <div className="text-lg font-semibold text-primary-400">
                    {user.experienceLevel.charAt(0).toUpperCase() + user.experienceLevel.slice(1)}
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
              <span className="text-primary-400 font-medium">Level 3 → Level 4</span>
            </div>
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-neutral-400">
              <span>2,450 XP</span>
              <span>3,600 XP to Level 4</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Courses */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
                <button className="text-primary-400 hover:text-primary-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recommendedCourses.map((course, index) => (
                  <motion.div
                    key={course.title}
                    className="group bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                            {course.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {course.difficulty}
                          </span>
                        </div>
                        <p className="text-neutral-400 mb-3">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500">
                          <span>{course.duration}</span>
                          {course.progress > 0 && <span>{course.progress}% complete</span>}
                        </div>
                        {course.progress > 0 && (
                          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <motion.button
                        className="ml-4 p-3 bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">{activity.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">{activity.time}</span>
                        <span className="text-xs text-primary-400 font-medium">+{activity.points} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-primary-400" />
                    <span className="text-white">Continue Learning</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white">Trading Simulator</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-secondary-400" />
                    <span className="text-white">Join Community</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-accent-400" />
                    <span className="text-white">Take Assessment</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;