import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, MessageSquare, TrendingUp, Activity, Settings, Shield, Database } from 'lucide-react';

interface AdminStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const AdminDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7d');

  const stats: AdminStat[] = [
    {
      label: 'Total Users',
      value: '15,247',
      change: '+12.5%',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      label: 'Active Courses',
      value: '89',
      change: '+3.2%',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-400'
    },
    {
      label: 'Forum Posts',
      value: '2,341',
      change: '+18.7%',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-400'
    },
    {
      label: 'Revenue',
      value: '$47,892',
      change: '+24.1%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const recentActivities = [
    { id: '1', action: 'New user registration', user: 'john.doe@email.com', time: '2 minutes ago' },
    { id: '2', action: 'Course completion', user: 'sarah.smith@email.com', time: '5 minutes ago' },
    { id: '3', action: 'Forum post reported', user: 'moderator@platform.com', time: '12 minutes ago' },
    { id: '4', action: 'Payment processed', user: 'mike.wilson@email.com', time: '18 minutes ago' }
  ];

  const systemHealth = [
    { metric: 'Server Uptime', value: '99.9%', status: 'healthy' },
    { metric: 'Database Performance', value: '95.2%', status: 'healthy' },
    { metric: 'API Response Time', value: '142ms', status: 'warning' },
    { metric: 'Storage Usage', value: '67%', status: 'healthy' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">Platform management and analytics overview</p>
          </div>
          
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((period) => (
              <motion.button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'border border-gray-600 text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
                  >
                    <div>
                      <div className="text-white font-medium">{activity.action}</div>
                      <div className="text-gray-400 text-sm">{activity.user}</div>
                    </div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* System Health */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">System Health</h2>
              </div>
              
              <div className="space-y-4">
                {systemHealth.map((item, index) => (
                  <motion.div
                    key={item.metric}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="text-gray-300 text-sm">{item.metric}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{item.value}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'User Management', icon: <Users className="w-4 h-4" /> },
                  { label: 'Content Moderation', icon: <MessageSquare className="w-4 h-4" /> },
                  { label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
                  { label: 'Database Backup', icon: <Database className="w-4 h-4" /> }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    className="w-full flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.icon}
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Analytics Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Platform Analytics</h2>
          <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Analytics chart would be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
