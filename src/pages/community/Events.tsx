import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Webinar' | 'Workshop' | 'Conference' | 'Meetup';
  attendees: number;
  maxAttendees: number;
  price: number;
  rating: number;
  host: string;
  isRegistered: boolean;
}

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const events: Event[] = [
    {
      id: '1',
      title: 'Advanced Options Trading Strategies',
      description: 'Learn complex options strategies from industry experts including spreads, straddles, and risk management.',
      date: '2024-01-20',
      time: '2:00 PM EST',
      location: 'Online',
      type: 'Webinar',
      attendees: 234,
      maxAttendees: 500,
      price: 0,
      rating: 4.8,
      host: 'Michael Chen',
      isRegistered: false
    },
    {
      id: '2',
      title: 'Portfolio Diversification Workshop',
      description: 'Hands-on workshop covering modern portfolio theory and practical diversification techniques.',
      date: '2024-01-25',
      time: '10:00 AM EST',
      location: 'New York, NY',
      type: 'Workshop',
      attendees: 45,
      maxAttendees: 50,
      price: 199,
      rating: 4.9,
      host: 'Sarah Johnson',
      isRegistered: true
    },
    {
      id: '3',
      title: 'FinTech Innovation Conference 2024',
      description: 'Annual conference featuring the latest innovations in financial technology and digital banking.',
      date: '2024-02-15',
      time: '9:00 AM EST',
      location: 'San Francisco, CA',
      type: 'Conference',
      attendees: 1250,
      maxAttendees: 2000,
      price: 599,
      rating: 4.7,
      host: 'FinTech Association',
      isRegistered: false
    }
  ];

  const eventTypes = ['All', 'Webinar', 'Workshop', 'Conference', 'Meetup'];

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Webinar': return 'text-blue-400 bg-blue-500/20';
      case 'Workshop': return 'text-green-400 bg-green-500/20';
      case 'Conference': return 'text-purple-400 bg-purple-500/20';
      case 'Meetup': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Community Events
          </h1>
          <p className="text-gray-300">Join educational events and network with fellow investors</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              {eventTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'border border-gray-600 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <Plus className="w-5 h-5" />
            Create Event
          </motion.button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              {/* Event Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
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
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {/* Host */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {event.host.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{event.host}</div>
                    <div className="text-gray-400 text-xs">Event Host</div>
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
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}
                    whileHover={{ scale: event.isRegistered ? 1 : 1.05 }}
                    disabled={event.isRegistered}
                  >
                    {event.isRegistered ? 'Registered' : 'Register'}
                  </motion.button>
                </div>
              </div>

              {/* Attendance Progress */}
              <div className="px-6 pb-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">This Month's Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { date: '15', event: 'Options Workshop', type: 'Workshop' },
              { date: '22', event: 'Market Analysis', type: 'Webinar' },
              { date: '28', event: 'Crypto Meetup', type: 'Meetup' },
              { date: '30', event: 'FinTech Summit', type: 'Conference' }
            ].map((item, index) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-black/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">{item.date}</div>
                <div className="text-white font-semibold text-sm">{item.event}</div>
                <div className="text-gray-400 text-xs mt-1">{item.type}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
