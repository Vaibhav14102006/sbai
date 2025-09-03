import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertCircle, CheckCircle, Users } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Account Terms',
      content: [
        'You must be at least 18 years old to create an account on our platform',
        'You are responsible for maintaining the security of your account credentials',
        'One account per person - sharing accounts is not permitted',
        'You must provide accurate and complete information when registering'
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Acceptable Use',
      content: [
        'Use our platform solely for educational and personal investment learning purposes',
        'Do not share, distribute, or resell course content without explicit permission',
        'Respect other community members and maintain professional conduct in forums',
        'Do not attempt to hack, disrupt, or compromise platform security'
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Intellectual Property',
      content: [
        'All course content, materials, and platform features are our intellectual property',
        'You receive a limited license to access and use content for personal learning',
        'Screenshots, recordings, or redistribution of content is strictly prohibited',
        'User-generated content in forums remains your property but grants us usage rights'
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Disclaimers',
      content: [
        'Educational content is for informational purposes only, not financial advice',
        'Past performance examples do not guarantee future investment results',
        'You are solely responsible for your investment decisions and outcomes',
        'We recommend consulting with qualified financial advisors for personalized advice'
      ]
    }
  ];

  const keyPoints = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Fair Usage',
      description: 'Our terms ensure a fair and educational environment for all users.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Legal Protection',
      description: 'These terms protect both your rights and our platform integrity.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Clear Guidelines',
      description: 'Transparent rules that govern platform usage and user conduct.'
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg">
            Please read these terms carefully before using our educational platform.
          </p>
          <div className="text-gray-400 text-sm mt-4">
            Last updated: January 15, 2024
          </div>
        </motion.div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {keyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
              <p className="text-gray-400 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Terms Sections */}
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
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Payment and Subscription Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Payment and Subscription Terms</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Subscription Plans</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Monthly and annual subscription options available</li>
                <li>• Automatic renewal unless cancelled before billing cycle</li>
                <li>• Access to premium content during active subscription</li>
                <li>• No refunds for partial subscription periods</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Cancellation Policy</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Cancel anytime through your account settings</li>
                <li>• Access continues until end of current billing period</li>
                <li>• No cancellation fees or penalties</li>
                <li>• Reactivation available at any time</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Important Legal Notice</h3>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Educational Purpose:</strong> All content on this platform is provided 
              for educational purposes only. Nothing on this platform constitutes financial, investment, legal, or 
              tax advice.
            </p>
            <p>
              <strong className="text-white">Investment Risk:</strong> All investments carry risk of loss. Past 
              performance does not guarantee future results. You should carefully consider your financial situation 
              and consult with qualified professionals before making investment decisions.
            </p>
            <p>
              <strong className="text-white">Platform Availability:</strong> While we strive for 100% uptime, we 
              cannot guarantee uninterrupted access to our platform. We are not liable for any losses resulting 
              from platform downtime or technical issues.
            </p>
          </div>
        </motion.div>

        {/* Contact and Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Questions About Terms?</h4>
              <p className="text-gray-300 mb-4">
                If you have questions about these terms, please contact our legal team.
              </p>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Contact Legal Team
              </motion.button>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Governing Law</h4>
              <p className="text-gray-300 mb-2">
                These terms are governed by the laws of the State of New York, United States.
              </p>
              <p className="text-gray-300">
                Any disputes will be resolved through binding arbitration in New York, NY.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Agreement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6"
        >
          <p className="text-gray-300">
            By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
