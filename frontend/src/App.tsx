import './components/style/App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FetchRecipes from './components/FetchRecipes';
import CreateRecipe from './components/CreateRecipe';
import { NavProvider } from './NavContext';
import ShoppingList from "./components/ShoppingList";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { UserProvider, useUser } from './components/UserContext';
import UserPage from "./components/UserPage";
import RecipePage from "./components/RecipePage";

interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredientIds: number[];
    quantity: number[];
}

const AppContent: React.FC = () => {
    const { user, setUser } = useUser();
    const [shoppingList, setShoppingList] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/login', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [setUser]);

    const handleAddToShoppingList = (newRecipe: Recipe) => {
        setShoppingList([...shoppingList.filter(recipe => recipe.id !== newRecipe.id), newRecipe]);
    };

    const handleRemoveFromShoppingList = (recipeId: number) => {
        setShoppingList(shoppingList.filter(recipe => recipe.id !== recipeId));
    };

    return (
        <div>
            <nav className="side">
                <ul>
                    <Login />
                    <li>
                        <Link to="/recipes">Browse Recipes</Link>
                    </li>
                    <li>
                        <Link to="/create">Create Recipe</Link>
                    </li>
                    <li>
                        <Link to="/shopping-list">Meal plan</Link>
                    </li>
                    {user && (
                        <li>
                            <Link to="/user">User</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route path="/recipes" element={<FetchRecipes handleAddToShoppingList={handleAddToShoppingList} />} />
                    <Route path="/create" element={<CreateRecipe />} />
                    <Route path="/shopping-list" element={<ShoppingList shoppingList={shoppingList} handleRemoveFromShoppingList={handleRemoveFromShoppingList} user={user} />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/recipe/:id" element={<RecipePage handleAddToShoppingList={handleAddToShoppingList} />} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <NavProvider>
            <UserProvider>
                <Router>
                    <AppContent />
                </Router>
            </UserProvider>
        </NavProvider>
    );
};

export default App;