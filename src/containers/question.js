import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionView from '../components/question_view';

import {upsertAnswer, navigateToEditQuestion} from '../action_creators';


const Question = React.createClass({
    createOrUpdateAnswer : function(answer){
        this.props.dispatch(upsertAnswer(answer));
    },
    onClickEdit: function(){
        const {question, dispatch} = this.props;
        dispatch(navigateToEditQuestion(question._id));
    },
    render : function(){
        const {answer, question} = this.props;
        return (
            <QuestionView key={answer && answer._rev} question={question}
                answer={answer} onClickEdit={this.onClickEdit}
                createOrUpdateAnswer={this.createOrUpdateAnswer} />
        )
    }
})



export default connect((state, {question_id}) => {
  const answers = state.answers.filter((answer) => {return answer.question_id === question_id});
  return {
    question: state.questions.find((q)=>{return q._id === question_id}),
    answer: answers.find((answer)=>{return answer.user === localStorage.getItem('username')})
  }
})(Question);
