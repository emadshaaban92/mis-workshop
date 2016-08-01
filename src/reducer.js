import * as types from './constants/ActionTypes';
import * as routeNames from './constants/routeNames';

import { combineReducers } from 'redux'

function questions(state=[], action){
  switch (action.type) {
    case types.INSERT_QUESTION:
      return [action.question, ...state]
    case types.UPDATE_QUESTION:
      return [action.question, ...(state.filter((q)=> { return q._id != action.question._id}))];
    case types.REMOVE_QUESTION:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function answers(state=[], action){
  switch (action.type) {
    case types.INSERT_ANSWERR:
      return [action.answer, ...state]
    case types.UPDATE_ANSWERR:
      return [action.answer, ...(state.filter((q)=> { return q._id != action.answer._id}))];
    case types.REMOVE_ANSWERR:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function history(state=[{name : routeNames.HOME}], action){
  switch (action.type) {
    case types.NAVIGATE_TO:
      return [action.route, ...state]
    case types.GO_BACK:
      return state.length > 1 ? state.slice(1) : state;
    case types.RESET_ROUTE:
      return [{name : routeNames.HOME}];
    default:
      return state
  }
}

export default combineReducers({
  questions,
  answers,
  history
});
