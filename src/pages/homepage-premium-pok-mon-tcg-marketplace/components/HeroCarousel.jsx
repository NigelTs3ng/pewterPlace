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
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' :'opacity-0 translate-x-full'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 text-white">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-success text-success-foreground text-xs font-semibold rounded-full">
                      {slide?.badge}
                    </span>
                    <span className="text-lg font-bold">{slide?.price}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
                      <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
                        <Icon name="ShoppingBag" size={20} className="mr-2" />
                        {slide?.cta}
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      <Icon name="Play" size={20} className="mr-2" />
                      Watch Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative hidden lg:flex items-center justify-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-xl"></div>
                  <Image
                    src={slide?.image}
                    alt={slide?.title}
                    className="w-full h-80 object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-success rounded-full flex items-center justify-center animate-pulse-slow">
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' :'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
      {/* Holographic Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow pointer-events-none"></div>
    </div>
  );
};

export default HeroCarousel;