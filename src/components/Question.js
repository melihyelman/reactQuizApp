import { useEffect, useState } from 'react';

function Question({ setCorrectAnswerCount, setQueue, question }) {
    const [answers, setAnswers] = useState(question.answers);
    const [answerUser, setAnswerUser] = useState('');
    const [next, setNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const [click, setClick] = useState(false);
    const [counter, setCounter] = useState(3)

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

    const handleClick = (answer, e) => {

        if (!click) {
            setAnswerUser(answer);
            e.target.className = "pending"

            if (answer.correct) {
                setCorrectAnswerCount(prev => ++prev)
            }
            setLoading(true)
            const counter = setInterval(() => {
                setCounter(prev => --prev)
            }, 1000);
            const timer = setTimeout(() => {
                if (!answer.correct) {
                    e.target.className = "wrong"
                } else if (answer.correct) {
                    e.target.className = "success";
                }
                setNext(true);
                setLoading(false)
            }, 3000);
            setClick(true);

            return () => {
                clearTimeout(timer);
                clearInterval(counter);
            }
        }
    }

    return <div className='question'>

        <h4>{question.question}</h4>
        <ul>
            {answers && answers.map((answer, id) =>
                <li className={`${next && answer.correct ? "success" : ""}`} onClick={(e) => handleClick(answer, e)} key={answer.id}>
                    <span>{helperLetter(id)}</span>{answer.text}<span></span></li>)}

        </ul>
        {next && <button onClick={() => setQueue(prev => ++prev)} className='btn'>Next</button>}
        <div className={`loading ${loading ? "open" : ""}`} >{counter}</div>
    </div >;
}

export default Question;
