import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isMobile, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    set: true,
    price: true,
    availability: true
  });

  const typeOptions = [
    { value: 'Booster Box', label: 'Booster Box', description: '36 packs per box' },
    { value: 'Elite Trainer Box', label: 'Elite Trainer Box', description: '8-10 packs + accessories' },
    { value: 'Booster Pack', label: 'Booster Pack', description: 'Single pack' },
    { value: 'Collection Box', label: 'Collection Box', description: 'Promo cards + boosters' },
    { value: 'Special Set', label: 'Special Set', description: 'Limited edition releases' },
    { value: 'Theme Deck', label: 'Theme Deck', description: 'Pre-constructed decks' }
  ];

  const setOptions = [
    { value: 'sv04', label: 'Paradox Rift (SV04)' },
    { value: 'sv03', label: 'Obsidian Flames (SV03)' },
    { value: 'sv02', label: 'Paldea Evolved (SV02)' },
    { value: 'sv01', label: 'Scarlet & Violet Base (SV01)' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTypeChange = (type, checked) => {
    const newTypes = checked 
      ? [...(filters?.type || []), type]
      : (filters?.type || []).filter(t => t !== type);
    onFilterChange('type', newTypes);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-accent transition-colors"
      >
        <span>{title}</span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Quick Search */}
      <div>
        <Input
          type="search"
          placeholder="Search sealed products..."
          value={filters?.search || ''}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Product Type Filter */}
      <FilterSection
        title="Product Type"
        isExpanded={expandedSections?.type}
        onToggle={() => toggleSection('type')}
      >
        {typeOptions?.map((type) => (
          <div key={type?.value} className="flex items-start space-x-2">
            <Checkbox
              checked={(filters?.type || []).includes(type?.value)}
              onChange={(e) => handleTypeChange(type?.value, e?.target?.checked)}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{type?.label}</div>
              <div className="text-xs text-muted-foreground">{type?.description}</div>
            </div>
          </div>
        ))}
      </FilterSection>

      {/* Set Filter */}
      <FilterSection
        title="Set"
        isExpanded={expandedSections?.set}
        onToggle={() => toggleSection('set')}
      >
        <Select
          placeholder="Select sets..."
          multiple
          searchable
          options={setOptions}
          value={filters?.sets || []}
          onChange={(value) => onFilterChange('sets', value)}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections?.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min $"
            value={filters?.priceMin || ''}
            onChange={(e) => onFilterChange('priceMin', e?.target?.value)}
          />
          <Input
            type="number"
            placeholder="Max $"
            value={filters?.priceMax || ''}
            onChange={(e) => onFilterChange('priceMax', e?.target?.value)}
          />
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections?.availability}
        onToggle={() => toggleSection('availability')}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters?.inStock || false}
              onChange={(e) => onFilterChange('inStock', e?.target?.checked)}
            />
            <span className="text-sm text-foreground">In Stock Only</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters?.preOrder || false}
              onChange={(e) => onFilterChange('preOrder', e?.target?.checked)}
            />
            <span className="text-sm text-foreground">Include Pre-orders</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            {sidebarContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;