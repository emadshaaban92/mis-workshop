import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuid = require('node-uuid');
const R = require('ramda');

import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';

import QuestionForm from '../components/question_form';


const EditQuestion = React.createClass({
    saveQuestion : function(question){
        this.props.dispatch({
          type : types.UPDATE_QUESTION,
          question
        });
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
