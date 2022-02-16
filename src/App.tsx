import React, { useState } from 'react';
import { QuestionCard } from './components/questionCard/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)


  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));
  // console.log(questions);

  const startQuiz = async () => {
      setLoading(true);
      setGameOver(false);
      try {
        const newQuestions  = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          Difficulty.MEDIUM
        )

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
        const answer =  e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;

        if (correct) setScore(prev => prev + 1);

        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer
        }

        setUserAnswers((prev) => [...prev, answerObject])
      }
  }

  const nextQuestion = () => {
    const next = number + 1;

    if (next === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(next)
    }
  }

  return (
    <>
      <div className="App">
        <h1>Quiz</h1>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startQuiz} >
              Start
            </button>
          ) : null
        }
        {!gameOver ? <p className='score'>Score: </p> : null}
        {loading && <p>Loading ...</p>}
        { !loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalNumberOfQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
        />
        )}
        {
          !gameOver && !loading && userAnswers.length !== TOTAL_QUESTIONS - 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
              next
            </button>
          ) : null
        }
      </div>
    </>
  );
}

