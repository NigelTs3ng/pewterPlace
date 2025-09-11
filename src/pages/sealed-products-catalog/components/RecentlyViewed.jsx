import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ onClearHistory }) => {
  const recentlyViewed = [
    {
      id: 1,
      name: "Scarlet & Violet 151 Booster Box",
      set: "Pokemon 151",
      type: "Booster Box",
      image: "https://images.pokemontcg.io/sv3/box_hires.png",
      price: 144.99,
      viewedAt: '2025-09-08T13:30:00Z'
    },
    {
      id: 2,
      name: "Paldea Evolved Elite Trainer Box",
      set: "Paldea Evolved",
      type: "Elite Trainer Box",
      image: "https://images.pokemontcg.io/sv2/etb_hires.png",
      price: 49.99,
      viewedAt: '2025-09-08T12:15:00Z'
    },
    {
      id: 3,
      name: "Temporal Forces Booster Pack",
      set: "Temporal Forces",
      type: "Booster Pack",
      image: "https://images.pokemontcg.io/sv4/pack_hires.png",
      price: 4.99,
      viewedAt: '2025-09-08T11:45:00Z'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
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
      {recentlyViewed.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Package" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No recently viewed products yet. Start browsing to see your history here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentlyViewed.map((product) => (
            <Link
              key={product.id}
              to="/sealed-products-catalog"
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
            >
              {/* Product Image */}
              <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                      {product.name}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {product.set} • {product.type}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-2">
                    <div className="text-xs text-muted-foreground">
                      {formatViewedTime(product.viewedAt)}
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
      {recentlyViewed.length > 0 && (
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