import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ onApplySearch }) => {
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: 'Booster Boxes Under $100',
      query: '',
      filters: {
        type: ['Booster Box'],
        priceMax: '100'
      },
      alertEnabled: true,
      lastUpdated: '2025-09-08T10:30:00Z',
      resultCount: 12
    },
    {
      id: 2,
      name: 'Pre-order Products',
      query: '',
      filters: {
        preOrder: true
      },
      alertEnabled: true,
      lastUpdated: '2025-09-08T09:45:00Z',
      resultCount: 8
    }
  ]);

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
  };

  const handleToggleAlert = (searchId) => {
    setSavedSearches(prev => 
      prev.map(search => 
        search.id === searchId 
          ? { ...search, alertEnabled: !search.alertEnabled }
          : search
      )
    );
  };

  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getFilterSummary = (filters) => {
    const parts = [];
    
    if (filters?.type?.length) {
      parts.push(`${filters.type.length} product types`);
    }
    if (filters?.priceMax) {
      parts.push(`under $${filters.priceMax}`);
    }
    if (filters?.preOrder) {
      parts.push('pre-orders');
    }
    if (filters?.inStock) {
      parts.push('in stock only');
    }

    return parts.slice(0, 2).join(', ') + (parts.length > 2 ? '...' : '');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Saved Searches</h3>
        <Button variant="ghost" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Save Current
        </Button>
      </div>
      {savedSearches.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No saved searches yet. Save your current search to quickly access it later.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedSearches.map((search) => (
            <div key={search.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {search.name}
                    </h4>
                    {search.alertEnabled && (
                      <div className="flex items-center text-accent">
                        <Icon name="Bell" size={12} />
                      </div>
                    )}
                  </div>
                  
                  {search.query && (
                    <div className="text-sm text-muted-foreground mb-1">
                      Query: "{search.query}"
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    {getFilterSummary(search.filters)}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{search.resultCount} results</span>
                    <span>Updated {formatLastUpdated(search.lastUpdated)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleAlert(search.id)}
                    className="p-1"
                  >
                    <Icon 
                      name={search.alertEnabled ? "BellRing" : "Bell"} 
                      size={14} 
                      className={search.alertEnabled ? "text-accent" : "text-muted-foreground"}
                    />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onApplySearch(search)}
                    className="p-1"
                  >
                    <Icon name="Search" size={14} className="text-muted-foreground" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSearch(search.id)}
                    className="p-1 hover:text-red-500"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={14} className="mr-2" />
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;