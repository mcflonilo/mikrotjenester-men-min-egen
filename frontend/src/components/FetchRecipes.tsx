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
    allergyTags: string[];
}

interface FetchRecipesProps {
    handleAddToShoppingList: (newRecipe: Recipe) => void;
}

const allergyOptions = [
    "Gluten", "Crustaceans", "Eggs", "Fish", "Peanuts", "Soybeans", "Milk", "Nuts", "Celery", "Mustard", "Sesame", "Sulphites", "Lupin", "Molluscs"
];

const FetchRecipes: React.FC<FetchRecipesProps> = ({ handleAddToShoppingList }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [allergyFilters, setAllergyFilters] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8000/api/recipe')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        filterRecipes();
    }, [searchTerm, allergyFilters, recipes]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAllergyChange = (allergy: string) => {
        setAllergyFilters(prevFilters =>
            prevFilters.includes(allergy)
                ? prevFilters.filter(tag => tag !== allergy)
                : [...prevFilters, allergy]
        );
    };

    const filterRecipes = () => {
        let filtered = recipes;

        if (searchTerm) {
            filtered = filtered.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (allergyFilters.length > 0) {
            filtered = filtered.filter(recipe =>
                !allergyFilters.some(allergy => recipe.allergyTags.includes(allergy))
            );
        }

        setFilteredRecipes(filtered);
    };

    return (
        <div>
            <BackButton />
            <h2>Recipes</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search recipes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div>
                    <h4>Filter by Allergies</h4>
                    {allergyOptions.map((allergy, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allergyFilters.includes(allergy)}
                                    onChange={() => handleAllergyChange(allergy)}
                                />
                                {allergy}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {loading ? (
                <div>Loading recipes...</div>
            ) : (
                <ul>
                    {filteredRecipes.map(recipe => (
                        <li key={recipe.id}>
                            <RecipeDetails recipe={recipe} handleAddToShoppingList={handleAddToShoppingList} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FetchRecipes;