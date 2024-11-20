// src/components/ShoppingList.tsx
import * as React from 'react';
import {useState} from "react";
import BackButton from "./BackButton.tsx";

interface ShoppingListProps {
    shoppingList: { id: number; name: string; quantity: number }[];
}
const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList }) => {
    const [email, setEmail] = useState('');
    const handleTest = () => {
        const text = shoppingList.map((item) => (
            item.name + ": " + item.quantity + "\n"
        ));
        console.log(text.toString());
        const data = {
            to: email,
            subject: 'Shopping List',
            text: text.toString()
        };
        const urlEncodedData = new URLSearchParams(data).toString();
        fetch('http://localhost:8000/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        });
    }
    return (
        <div>
            <BackButton />
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleTest}>send list on email</button>

            <h2>Shopping List</h2>
            <ul>
                {shoppingList.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;