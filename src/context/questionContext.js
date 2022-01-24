import axios from 'axios';
import { createContext, useState, useContext, useEffect } from "react";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async (categoryId, amount, difficulty) => {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}&category=${categoryId}`);
        setQuestions(data.results);
    }

    return (
        <QuestionContext.Provider value={{ questions, setQuestions, getQuestions }}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestion = () => useContext(QuestionContext);