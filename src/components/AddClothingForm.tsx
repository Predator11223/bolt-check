import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { ClothingItem } from '../types/clothes';

interface AddClothingFormProps {
  onAdd: (item: Omit<ClothingItem, 'id' | 'currentWears' | 'isInLaundry'>) => void;
}

export function AddClothingForm({ onAdd }: AddClothingFormProps) {
  const [name, setName] = useState('');
  const [maxWears, setMaxWears] = useState(1);
  const [image, setImage] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, maxWears, image });
    setName('');
    setMaxWears(1);
    setImage('');
    setIsAdding(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 hover:border-blue-500 transition-colors"
      >
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-gray-600">Add New Clothing Item</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Add New Clothing</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Maximum Wears
        </label>
        <input
          type="number"
          min="1"
          value={maxWears}
          onChange={(e) => setMaxWears(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <div className="relative">
          {image ? (
            <div className="relative w-full h-48 mb-2">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md">
              <div className="text-center">
                <Camera className="mx-auto w-8 h-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">Upload an image</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}