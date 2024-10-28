import './App.css';
import * as React from 'react';
import DataFetchComponent from './components/DataFetchComponent.tsx';
// @ts-ignore
import { LoginButton } from "./login/loginButton";
//import { LoginContext } from "./login/loginContext";
// @ts-ignore
import {LoginProvider} from "./login/loginContext";
import FetchRecipes from "./components/FetchRecipes.tsx";

const App: React.FC = () => {
    return (
            <div>
                <h1>Rounds111</h1>
                <FetchRecipes />
                </div>
    );
};

export default App;