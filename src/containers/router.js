import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';

import Home from './home';
import Questions from './questions';
import Question from './question_view';
import AddQuestion from './add_question';
import AddQuiz from './add_quiz';

import Quizes from './quizes';
import Quiz from './quiz_view';

import LiveQuiz from './live_quiz';


const Router = ({route, dispatch}) => {
  switch (route.name) {
    case routeNames.HOME :
      return <Home />;
    case routeNames.QUESTIONS :
      return <Questions />;
    case routeNames.VIEW_QUESTION :
      return <Question {...route.params} />;
    case routeNames.QUIZES :
      return <Quizes />;
    case routeNames.VIEW_QUIZ :
      return <Quiz {...route.params} />;
    case routeNames.LIVE_QUIZ :
      return <LiveQuiz />;
    case routeNames.ADD_QUESTION :
      return <AddQuestion afterInsert={()=>{
          dispatch({
            type : types.NAVIGATE_TO,
            route : {
              name : routeNames.QUESTIONS
            }
          });
        }} />;
    case routeNames.ADD_QUIZ :
      return <AddQuiz afterInsert={()=>{
          dispatch({
            type : types.NAVIGATE_TO,
            route : {
              name : routeNames.QUIZES
            }
          });
        }} />;
    default:
      return (
        <div>
          <h1> No Route </h1>
        </div>
      )
    }
}

export default connect((state) => {
  return { route : state.history[0]}
})(Router);
