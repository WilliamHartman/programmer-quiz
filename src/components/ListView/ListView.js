import * as React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';


function listJSX(quizList, quizSelect){
    //Maps through the quizzes to create JSX cards for each
    let jsx = quizList.map((quiz, index) => {
        //Filters out quizzes with no questions as per instructions
        if(quiz.num_questions > 0){
            return(
                <Card key={quiz.title} elevation={2} className='quiz-card'>
                    <h2 style={{marginTop: '10px'}}>{quiz.title}</h2>
                    {quiz.score === null ? 
                         <Chip label="Take Quiz" variant="outlined" onClick={() => quizSelect(index)} /> :
                         <div>Score: {quiz.score}/{quiz.num_questions}</div>
                    } 
                </Card>
            )
        }
    })
    return jsx
}
export default function ListView({quizList, quizSelect}){
    return(
        <div className="ListView-container">
            {listJSX(quizList, quizSelect)}
        </div>
    )
}