import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Dashboard home'
    },
    {
      id: 'collection',
      name: 'Collection',
      icon: 'Grid3X3',
      description: 'Track your sets'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: 'Package',
      description: 'Order history'
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
      icon: 'Heart',
      description: 'Saved items'
    },
    {
      id: 'alerts',
      name: 'Alerts',
      icon: 'Bell',
      description: 'Price notifications'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'Settings',
      description: 'Account preferences'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-2 card-shadow mb-8">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab?.id
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center overflow-x-auto space-x-1 pb-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;