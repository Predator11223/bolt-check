export interface ClothingItem {
  id: number;
  name: string;
  maxWears: number;
  currentWears: number;
  image: string;
  isInLaundry: boolean;
}