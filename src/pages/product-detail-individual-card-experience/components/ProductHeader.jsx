import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductHeader = ({ cardData }) => {
  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'text-slate-600 bg-slate-100',
      'Uncommon': 'text-emerald-600 bg-emerald-100',
      'Rare': 'text-blue-600 bg-blue-100',
      'Ultra Rare': 'text-purple-600 bg-purple-100',
      'Secret Rare': 'text-amber-600 bg-amber-100'
    };
    return colors?.[rarity] || 'text-slate-600 bg-slate-100';
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Mint': 'text-emerald-600 bg-emerald-100',
      'Near Mint': 'text-blue-600 bg-blue-100',
      'Lightly Played': 'text-amber-600 bg-amber-100',
      'Moderately Played': 'text-orange-600 bg-orange-100',
      'Heavily Played': 'text-red-600 bg-red-100'
    };
    return colors?.[condition] || 'text-slate-600 bg-slate-100';
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Trading Cards</span>
        <Icon name="ChevronRight" size={14} />
        <span>Pokémon</span>
        <Icon name="ChevronRight" size={14} />
        <span>{cardData?.set}</span>
        <Icon name="ChevronRight" size={14} />
        <span className="text-foreground">{cardData?.name}</span>
      </nav>
      {/* Product Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {cardData?.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg text-muted-foreground">
            {cardData?.set} • #{cardData?.collectorNumber}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(cardData?.rarity)}`}>
            {cardData?.rarity}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(cardData?.condition)}`}>
            {cardData?.condition}
          </div>
        </div>
      </div>
      {/* Key Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Artist</div>
          <div className="font-medium">{cardData?.artist}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Release Date</div>
          <div className="font-medium">{cardData?.releaseDate}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Language</div>
          <div className="font-medium">{cardData?.language}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Stock</div>
          <div className="font-medium text-success">{cardData?.stock} Available</div>
        </div>
      </div>
      {/* Authentication Badge */}
      {cardData?.isAuthenticated && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="Shield" size={20} className="text-success" />
          <div>
            <div className="font-medium text-success">PewterPlace Authenticated</div>
            <div className="text-sm text-success/80">Verified authentic by our experts</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHeader;