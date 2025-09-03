import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Users, 
  Award, 
  Brain,
  Target,
  Globe
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Learning',
      description: 'Master investment fundamentals with interactive modules, real-world case studies, and expert insights.',
      color: 'from-blue-500 to-purple-600',
      delay: 0.1,
    },
    {
      icon: TrendingUp,
      title: 'Trading Simulator',
      description: 'Practice with virtual portfolios using real market data. Learn without risking your capital.',
      color: 'from-green-500 to-teal-600',
      delay: 0.2,
    },
    {
      icon: Shield,
      title: 'SEBI Compliant',
      description: 'Content aligned with SEBI guidelines ensuring you learn authentic, regulation-compliant strategies.',
      color: 'from-orange-500 to-red-600',
      delay: 0.3,
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with seasoned investors, ask questions, and learn from real trading experiences.',
      color: 'from-pink-500 to-rose-600',
      delay: 0.4,
    },
    {
      icon: Award,
      title: 'Certified Learning',
      description: 'Earn recognized certificates and badges as you progress through modules and assessments.',
      color: 'from-indigo-500 to-blue-600',
      delay: 0.5,
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized learning recommendations and market insights powered by advanced AI.',
      color: 'from-cyan-500 to-blue-600',
      delay: 0.6,
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Understand your risk tolerance and learn strategies tailored to your investment profile.',
      color: 'from-yellow-500 to-orange-600',
      delay: 0.7,
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Learn in your preferred language with content available in Hindi, Telugu, Tamil, and English.',
      color: 'from-purple-500 to-pink-600',
      delay: 0.8,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-primary-400 font-medium">
              ✨ Comprehensive Features
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              To Succeed
            </span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven investment education 
            methodologies to create the ultimate learning experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -8 }}
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary-400/50 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-holographic animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              Explore All Features
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;