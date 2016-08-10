import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import {insertQuiz} from '../action_creators';

import QuizForm from '../components/quiz_form';

import uuid from 'node-uuid';

const AddQuiz = React.createClass({
    getNewQuiz: function(){
        return {
            _id : "quiz_" + uuid.v1(),
            type : "quiz",
            title : '',
            questions : []
        }
    },
    getInitialState: function(){
        return {
            quiz : this.getNewQuiz()
        }
    },
    saveQuiz: function(){
        const {quiz} = this.state;
        this.props.dispatch(insertQuiz(quiz));
        this.setState({quiz: this.getNewQuiz()});
        this.props.afterInsert(quiz._id);
    },
    render: function(){
        return(
            <div>
                <h1>Add Quiz</h1>
                <QuizForm quiz={this.state.quiz} onChange={(quiz)=> {this.setState({quiz})}} />
                <RaisedButton label="Save Quiz" primary={true}
                  onClick={this.saveQuiz}/>
            </div>
        )
    }
});

export default connect()(AddQuiz);
