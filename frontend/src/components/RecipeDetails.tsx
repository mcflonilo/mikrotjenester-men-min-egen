import React, { useEffect, useState } from 'react';
import Ingredient from "./Ingredient.tsx";
import { useUser } from './UserContext';

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
    allergyTags: string[];
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
    const { user } = useUser();
    const [nutritionalData, setNutritionalData] = useState<NutritionalData[]>([]);
    const [loadingIngredients, setLoadingIngredients] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        if (isExpanded) {
            fetchNutritionalData(recipe.ingredientIds);
            checkIfFavorite();
        }
    }, [recipe, isExpanded]);

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

    const checkIfFavorite = async () => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:8000/api/favorites?userId=${user.email}`);
                if (response.ok) {
                    const favorites = await response.json();
                    setIsFavorite(favorites.some((fav: any) => fav.recipeId === recipe.id));
                } else {
                    console.error('Failed to fetch favorites');
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    };

    const handleAddToFavorites = async () => {
        if (user) {
            try {
                const response = await fetch('http://localhost:8000/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipeId: recipe.id, userId: user.email }),
                    credentials: 'include',
                });
                if (response.ok) {
                    setIsFavorite(true);
                } else {
                    console.error('Failed to add to favorites');
                }
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        } else {
            console.error('User not logged in');
        }
    };

    const handleRemoveFromFavorites = async () => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:8000/api/favorites?userId=${user.email}&recipeId=${recipe.id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                if (response.ok) {
                    setIsFavorite(false);
                } else {
                    console.error('Failed to remove from favorites');
                }
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        } else {
            console.error('User not logged in');
        }
    };

    const handleFavoriteClick = () => {
        if (user) {
            if (isFavorite) {
                handleRemoveFromFavorites();
            } else {
                handleAddToFavorites();
            }
        } else {
            setErrorMessage('You need to log in to add to favorites');
        }
    };

    const calculateTotalCalories = () => {
        return nutritionalData.reduce((total, item) => {
            const quantity = recipe.quantity || [];
            // @ts-ignore
            return total + (item.calories.quantity * (quantity[item.foodName] || 1) / 100);
        }, 0);
    };

    const calculateTotalNutrient = (nutrientId: string) => {
        return nutritionalData.reduce((total, item, index) => {
            const quantity = recipe.quantity[index] || 1;
            const nutrient = item.constituents.find(constituent => constituent.nutrientId === nutrientId);
            return total + (nutrient ? ((nutrient.quantity ?? 0) * quantity / 100) : 0);
        }, 0);
    };

    const handleAddToShoppingListClick = () => {
        handleAddToShoppingList(recipe);
        setSuccessMessage('Recipe added to meal plan');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <h3 onClick={handleToggleExpand} style={{ cursor: 'pointer' }}>{recipe.name}</h3>
            {isExpanded && (
                <div>
                    <p>{recipe.description}</p>
                    {loadingIngredients ? (
                        <div>Loading ingredients...</div>
                    ) : (
                        <ul>
                            {nutritionalData.map((data, index) => (
                                <li key={index}>
                                    <Ingredient ingredient={data} quantity={recipe.quantity[index]}/>
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
                    <button onClick={handleFavoriteClick}>
                        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;