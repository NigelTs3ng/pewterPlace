import React from 'react';
import Icon from '../../../components/AppIcon';


const PriceAlerts = ({ alerts }) => {
  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'price_drop':
        return { icon: 'TrendingDown', color: 'text-success' };
      case 'price_increase':
        return { icon: 'TrendingUp', color: 'text-error' };
      case 'back_in_stock':
        return { icon: 'Package', color: 'text-accent' };
      case 'new_listing':
        return { icon: 'Plus', color: 'text-warning' };
      default:
        return { icon: 'Bell', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Price Alerts</h3>
        <div className="flex items-center space-x-2">
          <button className="text-muted-foreground hover:text-foreground">
            <Icon name="Settings" size={16} />
          </button>
          <button className="text-accent hover:text-accent/80 text-sm font-medium">
            Manage Alerts
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {alerts?.map((alert) => {
          const alertInfo = getAlertTypeIcon(alert?.type);
          return (
            <div key={alert?.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-lg ${alertInfo?.color} bg-current/10`}>
                <Icon name={alertInfo?.icon} size={20} className={alertInfo?.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">{alert?.cardName}</h4>
                  <span className="text-xs text-muted-foreground">{alert?.timeAgo}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {alert?.type === 'price_drop' && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm line-through text-muted-foreground">
                          ${alert?.oldPrice}
                        </span>
                        <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                        <span className="text-sm font-semibold text-success">
                          ${alert?.newPrice}
                        </span>
                      </div>
                    )}
                    {alert?.type === 'price_increase' && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-muted-foreground">
                          ${alert?.oldPrice}
                        </span>
                        <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                        <span className="text-sm font-semibold text-error">
                          ${alert?.newPrice}
                        </span>
                      </div>
                    )}
                    {alert?.type === 'back_in_stock' && (
                      <span className="text-sm font-semibold text-accent">
                        ${alert?.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {alert?.actionable && (
                      <button className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full hover:bg-accent/90 transition-colors">
                        Buy Now
                      </button>
                    )}
                    <button className="text-muted-foreground hover:text-foreground">
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {alerts?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No active alerts</p>
          <p className="text-sm text-muted-foreground">Set up price alerts to track your favorite cards!</p>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;