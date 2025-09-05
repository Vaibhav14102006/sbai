import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
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
const PasswordResetPage = lazy(() => import('./pages/auth/PasswordResetPage').then(module => ({ default: module.default })));

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
  useEffect(() => {
    setTheme({
      mode: 'dark',
      primaryColor: '#3b82f6',
      accentColor: '#14b8a6',
    });
  }, [setTheme]);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <GlassNavbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* All routes are now public */}
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

            {/* Dashboard & Profile */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Learning Modules */}
            <Route path="/modules" element={<ModulesIndex />} />
            <Route path="/modules/stock-basics" element={<StockBasics />} />
            <Route path="/modules/risk-assessment" element={<RiskAssessment />} />
            <Route path="/modules/algo-trading" element={<AlgoTrading />} />
            <Route path="/modules/portfolio-diversification" element={<PortfolioDiversification />} />
            <Route path="/modules/case-studies" element={<CaseStudies />} />
            <Route path="/modules/advanced-concepts" element={<AdvancedConcepts />} />
            <Route path="/modules/glossary" element={<Glossary />} />

            {/* Quizzes */}
            <Route path="/quizzes" element={<QuizzesIndex />} />
            <Route path="/quizzes/:id" element={<QuizAttempt />} />
            <Route path="/quizzes/:id/results" element={<QuizResults />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* Trading Simulator */}
            <Route path="/simulator" element={<MarketOverview />} />
            <Route path="/simulator/trade" element={<TradingExecution />} />
            <Route path="/simulator/portfolio" element={<Portfolio />} />
            <Route path="/simulator/history" element={<TransactionHistory />} />
            <Route path="/simulator/risk" element={<RiskSimulation />} />

            {/* Resources */}
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/resources/documents" element={<DocumentLibrary />} />
            <Route path="/resources/news" element={<NewsUpdates />} />
            <Route path="/resources/videos" element={<VideoTutorials />} />
            <Route path="/resources/ai-summarizer" element={<AISummarizer />} />

            {/* Community */}
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/community/topic/:id" element={<ForumTopic />} />
            <Route path="/community/ask-expert" element={<AskExpert />} />
            <Route path="/community/events" element={<EventsWebinars />} />

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/quizzes" element={<QuizManagement />} />
            <Route path="/admin/market-data" element={<MarketDataFeed />} />
            <Route path="/admin/analytics" element={<UserAnalytics />} />
            <Route path="/admin/notifications" element={<NotificationManager />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;