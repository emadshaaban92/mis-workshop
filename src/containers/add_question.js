import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionForm from '../components/question_form';
import RaisedButton from 'material-ui/RaisedButton';

import {insertQuestion} from '../action_creators';

const AddQuestion = React.createClass({
    getInitialState: function(){
        return {
            question : undefined
        }
    },
    saveQuestion : function(question){
        this.props.dispatch(insertQuestion(question));
        this.props.afterInsert(question._id);
    },
    render : function(){
        return (
            <div>
                <QuestionForm question={this.state.question} onChange={(question)=> {this.setState({...this.state, question})}} />
                <RaisedButton label="Save Question" primary={true}
                      onClick={()=>{this.saveQuestion(this.state.question)}}/>
            </div>

        )
    }
});



export default connect()(AddQuestion);
