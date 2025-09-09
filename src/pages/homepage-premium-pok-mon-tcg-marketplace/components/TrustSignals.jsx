import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const trustSignals = [
    {
      id: 1,
      icon: "Shield",
      title: "Authentication Guarantee",
      description: "Every card authenticated by PSA-certified experts",
      stat: "100K+",
      statLabel: "Cards Verified",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      id: 2,
      icon: "Truck",
      title: "Secure Shipping",
      description: "Fully insured shipping with tracking on all orders",
      stat: "99.9%",
      statLabel: "Delivery Success",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      icon: "Star",
      title: "Trusted by Collectors",
      description: "Join thousands of satisfied Pokémon card collectors",
      stat: "50K+",
      statLabel: "Happy Collectors",
      color: "from-amber-400 to-amber-600"
    },
    {
      id: 4,
      icon: "Award",
      title: "Money-Back Guarantee",
      description: "30-day returns for any reason, hassle-free",
      stat: "100%",
      statLabel: "Satisfaction Rate",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const partners = [
    {
      id: 1,
      name: "PSA",
      logo: "https://example.com/psa-logo.png",
      alt: "PSA Authentication"
    },
    // ...other partners
  ];

  return (
    <div className="mb-16">
      {/* Trust Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {trustSignals.map((signal) => (
          <div
            key={signal.id}
            className="group card-premium relative overflow-hidden"
          >
            <div className="p-6 relative z-10">
              {/* Icon */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${signal.color} flex items-center justify-center shadow-collector transform group-hover:scale-110 transition-transform duration-500`}>
                  <Icon name={signal.icon} size={24} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                {signal.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {signal.description}
              </p>

              {/* Stats */}
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-accent">
                  {signal.stat}
                </span>
                <span className="text-sm text-muted-foreground">
                  {signal.statLabel}
                </span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-[-4rem] group-hover:translate-x-20 transition-transform duration-700"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-full group-hover:translate-x-[-300%] transition-transform duration-[1.5s] ease-premium"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Partners Section */}
      <div className="rounded-2xl bg-muted/50 p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium opacity-5"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Trusted Partners
            </h3>
            <p className="text-muted-foreground">
              Working with industry leaders to ensure authenticity
            </p>
          </div>

          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 rounded-xl"></div>
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-12 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Authentication Process */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
          <Icon name="Shield" size={16} />
          <span>Every card authenticated by experts</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;