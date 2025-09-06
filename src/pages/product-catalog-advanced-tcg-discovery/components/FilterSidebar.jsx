import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isMobile, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    condition: true,
    rarity: true,
    set: true,
    price: true,
    type: false,
    artist: false
  });

  const conditionOptions = [
    { value: 'nm', label: 'Near Mint (NM)', description: 'Perfect or near-perfect condition' },
    { value: 'lp', label: 'Lightly Played (LP)', description: 'Minor wear on edges or corners' },
    { value: 'mp', label: 'Moderately Played (MP)', description: 'Noticeable wear but still playable' },
    { value: 'hp', label: 'Heavily Played (HP)', description: 'Significant wear, creases possible' }
  ];

  const rarityOptions = [
    { value: 'common', label: 'Common', icon: 'Circle' },
    { value: 'uncommon', label: 'Uncommon', icon: 'Diamond' },
    { value: 'rare', label: 'Rare', icon: 'Star' },
    { value: 'ultra-rare', label: 'Ultra Rare', icon: 'Zap' },
    { value: 'secret', label: 'Secret Rare', icon: 'Crown' }
  ];

  const setOptions = [
    { value: 'sv04', label: 'Paradox Rift (SV04)' },
    { value: 'sv03', label: 'Obsidian Flames (SV03)' },
    { value: 'sv02', label: 'Paldea Evolved (SV02)' },
    { value: 'sv01', label: 'Scarlet & Violet Base (SV01)' },
    { value: 'swsh12', label: 'Silver Tempest (SWSH12)' },
    { value: 'swsh11', label: 'Lost Origin (SWSH11)' }
  ];

  const typeOptions = [
    { value: 'grass', label: 'Grass' },
    { value: 'fire', label: 'Fire' },
    { value: 'water', label: 'Water' },
    { value: 'lightning', label: 'Lightning' },
    { value: 'psychic', label: 'Psychic' },
    { value: 'fighting', label: 'Fighting' },
    { value: 'darkness', label: 'Darkness' },
    { value: 'metal', label: 'Metal' },
    { value: 'colorless', label: 'Colorless' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleConditionChange = (condition, checked) => {
    const newConditions = checked 
      ? [...(filters?.conditions || []), condition]
      : (filters?.conditions || [])?.filter(c => c !== condition);
    onFilterChange('conditions', newConditions);
  };

  const handleRarityChange = (rarity, checked) => {
    const newRarities = checked 
      ? [...(filters?.rarities || []), rarity]
      : (filters?.rarities || [])?.filter(r => r !== rarity);
    onFilterChange('rarities', newRarities);
  };

  const handleTypeChange = (type, checked) => {
    const newTypes = checked 
      ? [...(filters?.types || []), type]
      : (filters?.types || [])?.filter(t => t !== type);
    onFilterChange('types', newTypes);
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
          placeholder="Search by card name, number..."
          value={filters?.search || ''}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Condition Filter */}
      <FilterSection
        title="Condition"
        isExpanded={expandedSections?.condition}
        onToggle={() => toggleSection('condition')}
      >
        {conditionOptions?.map((condition) => (
          <div key={condition?.value} className="flex items-start space-x-2">
            <Checkbox
              checked={(filters?.conditions || [])?.includes(condition?.value)}
              onChange={(e) => handleConditionChange(condition?.value, e?.target?.checked)}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{condition?.label}</div>
              <div className="text-xs text-muted-foreground">{condition?.description}</div>
            </div>
          </div>
        ))}
      </FilterSection>

      {/* Rarity Filter */}
      <FilterSection
        title="Rarity"
        isExpanded={expandedSections?.rarity}
        onToggle={() => toggleSection('rarity')}
      >
        {rarityOptions?.map((rarity) => (
          <div key={rarity?.value} className="flex items-center space-x-2">
            <Checkbox
              checked={(filters?.rarities || [])?.includes(rarity?.value)}
              onChange={(e) => handleRarityChange(rarity?.value, e?.target?.checked)}
            />
            <Icon name={rarity?.icon} size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{rarity?.label}</span>
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

      {/* Type Filter */}
      <FilterSection
        title="Type"
        isExpanded={expandedSections?.type}
        onToggle={() => toggleSection('type')}
      >
        <div className="grid grid-cols-2 gap-2">
          {typeOptions?.map((type) => (
            <div key={type?.value} className="flex items-center space-x-2">
              <Checkbox
                checked={(filters?.types || [])?.includes(type?.value)}
                onChange={(e) => handleTypeChange(type?.value, e?.target?.checked)}
              />
              <span className="text-sm text-foreground">{type?.label}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Artist Filter */}
      <FilterSection
        title="Artist"
        isExpanded={expandedSections?.artist}
        onToggle={() => toggleSection('artist')}
      >
        <Input
          type="text"
          placeholder="Artist name..."
          value={filters?.artist || ''}
          onChange={(e) => onFilterChange('artist', e?.target?.value)}
        />
      </FilterSection>

      {/* Authentication Filter */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={filters?.gradedOnly || false}
            onChange={(e) => onFilterChange('gradedOnly', e?.target?.checked)}
          />
          <span className="text-sm text-foreground">Graded Cards Only</span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={filters?.authenticatedOnly || false}
            onChange={(e) => onFilterChange('authenticatedOnly', e?.target?.checked)}
          />
          <span className="text-sm text-foreground">Authenticated Only</span>
        </div>
      </div>
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