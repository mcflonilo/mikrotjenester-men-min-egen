import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import BackButton from './BackButton';

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
    allergyTags: string[];
}

interface RecipePageProps {
    handleAddToShoppingList: (newRecipe: Recipe) => void
}

const RecipePage: React.FC<RecipePageProps> = ({handleAddToShoppingList}: RecipePageProps) => {
    const {id} = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:8000/api/recipe/${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            <BackButton/>
            <RecipeDetails recipe={recipe} handleAddToShoppingList={handleAddToShoppingList} />
        </div>
    );
};

export default RecipePage;