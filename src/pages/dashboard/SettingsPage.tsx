import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Trash2,
  Eye,
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    // Account Settings
    twoFactorAuth: true,
    emailVerification: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    courseReminders: true,
    achievementAlerts: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    learningProgress: 'friends',
    achievements: 'public',
    
    // Appearance Settings
    theme: 'dark',
    language: 'english',
    soundEffects: true,
    animations: true,
    
    // Learning Settings
    autoplay: true,
    subtitles: false,
    playbackSpeed: 1,
    dailyGoal: 30
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelect = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingSections = [
    {
      title: 'Account & Security',
      icon: Shield,
      settings: [
        {
          key: 'twoFactorAuth',
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          type: 'toggle',
          value: settings.twoFactorAuth
        },
        {
          key: 'emailVerification',
          label: 'Email Verification',
          description: 'Verify your email for account security',
          type: 'toggle',
          value: settings.emailVerification
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive updates via email',
          type: 'toggle',
          value: settings.emailNotifications
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Get notifications on your device',
          type: 'toggle',
          value: settings.pushNotifications
        },
        {
          key: 'courseReminders',
          label: 'Course Reminders',
          description: 'Reminders for incomplete courses',
          type: 'toggle',
          value: settings.courseReminders
        },
        {
          key: 'achievementAlerts',
          label: 'Achievement Alerts',
          description: 'Notifications for new achievements',
          type: 'toggle',
          value: settings.achievementAlerts
        }
      ]
    },
    {
      title: 'Privacy',
      icon: Eye,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Profile Visibility',
          description: 'Who can see your profile',
          type: 'select',
          value: settings.profileVisibility,
          options: [
            { value: 'public', label: 'Public' },
            { value: 'friends', label: 'Friends Only' },
            { value: 'private', label: 'Private' }
          ]
        },
        {
          key: 'learningProgress',
          label: 'Learning Progress',
          description: 'Who can see your learning progress',
          type: 'select',
          value: settings.learningProgress,
          options: [
            { value: 'public', label: 'Public' },
            { value: 'friends', label: 'Friends Only' },
            { value: 'private', label: 'Private' }
          ]
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          description: 'Choose your preferred theme',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'auto', label: 'Auto' }
          ]
        },
        {
          key: 'language',
          label: 'Language',
          description: 'Select your preferred language',
          type: 'select',
          value: settings.language,
          options: [
            { value: 'english', label: 'English' },
            { value: 'hindi', label: 'हिंदी' },
            { value: 'spanish', label: 'Español' }
          ]
        },
        {
          key: 'animations',
          label: 'Animations',
          description: 'Enable smooth animations',
          type: 'toggle',
          value: settings.animations
        },
        {
          key: 'soundEffects',
          label: 'Sound Effects',
          description: 'Play sounds for interactions',
          type: 'toggle',
          value: settings.soundEffects
        }
      ]
    },
    {
      title: 'Learning Preferences',
      icon: User,
      settings: [
        {
          key: 'autoplay',
          label: 'Autoplay Videos',
          description: 'Automatically play next video',
          type: 'toggle',
          value: settings.autoplay
        },
        {
          key: 'subtitles',
          label: 'Subtitles',
          description: 'Show subtitles by default',
          type: 'toggle',
          value: settings.subtitles
        },
        {
          key: 'dailyGoal',
          label: 'Daily Learning Goal',
          description: 'Minutes per day',
          type: 'select',
          value: settings.dailyGoal.toString(),
          options: [
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' },
            { value: '120', label: '2 hours' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Customize your InvestEd: India's Multilingual Stock Market Learning Platform experience</p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: settingIndex * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{setting.label}</h3>
                      <p className="text-sm text-gray-400">{setting.description}</p>
                    </div>

                    <div className="ml-4">
                      {setting.type === 'toggle' ? (
                        <motion.button
                          onClick={() => handleToggle(setting.key)}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            setting.value ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          <motion.div
                            animate={{
                              x: setting.value ? 24 : 2
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          />
                        </motion.button>
                      ) : (
                        <select
                          value={typeof setting.value === 'boolean' ? String(setting.value) : setting.value}
                          onChange={(e) => handleSelect(setting.key, e.target.value)}
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mt-8"
        >
          <div className="flex items-center gap-3 mb-6">
            {/* Download icon removed for lint error fix */}
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all"
            >
              {/* Download icon removed for lint error fix */}
              <div className="text-left">
                <div className="font-medium">Export Data</div>
                <div className="text-sm opacity-80">Download your learning data</div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Delete Account</div>
                <div className="text-sm opacity-80">Permanently delete your account</div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
