import * as types from './constants/ActionTypes';
import * as routeNames from './constants/routeNames';

import { combineReducers } from 'redux'

function questions(state=[], action){
  switch (action.type) {
    case types.INSERT_QUESTION:
      return [...state, action.question]
    case types.UPDATE_QUESTION:
      return state.map((q)=> { return q._id == action.question._id ? action.question : q})
    case types.REMOVE_QUESTION:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function answers(state=[], action){
  switch (action.type) {
    case types.INSERT_ANSWER:
      return [...state, action.answer]
    case types.UPDATE_ANSWER:
      return state.map((ans)=> { return ans._id == action.answer._id ? action.answer : ans})
    case types.REMOVE_ANSWER:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function quizes(state=[], action){
  switch (action.type) {
    case types.INSERT_QUIZ:
      return [...state, action.quiz]
    case types.UPDATE_QUIZ:
      return state.map((q)=> { return q._id == action.quiz._id ? action.quiz : q})
    case types.REMOVE_QUIZ:
      return state.filter((q)=> { return q._id != action.id})
    default:
      return state
  }
}

function messages(state=[], action){
  switch (action.type) {
    case types.INSERT_MESSAGE:
      return [...state, action.message]
    case types.UPDATE_MESSAGE:
      return state.map((m)=> { return m._id == action.message._id ? action.message : m})
    case types.REMOVE_MESSAGE:
      return state.filter((m)=> { return m._id != action.id})
    default:
      return state
  }
}

function files(state=[], action){
  switch (action.type) {
    case types.INSERT_FILE:
      return [...state, action.file]
    case types.UPDATE_FILE:
      return state.map((f)=> { return f._id == action.file._id ? action.file : f})
    case types.REMOVE_FILE:
      return state.filter((f)=> { return f._id != action.id})
    default:
      return state
  }
}

function sessions(state=[], action){
  switch (action.type) {
    case types.INSERT_SESSION:
      return [...state, action.session]
    case types.UPDATE_SESSION:
      return state.map((s)=> { return s._id == action.session._id ? action.session : s})
    case types.REMOVE_SESSION:
      return state.filter((s)=> { return s._id != action.id})
    default:
      return state
  }
}

function courses(state=[], action){
  switch (action.type) {
    case types.INSERT_COURSE:
      return [...state, action.course]
    case types.UPDATE_COURSE:
      return state.map((c)=> { return c._id == action.course._id ? action.course : c})
    case types.REMOVE_COURSE:
      return state.filter((c)=> { return c._id != action.id})
    default:
      return state
  }
}

function history(state=[{name : routeNames.SESSIONS}], action){
  switch (action.type) {
    case types.NAVIGATE_TO:
      return [action.route, ...state]
    case types.GO_BACK:
      return state.length > 1 ? state.slice(1) : state;
    case types.RESET_ROUTE:
      return [{name : routeNames.SESSIONS}];
    default:
      return state
  }
}

export default combineReducers({
  questions,
  answers,
  quizes,
  messages,
  files,
  sessions,
  courses,
  history
});
