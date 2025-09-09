import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentPulls = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const tabs = [
    { id: 'recent', label: 'Recent Pulls', icon: 'Clock' },
    { id: 'rare', label: 'Rare Finds', icon: 'Star' },
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' }
  ];

  const pulls = [
    {
      id: 1,
      name: "Charizard VSTAR",
      set: "Crown Zenith",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=300&h=400&fit=crop",
      rarity: "ultra-rare",
      condition: "Near Mint",
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
      },
      timestamp: "2 hours ago",
      likes: 234,
      comments: 12
    },
    // ...more pulls
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      'common': 'from-slate-400 to-slate-500',
      'uncommon': 'from-emerald-400 to-emerald-500',
      'rare': 'from-blue-400 to-blue-500',
      'ultra-rare': 'from-purple-400 to-purple-500',
      'secret': 'from-amber-400 to-amber-500'
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="mb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            Latest Discoveries
          </h2>
          <p className="text-lg text-muted-foreground">
            Fresh pulls and rare finds from our community
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-collector'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pulls.map((pull) => (
          <div key={pull.id} className="group">
            <div className="card-premium relative">
              {/* Card Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(pull.rarity)} opacity-10`}></div>
                <Image
                  src={pull.image}
                  alt={pull.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Card Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-display font-bold text-white mb-1">
                        {pull.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {pull.set}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-white">
                      {pull.price}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors">
                    <Icon name="Heart" size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors">
                    <Icon name="Share2" size={14} />
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-2">
                    <Image
                      src={pull.user.avatar}
                      alt={pull.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {pull.user.name}
                    </span>
                  </div>
                  
                  {/* Timestamp */}
                  <span className="text-xs text-muted-foreground">
                    {pull.timestamp}
                  </span>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>{pull.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>{pull.comments}</span>
                    </div>
                  </div>

                  {/* Condition Badge */}
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded">
                    {pull.condition}
                  </span>
                </div>
              </div>

              {/* Card Shine Effect */}
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-full group-hover:translate-x-[-300%] transition-transform duration-[1.5s] ease-premium"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          to="/pulls"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-full font-medium shadow-collector hover:bg-accent/90 transition-all duration-200 group"
        >
          <span>View More Pulls</span>
          <Icon 
            name="ArrowRight" 
            size={18} 
            className="group-hover:translate-x-0.5 transition-transform" 
          />
        </Link>
      </div>
    </div>
  );
};

export default RecentPulls;