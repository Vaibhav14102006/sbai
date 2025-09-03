import { motion } from 'framer-motion';
import { Search, Filter, FileText, Image, Video, FileArchive, Plus, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ContentItem {
  id: string;
  title: string;
  type: 'document' | 'image' | 'video' | 'archive';
  size: string;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
}

const ContentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample content data
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Investment Guide 2025',
      type: 'document',
      size: '2.4 MB',
      lastModified: '2025-09-01',
      status: 'published'
    },
    {
      id: '2',
      title: 'Stock Market Analysis',
      type: 'document',
      size: '1.8 MB',
      lastModified: '2025-08-28',
      status: 'draft'
    },
    {
      id: '3',
      title: 'Financial Planning Webinar',
      type: 'video',
      size: '245 MB',
      lastModified: '2025-08-25',
      status: 'published'
    },
    {
      id: '4',
      title: 'Market Trends Infographic',
      type: 'image',
      size: '3.2 MB',
      lastModified: '2025-08-20',
      status: 'published'
    },
    {
      id: '5',
      title: 'Quarterly Reports Archive',
      type: 'archive',
      size: '45.6 MB',
      lastModified: '2025-08-15',
      status: 'archived'
    }
  ];

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'document': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'image': return <Image className="w-5 h-5 text-green-400" />;
      case 'video': return <Video className="w-5 h-5 text-purple-400" />;
      case 'archive': return <FileArchive className="w-5 h-5 text-yellow-400" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(status) {
      case 'published': 
        return <span className={`${baseClasses} bg-green-900/30 text-green-400`}>Published</span>;
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
              <h1 className="text-2xl font-bold text-white">Content Management</h1>
              <p className="text-gray-400">Manage and organize all your platform content</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="document">Documents</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="archive">Archives</option>
                </select>
              </div>
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-700/50 bg-gray-800/30 text-gray-400 text-sm font-medium">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(filteredItems.map(item => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors duration-200 ${
                    selectedItems.includes(item.id) ? 'bg-gray-800/40' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-xs text-gray-400">Modified {item.lastModified}</div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-300 capitalize">
                    {item.type}
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-400">
                    {item.size}
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
                <FileText className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white">No content found</h3>
                <p className="mt-1 text-sm text-gray-400 max-w-md">
                  {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
                    ? 'No items match your search criteria. Try adjusting your filters.'
                    : 'Get started by uploading your first piece of content.'}
                </p>
                <button className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  <span>Upload Content</span>
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
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                  Download
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                  Move
                </button>
                <button className="px-3 py-1.5 text-sm text-red-400 hover:text-white hover:bg-red-900/30 rounded-md transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Status Bar */}
        <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50 text-xs text-gray-400 flex justify-between items-center">
          <div>{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</div>
          <div className="flex items-center gap-4">
            <span>Storage: 1.2 GB / 10 GB</span>
            <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentManagement;
