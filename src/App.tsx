import React, { useEffect, useState } from "react";
import "./App.css";

interface Recipe {
  id: number;
  name: string;
  rating: string;
  image: string;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<"explore" | "saved">("explore");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error("Failed to fetch recipes:", error));
  }, []);

  const saveRecipe = (recipe: Recipe) => {
    if (!savedRecipes.some((r) => r.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const deleteSavedRecipe = (id: number) => {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      <header className="bg-blue-600 text-white py-4">
        <div className="w-[80%] mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🍲 Recipe Explorer</h1>
          <nav>
            <button
              className={`px-4 py-2 rounded ${
                currentPage === "explore" ? "bg-blue-700" : "bg-blue-500"
              }`}
              onClick={() => setCurrentPage("explore")}
            >
              Explore Recipes
            </button>
            <button
              className={`ml-4 px-4 py-2 rounded ${
                currentPage === "saved" ? "bg-blue-700" : "bg-blue-500"
              }`}
              onClick={() => setCurrentPage("saved")}
            >
              Saved Recipes
            </button>
          </nav>
        </div>
      </header>

      <main className="w-[80%] mx-auto py-8">
        {currentPage === "explore" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">Explore Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{recipe.name}</h3>
                    <button
                      className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                      onClick={() => saveRecipe(recipe)}
                    >
                      Save Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentPage === "saved" && (
          <div className="w-[80%] mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Saved Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col items-start">
                    <h3 className="text-lg font-bold">{recipe.name}</h3>
                    <button
                      className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                      onClick={() => deleteSavedRecipe(recipe.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedRecipe(null)}
            >
              ✕
            </button>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="text-2xl font-bold mt-4">{selectedRecipe.name}</h3>
            <p className="text-gray-700 mt-2">Rating: {selectedRecipe.rating}</p>
          </div>
        </div>
      )}

      
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="w-[80%] mx-auto text-center">
          <p>&copy; 2025 Recipe Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
