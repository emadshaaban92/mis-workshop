import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quiz from './quiz';
import RaisedButton from 'material-ui/RaisedButton';
import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';

const LiveQuiz = ({quiz, dispatch}) => {
  if(quiz){
    return (
      <div style={{width : '100%'}}>
        <Quiz quiz_id={quiz._id} />
      </div>
    );
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
