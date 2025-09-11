import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      productName: 'Scarlet & Violet 151 Booster Box',
      currentPrice: 144.99,
      targetPrice: 130.00,
      type: 'Booster Box',
      isActive: true,
      createdAt: '2025-09-07T10:00:00Z',
      triggeredCount: 0
    },
    {
      id: 2,
      productName: 'Temporal Forces Elite Trainer Box',
      currentPrice: 49.99,
      targetPrice: 45.00,
      type: 'Elite Trainer Box',
      isActive: true,
      createdAt: '2025-09-08T14:30:00Z',
      triggeredCount: 1
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    productName: '',
    targetPrice: '',
    type: 'Booster Box'
  });

  const handleToggleAlert = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, isActive: !alert.isActive }
          : alert
      )
    );
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleAddAlert = () => {
    if (newAlert.productName && newAlert.targetPrice) {
      const alert = {
        id: Date.now(),
        productName: newAlert.productName,
        currentPrice: 0,
        targetPrice: parseFloat(newAlert.targetPrice),
        type: newAlert.type,
        isActive: true,
        createdAt: new Date().toISOString(),
        triggeredCount: 0
      };
      
      setAlerts(prev => [alert, ...prev]);
      setNewAlert({ productName: '', targetPrice: '', type: 'Booster Box' });
      setShowAddForm(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriceDifference = (current, target) => {
    const diff = ((current - target) / target) * 100;
    return {
      percentage: Math.abs(diff).toFixed(1),
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
              label="Product Name"
              type="text"
              placeholder="Enter product name..."
              value={newAlert.productName}
              onChange={(e) => setNewAlert(prev => ({ ...prev, productName: e.target.value }))}
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Target Price (USD)"
                type="number"
                placeholder="0.00"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Product Type
                </label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="Booster Box">Booster Box</option>
                  <option value="Elite Trainer Box">Elite Trainer Box</option>
                  <option value="Booster Pack">Booster Pack</option>
                  <option value="Collection Box">Collection Box</option>
                  <option value="Special Set">Special Set</option>
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
      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No price alerts set. Create alerts to get notified when product prices drop.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const priceDiff = getPriceDifference(alert.currentPrice, alert.targetPrice);
            
            return (
              <div key={alert.id} className={`border rounded-lg p-4 ${
                alert.isActive ? 'border-border' : 'border-border bg-muted/30'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium truncate ${
                        alert.isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {alert.productName}
                      </h4>
                      {!alert.isActive && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Paused
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium text-foreground">
                          {formatPrice(alert.currentPrice)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target: </span>
                        <span className="font-medium text-foreground">
                          {formatPrice(alert.targetPrice)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{alert.type}</span>
                        <span>•</span>
                        <span>Created {formatDate(alert.createdAt)}</span>
                        {alert.triggeredCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{alert.triggeredCount} alerts sent</span>
                          </>
                        )}
                      </div>
                      
                      {alert.currentPrice > 0 && (
                        <div className={`text-xs font-medium ${
                          priceDiff.isAbove 
                            ? priceDiff.isClose ? 'text-amber-600' : 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {priceDiff.isAbove ? '+' : '-'}{priceDiff.percentage}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleAlert(alert.id)}
                      className="p-1"
                    >
                      <Icon 
                        name={alert.isActive ? "BellRing" : "BellOff"} 
                        size={14} 
                        className={alert.isActive ? "text-accent" : "text-muted-foreground"}
                      />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAlert(alert.id)}
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
      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {alerts.filter(a => a.isActive).length} active alerts
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