import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Users, Clock, Trophy, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: number;
  duration: number;
  attempts: number;
  avgScore: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

const QuizManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample quiz data
  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Stock Market Fundamentals',
      category: 'Stocks',
      difficulty: 'beginner',
      questions: 15,
      duration: 20,
      attempts: 342,
      avgScore: 78.5,
      status: 'active',
      createdAt: '2025-08-15'
    },
    {
      id: '2',
      title: 'Options Trading Strategies',
      category: 'Options',
      difficulty: 'advanced',
      questions: 25,
      duration: 35,
      attempts: 156,
      avgScore: 65.2,
      status: 'active',
      createdAt: '2025-08-10'
    },
    {
      id: '3',
      title: 'Portfolio Risk Assessment',
      category: 'Risk Management',
      difficulty: 'intermediate',
      questions: 20,
      duration: 30,
      attempts: 89,
      avgScore: 72.8,
      status: 'draft',
      createdAt: '2025-08-05'
    },
    {
      id: '4',
      title: 'Cryptocurrency Basics',
      category: 'Crypto',
      difficulty: 'beginner',
      questions: 12,
      duration: 15,
      attempts: 278,
      avgScore: 81.3,
      status: 'active',
      createdAt: '2025-07-28'
    },
    {
      id: '5',
      title: 'Technical Analysis Deep Dive',
      category: 'Analysis',
      difficulty: 'advanced',
      questions: 30,
      duration: 45,
      attempts: 67,
      avgScore: 58.9,
      status: 'archived',
      createdAt: '2025-07-20'
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(difficulty) {
      case 'beginner': 
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>Beginner</span>;
      case 'intermediate':
        return <span className={`${baseClasses} bg-yellow-900/30 text-yellow-400`}>Intermediate</span>;
      case 'advanced':
        return <span className={`${baseClasses} bg-red-900/30 text-red-400`}>Advanced</span>;
      default:
        return <span className={baseClasses}>{difficulty}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(status) {
      case 'active': 
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>Active</span>;
      case 'draft':
        return <span className={`${baseClasses} bg-blue-900/30 text-blue-400`}>Draft</span>;
      case 'archived':
        return <span className={`${baseClasses} bg-gray-700/50 text-gray-400`}>Archived</span>;
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full p-6"
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Quiz Management</h1>
              <p className="text-gray-400">Create, edit, and manage educational quizzes</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{quizzes.length}</div>
                  <div className="text-sm text-gray-400">Total Quizzes</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{quizzes.reduce((sum, q) => sum + q.attempts, 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Attempts</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length)}%</div>
                  <div className="text-sm text-gray-400">Avg Score</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{Math.round(quizzes.reduce((sum, q) => sum + q.duration, 0) / quizzes.length)}</div>
                  <div className="text-sm text-gray-400">Avg Duration (min)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search quizzes..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Stocks">Stocks</option>
                <option value="Options">Options</option>
                <option value="Risk Management">Risk Management</option>
                <option value="Crypto">Crypto</option>
                <option value="Analysis">Analysis</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quiz List */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-700/50 bg-gray-800/30 text-gray-400 text-sm font-medium">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  checked={selectedItems.length === filteredQuizzes.length && filteredQuizzes.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(filteredQuizzes.map(quiz => quiz.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </div>
              <div className="col-span-4">Quiz Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors duration-200 ${
                    selectedItems.includes(quiz.id) ? 'bg-gray-800/40' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                      checked={selectedItems.includes(quiz.id)}
                      onChange={() => handleSelectItem(quiz.id)}
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{quiz.title}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{quiz.questions} questions</span>
                        <span>•</span>
                        <span>{quiz.duration} min</span>
                        <span>•</span>
                        {getDifficultyBadge(quiz.difficulty)}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-300">
                    {quiz.category}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="text-sm">
                      <div className="text-white font-medium">{quiz.avgScore.toFixed(1)}% avg</div>
                      <div className="text-gray-400">{quiz.attempts} attempts</div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {getStatusBadge(quiz.status)}
                  </div>
                  <div className="col-span-2 flex justify-end items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-full transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <BookOpen className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white">No quizzes found</h3>
                <p className="mt-1 text-sm text-gray-400 max-w-md">
                  {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all'
                    ? 'No quizzes match your search criteria. Try adjusting your filters.'
                    : 'Get started by creating your first quiz.'}
                </p>
                <button className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  <span>Create Quiz</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                {selectedItems.length} quiz{selectedItems.length !== 1 ? 'zes' : ''} selected
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                  Duplicate
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                  Archive
                </button>
                <button className="px-3 py-1.5 text-sm text-red-400 hover:text-white hover:bg-red-900/30 rounded-md transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizManagement;
