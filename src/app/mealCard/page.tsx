import React from "react";

interface MealCardProps {
  mealName: string;
  mealImage: string;
  onClick?: () => void;  // Add onClick prop
}

const MealCard: React.FC<MealCardProps> = ({ mealName, mealImage, onClick }) => {
  return (
    <div
      onClick={onClick}  // Handle click event
      className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white border-0 border-black transition-all duration-300 hover:shadow-black cursor-pointer" // Add cursor-pointer for clickable effect
    >
      <img
        className="w-full h-48 object-cover"
        src={mealImage}
        alt={mealName}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{mealName}</h3>
      </div>
    </div>
  );
};

export default MealCard;