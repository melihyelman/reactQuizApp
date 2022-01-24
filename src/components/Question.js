import { useEffect, useRef, useState } from 'react';
import { shuffleArray } from '../helper';

function Question({ setCorrectAnswerCount, setQueue, question }) {
    const [answers, setAnswers] = useState([]);
    const [next, setNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const [click, setClick] = useState(false);
    const [counter, setCounter] = useState(3);

    useEffect(() => {
        const unShuffleAnswers = [
            {
                text: question.incorrect_answers[0],
                correct: false
            },
            {
                text: question.incorrect_answers[1],
                correct: false
            },
            {
                text: question.incorrect_answers[2],
                correct: false
            },
            { text: question.correct_answer, correct: true }];
        setAnswers(shuffleArray(unShuffleAnswers));
    }, [question])

    const helperLetter = (id) => {
        if (id === 0) {
            return "A";
        } else if (id === 1) {
            return "B"
        } else if (id === 2) {
            return "C"
        } else {
            return "D"
        }
    }

    const ref = useRef();

    const clearClassName = () => {
        for (let i = 0; i < 4; i++) {
            ref.current.children[i].className = "";
        }
    }

    const handleClick = (answer, e) => {

        if (!click) {
            e.target.className = "pending"
            if (answer.correct) {
                setCorrectAnswerCount(prev => ++prev)
            }
            setLoading(true)
            const counter = setInterval(() => {
                setCounter(prev => prev > 0 ? --prev : 0)
            }, 1000);
            const timer = setTimeout(() => {
                if (!answer.correct) {
                    e.target.className = "wrong"
                } else if (answer.correct) {
                    e.target.className = "success";
                }
                setNext(true);
                setLoading(false)
                clearInterval(counter);
            }, 3000);
            setClick(true);
        }
    }

    return <div className='question'>

        <h4>{question.question}</h4>
        <ul ref={ref}>
            {answers && answers.map((answer, id) =>
                <li className={`${next && answer.correct ? "success" : ""} `} onClick={(e) => handleClick(answer, e)} key={id}>
                    <span>{helperLetter(id)}</span>{answer.text}<span></span></li>)}

        </ul>
        {next && <button onClick={() => { clearClassName(); setClick(false); setCounter(3); setNext(false); setTimeout(() => setQueue(prev => ++prev), 100) }} className='btn'>Next</button>}
        <div className={`loading ${loading ? "open" : ""}`} >{counter}</div>
    </div >;
}

export default Question;
