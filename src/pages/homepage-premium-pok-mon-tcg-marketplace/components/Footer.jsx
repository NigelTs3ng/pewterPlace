import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "New Releases", path: "/product-catalog-advanced-tcg-discovery" },
        { name: "Singles", path: "/product-catalog-advanced-tcg-discovery" },
        { name: "Sealed Products", path: "/product-catalog-advanced-tcg-discovery" },
        { name: "Graded Cards", path: "/product-catalog-advanced-tcg-discovery" },
        { name: "Japanese Cards", path: "/product-catalog-advanced-tcg-discovery" },
        { name: "Vintage Collection", path: "/product-catalog-advanced-tcg-discovery" }
      ]
    },
    {
      title: "Account",
      links: [
        { name: "My Dashboard", path: "/user-account-dashboard-collector-command-center" },
        { name: "Order History", path: "/user-account-dashboard-collector-command-center" },
        { name: "Wishlist", path: "/user-account-dashboard-collector-command-center" },
        { name: "Collection Tracker", path: "/user-account-dashboard-collector-command-center" },
        { name: "Rewards Program", path: "/user-account-dashboard-collector-command-center" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "#" },
        { name: "Authentication Guide", path: "#" },
        { name: "Shipping Info", path: "#" },
        { name: "Returns & Refunds", path: "#" },
        { name: "Contact Us", path: "#" },
        { name: "Live Chat", path: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About PewterPlace", path: "#" },
        { name: "Our Story", path: "#" },
        { name: "Careers", path: "#" },
        { name: "Press Kit", path: "#" },
        { name: "Partnerships", path: "#" },
        { name: "Affiliate Program", path: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" },
    { name: "Discord", icon: "MessageSquare", url: "#" },
    { name: "TikTok", icon: "Video", url: "#" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
              <p className="text-primary-foreground/80 text-lg">
                Get exclusive access to new releases, rare finds, and collector insights delivered to your inbox.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Icon name="Mail" size={18} />
                  <span>Subscribe</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/70">
                <Icon name="Check" size={14} className="text-success" />
                <span>Exclusive deals and early access to new products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/homepage-premium-pok-mon-tcg-marketplace" className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-slow"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">PewterPlace</span>
                <span className="text-xs text-primary-foreground/70 font-mono -mt-1">TCG Sanctuary</span>
              </div>
            </Link>
            
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              The premier destination for authentic Pokémon Trading Cards. Built by collectors, for collectors.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="MapPin" size={14} className="text-accent" />
                <span className="text-primary-foreground/80">Singapore • Worldwide Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} className="text-accent" />
                <span className="text-primary-foreground/80">+65 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} className="text-accent" />
                <span className="text-primary-foreground/80">hello@pewterplace.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4">{section?.title}</h4>
              <ul className="space-y-2">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <Link
                      to={link?.path}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-200 flex items-center space-x-1 group"
                    >
                      <span>{link?.name}</span>
                      <Icon name="ArrowRight" size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Social Links */}
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex items-center space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-center">
              <h5 className="font-semibold mb-4">Secure Payments</h5>
              <div className="flex items-center justify-center space-x-3">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.name}
                    className="w-12 h-8 bg-primary-foreground/10 rounded flex items-center justify-center"
                    title={method?.name}
                  >
                    <Icon name={method?.icon} size={16} className="text-primary-foreground/70" />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-center lg:text-right">
              <h5 className="font-semibold mb-4">Trusted & Secure</h5>
              <div className="flex items-center justify-center lg:justify-end space-x-4">
                <div className="flex items-center space-x-2 bg-success/20 text-success px-3 py-1 rounded-full">
                  <Icon name="Shield" size={14} />
                  <span className="text-xs font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 bg-accent/20 text-accent px-3 py-1 rounded-full">
                  <Icon name="Award" size={14} />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-primary-foreground/70">
                <p>&copy; {currentYear} PewterPlace. All rights reserved.</p>
              </div>
              
              <div className="flex flex-wrap items-center space-x-6 text-sm text-primary-foreground/70">
                <Link to="#" className="hover:text-primary-foreground transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-primary-foreground transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-primary-foreground transition-colors duration-200">
                  Cookie Policy
                </Link>
                <Link to="#" className="hover:text-primary-foreground transition-colors duration-200">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;