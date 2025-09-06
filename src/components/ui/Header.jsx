import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { 
      name: 'Discover', 
      path: '/product-catalog-advanced-tcg-discovery',
      icon: 'Search'
    },
    { 
      name: 'Collections', 
      path: '/homepage-premium-pok-mon-tcg-marketplace',
      icon: 'Grid3X3'
    },
    { 
      name: 'Account', 
      path: '/user-account-dashboard-collector-command-center',
      icon: 'User'
    },
    { 
      name: 'Cart', 
      path: '/shopping-cart-checkout-secure-collection-investment',
      icon: 'ShoppingCart'
    }
  ];

  const secondaryNavItems = [
    { 
      name: 'Admin', 
      path: '/admin-dashboard-operations-command-center',
      icon: 'Settings'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-premium border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage-premium-pok-mon-tcg-marketplace" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-slow"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary tracking-tight">PewterPlace</span>
              <span className="text-xs text-muted-foreground font-mono -mt-1">TCG Sanctuary</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-muted ${
                  isActivePath(item?.path)
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMoreMenu}
                className="flex items-center space-x-2"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </Button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-premium z-50">
                  <div className="py-2">
                    {secondaryNavItems?.map((item) => (
                      <Link
                        key={item?.name}
                        to={item?.path}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                          isActivePath(item?.path)
                            ? 'text-accent font-medium' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Authentication & Search */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search cards..."
                className="w-64 pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="auth-badge">
                <Icon name="Shield" size={12} className="inline mr-1" />
                Authenticated
              </div>
              
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <input
                  type="search"
                  placeholder="Search cards..."
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>

              {/* Mobile Navigation */}
              {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              {/* Mobile Auth */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="auth-badge">
                    <Icon name="Shield" size={12} className="inline mr-1" />
                    Authenticated
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="User" size={16} className="mr-2" />
                    Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Overlay for more menu */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;