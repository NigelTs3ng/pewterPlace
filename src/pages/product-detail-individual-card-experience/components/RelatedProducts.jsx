import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ cardData }) => {
  const relatedProducts = [
    {
      id: 'charizard-base-set-4',
      name: 'Charizard',
      set: 'Base Set',
      collectorNumber: '4/102',
      rarity: 'Rare Holo',
      condition: 'Near Mint',
      price: 1250.00,
      originalPrice: 1350.00,
      image: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=300&h=400&fit=crop',
      isAuthenticated: true,
      stock: 2
    },
    {
      id: 'blastoise-base-set-2',
      name: 'Blastoise',
      set: 'Base Set',
      collectorNumber: '2/102',
      rarity: 'Rare Holo',
      condition: 'Mint',
      price: 890.00,
      image: 'https://images.pixabay.com/photo/2023/03/15/16/33/pokemon-7854718_1280.jpg?w=300&h=400&fit=crop',
      isAuthenticated: true,
      stock: 1
    },
    {
      id: 'venusaur-base-set-15',
      name: 'Venusaur',
      set: 'Base Set',
      collectorNumber: '15/102',
      rarity: 'Rare Holo',
      condition: 'Near Mint',
      price: 750.00,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=400&fit=crop',
      isAuthenticated: true,
      stock: 3
    },
    {
      id: 'pikachu-base-set-58',
      name: 'Pikachu',
      set: 'Base Set',
      collectorNumber: '58/102',
      rarity: 'Common',
      condition: 'Mint',
      price: 45.00,
      image: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=300&h=400&fit=crop',
      isAuthenticated: false,
      stock: 12
    }
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'text-slate-600',
      'Uncommon': 'text-emerald-600',
      'Rare': 'text-blue-600',
      'Rare Holo': 'text-purple-600',
      'Ultra Rare': 'text-purple-600',
      'Secret Rare': 'text-amber-600'
    };
    return colors?.[rarity] || 'text-slate-600';
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Mint': 'text-emerald-600',
      'Near Mint': 'text-blue-600',
      'Lightly Played': 'text-amber-600',
      'Moderately Played': 'text-orange-600',
      'Heavily Played': 'text-red-600'
    };
    return colors?.[condition] || 'text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Same Set Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">More from {cardData?.set}</h3>
          <Link 
            to="/product-catalog-advanced-tcg-discovery"
            className="text-accent hover:text-accent/80 text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4] bg-muted">
                <Image
                  src={product?.image}
                  alt={`${product?.name} - ${product?.set}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Authentication Badge */}
                {product?.isAuthenticated && (
                  <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full">
                    <Icon name="Shield" size={12} />
                  </div>
                )}

                {/* Discount Badge */}
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <div className="absolute top-2 left-2 bg-error text-white px-2 py-1 rounded text-xs font-medium">
                    {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Stock Warning */}
                {product?.stock <= 3 && (
                  <div className="absolute bottom-2 left-2 bg-warning text-white px-2 py-1 rounded text-xs font-medium">
                    Only {product?.stock} left
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="space-y-2 mb-3">
                  <h4 className="font-bold text-foreground line-clamp-1">{product?.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {product?.set} • #{product?.collectorNumber}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${getRarityColor(product?.rarity)}`}>
                      {product?.rarity}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-xs font-medium ${getConditionColor(product?.condition)}`}>
                      {product?.condition}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      ${product?.price?.toFixed(2)}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Eye"
                      iconPosition="left"
                      asChild
                    >
                      <Link to="/product-detail-individual-card-experience">
                        View
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Same Artist Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">More by {cardData?.artist}</h3>
          <Link 
            to="/product-catalog-advanced-tcg-discovery"
            className="text-accent hover:text-accent/80 text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts?.slice(0, 4)?.map((product) => (
            <div key={`artist-${product?.id}`} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4] bg-muted">
                <Image
                  src={product?.image}
                  alt={`${product?.name} by ${cardData?.artist}`}
                  className="w-full h-full object-cover"
                />
                {product?.isAuthenticated && (
                  <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full">
                    <Icon name="Shield" size={12} />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-foreground text-sm line-clamp-1 mb-1">
                  {product?.name}
                </h4>
                <div className="text-xs text-muted-foreground mb-2">
                  {product?.set}
                </div>
                <div className="text-sm font-bold text-foreground">
                  ${product?.price?.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recently Viewed */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Recently Viewed</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {relatedProducts?.slice(0, 6)?.map((product) => (
            <div key={`recent-${product?.id}`} className="flex-shrink-0 w-32">
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[3/4] bg-muted">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-medium text-foreground text-xs line-clamp-1 mb-1">
                    {product?.name}
                  </h4>
                  <div className="text-xs font-bold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;