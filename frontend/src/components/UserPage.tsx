import React, {useEffect, useState} from 'react';
import {useUser} from './UserContext';
import BackButton from "./BackButton.tsx";
import RecipeDetails from "./RecipeDetails.tsx";

interface Favorite {
    id: number;
    recipeId: number;
    userId: string;
}

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
    allergyTags: string[];
}

interface UserPageProps {
    handleAddToShoppingList: (newRecipe: Recipe) => void;
}

const UserPage: React.FC<UserPageProps> = ({handleAddToShoppingList}) => {
    const {user} = useUser();
    const [, setFavorites] = useState<Favorite[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:8000/api/favorites?userId=${user.email}`);
            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
                fetchRecipeDetails(data);
            } else {
                console.error('Failed to fetch favorites');
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const fetchRecipeDetails = async (favorites: Favorite[]) => {
        try {
            const recipeDetails = await Promise.all(favorites.map(async (favorite) => {
                const response = await fetch(`http://localhost:8000/api/recipe/${favorite.recipeId}`);
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(`Failed to fetch recipe details for recipe ID: ${favorite.recipeId}`);
                    return null;
                }
            }));
            setRecipes(recipeDetails.filter(recipe => recipe !== null));
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    return (
        <div>
            <BackButton/>
            <h2>User Info</h2>
            <p>Email: {user?.email}</p>
            <h2>Favorites</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <RecipeDetails recipe={recipe} handleAddToShoppingList={handleAddToShoppingList}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;