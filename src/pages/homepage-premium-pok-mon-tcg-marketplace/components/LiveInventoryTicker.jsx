import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveInventoryTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const inventoryItems = [
    {
      id: 1,
      name: "Charizard ex (PAL 054)",
      set: "Paldea Evolved",
      price: "$89.99",
      previousPrice: "$94.99",
      stock: 3,
      trend: "down",
      rarity: "ultra-rare"
    },
    {
      id: 2,
      name: "Pikachu VMAX (SWSH 188)",
      set: "SWSH Promo",
      price: "$24.99",
      previousPrice: "$22.99",
      stock: 12,
      trend: "up",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Mew ex (MEW 151)",
      set: "Pokémon 151",
      price: "$45.99",
      previousPrice: "$45.99",
      stock: 7,
      trend: "stable",
      rarity: "ultra-rare"
    },
    {
      id: 4,
      name: "Base Set Booster Box",
      set: "Base Set",
      price: "$8,999.99",
      previousPrice: "$8,799.99",
      stock: 1,
      trend: "up",
      rarity: "secret"
    },
    {
      id: 5,
      name: "Miraidon ex (PAL 106)",
      set: "Paldea Evolved",
      price: "$67.99",
      previousPrice: "$72.99",
      stock: 5,
      trend: "down",
      rarity: "ultra-rare"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % inventoryItems?.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [inventoryItems?.length]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success animate-pulse-slow" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error animate-pulse-slow" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
        return 'border-l-slate-400 bg-gradient-to-r from-slate-400/10 to-transparent';
      case 'uncommon':
        return 'border-l-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent';
      case 'rare':
        return 'border-l-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent';
      case 'ultra-rare':
        return 'border-l-purple-500 bg-gradient-to-r from-purple-500/10 to-transparent';
      case 'secret':
        return 'border-l-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent';
      default:
        return 'border-l-slate-400 bg-gradient-to-r from-slate-400/10 to-transparent';
    }
  };

  return (
    <div className="card-premium mb-8 relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
      ></div>

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75"></div>
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">Live Market Updates</h3>
            <span className="px-2 py-1 bg-muted text-xs font-medium text-muted-foreground rounded-full">
              Updated 30s ago
            </span>
          </div>
          <Link 
            to="/product-catalog-advanced-tcg-discovery"
            className="flex items-center space-x-2 text-accent hover:text-accent/80 font-medium text-sm transition-colors group/link"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-premium"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {inventoryItems?.map((item, index) => (
              <div key={item?.id} className="w-full flex-shrink-0">
                <div className={`rounded-xl ${getRarityColor(item?.rarity)} p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-collector hover:-translate-y-0.5`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm leading-tight mb-1 hover:text-accent transition-colors">
                            {item?.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item?.set}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(item?.trend)}
                        </div>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="flex flex-col items-start md:items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-foreground">
                          {item?.price}
                        </span>
                        {item?.previousPrice !== item?.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            {item?.previousPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Package" size={12} className="text-muted-foreground" />
                        <span className={`text-xs font-medium ${
                          item?.stock <= 3 ? 'text-warning' : 'text-success'
                        }`}>
                          {item?.stock} in stock
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <Icon name="Bell" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <Icon name="Heart" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        <Icon name="ShoppingCart" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {inventoryItems?.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent w-3' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 hover-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default LiveInventoryTicker;