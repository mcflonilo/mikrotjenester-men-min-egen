import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        fetch('http://localhost:8080/api/recipe')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        fetchNutritionalData(recipe.ingredientIds);
    };

    const fetchNutritionalData = (ingredientIds: number[]) => {
        fetch(`http://localhost:8081/api/food/${ingredientIds.join(',')}`)
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
            })
            .catch(error => console.error('Error fetching nutritional data:', error));
    };
    const calculateTotalCalories = () => {
        return nutritionalData.reduce((total, item) => {
            const quantity = selectedRecipe?.quantity || 1;
            // @ts-ignore
            return total + (item.calories.quantity * quantity / 100);
        }, 0);
    };

    const calculateTotalNutrient = (nutrientId: string) => {
        return nutritionalData.reduce((total, item) => {
            const quantity = selectedRecipe?.quantity || 1;
            const nutrient = item.constituents.find(constituent => constituent.nutrientId === nutrientId);
            console.log(quantity);
            // @ts-ignore
            return total + (nutrient ? ((nutrient.quantity??0) * quantity / 100) : 0);
        }, 0);
    };

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
                        {recipe.name}
                    </li>
                ))}
            </ul>
            {selectedRecipe && (
                <div>
                    <h3>{selectedRecipe.name}</h3>
                    <p>{selectedRecipe.description}</p>
                    <ul>
                        {nutritionalData.map((data, index) => (
                            <li key={data.foodName}>{data.foodName}, Quantity: {selectedRecipe.quantity[index]}</li>
                        ))}
                    </ul>
                    <p>{selectedRecipe.instructions}</p>
                    <h4>Ingredients</h4>

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