
function Result({ setSelectionSection, setCorrectAnswerCount, setQueue, correctAnswerCount }) {
    return <div className='result'>
        <img src='/result.svg' alt='result.svg' />
        <div>
            <h3>Results</h3>
            <p>You got <span>{correctAnswerCount} </span>correct answers</p>
        </div>
        <button onClick={() => { setSelectionSection(true); setCorrectAnswerCount(0); setQueue(0) }}>Try Again</button>
    </div>;
}

export default Result;
