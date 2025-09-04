import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Globe, 
  Menu, 
  X,
  Home,
  BookOpen,
  TrendingUp,
  FileText,
  Users,
  Settings
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const GlassNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user, theme, language, setTheme } = useStore();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Simulator', path: '/simulator', icon: TrendingUp },
    { label: 'Resources', path: '/resources', icon: FileText },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'About', path: '/about', icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme({
      ...theme,
      mode: theme.mode === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-black/30 dark:via-black/20 dark:to-black/30 border-b border-white/30 dark:border-white/10 shadow-2xl shadow-purple-500/10' 
            : 'backdrop-blur-2xl bg-gradient-to-r from-white/15 via-white/8 to-white/15 dark:from-black/25 dark:via-black/15 dark:to-black/25 border-b border-white/20 dark:border-white/5'
        } before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:animate-pulse`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Finnect
                </h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Learn. Trade. Grow.
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-500'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-500'
                  }`}>
                    {item.label}
                  </span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      layoutId="activeNavIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <motion.button
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl border border-white/20 dark:border-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/10 dark:hover:from-white/15 dark:hover:via-white/10 dark:hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors duration-300 group-hover:rotate-12" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors duration-300">{language.toUpperCase()}</span>
              </motion.button>

              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl border border-white/20 dark:border-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/10 dark:hover:from-white/15 dark:hover:via-white/10 dark:hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 group"
                whileHover={{ scale: 1.08, rotateY: 5 }}
                whileTap={{ scale: 0.92 }}
              >
                <Search className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-purple-500 transition-colors duration-300" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl border border-white/20 dark:border-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/10 dark:hover:from-white/15 dark:hover:via-white/10 dark:hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 group relative overflow-hidden"
                whileHover={{ scale: 1.08, rotateY: -5 }}
                whileTap={{ scale: 0.92 }}
              >
                <motion.span 
                  className="text-lg group-hover:scale-110 transition-transform duration-300"
                  animate={{ rotate: theme.mode === 'light' ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme.mode === 'light' ? '🌙' : '☀️'}
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>

              {/* User Avatar */}
              {user ? (
                <Link to="/dashboard">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold relative cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-neutral-900" />
                  </motion.div>
                </Link>
              ) : (
                <Link to="/auth" className="relative z-50">
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 cursor-pointer relative z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl border border-white/20 dark:border-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/10 dark:hover:from-white/15 dark:hover:via-white/10 dark:hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/20 group"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? 
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-300" /> : 
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-300" />
                  }
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-black/90 dark:via-black/80 dark:to-black/90 backdrop-blur-2xl border-b border-white/30 dark:border-white/10 p-6 shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, articles, or topics..."
                  className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-white/60 via-white/40 to-white/60 dark:from-black/60 dark:via-black/40 dark:to-black/60 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 shadow-lg transition-all duration-300"
                  autoFocus
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-2xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.div
            className="absolute top-20 left-4 right-4 bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-black/90 dark:via-black/80 dark:to-black/90 backdrop-blur-2xl rounded-3xl border border-white/30 dark:border-white/10 p-8 shadow-2xl shadow-purple-500/10"
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'hover:bg-white/10 dark:hover:bg-black/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GlassNavbar;