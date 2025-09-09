import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryPortals = () => {
  const categories = [
    {
      id: 1,
      name: "Singles",
      description: "Individual cards from all sets",
      icon: "Zap",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      count: "12,847",
      featured: {
        name: "Charizard ex",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=280&fit=crop"
      }
    },
    {
      id: 2,
      name: "Sealed Products",
      description: "Booster boxes, packs & bundles",
      icon: "Package",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      count: "1,234",
      featured: {
        name: "Paldea Evolved Box",
        price: "$144.99",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop"
      }
    },
    {
      id: 3,
      name: "Graded Cards",
      description: "PSA, BGS & CGC certified",
      icon: "Award",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      count: "3,456",
      featured: {
        name: "PSA 10 Pikachu",
        price: "$299.99",
        image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=200&h=280&fit=crop"
      }
    },
    {
      id: 4,
      name: "New Releases",
      description: "Latest sets & products",
      icon: "Sparkles",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-800",
      count: "89",
      featured: {
        name: "Pokémon 151",
        price: "$4.99",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=280&fit=crop"
      }
    },
    {
      id: 5,
      name: "Japanese Cards",
      description: "Authentic Japanese releases",
      icon: "Globe",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      count: "2,567",
      featured: {
        name: "Japanese Eevee",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop"
      }
    },
    {
      id: 6,
      name: "Vintage Cards",
      description: "Classic & rare collectibles",
      icon: "Crown",
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-800",
      count: "1,890",
      featured: {
        name: "Base Set Charizard",
        price: "$1,299.99",
        image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=200&h=280&fit=crop"
      }
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Explore Collections
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover authentic Pokémon cards across all categories, from vintage classics to the latest releases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            to="/product-catalog-advanced-tcg-discovery"
            className="group"
          >
            <div className="card-premium group/card">
              {/* Header */}
              <div className={`bg-gradient-to-br ${category?.color} p-8 text-white relative overflow-hidden`}>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-premium rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-500">
                        <Icon name={category?.icon} size={28} className="text-white" />
                      </div>
                      <span className="text-sm font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-premium border border-white/20">
                        {category?.count} items
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-premium opacity-0 group-hover/card:opacity-100 transform group-hover/card:translate-x-0 translate-x-4 transition-all duration-500">
                      <Icon name="ArrowRight" size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2">{category?.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{category?.description}</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24 group-hover/card:translate-y-[-8rem] group-hover/card:translate-x-32 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-16 -translate-x-16 group-hover/card:translate-y-20 group-hover/card:translate-x-[-5rem] transition-transform duration-700"></div>
              </div>

              {/* Featured Product */}
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent to-primary opacity-50 blur group-hover:opacity-75 transition-opacity duration-500 rounded-lg"></div>
                    <Image
                      src={category?.featured?.image}
                      alt={category?.featured?.name}
                      className="relative w-16 h-20 object-cover rounded-lg shadow-collector"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={10} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
                      Featured: {category?.featured?.name}
                    </h4>
                    <p className="text-lg font-bold text-accent mb-2">
                      {category?.featured?.price}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Shield" size={12} className="mr-1 text-success" />
                      <span>Authenticated</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      Browse collection
                    </span>
                    <div className="flex items-center text-accent group-hover/card:translate-x-1 transition-transform duration-300">
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 hover-shine opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPortals;