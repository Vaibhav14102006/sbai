import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Eye, Check, X, MessageSquare, AlertTriangle, Shield, Filter } from 'lucide-react';

interface ReportedContent {
  id: string;
  type: 'Post' | 'Comment' | 'User' | 'Course';
  content: string;
  author: string;
  reporter: string;
  reason: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Escalated';
  reportDate: string;
}

const ContentModeration: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('Pending');

  const reportedContent: ReportedContent[] = [
    {
      id: '1',
      type: 'Post',
      content: 'This investment strategy is guaranteed to make you rich quick...',
      author: 'QuickRichUser',
      reporter: 'ConcernedUser123',
      reason: 'Misleading financial advice',
      severity: 'High',
      status: 'Pending',
      reportDate: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'Comment',
      content: 'You\'re an idiot if you don\'t invest in this...',
      author: 'AggressiveTrader',
      reporter: 'ModerateInvestor',
      reason: 'Harassment and inappropriate language',
      severity: 'Medium',
      status: 'Pending',
      reportDate: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      type: 'User',
      content: 'User profile contains spam links and fake credentials',
      author: 'SpamAccount99',
      reporter: 'TrustedMember',
      reason: 'Spam and fake information',
      severity: 'Critical',
      status: 'Escalated',
      reportDate: '2024-01-14T16:45:00Z'
    }
  ];

  const severities = ['All', 'Low', 'Medium', 'High', 'Critical'];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Escalated'];

  const filteredContent = reportedContent.filter(item => {
    const matchesSeverity = selectedSeverity === 'All' || item.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/20';
      case 'Critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'Approved': return 'text-green-400 bg-green-500/20';
      case 'Rejected': return 'text-red-400 bg-red-500/20';
      case 'Escalated': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Post': return <MessageSquare className="w-4 h-4" />;
      case 'Comment': return <MessageSquare className="w-4 h-4" />;
      case 'User': return <Shield className="w-4 h-4" />;
      case 'Course': return <Eye className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const reported = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - reported.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
              Content Moderation
            </h1>
            <p className="text-gray-300">Review and moderate reported content</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pending Reports', value: '23', color: 'from-yellow-500 to-orange-400', icon: <Flag className="w-6 h-6" /> },
            { label: 'Resolved Today', value: '47', color: 'from-green-500 to-emerald-400', icon: <Check className="w-6 h-6" /> },
            { label: 'Critical Issues', value: '3', color: 'from-red-500 to-pink-400', icon: <AlertTriangle className="w-6 h-6" /> },
            { label: 'Auto-Moderated', value: '156', color: 'from-blue-500 to-cyan-400', icon: <Shield className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Filters:</span>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>{severity} Severity</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status} Status</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reported Content List */}
        <div className="space-y-6">
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{item.type} Report</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm">Reported {formatTimeAgo(item.reportDate)}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                <div className="text-gray-300 mb-2">
                  <strong>Content:</strong> {item.content}
                </div>
                <div className="text-gray-400 text-sm">
                  <strong>Author:</strong> {item.author} | <strong>Reporter:</strong> {item.reporter}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-white font-medium mb-1">Report Reason:</div>
                <div className="text-gray-300">{item.reason}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye className="w-4 h-4" />
                    View Full Content
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Escalate
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Moderation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Moderation Guidelines</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Financial Advice', desc: 'Verify credentials and accuracy' },
              { title: 'Harassment', desc: 'Zero tolerance for personal attacks' },
              { title: 'Spam Content', desc: 'Remove promotional and irrelevant posts' },
              { title: 'Misinformation', desc: 'Fact-check all market claims' }
            ].map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-orange-400 font-semibold mb-2">{guideline.title}</div>
                <div className="text-gray-400 text-sm">{guideline.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentModeration;
