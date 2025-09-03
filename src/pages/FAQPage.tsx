import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Mail } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'Is this platform really free to use?',
          answer: 'Yes! Our basic learning modules, quizzes, and trading simulator are completely free. We also offer premium features for advanced users who want additional tools and personalized mentoring.'
        },
        {
          question: 'Do I need any prior investment knowledge?',
          answer: 'Not at all! Our platform is designed for complete beginners. We start with the basics and gradually build up your knowledge through interactive lessons and practical exercises.'
        },
        {
          question: 'How long does it take to complete the course?',
          answer: 'It depends on your pace and goals. Most users complete the basic modules in 4-6 weeks with 30 minutes of daily study. Our AI adapts the learning path based on your progress and available time.'
        },
        {
          question: 'Is the content aligned with Indian regulations?',
          answer: 'Absolutely! All our content is SEBI-compliant and aligned with NISM certification standards. We regularly update our materials to reflect the latest regulatory changes.'
        }
      ]
    },
    {
      category: 'Learning & Certification',
      questions: [
        {
          question: 'Will I get a certificate after completion?',
          answer: 'Yes! You\'ll receive digital certificates for each module completed and a comprehensive certificate upon finishing the entire program. These are recognized by many financial institutions.'
        },
        {
          question: 'Can I learn in my regional language?',
          answer: 'We support 12+ Indian languages including Hindi, Bengali, Tamil, Telugu, Marathi, and more. You can switch languages anytime during your learning journey.'
        },
        {
          question: 'What if I get stuck on a topic?',
          answer: 'Our platform offers multiple support channels: AI-powered help, community forums, expert mentors, and live Q&A sessions. You\'re never alone in your learning journey.'
        }
      ]
    },
    {
      category: 'Trading Simulator',
      questions: [
        {
          question: 'Is the trading simulator using real market data?',
          answer: 'Yes! Our simulator uses real-time market data with a 15-minute delay, giving you authentic trading experience without any financial risk.'
        },
        {
          question: 'Can I practice options and derivatives trading?',
          answer: 'Absolutely! Our advanced simulator includes options, futures, and other derivative instruments. You can practice complex strategies in a risk-free environment.'
        },
        {
          question: 'How realistic is the portfolio tracking?',
          answer: 'Very realistic! We include factors like brokerage fees, taxes, slippage, and market impact to give you a true-to-life trading experience.'
        }
      ]
    },
    {
      category: 'Technical & Support',
      questions: [
        {
          question: 'Do you have a mobile app?',
          answer: 'Yes! Our mobile app is available for both iOS and Android. You can seamlessly continue your learning and trading practice on any device.'
        },
        {
          question: 'Is my personal data secure?',
          answer: 'Security is our top priority. We use bank-grade encryption, comply with data protection regulations, and never share your personal information with third parties.'
        },
        {
          question: 'What if I face technical issues?',
          answer: 'Our technical support team is available 24/7 via chat, email, and phone. We also have comprehensive video tutorials and troubleshooting guides.'
        }
      ]
    },
    {
      category: 'Community & Advanced Features',
      questions: [
        {
          question: 'How does the community feature work?',
          answer: 'Join discussions with fellow learners, participate in investment challenges, share strategies, and get advice from experienced investors and certified financial advisors.'
        },
        {
          question: 'What are the premium features?',
          answer: 'Premium includes advanced analytics, personalized mentoring, exclusive webinars, priority support, and access to institutional-grade research and market insights.'
        },
        {
          question: 'Can I connect with financial advisors?',
          answer: 'Yes! Our platform connects you with SEBI-registered investment advisors for personalized guidance. You can book one-on-one sessions or join group consultations.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Frequently Asked
              <br />
              Questions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Find answers to common questions about our platform, features, and learning process
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4" />
                              <p className="text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredFaqs.length === 0 && searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">No results found for "{searchTerm}"</p>
                <p className="text-sm mt-2">Try different keywords or browse all categories</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here to help you succeed in your investment journey
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.a
                href="/community/ask-expert"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 rounded-xl text-center hover:border-blue-400/50 transition-all group"
              >
                <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">Ask an Expert</h3>
                <p className="text-gray-300 text-sm">Get personalized answers from certified financial advisors</p>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl text-center hover:border-green-400/50 transition-all group"
              >
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">Contact Support</h3>
                <p className="text-gray-300 text-sm">Reach out to our 24/7 support team for immediate assistance</p>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 text-gray-400 text-sm"
            >
              <p>Average response time: Less than 2 hours</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
