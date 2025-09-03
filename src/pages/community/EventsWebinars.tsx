import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, MapPin, Star, Filter, Search, Play } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference' | 'meetup';
  date: string;
  time: string;
  duration: string;
  instructor: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  rating: number;
  isLive: boolean;
  isRegistered: boolean;
  location?: string;
}

const EventsWebinars: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const events: Event[] = [
    {
      id: '1',
      title: 'Advanced Options Strategies Masterclass',
      description: 'Deep dive into complex options strategies including iron condors, butterflies, and calendar spreads.',
      type: 'webinar',
      date: '2024-01-25',
      time: '2:00 PM EST',
      duration: '90 minutes',
      instructor: 'Michael Chen',
      attendees: 234,
      maxAttendees: 500,
      price: 0,
      rating: 4.8,
      isLive: false,
      isRegistered: true
    },
    {
      id: '2',
      title: 'Market Analysis Workshop: Q1 2024 Outlook',
      description: 'Interactive workshop analyzing market trends and preparing investment strategies for the first quarter.',
      type: 'workshop',
      date: '2024-01-20',
      time: '10:00 AM EST',
      duration: '3 hours',
      instructor: 'Sarah Johnson',
      attendees: 45,
      maxAttendees: 50,
      price: 99,
      rating: 4.9,
      isLive: true,
      isRegistered: false,
      location: 'New York, NY'
    },
    {
      id: '3',
      title: 'Cryptocurrency Investment Fundamentals',
      description: 'Learn the basics of cryptocurrency investing, blockchain technology, and portfolio allocation strategies.',
      type: 'webinar',
      date: '2024-01-22',
      time: '7:00 PM EST',
      duration: '60 minutes',
      instructor: 'Alex Rodriguez',
      attendees: 567,
      maxAttendees: 1000,
      price: 0,
      rating: 4.6,
      isLive: false,
      isRegistered: false
    },
    {
      id: '4',
      title: 'FinTech Innovation Summit 2024',
      description: 'Annual conference featuring the latest innovations in financial technology and digital banking.',
      type: 'conference',
      date: '2024-02-15',
      time: '9:00 AM EST',
      duration: '2 days',
      instructor: 'Multiple Speakers',
      attendees: 1250,
      maxAttendees: 2000,
      price: 299,
      rating: 4.7,
      isLive: false,
      isRegistered: false,
      location: 'San Francisco, CA'
    }
  ];

  const eventTypes = ['All', 'webinar', 'workshop', 'conference', 'meetup'];

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'webinar': return 'text-blue-400 bg-blue-500/20';
      case 'workshop': return 'text-green-400 bg-green-500/20';
      case 'conference': return 'text-purple-400 bg-purple-500/20';
      case 'meetup': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webinar': return <Video className="w-4 h-4" />;
      case 'workshop': return <Users className="w-4 h-4" />;
      case 'conference': return <MapPin className="w-4 h-4" />;
      case 'meetup': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Events & Webinars
          </h1>
          <p className="text-gray-300">Join live educational sessions and networking events</p>
        </motion.div>

        {/* Event Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Upcoming Events', value: '12', icon: <Calendar className="w-6 h-6" /> },
            { label: 'Live Now', value: '2', icon: <Video className="w-6 h-6" /> },
            { label: 'Total Attendees', value: '5.2K', icon: <Users className="w-6 h-6" /> },
            { label: 'Hours of Content', value: '240+', icon: <Clock className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 text-white">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              {eventTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Events Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-white">Live Event in Progress</h3>
                <p className="text-gray-300">Market Analysis Workshop - Join now!</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <Play className="w-4 h-4" />
              Join Live
            </motion.button>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all"
            >
              {/* Event Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {getTypeIcon(event.type)}
                      {event.type}
                    </span>
                    {event.isLive && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm">{event.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{event.time} ({event.duration})</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {event.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{event.instructor}</div>
                    <div className="text-gray-400 text-xs">Instructor</div>
                  </div>
                </div>

                {/* Price and Registration */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </div>
                  <motion.button
                    className={`px-6 py-2 rounded-lg font-medium ${
                      event.isRegistered
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : event.isLive
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    }`}
                    whileHover={{ scale: event.isRegistered ? 1 : 1.05 }}
                    disabled={event.isRegistered}
                  >
                    {event.isRegistered ? 'Registered' : event.isLive ? 'Join Live' : 'Register'}
                  </motion.button>
                </div>
              </div>

              {/* Attendance Progress */}
              <div className="px-6 pb-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.round((event.attendees / event.maxAttendees) * 100)}% capacity
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">This Week's Schedule</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { day: 'Monday', event: 'Options Basics', time: '2:00 PM' },
              { day: 'Wednesday', event: 'Market Analysis', time: '10:00 AM' },
              { day: 'Friday', event: 'Crypto Workshop', time: '7:00 PM' },
              { day: 'Saturday', event: 'Portfolio Review', time: '11:00 AM' }
            ].map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-black/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-green-400 font-semibold mb-1">{item.day}</div>
                <div className="text-white text-sm mb-1">{item.event}</div>
                <div className="text-gray-400 text-xs">{item.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsWebinars;
