import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as routeNames from '../constants/routeNames';

import Home from './home';
import Questions from './questions';
import Question from './question';
import AddQuestion from './add_question';
import EditQuestion from './edit_question';

import AddQuiz from './add_quiz';
import EditQuiz from './edit_quiz';

import Quizes from './quizes';
import Quiz from './quiz';

import AddSession from './add_session';
import Sessions from './sessions';
import Session from './session';

import LiveQuiz from './live_quiz';

import {navigateToQuestions, navtigateToQuizes, navigateToSessions, navigateToQuestion, navigateToQuiz} from '../action_creators';

const Router = ({route, dispatch}) => {
  switch (route.name) {
    case routeNames.HOME :
      return <Home />;
    case routeNames.QUESTIONS :
      return <Questions />;
    case routeNames.VIEW_QUESTION :
      return <Question {...route.params} />;
    case routeNames.EDIT_QUESTION :
      return <EditQuestion {...route.params} afterEdit={(question_id)=>{dispatch(navigateToQuestion(question_id))}}/>;
      case routeNames.EDIT_QUIZ :
        return <EditQuiz {...route.params} afterEdit={(quiz_id)=>{dispatch(navigateToQuiz(quiz_id))}}/>;
    case routeNames.QUIZES :
      return <Quizes />;
    case routeNames.VIEW_QUIZ :
      return <Quiz {...route.params} />;
    case routeNames.LIVE_QUIZ :
      return <LiveQuiz />;
    case routeNames.ADD_QUESTION :
      return <AddQuestion afterInsert={()=>{dispatch(navigateToQuestions())}} />;
    case routeNames.ADD_QUIZ :
      return <AddQuiz afterInsert={()=>{dispatch(navtigateToQuizes())}} />;
    case routeNames.SESSIONS:
      return <Sessions />
    case routeNames.ADD_SESSION:
      return <AddSession afterInsert={()=>{dispatch(navigateToSessions())}} />
    case routeNames.VIEW_SESSION:
      return <Session {...route.params} />
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
