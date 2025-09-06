import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: "ORD-2025-001247",
      customer: "Alex Chen",
      email: "alex.chen@email.com",
      items: 3,
      total: "$247.50",
      status: "processing",
      priority: "high",
      date: "2025-08-31",
      time: "14:32",
      paymentMethod: "Credit Card",
      shippingMethod: "Express"
    },
    {
      id: "ORD-2025-001246",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      items: 1,
      total: "$89.99",
      status: "shipped",
      priority: "normal",
      date: "2025-08-31",
      time: "13:45",
      paymentMethod: "PayPal",
      shippingMethod: "Standard"
    },
    {
      id: "ORD-2025-001245",
      customer: "Michael Rodriguez",
      email: "m.rodriguez@email.com",
      items: 7,
      total: "$456.75",
      status: "pending",
      priority: "urgent",
      date: "2025-08-31",
      time: "12:18",
      paymentMethod: "Credit Card",
      shippingMethod: "Express"
    },
    {
      id: "ORD-2025-001244",
      customer: "Emma Thompson",
      email: "emma.t@email.com",
      items: 2,
      total: "$134.20",
      status: "delivered",
      priority: "normal",
      date: "2025-08-30",
      time: "16:22",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard"
    },
    {
      id: "ORD-2025-001243",
      customer: "David Kim",
      email: "david.kim@email.com",
      items: 5,
      total: "$312.80",
      status: "cancelled",
      priority: "low",
      date: "2025-08-30",
      time: "11:55",
      paymentMethod: "PayPal",
      shippingMethod: "Express"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'processing': return 'bg-accent/10 text-accent border-accent/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error';
      case 'high': return 'text-warning';
      case 'normal': return 'text-accent';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev?.includes(orderId) 
        ? prev?.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders?.length === orders?.length 
        ? [] 
        : orders?.map(order => order?.id)
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
            <p className="text-sm text-muted-foreground mt-1">Manage and track customer orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button size="sm" iconName="Plus">
              New Order
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOrders?.length === orders?.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
              />
              <span className="text-sm text-muted-foreground">
                {selectedOrders?.length > 0 ? `${selectedOrders?.length} selected` : 'Select all'}
              </span>
            </label>
          </div>
          
          {selectedOrders?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Mail">
                Email
              </Button>
              <Button variant="outline" size="sm" iconName="Truck">
                Ship
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2">
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {orders?.map((order) => (
            <div 
              key={order?.id} 
              className={`p-4 rounded-lg border transition-all duration-200 hover:card-shadow-hover ${
                selectedOrders?.includes(order?.id) 
                  ? 'border-accent bg-accent/5' :'border-border bg-background'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={() => handleSelectOrder(order?.id)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
                  />
                  
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm font-medium text-foreground">{order?.id}</span>
                      <span className={`text-xs font-medium ${getPriorityColor(order?.priority)}`}>
                        {order?.priority?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-foreground">{order?.customer}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{order?.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{order?.total}</p>
                    <p className="text-xs text-muted-foreground">{order?.items} items</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-foreground">{order?.date}</p>
                    <p className="text-xs text-muted-foreground">{order?.time}</p>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>Payment: {order?.paymentMethod}</span>
                  <span>•</span>
                  <span>Shipping: {order?.shippingMethod}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={12} />
                  <span>Last updated 2 hours ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 5 of 1,247 orders
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;