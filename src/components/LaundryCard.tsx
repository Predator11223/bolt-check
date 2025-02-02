import React from 'react';
import { Shirt } from 'lucide-react';
import { ClothingItem } from '../types/clothes';

interface LaundryCardProps {
  item: ClothingItem;
  onDone: (id: number) => void;
}

export function LaundryCard({ item, onDone }: LaundryCardProps) {
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
        onClick={() => onDone(item.id)}
        className="mt-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Done
      </button>
    </div>
  );
}