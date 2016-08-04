import React, { Component } from 'react';
import { connect } from 'react-redux';

import {quizGoLive, navigateToLiveQuiz, navigateToEditQuiz} from '../action_creators';

import QuizView from '../components/quiz_view';

const Quiz = React.createClass({
    onClickEdit: function(){
        const {quiz, dispatch} = this.props;
        dispatch(navigateToEditQuiz(quiz._id));
    },
    onClickLive: function(){
        const {quiz, dispatch} = this.props;
        dispatch(quizGoLive(quiz));
        dispatch(navigateToLiveQuiz());
    },
    render: function(){
        const {quiz, questions} = this.props;
        return(
            <QuizView quiz={quiz} questions={questions} onClickEdit={this.onClickEdit} onClickLive={this.onClickLive} />
        )
    }
})


export default connect((state, {quiz_id}) => {
    const quiz = state.quizes.find((q)=>{return q._id === quiz_id});
    const compare = (q1, q2) => {
        return quiz.questions.indexOf(q1._id) - quiz.questions.indexOf(q2._id);
    }
    return {
        quiz,
        questions : state.questions.filter((q) => {return quiz.questions.indexOf(q._id) != -1}).sort(compare)
    }
})(Quiz);
