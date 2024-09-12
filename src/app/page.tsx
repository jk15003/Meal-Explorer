'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import MealCard from "./mealCard/page";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Home: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ensure useRouter is only used on the client
  const router = typeof window !== 'undefined' ? useRouter() : null;

  const fetchRandomMeals = async () => {
    try {
      const mealPromises = Array.from({ length: 12 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
          res.json()
        )
      );
      const mealResponses = await Promise.all(mealPromises);
      const fetchedMeals = mealResponses.map((response) => response.meals[0]);
      setMeals(fetchedMeals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  if (loading) {
    return <div className="text-center">Loading meals...</div>;
  }

  return (<>

 

    <div className="font-serif text-center">
      <div id="Welcome Message" className="mb-10">
        <h1 className="text-6xl font-black my-10 ">
          Welcome to Meal Explorer!
        </h1>
        <h2 className="text-2xl font-bold my-6">
          Discover a world of delicious recipes, search for your favorite meals,
          and explore detailed information on how to prepare them. Your culinary
          adventure starts here!
        </h2>
        <p className="text-lg my-2">
          Meal Explorer is a user-friendly recipe application that connects you
          to an extensive database of meal recipes from around the world.
          Powered by TheMealDB API, this app allows you to effortlessly browse
          through a variety of meals, search for specific dishes, and dive into
          detailed instructions and ingredient lists. Whether you're a seasoned
          chef or just starting out in the kitchen, Meal Explorer is your go-to
          resource for culinary inspiration and guidance.
        </p>
      </div>
      
      <div id="Cards Section" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            mealName={meal.strMeal}
            mealImage={meal.strMealThumb}
            onClick={() => router?.push(`/items/${meal.idMeal}`)}  // Safe navigation
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;