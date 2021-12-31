import React, { Component } from 'react';
import './App.css';
import './scss/branding-sample.scss'
import {quiz_api} from './quiz-api';
import ListView from './components/ListView/ListView.js'
import QuizView from './components/QuizView/QuizView.js'
import ResultsView from './components/ResultsView/ResultsView.js'

class App extends Component {
  constructor(){
      super();

      this.state = {
        currentView: 'list',
        quizList: [],
        selectedQuiz: null,
        selectedQuizIndex: null,
      }
      this.quizSelect = this.quizSelect.bind(this);
      this.gradeQuiz = this.gradeQuiz.bind(this);
  }

  componentDidMount() {
    this.fetchAllQuiz()
  }

  fetchAllQuiz(){
    quiz_api.getAllQuizMeta().then((result)=>{
      this.setState({quizList: result})
    })
  }

  shuffleAnswers(questions){
    console.log(questions)
    
    let newQuestions = questions.map((question, index) => {
        console.log(question)
        let newAnswers = question.answers.map((ans, i) => {
            return {text: ans, value: i}
        })
        console.log(newAnswers)
        for (let i = newAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newAnswers[i], newAnswers[j]] = [newAnswers[j], newAnswers[i]];
        }
        console.log(newAnswers)
        question.answers = newAnswers
        console.log(question)
        return question
    })
    console.log(newQuestions)
}

  quizSelect(index){
    quiz_api.getQuizById(index).then((result) => {
      this.shuffleAnswers(result.questions)
      this.setState({selectedQuiz: result, selectedQuizIndex: index, currentView: 'quiz'})
    })
  }

  gradeQuiz(quizIndex, answers){
    quiz_api.gradeQuiz(quizIndex, answers).then((result) => {
      console.log(result)
      this.fetchAllQuiz()
      // this.setState({currentView: ''})
    })
  }
  
  render(){
    console.log(this.state.selectedQuiz)
    return (
      <div className="App">
        <header>
          <h1 onClick={() => this.setState({currentView: 'list'})}>Turion Quiz</h1>
          {
            this.state.currentView === 'list' 
            ? <ListView quizList={this.state.quizList} quizSelect={this.quizSelect}/> 
            : this.state.currentView === 'quiz' 
            ? <QuizView selectedQuiz={this.state.selectedQuiz} selectedQuizIndex={this.state.selectedQuizIndex} gradeQuiz={this.gradeQuiz}/> 
            : <ResultsView />
          }
        </header>

      </div>
    );
  }
}

export default App;
