import axios from 'axios';
import { createContext, useState, useContext, useEffect } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(9);

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then(res => setCategories(res.data.trivia_categories));
    }, []);


    return (
        <CategoryContext.Provider value={{ currentCategoryId, setCurrentCategoryId, categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);