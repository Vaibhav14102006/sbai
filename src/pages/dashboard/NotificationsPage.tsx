import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, TrendingUp, Award, MessageCircle, Calendar, Settings, Search } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'trading' | 'community' | 'system' | 'reminder';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Achievement Unlocked!',
      message: 'Congratulations! You\'ve unlocked the "Quiz Master" achievement for scoring 100% on 5 quizzes.',
      type: 'achievement',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      priority: 'high',
      actionUrl: '/achievements'
    },
    {
      id: '2',
      title: 'Market Alert',
      message: 'AAPL stock has increased by 5.2% today. Your virtual portfolio is performing well!',
      type: 'trading',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Community Response',
      message: 'John Doe replied to your question about portfolio diversification strategies.',
      type: 'community',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      read: true,
      priority: 'medium',
      actionUrl: '/community'
    },
    {
      id: '4',
      title: 'Learning Reminder',
      message: 'Don\'t forget to complete the "Advanced Options Trading" module this week!',
      type: 'reminder',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      title: 'System Update',
      message: 'New features have been added to the trading simulator. Check them out!',
      type: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: false,
      priority: 'medium',
      actionUrl: '/simulator'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'achievement' | 'trading' | 'community' | 'system' | 'reminder'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="w-5 h-5" />;
      case 'trading': return <TrendingUp className="w-5 h-5" />;
      case 'community': return <MessageCircle className="w-5 h-5" />;
      case 'system': return <Settings className="w-5 h-5" />;
      case 'reminder': return <Calendar className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'trading': return 'from-green-400 to-emerald-500';
      case 'community': return 'from-blue-400 to-cyan-500';
      case 'system': return 'from-purple-400 to-violet-500';
      case 'reminder': return 'from-pink-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPriorityGlow = (priority: string) => {
    switch (priority) {
      case 'high': return 'shadow-red-500/30';
      case 'medium': return 'shadow-yellow-500/20';
      case 'low': return 'shadow-blue-500/10';
      default: return 'shadow-gray-500/10';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notif.read) || 
      notif.type === filter;
    
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
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

  const notificationVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      rotateY: 15,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Holographic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-2xl animate-bounce" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Notifications
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with your learning progress and market insights
          </p>
        </motion.div>

        {/* Stats and Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{notifications.length}</div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{notifications.filter(n => !n.read).length}</div>
                <div className="text-sm text-gray-400">Unread</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-black/60 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="achievement">Achievements</option>
                <option value="trading">Trading</option>
                <option value="community">Community</option>
                <option value="system">System</option>
                <option value="reminder">Reminders</option>
              </select>

              {/* Mark All Read */}
              <motion.button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mark All Read
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="relative group"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  z: 20
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Holographic Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${getPriorityGlow(notification.priority)}`} />
                
                {/* Notification Card */}
                <div className={`relative bg-black/60 backdrop-blur-xl border rounded-2xl p-6 transform-gpu transition-all duration-500 ${
                  !notification.read 
                    ? 'border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-transparent' 
                    : 'border-white/10'
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getNotificationColor(notification.type)} p-0.5 flex-shrink-0`}>
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-4">
                          {/* Priority Indicator */}
                          {notification.priority === 'high' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          )}
                          
                          {/* Timestamp */}
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 ${!notification.read ? 'text-gray-300' : 'text-gray-400'}`}>
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {!notification.read && (
                          <motion.button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Check className="w-3 h-3" />
                            Mark Read
                          </motion.button>
                        )}

                        {notification.actionUrl && (
                          <motion.button
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                          </motion.button>
                        )}

                        <motion.button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors ml-auto"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-3 h-3" />
                          Delete
                        </motion.button>
                      </div>
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <motion.div
                        className="w-3 h-3 bg-cyan-500 rounded-full flex-shrink-0"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredNotifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;
