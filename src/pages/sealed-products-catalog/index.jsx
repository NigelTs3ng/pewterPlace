import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import SavedSearches from './components/SavedSearches';
import RecentlyViewed from './components/RecentlyViewed';
import PriceAlerts from './components/PriceAlerts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SealedProductsPage = () => {
  const location = useLocation();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [wishlistItems, setWishlistItems] = useState([1, 5, 12, 23]);

  const [filters, setFilters] = useState({
    search: '',
    type: [], // booster box, elite trainer box, booster pack, etc.
    sets: [],
    priceMin: '',
    priceMax: '',
    inStock: true,
    preOrder: false
  });

  // Mock data for sealed products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Scarlet & Violet 151 Booster Box",
      set: "Pokemon 151",
      type: "Booster Box",
      image: "https://images.pokemontcg.io/sv3/box_hires.png",
      price: 144.99,
      originalPrice: 159.99,
      stock: 25,
      isNew: true,
      isPreOrder: false,
      estimatedDelivery: "1-2 days",
      itemsPerUnit: "36 packs per box",
      releaseDate: "2025-09-22"
    },
    {
      id: 2,
      name: "Paldea Evolved Elite Trainer Box",
      set: "Paldea Evolved",
      type: "Elite Trainer Box",
      image: "https://images.pokemontcg.io/sv2/etb_hires.png",
      price: 49.99,
      stock: 50,
      isNew: false,
      isPreOrder: false,
      estimatedDelivery: "1-2 days",
      itemsPerUnit: "8 packs + accessories",
      releaseDate: "2025-06-15"
    },
    {
      id: 3,
      name: "Temporal Forces Booster Pack",
      set: "Temporal Forces",
      type: "Booster Pack",
      image: "https://images.pokemontcg.io/sv4/pack_hires.png",
      price: 4.99,
      stock: 500,
      isNew: true,
      isPreOrder: true,
      estimatedDelivery: "Release Date: Oct 2025",
      itemsPerUnit: "10 cards per pack",
      releaseDate: "2025-10-01"
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
      type: [],
      sets: [],
      priceMin: '',
      priceMax: '',
      inStock: true,
      preOrder: false
    });
  };

  const handleAddToCart = (product, quickBuy = false) => {
    console.log('Adding to cart:', product, { quickBuy });
  };

  const handleAddToWishlist = (productId) => {
    setWishlistItems(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.type.length && !filters.type.includes(product.type)) {
      return false;
    }
    if (filters.priceMin && product.price < parseFloat(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && product.price > parseFloat(filters.priceMax)) {
      return false;
    }
    if (filters.inStock && product.stock === 0) {
      return false;
    }
    if (!filters.preOrder && product.isPreOrder) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.isNew - a.isNew;
      case 'release-date':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
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
              <SavedSearches onApplySearch={() => {}} />
              <RecentlyViewed onClearHistory={() => {}} />
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
    </div>
  );
};

export default SealedProductsPage;