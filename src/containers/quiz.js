import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import {quizToggleLive, navigateToLiveQuiz, navigateToEditQuiz} from '../action_creators';

import QuizView from '../components/quiz_view';


import uuid from 'node-uuid';
import R from 'ramda';

const Quiz = React.createClass({
    getInitialState: function() {
      return {
        finished: false,
        stepIndex: 0,
        answers : this.props.answers.map((ans, i)=>{
            return ans || {
                _id : "answer_" + uuid.v1(),
                question_id : this.props.questions[i]._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : '',
                submited : false
            }
        })
      };
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.answers){
            this.setState({...this.state, answers: nextProps.answers});
        }
    },
    onClickEdit: function(){
        const {quiz, dispatch} = this.props;
        dispatch(navigateToEditQuiz(quiz._id));
    },
    onClickLive: function(){
        const {quiz, dispatch} = this.props;
        dispatch(quizToggleLive(quiz));
        dispatch(navigateToLiveQuiz());
    },
    renderEditButton: function(){
        if(localStorage.getItem('auther') === "true"){
            return <RaisedButton label="Edit" primary={true} onClick={this.onClickEdit}/>
        }
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
        this.setState({...this.state, answers});

    },
    render: function(){
        const {quiz, questions} = this.props;
        return(
            <div style={{width : '100%'}}>
                <QuizView {...this.props} answers={this.state.answers}
                    onChangeAnswer={this.onChangeAnswer}
                    onClickEdit={this.onClickEdit} onClickLive={this.onClickLive} />
                {this.renderEditButton()}
                {this.renderLiveButton()}
            </div>

        )
    }
})


export default connect((state, {quiz_id}) => {
    const quiz = state.quizes.find((q)=>{return q._id === quiz_id});
    const compare = (q1, q2) => {
        return quiz.questions.indexOf(q1._id) - quiz.questions.indexOf(q2._id);
    }
    const questions = state.questions.filter((q) => {return quiz.questions.indexOf(q._id) != -1}).sort(compare)
    const answers = questions.map((q)=>{ return state.answers.find((answer)=>{return answer.question_id === q._id && answer.user === localStorage.getItem('username')})})
    return {
        quiz,
        questions,
        answers
    }
})(Quiz);
