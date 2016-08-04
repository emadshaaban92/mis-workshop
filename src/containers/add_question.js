import React, { Component } from 'react';
import { connect } from 'react-redux';

const R = require('ramda');

import QuestionForm from '../components/question_form';

import {insertQuestion} from '../action_creators';

const AddQuestion = React.createClass({
    saveQuestion : function(question){
        this.props.dispatch(insertQuestion(question));
        this.props.afterInsert(question._id);
    },
    render : function(){
        return (
            <QuestionForm saveQuestion={this.saveQuestion} />
        )
    }
});



export default connect()(AddQuestion);
