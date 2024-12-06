import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BackButton from "./BackButton.tsx";
import { Ingredient as IngredientType } from '../types/Ingredient';
import './style/CreateRecipe.css';

const allergyOptions = [
    "Gluten", "Crustaceans", "Eggs", "Fish", "Peanuts", "Soybeans", "Milk", "Nuts", "Celery", "Mustard", "Sesame", "Sulphites", "Lupin", "Molluscs"
];

const CreateRecipe: React.FC = () => {
    const [data, setData] = useState<IngredientType[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<{ value: number, label: string } | null>(null);
    const [quantity, setQuantity] = useState('');
    const [ingredients, setIngredients] = useState<{ id: number; name: string; quantity: string }[]>([]);
    const [allergyTags, setAllergyTags] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/food');
                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.error('Fetched data is not in the expected format:', result);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const options = data.map((item, index) => ({
        value: index,
        label: item.foodName
    }));

    const handleAddIngredient = () => {
        if (selectedIngredient && quantity) {
            setIngredients([...ingredients, { id: selectedIngredient.value, name: selectedIngredient.label, quantity }]);
            setSelectedIngredient(null);
            setQuantity('');
        }
    };

    const handleAllergyChange = (allergy: string) => {
        setAllergyTags(prevTags =>
            prevTags.includes(allergy)
                ? prevTags.filter(tag => tag !== allergy)
                : [...prevTags, allergy]
        );
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Name is required';
        if (!description) newErrors.description = 'Description is required';
        if (!instructions) newErrors.instructions = 'Instructions are required';
        if (ingredients.length === 0) newErrors.ingredients = 'At least one ingredient is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const ingredientIds = ingredients.map(ingredient => ingredient.id);
        const quantity = ingredients.map(ingredient => ingredient.quantity);
        try {
            const response = await fetch('http://localhost:8000/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, instructions, ingredientIds, quantity, allergyTags }),
            });
            if (response.ok) {
                setSuccessMessage('Recipe created successfully');
                setName('');
                setDescription('');
                setInstructions('');
                setIngredients([]);
                setAllergyTags([]);
                setErrors({});
                setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
            } else {
                console.error('Failed to create recipe');
            }
        } catch (error) {
            console.error('Error creating recipe', error);
        }
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#456a36',
            borderColor: '#ccc',
            color: '#d8d8d8'
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#d8d8d8'
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#456a36',
            color: '#d8d8d8'
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#0056b3' : '#456a36',
            color: '#d8d8d8',
            '&:hover': {
                backgroundColor: '#0056b3',
                color: '#d8d8d8'
            }
        })
    };

    return (
        <div className="container">
            <BackButton />
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <hr />
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <hr />
                <div>
                    <label>Instructions:</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                    {errors.instructions && <span>{errors.instructions}</span>}
                </div>
                <hr />
                <div className="ingredient-list">
                    <h4>Ingredients</h4>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <span>Ingredient: {ingredient.name}, Quantity: {ingredient.quantity}</span>
                        </div>
                    ))}
                    <div className="select-and-quantity">
                        <Select
                            options={options}
                            isSearchable
                            value={selectedIngredient}
                            onChange={setSelectedIngredient}
                            classNamePrefix="custom-select"
                            styles={customStyles}
                        />
                        <input
                            type="text"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="quantity-input"
                        />
                    </div>
                    <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                    {errors.ingredients && <span>{errors.ingredients}</span>}
                </div>
                <hr />
                <h4>Allergy Tags</h4>
                <div className="allergy-tags">
                    {allergyOptions.map((allergy, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allergyTags.includes(allergy)}
                                    onChange={() => handleAllergyChange(allergy)}
                                />
                                {allergy}
                            </label>
                        </div>
                    ))}
                </div>
                <hr />
                <button type="submit">Save Recipe</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default CreateRecipe;