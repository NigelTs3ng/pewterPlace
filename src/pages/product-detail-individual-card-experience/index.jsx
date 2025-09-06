import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import CardViewer360 from './components/CardViewer360';
import ProductHeader from './components/ProductHeader';
import PriceSection from './components/PriceSection';
import ConditionDetails from './components/ConditionDetails';
import PriceHistory from './components/PriceHistory';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  // Mock card data
  const cardData = {
    id: 'charizard-base-set-unlimited-4',
    name: 'Charizard',
    set: 'Base Set Unlimited',
    collectorNumber: '4/102',
    rarity: 'Rare Holo',
    condition: 'Near Mint',
    price: 265.00,
    originalPrice: 285.00,
    artist: 'Mitsuhiro Arita',
    releaseDate: 'January 9, 1999',
    language: 'English',
    stock: 3,
    isAuthenticated: true,
    images: {
      front: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=600&h=800&fit=crop',
      back: 'https://images.pixabay.com/photo/2023/03/15/16/33/pokemon-7854718_1280.jpg?w=600&h=800&fit=crop',
      edge: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=800&fit=crop',
      surface: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=600&h=800&fit=crop'
    },
    grading: {
      centering: 9,
      corners: 8.5,
      edges: 8,
      surface: 9
    },
    description: `This iconic Charizard from the Base Set Unlimited is one of the most sought-after cards in the Pokémon Trading Card Game. Known for its stunning artwork by Mitsuhiro Arita and its powerful attacks, this card represents the pinnacle of 90s nostalgia and collecting excellence.\n\nThis particular specimen showcases excellent condition with vibrant colors, sharp corners, and minimal edge wear. The holographic foil displays beautiful rainbow patterns when viewed under light, and the card maintains its original gloss and texture.`,
    specifications: {
      'Card Type': 'Pokémon',
      'Stage': 'Stage 2',
      'HP': '120',
      'Type': 'Fire',
      'Weakness': 'Water',
      'Retreat Cost': '3',
      'Set Size': '102 cards',
      'Print Run': 'Unlimited',
      'First Edition': 'No'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'condition', label: 'Condition', icon: 'Search' },
    { id: 'price-history', label: 'Price History', icon: 'TrendingUp' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'related', label: 'Related', icon: 'Grid3X3' }
  ];

  // Handle scroll for sticky add to cart
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // Navigate to cart page
    navigate('/shopping-cart-checkout-secure-collection-investment');
  };

  const handleAddToWishlist = (productData) => {
    console.log('Adding to wishlist:', productData);
    // Show success message or update wishlist state
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Product Description */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
              <div className="prose prose-slate max-w-none">
                {cardData?.description?.split('\n')?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {/* Specifications */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(cardData?.specifications)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'condition':
        return <ConditionDetails cardData={cardData} />;
      case 'price-history':
        return <PriceHistory cardData={cardData} />;
      case 'reviews':
        return <CustomerReviews cardData={cardData} />;
      case 'related':
        return <RelatedProducts cardData={cardData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Header */}
          <ProductHeader cardData={cardData} />

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              <CardViewer360 cardData={cardData} />
            </div>

            {/* Right Column - Price & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PriceSection 
                  cardData={cardData}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      {/* Sticky Mobile Add to Cart */}
      {isSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-foreground">
                ${cardData?.price?.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {cardData?.stock} available
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddToWishlist(cardData)}
                iconName="Heart"
              />
              <Button
                variant="default"
                onClick={() => handleAddToCart({ ...cardData, quantity: 1, shipping: 'standard' })}
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-30 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 ${
          isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Icon name="ArrowUp" size={20} className="mx-auto" />
      </button>
    </div>
  );
};

export default ProductDetailPage;