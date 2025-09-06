import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingOptions = ({ onShippingChange, onInsuranceChange }) => {
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [insuranceSelected, setInsuranceSelected] = useState(false);

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 5-7 business days',
      price: 0,
      icon: 'Package'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivery in 2-3 business days',
      price: 15.99,
      icon: 'Zap'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      price: 29.99,
      icon: 'Rocket'
    }
  ];

  const handleShippingChange = (optionId) => {
    setSelectedShipping(optionId);
    const option = shippingOptions?.find(opt => opt?.id === optionId);
    onShippingChange(option?.price);
  };

  const handleInsuranceChange = (checked) => {
    setInsuranceSelected(checked);
    onInsuranceChange(checked ? 9.99 : 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Options</h2>
      <div className="space-y-3 mb-6">
        {shippingOptions?.map((option) => (
          <label
            key={option?.id}
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedShipping === option?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={option?.id}
                checked={selectedShipping === option?.id}
                onChange={() => handleShippingChange(option?.id)}
                className="text-accent focus:ring-accent"
              />
              <Icon name={option?.icon} size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{option?.name}</p>
                <p className="text-sm text-muted-foreground">{option?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                {option?.price === 0 ? 'FREE' : `$${option?.price?.toFixed(2)}`}
              </p>
            </div>
          </label>
        ))}
      </div>
      {/* Shipping Protection */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-3">Shipping Protection</h3>
        
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <Checkbox
            label="Add Shipping Insurance ($9.99)"
            description="Protect your valuable collectibles against loss or damage during transit"
            checked={insuranceSelected}
            onChange={(e) => handleInsuranceChange(e?.target?.checked)}
          />
          
          <div className="mt-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <Icon name="Shield" size={12} className="mt-0.5 text-success" />
              <div>
                <p className="font-medium text-success mb-1">Coverage includes:</p>
                <ul className="space-y-1">
                  <li>• Full replacement value up to $2,500</li>
                  <li>• Lost or stolen packages</li>
                  <li>• Damage during transit</li>
                  <li>• No-hassle claims process</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Special Handling */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Package" size={16} className="text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-1">Premium Packaging Included</p>
            <p className="text-blue-700">
              All orders include protective sleeves, top loaders, and bubble wrap packaging at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingOptions;