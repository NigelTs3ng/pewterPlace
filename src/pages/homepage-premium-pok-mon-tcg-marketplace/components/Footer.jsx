import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: 'Singles', href: '/singles' },
      { label: 'Sealed Products', href: '/sealed' },
      { label: 'Graded Cards', href: '/graded' },
      { label: 'Japanese Cards', href: '/japanese' },
      { label: 'Accessories', href: '/accessories' }
    ],
    collect: [
      { label: 'Set Lists', href: '/sets' },
      { label: 'Collection Manager', href: '/collection' },
      { label: 'Price Guide', href: '/prices' },
      { label: 'Authentication', href: '/authentication' },
      { label: 'Grading Service', href: '/grading' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/track' }
    ]
  };

  const socialLinks = [
    { icon: 'Twitter', href: 'https://twitter.com/pewterplace' },
    { icon: 'Instagram', href: 'https://instagram.com/pewterplace' },
    { icon: 'Youtube', href: 'https://youtube.com/pewterplace' },
    { icon: 'Facebook', href: 'https://facebook.com/pewterplace' },
    { icon: 'Discord', href: 'https://discord.gg/pewterplace' }
  ];

  return (
    <footer className="bg-gradient-premium text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <Link to="/" className="block">
                <Image
                  src="/logo-white.png"
                  alt="PewterPlace"
                  className="h-8 w-auto"
                />
              </Link>
              
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                Your trusted destination for authentic Pokémon cards. We connect collectors with verified sellers and rare finds, ensuring every transaction is secure and every card is genuine.
              </p>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
                <p className="text-white/60 text-xs">
                  Get weekly updates on new releases and market trends
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:col-span-4 gap-8">
            <div>
              <h4 className="text-lg font-display font-bold mb-4">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-4">Collect</h4>
              <ul className="space-y-3">
                {footerLinks.collect.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-white/60">
              © 2025 PewterPlace. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon name={social.icon} size={20} className="text-white" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-white/80">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-xs text-white/80">Verified Seller</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary opacity-10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;