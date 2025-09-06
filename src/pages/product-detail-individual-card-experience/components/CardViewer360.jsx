import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CardViewer360 = ({ cardData }) => {
  const [currentView, setCurrentView] = useState('front');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const views = [
    { id: 'front', label: 'Front', image: cardData?.images?.front },
    { id: 'back', label: 'Back', image: cardData?.images?.back },
    { id: 'edge', label: 'Edge', image: cardData?.images?.edge },
    { id: 'surface', label: 'Surface', image: cardData?.images?.surface }
  ];

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Main Image Display */}
      <div className="relative aspect-[3/4] bg-muted">
        <div 
          className={`relative w-full h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} overflow-hidden`}
          onMouseMove={handleMouseMove}
          onClick={toggleZoom}
        >
          <Image
            src={views?.find(v => v?.id === currentView)?.image}
            alt={`${cardData?.name} - ${currentView} view`}
            className={`w-full h-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-200' : 'scale-100'
            }`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%`
            } : {}}
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
          </div>
        </div>
      </div>
      {/* View Selector */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2 overflow-x-auto">
          {views?.map((view) => (
            <button
              key={view?.id}
              onClick={() => setCurrentView(view?.id)}
              className={`flex-shrink-0 relative w-16 h-20 rounded border-2 transition-all duration-200 ${
                currentView === view?.id
                  ? 'border-accent shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={view?.image}
                alt={`${cardData?.name} - ${view?.label}`}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 text-center rounded-b">
                {view?.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* 360° Controls */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="RotateCw" size={16} />
            <span>360° View Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ZoomIn" size={16} />
            <span>HD Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardViewer360;