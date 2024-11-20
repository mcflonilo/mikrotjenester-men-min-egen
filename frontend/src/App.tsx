// src/App.tsx
import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FetchRecipes from './components/FetchRecipes';
import CreateRecipe from './components/CreateRecipe';
import { NavProvider, useNav } from './NavContext';
import ShoppingList from "./components/ShoppingList.tsx";
import {useState} from "react";

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
    const [shoppingList, setShoppingList] = useState<{ id: number; name: string; quantity: number }[]>([]);

    const handleLinkClick = () => {
        setShowNav(false);
    };

    const handleAddToShoppingList = (newItems: { id: number; name: string; quantity: number }[]) => {
        setShoppingList([...shoppingList.filter(item => !newItems.some(newItem => newItem.name === item.name)), ...newItems]);
    };

    return (
        <div>
            {showNav && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/recipes" onClick={handleLinkClick}>Browse Recipes</Link>
                        </li>
                        <li>
                            <Link to="/create" onClick={handleLinkClick}>Create Recipe</Link>
                        </li>
                        <li>
                            <Link to="/shopping-list" onClick={handleLinkClick}>Shopping List</Link>
                        </li>
                    </ul>
                </nav>
            )}
            <Routes>
                <Route path="/recipes" element={<FetchRecipes handleAddToShoppingList={handleAddToShoppingList} />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/shopping-list" element={<ShoppingList shoppingList={shoppingList} />} />
            </Routes>
        </div>
    );
};

export default App;