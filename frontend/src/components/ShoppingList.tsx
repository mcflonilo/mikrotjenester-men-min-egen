import React, { useState } from 'react';
import BackButton from './BackButton';

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

interface ShoppingListProps {
    shoppingList: Recipe[];
    handleRemoveFromShoppingList: (recipeId: number) => void;
    user: any;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList: initialShoppingList, handleRemoveFromShoppingList, user }) => {
    const [shoppingList, setShoppingList] = useState<Recipe[]>(initialShoppingList);
    const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [returnedShoppingList, setReturnedShoppingList] = useState<{ [key: number]: number } | null>(null);
    const [ingredients, setIngredients] = useState<NutritionalData[]>([]);

    const handleRecipeClick = async (recipeId: number) => {
        setExpandedRecipeId(expandedRecipeId === recipeId ? null : recipeId);
        if (expandedRecipeId !== recipeId) {
            const recipe = shoppingList.find(recipe => recipe.id === recipeId);
            if (recipe) {
                const response = await fetch(`http://localhost:8000/api/food/${recipe.ingredientIds.join(',')}`);
                const ingredientData = await response.json();
                setIngredients(ingredientData);
            }
        }
    };

    const handleQuantityChange = (recipeId: number, newQuantity: number) => {
        setQuantities({
            ...quantities,
            [recipeId]: newQuantity,
        });
    };

    const handleRemoveRecipe = (recipeId: number) => {
        handleRemoveFromShoppingList(recipeId);
        setShoppingList(prevShoppingList => prevShoppingList.filter(recipe => recipe.id !== recipeId));
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[recipeId];
            return newQuantities;
        });
        setExpandedRecipeId((prevExpandedRecipeId) => (prevExpandedRecipeId === recipeId ? null : prevExpandedRecipeId));
    };

    const handleCreateCompleteShoppingList = async (sendToRabbitMQ: boolean) => {
        try {
            const ingredientIds = shoppingList.flatMap(recipe => recipe.ingredientIds);
            const response = await fetch(`http://localhost:8000/api/food/${ingredientIds.join(',')}`);
            const ingredientData = await response.json();
            const recipeQuantity = shoppingList.flatMap(recipe => Array.isArray(recipe.quantity) ? recipe.quantity.map(q => q * (quantities[recipe.id] || 1)) : [recipe.quantity * (quantities[recipe.id] || 1)]);            const combinedList = recipeQuantity.map((quantity, index) => {
                const ingredient = ingredientData[index];
                if (!ingredient) {
                    console.warn(`No ingredient data found for index ${index}`);
                    return null;
                }
                return {
                    foodName: ingredient.foodName,
                    quantity: quantity
                };
            }).filter(item => item !== null);

            const shoppingListResponse = await fetch(`http://localhost:8000/api/shoppinglist?sendToRabbitMQ=${sendToRabbitMQ}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: combinedList, to: user ? user.email : 'guest@example.com', subject: 'Shopping List' }),
            });
            if (!shoppingListResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await shoppingListResponse.json();
            console.log('Shopping list created:', data);
            setReturnedShoppingList(data);
        } catch (error) {
            console.error('Error creating shopping list:', error);
        }
    };

    return (
        <div>
            <BackButton />
            <h2>Meal Plan</h2>
            {shoppingList.length === 0 ? (
                <p>No meals planned.</p>
            ) : (
                <div>
                    <ul>
                        {shoppingList.map(recipe => (
                            <li key={recipe.id}>
                                <h3 onClick={() => handleRecipeClick(recipe.id)}>{recipe.name}</h3>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[recipe.id] || 1}
                                    onChange={(e) => handleQuantityChange(recipe.id, parseInt(e.target.value))}
                                />
                                <button onClick={() => handleRemoveRecipe(recipe.id)}>Remove</button>
                                {expandedRecipeId === recipe.id && (
                                    <div>
                                        <ul>
                                            {ingredients.map((data, index) => (
                                                <li key={index}>
                                                    <p>{data.foodName} {recipe.quantity[index] * (quantities[recipe.id] || 1)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleCreateCompleteShoppingList(false)}>Create Complete Shopping List</button>
                    {user ? (
                        <button onClick={() => handleCreateCompleteShoppingList(true)}>Create and Send as Email</button>
                    ) : (
                        <div>
                            <button disabled>Create and Send as Email</button>
                            <p>You need to log in to send to email</p>
                        </div>
                    )}
                </div>
            )}
            {returnedShoppingList && (
                <div>
                    <h2>Returned Shopping List</h2>
                    <ul>
                        {Object.entries(returnedShoppingList).map(([foodName, quantity]) => (
                            <li key={foodName}>
                                <p>{foodName}: {quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShoppingList;