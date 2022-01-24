import axios from 'axios';
import { createContext, useState, useContext, useEffect } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then(res => setCategory(res.data.trivia_categories));
    }, []);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);