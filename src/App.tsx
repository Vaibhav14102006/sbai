import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useAuth } from './hooks/useAuth';
import GlassNavbar from './components/ui/GlassNavbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './styles/glass-effects.css';

// Lazy load all pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// Auth pages
const AuthFlow = lazy(() => import('./components/auth/AuthFlow'));
const OnboardingPage = lazy(() => import('./pages/auth/OnboardingPage'));
const PasswordResetPage = lazy(() => import('./pages/auth/PasswordResetPage'));

// Dashboard & Profile
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const UserProfile = lazy(() => import('./pages/dashboard/UserProfile'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const AchievementsPage = lazy(() => import('./pages/dashboard/AchievementsPage'));
const NotificationsPage = lazy(() => import('./pages/dashboard/NotificationsPage'));

// Learning Modules
const ModulesIndex = lazy(() => import('./pages/modules/ModulesIndex'));
const StockBasics = lazy(() => import('./pages/modules/StockBasics'));
const RiskAssessment = lazy(() => import('./pages/modules/RiskAssessment'));
const AlgoTrading = lazy(() => import('./pages/modules/AlgoTrading'));
const PortfolioDiversification = lazy(() => import('./pages/modules/PortfolioDiversification'));
const CaseStudies = lazy(() => import('./pages/modules/CaseStudies'));
const AdvancedConcepts = lazy(() => import('./pages/modules/AdvancedConcepts'));
const Glossary = lazy(() => import('./pages/modules/Glossary'));

// Quizzes
const QuizzesIndex = lazy(() => import('./pages/quizzes/QuizzesIndex'));
const QuizAttempt = lazy(() => import('./pages/quizzes/QuizAttempt'));
const QuizResults = lazy(() => import('./pages/quizzes/QuizResults'));
const Leaderboard = lazy(() => import('./pages/quizzes/Leaderboard'));

// Trading Simulator
const MarketOverview = lazy(() => import('./pages/simulator/MarketOverview'));
const TradingExecution = lazy(() => import('./pages/simulator/TradingExecution'));
const Portfolio = lazy(() => import('./pages/simulator/Portfolio'));
const TransactionHistory = lazy(() => import('./pages/simulator/TransactionHistory'));
const RiskSimulation = lazy(() => import('./pages/simulator/RiskSimulation'));

// Resources
const ResourcesHub = lazy(() => import('./pages/resources/ResourcesHub'));
const DocumentLibrary = lazy(() => import('./pages/resources/DocumentLibrary'));
const NewsUpdates = lazy(() => import('./pages/resources/NewsUpdates'));
const VideoTutorials = lazy(() => import('./pages/resources/VideoTutorials'));
const AISummarizer = lazy(() => import('./pages/resources/AISummarizer'));

// Community
const CommunityForum = lazy(() => import('./pages/community/CommunityForum'));
const ForumTopic = lazy(() => import('./pages/community/ForumTopic'));
const AskExpert = lazy(() => import('./pages/community/AskExpert'));
const EventsWebinars = lazy(() => import('./pages/community/EventsWebinars'));

// Admin Panel
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ContentManagement = lazy(() => import('./pages/admin/ContentManagement'));
const QuizManagement = lazy(() => import('./pages/admin/QuizManagement'));
const MarketDataFeed = lazy(() => import('./pages/admin/MarketDataFeed'));
const UserAnalytics = lazy(() => import('./pages/admin/UserAnalytics'));
const NotificationManager = lazy(() => import('./pages/admin/NotificationManager'));

function App() {
  const { setTheme } = useStore();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Initialize theme
    setTheme({
      mode: 'dark',
      primaryColor: '#3b82f6',
      accentColor: '#14b8a6',
    });
  }, [setTheme]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
  };

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated && user?.role === 'admin' ? <>{children}</> : <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <GlassNavbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Auth Pages */}
            <Route path="/auth" element={<AuthFlow />} />
            <Route path="/signin" element={<AuthFlow />} />
            <Route path="/signup" element={<AuthFlow />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />

            {/* Protected Dashboard & Profile */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

            {/* Learning Modules */}
            <Route path="/modules" element={<ProtectedRoute><ModulesIndex /></ProtectedRoute>} />
            <Route path="/modules/stock-basics" element={<ProtectedRoute><StockBasics /></ProtectedRoute>} />
            <Route path="/modules/risk-assessment" element={<ProtectedRoute><RiskAssessment /></ProtectedRoute>} />
            <Route path="/modules/algo-trading" element={<ProtectedRoute><AlgoTrading /></ProtectedRoute>} />
            <Route path="/modules/portfolio-diversification" element={<ProtectedRoute><PortfolioDiversification /></ProtectedRoute>} />
            <Route path="/modules/case-studies" element={<ProtectedRoute><CaseStudies /></ProtectedRoute>} />
            <Route path="/modules/advanced-concepts" element={<ProtectedRoute><AdvancedConcepts /></ProtectedRoute>} />
            <Route path="/modules/glossary" element={<ProtectedRoute><Glossary /></ProtectedRoute>} />

            {/* Quizzes */}
            <Route path="/quizzes" element={<ProtectedRoute><QuizzesIndex /></ProtectedRoute>} />
            <Route path="/quizzes/:id" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />
            <Route path="/quizzes/:id/results" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />

            {/* Trading Simulator */}
            <Route path="/simulator" element={<ProtectedRoute><MarketOverview /></ProtectedRoute>} />
            <Route path="/simulator/trade" element={<ProtectedRoute><TradingExecution /></ProtectedRoute>} />
            <Route path="/simulator/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/simulator/history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
            <Route path="/simulator/risk" element={<ProtectedRoute><RiskSimulation /></ProtectedRoute>} />

            {/* Resources */}
            <Route path="/resources" element={<ProtectedRoute><ResourcesHub /></ProtectedRoute>} />
            <Route path="/resources/documents" element={<ProtectedRoute><DocumentLibrary /></ProtectedRoute>} />
            <Route path="/resources/news" element={<ProtectedRoute><NewsUpdates /></ProtectedRoute>} />
            <Route path="/resources/videos" element={<ProtectedRoute><VideoTutorials /></ProtectedRoute>} />
            <Route path="/resources/ai-summarizer" element={<ProtectedRoute><AISummarizer /></ProtectedRoute>} />

            {/* Community */}
            <Route path="/community" element={<ProtectedRoute><CommunityForum /></ProtectedRoute>} />
            <Route path="/community/topic/:id" element={<ProtectedRoute><ForumTopic /></ProtectedRoute>} />
            <Route path="/community/ask-expert" element={<ProtectedRoute><AskExpert /></ProtectedRoute>} />
            <Route path="/community/events" element={<ProtectedRoute><EventsWebinars /></ProtectedRoute>} />

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/content" element={<AdminRoute><ContentManagement /></AdminRoute>} />
            <Route path="/admin/quizzes" element={<AdminRoute><QuizManagement /></AdminRoute>} />
            <Route path="/admin/market-data" element={<AdminRoute><MarketDataFeed /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><UserAnalytics /></AdminRoute>} />
            <Route path="/admin/notifications" element={<AdminRoute><NotificationManager /></AdminRoute>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;