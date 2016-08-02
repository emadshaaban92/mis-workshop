import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quiz from './quiz_view';

const LiveQuiz = ({quiz}) => {
  if(quiz){
    return <Quiz quiz={quiz} />;
  }
  return (
    <h1>No Live Quiz</h1>
  )
}


export default connect((state) => {
  return {
    quiz : state.quizes.find((q) => { return q.live})
  }
})(LiveQuiz);
