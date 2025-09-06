import React from 'react';
import Icon from '../../../components/AppIcon';

const CollectionOverview = ({ collectionData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={24} className="text-accent" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">${collectionData?.totalValue?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Collection Value</p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="ArrowUp" size={16} className="text-success mr-1" />
          <span className="text-success">+{collectionData?.valueChange}%</span>
          <span className="text-muted-foreground ml-1">this month</span>
        </div>
      </div>
      <div className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{collectionData?.totalCards}</p>
            <p className="text-sm text-muted-foreground">Total Cards</p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="Plus" size={16} className="text-success mr-1" />
          <span className="text-success">+{collectionData?.recentAdditions}</span>
          <span className="text-muted-foreground ml-1">this week</span>
        </div>
      </div>
      <div className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-warning/10 rounded-lg">
            <Icon name="Target" size={24} className="text-warning" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{collectionData?.completionRate}%</p>
            <p className="text-sm text-muted-foreground">Sets Complete</p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="Calendar" size={16} className="text-muted-foreground mr-1" />
          <span className="text-muted-foreground">{collectionData?.activeSets} active sets</span>
        </div>
      </div>
      <div className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-success/10 rounded-lg">
            <Icon name="Star" size={24} className="text-success" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{collectionData?.rareCards}</p>
            <p className="text-sm text-muted-foreground">Rare Cards</p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="Gem" size={16} className="text-success mr-1" />
          <span className="text-success">{collectionData?.holoCards} holographic</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionOverview;