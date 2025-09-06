import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingAddress = ({ onAddressChange }) => {
  const [useExisting, setUseExisting] = useState(true);
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  });

  const savedAddresses = [
    {
      id: 'addr1',
      name: 'Home Address',
      address: '123 Collector Street, Pokemon City, PC 12345',
      isDefault: true
    },
    {
      id: 'addr2',
      name: 'Office Address',
      address: '456 Trading Avenue, Card Town, CT 67890',
      isDefault: false
    }
  ];

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'SG', label: 'Singapore' },
    { value: 'JP', label: 'Japan' }
  ];

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'WA', label: 'Washington' }
  ];

  const handleInputChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
    onAddressChange({ ...addressForm, [field]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h2>
      {/* Address Selection Toggle */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={useExisting ? "default" : "outline"}
          size="sm"
          onClick={() => setUseExisting(true)}
        >
          <Icon name="MapPin" size={16} className="mr-2" />
          Use Saved Address
        </Button>
        <Button
          variant={!useExisting ? "default" : "outline"}
          size="sm"
          onClick={() => setUseExisting(false)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          New Address
        </Button>
      </div>
      {/* Saved Addresses */}
      {useExisting && (
        <div className="space-y-3">
          {savedAddresses?.map((address) => (
            <label
              key={address?.id}
              className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors"
            >
              <input
                type="radio"
                name="savedAddress"
                defaultChecked={address?.isDefault}
                className="mt-1 text-accent focus:ring-accent"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{address?.name}</span>
                  {address?.isDefault && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{address?.address}</p>
              </div>
              <Button variant="ghost" size="xs">
                <Icon name="Edit" size={14} />
              </Button>
            </label>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full">
            <Icon name="Plus" size={16} className="mr-2" />
            Add New Address
          </Button>
        </div>
      )}
      {/* New Address Form */}
      {!useExisting && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              value={addressForm?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              required
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={addressForm?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="Address Line 1"
            type="text"
            placeholder="123 Main Street"
            value={addressForm?.address1}
            onChange={(e) => handleInputChange('address1', e?.target?.value)}
            required
          />

          <Input
            label="Address Line 2 (Optional)"
            type="text"
            placeholder="Apartment, suite, etc."
            value={addressForm?.address2}
            onChange={(e) => handleInputChange('address2', e?.target?.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="New York"
              value={addressForm?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              required
            />
            <Select
              label="State/Province"
              options={stateOptions}
              value={addressForm?.state}
              onChange={(value) => handleInputChange('state', value)}
              placeholder="Select state"
            />
            <Input
              label="ZIP/Postal Code"
              type="text"
              placeholder="10001"
              value={addressForm?.zipCode}
              onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
              required
            />
          </div>

          <Select
            label="Country"
            options={countryOptions}
            value={addressForm?.country}
            onChange={(value) => handleInputChange('country', value)}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={addressForm?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            description="Required for delivery notifications"
            required
          />

          <Checkbox
            label="Save this address for future orders"
           
            onChange={() => {}}
          />
        </div>
      )}
      {/* Address Verification Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" size={16} className="text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-1">Address Verification</p>
            <p className="text-blue-700">
              We'll verify your address to ensure accurate delivery of your valuable collectibles. 
              International orders may require additional documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;