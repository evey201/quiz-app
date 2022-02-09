import React from 'react';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
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
            <div>
                <p className='number'>
                    Question: {questionNumber} / {totalNumberOfQuestions}
                </p>
                <p dangerouslySetInnerHTML={{ __html: question }} />
                <div>
                    {answers.map(answer => (
                        <div>
                            <button disabled={userAnswer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}