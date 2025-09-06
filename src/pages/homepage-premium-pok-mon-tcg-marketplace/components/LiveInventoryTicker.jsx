import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

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
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'border-l-slate-400';
      case 'uncommon':
        return 'border-l-emerald-500';
      case 'rare':
        return 'border-l-blue-500';
      case 'ultra-rare':
        return 'border-l-purple-500';
      case 'secret':
        return 'border-l-amber-500';
      default:
        return 'border-l-slate-400';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-foreground">Live Market Updates</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            Updated 30s ago
          </span>
        </div>
        <Link 
          to="/product-catalog-advanced-tcg-discovery"
          className="text-accent hover:text-accent/80 text-sm font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {inventoryItems?.map((item, index) => (
            <div key={item?.id} className="w-full flex-shrink-0">
              <div className={`border-l-4 ${getRarityColor(item?.rarity)} bg-muted/30 rounded-r-lg p-4`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">
                          {item?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
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
                        {item?.stock} left
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-start md:justify-end">
                    <Link to="/product-detail-individual-card-experience">
                      <button className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center space-x-2">
                        <Icon name="Eye" size={14} />
                        <span>View</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress Indicators */}
      <div className="flex justify-center space-x-1 mt-4">
        {inventoryItems?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveInventoryTicker;