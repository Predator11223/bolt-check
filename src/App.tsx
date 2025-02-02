import React, { useState } from 'react';
import { WardrobeSection } from './components/WardrobeSection';
import { ClothingItem } from './types/clothes';

const initialClothes: ClothingItem[] = [
  {
    id: 1,
    name: "Blue T-Shirt",
    maxWears: 3,
    currentWears: 0,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800",
    isInLaundry: false,
  },
  {
    id: 2,
    name: "Black Jeans",
    maxWears: 5,
    currentWears: 0,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800",
    isInLaundry: false,
  },
  {
    id: 3,
    name: "White Sweater",
    maxWears: 4,
    currentWears: 0,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800",
    isInLaundry: false,
  },
];

function App() {
  const [clothes, setClothes] = useState<ClothingItem[]>(initialClothes);
  const [nextId, setNextId] = useState(4);

  const handleWear = (id: number) => {
    setClothes(prevClothes => prevClothes.map(item => {
      if (item.id === id) {
        const newWears = item.currentWears + 1;
        return {
          ...item,
          currentWears: newWears,
          isInLaundry: newWears >= item.maxWears
        };
      }
      return item;
    }));
  };

  const handleLaundry = (id: number) => {
    setClothes(prevClothes => prevClothes.map(item => 
      item.id === id ? { ...item, isInLaundry: true } : item
    ));
  };

  const handleDone = (id: number) => {
    setClothes(prevClothes => prevClothes.map(item => 
      item.id === id ? { ...item, isInLaundry: false, currentWears: 0 } : item
    ));
  };

  const handleAddClothing = (newItem: Omit<ClothingItem, 'id' | 'currentWears' | 'isInLaundry'>) => {
    const item: ClothingItem = {
      ...newItem,
      id: nextId,
      currentWears: 0,
      isInLaundry: false,
    };
    setClothes(prev => [...prev, item]);
    setNextId(prev => prev + 1);
  };

  const wearableClothes = clothes.filter(item => !item.isInLaundry);
  const laundryClothes = clothes.filter(item => item.isInLaundry);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Wardrobe</h1>
        
        <WardrobeSection
          title="Available Clothes"
          items={wearableClothes}
          onWear={handleWear}
          onLaundry={handleLaundry}
          onAdd={handleAddClothing}
          showAddForm={true}
        />

        <WardrobeSection
          title="Laundry Basket"
          items={laundryClothes}
          onDone={handleDone}
        />
      </div>
    </div>
  );
}

export default App;