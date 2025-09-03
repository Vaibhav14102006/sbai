import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { TrendingUp, BookOpen, Award, Target, Calendar, ArrowRight, Zap, Users, Star, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { textReveal, scrollAnimations } from '../../utils/animations';

const Dashboard: React.FC = () => {
  const { user } = useStore();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    // Personalized greeting animation
    if (greetingRef.current) {
      textReveal.holographicSheen(greetingRef.current);
    }

    // Progress ring animation
    if (progressRef.current) {
      const rings = progressRef.current.querySelectorAll('.progress-ring');
      rings.forEach((ring, index) => {
        setTimeout(() => {
          ring.classList.add('animate-progress');
        }, index * 200);
      });
    }
  }, []);

  const stats = [
    { label: 'Modules Completed', value: '8/12', progress: 67, color: 'text-blue-400', bgColor: 'from-blue-500/20 to-blue-600/20' },
    { label: 'Quiz Score Average', value: '87%', progress: 87, color: 'text-green-400', bgColor: 'from-green-500/20 to-green-600/20' },
    { label: 'Trading Accuracy', value: '73%', progress: 73, color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-yellow-600/20' },
    { label: 'Learning Streak', value: '15 days', progress: 75, color: 'text-purple-400', bgColor: 'from-purple-500/20 to-purple-600/20' }
  ];

  const recentModules = [
    { title: 'Portfolio Diversification', progress: 85, status: 'In Progress', icon: Target },
    { title: 'Risk Assessment', progress: 100, status: 'Completed', icon: Award },
    { title: 'Technical Analysis', progress: 45, status: 'In Progress', icon: TrendingUp }
  ];

  const upcomingEvents = [
    { title: 'Market Analysis Webinar', date: '2024-01-15', time: '7:00 PM', type: 'Webinar' },
    { title: 'Options Trading Workshop', date: '2024-01-18', time: '6:30 PM', type: 'Workshop' },
    { title: 'Portfolio Review Session', date: '2024-01-20', time: '8:00 PM', type: 'Session' }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 px-4 pb-8 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-2xl animate-bounce" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 
            ref={greetingRef}
            className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-2"
          >
            Welcome back, {user?.name || 'Investor'}! 🚀
          </h1>
          <p className="text-gray-400 text-lg">Ready to continue your investment learning journey?</p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div ref={progressRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`relative p-6 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden group perspective-1000`}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
            >
              {/* Holographic Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
              
              {/* Sparkle Effects */}
              {hoveredStat === index && (
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {[...Array(8)].map((_, i) => (
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
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 1.5
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-gray-700"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className={`progress-ring ${stat.color}`}
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - stat.progress / 100)}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - stat.progress / 100) }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xs font-bold ${stat.color}`}>{stat.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  Recent Learning Progress
                </h2>
                <a href="/modules" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-4">
                {recentModules.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center p-4 bg-gradient-to-br from-gray-800/40 via-gray-800/20 to-gray-800/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl hover:from-gray-700/50 hover:via-gray-700/30 hover:to-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-blue-500/30"
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                    >
                      <module.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">{module.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${module.progress}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{module.progress}%</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {module.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: BookOpen, label: 'Continue Learning', href: '/modules', color: 'from-blue-500 to-cyan-400' },
                { icon: Target, label: 'Take Quiz', href: '/quizzes', color: 'from-green-500 to-emerald-400' },
                { icon: TrendingUp, label: 'Trade Simulator', href: '/simulator', color: 'from-purple-500 to-pink-400' },
                { icon: Users, label: 'Join Community', href: '/community', color: 'from-orange-500 to-red-400' }
              ].map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative p-6 bg-gradient-to-br ${action.color} rounded-2xl text-center text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-white/10 backdrop-blur-sm`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <action.icon className="w-8 h-8 mx-auto mb-3 drop-shadow-lg" />
                  </motion.div>
                  <span className="text-sm font-semibold relative z-10">{action.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Simulator Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Portfolio Snapshot
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value</span>
                  <span className="text-white font-semibold">₹1,25,430</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Today's P&L</span>
                  <span className="text-green-400 font-semibold">+₹2,340 (1.9%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Positions</span>
                  <span className="text-white font-semibold">8</span>
                </div>
              </div>
              <motion.a
                href="/simulator/portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="block mt-4 text-center py-3 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 border border-green-400/20 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="relative z-10">View Full Portfolio</span>
              </motion.a>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <h4 className="text-white font-medium text-sm">{event.title}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-xs">{event.date}</span>
                      <span className="text-blue-400 text-xs">{event.time}</span>
                    </div>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {event.type}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="/community/events"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="block mt-4 text-center py-3 border-2 border-blue-500/50 text-blue-400 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-400/70 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="relative z-10">View All Events</span>
              </motion.a>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="text-yellow-400 font-semibold mb-1">Quick Learner!</h4>
              <p className="text-gray-300 text-sm">Completed 3 modules this week</p>
              <motion.a
                href="/achievements"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl text-yellow-400 text-sm font-semibold hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm group"
              >
                <span>View All Achievements</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
