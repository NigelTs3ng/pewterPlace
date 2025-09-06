import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedChart, setSelectedChart] = useState('revenue');

  const revenueData = [
    { name: 'Mon', revenue: 12400, orders: 45, customers: 32 },
    { name: 'Tue', revenue: 15600, orders: 52, customers: 41 },
    { name: 'Wed', revenue: 18900, orders: 67, customers: 55 },
    { name: 'Thu', revenue: 14200, orders: 48, customers: 38 },
    { name: 'Fri', revenue: 22100, orders: 78, customers: 62 },
    { name: 'Sat', revenue: 28500, orders: 95, customers: 78 },
    { name: 'Sun', revenue: 25800, orders: 89, customers: 71 }
  ];

  const topProductsData = [
    { name: 'Charizard ex', value: 35, color: '#3B82F6' },
    { name: 'Pikachu VMAX', value: 25, color: '#10B981' },
    { name: 'Lugia ex', value: 20, color: '#F59E0B' },
    { name: 'Rayquaza VMAX', value: 12, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#6B7280' }
  ];

  const customerData = [
    { name: 'New', value: 45, color: '#3B82F6' },
    { name: 'Returning', value: 55, color: '#10B981' }
  ];

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const chartTypes = [
    { value: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { value: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { value: 'customers', label: 'Customers', icon: 'Users' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span className="font-medium" style={{ color: entry?.color }}>
                {entry?.name}: 
              </span>
              {entry?.name === 'revenue' ? ` $${entry?.value?.toLocaleString()}` : ` ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (selectedChart === 'revenue') {
      return `$${(value / 1000)?.toFixed(0)}k`;
    }
    return value;
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sales Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">Track performance and revenue trends</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {periods?.map((period) => (
                <button
                  key={period?.value}
                  onClick={() => setSelectedPeriod(period?.value)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedPeriod === period?.value
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {period?.label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex items-center space-x-1 mb-6">
          {chartTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setSelectedChart(type?.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedChart === type?.value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              <span>{type?.label}</span>
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <div className="w-full h-80" aria-label={`${selectedChart} analytics chart`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={selectedChart} 
                fill="var(--color-accent)" 
                radius={[4, 4, 0, 0]}
                name={selectedChart?.charAt(0)?.toUpperCase() + selectedChart?.slice(1)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-card rounded-lg border border-border card-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-semibold text-foreground">Top Products</h4>
              <p className="text-sm text-muted-foreground">Best selling items this week</p>
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal">
            </Button>
          </div>

          <div className="w-full h-64" aria-label="Top products pie chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProductsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {topProductsData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Sales Share']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {topProductsData?.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: product?.color }}
                  ></div>
                  <span className="text-sm text-foreground">{product?.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{product?.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Analytics */}
        <div className="bg-card rounded-lg border border-border card-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-semibold text-foreground">Customer Insights</h4>
              <p className="text-sm text-muted-foreground">New vs returning customers</p>
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal">
            </Button>
          </div>

          <div className="w-full h-64" aria-label="Customer distribution chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Customer Share']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {customerData?.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: customer?.color }}
                  ></div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{customer?.name} Customers</span>
                    <p className="text-xs text-muted-foreground">
                      {customer?.name === 'New' ? 'First-time buyers' : 'Repeat customers'}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-foreground">{customer?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;