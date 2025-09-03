import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Globe,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { User as UserType } from '../../types';
import { AuthService } from '../../services/authService';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const onboardingSchema = z.object({
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  riskProfile: z.enum(['conservative', 'moderate', 'aggressive']),
  language: z.enum(['en', 'hi', 'te', 'ta']),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
});

type SignUpData = z.infer<typeof signUpSchema>;
type SignInData = z.infer<typeof signInSchema>;
type OnboardingData = z.infer<typeof onboardingSchema>;

const AuthFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'signin' | 'signup' | 'onboarding'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial step based on route
    if (location.pathname === '/signup') {
      setCurrentStep('signup');
    } else {
      setCurrentStep('signin');
    }
  }, [location.pathname]);

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onboardingForm = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSignIn = async (data: SignInData) => {
    try {
      const user = await AuthService.signIn(data.email, data.password);
      login(user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      // You can add error handling UI here
    }
  };

  const onGoogleSignIn = async () => {
    try {
      const user = await AuthService.signInWithGoogle();
      login(user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign in error:', error.message);
      // You can add error handling UI here
    }
  };

  const onSignUp = (data: SignUpData) => {
    setCurrentStep('onboarding');
  };

  const onOnboarding = async (data: OnboardingData) => {
    try {
      const signUpData = signUpForm.getValues();
      const user = await AuthService.signUp(signUpData.email, signUpData.password, signUpData.name);
      
      // Update user with onboarding data
      await AuthService.updateUserProfile(user.id, {
        language: data.language,
        riskProfile: data.riskProfile,
        experienceLevel: data.experienceLevel,
      });
      
      const updatedUser: UserType = {
        ...user,
        language: data.language,
        riskProfile: data.riskProfile,
        experienceLevel: data.experienceLevel,
      };
      
      login(updatedUser);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      // You can add error handling UI here
    }
  };

  const interests = [
    { id: 'stocks', label: 'Stocks', icon: TrendingUp },
    { id: 'mutual-funds', label: 'Mutual Funds', icon: Shield },
    { id: 'derivatives', label: 'Derivatives', icon: Globe },
    { id: 'etfs', label: 'ETFs', icon: TrendingUp },
    { id: 'bonds', label: 'Bonds', icon: Shield },
    { id: 'commodities', label: 'Commodities', icon: Globe },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {currentStep === 'signin' && (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-neutral-400">Sign in to continue your learning journey</p>
              </div>

              <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signInForm.register('email')}
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  {signInForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-error-400">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signInForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-error-400">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-neutral-400">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  onClick={onGoogleSignIn}
                  className="mt-4 w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentStep('signup')}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-neutral-400">Start your investment education journey</p>
              </div>

              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signUpForm.register('name')}
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {signUpForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-error-400">
                      {signUpForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signUpForm.register('email')}
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  {signUpForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-error-400">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signUpForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signUpForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-error-400">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      {...signUpForm.register('confirmPassword')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {signUpForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error-400">
                      {signUpForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Setup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-neutral-400">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  onClick={onGoogleSignIn}
                  className="mt-4 w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentStep('signin')}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h1>
                <p className="text-neutral-400">Help us personalize your learning experience</p>
              </div>

              <form onSubmit={onboardingForm.handleSubmit(onOnboarding)} className="space-y-8">
                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-4">
                    What's your investment experience?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'beginner', label: 'Beginner', desc: 'New to investing' },
                      { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with investing' },
                      { value: 'advanced', label: 'Advanced', desc: 'Experienced investor' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          {...onboardingForm.register('experienceLevel')}
                          type="radio"
                          value={option.value}
                          className="mr-4 text-primary-500"
                        />
                        <div>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-neutral-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Profile */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-4">
                    What's your risk tolerance?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'conservative', label: 'Conservative', desc: 'Prefer stable, low-risk investments' },
                      { value: 'moderate', label: 'Moderate', desc: 'Balanced approach to risk and returns' },
                      { value: 'aggressive', label: 'Aggressive', desc: 'Comfortable with high-risk, high-reward' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          {...onboardingForm.register('riskProfile')}
                          type="radio"
                          value={option.value}
                          className="mr-4 text-primary-500"
                        />
                        <div>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-neutral-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-4">
                    Preferred Language
                  </label>
                  <select
                    {...onboardingForm.register('language')}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-4">
                    What are you interested in? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <label key={interest.id} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          type="checkbox"
                          value={interest.id}
                          {...onboardingForm.register('interests')}
                          className="mr-3 text-primary-500"
                        />
                        <interest.icon className="w-5 h-5 text-primary-400 mr-2" />
                        <span className="text-white text-sm">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('signup')}
                    className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle className="mr-2 w-5 h-5" />
                    Complete Setup
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthFlow;