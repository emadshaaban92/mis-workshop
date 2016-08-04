import React, { Component } from 'react';
import { connect } from 'react-redux';

import {insertQuiz} from '../action_creators';

import QuizForm from '../components/quiz_form';

const AddQuiz = React.createClass({
    saveQuiz: function(quiz){
        this.props.dispatch(insertQuiz(quiz));
        this.props.afterInsert(quiz);
    },
    render: function(){
        return <QuizForm saveQuiz={this.saveQuiz} />
    }
});

export default connect()(AddQuiz);
