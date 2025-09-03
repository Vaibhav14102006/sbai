import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@headlessui/react';
import { Globe, TrendingUp, Shield, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [experience, setExperience] = useState('beginner');
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const progressRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const investmentAreas = [
    { id: 'stocks', name: 'Stock Trading', icon: TrendingUp, color: 'from-green-500 to-emerald-400' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: Shield, color: 'from-blue-500 to-cyan-400' },
    { id: 'derivatives', name: 'Options & Derivatives', icon: Brain, color: 'from-purple-500 to-pink-400' },
    { id: 'analysis', name: 'Technical Analysis', icon: TrendingUp, color: 'from-orange-500 to-red-400' }
  ];

  useEffect(() => {
    // Update radial progress
    if (progressRef.current) {
      const progress = (step / 4) * 100;
      progressRef.current.style.background = `conic-gradient(from 0deg, #3b82f6 0%, #3b82f6 ${progress}%, #374151 ${progress}%, #374151 100%)`;
    }
  }, [step]);

  const handleComplete = () => {
    // Store onboarding data
    const onboardingData = {
      riskTolerance,
      language: selectedLanguage,
      experience,
      interests,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    navigate('/dashboard');
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Indicator */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div 
              ref={progressRef}
              className="absolute inset-0 rounded-full p-2"
              style={{ background: 'conic-gradient(from 0deg, #3b82f6 0%, #3b82f6 25%, #374151 25%, #374151 100%)' }}
            >
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-400">{step}/4</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Let's Personalize Your Experience</h1>
          <p className="text-gray-400">Help us tailor the perfect learning journey for you</p>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Risk Assessment</h2>
                <p className="text-gray-400">How comfortable are you with investment risk?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={riskTolerance}
                      onChange={(e) => setRiskTolerance(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                      style={{ left: `calc(${riskTolerance}% - 8px)` }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-lg font-semibold text-blue-400">{riskTolerance}%</span>
                  </div>
                </div>

                {/* Risk meter visualization */}
                <motion.div
                  className="relative w-48 h-24 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="8"
                    />
                    <motion.path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (riskTolerance / 100) * 251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (riskTolerance / 100) * 251.2 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.line
                      x1="100"
                      y1="80"
                      x2={100 + 60 * Math.cos((Math.PI * riskTolerance) / 100 - Math.PI)}
                      y2={80 + 60 * Math.sin((Math.PI * riskTolerance) / 100 - Math.PI)}
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: (riskTolerance / 100) * 180 - 90 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ transformOrigin: '100px 80px' }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Choose Your Language</h2>
                <p className="text-gray-400">Select your preferred language for learning</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedLanguage === lang.code
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <motion.div
                      className="text-3xl mb-2"
                      animate={selectedLanguage === lang.code ? { rotateY: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {lang.flag}
                    </motion.div>
                    <div className="text-white font-medium">{lang.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Experience Level</h2>
                <p className="text-gray-400">What's your current investment knowledge?</p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'beginner', label: 'Complete Beginner', desc: 'New to investing and financial markets' },
                  { value: 'basic', label: 'Basic Knowledge', desc: 'Some understanding of basic concepts' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Have made some investments before' },
                  { value: 'advanced', label: 'Advanced', desc: 'Experienced with various investment strategies' }
                ].map((level) => (
                  <motion.button
                    key={level.value}
                    onClick={() => setExperience(level.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      experience === level.value
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-white font-medium">{level.label}</div>
                    <div className="text-gray-400 text-sm mt-1">{level.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Areas of Interest</h2>
                <p className="text-gray-400">What would you like to focus on? (Select multiple)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {investmentAreas.map((area) => (
                  <motion.button
                    key={area.id}
                    onClick={() => toggleInterest(area.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      interests.includes(area.id)
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <area.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-white font-medium text-center">{area.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                onClick={() => setStep(step - 1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-all"
              >
                Back
              </motion.button>
            )}
            
            <motion.button
              onClick={step === 4 ? handleComplete : () => setStep(step + 1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold flex items-center gap-2 group"
            >
              {step === 4 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
