import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getRarityIcon = (rarity) => {
    const rarityMap = {
      'common': { icon: 'Circle', color: 'text-slate-500' },
      'uncommon': { icon: 'Diamond', color: 'text-emerald-500' },
      'rare': { icon: 'Star', color: 'text-blue-500' },
      'ultra-rare': { icon: 'Zap', color: 'text-purple-500' },
      'secret': { icon: 'Crown', color: 'text-amber-500' }
    };
    return rarityMap?.[rarity] || rarityMap?.common;
  };

  const getConditionColor = (condition) => {
    const conditionMap = {
      'nm': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'lp': 'bg-blue-100 text-blue-800 border-blue-200',
      'mp': 'bg-amber-100 text-amber-800 border-amber-200',
      'hp': 'bg-red-100 text-red-800 border-red-200'
    };
    return conditionMap?.[condition] || conditionMap?.nm;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(price);
  };

  const rarityInfo = getRarityIcon(product?.rarity);

  return (
    <div 
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-premium transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => {
        setShowPriceHistory(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setShowPriceHistory(false);
        setIsHovered(false);
      }}
    >
      {/* Card Frame */}
      <div className="relative">
        {/* Holographic Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r from-holographic-1 via-holographic-2 to-holographic-3 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}></div>
        
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-card">
          <Link to="/product-detail-individual-card-experience">
            <Image
              src={product?.image}
              alt={product?.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </Link>
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <Icon name="Image" size={32} className="text-muted-foreground" />
            </div>
          )}

          {/* Overlay Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1.5">
            {product?.isNew && (
              <span className="px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-collector backdrop-blur-sm">
                New
              </span>
            )}
            {product?.isAuthenticated && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-success/90 text-white text-xs font-medium rounded-full shadow-collector backdrop-blur-sm">
                <Icon name="Shield" size={10} />
                <span>Auth</span>
              </div>
            )}
            {product?.isGraded && (
              <span className="px-2 py-1 bg-primary/90 text-white text-xs font-medium rounded-full shadow-collector backdrop-blur-sm">
                PSA {product?.grade}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col space-y-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddToWishlist(product?.id)}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/20 shadow-collector hover:scale-110 transition-all duration-300"
              >
                <Icon 
                  name={isInWishlist ? "Heart" : "Heart"} 
                  size={16} 
                  className={isInWishlist ? "text-red-500 fill-current" : ""}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white border border-white/20 shadow-collector hover:scale-110 transition-all duration-300"
              >
                <Icon name="Eye" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Price History Overlay */}
        {showPriceHistory && product?.priceHistory && (
          <div className="absolute inset-x-2 bottom-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-collector">
            <div className="text-xs font-medium text-white mb-2">Price History (30 days)</div>
            <div className="flex items-end space-x-0.5 h-8">
              {product?.priceHistory?.map((price, index) => (
                <div
                  key={index}
                  style={{ height: `${(price / Math.max(...product?.priceHistory)) * 100}%` }}
                  className="bg-accent/80 flex-1 rounded-sm transition-all duration-300 hover:bg-accent"
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>{formatPrice(Math.min(...product?.priceHistory))}</span>
              <span>{formatPrice(Math.max(...product?.priceHistory))}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <Link 
              to="/product-detail-individual-card-experience"
              className="block font-display text-sm font-semibold text-foreground hover:text-accent transition-colors line-clamp-2"
            >
              {product?.name}
            </Link>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              {product?.set} • #{product?.number}
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <Icon 
              name={rarityInfo?.icon} 
              size={14} 
              className={`${rarityInfo?.color} transition-transform group-hover:scale-110 duration-300`} 
            />
          </div>
        </div>

        {/* Condition & Details */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getConditionColor(product?.condition)} transition-colors duration-300`}>
            {product?.condition?.toUpperCase()}
          </span>
          {product?.artist && (
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              by {product?.artist}
            </span>
          )}
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className={`text-xs font-medium ${
              product?.stock > 10 ? 'text-success' : 
              product?.stock > 0 ? 'text-warning' : 'text-error'
            }`}>
              {product?.stock > 10 ? 'In Stock' : 
               product?.stock > 0 ? `${product?.stock} left` : 'Out of Stock'}
            </div>
            {product?.estimatedDelivery && (
              <div className="text-xs text-muted-foreground">
                Est. {product?.estimatedDelivery}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            disabled={product?.stock === 0}
            onClick={() => onAddToCart(product)}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={14}
            className="bg-accent hover:bg-accent/90 text-white shadow-collector transition-all duration-300 hover:scale-[1.02]"
          >
            {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToCart(product, true)}
            disabled={product?.stock === 0}
            className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            <Icon name="Zap" size={14} />
          </Button>
        </div>

        {/* Additional Info */}
        {(product?.isHot || product?.priceChange) && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            {product?.isHot && (
              <div className="flex items-center space-x-1">
                <Icon name="Flame" size={12} className="text-red-500" />
                <span className="text-xs text-red-500 font-medium">Hot Item</span>
              </div>
            )}
            {product?.priceChange && (
              <div className={`flex items-center space-x-1 ${
                product?.priceChange > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                <Icon 
                  name={product?.priceChange > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={12} 
                />
                <span className="text-xs font-medium">
                  {product?.priceChange > 0 ? '+' : ''}{product?.priceChange}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Shine Effect */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-full group-hover:translate-x-[-300%] transition-transform duration-[1.5s] ease-premium"></div>
      </div>
    </div>
  );
};

export default ProductCard;