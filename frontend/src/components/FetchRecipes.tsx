// src/components/FetchRecipes.tsx
import React, { useEffect, useState } from 'react';
import RecipeDetails from './RecipeDetails.tsx';
import BackButton from "./BackButton.tsx";

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
}

interface FetchRecipesProps {
    handleAddToShoppingList: (newRecipe: Recipe) => void;
}

const FetchRecipes: React.FC<FetchRecipesProps> = ({ handleAddToShoppingList }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8000/api/recipe')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            });
    }, []);

    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setRecipes([]); // Clear the recipes
    };

    return (
        <div>
            <BackButton />

            {selectedRecipe === null && <h2>Recipes</h2>}
            {loading ? (
                <div>Loading recipes...</div>
            ) : (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <span onClick={() => handleRecipeClick(recipe)}>{recipe.name}</span>
                        </li>
                    ))}
                </ul>
            )}
            {selectedRecipe && (
                <RecipeDetails recipe={selectedRecipe} handleAddToShoppingList={handleAddToShoppingList} />
            )}
        </div>
    );
};

export default FetchRecipes;