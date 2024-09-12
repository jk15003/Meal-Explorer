'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MealCard from '../mealCard/page';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const MealsListPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(12);
  const router = useRouter();

  useEffect(() => {
    fetchMeals();
  }, [category, area, currentPage]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

      if (category) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      } else if (area) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchMeals();
    }
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  const handleAreaChange = (area: string) => {
    setArea(area);
    setCurrentPage(1); // Reset to the first page when the area changes
  };

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for meals..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleSearchKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ backgroundColor: '#f0f0f0', color: '#333' }}
        />
      </div>
      <div className="mb-6 flex space-x-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Filter by Category:</h3>
          <div className="flex space-x-2">
            <button onClick={() => handleCategoryChange('')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">All</button>
            <button onClick={() => handleCategoryChange('Vegetarian')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">Vegetarian</button>
            <button onClick={() => handleCategoryChange('Dessert')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">Dessert</button>
            {/* Add more categories as needed */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filter by Area:</h3>
          <div className="flex space-x-2">
            <button onClick={() => handleAreaChange('')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">All</button>
            <button onClick={() => handleAreaChange('Italian')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">Italian</button>
            <button onClick={() => handleAreaChange('Indian')} className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded">Indian</button>
            {/* Add more areas as needed */}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-2xl">Loading meals...</div>
      ) : (
        <>
          {meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-20">
              <div className="text-6xl mb-4">😔</div>
              <div className="text-xl text-gray-500">The "{searchTerm}" is unavailable.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentMeals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  mealName={meal.strMeal}
                  mealImage={meal.strMealThumb}
                  onClick={() => router.push(`/items/${meal.idMeal}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentMeals.length < mealsPerPage}
          className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MealsListPage;
