import React, { useEffect, useState } from 'react';
import Ingredient from "./Ingredient.tsx";
import BackButton from "./BackButton.tsx";

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
}

interface NutritionalData {
    searchKeywords: string[];
    calories: {
        sourceId: string;
        quantity: number;
        unit: string;
    };
    portions: {
        portionName: string;
        portionUnit: string;
        quantity: number;
        unit: string;
    }[];
    ediblePart: {
        percent: number;
        sourceId: string;
    };
    langualCodes: string[];
    energy: {
        sourceId: string;
        quantity: number;
        unit: string;
    };
    foodName: string;
    latinName: string;
    constituents: {
        sourceId: string;
        quantity?: number;
        unit?: string;
        nutrientId: string;
    }[];
    uri: string;
    foodGroupId: string;
    foodId: string;
}

const FetchRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [nutritionalData, setNutritionalData] = useState<NutritionalData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingIngredients, setLoadingIngredients] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch('api/recipe')
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
        fetchNutritionalData(recipe.ingredientIds);
    };

    const fetchNutritionalData = (ingredientIds: number[]) => {
        setLoadingIngredients(true);
        fetch(`api/food/${ingredientIds.join(',')}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Nutritional Data Response:', data); // Log the response
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }
                setNutritionalData(data);
                setLoadingIngredients(false);
            })
            .catch(error => {
                console.error('Error fetching nutritional data:', error);
                setLoadingIngredients(false);
            });
    };

    const calculateTotalCalories = () => {
        return nutritionalData.reduce((total, item) => {
            const quantity = selectedRecipe?.quantity || [];
            // @ts-ignore
            return total + (item.calories.quantity * (quantity[item.foodName] || 1) / 100);
        }, 0);
    };

    const calculateTotalNutrient = (nutrientId: string) => {
        return nutritionalData.reduce((total, item) => {
            const quantity = selectedRecipe?.quantity || [];
            const nutrient = item.constituents.find(constituent => constituent.nutrientId === nutrientId);
            // @ts-ignore
            return total + (nutrient ? ((nutrient.quantity ?? 0) * (quantity[item.foodName] || 1) / 100) : 0);
        }, 0);
    };

    return (
        <div>
            <BackButton/>
            {selectedRecipe === null && <h2>Recipes</h2>}
            {loading ? (
                <div>Loading recipes...</div>
            ) : (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
                            {recipe.name}
                        </li>
                    ))}
                </ul>
            )}
            {selectedRecipe && (
                <div>
                    <h3>{selectedRecipe.name}</h3>
                    <p>{selectedRecipe.description}</p>
                    {loadingIngredients ? (
                        <div>Loading ingredients...</div>
                    ) : (
                        <ul>
                            {nutritionalData.map((data, index) => (
                                <li key={index}>
                                    <Ingredient ingredient={data} quantity={selectedRecipe.quantity[index]} />
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>{selectedRecipe.instructions}</p>
                    <h4>Nutritional Data</h4>
                    <h2>Total Calories: {calculateTotalCalories()} kcal</h2>
                    <h2>Total Protein: {calculateTotalNutrient('Protein')} g</h2>
                    <h2>Total Fat: {calculateTotalNutrient('Fett')} g</h2>
                    <h2>Total Carbs: {calculateTotalNutrient('Karbo')} g</h2>
                </div>
            )}
        </div>
    );
};

export default FetchRecipes;