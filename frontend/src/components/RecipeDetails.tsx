import React, { useEffect, useState } from 'react';
import Ingredient from "./Ingredient.tsx";

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
    allergyTags: string[]; // Add this line
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

interface RecipeDetailsProps {
    recipe: Recipe;
    handleAddToShoppingList: (newItems: Recipe) => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, handleAddToShoppingList }) => {
    const [nutritionalData, setNutritionalData] = useState<NutritionalData[]>([]);
    const [loadingIngredients, setLoadingIngredients] = useState<boolean>(false);

    useEffect(() => {
        fetchNutritionalData(recipe.ingredientIds);
    }, [recipe]);

    const fetchNutritionalData = (ingredientIds: number[]) => {
        setLoadingIngredients(true);
        fetch(`http://localhost:8000/api/food/${ingredientIds.join(',')}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
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
            const quantity = recipe.quantity || [];
            // @ts-ignore
            return total + (item.calories.quantity * (quantity[item.foodName] || 1) / 100);
        }, 0);
    };

    const calculateTotalNutrient = (nutrientId: string) => {
        return nutritionalData.reduce((total, item) => {
            const quantity = recipe.quantity || [];
            const nutrient = item.constituents.find(constituent => constituent.nutrientId === nutrientId);
            // @ts-ignore
            return total + (nutrient ? ((nutrient.quantity ?? 0) * (quantity[item.foodName] || 1) / 100) : 0);
        }, 0);
    };

    const handleAddToShoppingListClick = () => {
        handleAddToShoppingList(recipe);
    };

    return (
        <div>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            {loadingIngredients ? (
                <div>Loading ingredients...</div>
            ) : (
                <ul>
                    {nutritionalData.map((data, index) => (
                        <li key={index}>
                            <Ingredient ingredient={data} quantity={recipe.quantity[index]} />
                        </li>
                    ))}
                </ul>
            )}
            <p>{recipe.instructions}</p>
            <h4>Nutritional Data</h4>
            <h2>Total Calories: {calculateTotalCalories()} kcal</h2>
            <h2>Total Protein: {calculateTotalNutrient('Protein')} g</h2>
            <h2>Total Fat: {calculateTotalNutrient('Fett')} g</h2>
            <h2>Total Carbs: {calculateTotalNutrient('Karbo')} g</h2>
            <h4>Allergy Tags</h4>
            <ul>
                {recipe.allergyTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <button onClick={handleAddToShoppingListClick}>Add to meal plan</button>
        </div>
    );
};

export default RecipeDetails;