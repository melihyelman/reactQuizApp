import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import { CategoryProvider } from './context/categoryContext';
import { QuestionProvider } from './context/questionContext';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <QuestionProvider>
      <CategoryProvider>
        <Container />
      </CategoryProvider>
    </QuestionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);