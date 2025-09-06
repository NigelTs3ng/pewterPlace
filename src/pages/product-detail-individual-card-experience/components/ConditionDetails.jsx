import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConditionDetails = ({ cardData }) => {
  const [activeComparison, setActiveComparison] = useState(null);

  const conditionGrades = {
    'Mint': {
      score: 10,
      description: 'Perfect condition with no visible flaws',
      details: [
        'No edge wear or whitening',
        'Perfect corners and centering',
        'No surface scratches or print lines',
        'Original gloss intact'
      ],
      color: 'emerald'
    },
    'Near Mint': {
      score: 8.5,
      description: 'Excellent condition with minimal wear',
      details: [
        'Very slight edge wear possible',
        'Minor centering issues acceptable',
        'No major surface damage',
        'Slight gloss reduction possible'
      ],
      color: 'blue'
    },
    'Lightly Played': {
      score: 7,
      description: 'Good condition with light play wear',
      details: [
        'Light edge wear and whitening',
        'Minor corner wear',
        'Light surface scratches',
        'Some gloss reduction'
      ],
      color: 'amber'
    },
    'Moderately Played': {
      score: 5,
      description: 'Moderate wear from play',
      details: [
        'Moderate edge wear and whitening',
        'Corner wear visible',
        'Surface scratches present',
        'Noticeable gloss reduction'
      ],
      color: 'orange'
    },
    'Heavily Played': {
      score: 3,
      description: 'Significant wear but still playable',
      details: [
        'Heavy edge wear and whitening',
        'Corner damage present',
        'Multiple surface scratches',
        'Significant gloss loss'
      ],
      color: 'red'
    }
  };

  const currentCondition = conditionGrades?.[cardData?.condition];
  const comparisonImages = [
    { condition: 'Mint', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop' },
    { condition: 'Near Mint', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop' },
    { condition: 'Lightly Played', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop' }
  ];

  return (
    <div className="space-y-6">
      {/* Current Condition */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Condition Assessment</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${currentCondition?.color}-100 text-${currentCondition?.color}-600`}>
            {cardData?.condition} ({currentCondition?.score}/10)
          </div>
        </div>

        <p className="text-muted-foreground mb-4">{currentCondition?.description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Condition Details:</h4>
            <ul className="space-y-2">
              {currentCondition?.details?.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className={`text-${currentCondition?.color}-500 mt-0.5 flex-shrink-0`} />
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Grading Breakdown:</h4>
            <div className="space-y-3">
              {[
                { aspect: 'Centering', score: cardData?.grading?.centering || 9 },
                { aspect: 'Corners', score: cardData?.grading?.corners || 8.5 },
                { aspect: 'Edges', score: cardData?.grading?.edges || 8 },
                { aspect: 'Surface', score: cardData?.grading?.surface || 9 }
              ]?.map((grade) => (
                <div key={grade?.aspect} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{grade?.aspect}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${currentCondition?.color}-500 rounded-full`}
                        style={{ width: `${(grade?.score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{grade?.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Condition Comparison */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Condition Comparison</h3>
        <p className="text-muted-foreground mb-4">
          Compare different condition grades to understand the differences
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {comparisonImages?.map((comparison, index) => (
            <div
              key={comparison?.condition}
              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                activeComparison === comparison?.condition
                  ? 'border-accent shadow-lg'
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setActiveComparison(
                activeComparison === comparison?.condition ? null : comparison?.condition
              )}
            >
              <Image
                src={comparison?.image}
                alt={`${comparison?.condition} condition example`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                <div className="text-sm font-medium">{comparison?.condition}</div>
                <div className="text-xs opacity-80">
                  {conditionGrades?.[comparison?.condition]?.score}/10
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeComparison && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-2">{activeComparison} Condition</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {conditionGrades?.[activeComparison]?.description}
            </p>
            <ul className="space-y-1">
              {conditionGrades?.[activeComparison]?.details?.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Dot" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Authentication Process */}
      {cardData?.isAuthenticated && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Shield" size={24} className="text-success" />
            <h3 className="text-xl font-bold text-foreground">Authentication Process</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Our Verification Steps:</h4>
              <ol className="space-y-2">
                {[
                  'Visual inspection under magnification',
                  'UV light authentication check',
                  'Print quality and texture analysis',
                  'Holographic element verification',
                  'Database cross-reference',
                  'Expert final approval'
                ]?.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Authentication Details:</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Verified Date:</span>
                  <span className="text-sm font-medium">Aug 28, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Authenticator:</span>
                  <span className="text-sm font-medium">Expert #PW-2847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Certificate ID:</span>
                  <span className="text-sm font-medium">PWP-{cardData?.id}-2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <span className="text-sm font-medium text-success">99.8% Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionDetails;