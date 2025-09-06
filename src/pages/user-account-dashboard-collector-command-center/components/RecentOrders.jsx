import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'shipped':
        return { icon: 'Truck', color: 'text-accent' };
      case 'processing':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Package', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      delivered: 'bg-success/10 text-success border-success/20',
      shipped: 'bg-accent/10 text-accent border-accent/20',
      processing: 'bg-warning/10 text-warning border-warning/20',
      cancelled: 'bg-error/10 text-error border-error/20'
    };
    return styles?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
        <button className="text-accent hover:text-accent/80 text-sm font-medium">
          View All Orders
        </button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => {
          const statusInfo = getStatusIcon(order?.status);
          return (
            <div key={order?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusInfo?.color} bg-current/10`}>
                    <Icon name={statusInfo?.icon} size={20} className={statusInfo?.color} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Order #{order?.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order?.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${order?.total}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                {order?.items?.slice(0, 3)?.map((item, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {index === 2 && order?.items?.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          +{order?.items?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {order?.items?.[0]?.name}
                    {order?.items?.length > 1 && ` +${order?.items?.length - 1} more`}
                  </p>
                  <p className="text-xs text-muted-foreground">{order?.items?.length} items</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {order?.trackingNumber && (
                    <span>Tracking: {order?.trackingNumber}</span>
                  )}
                  {order?.estimatedDelivery && (
                    <span>ETA: {order?.estimatedDelivery}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {order?.status === 'delivered' && (
                    <button className="text-accent hover:text-accent/80 text-sm font-medium">
                      Reorder
                    </button>
                  )}
                  <button className="text-muted-foreground hover:text-foreground">
                    <Icon name="ExternalLink" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrders;