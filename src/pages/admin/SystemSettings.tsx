import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Shield, Bell, Mail, Globe, Save, RefreshCw } from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

const SystemSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'FinanceEdu Platform',
    siteDescription: 'Advanced Financial Education Platform',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    pushNotifications: false,
    autoBackup: true,
    backupFrequency: 'daily',
    maxFileSize: '10',
    sessionTimeout: '30',
    twoFactorAuth: true,
    passwordComplexity: 'high'
  });

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Settings className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-red-500 to-pink-400'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-400'
    }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">Site Name</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange('siteName', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Site Description</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-24 resize-none"
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Maintenance Mode</div>
          <div className="text-gray-400 text-sm">Temporarily disable site access</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">User Registration</div>
          <div className="text-gray-400 text-sm">Allow new user signups</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.userRegistration}
            onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Auto Backup</div>
          <div className="text-gray-400 text-sm">Automatically backup database</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoBackup}
            onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Backup Frequency</label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Max File Size (MB)</label>
        <input
          type="number"
          value={settings.maxFileSize}
          onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
        />
      </div>
      
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Database className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">Database Status</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Connection</div>
            <div className="text-green-400">Active</div>
          </div>
          <div>
            <div className="text-gray-400">Last Backup</div>
            <div className="text-white">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Two-Factor Authentication</div>
          <div className="text-gray-400 text-sm">Require 2FA for admin accounts</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Password Complexity</label>
        <select
          value={settings.passwordComplexity}
          onChange={(e) => handleSettingChange('passwordComplexity', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Email Notifications</div>
          <div className="text-gray-400 text-sm">Send system notifications via email</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Push Notifications</div>
          <div className="text-gray-400 text-sm">Send browser push notifications</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'database': return renderDatabaseSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      default: return renderGeneralSettings();
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
              System Settings
            </h1>
            <p className="text-gray-300">Configure platform settings and preferences</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white`
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {section.icon}
                    {section.title}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {sections.find(s => s.id === activeSection)?.title}
                </h2>
                <div className="flex gap-3">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </motion.button>
                </div>
              </div>

              {renderContent()}
            </motion.div>
          </div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">System Status</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Server Status', value: 'Online', color: 'text-green-400' },
              { label: 'Database', value: 'Connected', color: 'text-green-400' },
              { label: 'Storage', value: '67% Used', color: 'text-yellow-400' },
              { label: 'Last Update', value: '2 hours ago', color: 'text-blue-400' }
            ].map((status, index) => (
              <motion.div
                key={status.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-gray-400 text-sm mb-1">{status.label}</div>
                <div className={`font-semibold ${status.color}`}>{status.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemSettings;
