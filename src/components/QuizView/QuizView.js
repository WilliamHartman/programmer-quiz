import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel'; 

export default function QuizView({selectedQuiz, gradeQuiz, selectedQuizIndex}){
    const [userAnswers, setUserAnswers] = React.useState(Array(selectedQuiz.questions.length));

    let questionsJSX = selectedQuiz.questions.map((question, index) => {
        let answersJSX = [];
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
            answersJSX = <RadioGroup>{nonMultiAnswers}</RadioGroup>
        } else {
            let multiAnswers = question.answers.map((answer, aIndex) => {
                return (
                        <FormControlLabel control={<Checkbox />} value={answer.value} label={answer.text} key={aIndex} onChange={(event) => {
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
        return (
            <div key={index}>
                <h3>{question.text}</h3>
                {answersJSX}
            </div>
        )
    })

    // if(!shuffledFlag){
    //     setShuffledFlag(true)
    // }
    
    console.log(userAnswers)

    return(
        <div className="QuizView-container">
            <h2>{selectedQuiz.title}</h2>
            {questionsJSX}
            <Button variant="contained" style={{marginTop: '20px'}} onClick={() => {
                gradeQuiz(selectedQuizIndex, userAnswers)
            }}>
                Submit
            </Button>
        </div>
    )
}