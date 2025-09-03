import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Edit, Trash2, Shield, Ban, CheckCircle, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Moderator' | 'Premium' | 'Free';
  status: 'Active' | 'Suspended' | 'Pending';
  joinDate: string;
  lastActive: string;
  coursesCompleted: number;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'Premium',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      coursesCompleted: 12
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      role: 'Free',
      status: 'Active',
      joinDate: '2024-01-10',
      lastActive: '1 day ago',
      coursesCompleted: 3
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      role: 'Moderator',
      status: 'Active',
      joinDate: '2023-12-20',
      lastActive: '30 minutes ago',
      coursesCompleted: 25
    },
    {
      id: '4',
      name: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      role: 'Premium',
      status: 'Suspended',
      joinDate: '2024-01-08',
      lastActive: '3 days ago',
      coursesCompleted: 8
    }
  ];

  const roles = ['All', 'Admin', 'Moderator', 'Premium', 'Free'];
  const statuses = ['All', 'Active', 'Suspended', 'Pending'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'text-red-400 bg-red-500/20';
      case 'Moderator': return 'text-purple-400 bg-purple-500/20';
      case 'Premium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Free': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-500/20';
      case 'Suspended': return 'text-red-400 bg-red-500/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20';
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              User Management
            </h1>
            <p className="text-gray-300">Manage platform users and permissions</p>
          </div>
          
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-5 h-5" />
            Add User
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '15,247', color: 'from-blue-500 to-cyan-400' },
            { label: 'Active Users', value: '12,891', color: 'from-green-500 to-emerald-400' },
            { label: 'Premium Users', value: '3,456', color: 'from-yellow-500 to-orange-400' },
            { label: 'Suspended', value: '89', color: 'from-red-500 to-pink-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role} Role</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status} Status</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left p-6 text-gray-300 font-semibold">User</th>
                  <th className="text-left p-6 text-gray-300 font-semibold">Role</th>
                  <th className="text-left p-6 text-gray-300 font-semibold">Status</th>
                  <th className="text-left p-6 text-gray-300 font-semibold">Courses</th>
                  <th className="text-left p-6 text-gray-300 font-semibold">Last Active</th>
                  <th className="text-left p-6 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-6 text-white">{user.coursesCompleted}</td>
                    <td className="p-6 text-gray-400">{user.lastActive}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Ban className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Bulk Actions</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'Export Users', icon: <Users className="w-4 h-4" /> },
              { label: 'Send Newsletter', icon: <Mail className="w-4 h-4" /> },
              { label: 'Bulk Suspend', icon: <Ban className="w-4 h-4" /> },
              { label: 'Bulk Activate', icon: <CheckCircle className="w-4 h-4" /> }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.icon}
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserManagement;
