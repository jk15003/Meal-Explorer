import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About This Application</h1>
        <p className="text-lg mb-4">
          Welcome to the Meal Explorer application! This app is designed to help you discover and explore a variety of delicious meals from around the world. 
          Whether you're looking for new recipes to try or simply want to browse through different cuisines, this app has got you covered. 
          The application fetches data from the MealDB API, providing you with detailed information on each meal, including ingredients, instructions, and even video tutorials when available.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">About the Developer</h2>
        <p className="text-lg mb-4">
          My name is Joseph El Khoury, and I am the creator of this application. I developed this app as a project to enhance my skills in React and Next.js, and to provide a valuable tool for anyone interested in exploring new recipes.
        </p>
        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold text-gray-600">Contact Information:</p>
          <p className="text-lg mb-2">
            Email: <a href="mailto:joseph.khoury321@gmail.com" className="text-blue-500 hover:underline">joseph.khoury321@gmail.com</a>
          </p>
          <p className="text-lg mb-2">
            LinkedIn: <a href="https://linkedin.com/in/joseph-khoury-64b6212a1" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">linkedin.com/in/joseph-khoury-64b6212a1</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
