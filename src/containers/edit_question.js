import React, { Component } from 'react';
import { connect } from 'react-redux';


import QuestionForm from '../components/question_form';

import {updateQuestion} from '../action_creators';


const EditQuestion = React.createClass({
    saveQuestion : function(question){
        this.props.dispatch(updateQuestion(question));
        this.props.afterEdit(question._id);
    },
    render : function(){
        return (
            <QuestionForm question={this.props.question} saveQuestion={this.saveQuestion} />
        )
    }
});


export default connect((state, {question_id})=>{
  return {
    question : state.questions.find((q)=> {return q._id == question_id})
  }
})(EditQuestion);
