import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CollectionOverview from './components/CollectionOverview';
import SetTracker from './components/SetTracker';
import RecentOrders from './components/RecentOrders';
import WishlistPreview from './components/WishlistPreview';
import PriceAlerts from './components/PriceAlerts';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import NavigationTabs from './components/NavigationTabs';
import AccountSettings from './components/AccountSettings';
import Icon from '../../components/AppIcon';

const UserAccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for collection overview
  const collectionData = {
    totalValue: 15420,
    valueChange: 12.5,
    totalCards: 1247,
    recentAdditions: 23,
    completionRate: 78,
    activeSets: 5,
    rareCards: 89,
    holoCards: 156
  };

  // Mock data for set tracking
  const setsData = [
    {
      id: 1,
      name: "Scarlet & Violet Base Set",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      completion: 85,
      owned: 170,
      total: 200,
      missing: 30,
      estimatedCost: 245,
      hasRares: true
    },
    {
      id: 2,
      name: "Paldea Evolved",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      completion: 62,
      owned: 124,
      total: 200,
      missing: 76,
      estimatedCost: 380,
      hasRares: true
    },
    {
      id: 3,
      name: "Obsidian Flames",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
      completion: 45,
      owned: 90,
      total: 200,
      missing: 110,
      estimatedCost: 520,
      hasRares: false
    }
  ];

  // Mock data for recent orders
  const ordersData = [
    {
      id: 1,
      orderNumber: "PW-2024-0892",
      date: "Aug 28, 2024",
      total: 156.50,
      status: "delivered",
      trackingNumber: "SG1234567890",
      estimatedDelivery: null,
      items: [
        {
          name: "Charizard ex (Special Art Rare)",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
        },
        {
          name: "Pikachu VMAX",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 2,
      orderNumber: "PW-2024-0891",
      date: "Aug 26, 2024",
      total: 89.99,
      status: "shipped",
      trackingNumber: "SG0987654321",
      estimatedDelivery: "Sep 2, 2024",
      items: [
        {
          name: "Booster Box - Paldea Evolved",
          image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 3,
      orderNumber: "PW-2024-0890",
      date: "Aug 24, 2024",
      total: 234.75,
      status: "processing",
      trackingNumber: null,
      estimatedDelivery: "Sep 5, 2024",
      items: [
        {
          name: "Rayquaza VMAX Alt Art",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
        },
        {
          name: "Umbreon VMAX",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
        },
        {
          name: "Sylveon VMAX",
          image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop"
        }
      ]
    }
  ];

  // Mock data for wishlist
  const wishlistData = [
    {
      id: 1,
      name: "Lugia VSTAR Alt Art",
      set: "Silver Tempest",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      currentPrice: 89.99,
      originalPrice: 120.00,
      priceDropped: true,
      inStock: true
    },
    {
      id: 2,
      name: "Giratina VSTAR",
      set: "Lost Origin",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      currentPrice: 45.50,
      originalPrice: 45.50,
      priceDropped: false,
      inStock: false
    },
    {
      id: 3,
      name: "Mewtwo VSTAR",
      set: "Pokemon GO",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
      currentPrice: 67.99,
      originalPrice: 67.99,
      priceDropped: false,
      inStock: true
    },
    {
      id: 4,
      name: "Arceus VSTAR",
      set: "Brilliant Stars",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      currentPrice: 34.99,
      originalPrice: 42.00,
      priceDropped: true,
      inStock: true
    }
  ];

  // Mock data for price alerts
  const alertsData = [
    {
      id: 1,
      type: "price_drop",
      cardName: "Charizard ex Special Art",
      message: "Price dropped by 15% - now at your target price!",
      timeAgo: "2 hours ago",
      oldPrice: 180.00,
      newPrice: 153.00,
      actionable: true
    },
    {
      id: 2,
      type: "back_in_stock",
      cardName: "Pikachu VMAX Rainbow Rare",
      message: "Back in stock after 2 weeks!",
      timeAgo: "5 hours ago",
      price: 89.99,
      actionable: true
    },
    {
      id: 3,
      type: "price_increase",
      cardName: "Base Set Shadowless Charizard PSA 9",
      message: "Price increased due to high demand",
      timeAgo: "1 day ago",
      oldPrice: 2400.00,
      newPrice: 2650.00,
      actionable: false
    },
    {
      id: 4,
      type: "new_listing",
      cardName: "Trophy Pikachu No. 3 Trainer",
      message: "New listing found matching your criteria",
      timeAgo: "2 days ago",
      price: 1200.00,
      actionable: true
    }
  ];

  // Mock data for activity feed
  const activitiesData = [
    {
      id: 1,
      type: "purchase",
      title: "Purchase Completed",
      description: "Your order for Charizard ex Special Art has been delivered",
      timeAgo: "3 hours ago",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      imageAlt: "Charizard card",
      value: 156.50,
      actionable: true,
      actionText: "Leave Review"
    },
    {
      id: 2,
      type: "price_change",
      title: "Price Alert Triggered",
      description: "Lugia VSTAR Alt Art dropped to your target price",
      timeAgo: "6 hours ago",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      imageAlt: "Lugia card",
      value: 89.99,
      change: -12.5,
      actionable: true,
      actionText: "Buy Now"
    },
    {
      id: 3,
      type: "new_arrival",
      title: "New Cards Added",
      description: "23 new cards added to Scarlet & Violet series",
      timeAgo: "1 day ago",
      actionable: true,
      actionText: "Browse New Arrivals"
    },
    {
      id: 4,
      type: "achievement",
      title: "Collection Milestone",
      description: "You\'ve reached 85% completion on Scarlet & Violet Base Set!",
      timeAgo: "2 days ago",
      actionable: true,
      actionText: "View Progress"
    },
    {
      id: 5,
      type: "community",
      title: "Community Highlight",
      description: "Your Rayquaza collection was featured in this week\'s collector spotlight",
      timeAgo: "3 days ago",
      actionable: true,
      actionText: "View Feature"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <CollectionOverview collectionData={collectionData} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-8">
                <SetTracker sets={setsData} />
                <QuickActions />
              </div>
              
              <div className="space-y-8">
                <RecentOrders orders={ordersData?.slice(0, 3)} />
                <WishlistPreview wishlistItems={wishlistData} />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <PriceAlerts alerts={alertsData?.slice(0, 3)} />
              <ActivityFeed activities={activitiesData?.slice(0, 5)} />
            </div>
          </div>
        );
      
      case 'collection':
        return (
          <div className="space-y-8">
            <CollectionOverview collectionData={collectionData} />
            <SetTracker sets={setsData} />
          </div>
        );
      
      case 'orders':
        return (
          <div className="space-y-8">
            <RecentOrders orders={ordersData} />
          </div>
        );
      
      case 'wishlist':
        return (
          <div className="space-y-8">
            <WishlistPreview wishlistItems={wishlistData} />
          </div>
        );
      
      case 'alerts':
        return (
          <div className="space-y-8">
            <PriceAlerts alerts={alertsData} />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-8">
            <AccountSettings />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Collector Command Center
                </h1>
                <p className="text-muted-foreground">
                  Manage your collection, track orders, and discover new cards
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Welcome back,</p>
                  <p className="font-semibold text-foreground">Alex Chen</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default UserAccountDashboard;