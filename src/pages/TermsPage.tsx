import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Shield } from 'lucide-react';

const TermsPage: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing and using InvestEd platform, you accept and agree to be bound by these Terms and Conditions',
        'If you do not agree to these terms, please do not use our services',
        'These terms apply to all users, including visitors, registered users, and premium subscribers',
        'Your continued use of the platform constitutes acceptance of any updates to these terms'
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: FileText,
      content: [
        'InvestEd provides educational content and tools for learning about financial markets and investing',
        'Our platform includes interactive modules, quizzes, trading simulations, and community features',
        'All educational content is for informational purposes only and does not constitute financial advice',
        'Trading simulations use virtual money and do not involve real financial transactions',
        'We reserve the right to modify, suspend, or discontinue any service at any time'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'You must provide accurate and complete information when creating your account',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You agree not to share your account with others or allow unauthorized access',
        'You must not use the platform for any illegal or unauthorized purposes',
        'You are responsible for all activities that occur under your account'
      ]
    },
    {
      id: 'prohibited-conduct',
      title: 'Prohibited Conduct',
      icon: AlertTriangle,
      content: [
        'Attempting to gain unauthorized access to our systems or other user accounts',
        'Uploading or transmitting viruses, malware, or other harmful code',
        'Harassing, threatening, or intimidating other users',
        'Posting false, misleading, or defamatory content',
        'Using automated tools to access or scrape our platform without permission',
        'Violating any applicable laws or regulations'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: [
        'All content on the platform, including text, graphics, logos, and software, is owned by InvestEd',
        'You may not reproduce, distribute, or create derivative works without our written permission',
        'User-generated content remains your property, but you grant us a license to use it',
        'We respect intellectual property rights and will respond to valid DMCA notices',
        'Any feedback or suggestions you provide may be used by us without compensation'
      ]
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      icon: Scale,
      content: [
        'Our educational content is for informational purposes only and not financial advice',
        'We do not guarantee the accuracy, completeness, or timeliness of any information',
        'Trading simulations may not accurately reflect real market conditions',
        'We are not liable for any investment decisions you make based on our content',
        'Our platform is provided "as is" without warranties of any kind'
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
            <Scale className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Please read these terms carefully before using our platform. They govern your use of InvestEd services.
            </p>
            <div className="text-sm text-gray-400">
              <p>Last updated: January 1, 2024</p>
              <p className="mt-2">Effective date: January 1, 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Terms */}
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
              <h3 className="text-xl font-semibold text-white mb-4">Termination</h3>
              <p className="text-gray-300 mb-4">
                We may terminate or suspend your account at any time for violation of these terms.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Immediate termination for serious violations</li>
                <li>• 30-day notice for non-compliance issues</li>
                <li>• Right to appeal termination decisions</li>
                <li>• Data retention as per Privacy Policy</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Governing Law</h3>
              <p className="text-gray-300 mb-4">
                These terms are governed by the laws of India and subject to Indian jurisdiction.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Disputes resolved under Indian law</li>
                <li>• Mumbai courts have exclusive jurisdiction</li>
                <li>• Arbitration available for certain disputes</li>
                <li>• SEBI regulations apply where applicable</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Acceptance Modal */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Accept Terms & Conditions</h2>
            <p className="text-xl text-gray-300 mb-8">
              By checking the box below, you acknowledge that you have read, understood, and agree to these terms.
            </p>
            
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="checkbox"
                id="accept-terms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="accept-terms" className="text-gray-300 cursor-pointer">
                I have read and agree to the Terms & Conditions
              </label>
            </motion.div>

            {accepted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-green-400 font-semibold">Terms Accepted Successfully!</p>
                <p className="text-gray-400 text-sm mt-2">You can now proceed to use our platform</p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  accepted 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Create Account
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:text-white hover:border-gray-500 transition-all"
              >
                Have Questions?
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Questions About These Terms?</h3>
            <p className="text-gray-300 mb-4">
              Our legal team is available to clarify any questions about these terms and conditions.
            </p>
            <div className="text-sm text-gray-400">
              <p>Legal inquiries: legal@invested.com</p>
              <p className="mt-2">Business hours: Monday - Friday, 9 AM - 6 PM IST</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
