import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CollectorSpotlight = () => {
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  const spotlights = [
    {
      id: 1,
      type: "collector",
      title: "Master Collector Showcase",
      subtitle: "Featured Collection: Complete Base Set PSA 10",
      collector: {
        name: "Michael Chen",
        username: "@PokeMasterMike",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        badge: "Diamond Collector",
        yearsCollecting: 15,
        totalCards: 12847,
        totalValue: "$89,450"
      },
      description: `After 15 years of dedicated collecting, Michael has achieved what many consider impossible - a complete Base Set in PSA 10 condition. His journey from childhood nostalgia to serious investment has resulted in one of the most pristine vintage collections we've ever featured.`,
      highlights: [
        "Complete Base Set PSA 10 (102/102)",
        "Shadowless Charizard PSA 10",
        "First Edition Machamp PSA 10",
        "Error cards collection"
      ],
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop",
      stats: {
        completionRate: 98,
        avgGrade: 9.2,
        rareCards: 234
      }
    },
    {
      id: 2,
      type: "expert",
      title: "Market Expert Insights",
      subtitle: "Q4 2024 Investment Trends & Predictions",
      expert: {
        name: "Sarah Rodriguez",
        title: "TCG Market Analyst",
        company: "CardMarket Pro",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
        experience: "8 years",
        specialization: "Vintage & Modern Investment"
      },
      description: `With the recent surge in Pokémon 151 and Paldea Evolved, we're seeing unprecedented demand for both vintage and modern cards. Sarah breaks down the key trends shaping the market and shares her predictions for the upcoming quarter.`,
      insights: [
        "Vintage cards showing 23% YoY growth",
        "Japanese exclusives gaining momentum",
        "Graded modern cards outperforming raw",
        "Set completion driving singles demand"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      predictions: {
        vintageGrowth: "+15%",
        modernStability: "Stable",
        gradedPremium: "+8%"
      }
    },
    {
      id: 3,
      type: "achievement",
      title: "Community Achievement",
      subtitle: "PewterPlace Milestone: 1 Million Cards Authenticated",
      achievement: {
        milestone: "1,000,000",
        metric: "Cards Authenticated",
        timeframe: "Since Launch",
        impact: "Zero Counterfeit Reports"
      },
      description: `We've reached an incredible milestone - over 1 million cards authenticated through our rigorous verification process. This achievement represents our unwavering commitment to authenticity and the trust our community places in PewterPlace.`,
      highlights: [
        "100% Authentication Success Rate",
        "Partnership with PSA, BGS, CGC",
        "Advanced AI Detection Technology",
        "Expert Human Verification"
      ],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      stats: {
        avgProcessingTime: "24 hours",
        satisfactionRate: 99.8,
        returnRate: 0.2
      }
    }
  ];

  const currentSpotlight = spotlights?.[activeSpotlight];

  const nextSpotlight = () => {
    setActiveSpotlight((prev) => (prev + 1) % spotlights?.length);
  };

  const prevSpotlight = () => {
    setActiveSpotlight((prev) => (prev - 1 + spotlights?.length) % spotlights?.length);
  };

  const renderCollectorSpotlight = (spotlight) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src={spotlight?.collector?.avatar}
            alt={spotlight?.collector?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-accent"
          />
          <div>
            <h3 className="text-xl font-bold text-foreground">{spotlight?.collector?.name}</h3>
            <p className="text-accent font-medium">{spotlight?.collector?.username}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Award" size={14} className="text-amber-500" />
              <span className="text-sm text-muted-foreground">{spotlight?.collector?.badge}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{spotlight?.description}</p>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{spotlight?.collector?.yearsCollecting}</p>
            <p className="text-xs text-muted-foreground">Years</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{spotlight?.collector?.totalCards?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Cards</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-accent">{spotlight?.collector?.totalValue}</p>
            <p className="text-xs text-muted-foreground">Value</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Collection Highlights:</h4>
          <ul className="space-y-1">
            {spotlight?.highlights?.map((highlight, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Check" size={14} className="text-success" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative">
        <Image
          src={spotlight?.image}
          alt="Collection showcase"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.completionRate}%</p>
              <p className="text-white/80 text-xs">Complete</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.avgGrade}</p>
              <p className="text-white/80 text-xs">Avg Grade</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.rareCards}</p>
              <p className="text-white/80 text-xs">Rare Cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpertSpotlight = (spotlight) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src={spotlight?.expert?.avatar}
            alt={spotlight?.expert?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-accent"
          />
          <div>
            <h3 className="text-xl font-bold text-foreground">{spotlight?.expert?.name}</h3>
            <p className="text-accent font-medium">{spotlight?.expert?.title}</p>
            <p className="text-sm text-muted-foreground">{spotlight?.expert?.company}</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{spotlight?.description}</p>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Key Market Insights:</h4>
          <ul className="space-y-1">
            {spotlight?.insights?.map((insight, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="TrendingUp" size={14} className="text-success" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xl font-bold text-success">{spotlight?.predictions?.vintageGrowth}</p>
            <p className="text-xs text-muted-foreground">Vintage</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xl font-bold text-foreground">{spotlight?.predictions?.modernStability}</p>
            <p className="text-xs text-muted-foreground">Modern</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-xl font-bold text-accent">{spotlight?.predictions?.gradedPremium}</p>
            <p className="text-xs text-muted-foreground">Graded</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          src={spotlight?.image}
          alt="Market analysis"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-bold text-lg">{spotlight?.expert?.experience}</p>
            <p className="text-white/80 text-sm">Market Experience</p>
            <p className="text-white/60 text-xs mt-1">{spotlight?.expert?.specialization}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementSpotlight = (spotlight) => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
          <Icon name="Trophy" size={20} />
          <span className="font-semibold">Milestone Achievement</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-6xl md:text-8xl font-bold text-foreground">
            {spotlight?.achievement?.milestone}
          </h3>
          <p className="text-xl text-accent font-semibold">{spotlight?.achievement?.metric}</p>
          <p className="text-muted-foreground">{spotlight?.achievement?.timeframe}</p>
        </div>
      </div>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {spotlight?.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {spotlight?.highlights?.map((highlight, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <Icon name="Shield" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">{highlight}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Image
          src={spotlight?.image}
          alt="Achievement milestone"
          className="w-full h-64 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.avgProcessingTime}</p>
              <p className="text-white/80 text-xs">Avg Processing</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.satisfactionRate}%</p>
              <p className="text-white/80 text-xs">Satisfaction</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-white font-bold">{spotlight?.stats?.returnRate}%</p>
              <p className="text-white/80 text-xs">Return Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      <div className="bg-card border border-border rounded-xl p-8 md:p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full translate-x-12 translate-y-12"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {currentSpotlight?.title}
              </h2>
              <p className="text-lg text-muted-foreground">{currentSpotlight?.subtitle}</p>
            </div>

            <div className="flex items-center justify-center md:justify-end space-x-2 mt-4 md:mt-0">
              <button
                onClick={prevSpotlight}
                className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <div className="flex space-x-1">
                {spotlights?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSpotlight ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSpotlight}
                className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="transition-all duration-500">
            {currentSpotlight?.type === 'collector' && renderCollectorSpotlight(currentSpotlight)}
            {currentSpotlight?.type === 'expert' && renderExpertSpotlight(currentSpotlight)}
            {currentSpotlight?.type === 'achievement' && renderAchievementSpotlight(currentSpotlight)}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <Link to="/user-account-dashboard-collector-command-center">
              <button className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <Icon name="Users" size={18} />
                <span>Join Our Community</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorSpotlight;