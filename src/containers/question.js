import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import QuestionView from '../components/question_view';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';



import {upsertAnswer, updateAnswer, navigateToEditQuestion} from '../action_creators';
import EditQuestion from './edit_question';

import uuid from 'node-uuid';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const Question = React.createClass({
    getInitialState: function(){
        const {question, answer} = this.props;
        return {
            answer : answer || {
                _id : "answer_" + uuid.v1(),
                question_id : question._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : question.kind === 'choose_multi' ? R.repeat(false, question.choices.length) : '',
                _attachments: undefined,
                submited : false
            }
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.answer){
            this.setState({answer: nextProps.answer});
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
    renderForStudent : function(){
        const {question} = this.props;
        const {answer} = this.state;
        return (
            <div style={{width: '80%'}}>
                <QuestionView question={question} answer={answer}
                    onChange={(answer)=> {this.setState({answer})}} />
                <RaisedButton label="Save" primary={true} disabled={answer.submited || !answer.value}
                    style={{marginRight: 12}} onClick={this.saveAnswer}/>
                <RaisedButton label="Submit" primary={true} disabled={answer.submited || !answer.value}
                    style={{marginRight: 12}} onClick={this.submitAnswer}/>
            </div>

        )
    },
    renderStudentAnswer: function(answer, i){
        return(
            <div key={answer._id+answer._rev}>
                <QuestionView question={this.props.question} answer={answer} />
                <TextField floatingLabelText="Mark" defaultValue={answer.mark}
                    ref={'mark'+answer._id}/>
                <span> / {this.props.question.max_points || 1}</span>
                <FlatButton label="Mark" primary={true}  keyboardFocused={true}
                  onClick={()=>{
                    const mark = this.refs['mark'+answer._id].input.value;
                    this.props.dispatch(updateAnswer({
                        ...answer,
                        mark
                    }));
                }} />
            </div>
        )
    },
    renderForAuthor: function(){
        return (
          <Tabs style={{width: '80%', margin: '20px'}}>
            <Tab label="Students Answers" >
              {this.props.stundetsAnswers.map(this.renderStudentAnswer)}
            </Tab>
            <Tab label="Edit Question" >
                <EditQuestion question_id={this.props.question._id} afterEdit={()=>{}}/>;
            </Tab>
          </Tabs>
        )
    },
    render: function(){
        if(localStorage.getItem('auther') === "true"){
            return this.renderForAuthor();
        }
        return this.renderForStudent();
    }
})



export default connect((state, {question_id}) => {
  const answers = state.answers.filter((answer) => {return answer.question_id === question_id});
  const stundetsAnswers = state.answers.filter((answer) => {return answer.question_id === question_id && answer.submited});
  return {
    question: state.questions.find((q)=>{return q._id === question_id}),
    answer: answers.find((answer)=>{return answer.user === localStorage.getItem('username')}),
    stundetsAnswers
  }
})(Question);
