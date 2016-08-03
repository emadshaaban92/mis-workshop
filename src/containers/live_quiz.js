import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quiz from './quiz_view';
import RaisedButton from 'material-ui/RaisedButton';
import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';

const LiveQuiz = ({quiz, dispatch}) => {
  if(quiz){
    return (
      <div style={{width : '100%'}}>
        <Quiz quiz={quiz} />
        {localStorage.getItem('auther') === "true" ? <div style={{display: 'flex', justifyContent: 'center'}}>  <br /> <RaisedButton label="Stop" primary={true}
            onClick={()=>{
              dispatch({
                type : types.UPDATE_QUIZ,
                quiz : {...quiz, live:false}
              });
            }}/> </div> : null }
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
