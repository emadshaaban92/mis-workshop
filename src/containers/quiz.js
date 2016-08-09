import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import {quizToggleLive, navigateToLiveQuiz, navigateToEditQuiz, upsertAnswer} from '../action_creators';

import QuizView from '../components/quiz_view';
import Question from './question';
import EditQuiz from './edit_quiz';


import uuid from 'node-uuid';
import R from 'ramda';

const Quiz = React.createClass({
    getInitialState: function() {
      const {questions} = this.props;
      return {
        finished: false,
        stepIndex: 0,
        answers : this.props.answers.map((ans, i)=>{
            return ans || {
                _id : "answer_" + uuid.v1(),
                question_id : questions[i]._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : questions[i].kind === 'choose_multi' ? R.repeat(false, questions[i].choices.length) : '',
                submited : false
            }
        })
      };
    },
    componentWillReceiveProps: function(nextProps){
        const answers = nextProps.questions.map((question)=>{
            return this.state.answers.find((ans)=> {return ans.question_id === question._id}) || {
                _id : "answer_" + uuid.v1(),
                question_id : question._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : question.kind === 'choose_multi' ? R.repeat(false, question.choices.length) : '',
                submited : false
            }
        });
        this.setState({answers}, ()=>{
            const answers = this.state.answers.map((answer)=>{
                return nextProps.answers.find((ans)=>{return  ans ? ans._id === answer._id & ans._rev !== answer._rev : ans}) || answer;
            })
            this.setState({answers});
        });


    },
    onClickLive: function(){
        const {quiz, dispatch} = this.props;
        dispatch(quizToggleLive(quiz));
        dispatch(navigateToLiveQuiz());
    },
    renderLiveButton: function(){
        if(localStorage.getItem('auther') === "true"){
            if(this.props.quiz.live){
                return <RaisedButton label="Stop" primary={true} onClick={this.onClickLive}/>
            }
            return <RaisedButton label="Live" primary={true} onClick={this.onClickLive}/>
        }
    },
    onChangeAnswer: function(answer, i){
        let {answers} = this.state;
        answers = R.update(i, answer, answers);
        this.setState({answers});

    },
    onSave: function(){
        const {answers} = this.state;
        answers.filter((answer)=>{return answer.value}).forEach((answer)=>{
            this.props.dispatch(upsertAnswer(answer));
        });
    },
    onSubmit: function(){
        const {answers} = this.state;
        answers.filter((answer)=>{return answer.value}).forEach((answer)=>{
            this.props.dispatch(upsertAnswer({...answer, submited: true}));
        });
    },
    renderForStudent: function(){
        const {quiz, questions} = this.props;
        return(
            <div style={{width : '100%'}}>
                <QuizView {...this.props} answers={this.state.answers}
                    onSave={this.onSave} onSubmit={this.onSubmit}
                    onChangeAnswer={this.onChangeAnswer} />
            </div>
        )
    },
    renderForAuthor: function(){
        return(
            <div style={{width: '100%'}}>
                <Tabs style={{width: '100%'}}>
                  <Tab label="Questions" >
                      {this.props.questions.map((q)=>{
                          return <Question  key={q._id} question_id={q._id} />
                      })}
                  </Tab>
                  <Tab label="Edit Quiz" >
                      <EditQuiz quiz_id={this.props.quiz._id} afterEdit={()=>{}}/>;
                  </Tab>
                </Tabs>
                {this.renderLiveButton()}
            </div>
        )
    },
    render: function(){
        if(localStorage.getItem('auther') === "true"){
            return this.renderForAuthor();
        }
        return this.renderForStudent();
    }
})


export default connect((state, {quiz_id}) => {
    const quiz = state.quizes.find((q)=>{return q._id === quiz_id});
    const compare = (q1, q2) => {
        return quiz.questions.indexOf(q1._id) - quiz.questions.indexOf(q2._id);
    }
    const questions = state.questions.filter((q) => {return quiz.questions.indexOf(q._id) != -1}).sort(compare)
    const answers = questions.map((q)=>{ return state.answers.find((answer)=>{return answer.question_id === q._id && answer.user === localStorage.getItem('username')})})
    // const stundetsAnswers = questions.map((q)=>{
    //     return state.answers.filter((answer) => {return answer.question_id === q._id && answer.submited});
    // })

    return {
        quiz,
        questions,
        answers
    }
})(Quiz);
