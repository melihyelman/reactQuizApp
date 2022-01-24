import axios from 'axios';
import { createContext, useState, useContext, useEffect } from "react";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async (category, amount, difficulty) => {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy&category=22`)
        setQuestions(data.results);
    }

    return (
        <QuestionContext.Provider value={{ questions, setQuestions, getQuestions }}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestion = () => useContext(QuestionContext);