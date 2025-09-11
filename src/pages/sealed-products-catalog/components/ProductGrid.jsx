import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  loading, 
  onAddToCart, 
  onAddToWishlist, 
  wishlistItems,
  onLoadMore,
  hasMore,
  viewMode,
  sortBy,
  onSortChange 
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'newest', label: 'Newest First' },
    { value: 'release-date', label: 'Release Date' }
  ];

  const handleBulkSelect = (productId) => {
    setSelectedProducts(prev => 
      prev?.includes(productId) 
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkAddToCart = () => {
    const selectedProductData = products?.filter(p => selectedProducts?.includes(p?.id));
    selectedProductData?.forEach(product => onAddToCart(product));
    setSelectedProducts([]);
    setBulkMode(false);
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === products?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products?.map(p => p?.id));
    }
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'compact':
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  if (loading && products?.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                <div className="flex justify-between">
                  <div className="h-6 bg-muted animate-pulse rounded w-16" />
                  <div className="h-4 bg-muted animate-pulse rounded w-12" />
                </div>
                <div className="h-8 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {products?.length} products found
          </div>
          
          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant={bulkMode ? "default" : "outline"}
              size="sm"
              onClick={() => setBulkMode(!bulkMode)}
            >
              <Icon name="CheckSquare" size={16} className="mr-2" />
              Bulk Select
            </Button>
            
            {bulkMode && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedProducts?.length === products?.length ? 'Deselect All' : 'Select All'}
                </Button>
                
                {selectedProducts?.length > 0 && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleBulkAddToCart}
                  >
                    Add {selectedProducts?.length} to Cart
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="bg-card border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products?.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
          <Button variant="outline" onClick={() => onClearFilters?.()}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className={getGridClasses()}>
            {products?.map((product) => (
              <div key={product?.id} className="relative">
                {bulkMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(product?.id)}
                      onChange={() => handleBulkSelect(product?.id)}
                      className="w-4 h-4 text-accent bg-card border-border rounded focus:ring-accent focus:ring-2"
                    />
                  </div>
                )}
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  isInWishlist={wishlistItems?.includes(product?.id)}
                />
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={onLoadMore}
                loading={loading}
                iconName="ChevronDown"
                iconPosition="right"
              >
                {loading ? 'Loading...' : 'Load More Products'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;