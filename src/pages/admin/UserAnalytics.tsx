import { motion } from 'framer-motion';
import { Users, TrendingUp, Activity, Clock, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import { useState } from 'react';

const UserAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Sample analytics data
  const analyticsData = {
    totalUsers: 12847,
    activeUsers: 8932,
    newUsers: 1247,
    avgSessionTime: '12m 34s',
    userGrowth: 15.3,
    engagementRate: 68.5,
    retentionRate: 72.8,
    conversionRate: 4.2
  };

  const userActivity = [
    { time: '00:00', users: 245 },
    { time: '04:00', users: 189 },
    { time: '08:00', users: 567 },
    { time: '12:00', users: 892 },
    { time: '16:00', users: 1234 },
    { time: '20:00', users: 987 },
    { time: '24:00', users: 456 }
  ];

  const topPages = [
    { page: '/dashboard', views: 45678, bounce: 23.4 },
    { page: '/modules/stock-basics', views: 34567, bounce: 18.7 },
    { page: '/simulator', views: 28934, bounce: 31.2 },
    { page: '/quizzes', views: 23456, bounce: 15.9 },
    { page: '/community', views: 19876, bounce: 28.3 }
  ];

  const userDemographics = [
    { age: '18-24', percentage: 28.5, color: 'bg-blue-500' },
    { age: '25-34', percentage: 35.2, color: 'bg-purple-500' },
    { age: '35-44', percentage: 22.1, color: 'bg-green-500' },
    { age: '45-54', percentage: 10.8, color: 'bg-yellow-500' },
    { age: '55+', percentage: 3.4, color: 'bg-red-500' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full p-6"
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">User Analytics</h1>
              <p className="text-gray-400">Track user behavior and platform performance</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <select
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analyticsData.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Users</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-green-400">+{analyticsData.userGrowth}%</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analyticsData.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="text-green-400">{analyticsData.engagementRate}%</span>
                <span className="text-gray-500">engagement rate</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analyticsData.avgSessionTime}</div>
                  <div className="text-sm text-gray-400">Avg Session</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="text-green-400">{analyticsData.retentionRate}%</span>
                <span className="text-gray-500">retention rate</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analyticsData.newUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">New Users</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="text-green-400">{analyticsData.conversionRate}%</span>
                <span className="text-gray-500">conversion rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Chart */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">User Activity</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {userActivity.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 text-sm text-gray-400">{item.time}</div>
                    <div className="flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(item.users / 1234) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-sm text-white text-right">{item.users}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Demographics */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Age Demographics</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {userDemographics.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-400">{item.age}</div>
                    <div className="flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-white text-right">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Top Pages</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left py-2 text-sm font-medium text-gray-400">Page</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-400">Views</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-400">Bounce Rate</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-400">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                      >
                        <td className="py-3 text-white font-medium">{page.page}</td>
                        <td className="py-3 text-right text-gray-300">{page.views.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <span className={`text-sm ${page.bounce < 25 ? 'text-green-400' : page.bounce < 35 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {page.bounce}%
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="w-16 bg-gray-700/50 rounded-full h-1.5 ml-auto overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${page.bounce < 25 ? 'bg-green-500' : page.bounce < 35 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${100 - page.bounce}%` }}
                            ></div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50 text-xs text-gray-400 flex justify-between items-center">
          <div>Data updated: {new Date().toLocaleString()}</div>
          <div className="flex items-center gap-4">
            <span>Analytics Provider: Google Analytics</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserAnalytics;
