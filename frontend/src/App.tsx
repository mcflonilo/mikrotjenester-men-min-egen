// src/App.tsx
import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FetchRecipes from './components/FetchRecipes';
import CreateRecipe from './components/CreateRecipe';
import { NavProvider, useNav } from './NavContext';

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

    const handleLinkClick = () => {
        setShowNav(false);
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
                    </ul>
                </nav>
            )}
            <Routes>
                <Route path="/recipes" element={<FetchRecipes />} />
                <Route path="/create" element={<CreateRecipe />} />
            </Routes>
        </div>
    );
};

export default App;