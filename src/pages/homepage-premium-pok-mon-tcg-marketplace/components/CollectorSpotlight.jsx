import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CollectorSpotlight = () => {
  const collectors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      title: "Master Collector",
      bio: "Specializing in Vintage WOTC Era",
      stats: {
        cards: "2,847",
        completed: "12",
        value: "$125K+"
      },
      badges: ["vintage", "graded", "champion"],
      recentPull: {
        name: "Charizard",
        set: "Base Set 1st Edition",
        image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=200&h=280&fit=crop",
        grade: "PSA 9"
      }
    },
    // ...other collectors...
  ];

  const getBadgeIcon = (badge) => {
    const badges = {
      vintage: { icon: "Clock", color: "text-amber-500" },
      graded: { icon: "Award", color: "text-purple-500" },
      champion: { icon: "Trophy", color: "text-yellow-500" }
    };
    return badges[badge] || badges.vintage;
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Featured Collectors
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Meet our most distinguished Pokémon card collectors and their impressive achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectors.map((collector) => (
          <div 
            key={collector.id}
            className="group card-premium bg-gradient-card relative overflow-hidden"
          >
            {/* Collector Profile */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent to-primary opacity-50 blur rounded-full"></div>
                    <Image
                      src={collector.avatar}
                      alt={collector.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-collector"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-white">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {collector.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {collector.title}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {collector.badges.map((badge) => {
                    const badgeInfo = getBadgeIcon(badge);
                    return (
                      <div
                        key={badge}
                        className="w-8 h-8 rounded-full bg-white shadow-collector flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        <Icon 
                          name={badgeInfo.icon} 
                          size={16} 
                          className={badgeInfo.color} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Collection Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-lg font-bold text-foreground mb-1">
                    {collector.stats.cards}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cards
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-lg font-bold text-foreground mb-1">
                    {collector.stats.completed}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sets
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-lg font-bold text-foreground mb-1">
                    {collector.stats.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Value
                  </p>
                </div>
              </div>

              {/* Recent Pull */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 backdrop-blur-sm">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-accent to-primary opacity-50 blur-sm rounded-lg"></div>
                    <Image
                      src={collector.recentPull.image}
                      alt={collector.recentPull.name}
                      className="relative w-12 h-16 object-cover rounded-lg shadow-collector"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Recent Pull: {collector.recentPull.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {collector.recentPull.set}
                      </span>
                      <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded">
                        {collector.recentPull.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <Link 
                  to="/user-profile" 
                  className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  View Collection
                </Link>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-muted hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Icon name="MessageCircle" size={14} className="text-muted-foreground hover:text-accent" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-muted hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Icon name="UserPlus" size={14} className="text-muted-foreground hover:text-accent" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Shine Effect */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-full group-hover:translate-x-[-300%] transition-transform duration-[1.5s] ease-premium"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          to="/collectors"
          className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors group"
        >
          <span>View All Collectors</span>
          <Icon 
            name="ArrowRight" 
            size={16} 
            className="group-hover:translate-x-0.5 transition-transform" 
          />
        </Link>
      </div>
    </div>
  );
};

export default CollectorSpotlight;