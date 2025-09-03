export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'educator';
  language: 'en' | 'hi' | 'te' | 'ta';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  lastLogin: Date;
  totalPoints: number;
  badges: Badge[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'risk' | 'trading' | 'portfolio' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisites: string[];
  content: ModuleContent[];
  quiz?: Quiz;
  completed?: boolean;
  progress?: number;
}

export interface ModuleContent {
  id: string;
  type: 'text' | 'video' | 'interactive' | 'chart';
  title: string;
  content: string;
  media?: string;
  duration?: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'drag-drop';
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  points: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  holdings: Holding[];
  performance: PerformanceMetrics;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface PerformanceMetrics {
  totalGainLoss: number;
  totalGainLossPercentage: number;
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
  cagr: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercentage: number;
  volume: number;
  high: number;
  low: number;
  open: number;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  totalAmount: number;
  fees: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
}

export interface AppState {
  user: User | null;
  theme: Theme;
  language: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}