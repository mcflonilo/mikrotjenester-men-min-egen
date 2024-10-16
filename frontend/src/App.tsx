import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataFetchComponent from './components/DataFetchComponent.tsx';
import Login from './components/Login'; // Assuming you have a Login component
// @ts-ignore
import { LoginButton } from "./login/loginButton";
import UserInfo from "./components/UserInfo.tsx";
//import { LoginContext } from "./login/loginContext";
// @ts-ignore
import {LoginProvider} from "./login/loginContext";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <h1>Rounds111</h1>
                <LoginProvider>
                    <UserInfo />
                    <LoginButton />
                </LoginProvider>
                <UserInfo />
                <LoginButton />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<DataFetchComponent/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;