import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ cardData }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const reviews = [
    {
      id: 1,
      user: 'CollectorMike92',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2025-08-28',
      verified: true,
      conditionAccuracy: 5,
      shippingSpeed: 5,
      title: 'Perfect condition as described!',
      content: `Absolutely thrilled with this purchase! The card arrived exactly as described - the condition was spot on and the packaging was excellent. The authentication process gives me complete confidence in the purchase. Will definitely be buying more from PewterPlace.`,
      images: [
        'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=200&h=150&fit=crop',
        'https://images.pixabay.com/photo/2023/03/15/16/33/pokemon-7854718_1280.jpg?w=200&h=150&fit=crop'
      ],
      helpful: 24
    },
    {
      id: 2,
      user: 'TCGInvestor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2025-08-25',
      verified: true,
      conditionAccuracy: 5,
      shippingSpeed: 4,
      title: 'Great addition to my collection',
      content: `The card quality exceeded my expectations. Shipping was fast and secure. The detailed condition photos on the website matched perfectly with what I received. PewterPlace has earned my trust for future high-value purchases.`,
      images: [
        'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200&h=150&fit=crop'
      ],
      helpful: 18
    },
    {
      id: 3,
      user: 'PokemonMaster2000',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '2025-08-20',
      verified: true,
      conditionAccuracy: 4,
      shippingSpeed: 5,
      title: 'Good card, minor centering issue',
      content: `Overall very happy with the purchase. The card is in great condition, though there's a very slight centering issue that wasn't fully visible in the photos. Still a solid buy and the authentication process is top-notch.`,
      images: [],
      helpful: 12
    },
    {
      id: 4,
      user: 'VintageCardHunter',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2025-08-15',
      verified: true,
      conditionAccuracy: 5,
      shippingSpeed: 5,
      title: 'Exceptional service and quality',
      content: `This is my third purchase from PewterPlace and they continue to impress. The card arrived in perfect condition, well-packaged, and exactly as described. The price was fair for the condition and rarity. Highly recommend!`,
      images: [
        'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?w=200&h=150&fit=crop'
      ],
      helpful: 31
    }
  ];

  const averageRating = reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length;
  const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => ({
    rating,
    count: reviews?.filter(r => r?.rating === rating)?.length,
    percentage: (reviews?.filter(r => r?.rating === rating)?.length / reviews?.length) * 100
  }));

  const filteredReviews = reviews?.filter(review => filterRating === 'all' || review?.rating?.toString() === filterRating)?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b?.rating - a?.rating;
        case 'lowest':
          return a?.rating - b?.rating;
        case 'helpful':
          return b?.helpful - a?.helpful;
        default:
          return 0;
      }
    });

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={star <= rating ? 'text-amber-400 fill-current' : 'text-muted-foreground'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Customer Reviews</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              {averageRating?.toFixed(1)}
            </div>
            <div className="mb-2">
              {renderStars(Math.round(averageRating), 20)}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {reviews?.length} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution?.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Icon name="Star" size={12} className="text-amber-400 fill-current" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Condition Accuracy</div>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <span className="font-bold text-foreground">4.8</span>
              {renderStars(5, 14)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Shipping Speed</div>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <span className="font-bold text-foreground">4.7</span>
              {renderStars(5, 14)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Would Recommend</div>
            <div className="font-bold text-success mt-1">96%</div>
          </div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Filter:</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Write Review
        </Button>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={review?.avatar}
                  alt={review?.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{review?.user}</span>
                    {review?.verified && (
                      <div className="flex items-center space-x-1 text-success text-xs">
                        <Icon name="Shield" size={12} />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {renderStars(review?.rating)}
                <div className="text-xs text-muted-foreground mt-1">
                  Overall Rating
                </div>
              </div>
            </div>

            {/* Review Title */}
            <h4 className="font-medium text-foreground mb-2">{review?.title}</h4>

            {/* Review Content */}
            <p className="text-muted-foreground mb-4">{review?.content}</p>

            {/* Review Images */}
            {review?.images?.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review?.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-16 object-cover rounded border border-border"
                  />
                ))}
              </div>
            )}

            {/* Review Metrics */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground">Condition:</span>
                  {renderStars(review?.conditionAccuracy, 12)}
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground">Shipping:</span>
                  {renderStars(review?.shippingSpeed, 12)}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review?.helpful})</span>
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;