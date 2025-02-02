import React from 'react';
import { ClothingCard } from './ClothingCard';
import { AddClothingForm } from './AddClothingForm';
import { ClothingItem } from '../types/clothes';

interface WardrobeSectionProps {
  title: string;
  items: ClothingItem[];
  onWear?: (id: number) => void;
  onLaundry?: (id: number) => void;
  onDone?: (id: number) => void;
  onAdd?: (item: Omit<ClothingItem, 'id' | 'currentWears' | 'isInLaundry'>) => void;
  showAddForm?: boolean;
}

export function WardrobeSection({
  title,
  items,
  onWear,
  onLaundry,
  onDone,
  onAdd,
  showAddForm = false,
}: WardrobeSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          onDone ? (
            <ClothingCard
              key={item.id}
              item={item}
              onDone={onDone}
              variant="laundry"
            />
          ) : (
            <ClothingCard
              key={item.id}
              item={item}
              onWear={onWear}
              onLaundry={onLaundry}
              variant="wardrobe"
            />
          )
        ))}
        {showAddForm && onAdd && (
          <AddClothingForm onAdd={onAdd} />
        )}
      </div>
    </div>
  );
}