import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Award, Globe, MoreHorizontal, BookOpen, Target, MessageCircle, Search, Lightbulb, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollAnimations, animationUtils } from '../utils/animations';

const LandingPage: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  const fullText = 'Master Financial Markets Through Smart Learning';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    if (!animationUtils.respectsReducedMotion()) {
      // Counter animations only
      if (countersRef.current) {
        const counters = countersRef.current.querySelectorAll('.counter');
        scrollAnimations.staggeredCards(counters);
      }
    }
  }, []);

  const stats = [
    { icon: Users, label: 'Active Learners', value: '50,000+', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Trades Simulated', value: '2M+', color: 'text-green-400' },
    { icon: Award, label: 'Certificates Issued', value: '15,000+', color: 'text-yellow-400' },
    { icon: Globe, label: 'Languages', value: '12', color: 'text-purple-400' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'New Investor',
      content: 'This platform made stock market concepts so clear. The simulations helped me practice without real money risk.',
      avatar: '/avatars/priya.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Finance Student',
      content: 'The SEBI-aligned content and interactive quizzes prepared me perfectly for my NISM certification.',
      avatar: '/avatars/rajesh.jpg'
    },
    {
      name: 'Anita Patel',
      role: 'Working Professional',
      content: 'I learned portfolio diversification through hands-on simulations. Now I invest confidently.',
      avatar: '/avatars/anita.jpg'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Glass Rod at Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent backdrop-blur-xl border-b border-cyan-400/30 shadow-lg shadow-cyan-400/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/40 to-purple-500/20 animate-pulse" />
      </div>

      {/* Feature Sidebar */}
      <motion.div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-3 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:from-white/30 hover:via-white/20 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 group"
        >
          <MoreHorizontal className="w-6 h-6 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.8 }}
              className="absolute right-16 top-0 w-64 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10"
            >
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Platform Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Interactive Learning</div>
                    <div className="text-gray-400 text-xs">50+ modules with real examples</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Trading Simulator</div>
                    <div className="text-gray-400 text-xs">Risk-free practice trading</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
                  <Target className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium text-sm">AI-Powered Quizzes</div>
                    <div className="text-gray-400 text-xs">Personalized assessments</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                🚀 SEBI-Aligned Financial Education
              </span>
            </motion.div>

            <h1 
              ref={headlineRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight min-h-[200px] flex items-center justify-center text-center px-4 w-full max-w-6xl mx-auto"
            >
              <span className="typewriter-text w-full text-center break-words hyphens-auto">
                {typewriterText}
                <span className="animate-pulse text-cyan-400">|</span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Practice trading with virtual money in our realistic market simulator.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/simulator">
                <motion.button
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl font-bold text-white text-lg overflow-hidden shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Open Trading Platform
                    <TrendingUp className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 3D Globe Features Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trading Platform Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience advanced trading tools in a risk-free environment
              </p>
            </motion.div>

            <div className="relative flex items-center justify-center">
              {/* 3D Globe Container */}
              <motion.div
                className="relative w-80 h-80 mx-auto"
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Globe Base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-400/30 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60 backdrop-blur-sm" />
                </div>

                {/* Floating Feature Icons */}
                {[
                  { icon: TrendingUp, label: 'Open Trading Platform', position: 'top-4 left-8', color: 'text-green-400', delay: 0, link: '/trading-platform' },
                  { icon: Search, label: 'Browse All', position: 'top-12 right-4', color: 'text-blue-400', delay: 0.5, link: '/browse-all' },
                  { icon: Lightbulb, label: 'Get Recommendations', position: 'bottom-8 left-4', color: 'text-yellow-400', delay: 1, link: '/recommendations' },
                  { icon: FileText, label: 'Access Resource', position: 'bottom-4 right-8', color: 'text-purple-400', delay: 1.5, link: '/resources' },
                  { icon: MessageCircle, label: 'Start New Discussion', position: 'top-1/2 left-0', color: 'text-cyan-400', delay: 2, link: '/new-discussion' },
                  { icon: Users, label: 'Recent Discussions', position: 'top-1/2 right-0', color: 'text-orange-400', delay: 2.5, link: '/recent-discussions' }
                ].map((feature, index) => (
                  <Link key={index} to={feature.link}>
                    <motion.div
                      className={`absolute ${feature.position} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: feature.delay, duration: 0.5 }}
                      whileHover={{ scale: 1.2, z: 20 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="relative group">
                        <div className="w-16 h-16 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                          <feature.icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-xs text-white whitespace-nowrap">
                            {feature.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* Globe Grid Lines */}
                <div className="absolute inset-4 rounded-full border border-cyan-400/20">
                  <div className="absolute inset-0 rounded-full border-l border-r border-cyan-400/10" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
                  <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
                </div>

                {/* Central Glow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Counters */}
        <section ref={countersRef} className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="counter text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-4">
                    <stat.icon className={`w-12 h-12 ${stat.color} mx-auto group-hover:scale-110 transition-transform`} />
                    <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full" />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Carousel */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-400">
                Real learners, real results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trading CTA */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ready to Begin Your Investment Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Practice trading with virtual money in our realistic market simulator
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg font-semibold text-white text-lg"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                <Link to="/simulator">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg font-semibold text-white text-lg"
                  >
                    Try Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">InvestEd: India's Multilingual Stock Market Learning Platform</h3>
                <p className="text-gray-400 text-sm">
                  Empowering investors through education and simulation
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Education</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/modules" className="hover:text-white transition-colors">Stock Basics</a></li>
                  <li><a href="/modules" className="hover:text-white transition-colors">Risk Assessment</a></li>
                  <li><a href="/modules" className="hover:text-white transition-colors">Portfolio Management</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Practice</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/simulator" className="hover:text-white transition-colors">Trading Simulator</a></li>
                  <li><a href="/quizzes" className="hover:text-white transition-colors">Quizzes</a></li>
                  <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              © 2024 InvestEd: India's Multilingual Stock Market Learning Platform. All rights reserved. | SEBI Compliant Educational Platform
            </div>
          </div>
        </footer>
    </div>
  );
};

export default LandingPage;
