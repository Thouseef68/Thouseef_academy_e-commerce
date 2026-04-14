import React from 'react';
import { ChevronRight, Car, Home, Hammer, Book, Smartphone, Tv, Shirt, Grid } from 'lucide-react'; // Changed Tool to Hammer

const categories = [
  { name: 'Automobiles', icon: Car },
  { name: 'Home appliances', icon: Home },
  { name: 'Tools, equipments', icon: Hammer }, // Updated icon reference here
  { name: 'Books & magazines', icon: Book },
  { name: 'Electronic gadgets', icon: Smartphone },
  { name: 'Cooking and wear', icon: Tv },
  { name: 'Sports and outdoor', icon: Shirt },
  { name: 'More category', icon: Grid },
];

const Sidebar = () => {
  return (
    <div className="w-[280px] bg-white border border-gray-200 rounded-lg overflow-hidden h-fit">
      {categories.map((cat, idx) => (
        <div 
          key={idx} 
          className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer transition text-gray-600 group"
        >
          <div className="flex items-center gap-3">
            <cat.icon size={18} className="text-gray-400 group-hover:text-blue-600" />
            <span className="text-sm font-medium">{cat.name}</span>
          </div>
          <ChevronRight size={14} className="text-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;