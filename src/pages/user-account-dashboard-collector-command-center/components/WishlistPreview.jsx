import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WishlistPreview = ({ wishlistItems }) => {
  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Wishlist</h3>
        <button className="text-accent hover:text-accent/80 text-sm font-medium">
          View All ({wishlistItems?.length})
        </button>
      </div>
      <div className="space-y-4">
        {wishlistItems?.slice(0, 4)?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="relative">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              {item?.priceDropped && (
                <div className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
                  <Icon name="TrendingDown" size={12} />
                </div>
              )}
              {!item?.inStock && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={16} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">{item?.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{item?.set}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item?.priceDropped ? (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm line-through text-muted-foreground">
                        ${item?.originalPrice}
                      </span>
                      <span className="text-sm font-semibold text-success">
                        ${item?.currentPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">
                      ${item?.currentPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {!item?.inStock ? (
                    <span className="text-xs text-error bg-error/10 px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  ) : item?.priceDropped ? (
                    <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                      Price Drop!
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {item?.inStock && (
                <button className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                  <Icon name="ShoppingCart" size={16} />
                </button>
              )}
              <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {wishlistItems?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground">Start adding cards you want to collect!</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPreview;