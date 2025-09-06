import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Browse New Arrivals",
      description: "Check out the latest cards added to our collection",
      icon: "Package",
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/product-catalog-advanced-tcg-discovery"
    },
    {
      title: "Track a Package",
      description: "Get real-time updates on your order status",
      icon: "Truck",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: "track"
    },
    {
      title: "Set Price Alert",
      description: "Get notified when your wanted cards drop in price",
      icon: "Bell",
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: "alert"
    },
    {
      title: "View Cart",
      description: "Complete your pending purchases",
      icon: "ShoppingCart",
      color: "text-success",
      bgColor: "bg-success/10",
      link: "/shopping-cart-checkout-secure-collection-investment"
    }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'track':
        // Handle package tracking
        console.log('Opening package tracking');
        break;
      case 'alert':
        // Handle price alert setup
        console.log('Opening price alert setup');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <div key={index}>
            {action?.link ? (
              <Link
                to={action?.link}
                className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:border-accent/50 group"
              >
                <div className={`p-3 rounded-lg ${action?.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon name={action?.icon} size={20} className={action?.color} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action?.action)}
                className="w-full flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:border-accent/50 group text-left"
              >
                <div className={`p-3 rounded-lg ${action?.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon name={action?.icon} size={20} className={action?.color} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">Need Help?</h4>
            <p className="text-sm text-muted-foreground">Contact our collector support team</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;