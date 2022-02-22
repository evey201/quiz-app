import React from 'react';
import { AnswerObject } from '../../App'
import { ButtonWrapper, Wrapper } from './questionCard.styled';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalNumberOfQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({  
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalNumberOfQuestions
}) => {
    return (
        <>
            <Wrapper>
                <p className='number'>
                    Question: {questionNumber} / {totalNumberOfQuestions}
                </p>
                <p dangerouslySetInnerHTML={{ __html: question }} />
                <div>
                    {answers.map(answer => (
                        <ButtonWrapper
                            key={answer}
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer}
                        >
                            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </button>
                        </ButtonWrapper>
                    ))}
                </div>
            </Wrapper>
        </>
    )
}