import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import RecentOrders from './components/RecentOrders';
import InventoryOverview from './components/InventoryOverview';
import SalesAnalytics from './components/SalesAnalytics';
import QuickActions from './components/QuickActions';
import SystemHealth from './components/SystemHealth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' },
    { id: 'system', label: 'System Health', icon: 'Activity' }
  ];

  const adminInfo = {
    name: "Sarah Chen",
    role: "System Administrator",
    email: "sarah.chen@pewterplace.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    lastLogin: "2025-08-31 14:30:00",
    permissions: ["full_access", "user_management", "system_config"]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentOrders />
              <div className="space-y-6">
                <QuickActions />
              </div>
            </div>
          </div>
        );
      case 'orders':
        return <RecentOrders />;
      case 'inventory':
        return <InventoryOverview />;
      case 'analytics':
        return <SalesAnalytics />;
      case 'actions':
        return <QuickActions />;
      case 'system':
        return <SystemHealth />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Operations Command Center | PewterPlace</title>
        <meta name="description" content="Comprehensive admin portal for PewterPlace TCG marketplace with inventory management, sales analytics, and system monitoring." />
        <meta name="keywords" content="admin dashboard, inventory management, sales analytics, TCG marketplace, operations center" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Admin Header */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="lg:hidden"
                >
                  <Icon name="Menu" size={20} />
                </Button>
                
                <div>
                  <h1 className="text-xl font-bold text-foreground">Operations Command Center</h1>
                  <p className="text-sm text-muted-foreground">Admin Dashboard</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">System Operational</span>
                  </div>
                  <div className="text-muted-foreground">•</div>
                  <span className="text-muted-foreground">
                    Last updated: {new Date()?.toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" iconName="Bell">
                    <span className="hidden sm:inline ml-2">Alerts</span>
                  </Button>
                  
                  <div className="flex items-center space-x-3 pl-3 border-l border-border">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-foreground">{adminInfo?.name}</p>
                      <p className="text-xs text-muted-foreground">{adminInfo?.role}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {adminInfo?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className={`lg:w-64 ${sidebarCollapsed ? 'hidden' : 'block'} lg:block`}>
              <div className="bg-card rounded-lg border border-border card-shadow p-6 sticky top-32">
                <div className="space-y-2">
                  {navigationTabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-accent text-accent-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Quick Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Orders</span>
                        <span className="font-medium text-foreground">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Low Stock Items</span>
                        <span className="font-medium text-warning">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pending Reviews</span>
                        <span className="font-medium text-accent">7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {navigationTabs?.find(tab => tab?.id === activeTab)?.label}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {activeTab === 'overview' && 'Complete overview of your TCG marketplace operations'}
                      {activeTab === 'orders' && 'Manage and track customer orders'}
                      {activeTab === 'inventory' && 'Monitor stock levels and product catalog'}
                      {activeTab === 'analytics' && 'Sales performance and business insights'}
                      {activeTab === 'actions' && 'Frequently used administrative functions'}
                      {activeTab === 'system' && 'System performance and health monitoring'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" iconName="Download">
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm" iconName="RefreshCw">
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
                    <Icon name="Zap" size={14} color="white" />
                  </div>
                  <span className="font-bold text-primary">PewterPlace</span>
                </div>
                <span className="text-muted-foreground">Admin Portal</span>
              </div>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
                <span>Version 2.1.0</span>
                <span>•</span>
                <span>Last Login: {new Date(adminInfo.lastLogin)?.toLocaleString()}</span>
                <span>•</span>
                <span>© {new Date()?.getFullYear()} PewterPlace. All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminDashboard;