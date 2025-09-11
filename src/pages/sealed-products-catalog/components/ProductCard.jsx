import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => `$${price?.toFixed(2)}`;

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.name}
          className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {product?.isPreOrder && (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Pre-order
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddToWishlist(product?.id)}
            className="bg-card/90 backdrop-blur-sm hover:bg-card"
          >
            <Icon 
              name="Heart" 
              size={16}
              className={isInWishlist ? "text-red-500 fill-red-500" : ""}
            />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
            {product?.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{product?.set}</span>
            <span className="mx-1">•</span>
            <span>{product?.type}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <div className="text-xs text-muted-foreground">
            {product?.itemsPerUnit}
          </div>

          {/* Release Date for Pre-orders */}
          {product?.isPreOrder && (
            <div className="flex items-center text-xs text-amber-500">
              <Icon name="Calendar" size={12} className="mr-1" />
              <span>Release: {new Date(product?.releaseDate).toLocaleDateString()}</span>
            </div>
          )}

          {/* Stock Status */}
          <div className={`text-xs font-medium ${
            product?.stock > 10 ? 'text-success' : 
            product?.stock > 0 ? 'text-warning' : 'text-error'
          }`}>
            {product?.stock > 10 ? 'In Stock' : 
             product?.stock > 0 ? `${product?.stock} left` : 'Out of Stock'}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onAddToCart(product)}
              disabled={product?.stock === 0 && !product?.isPreOrder}
              fullWidth
              iconName="ShoppingCart"
              iconPosition="left"
            >
              {product?.isPreOrder ? 'Pre-order Now' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddToCart(product, true)}
              disabled={product?.stock === 0 && !product?.isPreOrder}
            >
              <Icon name="Zap" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;