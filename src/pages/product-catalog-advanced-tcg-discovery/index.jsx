import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import SetCompletionTracker from './components/SetCompletionTracker';
import SavedSearches from './components/SavedSearches';
import RecentlyViewed from './components/RecentlyViewed';
import PriceAlerts from './components/PriceAlerts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCatalogPage = () => {
  const location = useLocation();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, compact
  const [sortBy, setSortBy] = useState('relevance');
  const [wishlistItems, setWishlistItems] = useState([1, 5, 12, 23]);

  const [filters, setFilters] = useState({
    search: '',
    conditions: [],
    rarities: [],
    sets: [],
    types: [],
    priceMin: '',
    priceMax: '',
    artist: '',
    gradedOnly: false,
    authenticatedOnly: false
  });

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Charizard ex',
      set: 'Obsidian Flames',
      number: '025',
      image: 'https://images.pokemontcg.io/sv3/25_hires.png',
      price: 89.99,
      originalPrice: 99.99,
      condition: 'nm',
      rarity: 'ultra-rare',
      artist: 'aky CG Works',
      stock: 3,
      isNew: false,
      isAuthenticated: true,
      isGraded: true,
      grade: 10,
      estimatedDelivery: '2-3 days',
      isHot: true,
      priceChange: -10.1,
      priceHistory: [99.99, 95.50, 92.00, 89.99, 87.50, 89.99]
    },
    {
      id: 2,
      name: 'Miraidon ex',
      set: 'Paradox Rift',
      number: '081',
      image: 'https://images.pokemontcg.io/sv4/81_hires.png',
      price: 24.99,
      condition: 'lp',
      rarity: 'ultra-rare',
      artist: 'PLANETA Mochizuki',
      stock: 15,
      isNew: true,
      isAuthenticated: true,
      isGraded: false,
      estimatedDelivery: '1-2 days',
      priceHistory: [29.99, 27.50, 26.00, 24.99, 25.50, 24.99]
    },
    {
      id: 3,
      name: 'Professor\'s Research',
      set: 'Scarlet & Violet Base',
      number: '190',
      image: 'https://images.pokemontcg.io/sv1/190_hires.png',
      price: 3.99,
      condition: 'nm',
      rarity: 'uncommon',
      artist: 'Naoki Saito',
      stock: 50,
      isNew: false,
      isAuthenticated: false,
      isGraded: false,
      estimatedDelivery: '1-2 days'
    },
    {
      id: 4,
      name: 'Koraidon ex',
      set: 'Scarlet & Violet Base',
      number: '254',
      image: 'https://images.pokemontcg.io/sv1/254_hires.png',
      price: 34.99,
      condition: 'nm',
      rarity: 'ultra-rare',
      artist: 'PLANETA Mochizuki',
      stock: 8,
      isNew: false,
      isAuthenticated: true,
      isGraded: false,
      estimatedDelivery: '2-3 days',
      priceChange: 5.2
    },
    {
      id: 5,
      name: 'Gimmighoul',
      set: 'Paradox Rift',
      number: '087',
      image: 'https://images.pokemontcg.io/sv4/87_hires.png',
      price: 1.99,
      condition: 'nm',
      rarity: 'common',
      artist: 'Mina Nakai',
      stock: 100,
      isNew: false,
      isAuthenticated: false,
      isGraded: false,
      estimatedDelivery: '1-2 days'
    },
    {
      id: 6,
      name: 'Annihilape ex',
      set: 'Paradox Rift',
      number: '024',
      image: 'https://images.pokemontcg.io/sv4/24_hires.png',
      price: 19.99,
      condition: 'lp',
      rarity: 'ultra-rare',
      artist: 'AKIRA EGAWA',
      stock: 12,
      isNew: true,
      isAuthenticated: true,
      isGraded: false,
      estimatedDelivery: '1-2 days'
    },
    {
      id: 7,
      name: 'Ancient Booster Energy Capsule',
      set: 'Paradox Rift',
      number: '159',
      image: 'https://images.pokemontcg.io/sv4/159_hires.png',
      price: 45.99,
      condition: 'nm',
      rarity: 'secret',
      artist: 'Studio Bora Inc.',
      stock: 2,
      isNew: false,
      isAuthenticated: true,
      isGraded: true,
      grade: 9,
      estimatedDelivery: '3-4 days',
      isHot: true,
      priceChange: 12.5
    },
    {
      id: 8,
      name: 'Tyranitar ex',
      set: 'Obsidian Flames',
      number: '119',
      image: 'https://images.pokemontcg.io/sv3/119_hires.png',
      price: 28.99,
      condition: 'mp',
      rarity: 'ultra-rare',
      artist: 'PLANETA Mochizuki',
      stock: 6,
      isNew: false,
      isAuthenticated: true,
      isGraded: false,
      estimatedDelivery: '2-3 days'
    }
  ]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      conditions: [],
      rarities: [],
      sets: [],
      types: [],
      priceMin: '',
      priceMax: '',
      artist: '',
      gradedOnly: false,
      authenticatedOnly: false
    });
  };

  const handleAddToCart = (product, quickBuy = false) => {
    console.log(`Added ${product?.name} to cart`, { quickBuy });
    // Cart logic would go here
  };

  const handleAddToWishlist = (productId) => {
    setWishlistItems(prev => 
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In real app, would append new products
    }, 1000);
  };

  const handleApplySearch = (savedSearch) => {
    setFilters({
      ...filters,
      search: savedSearch?.query || '',
      ...savedSearch?.filters
    });
    setIsMobileFilterOpen(false);
  };

  const handleClearRecentlyViewed = () => {
    console.log('Clearing recently viewed history');
  };

  // Filter products based on current filters
  const filteredProducts = products?.filter(product => {
    if (filters?.search && !product?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.conditions?.length && !filters?.conditions?.includes(product?.condition)) {
      return false;
    }
    if (filters?.rarities?.length && !filters?.rarities?.includes(product?.rarity)) {
      return false;
    }
    if (filters?.priceMin && product?.price < parseFloat(filters?.priceMin)) {
      return false;
    }
    if (filters?.priceMax && product?.price > parseFloat(filters?.priceMax)) {
      return false;
    }
    if (filters?.gradedOnly && !product?.isGraded) {
      return false;
    }
    if (filters?.authenticatedOnly && !product?.isAuthenticated) {
      return false;
    }
    if (filters?.artist && !product?.artist?.toLowerCase()?.includes(filters?.artist?.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'newest':
        return b?.isNew - a?.isNew;
      case 'rarity':
        const rarityOrder = { 'common': 1, 'uncommon': 2, 'rare': 3, 'ultra-rare': 4, 'secret': 5 };
        return (rarityOrder?.[b?.rarity] || 0) - (rarityOrder?.[a?.rarity] || 0);
      case 'condition':
        const conditionOrder = { 'nm': 4, 'lp': 3, 'mp': 2, 'hp': 1 };
        return (conditionOrder?.[b?.condition] || 0) - (conditionOrder?.[a?.condition] || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 flex">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:block transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}>
          {!sidebarCollapsed ? (
            <div className="h-screen overflow-y-auto border-r border-border bg-card">
              <div className="p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(true)}
                  className="mb-4"
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
              </div>
              
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isMobile={false}
                onClose={() => {}}
              />
            </div>
          ) : (
            <div className="h-screen bg-card border-r border-border flex flex-col items-center py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="mb-4"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
              <div className="space-y-4">
                <Button variant="ghost" size="sm">
                  <Icon name="Filter" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Search" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Heart" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Icon name="Filter" size={16} className="mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Icon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Icon name="List" size={16} />
                </Button>
              </div>
            </div>

            <ProductGrid
              products={sortedProducts}
              loading={loading}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistItems={wishlistItems}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              viewMode={viewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden xl:block w-80 border-l border-border bg-card overflow-y-auto">
            <div className="p-6 space-y-6">
              <SetCompletionTracker 
                userSets={[]}
                onToggleSet={() => {}}
              />
              <SavedSearches onApplySearch={handleApplySearch} />
              <RecentlyViewed onClearHistory={handleClearRecentlyViewed} />
              <PriceAlerts />
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobile={true}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation for Right Sidebar Content */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm">
            <Icon name="Target" size={16} className="mb-1" />
            <span className="text-xs">Sets</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Bookmark" size={16} className="mb-1" />
            <span className="text-xs">Saved</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="History" size={16} className="mb-1" />
            <span className="text-xs">Recent</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={16} className="mb-1" />
            <span className="text-xs">Alerts</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogPage;