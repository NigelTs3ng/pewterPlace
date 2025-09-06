import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdateQuantity(item?.id, newQuantity);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'text-slate-600';
      case 'Uncommon': return 'text-emerald-600';
      case 'Rare': return 'text-blue-600';
      case 'Ultra Rare': return 'text-purple-600';
      case 'Secret': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Mint': return 'text-emerald-600';
      case 'Near Mint': return 'text-blue-600';
      case 'Lightly Played': return 'text-amber-600';
      case 'Moderately Played': return 'text-orange-600';
      case 'Heavily Played': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-32 sm:w-20 sm:h-28 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-grow">
              <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                {item?.set} • #{item?.cardNumber}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`text-xs font-medium ${getRarityColor(item?.rarity)}`}>
                  {item?.rarity}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className={`text-xs font-medium ${getConditionColor(item?.condition)}`}>
                  {item?.condition}
                </span>
                {item?.authenticated && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={12} className="text-success" />
                      <span className="text-xs text-success font-medium">Authenticated</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="font-bold text-foreground">${(item?.price * quantity)?.toFixed(2)}</p>
                {quantity > 1 && (
                  <p className="text-xs text-muted-foreground">${item?.price?.toFixed(2)} each</p>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={12} />
                </Button>
                <span className="text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Icon name="Plus" size={12} />
                </Button>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onRemove(item?.id)}
                className="text-destructive hover:text-destructive"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {/* Special Notes */}
          {item?.specialNotes && (
            <div className="mt-3 p-2 bg-muted rounded text-xs text-muted-foreground">
              <Icon name="Info" size={12} className="inline mr-1" />
              {item?.specialNotes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;