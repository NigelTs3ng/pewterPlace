import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ onClearHistory }) => {
  const recentlyViewed = [
    {
      id: 1,
      name: 'Charizard ex',
      set: 'Obsidian Flames',
      number: '025',
      image: 'https://images.pokemontcg.io/sv3/25_hires.png',
      price: 89.99,
      condition: 'nm',
      viewedAt: '2025-08-31T13:30:00Z'
    },
    {
      id: 2,
      name: 'Miraidon ex',
      set: 'Paradox Rift',
      number: '081',
      image: 'https://images.pokemontcg.io/sv4/81_hires.png',
      price: 24.99,
      condition: 'lp',
      viewedAt: '2025-08-31T12:15:00Z'
    },
    {
      id: 3,
      name: 'Professor\'s Research',
      set: 'Scarlet & Violet',
      number: '190',
      image: 'https://images.pokemontcg.io/sv1/190_hires.png',
      price: 3.99,
      condition: 'nm',
      viewedAt: '2025-08-31T11:45:00Z'
    },
    {
      id: 4,
      name: 'Koraidon ex',
      set: 'Scarlet & Violet',
      number: '254',
      image: 'https://images.pokemontcg.io/sv1/254_hires.png',
      price: 34.99,
      condition: 'nm',
      viewedAt: '2025-08-30T16:20:00Z'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(price);
  };

  const formatViewedTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getConditionColor = (condition) => {
    const conditionMap = {
      'nm': 'bg-emerald-100 text-emerald-800',
      'lp': 'bg-blue-100 text-blue-800',
      'mp': 'bg-amber-100 text-amber-800',
      'hp': 'bg-red-100 text-red-800'
    };
    return conditionMap?.[condition] || conditionMap?.nm;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recently Viewed</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Clear
        </Button>
      </div>
      {recentlyViewed?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Eye" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No recently viewed cards yet. Start browsing to see your history here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentlyViewed?.map((card) => (
            <Link
              key={card?.id}
              to="/product-detail-individual-card-experience"
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
            >
              {/* Card Image */}
              <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={card?.image}
                  alt={card?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                      {card?.name}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {card?.set} • #{card?.number}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getConditionColor(card?.condition)}`}>
                        {card?.condition?.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(card?.price)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-2">
                    <div className="text-xs text-muted-foreground">
                      {formatViewedTime(card?.viewedAt)}
                    </div>
                    <Icon 
                      name="ExternalLink" 
                      size={12} 
                      className="text-muted-foreground group-hover:text-accent transition-colors mt-1" 
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* View All */}
      {recentlyViewed?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            <Icon name="History" size={16} className="mr-2" />
            View Full History
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;