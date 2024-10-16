import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface DataItem {
    searchKeywords: string[];
    calories: {
        sourceId: string;
        quantity: number;
        unit: string;
    };
    portions: {
        portionName: string;
        portionUnit: string;
        quantity: number;
        unit: string;
    }[];
    ediblePart: {
        percent: number;
        sourceId: string;
    };
    langualCodes: string[];
    energy: {
        sourceId: string;
        quantity: number;
        unit: string;
    };
    foodName: string;
    latinName: string;
    constituents: {
        sourceId: string;
        quantity?: number;
        unit?: string;
        nutrientId: string;
    }[];
    uri: string;
    foodGroupId: string;
    foodId: string;
}

const DataFetchComponent: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/food');
                const result = await response.json();
                console.log('Response result:', result);
                if (result && Array.isArray(result.foods)) {
                    setData(result.foods);
                } else {
                    console.error('Fetched data is not in the expected format:', result);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div> Still loading, I am... </div>;
    }

    const options = data.map(item => ({
        value: item.foodName,
        label: item.foodName
    }));

    const handleSelectChange = (selectedOption: any) => {
        const selectedItem = data.find(item => item.foodName === selectedOption.value);
        if (selectedItem && !selectedItems.includes(selectedItem)) {
            setSelectedItems([...selectedItems, selectedItem]);
            setQuantities({ ...quantities, [selectedItem.foodName]: 1 });
        }
    };

    const handleQuantityChange = (foodName: string, quantity: number) => {
        setQuantities({ ...quantities, [foodName]: quantity });
    };

    const removeItem = (foodName: string) => {
        setSelectedItems(prev => prev.filter(item => item.foodName !== foodName));
        const newQuantities = { ...quantities };
        delete newQuantities[foodName];
        setQuantities(newQuantities);
    };

    const calculateTotalCalories = () => {
        return selectedItems.reduce((total, item) => {
            const quantity = quantities[item.foodName] || 1;
            return total + (item.calories.quantity * quantity / 100);
        }, 0);
    };

    const calculateTotalNutrient = (nutrientId: string) => {
        return selectedItems.reduce((total, item) => {
            const quantity = quantities[item.foodName] || 1;
            const nutrient = item.constituents.find(constituent => constituent.nutrientId === nutrientId);
            return total + (nutrient ? ((nutrient.quantity??0) * quantity / 100) : 0);
        }, 0);
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
            <h2>Selected Items</h2>
            <ul>
                <Select options={options} isSearchable styles={customStyles} onChange={handleSelectChange} />

                {selectedItems.map((item, index) => (
                    <li key={index}>
                        <strong>{item.foodName}</strong>
                        {item.calories.quantity * quantities[item.foodName] / 100} {item.calories.unit}
                        <input
                            type="number"
                            value={quantities[item.foodName]}
                            onChange={(e) => handleQuantityChange(item.foodName, parseInt(e.target.value))}
                            min="1"
                        />
                        <span>g</span>
                        <div>
                            <h4>Constituents:</h4>
                            <ul>
                                {item.constituents
                                    .filter(constituent => constituent.nutrientId === 'Protein' || constituent.nutrientId === 'Fett' || constituent.nutrientId === 'Karbo')
                                    .map((constituent, idx) => (
                                        <li key={idx}>
                                            {constituent.nutrientId}: {quantities[item.foodName] * (constituent.quantity ?? 0) / 100} {constituent.unit}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <button onClick={() => removeItem(item.foodName)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>Total Calories: {calculateTotalCalories()} kcal</h2>
            <h2>Total Protein: {calculateTotalNutrient('Protein')} g</h2>
            <h2>Total Fat: {calculateTotalNutrient('Fett')} g</h2>
            <h2>Total Carbs: {calculateTotalNutrient('Karbo')} g</h2>
            <h2>Data</h2>
        </div>
    );
};

export default DataFetchComponent;