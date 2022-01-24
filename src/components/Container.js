import { useState } from 'react';
import Selection from './Selection';
import Question from './Question';
import Result from './Result';
import { useQuestion } from '../context/questionContext';


function Container() {
    const [queue, setQueue] = useState(0);
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [selectionSection, setSelectionSection] = useState(true);
    const { questions } = useQuestion();

    return <div className='container'>
        {selectionSection && <Selection setSelectionSection={setSelectionSection} />}
        {!selectionSection && questions.slice(queue, queue + 1)?.map((question, id) => <Question key={id} setCorrectAnswerCount={setCorrectAnswerCount} setQueue={setQueue} question={question} />)
        }
        {!selectionSection && !questions.slice(queue, queue + 1).length && <Result setCorrectAnswerCount={setCorrectAnswerCount} setSelectionSection={setSelectionSection} setQueue={setQueue} correctAnswerCount={correctAnswerCount} />}

    </div >;
}

export default Container;
