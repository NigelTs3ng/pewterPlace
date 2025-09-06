import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PriceHistory = ({ cardData }) => {
  const [timeframe, setTimeframe] = useState('30');

  const priceData = {
    '30': [
      { date: '2025-08-01', price: 245.00, volume: 12 },
      { date: '2025-08-05', price: 252.00, volume: 8 },
      { date: '2025-08-10', price: 248.00, volume: 15 },
      { date: '2025-08-15', price: 255.00, volume: 6 },
      { date: '2025-08-20', price: 260.00, volume: 10 },
      { date: '2025-08-25', price: 258.00, volume: 14 },
      { date: '2025-08-31', price: cardData?.price, volume: 9 }
    ],
    '60': [
      { date: '2025-07-01', price: 235.00, volume: 18 },
      { date: '2025-07-10', price: 240.00, volume: 12 },
      { date: '2025-07-20', price: 238.00, volume: 16 },
      { date: '2025-07-30', price: 245.00, volume: 11 },
      { date: '2025-08-10', price: 248.00, volume: 15 },
      { date: '2025-08-20', price: 260.00, volume: 10 },
      { date: '2025-08-31', price: cardData?.price, volume: 9 }
    ],
    '90': [
      { date: '2025-06-01', price: 220.00, volume: 22 },
      { date: '2025-06-15', price: 225.00, volume: 19 },
      { date: '2025-07-01', price: 235.00, volume: 18 },
      { date: '2025-07-15', price: 242.00, volume: 14 },
      { date: '2025-08-01', price: 245.00, volume: 12 },
      { date: '2025-08-15', price: 255.00, volume: 6 },
      { date: '2025-08-31', price: cardData?.price, volume: 9 }
    ]
  };

  const currentData = priceData?.[timeframe];
  const firstPrice = currentData?.[0]?.price || 0;
  const currentPrice = cardData?.price;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100)?.toFixed(1);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{formatDate(label)}</p>
          <p className="text-sm text-accent">
            Price: ${payload?.[0]?.value?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Volume: {payload?.[0]?.payload?.volume} sales
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Price History</h3>
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { value: '30', label: '30D' },
            { value: '60', label: '60D' },
            { value: '90', label: '90D' }
          ]?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setTimeframe(option?.value)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                timeframe === option?.value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Price Change Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Current Price</div>
          <div className="text-lg font-bold text-foreground">${currentPrice?.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Change</div>
          <div className={`text-lg font-bold ${priceChange >= 0 ? 'text-success' : 'text-error'}`}>
            {priceChange >= 0 ? '+' : ''}${priceChange?.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">% Change</div>
          <div className={`text-lg font-bold ${priceChange >= 0 ? 'text-success' : 'text-error'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Avg Volume</div>
          <div className="text-lg font-bold text-foreground">
            {Math.round(currentData?.reduce((sum, item) => sum + item?.volume, 0) / currentData?.length)}
          </div>
        </div>
      </div>
      {/* Price Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              tickFormatter={(value) => `$${value}`}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Market Analysis */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h4 className="font-medium text-foreground">Market Analysis</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground mb-2">Market Trend:</div>
            <div className={`font-medium ${priceChange >= 0 ? 'text-success' : 'text-error'}`}>
              {priceChange >= 0 ? 'Bullish' : 'Bearish'} - 
              {priceChange >= 0 ? ' Price increasing steadily' : ' Price declining'}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2">Volatility:</div>
            <div className="font-medium text-foreground">
              {Math.abs(priceChangePercent) < 5 ? 'Low' : 
               Math.abs(priceChangePercent) < 15 ? 'Moderate' : 'High'} - 
              {Math.abs(priceChangePercent)}% over {timeframe} days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;