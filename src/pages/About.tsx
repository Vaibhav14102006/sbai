import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, BookOpen, Shield } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Active Learners', value: '50,000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Courses Available', value: '200+', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Success Rate', value: '94%', icon: <Award className="w-6 h-6" /> },
    { label: 'Years Experience', value: '10+', icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission-Driven',
      description: 'Democratizing financial education to empower everyone with investment knowledge.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Security',
      description: 'Your data and learning journey are protected with enterprise-grade security.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community First',
      description: 'Building a supportive community where learners grow together.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      background: 'Former Goldman Sachs VP with 15 years in investment banking',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      background: 'Ex-Google engineer specializing in fintech and educational platforms',
      avatar: 'MC'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Education',
      background: 'PhD in Finance, former professor at Wharton Business School',
      avatar: 'ER'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            About FinanceEdu
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make financial education accessible, engaging, and effective for everyone. 
            Through cutting-edge technology and expert-crafted content, we're transforming how people learn about investing.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded in 2014, FinanceEdu emerged from a simple observation: traditional financial education 
                was failing to prepare people for real-world investing challenges. Our founders, coming from 
                backgrounds in finance and technology, saw an opportunity to revolutionize learning.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                We started with a vision to create an immersive, interactive platform that would make complex 
                financial concepts accessible to everyone, regardless of their background or experience level.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we're proud to serve over 50,000 learners worldwide, helping them build confidence 
                and competence in their investment journey through our comprehensive curriculum and 
                cutting-edge simulation tools.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">2014</div>
                <div className="text-gray-300 mb-4">Founded</div>
                <div className="text-2xl font-bold text-purple-400 mb-2">50K+</div>
                <div className="text-gray-300 mb-4">Students Educated</div>
                <div className="text-2xl font-bold text-green-400 mb-2">$2M+</div>
                <div className="text-gray-300">Portfolio Simulated</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-blue-400 font-medium mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.background}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their financial future through our comprehensive education platform.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Today
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
