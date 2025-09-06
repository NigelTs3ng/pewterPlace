import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentMethods = ({ onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: 'Bitcoin',
      description: 'Bitcoin, Ethereum, USDC'
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Touch ID or Face ID'
    }
  ];

  const savedCards = [
    {
      id: 'card1',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25'
    },
    {
      id: 'card2',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26'
    }
  ];

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    onPaymentMethodChange(methodId);
  };

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {paymentMethods?.map((method) => (
          <label
            key={method?.id}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method?.id}
              checked={selectedMethod === method?.id}
              onChange={() => handleMethodChange(method?.id)}
              className="text-accent focus:ring-accent"
            />
            <Icon name={method?.icon} size={20} className="text-muted-foreground" />
            <div className="flex-grow">
              <p className="font-medium text-foreground text-sm">{method?.name}</p>
              <p className="text-xs text-muted-foreground">{method?.description}</p>
            </div>
          </label>
        ))}
      </div>
      {/* Card Payment Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4">
          {/* Saved Cards */}
          {savedCards?.length > 0 && (
            <div>
              <h3 className="font-medium text-foreground mb-3">Saved Cards</h3>
              <div className="space-y-2 mb-4">
                {savedCards?.map((card) => (
                  <label
                    key={card?.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="savedCard"
                        className="text-accent focus:ring-accent"
                      />
                      <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {card?.brand} ending in {card?.last4}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{card?.expiry}</span>
                  </label>
                ))}
              </div>
              <div className="text-center">
                <Button variant="ghost" size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add New Card
                </Button>
              </div>
            </div>
          )}

          {/* New Card Form */}
          <div className="border-t border-border pt-4">
            <h3 className="font-medium text-foreground mb-3">New Card</h3>
            <div className="space-y-4">
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails?.number}
                onChange={(e) => handleCardChange('number', e?.target?.value)}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails?.expiry}
                  onChange={(e) => handleCardChange('expiry', e?.target?.value)}
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={cardDetails?.cvv}
                  onChange={(e) => handleCardChange('cvv', e?.target?.value)}
                />
              </div>
              
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="John Doe"
                value={cardDetails?.name}
                onChange={(e) => handleCardChange('name', e?.target?.value)}
              />
            </div>
          </div>
        </div>
      )}
      {/* PayPal */}
      {selectedMethod === 'paypal' && (
        <div className="text-center py-8">
          <Icon name="Wallet" size={48} className="text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            You'll be redirected to PayPal to complete your payment
          </p>
          <Button variant="outline">
            <Icon name="ExternalLink" size={16} className="mr-2" />
            Continue with PayPal
          </Button>
        </div>
      )}
      {/* Cryptocurrency */}
      {selectedMethod === 'crypto' && (
        <div className="space-y-4">
          <Select
            label="Select Cryptocurrency"
            options={[
              { value: 'btc', label: 'Bitcoin (BTC)' },
              { value: 'eth', label: 'Ethereum (ETH)' },
              { value: 'usdc', label: 'USD Coin (USDC)' }
            ]}
            placeholder="Choose cryptocurrency"
          />
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Cryptocurrency Payment Notice</p>
                <p>
                  Crypto payments are final and cannot be reversed. Please ensure all details are correct before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Apple Pay */}
      {selectedMethod === 'applepay' && (
        <div className="text-center py-8">
          <Icon name="Smartphone" size={48} className="text-slate-800 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Use Touch ID or Face ID to pay with Apple Pay
          </p>
          <Button variant="default" className="bg-black text-white hover:bg-black/90">
            <Icon name="Smartphone" size={16} className="mr-2" />
            Pay with Apple Pay
          </Button>
        </div>
      )}
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Lock" size={16} className="text-green-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-green-800 mb-1">Secure Payment</p>
            <p className="text-green-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;