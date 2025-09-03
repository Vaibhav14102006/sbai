import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, FileText, Zap, Download, Copy } from 'lucide-react';

const AISummarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setSummary(`This is a ${summaryLength} AI-generated summary of the provided text. The key points include market analysis, investment strategies, and risk management principles that are essential for successful trading.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            AI Document Summarizer
          </h1>
          <p className="text-gray-300">Transform lengthy documents into concise, actionable summaries</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Input Document</h2>
            
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Summary Length</label>
              <div className="flex gap-2">
                {(['short', 'medium', 'long'] as const).map((length) => (
                  <motion.button
                    key={length}
                    onClick={() => setSummaryLength(length)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      summaryLength === length
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'border border-gray-600 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {length.charAt(0).toUpperCase() + length.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your document text here or upload a file..."
              className="w-full h-64 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
            />

            <div className="flex gap-4 mt-6">
              <motion.button
                onClick={handleSummarize}
                disabled={!inputText.trim() || isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: !inputText.trim() || isLoading ? 1 : 1.02 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-5 h-5" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Summarize
                  </>
                )}
              </motion.button>
              
              <motion.button
                className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Upload className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">AI Summary</h2>
            
            {summary ? (
              <div>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6 min-h-64">
                  <p className="text-gray-300 leading-relaxed">{summary}</p>
                </div>
                
                <div className="flex gap-4">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated summary will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Smart Analysis', desc: 'AI identifies key points and themes', icon: <Brain className="w-8 h-8" /> },
            { title: 'Multiple Formats', desc: 'Support for various document types', icon: <FileText className="w-8 h-8" /> },
            { title: 'Instant Results', desc: 'Get summaries in seconds', icon: <Zap className="w-8 h-8" /> }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISummarizer;
