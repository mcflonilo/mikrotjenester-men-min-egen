// src/App.tsx
import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FetchRecipes from './components/FetchRecipes';
import CreateRecipe from './components/CreateRecipe';
import { NavProvider, useNav } from './NavContext';
import ShoppingList from "./components/ShoppingList";
import { useEffect, useState } from "react";
import Login from "./components/Login";

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
}

const App: React.FC = () => {
    return (
        <NavProvider>
            <Router>
                <AppContent />
            </Router>
        </NavProvider>
    );
};

const AppContent: React.FC = () => {
    const { showNav, setShowNav } = useNav();
    const [shoppingList, setShoppingList] = useState<Recipe[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/login', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data:', userData);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLinkClick = () => {
        setShowNav(false);
    };

    const handleAddToShoppingList = (newRecipe: Recipe) => {
        setShoppingList([...shoppingList.filter(recipe => recipe.id !== newRecipe.id), newRecipe]);
    };

    const handleRemoveFromShoppingList = (recipeId: number) => {
        setShoppingList(shoppingList.filter(recipe => recipe.id !== recipeId));
    };

    return (
        <div>
            {showNav && (
                <nav>
                    <ul>
                        <Login user={user} setUser={setUser} />
                        <li>
                            <Link to="/recipes" onClick={handleLinkClick}>Browse Recipes</Link>
                        </li>
                        <li>
                            <Link to="/create" onClick={handleLinkClick}>Create Recipe</Link>
                        </li>
                        <li>
                            <Link to="/shopping-list" onClick={handleLinkClick}>Meal plan</Link>
                        </li>
                    </ul>
                </nav>
            )}
            <Routes>
                <Route path="/recipes" element={<FetchRecipes handleAddToShoppingList={handleAddToShoppingList} />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/shopping-list" element={<ShoppingList shoppingList={shoppingList} handleRemoveFromShoppingList={handleRemoveFromShoppingList} user={user} />} />
            </Routes>
        </div>
    );
};

export default App;