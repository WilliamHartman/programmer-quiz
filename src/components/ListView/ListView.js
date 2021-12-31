import * as React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';


function listJSX(quizList, quizSelect){
    let jsx = quizList.map((quiz, index) => {
        return(
            <Card key={quiz.title} elevation={2}>
                <h3>{quiz.title}</h3>
                <div># Qs: {quiz.num_questions}</div>
                <div>Score: {quiz.score === null ? 'N/A' : quiz.score}</div>
                <Chip label="Take Quiz" variant="outlined" onClick={() => quizSelect(index)} />
            </Card>
        )
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