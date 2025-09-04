import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, TrendingUp, Users, Globe, Zap, Award, Target, Play, BarChart3 } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const demoRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      category: 'Learning & Education',
      items: [
        {
          icon: Brain,
          title: 'AI-Powered Learning Paths',
          description: 'Personalized curriculum based on your experience level and learning goals',
          demo: 'Interactive AI recommendation engine',
          color: 'from-purple-500 to-pink-400'
        },
        {
          icon: Globe,
          title: 'Multi-Language Support',
          description: 'Learn in your preferred language with support for 12+ Indian languages',
          demo: 'Language switching demonstration',
          color: 'from-blue-500 to-cyan-400'
        },
        {
          icon: Play,
          title: 'Interactive Video Lessons',
          description: 'Engaging video content with real-time quizzes and practical examples',
          demo: 'Sample interactive lesson',
          color: 'from-green-500 to-emerald-400'
        }
      ]
    },
    {
      category: 'Trading & Simulation',
      items: [
        {
          icon: TrendingUp,
          title: 'Advanced Trading Simulator',
          description: 'Practice with real market data and professional-grade trading tools',
          demo: 'Live trading interface preview',
          color: 'from-orange-500 to-red-400'
        },
        {
          icon: BarChart3,
          title: 'Portfolio Analytics',
          description: 'Comprehensive performance tracking with advanced metrics and insights',
          demo: 'Portfolio dashboard walkthrough',
          color: 'from-indigo-500 to-purple-400'
        },
        {
          icon: Target,
          title: 'Risk Management Tools',
          description: 'Monte Carlo simulations and stress testing for your portfolio',
          demo: 'Risk analysis demonstration',
          color: 'from-yellow-500 to-orange-400'
        }
      ]
    },
    {
      category: 'Community & Gamification',
      items: [
        {
          icon: Users,
          title: 'Expert Community',
          description: 'Connect with mentors, peers, and industry experts for guidance',
          demo: 'Community interaction preview',
          color: 'from-teal-500 to-cyan-400'
        },
        {
          icon: Award,
          title: 'Achievement System',
          description: 'Earn badges, certificates, and compete on global leaderboards',
          demo: 'Achievement gallery tour',
          color: 'from-pink-500 to-rose-400'
        },
        {
          icon: Zap,
          title: 'Real-time Notifications',
          description: 'Stay updated with market alerts, learning reminders, and community updates',
          demo: 'Notification system showcase',
          color: 'from-violet-500 to-purple-400'
        }
      ]
    },
    {
      category: 'Compliance & Security',
      items: [
        {
          icon: Shield,
          title: 'SEBI Compliance',
          description: 'All content aligned with SEBI guidelines and NISM certification standards',
          demo: 'Compliance framework overview',
          color: 'from-emerald-500 to-teal-400'
        }
      ]
    }
  ];

  const comparisonData = [
    { feature: 'Interactive Learning', us: true, competitor1: false, competitor2: true },
    { feature: 'Real Market Data', us: true, competitor1: true, competitor2: false },
    { feature: 'Multi-language Support', us: true, competitor1: false, competitor2: false },
    { feature: 'AI Personalization', us: true, competitor1: false, competitor2: false },
    { feature: 'SEBI Compliance', us: true, competitor1: true, competitor2: false },
    { feature: 'Community Features', us: true, competitor1: false, competitor2: true },
    { feature: 'Mobile App', us: true, competitor1: true, competitor2: true },
    { feature: 'Advanced Analytics', us: true, competitor1: false, competitor2: false }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Powerful Features for
              <br />
              Modern Investors
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive tools and features designed to accelerate your investment learning journey with cutting-edge technology and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      {features.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 px-4 ${categoryIndex % 2 === 1 ? 'bg-gray-900/30' : ''}`}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">{category.category}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Demo Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 bg-gradient-to-r ${feature.color} text-white rounded-lg font-medium opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2`}
                  >
                    <Play className="w-4 h-4" />
                    {feature.demo}
                  </motion.button>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">How We Compare</h2>
            <p className="text-xl text-gray-400">See why we're the preferred choice for investment education</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6 text-white font-semibold">Features</th>
                    <th className="text-center p-6 text-blue-400 font-semibold">Finnect</th>
                    <th className="text-center p-6 text-gray-400 font-semibold">Competitor A</th>
                    <th className="text-center p-6 text-gray-400 font-semibold">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                      <td className="p-6 text-center">
                        {row.us ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {row.competitor1 ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {row.competitor2 ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini Demos Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">See It In Action</h2>
            <p className="text-xl text-gray-400">Interactive previews of our key features</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI Learning Assistant',
                description: 'Watch how our AI adapts to your learning style',
                preview: 'AI recommendation engine demo'
              },
              {
                title: 'Trading Simulator',
                description: 'Experience professional-grade trading tools',
                preview: 'Live market simulation'
              },
              {
                title: 'Portfolio Analytics',
                description: 'Advanced performance tracking and insights',
                preview: 'Real-time analytics dashboard'
              },
              {
                title: 'Interactive Lessons',
                description: 'Engaging video content with quizzes',
                preview: 'Sample lesson walkthrough'
              }
            ].map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all"
              >
                <div className="aspect-video bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                    {demo.preview}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-gray-400">{demo.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <Zap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Experience All Features</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get full access to our comprehensive platform and start your investment journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-white"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-all"
              >
                Request Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
