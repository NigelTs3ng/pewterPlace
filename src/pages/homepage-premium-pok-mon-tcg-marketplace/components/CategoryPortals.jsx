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
      },
      path: "/product-catalog-advanced-tcg-discovery"
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
      },
      path: "/sealed-products-catalog"
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
      },
      path: "/product-catalog-advanced-tcg-discovery"
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
      },
      path: "/product-catalog-advanced-tcg-discovery"
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
      },
      path: "/product-catalog-advanced-tcg-discovery"
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
      },
      path: "/product-catalog-advanced-tcg-discovery"
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Explore Collections
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover authentic Pokémon cards across all categories, from vintage classics to the latest releases
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            to={category?.path}
            className="group"
          >
            <div className="relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-shadow-hover transition-all duration-300 hover:-translate-y-1">
              {/* Header */}
              <div className={`bg-gradient-to-r ${category?.color} p-6 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                      <Icon name={category?.icon} size={24} color="white" />
                    </div>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {category?.count} items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category?.name}</h3>
                  <p className="text-white/90 text-sm">{category?.description}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Featured Product */}
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={category?.featured?.image}
                      alt={category?.featured?.name}
                      className="w-16 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={10} color="white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Featured: {category?.featured?.name}
                    </h4>
                    <p className="text-lg font-bold text-accent mb-2">
                      {category?.featured?.price}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Shield" size={12} className="mr-1" />
                      <span>Authenticated</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Browse collection
                    </span>
                    <div className="flex items-center text-accent group-hover:translate-x-1 transition-transform duration-200">
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPortals;