import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$124,580",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      period: "This month"
    },
    {
      id: 2,
      title: "Active Orders",
      value: "1,247",
      change: "+8.2%",
      changeType: "positive",
      icon: "ShoppingCart",
      period: "Today"
    },
    {
      id: 3,
      title: "Inventory Items",
      value: "15,892",
      change: "-2.1%",
      changeType: "negative",
      icon: "Package",
      period: "In stock"
    },
    {
      id: 4,
      title: "Customer Satisfaction",
      value: "98.7%",
      change: "+0.3%",
      changeType: "positive",
      icon: "Star",
      period: "Last 30 days"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg p-6 border border-border card-shadow hover:card-shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              stat?.changeType === 'positive' ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={stat?.icon} 
                size={24} 
                color={stat?.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)'} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground font-medium">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;