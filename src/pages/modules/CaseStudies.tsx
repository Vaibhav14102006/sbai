import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Award, ChevronRight, Play, Eye } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: 'Success' | 'Failure' | 'Recovery' | 'Innovation';
  company: string;
  year: number;
  impact: string;
  description: string;
  keyLessons: string[];
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  color: string;
  image?: string;
}

const CaseStudies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [hoveredStudy, setHoveredStudy] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const categories = ['All', 'Success', 'Failure', 'Recovery', 'Innovation'];

  const caseStudies: CaseStudy[] = [
    {
      id: 'tesla-growth',
      title: 'Tesla\'s Exponential Growth',
      category: 'Success',
      company: 'Tesla Inc.',
      year: 2020,
      impact: '+743% Stock Growth',
      description: 'How Tesla transformed from a niche EV startup to the world\'s most valuable automaker through innovation and strategic positioning.',
      keyLessons: [
        'First-mover advantage in emerging markets',
        'Vertical integration strategy benefits',
        'Brand building through CEO leadership',
        'Sustainable competitive moats'
      ],
      metrics: [
        { label: 'Stock Price', value: '$2,414', change: '+743%' },
        { label: 'Market Cap', value: '$834B', change: '+1,200%' },
        { label: 'Revenue Growth', value: '74%', change: 'YoY' },
        { label: 'Delivery Growth', value: '87%', change: 'YoY' }
      ],
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 'gamestop-squeeze',
      title: 'GameStop Short Squeeze',
      category: 'Innovation',
      company: 'GameStop Corp.',
      year: 2021,
      impact: '+1,625% Peak Gain',
      description: 'The retail investor revolution that challenged institutional short sellers and changed market dynamics forever.',
      keyLessons: [
        'Social media\'s impact on markets',
        'Retail investor coordination power',
        'Short squeeze mechanics',
        'Market structure vulnerabilities'
      ],
      metrics: [
        { label: 'Peak Price', value: '$483', change: '+1,625%' },
        { label: 'Short Interest', value: '140%', change: 'of Float' },
        { label: 'Volume Spike', value: '197M', change: '+2,000%' },
        { label: 'Options Activity', value: '1.7M', change: 'Contracts' }
      ],
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: 'enron-collapse',
      title: 'Enron Accounting Scandal',
      category: 'Failure',
      company: 'Enron Corporation',
      year: 2001,
      impact: '-99.9% Value Lost',
      description: 'One of the largest corporate bankruptcies in history, revealing massive accounting fraud and corporate governance failures.',
      keyLessons: [
        'Importance of financial transparency',
        'Risk of complex financial instruments',
        'Corporate governance critical role',
        'Auditor independence necessity'
      ],
      metrics: [
        { label: 'Stock Decline', value: '$0.67', change: '-99.9%' },
        { label: 'Market Cap Lost', value: '$74B', change: 'Total Loss' },
        { label: 'Employees Affected', value: '20,000', change: 'Jobs Lost' },
        { label: 'Pension Losses', value: '$1.2B', change: 'Employee Funds' }
      ],
      color: 'from-red-500 to-rose-400'
    },
    {
      id: 'apple-recovery',
      title: 'Apple\'s Remarkable Comeback',
      category: 'Recovery',
      company: 'Apple Inc.',
      year: 1997,
      impact: '+50,000% Growth',
      description: 'From near bankruptcy to the world\'s most valuable company through product innovation and strategic focus.',
      keyLessons: [
        'Focus on core competencies',
        'Innovation over market research',
        'Ecosystem strategy benefits',
        'Leadership transformation impact'
      ],
      metrics: [
        { label: 'Stock Growth', value: '$175', change: '+50,000%' },
        { label: 'Market Cap', value: '$3T', change: 'Peak Value' },
        { label: 'Revenue Growth', value: '365B', change: 'Annual' },
        { label: 'Cash Position', value: '$200B', change: 'Reserve' }
      ],
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'zoom-pandemic',
      title: 'Zoom\'s Pandemic Surge',
      category: 'Success',
      company: 'Zoom Technologies',
      year: 2020,
      impact: '+396% Growth',
      description: 'How a video conferencing company became essential infrastructure during the global pandemic.',
      keyLessons: [
        'Scalability importance in crisis',
        'Product-market fit validation',
        'Network effects acceleration',
        'Timing and market readiness'
      ],
      metrics: [
        { label: 'Stock Growth', value: '$568', change: '+396%' },
        { label: 'User Growth', value: '300M', change: 'Daily Users' },
        { label: 'Revenue Growth', value: '326%', change: 'YoY' },
        { label: 'Market Cap', value: '$139B', change: 'Peak' }
      ],
      color: 'from-orange-500 to-yellow-400'
    },
    {
      id: 'crypto-winter',
      title: 'Crypto Market Collapse 2022',
      category: 'Failure',
      company: 'Multiple Exchanges',
      year: 2022,
      impact: '-77% Market Decline',
      description: 'The cryptocurrency market crash that wiped out $2 trillion in value and exposed widespread fraud.',
      keyLessons: [
        'Regulatory uncertainty risks',
        'Leverage dangers in volatile markets',
        'Due diligence importance',
        'Market speculation consequences'
      ],
      metrics: [
        { label: 'Market Cap Loss', value: '$2T', change: '-77%' },
        { label: 'Bitcoin Decline', value: '$15,500', change: '-77%' },
        { label: 'Exchanges Collapsed', value: '12', change: 'Major Firms' },
        { label: 'Investor Losses', value: '$600B', change: 'Retail' }
      ],
      color: 'from-gray-500 to-slate-400'
    }
  ];

  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Success': return <TrendingUp className="w-5 h-5" />;
      case 'Failure': return <TrendingDown className="w-5 h-5" />;
      case 'Recovery': return <Award className="w-5 h-5" />;
      case 'Innovation': return <Users className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Success': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Failure': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'Recovery': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Innovation': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const studyVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Study Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Market Case Studies
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-purple-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn from real-world market events, successes, failures, and transformations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {getCategoryIcon(category)}
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={studyVariants}
              className="relative group perspective-1000 cursor-pointer"
              onHoverStart={() => setHoveredStudy(study.id)}
              onHoverEnd={() => setHoveredStudy(null)}
              onClick={() => setSelectedStudy(selectedStudy === study.id ? null : study.id)}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                z: 30
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Holographic Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${study.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Study Card */}
              <div className={`relative bg-black/60 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300 ${
                selectedStudy === study.id ? 'border-orange-500/50 bg-orange-500/10' : 'border-white/10'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(study.category)}`}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(study.category)}
                      {study.category}
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {study.year}
                  </div>
                </div>

                {/* Company Logo Placeholder */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${study.color} p-0.5 mx-auto`}>
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Floating Particles */}
                  {hoveredStudy === study.id && (
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-orange-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            y: [0, -20, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Study Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{study.company}</p>
                  
                  {/* Impact Metric */}
                  <div className="mb-4">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                      {study.impact}
                    </div>
                    <div className="text-gray-400 text-xs">Key Impact</div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {study.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="bg-gray-800/30 rounded-lg p-2">
                        <div className="text-white font-semibold text-sm">{metric.value}</div>
                        <div className="text-gray-400 text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      className={`flex-1 py-2 bg-gradient-to-r ${study.color} text-white rounded-lg font-medium text-sm flex items-center justify-center gap-1`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-4 h-4" />
                      View Study
                    </motion.button>
                    <motion.button
                      className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Study View */}
        <AnimatePresence>
          {selectedStudy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {filteredStudies.map((study) => (
                selectedStudy === study.id && (
                  <div key={study.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Study Description */}
                      <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">{study.title}</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">{study.description}</p>
                        
                        {/* Key Lessons */}
                        <h4 className="text-xl font-bold text-white mb-4">Key Lessons</h4>
                        <div className="space-y-3">
                          {study.keyLessons.map((lesson, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg"
                            >
                              <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{lesson}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics Panel */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-green-400" />
                          Key Metrics
                        </h4>
                        <div className="space-y-4">
                          {study.metrics.map((metric, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-gray-800/50 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-400 text-sm">{metric.label}</span>
                                {metric.change && (
                                  <span className="text-xs text-orange-400">{metric.change}</span>
                                )}
                              </div>
                              <div className={`text-xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                                {metric.value}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Analyze Your Own Case Studies</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Use our case study framework to analyze market events and develop your investment decision-making skills.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Analysis
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-orange-500/50 text-orange-400 rounded-lg font-medium hover:bg-orange-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudies;
