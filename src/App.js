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
        score: null,
        shuffledAnswers: null
      }
      this.quizSelect = this.quizSelect.bind(this);
      this.gradeQuiz = this.gradeQuiz.bind(this);
      this.navToListView = this.navToListView.bind(this);
  }

  //On component mount, get list of all the quizzes
  componentDidMount() {
    this.fetchAllQuiz()
  }

  //The 'api' request to get quizzes, sets result to state variable
  fetchAllQuiz(){
    quiz_api.getAllQuizMeta().then((result)=>{
      this.setState({quizList: result})
    })
  }

  //Function to shuffle the answers into random order, but saves the index (so they can be graded later)
  shuffleAnswers(questions){   
    let newQuestions = questions.map((question, index) => {
        //Makes a new array of objects using the answer and its index as a value
        let newAnswers = question.answers.map((ans, i) => {
            return {text: ans, value: i}
        })
        for (let i = newAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newAnswers[i], newAnswers[j]] = [newAnswers[j], newAnswers[i]];
        }
        question.answers = newAnswers
        return question
    })
    return newQuestions
  }

  //Gets the quiz from the 'api', shuffles answers, 
  quizSelect(index){
    quiz_api.getQuizById(index).then((result) => {
      let shuffled = this.shuffleAnswers(result.questions)
      this.setState({selectedQuiz: result, selectedQuizIndex: index, currentView: 'quiz', shuffledAnswers: shuffled})
    })
  }

  //Sends the answers to the 'api' to get graded and re-feches all quizzes
  gradeQuiz(quizIndex, answers){
    quiz_api.gradeQuiz(quizIndex, answers).then((result) => {
      this.fetchAllQuiz()
      this.setState({currentView: 'results', score: result})
    })
  }

  //Navigate back to list view
  navToListView(){
    this.setState({currentView: 'list'})
  }
  
  render(){
    return (
      <div className="App">
        <header>
          <h1 onClick={() => this.setState({currentView: 'list'})}>Turion Quiz</h1>
        </header>
        {
          //Ternary router for the three views
            this.state.currentView === 'list' 
            ? <ListView quizList={this.state.quizList} quizSelect={this.quizSelect}/> 
            : this.state.currentView === 'quiz' 
            ? <QuizView selectedQuiz={this.state.selectedQuiz} selectedQuizIndex={this.state.selectedQuizIndex} gradeQuiz={this.gradeQuiz}/> 
            : <ResultsView selectedQuiz={this.state.selectedQuiz} score={this.state.score} navToListView={this.navToListView}/>
          }
      </div>
    );
  }
}

export default App;
