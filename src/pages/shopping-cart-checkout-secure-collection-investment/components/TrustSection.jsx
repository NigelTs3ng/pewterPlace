import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Authentication Guarantee',
      description: 'Every card is verified by our expert team using industry-standard authentication methods.'
    },
    {
      icon: 'RotateCcw',
      title: '30-Day Return Policy',
      description: 'Not satisfied? Return any item within 30 days for a full refund, no questions asked.'
    },
    {
      icon: 'Lock',
      title: 'Secure Transactions',
      description: 'Your payment information is encrypted and protected with bank-level security.'
    },
    {
      icon: 'Award',
      title: 'Condition Guarantee',
      description: 'Cards not as described? We\'ll make it right with a replacement or full refund.'
    }
  ];

  const certifications = [
    {
      name: 'PSA Authorized',
      icon: 'Award',
      description: 'Official PSA grading partner'
    },
    {
      name: 'BGS Certified',
      icon: 'Star',
      description: 'Beckett authentication verified'
    },
    {
      name: 'SSL Secured',
      icon: 'Lock',
      description: '256-bit encryption'
    },
    {
      name: 'PCI Compliant',
      icon: 'CreditCard',
      description: 'Payment card industry certified'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Why Trust PewterPlace?</h2>
      {/* Trust Features */}
      <div className="space-y-4 mb-8">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">{feature?.title}</h3>
              <p className="text-sm text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Certifications & Partners</h3>
        <div className="grid grid-cols-2 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <Icon name={cert?.icon} size={16} className="text-accent" />
              <div>
                <p className="text-xs font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Support */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Headphones" size={20} className="text-accent" />
          <h3 className="font-medium text-foreground">24/7 Customer Support</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Our collector-expert support team is available around the clock to help with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Mail" size={14} />
            <span>support@pewterplace.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Phone" size={14} />
            <span>1-800-TCG-HELP</span>
          </div>
        </div>
      </div>
      {/* Money Back Guarantee */}
      <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-blue-500/10 border border-success/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <h3 className="font-semibold text-success">100% Money Back Guarantee</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          If you're not completely satisfied with your purchase, we'll refund your money. 
          That's our promise to the collecting community.
        </p>
      </div>
    </div>
  );
};

export default TrustSection;