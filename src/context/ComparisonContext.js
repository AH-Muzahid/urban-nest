'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('urbanNestCompareList');
        if (saved) {
            setCompareList(JSON.parse(saved));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('urbanNestCompareList', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (property) => {
        if (compareList.find(p => p._id === property._id)) {
            toast.error('Property already in comparison list');
            return;
        }
        if (compareList.length >= 3) {
            toast.error('You can compare up to 3 properties');
            return;
        }
        setCompareList([...compareList, property]);
        toast.success('Added to comparison');
    };

    const removeFromCompare = (propertyId) => {
        setCompareList(compareList.filter(p => p._id !== propertyId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <ComparisonContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
};
