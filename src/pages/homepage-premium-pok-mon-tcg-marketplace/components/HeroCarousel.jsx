import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Pokémon 151 Collection",
      subtitle: "Complete Your Kanto Journey",
      description: "Discover the original 151 Pokémon with stunning artwork and premium foil treatments. Limited stock available.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
      cta: "Shop Collection",
      badge: "New Release",
      price: "From $4.99"
    },
    {
      id: 2,
      title: "Paldea Evolved Booster Box",
      subtitle: "Chase the Legendary Pulls",
      description: "36 booster packs featuring Koraidon and Miraidon ex cards. Authenticated and sealed for maximum value.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      cta: "Pre-Order Now",
      badge: "Hot Deal",
      price: "$144.99"
    },
    {
      id: 3,
      title: "PSA 10 Charizard Collection",
      subtitle: "Investment Grade Cards",
      description: "Professionally graded Charizard cards from Base Set to modern. Authenticated with certificates.",
      image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=800&h=600&fit=crop",
      cta: "View Collection",
      badge: "Graded",
      price: "From $299.99"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-gradient-premium shadow-premium">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
      ></div>

      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-all duration-700 ease-premium ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 text-white relative z-10">
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-premium text-white text-xs font-semibold rounded-full border border-white/20">
                      {slide?.badge}
                    </span>
                    <span className="text-lg font-display font-bold tracking-tight">{slide?.price}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                      {slide?.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-white/90 font-medium">
                      {slide?.subtitle}
                    </h2>
                    <p className="text-lg text-white/80 max-w-md leading-relaxed">
                      {slide?.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to="/product-catalog-advanced-tcg-discovery">
                      <Button 
                        variant="default" 
                        size="lg" 
                        className="bg-white text-primary hover:bg-white/90 shadow-collector transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Icon name="ShoppingBag" size={20} className="mr-2" />
                        {slide?.cta}
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                    >
                      <Icon name="Play" size={20} className="mr-2" />
                      Watch Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative hidden lg:flex items-center justify-center p-8">
                <div className="relative transform transition-transform duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-xl"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary opacity-50 blur-2xl"></div>
                  <Image
                    src={slide?.image}
                    alt={slide?.title}
                    className="relative w-full h-96 object-cover rounded-xl shadow-premium"
                  />
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center animate-pulse-slow shadow-collector">
                    <Icon name="Star" size={24} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-premium rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/20 hover:scale-110"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-premium rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/20 hover:scale-110"
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-collector' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Enhanced Holographic Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-white/10 to-primary/5 animate-shimmer pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-radial opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default HeroCarousel;