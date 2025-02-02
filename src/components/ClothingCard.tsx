import React from 'react';
import { Shirt } from 'lucide-react';
import { ClothingItem } from '../types/clothes';

interface ClothingCardProps {
  item: ClothingItem;
  onWear?: (id: number) => void;
  onLaundry?: (id: number) => void;
  onDone?: (id: number) => void;
  variant: 'wardrobe' | 'laundry';
}

export function ClothingCard({ item, onWear, onLaundry, onDone, variant }: ClothingCardProps) {
  if (variant === 'laundry') {
    return (
      <div className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col">
        <div className="relative h-48 mb-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-md opacity-75"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
              <Shirt className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <button
          onClick={() => onDone?.(item.id)}
          className="mt-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="relative h-48 mb-4">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
            <Shirt className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <div className="text-sm text-gray-600 mb-4">
        Wears remaining: {item.maxWears - item.currentWears} / {item.maxWears}
      </div>
      
      <div className="mt-auto flex gap-2">
        <button
          onClick={() => onWear?.(item.id)}
          disabled={item.currentWears >= item.maxWears}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Wear
        </button>
        <button
          onClick={() => onLaundry?.(item.id)}
          className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Laundry
        </button>
      </div>
    </div>
  );
}