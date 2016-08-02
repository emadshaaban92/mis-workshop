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
    case types.INSERT_ANSWER:
      return [action.answer, ...state]
    case types.UPDATE_ANSWER:
      return [action.answer, ...(state.filter((q)=> { return q._id != action.answer._id}))];
    case types.REMOVE_ANSWER:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function quizes(state=[], action){
  switch (action.type) {
    case types.INSERT_QUIZ:
      return [action.quiz, ...state]
    case types.UPDATE_QUIZ:
      return [action.quiz, ...(state.filter((q)=> { return q._id != action.quiz._id}))];
    case types.REMOVE_QUIZ:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function courses(state=[], action){
  switch (action.type) {
    case types.INSERT_COURSE:
      return [action.course, ...state]
    case types.UPDATE_COURSE:
      return [action.course, ...(state.filter((q)=> { return q._id != action.course._id}))];
    case types.REMOVE_COURSE:
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
  quizes,
  courses,
  history
});
