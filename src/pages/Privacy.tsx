import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, profile details)',
        'Learning progress and course completion data to track your educational journey',
        'Usage analytics to improve our platform and user experience',
        'Payment information processed securely through encrypted third-party providers'
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        'Provide personalized learning experiences and course recommendations',
        'Track your progress and issue certificates upon course completion',
        'Send important updates about your account and new educational content',
        'Improve our platform through anonymized usage analytics'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        'All data is encrypted in transit and at rest using industry-standard protocols',
        'Regular security audits and penetration testing to identify vulnerabilities',
        'Strict access controls limiting employee access to personal information',
        'Secure backup systems with geographic redundancy for data protection'
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Your Rights',
      content: [
        'Access and download your personal data at any time through your account settings',
        'Request correction of inaccurate information or deletion of your account',
        'Opt-out of marketing communications while maintaining essential service emails',
        'Data portability rights allowing you to transfer information to other services'
      ]
    }
  ];

  const principles = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy by Design',
      description: 'We build privacy protection into every feature from the ground up.'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Minimal Data Collection',
      description: 'We only collect information necessary to provide our services.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Compliance',
      description: 'We comply with GDPR, CCPA, and other international privacy laws.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Your privacy is fundamental to our mission. Learn how we protect and handle your data.
          </p>
          <div className="text-gray-400 text-sm mt-4">
            Last updated: January 15, 2024
          </div>
        </motion.div>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
              <p className="text-gray-400 leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Questions About Privacy?</h3>
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact our Privacy Team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Contact Privacy Team
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Download Privacy Policy
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Important Notes</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Cookie Policy:</strong> We use essential cookies for platform functionality 
              and optional analytics cookies to improve user experience. You can manage cookie preferences in your account settings.
            </p>
            <p>
              <strong className="text-white">Third-Party Services:</strong> We work with trusted partners for payment processing, 
              email delivery, and analytics. These partners are bound by strict data protection agreements.
            </p>
            <p>
              <strong className="text-white">Data Retention:</strong> We retain your data only as long as necessary to provide 
              our services or as required by law. You can request data deletion at any time.
            </p>
            <p>
              <strong className="text-white">Policy Updates:</strong> We will notify you of any material changes to this 
              Privacy Policy via email and platform notifications.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
