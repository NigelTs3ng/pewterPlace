import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Charizard ex (Base Set) has only 3 units remaining',
      timestamp: '5 minutes ago',
      priority: 'high',
      action: 'Reorder Now'
    },
    {
      id: 2,
      type: 'new_order',
      title: 'High Value Order',
      message: 'Order #ORD-2025-001247 worth $1,247.50 requires verification',
      timestamp: '12 minutes ago',
      priority: 'urgent',
      action: 'Verify Order'
    },
    {
      id: 3,
      type: 'customer_service',
      title: 'Customer Inquiry',
      message: 'Return request for damaged PSA 9 Lugia ex',
      timestamp: '1 hour ago',
      priority: 'normal',
      action: 'Review Request'
    },
    {
      id: 4,
      type: 'system',
      title: 'Backup Complete',
      message: 'Daily database backup completed successfully',
      timestamp: '2 hours ago',
      priority: 'low',
      action: 'View Report'
    }
  ]);

  const quickActionButtons = [
    {
      id: 1,
      title: 'Process Orders',
      description: 'Review and fulfill pending orders',
      icon: 'Package',
      color: 'bg-accent',
      count: 23,
      action: () => console.log('Process Orders')
    },
    {
      id: 2,
      title: 'Update Inventory',
      description: 'Add new products or update stock',
      icon: 'Plus',
      color: 'bg-success',
      count: null,
      action: () => console.log('Update Inventory')
    },
    {
      id: 3,
      title: 'Customer Support',
      description: 'Handle customer inquiries',
      icon: 'MessageCircle',
      color: 'bg-warning',
      count: 7,
      action: () => console.log('Customer Support')
    },
    {
      id: 4,
      title: 'Generate Reports',
      description: 'Create sales and inventory reports',
      icon: 'BarChart3',
      color: 'bg-purple-500',
      count: null,
      action: () => console.log('Generate Reports')
    },
    {
      id: 5,
      title: 'Manage Users',
      description: 'Add or modify user accounts',
      icon: 'Users',
      color: 'bg-blue-500',
      count: null,
      action: () => console.log('Manage Users')
    },
    {
      id: 6,
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: 'Settings',
      color: 'bg-slate-500',
      count: null,
      action: () => console.log('System Settings')
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'low_stock': return 'AlertTriangle';
      case 'new_order': return 'ShoppingCart';
      case 'customer_service': return 'MessageCircle';
      case 'system': return 'Info';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-error bg-error/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'normal': return 'border-l-accent bg-accent/5';
      case 'low': return 'border-l-muted-foreground bg-muted/50';
      default: return 'border-l-border bg-background';
    }
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mt-1">Frequently used admin functions</p>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Customize
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionButtons?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="relative p-4 bg-background border border-border rounded-lg hover:card-shadow-hover transition-all duration-300 text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={action?.icon} size={24} color="white" />
                </div>
                {action?.count && (
                  <div className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
                    {action?.count}
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>
      {/* Notifications Panel */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">Important alerts and updates</p>
            </div>
            <div className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
              {notifications?.length}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Settings">
              Settings
            </Button>
            <Button variant="outline" size="sm" iconName="CheckCheck">
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">All caught up!</h4>
              <p className="text-sm text-muted-foreground">No new notifications at the moment.</p>
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`border-l-4 p-4 rounded-lg ${getPriorityColor(notification?.priority)} hover:bg-opacity-80 transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      <Icon 
                        name={getNotificationIcon(notification?.type)} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {notification?.title}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          notification?.priority === 'urgent' ? 'bg-error/10 text-error' :
                          notification?.priority === 'high' ? 'bg-warning/10 text-warning' :
                          notification?.priority === 'normal'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                        }`}>
                          {notification?.priority?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification?.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification?.timestamp}
                        </span>
                        <Button variant="ghost" size="sm">
                          {notification?.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification?.id)}
                    className="ml-2"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications?.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" size="sm">
              View All Notifications
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;