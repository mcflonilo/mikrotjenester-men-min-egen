import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BackButton from "./BackButton.tsx";
import { Ingredient as IngredientType } from '../types/Ingredient';

const CreateRecipe: React.FC = () => {
    const [data, setData] = useState<IngredientType[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<{ value: number, label: string } | null>(null);
    const [quantity, setQuantity] = useState('');
    const [ingredients, setIngredients] = useState<{ id: number; name: string; quantity: string }[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Name is required';
        if (!description) newErrors.description = 'Description is required';
        if (!instructions) newErrors.instructions = 'Instructions are required';
        if (ingredients.length === 0) newErrors.ingredients = 'At least one ingredient is required';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const ingredientIds = ingredients.map(ingredient => ingredient.id);
        const quantity = ingredients.map(ingredient => ingredient.quantity);
        fetch('http://localhost:8000/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, instructions, ingredientIds, quantity }),
        });
        console.log({ name, description, instructions, ingredientIds, quantity });
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            fontSize: '16px',
            padding: '5px',
        }),
        menu: (provided: any) => ({
            ...provided,
            fontSize: '16px',
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#e9ecef' : null,
            color: state.isSelected ? 'white' : 'black',
            padding: '10px',
        }),
    };

    return (
        <div>
            <BackButton />
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                    {errors.instructions && <span style={{ color: 'red' }}>{errors.instructions}</span>}
                </div>
                <div>
                    <h4>Ingredients</h4>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <span>Ingredient: {ingredient.name}, Quantity: {ingredient.quantity}</span>
                        </div>
                    ))}
                    <Select
                        options={options}
                        isSearchable
                        styles={customStyles}
                        value={selectedIngredient}
                        onChange={setSelectedIngredient}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                    {errors.ingredients && <span style={{ color: 'red' }}>{errors.ingredients}</span>}
                </div>
                <button type="submit">Save Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;