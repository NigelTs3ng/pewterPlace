import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentPulls = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentPulls = [
    {
      id: 1,
      user: "TrainerAlex92",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      card: "Charizard ex (PAL 054)",
      set: "Paldea Evolved",
      rarity: "Ultra Rare",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=420&fit=crop",
      timestamp: "2 hours ago",
      likes: 47,
      comments: 12,
      value: "$89.99"
    },
    {
      id: 2,
      user: "PikachuCollector",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      card: "Pikachu VMAX (SWSH 188)",
      set: "SWSH Promo",
      rarity: "Secret Rare",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=420&fit=crop",
      timestamp: "4 hours ago",
      likes: 89,
      comments: 23,
      value: "$124.99"
    },
    {
      id: 3,
      user: "CardMaster2023",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      card: "Mew ex (MEW 151)",
      set: "Pokémon 151",
      rarity: "Ultra Rare",
      image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=300&h=420&fit=crop",
      timestamp: "6 hours ago",
      likes: 156,
      comments: 34,
      value: "$67.99"
    },
    {
      id: 4,
      user: "VintageHunter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      card: "Base Set Charizard",
      set: "Base Set",
      rarity: "Holo Rare",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=420&fit=crop",
      timestamp: "8 hours ago",
      likes: 203,
      comments: 67,
      value: "$1,299.99"
    }
  ];

  const topPulls = [
    {
      id: 1,
      user: "LegendaryPulls",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      card: "Shadowless Charizard PSA 10",
      set: "Base Set",
      rarity: "Holo Rare",
      image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=300&h=420&fit=crop",
      timestamp: "1 day ago",
      likes: 892,
      comments: 156,
      value: "$8,999.99"
    },
    {
      id: 2,
      user: "RainbowChaser",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      card: "Pikachu Illustrator",
      set: "Promo",
      rarity: "Promo",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=420&fit=crop",
      timestamp: "2 days ago",
      likes: 1247,
      comments: 289,
      value: "$12,999.99"
    }
  ];

  const currentPulls = activeTab === 'recent' ? recentPulls : topPulls;

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
        return 'text-slate-600';
      case 'uncommon':
        return 'text-emerald-600';
      case 'rare':
        return 'text-blue-600';
      case 'ultra rare':
        return 'text-purple-600';
      case 'secret rare':
        return 'text-amber-600';
      case 'holo rare':
        return 'text-pink-600';
      case 'promo':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community Pulls
          </h2>
          <p className="text-lg text-muted-foreground">
            See what amazing cards our collectors are pulling from PewterPlace products
          </p>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'recent' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Recent Pulls
          </button>
          <button
            onClick={() => setActiveTab('top')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'top' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Top Pulls
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPulls?.map((pull) => (
          <div
            key={pull?.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-shadow-hover transition-all duration-300 hover:-translate-y-1 group"
          >
            {/* Card Image */}
            <div className="relative">
              <Image
                src={pull?.image}
                alt={pull?.card}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-card/90 backdrop-blur-sm ${getRarityColor(pull?.rarity)}`}>
                  {pull?.rarity}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-bold text-white bg-success rounded-full">
                  {pull?.value}
                </span>
              </div>
              
              {/* Holographic Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={pull?.avatar}
                  alt={pull?.user}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{pull?.user}</p>
                  <p className="text-xs text-muted-foreground">{pull?.timestamp}</p>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
                  {pull?.card}
                </h3>
                <p className="text-xs text-muted-foreground">{pull?.set}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-error transition-colors">
                    <Icon name="Heart" size={14} />
                    <span className="text-xs">{pull?.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-accent transition-colors">
                    <Icon name="MessageCircle" size={14} />
                    <span className="text-xs">{pull?.comments}</span>
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Share2" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/product-catalog-advanced-tcg-discovery">
          <button className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center space-x-2 mx-auto">
            <Icon name="Camera" size={18} />
            <span>Share Your Pull</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecentPulls;