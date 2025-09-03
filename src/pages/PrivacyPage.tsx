import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Users, FileText } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Learning progress and performance data to personalize your experience',
        'Trading simulation data and portfolio preferences',
        'Device information and usage analytics to improve our platform',
        'Communication preferences and support interactions'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Provide personalized learning experiences and recommendations',
        'Track your progress and issue certificates upon completion',
        'Send important updates about your account and new features',
        'Improve our platform through analytics and user feedback',
        'Comply with regulatory requirements and legal obligations'
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: Lock,
      content: [
        'Bank-grade encryption for all data transmission and storage',
        'Regular security audits and penetration testing',
        'Strict access controls and employee training on data privacy',
        'Compliance with Indian data protection laws and international standards',
        'Secure backup and disaster recovery procedures'
      ]
    },
    {
      id: 'sharing-disclosure',
      title: 'Information Sharing',
      icon: Users,
      content: [
        'We never sell your personal information to third parties',
        'Limited sharing with trusted service providers under strict agreements',
        'Disclosure only when required by law or regulatory authorities',
        'Anonymous, aggregated data may be used for research and analytics',
        'Your explicit consent required for any other sharing'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: FileText,
      content: [
        'Access and download your personal data at any time',
        'Request correction of inaccurate or incomplete information',
        'Delete your account and associated data (with some legal exceptions)',
        'Opt-out of marketing communications while keeping your account active',
        'File complaints with relevant data protection authorities'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your privacy is fundamental to our mission. Learn how we protect and handle your personal information.
            </p>
            <div className="text-sm text-gray-400">
              <p>Last updated: January 1, 2024</p>
              <p className="mt-2">Effective date: January 1, 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-12"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="block text-blue-400 hover:text-blue-300 transition-colors text-sm py-1"
                >
                  {index + 1}. {section.title}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-12 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Data Retention</h3>
              <p className="text-gray-300 mb-4">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Account data: Until account deletion</li>
                <li>• Learning progress: 7 years for certification records</li>
                <li>• Support communications: 3 years</li>
                <li>• Analytics data: 2 years (anonymized)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">International Transfers</h3>
              <p className="text-gray-300 mb-4">
                Your data is primarily stored in India. Any international transfers are protected by appropriate safeguards.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Primary servers located in India</li>
                <li>• Backup systems in secure international facilities</li>
                <li>• All transfers comply with applicable data protection laws</li>
                <li>• Standard contractual clauses for EU transfers</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our Data Protection Officer is here to help with any privacy-related questions or concerns.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <h4 className="font-semibold text-white mb-2">Data Protection Officer</h4>
                <p className="text-gray-300 text-sm">privacy@invested.com</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-white mb-2">Privacy Requests</h4>
                <p className="text-gray-300 text-sm">dpo@invested.com</p>
              </div>
            </div>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Policy Updates</h3>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes via email or through our platform.
            </p>
            <div className="text-sm text-gray-400">
              <p>You can always find the latest version of our Privacy Policy on this page.</p>
              <p className="mt-2">Previous versions are available upon request.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
