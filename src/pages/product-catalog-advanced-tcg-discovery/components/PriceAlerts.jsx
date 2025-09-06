import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      cardName: 'Charizard ex (Obsidian Flames)',
      currentPrice: 89.99,
      targetPrice: 75.00,
      condition: 'nm',
      isActive: true,
      createdAt: '2025-08-28T10:00:00Z',
      triggeredCount: 0
    },
    {
      id: 2,
      cardName: 'Miraidon ex (Paradox Rift)',
      currentPrice: 24.99,
      targetPrice: 20.00,
      condition: 'lp',
      isActive: true,
      createdAt: '2025-08-29T14:30:00Z',
      triggeredCount: 2
    },
    {
      id: 3,
      cardName: 'Professor\'s Research (SV Base)',
      currentPrice: 3.99,
      targetPrice: 2.50,
      condition: 'nm',
      isActive: false,
      createdAt: '2025-08-25T09:15:00Z',
      triggeredCount: 1
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    cardName: '',
    targetPrice: '',
    condition: 'nm'
  });

  const handleToggleAlert = (alertId) => {
    setAlerts(prev => 
      prev?.map(alert => 
        alert?.id === alertId 
          ? { ...alert, isActive: !alert?.isActive }
          : alert
      )
    );
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleAddAlert = () => {
    if (newAlert?.cardName && newAlert?.targetPrice) {
      const alert = {
        id: Date.now(),
        cardName: newAlert?.cardName,
        currentPrice: 0, // Would be fetched from API
        targetPrice: parseFloat(newAlert?.targetPrice),
        condition: newAlert?.condition,
        isActive: true,
        createdAt: new Date()?.toISOString(),
        triggeredCount: 0
      };
      
      setAlerts(prev => [alert, ...prev]);
      setNewAlert({ cardName: '', targetPrice: '', condition: 'nm' });
      setShowAddForm(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-SG', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriceDifference = (current, target) => {
    const diff = ((current - target) / target) * 100;
    return {
      percentage: Math.abs(diff)?.toFixed(1),
      isAbove: current > target,
      isClose: Math.abs(diff) <= 10
    };
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Price Alerts</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Alert
        </Button>
      </div>
      {/* Add Alert Form */}
      {showAddForm && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-muted/20">
          <div className="space-y-3">
            <Input
              label="Card Name"
              type="text"
              placeholder="Enter card name..."
              value={newAlert?.cardName}
              onChange={(e) => setNewAlert(prev => ({ ...prev, cardName: e?.target?.value }))}
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Target Price (SGD)"
                type="number"
                placeholder="0.00"
                value={newAlert?.targetPrice}
                onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e?.target?.value }))}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Condition
                </label>
                <select
                  value={newAlert?.condition}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, condition: e?.target?.value }))}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="nm">Near Mint</option>
                  <option value="lp">Lightly Played</option>
                  <option value="mp">Moderately Played</option>
                  <option value="hp">Heavily Played</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="default" size="sm" onClick={handleAddAlert}>
                Create Alert
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Alerts List */}
      {alerts?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No price alerts set. Create alerts to get notified when card prices drop.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts?.map((alert) => {
            const priceDiff = getPriceDifference(alert?.currentPrice, alert?.targetPrice);
            
            return (
              <div key={alert?.id} className={`border rounded-lg p-4 ${
                alert?.isActive ? 'border-border' : 'border-border bg-muted/30'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium truncate ${
                        alert?.isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {alert?.cardName}
                      </h4>
                      {!alert?.isActive && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Paused
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium text-foreground">
                          {formatPrice(alert?.currentPrice)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target: </span>
                        <span className="font-medium text-foreground">
                          {formatPrice(alert?.targetPrice)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Created {formatDate(alert?.createdAt)}</span>
                        {alert?.triggeredCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{alert?.triggeredCount} alerts sent</span>
                          </>
                        )}
                      </div>
                      
                      {alert?.currentPrice > 0 && (
                        <div className={`text-xs font-medium ${
                          priceDiff?.isAbove 
                            ? priceDiff?.isClose ? 'text-amber-600' : 'text-red-600' :'text-green-600'
                        }`}>
                          {priceDiff?.isAbove ? '+' : '-'}{priceDiff?.percentage}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleAlert(alert?.id)}
                      className="p-1"
                    >
                      <Icon 
                        name={alert?.isActive ? "BellRing" : "BellOff"} 
                        size={14} 
                        className={alert?.isActive ? "text-accent" : "text-muted-foreground"}
                      />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAlert(alert?.id)}
                      className="p-1 hover:text-red-500"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Summary */}
      {alerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {alerts?.filter(a => a?.isActive)?.length} active alerts
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={14} className="mr-2" />
              Manage All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;