import React, { useState } from 'react';
import { Ingredient as IngredientType } from '../types/Ingredient';
import './style/Ingredient.css';

interface IngredientProps {
    ingredient: IngredientType;
    quantity?: number;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, quantity }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDetailsToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDetails(!showDetails);
    };

    const getNutrient = (nutrientId: string) => {
        const nutrient = ingredient.constituents.find(constituent => constituent.nutrientId === nutrientId);
        return nutrient ? `${nutrient.quantity} ${nutrient.unit}` : 'N/A';
    };

    return (
        <div className="ingredient-container" onClick={handleToggle}>
            <div className="ingredient-header">
                <h2>{ingredient.foodName}</h2>
                {quantity !== undefined && (
                    <span>Quantity: {quantity} grams</span>
                )}
            </div>
            {isExpanded && (
                <div className="ingredient-details">
                    <h3>Makros per 100 grams</h3>
                    <ul>
                        <li>Calories: {ingredient.calories.quantity} {ingredient.calories.unit}</li>
                        <li>Protein: {getNutrient('Protein')}</li>
                        <li>Carbohydrates: {getNutrient('Karbo')}</li>
                        <li>Fat: {getNutrient('Fett')}</li>
                    </ul>
                    <button onClick={handleDetailsToggle}>
                        {showDetails ? 'Hide Detailed Nutrition' : 'Show Detailed Nutrition'}
                    </button>
                    {showDetails && (
                        <div>
                            <h3>Detailed Nutrition</h3>
                            <ul>
                                {ingredient.constituents.map((constituent, index) => (
                                    <li key={index}>
                                        {constituent.nutrientId}: {constituent.quantity} {constituent.unit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Ingredient;