import React, { MouseEvent, useState } from 'react';
import { QuestionCard } from './components/questionCard/QuestionCard';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  const TOTAL_QUESTIONS = 10;

  const startQuiz = async () => {

  }

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <>
      <div className="App">
        <h1>Quiz</h1>
        <button className='start' onClick={startQuiz} >
          Start
        </button>
        <p className='score'>Score: </p>
        <p>Loading ...</p>
        <QuestionCard
            questionNumber={number + 1}
            totalNumberOfQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
        />
        <button className='next' onClick={nextQuestion}>
          next
        </button>
      </div>
    </>
  );
}

