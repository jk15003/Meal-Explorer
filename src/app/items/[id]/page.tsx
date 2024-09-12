'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
  strIngredients: { ingredient: string; measure: string }[];
}

const MealDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter(); // Use router for navigation
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        const mealData = data.meals[0];

        const ingredients: { ingredient: string; measure: string }[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}`];
          const measure = mealData[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push({ ingredient, measure });
          }
        }

        setMeal({
          idMeal: mealData.idMeal,
          strMeal: mealData.strMeal,
          strMealThumb: mealData.strMealThumb,
          strInstructions: mealData.strInstructions,
          strYoutube: mealData.strYoutube,
          strIngredients: ingredients,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-2xl">Loading meal details...</div>;
  }

  if (!meal) {
    return <div className="text-center text-2xl">Meal not found!</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push('/mealList')}
          className="text-blue-500 hover:text-blue-700 mb-4 mr-4 bg-blue-100 p-2 rounded-lg shadow-md"
        >
          &larr; Back to List
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <img
          className="w-full h-64 object-cover"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{meal.strMeal}</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside">
              {meal.strIngredients.map((item, index) => (
                <li key={index} className="text-lg">
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>

          {meal.strYoutube && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Video Tutorial</h2>
              <a
                href={meal.strYoutube}
                className="text-blue-500 hover:underline text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage;
