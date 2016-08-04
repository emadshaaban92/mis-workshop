import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import uuid from 'node-uuid';

const QuestionView = React.createClass({
    getInitialState: function() {
        return {
            answer : this.props.answer || {
                _id : "answer/" + uuid.v1(),
                question_id : this.props.question._id,
                user : localStorage.getItem("username"),
                type : "answer",
                value : '',
                submited : false
            }
        }
    },
    componentWillReceiveProps : function(){
      if(this.props.answer){
        this.setState({...this.state, answer : this.props.answer});
      }
    },
    renderChoice: function(value, i){
        return(
            <Checkbox disabled={this.state.answer.submited} key={i} label={value}
                checked={value == this.state.answer.value}
                onCheck={()=>{
                    const {answer} = this.state;
                    this.setState({...this.state, answer : {...answer, value}})
                }}
            />
        )
    },
    saveAnswer: function(){
        console.log(this.state.answer);
        this.props.createOrUpdateAnswer(this.state.answer);
    },
    submitAnswer: function(){
        const old_answer = this.state.answer;
        const answer = {...old_answer, submited: true};
        //this.setState({...this.state, answer});
        this.props.createOrUpdateAnswer(answer);
    },
    renderEditButton: function(){
        const {question, onClickEdit} = this.props;
        if(localStorage.getItem('auther') === "true"){
            return <RaisedButton label="Edit" primary={true} onClick={onClickEdit}/>
        }
    },
    render: function(){
        const {answer} = this.state;
        const {question, createOrUpdateAnswer} = this.props;
        return (
          <div>
            <h1>{question.title}</h1>
            <h3>{question.text}</h3>
            {question.choices.map(this.renderChoice)}

            <br />
            <RaisedButton label="Save" primary={true} disabled={answer.submited || !answer.value}
                style={{marginRight: 12}} onClick={this.saveAnswer}/>
            <RaisedButton label="Submit" primary={true} disabled={answer.submited || !answer.value}
                style={{marginRight: 12}} onClick={this.submitAnswer}/>

            {this.renderEditButton()}

          </div>
        )
    }
});

export default QuestionView;
