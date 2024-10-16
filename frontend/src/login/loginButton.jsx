import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "./loginContext";

export function LoginButton() {
    const { username } = useContext(LoginContext);
    if (!username) {
        return <Link to={"http://localhost:8080/"}>Log in</Link>;
    }
    else {
        return <p>Welcome, {username}!</p>;
    }
    return null;
}