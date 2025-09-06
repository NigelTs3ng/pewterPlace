import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SetCompletionTracker = ({ userSets, onToggleSet }) => {
  const [expandedSet, setExpandedSet] = useState(null);

  const mockUserSets = [
    {
      id: 'sv04',
      name: 'Paradox Rift',
      code: 'SV04',
      totalCards: 266,
      ownedCards: 189,
      completionPercentage: 71,
      missingHighValue: [
        { name: 'Charizard ex', number: '054', rarity: 'ultra-rare', priority: 'high' },
        { name: 'Miraidon ex', number: '081', rarity: 'ultra-rare', priority: 'medium' },
        { name: 'Ancient Booster Energy Capsule', number: '159', rarity: 'secret', priority: 'high' }
      ],
      recentAdditions: [
        { name: 'Gimmighoul', number: '087', addedDate: '2025-08-29' },
        { name: 'Annihilape ex', number: '024', addedDate: '2025-08-28' }
      ]
    },
    {
      id: 'sv03',
      name: 'Obsidian Flames',
      code: 'SV03',
      totalCards: 230,
      ownedCards: 201,
      completionPercentage: 87,
      missingHighValue: [
        { name: 'Charizard ex', number: '025', rarity: 'ultra-rare', priority: 'high' },
        { name: 'Tyranitar ex', number: '119', rarity: 'ultra-rare', priority: 'medium' }
      ],
      recentAdditions: [
        { name: 'Dragonite ex', number: '192', addedDate: '2025-08-30' }
      ]
    },
    {
      id: 'sv02',
      name: 'Paldea Evolved',
      code: 'SV02',
      totalCards: 279,
      ownedCards: 279,
      completionPercentage: 100,
      missingHighValue: [],
      recentAdditions: [
        { name: 'Miraidon ex', number: '253', addedDate: '2025-08-25' }
      ]
    }
  ];

  const sets = userSets || mockUserSets;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-500 bg-amber-50 border-amber-200';
      case 'low': return 'text-blue-500 bg-blue-50 border-blue-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage === 100) return 'bg-success';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Set Completion</h3>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="space-y-4">
        {sets?.map((set) => (
          <div key={set?.id} className="border border-border rounded-lg overflow-hidden">
            {/* Set Header */}
            <div 
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setExpandedSet(expandedSet === set?.id ? null : set?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{set?.code}</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{set?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {set?.ownedCards}/{set?.totalCards} cards
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {set?.completionPercentage}%
                    </div>
                    {set?.completionPercentage === 100 && (
                      <div className="flex items-center text-success text-sm">
                        <Icon name="CheckCircle" size={14} className="mr-1" />
                        Complete
                      </div>
                    )}
                  </div>
                  
                  <Icon 
                    name={expandedSet === set?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(set?.completionPercentage)}`}
                    style={{ width: `${set?.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedSet === set?.id && (
              <div className="border-t border-border bg-muted/20">
                <div className="p-4 space-y-4">
                  {/* Missing High Value Cards */}
                  {set?.missingHighValue?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Icon name="Target" size={16} className="mr-2 text-red-500" />
                        Priority Missing Cards
                      </h4>
                      <div className="space-y-2">
                        {set?.missingHighValue?.map((card, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-card rounded-lg border border-border">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-foreground">
                                {card?.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                #{card?.number}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(card?.priority)}`}>
                                {card?.priority}
                              </span>
                              <Button variant="ghost" size="sm">
                                <Icon name="Search" size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Additions */}
                  {set?.recentAdditions?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Icon name="Plus" size={16} className="mr-2 text-success" />
                        Recent Additions
                      </h4>
                      <div className="space-y-1">
                        {set?.recentAdditions?.map((card, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-foreground">
                              {card?.name} #{card?.number}
                            </span>
                            <span className="text-muted-foreground">
                              {new Date(card.addedDate)?.toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="Eye" size={14} className="mr-2" />
                      View Missing
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="ShoppingCart" size={14} className="mr-2" />
                      Quick Buy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add New Set */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth>
          <Icon name="Plus" size={16} className="mr-2" />
          Track New Set
        </Button>
      </div>
    </div>
  );
};

export default SetCompletionTracker;