import { motion } from 'framer-motion';
import { Search, Filter, Plus, Send, Bell, Users, Calendar, Settings, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'alert' | 'reminder' | 'promotion';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  recipients: number;
  scheduledFor?: string;
  sentAt?: string;
  openRate?: number;
  clickRate?: number;
}

const NotificationManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample notification data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Trading Module Available',
      message: 'Learn advanced options trading strategies in our latest module.',
      type: 'announcement',
      status: 'sent',
      recipients: 8432,
      sentAt: '2025-09-03 10:30:00',
      openRate: 68.5,
      clickRate: 12.3
    },
    {
      id: '2',
      title: 'Market Alert: High Volatility',
      message: 'Current market conditions show increased volatility. Review your portfolio.',
      type: 'alert',
      status: 'sent',
      recipients: 12847,
      sentAt: '2025-09-03 09:15:00',
      openRate: 85.2,
      clickRate: 23.7
    },
    {
      id: '3',
      title: 'Weekly Quiz Challenge',
      message: 'Test your knowledge with this week\'s financial literacy quiz.',
      type: 'reminder',
      status: 'scheduled',
      recipients: 9876,
      scheduledFor: '2025-09-04 14:00:00'
    },
    {
      id: '4',
      title: 'Premium Membership Offer',
      message: 'Upgrade to premium and get access to exclusive content and features.',
      type: 'promotion',
      status: 'draft',
      recipients: 5432
    },
    {
      id: '5',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM EST.',
      type: 'announcement',
      status: 'failed',
      recipients: 12847,
      scheduledFor: '2025-09-02 20:00:00'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'announcement': return <Bell className="w-5 h-5 text-blue-400" />;
      case 'alert': return <Bell className="w-5 h-5 text-red-400" />;
      case 'reminder': return <Calendar className="w-5 h-5 text-yellow-400" />;
      case 'promotion': return <Users className="w-5 h-5 text-green-400" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(type) {
      case 'announcement': 
        return <span className={`${baseClasses} bg-blue-900/30 text-blue-400`}>Announcement</span>;
      case 'alert':
        return <span className={`${baseClasses} bg-red-900/30 text-red-400`}>Alert</span>;
      case 'reminder':
        return <span className={`${baseClasses} bg-yellow-900/30 text-yellow-400`}>Reminder</span>;
      case 'promotion':
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>Promotion</span>;
      default:
        return <span className={baseClasses}>{type}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(status) {
      case 'sent': 
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>Sent</span>;
      case 'scheduled':
        return <span className={`${baseClasses} bg-blue-900/30 text-blue-400`}>Scheduled</span>;
      case 'draft':
        return <span className={`${baseClasses} bg-gray-700/50 text-gray-400`}>Draft</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-900/30 text-red-400`}>Failed</span>;
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

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
              <h1 className="text-2xl font-bold text-white">Notification Manager</h1>
              <p className="text-gray-400">Create and manage user notifications and announcements</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <Plus className="w-4 h-4" />
                <span>Create Notification</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Send className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{notifications.filter(n => n.status === 'sent').length}</div>
                  <div className="text-sm text-gray-400">Sent Today</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{notifications.filter(n => n.status === 'scheduled').length}</div>
                  <div className="text-sm text-gray-400">Scheduled</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{notifications.reduce((sum, n) => sum + n.recipients, 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Recipients</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(notifications.filter(n => n.openRate).reduce((sum, n) => sum + (n.openRate || 0), 0) / notifications.filter(n => n.openRate).length)}%
                  </div>
                  <div className="text-sm text-gray-400">Avg Open Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcements</option>
                <option value="alert">Alerts</option>
                <option value="reminder">Reminders</option>
                <option value="promotion">Promotions</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="sent">Sent</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-700/50 bg-gray-800/30 text-gray-400 text-sm font-medium">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  checked={selectedItems.length === filteredNotifications.length && filteredNotifications.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(filteredNotifications.map(notification => notification.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </div>
              <div className="col-span-4">Notification</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors duration-200 ${
                    selectedItems.includes(notification.id) ? 'bg-gray-800/40' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                      checked={selectedItems.includes(notification.id)}
                      onChange={() => handleSelectItem(notification.id)}
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{notification.title}</div>
                      <div className="text-xs text-gray-400 line-clamp-1">{notification.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.recipients.toLocaleString()} recipients
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {getTypeBadge(notification.type)}
                  </div>
                  <div className="col-span-2 flex items-center">
                    {notification.openRate !== undefined ? (
                      <div className="text-sm">
                        <div className="text-white font-medium">{notification.openRate}% open</div>
                        <div className="text-gray-400">{notification.clickRate}% click</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {notification.status === 'scheduled' ? 'Pending' : 'No data'}
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 flex items-center">
                    {getStatusBadge(notification.status)}
                  </div>
                  <div className="col-span-2 flex justify-end items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-full transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <Bell className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white">No notifications found</h3>
                <p className="mt-1 text-sm text-gray-400 max-w-md">
                  {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
                    ? 'No notifications match your search criteria. Try adjusting your filters.'
                    : 'Get started by creating your first notification.'}
                </p>
                <button className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  <span>Create Notification</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                {selectedItems.length} notification{selectedItems.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                  Duplicate
                </button>
                <button className="px-3 py-1.5 text-sm text-blue-400 hover:text-white hover:bg-blue-900/30 rounded-md transition-colors">
                  Send Now
                </button>
                <button className="px-3 py-1.5 text-sm text-red-400 hover:text-white hover:bg-red-900/30 rounded-md transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50 text-xs text-gray-400 flex justify-between items-center">
          <div>{filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}</div>
          <div className="flex items-center gap-4">
            <span>Email Provider: SendGrid</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationManager;
