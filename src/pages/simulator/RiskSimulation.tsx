import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingDown, BarChart3, Target, Zap } from 'lucide-react';

const RiskSimulation: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('market-crash');
  const [portfolioValue] = useState(50000);

  const scenarios = [
    {
      id: 'market-crash',
      name: 'Market Crash (-30%)',
      description: 'Simulate a major market downturn similar to 2008 or 2020',
      impact: -30,
      color: 'from-red-500 to-pink-400',
      icon: <TrendingDown className="w-6 h-6" />
    },
    {
      id: 'recession',
      name: 'Economic Recession (-15%)',
      description: 'Moderate economic downturn affecting most sectors',
      impact: -15,
      color: 'from-orange-500 to-red-400',
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 'sector-rotation',
      name: 'Sector Rotation (-10%)',
      description: 'Specific sector underperformance due to market shifts',
      impact: -10,
      color: 'from-yellow-500 to-orange-400',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 'volatility-spike',
      name: 'Volatility Spike (-20%)',
      description: 'Sudden increase in market volatility and uncertainty',
      impact: -20,
      color: 'from-purple-500 to-red-400',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario)!;
  const projectedLoss = portfolioValue * (Math.abs(selectedScenarioData.impact) / 100);
  const projectedValue = portfolioValue + (portfolioValue * selectedScenarioData.impact / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Risk Simulation
          </h1>
          <p className="text-gray-300">Test your portfolio against various market scenarios</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scenario Selection */}
          <div className="lg:col-span-2">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Select Risk Scenario</h2>
              <div className="grid gap-4">
                {scenarios.map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      selectedScenario === scenario.id
                        ? 'border-red-500 bg-red-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${scenario.color} flex items-center justify-center text-white`}>
                        {scenario.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{scenario.name}</h3>
                        <p className="text-gray-400 text-sm">{scenario.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-400">{scenario.impact}%</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Simulation Results */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Simulation Results</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Current Portfolio Value</div>
                  <div className="text-3xl font-bold text-white">${portfolioValue.toLocaleString()}</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Projected Value</div>
                  <div className="text-3xl font-bold text-red-400">${projectedValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Potential Loss</h3>
                </div>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  -${projectedLoss.toLocaleString()}
                </div>
                <div className="text-gray-300">
                  This represents a {Math.abs(selectedScenarioData.impact)}% decline in your portfolio value
                </div>
              </div>

              {/* Risk Mitigation Suggestions */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Risk Mitigation Strategies
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Increase diversification across asset classes</li>
                  <li>• Consider defensive stocks and bonds</li>
                  <li>• Implement stop-loss orders</li>
                  <li>• Maintain adequate cash reserves</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Risk Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Portfolio Beta</span>
                    <span className="text-white font-semibold">1.2</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-red-400 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Volatility</span>
                    <span className="text-white font-semibold">18.5%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-400 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Max Drawdown</span>
                    <span className="text-white font-semibold">-25%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-400 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Stress Test Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">2008 Crisis:</span>
                  <span className="text-red-400 font-semibold">-42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2020 Pandemic:</span>
                  <span className="text-red-400 font-semibold">-35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tech Bubble:</span>
                  <span className="text-red-400 font-semibold">-28%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Recommended Actions
              </h3>
              <div className="space-y-2 text-sm">
                <div className="text-green-400">✓ Rebalance portfolio quarterly</div>
                <div className="text-green-400">✓ Set stop-loss at -15%</div>
                <div className="text-yellow-400">⚠ Consider reducing tech exposure</div>
                <div className="text-red-400">⚠ Increase cash position to 10%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskSimulation;
