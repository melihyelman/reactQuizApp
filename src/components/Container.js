import { useState } from 'react';
import Selection from './Selection';
import Question from './Question';
import Result from './Result';

const data = [
    {
        id: 1,
        question: 'What is the capital of Turkey?',
        answers: [
            {
                id: 1,
                text: 'Vietnam',
                correct: false
            },
            {
                id: 2,
                text: 'Rome',
                correct: false
            },
            {
                id: 3,
                text: 'Paris',
                correct: false
            },
            {
                id: 4,
                text: 'Ankara',
                correct: true
            }
        ]
    },
    {
        id: 2,
        question: 'What is the biggest country in the world?',
        answers: [
            {
                id: 1,
                text: 'Russia',
                correct: true
            },
            {
                id: 2,
                text: 'China',
                correct: false
            },
            {
                id: 3,
                text: 'United States',
                correct: false
            },
            {
                id: 4,
                text: 'Canada',
                correct: false
            }
        ]
    },
    {
        id: 3,
        question: 'What is the 5th planet from the sun?',
        answers: [
            {
                id: 1,
                text: 'Earth',
                correct: false
            },
            {
                id: 2,
                text: 'Jupiter',
                correct: false
            },
            {
                id: 3,
                text: 'Neptune',
                correct: true
            },
            {
                id: 4,
                text: 'Mars',
                correct: false
            }
        ]
    },
]

function Container() {
    const [queue, setQueue] = useState(0);
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [selectionSection, setSelectionSection] = useState(true);

    return <div className='container'>
        {selectionSection && <Selection setSelectionSection={setSelectionSection} />}
        {!selectionSection && data.slice(queue, queue + 1)?.map(question => <Question key={question.id} setCorrectAnswerCount={setCorrectAnswerCount} setQueue={setQueue} question={question} />)
        }
        {!selectionSection && data.slice(queue, queue + 1).length === 0 && <Result setQueue={setQueue} correctAnswerCount={correctAnswerCount} />}

    </div >;
}

export default Container;
