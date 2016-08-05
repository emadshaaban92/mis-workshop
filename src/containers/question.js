import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionView from '../components/question_view';
import RaisedButton from 'material-ui/RaisedButton';

import {upsertAnswer, navigateToEditQuestion} from '../action_creators';

import uuid from 'node-uuid';

const Question = React.createClass({
    getInitialState: function(){
        return {
            answer : this.props.answer || {
                _id : "answer_" + uuid.v1(),
                question_id : this.props.question._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : '',
                _attachments: undefined,
                submited : false
            }
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.answer){
            this.setState({...this.state, answer: nextProps.answer});
        }
    },
    saveAnswer: function(){
        this.props.dispatch(upsertAnswer(this.state.answer));
    },
    submitAnswer: function(){
        const old_answer = this.state.answer;
        const answer = {...old_answer, submited: true};
        this.props.dispatch(upsertAnswer(answer));
    },
    onClickEdit: function(){
        const {question, dispatch} = this.props;
        dispatch(navigateToEditQuestion(question._id));
    },
    renderEditButton: function(){
        if(localStorage.getItem('auther') === "true"){
            return <RaisedButton label="Edit" primary={true} onClick={this.onClickEdit}/>
        }
    },
    render : function(){
        const {question} = this.props;
        const {answer} = this.state;
        return (
            <div>
                <QuestionView question={question} answer={answer}
                    onChange={(answer)=> {this.setState({...this.state, answer})}} />
                <RaisedButton label="Save" primary={true} disabled={answer.submited || !answer.value}
                    style={{marginRight: 12}} onClick={this.saveAnswer}/>
                <RaisedButton label="Submit" primary={true} disabled={answer.submited || !answer.value}
                    style={{marginRight: 12}} onClick={this.submitAnswer}/>

                {this.renderEditButton()}
            </div>

        )
    }
})



export default connect((state, {question_id}) => {
  const answers = state.answers.filter((answer) => {return answer.question_id === question_id});
  return {
    question: state.questions.find((q)=>{return q._id === question_id}),
    answer: answers.find((answer)=>{return answer.user === localStorage.getItem('username')})
  }
})(Question);
