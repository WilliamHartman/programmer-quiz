import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import Tooltip from '@mui/material/Tooltip';

export default function QuizView({selectedQuiz, gradeQuiz, selectedQuizIndex}){
    const [userAnswers, setUserAnswers] = React.useState(Array.apply(null, Array(selectedQuiz.questions.length)).map(function(){}));

    //Build JSX of the the questions
    let questionsJSX = selectedQuiz.questions.map((question, index) => {
        let answersJSX = [];
        //If the question is not multi answer, map through the answers and build JSX variable using radio buttons
        if(!question.multi_answer){
            let nonMultiAnswers = question.answers.map((answer, aIndex) => {
                return (
                    <FormControlLabel value={answer.value} control={<Radio />} label={answer.text} key={aIndex} onChange={(event) => {
                        let newUA = userAnswers;
                        newUA[index] = answer.value
                        setUserAnswers([...newUA])
                    }}/>
                )
            })
            //Put answers inside of a radio group
            answersJSX = <RadioGroup>{nonMultiAnswers}</RadioGroup>
        //If the question is  multi answer, map through the answers and build JSX variable using checkboxes
        } else {
            let multiAnswers = question.answers.map((answer, aIndex) => {
                return (
                        <FormControlLabel control={<Checkbox />} value={answer.value} label={answer.text} key={aIndex} onChange={(event) => {
                            //If the checkbox is clicked and not is false, this means we need to delete that answer from our userAnswers
                            if(event.target.checked === false){
                                let newUA = userAnswers;
                                let deleteIndex = userAnswers[index].indexOf(aIndex)
                                newUA[index].splice(deleteIndex, 1)
                                setUserAnswers([...newUA])
                            } else {
                                let newUA = userAnswers;
                                newUA[index] = Array.isArray(userAnswers[index]) ? [...userAnswers[index], answer.value] : [answer.value]
                                setUserAnswers([...newUA])
                            }
                        }}/>
                )
            })
            answersJSX = <FormGroup>{multiAnswers}</FormGroup>
        }
        //Return of each question inside of a tooltip
        return (
            <div key={index} style={{marginTop: '25px'}}>
                <Tooltip title={question.multi_answer ? 'Select multiple answers' : 'Select one answer'} placement="top-start">
                <h3>{question.text}</h3>
                </Tooltip>
                {answersJSX}
            </div>
        )
    })

    return(
        <div className="QuizView-container">
            <h2>{selectedQuiz.title}</h2>
            {questionsJSX}
            <Button variant="contained" style={{marginTop: '20px'}} disabled={userAnswers.filter((ans) => ans === undefined).length > 0} onClick={() => {
                gradeQuiz(selectedQuizIndex, userAnswers)
            }}>
                Submit
            </Button>
        </div>
    )
}