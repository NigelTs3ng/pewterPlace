import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SetTracker = ({ sets }) => {
  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Set Completion Tracker</h3>
        <button className="text-accent hover:text-accent/80 text-sm font-medium">
          View All Sets
        </button>
      </div>
      <div className="space-y-4">
        {sets?.map((set) => (
          <div key={set?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={set?.image}
                  alt={set?.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                  {set?.completion}%
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{set?.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {set?.owned}/{set?.total} cards
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${set?.completion}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">
                      Missing: {set?.missing} cards
                    </span>
                    <span className="text-success">
                      Est. cost: ${set?.estimatedCost}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {set?.hasRares && (
                      <div className="flex items-center text-warning">
                        <Icon name="Star" size={14} className="mr-1" />
                        <span className="text-xs">Rare needed</span>
                      </div>
                    )}
                    <button className="text-accent hover:text-accent/80">
                      <Icon name="ShoppingCart" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetTracker;