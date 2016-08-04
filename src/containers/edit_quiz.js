import React, { Component } from 'react';
import { connect } from 'react-redux';


import QuizForm from '../components/quiz_form';

import {updateQuiz} from '../action_creators';


const EditQuiz = React.createClass({
    saveQuiz : function(quiz){
        this.props.dispatch(updateQuiz(quiz));
        this.props.afterEdit(quiz._id);
    },
    render : function(){
        return <QuizForm quiz={this.props.quiz} saveQuiz={this.saveQuiz} />
    }
});


export default connect((state, {quiz_id})=>{
  return {
    quiz : state.quizes.find((q)=> {return q._id == quiz_id})
  }
})(EditQuiz);
