import React, { Component } from 'react';
import { connect } from 'react-redux';


import QuestionForm from '../components/question_form';
import RaisedButton from 'material-ui/RaisedButton';

import {updateQuestion} from '../action_creators';


const EditQuestion = React.createClass({
    getInitialState: function(){
        return {
            question : this.props.question
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.question){
            this.setState({question: nextProps.question});
        }
    },
    saveQuestion : function(question){
        this.props.dispatch(updateQuestion(question));
        this.props.afterEdit(question._id);
    },
    render : function(){
        return (
            <div>
                <QuestionForm question={this.state.question} onChange={(question)=> {this.setState({question})}} />
                <RaisedButton label="Save Question" primary={true}
                      onClick={()=>{this.saveQuestion(this.state.question)}}/>
            </div>

        )
    }
});


export default connect((state, {question_id})=>{
  return {
    question : state.questions.find((q)=> {return q._id == question_id})
  }
})(EditQuestion);
