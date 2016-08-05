import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import QuizForm from '../components/quiz_form';

import {updateQuiz} from '../action_creators';


const EditQuiz = React.createClass({
    getInitialState: function(){
        return {
            quiz : this.props.quiz
        }
    },
    saveQuiz : function(){
        const {quiz} = this.state;
        this.props.dispatch(updateQuiz(quiz));
        this.props.afterEdit(quiz._id);
    },
    render : function(){
        return(
            <div>
                <h1>Edit Quiz</h1>
                <QuizForm quiz={this.state.quiz} onChange={(quiz)=> {this.setState({...this.state, quiz})}} />
                <RaisedButton label="Save Quiz" primary={true}
                  onClick={this.saveQuiz}/>
            </div>
        )
    }
});


export default connect((state, {quiz_id})=>{
  return {
    quiz : state.quizes.find((q)=> {return q._id == quiz_id})
  }
})(EditQuiz);
