import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ items, shippingCost, insurance, bulkDiscount }) => {
  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const discountAmount = subtotal * (bulkDiscount / 100);
  const total = subtotal - discountAmount + shippingCost + insurance;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({items?.length} items)</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>

        {/* Bulk Discount */}
        {bulkDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success flex items-center gap-1">
              <Icon name="Tag" size={12} />
              Bulk Discount ({bulkDiscount}%)
            </span>
            <span className="text-success">-${discountAmount?.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Icon name="Truck" size={12} />
            Shipping
          </span>
          <span className="text-foreground">
            {shippingCost === 0 ? 'FREE' : `$${shippingCost?.toFixed(2)}`}
          </span>
        </div>

        {/* Insurance */}
        {insurance > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Icon name="Shield" size={12} />
              Shipping Insurance
            </span>
            <span className="text-foreground">${insurance?.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Savings Indicator */}
        {discountAmount > 0 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-3 mt-4">
            <div className="flex items-center gap-2 text-success">
              <Icon name="Sparkles" size={16} />
              <span className="text-sm font-medium">
                You're saving ${discountAmount?.toFixed(2)} with bulk discount!
              </span>
            </div>
          </div>
        )}

        {/* Free Shipping Indicator */}
        {subtotal >= 100 && shippingCost === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Icon name="Truck" size={16} />
              <span className="text-sm font-medium">
                Free shipping on orders over $100!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;