import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'purchase':
        return { icon: 'ShoppingBag', color: 'text-success' };
      case 'price_change':
        return { icon: 'TrendingUp', color: 'text-warning' };
      case 'new_arrival':
        return { icon: 'Package', color: 'text-accent' };
      case 'community':
        return { icon: 'Users', color: 'text-primary' };
      case 'achievement':
        return { icon: 'Award', color: 'text-warning' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-accent hover:text-accent/80 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => {
          const activityInfo = getActivityIcon(activity?.type);
          return (
            <div key={activity?.id} className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activityInfo?.color} bg-current/10 flex-shrink-0`}>
                <Icon name={activityInfo?.icon} size={16} className={activityInfo?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {activity?.timeAgo}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>

                {activity?.image && (
                  <div className="flex items-center space-x-3 mb-2">
                    <Image
                      src={activity?.image}
                      alt={activity?.imageAlt || "Activity image"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {activity?.value && (
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">
                          ${activity?.value}
                        </span>
                        {activity?.change && (
                          <span className={`ml-2 ${activity?.change > 0 ? 'text-success' : 'text-error'}`}>
                            {activity?.change > 0 ? '+' : ''}{activity?.change}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activity?.actionable && (
                  <button className="text-xs text-accent hover:text-accent/80 font-medium">
                    {activity?.actionText}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No recent activity</p>
          <p className="text-sm text-muted-foreground">Your activity will appear here as you use the platform!</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;