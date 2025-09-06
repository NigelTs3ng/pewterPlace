import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setShowPriceHistory(true)}
      onMouseLeave={() => setShowPriceHistory(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link to="/product-detail-individual-card-experience">
          <Image
            src={product?.image}
            alt={product?.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
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
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {product?.isAuthenticated && (
            <div className="auth-badge">
              <Icon name="Shield" size={10} className="inline mr-1" />
              Auth
            </div>
          )}
          {product?.isGraded && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
              PSA {product?.grade}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToWishlist(product?.id)}
              className="bg-card/90 backdrop-blur-sm hover:bg-card"
            >
              <Icon 
                name={isInWishlist ? "Heart" : "Heart"} 
                size={16} 
                className={isInWishlist ? "text-red-500 fill-current" : "text-muted-foreground"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-card/90 backdrop-blur-sm hover:bg-card"
            >
              <Icon name="Eye" size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Price History Overlay */}
        {showPriceHistory && product?.priceHistory && (
          <div className="absolute inset-x-2 bottom-2 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="text-xs font-medium text-foreground mb-2">Price History (30 days)</div>
            <div className="flex items-end space-x-1 h-8">
              {product?.priceHistory?.map((price, index) => (
                <div
                  key={index}
                  className="bg-accent flex-1 rounded-sm"
                  style={{ height: `${(price / Math.max(...product?.priceHistory)) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
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
              className="text-sm font-semibold text-foreground hover:text-accent transition-colors line-clamp-2"
            >
              {product?.name}
            </Link>
            <div className="text-xs text-muted-foreground mt-1">
              {product?.set} • #{product?.number}
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <Icon 
              name={rarityInfo?.icon} 
              size={14} 
              className={rarityInfo?.color} 
            />
          </div>
        </div>

        {/* Condition & Details */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getConditionColor(product?.condition)}`}>
            {product?.condition?.toUpperCase()}
          </span>
          {product?.artist && (
            <span className="text-xs text-muted-foreground">
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
          >
            {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToCart(product, true)}
            disabled={product?.stock === 0}
          >
            <Icon name="Zap" size={14} />
          </Button>
        </div>

        {/* Additional Info */}
        {(product?.isHot || product?.priceChange) && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            {product?.isHot && (
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={12} className="text-red-500" />
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
    </div>
  );
};

export default ProductCard;