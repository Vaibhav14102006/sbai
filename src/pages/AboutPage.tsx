import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Award, TrendingUp, Globe } from 'lucide-react';
import { scrollAnimations } from '../utils/animations';

const AboutPage: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      scrollAnimations.staggeredCards(timelineItems);
    }
  }, []);

  const milestones = [
    { year: '2020', title: 'Foundation', description: 'Started with a vision to democratize financial education in India' },
    { year: '2021', title: 'SEBI Alignment', description: 'Achieved full compliance with SEBI educational guidelines' },
    { year: '2022', title: 'AI Integration', description: 'Launched AI-powered personalized learning paths' },
    { year: '2023', title: 'Community Growth', description: 'Reached 50,000+ active learners across India' },
    { year: '2024', title: 'Global Expansion', description: 'Extended platform to support 12 regional languages' }
  ];

  const values = [
    { icon: Shield, title: 'Trust & Compliance', description: 'SEBI-aligned content ensuring regulatory compliance' },
    { icon: Target, title: 'Practical Learning', description: 'Hands-on simulations with real market scenarios' },
    { icon: Users, title: 'Community First', description: 'Building a supportive learning community' },
    { icon: Globe, title: 'Accessibility', description: 'Multi-language support for inclusive education' }
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
            className="mb-8"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Empowering India's
              <br />
              Investment Future
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make financial education accessible, engaging, and effective for every Indian investor through cutting-edge technology and SEBI-compliant content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50,000+</div>
              <div className="text-gray-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">15,000+</div>
              <div className="text-gray-400">Certificates Issued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">12</div>
              <div className="text-gray-400">Languages Supported</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To bridge the gap between financial literacy and practical investment skills by providing 
              world-class education that's aligned with Indian regulatory standards and accessible to everyone, 
              regardless of their background or experience level.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in our mission to transform financial education</p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`timeline-item flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-4 border-black"></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SEBI Compliance */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8"
          >
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">SEBI Compliant Platform</h2>
            <p className="text-xl text-gray-300 mb-6">
              Our educational content is fully aligned with SEBI guidelines and NISM standards, 
              ensuring you receive accurate, regulatory-compliant financial education.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" />
                <span>SEBI Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>NISM Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Industry Standards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
