import * as React from 'react';
import './ResultsView.css'
import Confetti from 'react-confetti'
import graduate from '../../graduate.png'
import Button from '@mui/material/Button';

export default function ResultsView({selectedQuiz, score, navToListView}){
    return(
        <div className="RV-container">
            <div className='RV-top-container'>
                {score / selectedQuiz.questions.length === 1 ? <Confetti /> : null}
                <img src={graduate} alt='graduate' style={{height: '250px'}}/>
                <div className='RV-right'>
                    <div className=''>
                        <h2>Your Grade:</h2>
                        <div className='RV-score-cont'>
                            <div className='RV-score'>
                                {`🥇 ${score}/${selectedQuiz.questions.length}`}
                            </div>
                            <div className='RV-score-circle'>{`${(score/selectedQuiz.questions.length)*100}%`}</div>
                        </div>
                    </div>
                </div>
            </div>
            {score / selectedQuiz.questions.length === 1 ? <h2 style={{marginTop: '15px'}}>Good Job!</h2> : null}
            <Button variant="contained" style={{marginTop: '15px'}} onClick={() => navToListView()}>More Quizzes</Button>
        </div>
    )
}