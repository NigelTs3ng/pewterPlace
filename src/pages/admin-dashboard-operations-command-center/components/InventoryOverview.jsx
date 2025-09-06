import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryData = [
    {
      id: 1,
      name: "Charizard ex (Base Set)",
      sku: "BS-006-EX",
      category: "Base Set",
      condition: "Near Mint",
      grade: "PSA 9",
      stock: 3,
      reserved: 1,
      price: "$1,247.50",
      reorderPoint: 5,
      status: "low_stock",
      lastUpdated: "2025-08-31 14:30",
      supplier: "Premium Cards Ltd",
      location: "A1-B3-C2"
    },
    {
      id: 2,
      name: "Pikachu VMAX (Vivid Voltage)",
      sku: "VV-188-VMAX",
      category: "Vivid Voltage",
      condition: "Mint",
      grade: "PSA 10",
      stock: 12,
      reserved: 3,
      price: "$89.99",
      reorderPoint: 10,
      status: "in_stock",
      lastUpdated: "2025-08-31 13:45",
      supplier: "TCG Wholesale",
      location: "B2-A1-D4"
    },
    {
      id: 3,
      name: "Lugia ex (Neo Genesis)",
      sku: "NG-009-EX",
      category: "Neo Genesis",
      condition: "Light Play",
      grade: "PSA 8",
      stock: 0,
      reserved: 0,
      price: "$456.75",
      reorderPoint: 3,
      status: "out_of_stock",
      lastUpdated: "2025-08-30 16:22",
      supplier: "Vintage Cards Co",
      location: "C3-B2-A1"
    },
    {
      id: 4,
      name: "Rayquaza VMAX (Evolving Skies)",
      sku: "ES-217-VMAX",
      category: "Evolving Skies",
      condition: "Near Mint",
      grade: "Ungraded",
      stock: 25,
      reserved: 8,
      price: "$34.99",
      reorderPoint: 15,
      status: "in_stock",
      lastUpdated: "2025-08-31 12:18",
      supplier: "Modern Cards Hub",
      location: "D1-C3-B2"
    },
    {
      id: 5,
      name: "Mew ex (Holon Phantoms)",
      sku: "HP-100-EX",
      category: "Holon Phantoms",
      condition: "Near Mint",
      grade: "PSA 9",
      stock: 7,
      reserved: 2,
      price: "$312.80",
      reorderPoint: 5,
      status: "in_stock",
      lastUpdated: "2025-08-31 11:55",
      supplier: "Rare Finds Inc",
      location: "A2-D1-C3"
    }
  ];

  const categories = ['all', 'Base Set', 'Neo Genesis', 'Vivid Voltage', 'Evolving Skies', 'Holon Phantoms'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-success/10 text-success border-success/20';
      case 'low_stock': return 'bg-warning/10 text-warning border-warning/20';
      case 'out_of_stock': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock': return 'CheckCircle';
      case 'low_stock': return 'AlertTriangle';
      case 'out_of_stock': return 'XCircle';
      default: return 'Circle';
    }
  };

  const filteredInventory = selectedCategory === 'all' 
    ? inventoryData 
    : inventoryData?.filter(item => item?.category === selectedCategory);

  return (
    <div className="bg-card rounded-lg border border-border card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Inventory Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Track stock levels and manage inventory</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" iconName="Upload">
              Import CSV
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button size="sm" iconName="Plus">
              Add Product
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Category:</span>
            <div className="flex items-center space-x-1">
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">In Stock</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Low Stock</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Out of Stock</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Condition</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory?.map((item) => (
                <tr key={item?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground text-sm">{item?.name}</span>
                      <span className="text-xs text-muted-foreground">{item?.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-foreground">{item?.sku}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{item?.condition}</span>
                      {item?.grade !== 'Ungraded' && (
                        <span className="text-xs text-accent font-medium">{item?.grade}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {item?.stock} available
                      </span>
                      {item?.reserved > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {item?.reserved} reserved
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">{item?.price}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item?.status)}`}>
                      <Icon name={getStatusIcon(item?.status)} size={12} />
                      <span>{item?.status?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-xs text-muted-foreground">{item?.location}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="sm" iconName="Eye">
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredInventory?.length} of {inventoryData?.length} products
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverview;