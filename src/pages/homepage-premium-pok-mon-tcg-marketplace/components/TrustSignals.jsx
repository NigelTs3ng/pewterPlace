import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: "Shield",
      title: "100% Authentic Guarantee",
      description: "Every card verified by our expert authentication team",
      stats: "1M+ cards authenticated",
      color: "text-success"
    },
    {
      id: 2,
      icon: "Truck",
      title: "Same-Day Shipping",
      description: "Orders placed before 2 PM ship the same day",
      stats: "99.8% on-time delivery",
      color: "text-accent"
    },
    {
      id: 3,
      icon: "RotateCcw",
      title: "30-Day Returns",
      description: "Not satisfied? Return within 30 days for full refund",
      stats: "Hassle-free process",
      color: "text-warning"
    },
    {
      id: 4,
      icon: "Star",
      title: "5-Star Service",
      description: "Rated excellent by thousands of collectors",
      stats: "4.9/5 customer rating",
      color: "text-amber-500"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "PSA Authorized Dealer",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop",
      description: "Official PSA grading partner"
    },
    {
      id: 2,
      name: "BGS Certified",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop",
      description: "Beckett authentication certified"
    },
    {
      id: 3,
      name: "CGC Verified",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop",
      description: "CGC grading verification"
    },
    {
      id: 4,
      name: "SSL Secured",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop",
      description: "256-bit encryption security"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment: "Best TCG marketplace I\'ve used. Cards arrived exactly as described and shipping was lightning fast.",
      purchase: "Charizard ex PSA 10",
      verified: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment: "Authentication process is thorough and transparent. I trust PewterPlace with my high-value purchases.",
      purchase: "Base Set Booster Box",
      verified: true
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment: "Customer service is exceptional. They helped me complete my entire Pokémon 151 set.",
      purchase: "Pokémon 151 Singles",
      verified: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-amber-400 fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Trusted by Collectors Worldwide
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied collectors who trust PewterPlace for authentic cards and exceptional service
        </p>
      </div>
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {trustFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-card-shadow-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center ${feature?.color}`}>
              <Icon name={feature?.icon} size={28} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{feature?.description}</p>
            <div className="inline-flex items-center space-x-1 bg-muted px-3 py-1 rounded-full">
              <Icon name="Check" size={12} className="text-success" />
              <span className="text-xs font-medium text-foreground">{feature?.stats}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="bg-muted/30 rounded-xl p-8 mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Official Partnerships</h3>
          <p className="text-muted-foreground">Certified by industry-leading authentication services</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-sm transition-shadow duration-200"
            >
              <Image
                src={cert?.logo}
                alt={cert?.name}
                className="w-16 h-8 mx-auto mb-3 object-contain"
              />
              <h4 className="font-semibold text-foreground text-sm mb-1">{cert?.name}</h4>
              <p className="text-xs text-muted-foreground">{cert?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials?.map((testimonial) => (
          <div
            key={testimonial?.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-card-shadow-hover transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                  {testimonial?.verified && (
                    <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-0.5 rounded-full">
                      <Icon name="Check" size={10} />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial?.rating)}
                </div>
              </div>
            </div>
            
            <blockquote className="text-muted-foreground text-sm leading-relaxed mb-4">
              "{testimonial?.comment}"
            </blockquote>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="ShoppingBag" size={12} />
              <span>Purchased: {testimonial?.purchase}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badge */}
      <div className="text-center mt-12 pt-8 border-t border-border">
        <div className="inline-flex items-center space-x-4 bg-card border border-border rounded-lg px-6 py-4">
          <Icon name="Lock" size={24} className="text-success" />
          <div className="text-left">
            <p className="font-semibold text-foreground">Secure & Protected</p>
            <p className="text-sm text-muted-foreground">256-bit SSL encryption • PCI DSS compliant</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;