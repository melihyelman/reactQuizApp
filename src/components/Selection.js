import React from 'react';
import { useState } from 'react';
import { useCategory } from '../context/categoryContext';
import { useQuestion } from '../context/questionContext';

function Selection({ setSelectionSection }) {
    const { categories, currentCategoryId, setCurrentCategoryId } = useCategory();
    const [difficulty, setDifficulty] = useState('medium');
    const [amount, setAmount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(3);

    const { getQuestions } = useQuestion();

    const handleCloseDetails = (e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.removeAttribute("open")
    }

    const handleClick = () => {
        setLoading(true);
        getQuestions(currentCategoryId, amount, difficulty);
        const timer = setInterval(() => {
            setCounter(prev => --prev)
        }, 1000);

        const loadingTimer = setTimeout(() => {
            setLoading(false)
            setSelectionSection(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(loadingTimer);
        }

    }

    return (
        <>
            <div className='selection'>
                <div>
                    <h3>Select a category</h3>
                    <details>
                        <summary>{categories.find(category => category.id === currentCategoryId)?.name}</summary>
                        <ul>
                            {categories.map(category => <li onClick={(e) => { setCurrentCategoryId(category.id); handleCloseDetails(e) }} key={category.id} >{category.name}</li>)}
                        </ul>
                    </details>

                </div>
                <div>
                    <h3>Select a difficulty</h3>
                    <details >
                        <summary>{difficulty}</summary>
                        <ul >
                            <li onClick={(e) => { setDifficulty("easy"); handleCloseDetails(e) }}>Easy</li>
                            <li onClick={(e) => { setDifficulty("medium"); handleCloseDetails(e) }}>Medium</li>
                            <li onClick={(e) => { setDifficulty("hard"); handleCloseDetails(e) }}>Hard</li>
                        </ul>
                    </details>
                </div>
                <div>
                    <h3>Select a number of questions</h3>
                    <details>
                        <summary>{amount}</summary>
                        <ul>
                            <li onClick={(e) => { setAmount(3); handleCloseDetails(e) }}>3</li>
                            <li onClick={(e) => { setAmount(5); handleCloseDetails(e) }}>5</li>
                            <li onClick={(e) => { setAmount(7); handleCloseDetails(e) }}>7</li>
                            <li onClick={(e) => { setAmount(10); handleCloseDetails(e) }}>10</li>
                        </ul>
                    </details>
                </div>
                <button onClick={handleClick}>Next</button>
            </div >
            <div className={`loading ${loading && "open"}`}>{counter}</div>
        </>
    );
}

export default Selection;
