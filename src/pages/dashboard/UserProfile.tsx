import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Camera, Edit3, Save, X, User, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Sparkles, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

const UserProfile: React.FC = () => {
  const { user } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Passionate about learning financial markets and building wealth through smart investments.',
    experience: 'intermediate',
    riskProfile: 'moderate',
    interests: ['Stock Trading', 'Mutual Funds', 'Technical Analysis']
  });
  const avatarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (!avatarRef.current) return;

    // Create 3D rotating avatar
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    avatarRef.current.appendChild(renderer.domElement);

    // Create avatar geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      wireframe: false,
      transparent: true,
      opacity: 0.8
    });
    const avatar = new THREE.Mesh(geometry, material);
    scene.add(avatar);

    // Add wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.05, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      avatar.rotation.y += 0.005;
      wireframe.rotation.y -= 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (avatarRef.current && renderer.domElement) {
        avatarRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Save animation
    const saveElement = document.createElement('div');
    saveElement.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold z-50';
    saveElement.textContent = 'Profile Updated!';
    document.body.appendChild(saveElement);
    
    setTimeout(() => {
      document.body.removeChild(saveElement);
    }, 2000);
  };

  const achievements = [
    { title: 'First Steps', description: 'Completed first module', icon: '🎯', earned: true },
    { title: 'Quiz Master', description: 'Scored 90%+ on 5 quizzes', icon: '🧠', earned: true },
    { title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', earned: true },
    { title: 'Portfolio Builder', description: 'Created first portfolio', icon: '📊', earned: false },
    { title: 'Risk Manager', description: 'Completed risk assessment', icon: '⚖️', earned: true },
    { title: 'Community Helper', description: 'Helped 10+ community members', icon: '🤝', earned: false }
  ];

  const stats = [
    { label: 'Modules Completed', value: '8/12', color: 'text-blue-400' },
    { label: 'Quiz Average', value: '87%', color: 'text-green-400' },
    { label: 'Learning Streak', value: '15 days', color: 'text-yellow-400' },
    { label: 'Certificates', value: '3', color: 'text-purple-400' }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 px-4 pb-8 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-full blur-2xl animate-bounce" />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 3D Avatar */}
            <div className="relative">
              <div ref={avatarRef} className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/30" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                  <p className="text-gray-400 mb-4">{profileData.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profileData.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {profileData.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Full Name"
                  />
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Bio"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Location"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {!isEditing ? (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={handleSave}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </motion.button>
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Learning Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Risk Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Risk Profile & Preferences</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none disabled:opacity-50"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk Tolerance</label>
                  <select
                    value={profileData.riskProfile}
                    onChange={(e) => setProfileData(prev => ({ ...prev, riskProfile: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none disabled:opacity-50"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Investment Interests</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring" }}
                    className={`relative flex items-center gap-3 p-3 rounded-lg transition-all perspective-1000 ${
                      achievement.earned 
                        ? 'bg-yellow-500/10 border border-yellow-500/20' 
                        : 'bg-gray-800/30 border border-gray-700/30 opacity-50'
                    }`}
                    onHoverStart={() => setHoveredAchievement(index)}
                    onHoverEnd={() => setHoveredAchievement(null)}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 3,
                      z: 10
                    }}
                  >
                    {/* Sparkle Effects for Earned Achievements */}
                    {achievement.earned && hoveredAchievement === index && (
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: Math.random() * 1.2
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{achievement.title}</h4>
                      <p className="text-gray-400 text-xs">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="/achievements"
                whileHover={{ scale: 1.02 }}
                className="block mt-4 text-center py-2 border border-yellow-500/50 text-yellow-400 rounded-lg font-medium hover:bg-yellow-500/10 transition-all"
              >
                View All Achievements
              </motion.a>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Type</span>
                  <span className="text-blue-400">Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-white">Today, 2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Learning Time</span>
                  <span className="text-white">47 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
