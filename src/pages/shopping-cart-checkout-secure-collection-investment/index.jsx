import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import ShippingOptions from './components/ShippingOptions';
import PaymentMethods from './components/PaymentMethods';
import ShippingAddress from './components/ShippingAddress';
import TrustSection from './components/TrustSection';

const ShoppingCartCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState('cart');
  const [shippingCost, setShippingCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Charizard VMAX - Rainbow Rare",
        set: "Champion\'s Path",
        cardNumber: "074/073",
        price: 299.99,
        quantity: 1,
        condition: "Near Mint",
        rarity: "Secret",
        authenticated: true,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop",
        specialNotes: "Freshly pulled from booster pack, immediately sleeved"
      },
      {
        id: 2,
        name: "Pikachu VMAX - Gold",
        set: "Vivid Voltage",
        cardNumber: "188/185",
        price: 189.99,
        quantity: 2,
        condition: "Mint",
        rarity: "Secret",
        authenticated: true,
        image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=300&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Umbreon VMAX - Alternate Art",
        set: "Evolving Skies",
        cardNumber: "215/203",
        price: 149.99,
        quantity: 1,
        condition: "Near Mint",
        rarity: "Ultra Rare",
        authenticated: true,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop"
      },
      {
        id: 4,
        name: "Base Set Booster Pack",
        set: "Base Set",
        cardNumber: "N/A",
        price: 899.99,
        quantity: 1,
        condition: "Light",
        rarity: "Common",
        authenticated: true,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop",
        specialNotes: "Vintage 1998 pack, authenticated and graded"
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const steps = [
    { id: 'cart', name: 'Cart', icon: 'ShoppingCart' },
    { id: 'shipping', name: 'Shipping', icon: 'Truck' },
    { id: 'payment', name: 'Payment', icon: 'CreditCard' },
    { id: 'review', name: 'Review', icon: 'CheckCircle' }
  ];

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const bulkDiscount = cartItems?.length >= 3 ? 10 : cartItems?.length >= 2 ? 5 : 0;
  const freeShippingThreshold = 100;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => 
      prev?.map(item => 
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleShippingChange = (cost) => {
    setShippingCost(qualifiesForFreeShipping ? 0 : cost);
  };

  const handleInsuranceChange = (cost) => {
    setInsuranceCost(cost);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleNextStep = () => {
    const stepOrder = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = stepOrder?.indexOf(currentStep);
    if (currentIndex < stepOrder?.length - 1) {
      setCurrentStep(stepOrder?.[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const stepOrder = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = stepOrder?.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder?.[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully! You will receive a confirmation email shortly.');
    }, 3000);
  };

  const getStepStatus = (stepId) => {
    const stepOrder = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = stepOrder?.indexOf(currentStep);
    const stepIndex = stepOrder?.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (cartItems?.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - PewterPlace TCG Sanctuary</title>
          <meta name="description" content="Your secure shopping cart for premium Pokémon trading cards and collectibles." />
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <Icon name="ShoppingCart" size={64} className="text-muted-foreground mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                  Discover amazing Pokémon cards and start building your collection today!
                </p>
                <Link to="/product-catalog-advanced-tcg-discovery">
                  <Button size="lg">
                    <Icon name="Search" size={20} className="mr-2" />
                    Browse Cards
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart & Checkout - PewterPlace TCG Sanctuary</title>
        <meta name="description" content="Secure checkout for your premium Pokémon trading card collection. Authenticated cards, insured shipping, and collector-first service." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps?.map((step, index) => {
                  const status = getStepStatus(step?.id);
                  return (
                    <div key={step?.id} className="flex items-center">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                          status === 'completed' 
                            ? 'bg-success border-success text-white'
                            : status === 'current' ?'bg-accent border-accent text-white' :'bg-background border-border text-muted-foreground'
                        }`}>
                          {status === 'completed' ? (
                            <Icon name="Check" size={20} />
                          ) : (
                            <Icon name={step?.icon} size={20} />
                          )}
                        </div>
                        <span className={`ml-3 text-sm font-medium ${
                          status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step?.name}
                        </span>
                      </div>
                      {index < steps?.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          getStepStatus(steps?.[index + 1]?.id) === 'completed' || 
                          (getStepStatus(steps?.[index + 1]?.id) === 'current' && status === 'completed')
                            ? 'bg-success' :'bg-border'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cart Step */}
                {currentStep === 'cart' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
                      <span className="text-sm text-muted-foreground">
                        {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {cartItems?.map((item) => (
                        <CartItem
                          key={item?.id}
                          item={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </div>

                    {/* Continue Shopping */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <Link to="/product-catalog-advanced-tcg-discovery">
                        <Button variant="outline">
                          <Icon name="ArrowLeft" size={16} className="mr-2" />
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Shipping Step */}
                {currentStep === 'shipping' && (
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-6">Shipping Information</h1>
                    <div className="space-y-6">
                      <ShippingAddress onAddressChange={() => {}} />
                      <ShippingOptions 
                        onShippingChange={handleShippingChange}
                        onInsuranceChange={handleInsuranceChange}
                      />
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-6">Payment Information</h1>
                    <PaymentMethods onPaymentMethodChange={handlePaymentMethodChange} />
                  </div>
                )}

                {/* Review Step */}
                {currentStep === 'review' && (
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-6">Review Your Order</h1>
                    
                    {/* Order Items Review */}
                    <div className="bg-card border border-border rounded-lg p-6 mb-6">
                      <h2 className="font-semibold text-foreground mb-4">Order Items</h2>
                      <div className="space-y-3">
                        {cartItems?.map((item) => (
                          <div key={item?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-16 bg-muted rounded overflow-hidden">
                                <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{item?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item?.condition} • Qty: {item?.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-foreground">
                              ${(item?.price * item?.quantity)?.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-card border border-border rounded-lg p-6">
                        <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>John Doe</p>
                          <p>123 Collector Street</p>
                          <p>Pokemon City, PC 12345</p>
                          <p>United States</p>
                        </div>
                      </div>
                      
                      <div className="bg-card border border-border rounded-lg p-6">
                        <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="CreditCard" size={16} />
                          <span>Visa ending in 4242</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1 text-accent focus:ring-accent" required />
                        <div className="text-sm text-muted-foreground">
                          <p>
                            I agree to the{' '}
                            <Link to="#" className="text-accent hover:underline">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="#" className="text-accent hover:underline">Privacy Policy</Link>.
                            I understand that all sales are final for authenticated collectibles.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep !== 'cart' && (
                    <Button variant="outline" onClick={handlePreviousStep}>
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Back
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep === 'review' ? (
                      <Button 
                        size="lg" 
                        onClick={handlePlaceOrder}
                        loading={isProcessing}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                            Processing Order...
                          </>
                        ) : (
                          <>
                            <Icon name="CreditCard" size={20} className="mr-2" />
                            Place Order
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button size="lg" onClick={handleNextStep}>
                        Continue
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <OrderSummary
                  items={cartItems}
                  shippingCost={shippingCost}
                  insurance={insuranceCost}
                  bulkDiscount={bulkDiscount}
                />
                
                <TrustSection />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Live Chat Support
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="Phone" size={16} className="mr-2" />
                      Call 1-800-TCG-HELP
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="Mail" size={16} className="mr-2" />
                      Email Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ShoppingCartCheckout;