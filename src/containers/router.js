import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as routeNames from '../constants/routeNames';

import Home from './home';
import Questions from './questions';
import Question from './question_view';


const Router = ({route}) => {
  switch (route.name) {
    case routeNames.HOME :
      return <Home />;
    case routeNames.QUESTIONS :
      return <Questions />;
    case routeNames.VIEW_QUESTION :
      return <Question {...route.params} />;
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
