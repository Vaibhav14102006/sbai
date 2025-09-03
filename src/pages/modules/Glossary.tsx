import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Search, BookOpen, Star, Filter, ChevronRight, Hash, TrendingUp } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'Basic' | 'Intermediate' | 'Advanced' | 'Technical';
  examples?: string[];
  relatedTerms?: string[];
  importance: 'High' | 'Medium' | 'Low';
}

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const categories = ['All', 'Basic', 'Intermediate', 'Advanced', 'Technical'];

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'alpha',
      term: 'Alpha',
      definition: 'A measure of an investment\'s performance relative to a benchmark index, representing excess return.',
      category: 'Intermediate',
      examples: ['A fund with alpha of 2% outperformed its benchmark by 2%'],
      relatedTerms: ['Beta', 'Sharpe Ratio', 'Benchmark'],
      importance: 'High'
    },
    {
      id: 'beta',
      term: 'Beta',
      definition: 'A measure of a security\'s volatility relative to the overall market.',
      category: 'Intermediate',
      examples: ['Beta of 1.5 means 50% more volatile than market'],
      relatedTerms: ['Alpha', 'Volatility', 'Market Risk'],
      importance: 'High'
    },
    {
      id: 'compound-interest',
      term: 'Compound Interest',
      definition: 'Interest calculated on the initial principal and accumulated interest from previous periods.',
      category: 'Basic',
      examples: ['$1000 at 5% annually becomes $1276.28 in 5 years'],
      relatedTerms: ['Simple Interest', 'Time Value of Money'],
      importance: 'High'
    },
    {
      id: 'diversification',
      term: 'Diversification',
      definition: 'Risk management strategy mixing investments to reduce exposure to any single asset.',
      category: 'Basic',
      examples: ['Investing in stocks, bonds, and real estate'],
      relatedTerms: ['Portfolio', 'Risk Management', 'Asset Allocation'],
      importance: 'High'
    },
    {
      id: 'etf',
      term: 'ETF (Exchange-Traded Fund)',
      definition: 'Investment fund traded on stock exchanges like individual stocks.',
      category: 'Intermediate',
      examples: ['SPY tracks S&P 500 index'],
      relatedTerms: ['Mutual Fund', 'Index Fund', 'Liquidity'],
      importance: 'Medium'
    },
    {
      id: 'futures',
      term: 'Futures Contract',
      definition: 'Agreement to buy/sell asset at predetermined price on future date.',
      category: 'Advanced',
      examples: ['Oil futures, currency futures'],
      relatedTerms: ['Options', 'Derivatives', 'Margin'],
      importance: 'Medium'
    },
    {
      id: 'leverage',
      term: 'Leverage',
      definition: 'Using borrowed capital to increase potential return of investment.',
      category: 'Intermediate',
      examples: ['2:1 leverage doubles both gains and losses'],
      relatedTerms: ['Margin', 'Risk', 'Debt-to-Equity'],
      importance: 'High'
    },
    {
      id: 'market-cap',
      term: 'Market Capitalization',
      definition: 'Total value of company\'s shares in the stock market.',
      category: 'Basic',
      examples: ['Apple\'s market cap exceeds $3 trillion'],
      relatedTerms: ['Share Price', 'Outstanding Shares'],
      importance: 'High'
    },
    {
      id: 'options',
      term: 'Options',
      definition: 'Contracts giving right to buy/sell asset at specific price within timeframe.',
      category: 'Advanced',
      examples: ['Call options, put options'],
      relatedTerms: ['Strike Price', 'Expiration', 'Premium'],
      importance: 'Medium'
    },
    {
      id: 'pe-ratio',
      term: 'P/E Ratio',
      definition: 'Price-to-earnings ratio comparing stock price to earnings per share.',
      category: 'Basic',
      examples: ['P/E of 20 means paying $20 for every $1 of earnings'],
      relatedTerms: ['EPS', 'Valuation', 'Growth Rate'],
      importance: 'High'
    },
    {
      id: 'reit',
      term: 'REIT (Real Estate Investment Trust)',
      definition: 'Company owning/operating income-producing real estate.',
      category: 'Intermediate',
      examples: ['Commercial property REITs, residential REITs'],
      relatedTerms: ['Dividend Yield', 'Real Estate', 'Income'],
      importance: 'Medium'
    },
    {
      id: 'sharpe-ratio',
      term: 'Sharpe Ratio',
      definition: 'Measure of risk-adjusted return comparing excess return to volatility.',
      category: 'Advanced',
      examples: ['Higher Sharpe ratio indicates better risk-adjusted performance'],
      relatedTerms: ['Alpha', 'Beta', 'Standard Deviation'],
      importance: 'Medium'
    },
    {
      id: 'volatility',
      term: 'Volatility',
      definition: 'Degree of variation in trading price over time.',
      category: 'Basic',
      examples: ['High volatility stocks have large price swings'],
      relatedTerms: ['Standard Deviation', 'Risk', 'Beta'],
      importance: 'High'
    },
    {
      id: 'yield',
      term: 'Yield',
      definition: 'Income return on investment, usually expressed as annual percentage.',
      category: 'Basic',
      examples: ['Dividend yield of 3% means $3 annual income per $100 invested'],
      relatedTerms: ['Dividend', 'Interest Rate', 'Return'],
      importance: 'High'
    }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basic': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Technical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'High': return <Star className="w-4 h-4 text-yellow-400 fill-current" />;
      case 'Medium': return <Star className="w-4 h-4 text-gray-400" />;
      case 'Low': return <Star className="w-4 h-4 text-gray-600" />;
      default: return null;
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
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const termVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Dictionary Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4">
              Financial Glossary
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-green-500/20 blur-xl rounded-full"
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
            Your comprehensive dictionary of financial terms and concepts
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
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
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  {category}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Terms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredTerms.map((term, index) => (
            <motion.div
              key={term.id}
              variants={termVariants}
              className="relative group cursor-pointer"
              onClick={() => setSelectedTerm(selectedTerm === term.id ? null : term.id)}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Holographic Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Term Card */}
              <div className={`relative bg-black/60 backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 ${
                selectedTerm === term.id ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(term.category)}`}>
                    {term.category}
                  </div>
                  <div className="flex items-center gap-1">
                    {getImportanceIcon(term.importance)}
                  </div>
                </div>

                {/* Term */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-blue-400" />
                    {term.term}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {term.definition}
                  </p>
                </div>

                {/* Related Terms Preview */}
                {term.relatedTerms && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Related:</div>
                    <div className="flex flex-wrap gap-1">
                      {term.relatedTerms.slice(0, 3).map((related, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded">
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expand Indicator */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    {term.examples ? `${term.examples.length} example${term.examples.length > 1 ? 's' : ''}` : 'No examples'}
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                    selectedTerm === term.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Term View */}
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {filteredTerms.map((term) => (
              selectedTerm === term.id && (
                <div key={term.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Definition */}
                    <div className="lg:col-span-2">
                      <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                        {term.term}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {term.definition}
                      </p>
                      
                      {/* Examples */}
                      {term.examples && (
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-white mb-4">Examples</h4>
                          <div className="space-y-3">
                            {term.examples.map((example, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg"
                              >
                                <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">{example}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Related Terms */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Related Terms</h4>
                      {term.relatedTerms && (
                        <div className="space-y-2">
                          {term.relatedTerms.map((related, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                              onClick={() => {
                                const relatedTerm = glossaryTerms.find(t => t.term === related);
                                if (relatedTerm) setSelectedTerm(relatedTerm.id);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">{related}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
          </motion.div>
        )}

        {/* Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Expand Your Financial Vocabulary</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Master financial terminology with our interactive learning modules and real-world examples.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download PDF
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Glossary;
