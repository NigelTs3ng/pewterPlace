import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriceSection = ({ cardData, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const shippingOptions = [
    { id: 'same-day', label: 'Same Day', price: 15.00, time: 'By 6 PM today' },
    { id: 'next-day', label: 'Next Day', price: 8.00, time: 'Tomorrow by 2 PM' },
    { id: 'standard', label: 'Standard', price: 0, time: '3-5 business days' }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, Math.min(cardData?.stock, quantity + change));
    setQuantity(newQuantity);
  };

  const selectedShippingOption = shippingOptions?.find(opt => opt?.id === selectedShipping);
  const totalPrice = (cardData?.price * quantity) + selectedShippingOption?.price;

  return (
    <div className="space-y-6">
      {/* Price Display */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">
            ${cardData?.price?.toFixed(2)}
          </span>
          {cardData?.originalPrice && cardData?.originalPrice > cardData?.price && (
            <span className="text-lg text-muted-foreground line-through">
              ${cardData?.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
        {cardData?.originalPrice && cardData?.originalPrice > cardData?.price && (
          <div className="text-sm text-success font-medium">
            Save ${(cardData?.originalPrice - cardData?.price)?.toFixed(2)} 
            ({Math.round(((cardData?.originalPrice - cardData?.price) / cardData?.originalPrice) * 100)}% off)
          </div>
        )}
      </div>
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= cardData?.stock}
          >
            <Icon name="Plus" size={16} />
          </Button>
          <span className="text-sm text-muted-foreground ml-2">
            ({cardData?.stock} available)
          </span>
        </div>
      </div>
      {/* Shipping Options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Shipping</label>
        <div className="space-y-2">
          {shippingOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedShipping === option?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="shipping"
                  value={option?.id}
                  checked={selectedShipping === option?.id}
                  onChange={(e) => setSelectedShipping(e?.target?.value)}
                  className="text-accent focus:ring-accent"
                />
                <div>
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-sm text-muted-foreground">{option?.time}</div>
                </div>
              </div>
              <div className="font-medium">
                {option?.price === 0 ? 'Free' : `$${option?.price?.toFixed(2)}`}
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Total Price */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span>${totalPrice?.toFixed(2)}</span>
        </div>
        {selectedShippingOption?.price > 0 && (
          <div className="text-sm text-muted-foreground mt-1">
            Includes ${selectedShippingOption?.price?.toFixed(2)} shipping
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={() => onAddToCart({ ...cardData, quantity, shipping: selectedShipping })}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => onAddToWishlist(cardData)}
            iconName="Heart"
            iconPosition="left"
          >
            Wishlist
          </Button>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
          >
            Collection
          </Button>
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Authenticity guaranteed or money back</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Truck" size={16} className="text-blue-500" />
          <span>Secure packaging with tracking</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RotateCcw" size={16} className="text-amber-500" />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;