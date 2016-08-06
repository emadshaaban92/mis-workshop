import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionForm from '../components/question_form';
import RaisedButton from 'material-ui/RaisedButton';

import {insertQuestion} from '../action_creators';

import uuid from 'node-uuid';

const AddQuestion = React.createClass({
    getInitialState: function(){
        return {
            question : {
                _id : "question_" + uuid.v1(),
                title: '',
                text: '',
                kind: 'choose_single',
                choices: [''],
                type : "question",
                max_points: 1
            }
        }
    },
    saveQuestion : function(){
        const {question} = this.state;
        this.props.dispatch(insertQuestion(question));
        this.props.afterInsert(question._id);
    },
    render : function(){
        return (
            <div>
                <QuestionForm question={this.state.question} onChange={(question)=> {this.setState({...this.state, question})}} />
                <RaisedButton label="Save Question" primary={true}
                      onClick={this.saveQuestion}/>
            </div>

        )
    }
});



export default connect()(AddQuestion);
