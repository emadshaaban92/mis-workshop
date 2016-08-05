const PouchDB = require('pouchdb/dist/pouchdb');

import * as types from './constants/ActionTypes';
import * as routeNames from './constants/routeNames';

import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose  } from 'redux'
import PouchMiddleware from 'pouch-redux-middleware'


import AppReducer from './reducer';

function createAppStore(user){
  const localDB = new PouchDB(user.dbName);

  const pouchMiddleware = PouchMiddleware([{
      path: '/questions',
      db: localDB,
      actions: {
          remove: doc => AppStore.dispatch({
              type: types.REMOVE_QUESTION,
              id: doc._id
          }),
          insert: doc => AppStore.dispatch({
              type: types.INSERT_QUESTION,
              question: doc
          }),
          update: doc => AppStore.dispatch({
              type: types.UPDATE_QUESTION,
              question: doc
          }),
      },
      changeFilter : (doc) => {
        return doc.type === "question";
      }
  }, {
      path: '/answers',
      db: localDB,
      actions: {
          remove: doc => AppStore.dispatch({
              type: types.REMOVE_ANSWER,
              id: doc._id
          }),
          insert: doc => AppStore.dispatch({
              type: types.INSERT_ANSWER,
              answer: doc
          }),
          update: doc => AppStore.dispatch({
              type: types.UPDATE_ANSWER,
              answer: doc
          }),
      },
      changeFilter : (doc) => {
        return doc.type === "answer";
      }
  }, {
      path: '/quizes',
      db: localDB,
      actions: {
          remove: doc => AppStore.dispatch({
              type: types.REMOVE_QUIZ,
              id: doc._id
          }),
          insert: doc => AppStore.dispatch({
              type: types.INSERT_QUIZ,
              quiz: doc
          }),
          update: doc => AppStore.dispatch({
              type: types.UPDATE_QUIZ,
              quiz: doc
          }),
      },
      changeFilter : (doc) => {
        return doc.type === "quiz";
      }
  }, {
      path: '/courses',
      db: localDB,
      actions: {
          remove: doc => AppStore.dispatch({
              type: types.REMOVE_COURSE,
              id: doc._id
          }),
          insert: doc => AppStore.dispatch({
              type: types.INSERT_COURSE,
              course: doc
          }),
          update: doc => AppStore.dispatch({
              type: types.UPDATE_COURSE,
              course: doc
          }),
      },
      changeFilter : (doc) => {
        return doc.type === "course";
      }
  }]);

  // const createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore);
  //
  // const AppStore = createStoreWithMiddleware(AppReducer);

    let AppStore = createStore(AppReducer, {}, compose(
      applyMiddleware(pouchMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

  const remoteDB = new PouchDB('http://' + user.username + ':' + user.password +'@couch.bizzotech.com/mis_workshop_v1/' + user.dbName);



  localDB.sync(remoteDB, {
      live: true,
      retry: true
  }).on('change', function(change) {
      //console.log(change);
      console.log('yo, something changed!');

  }).on('paused', function(info) {
      console.log("replication was paused, usually because of a lost connection");
  }).on('active', function(info) {
      console.log("replication was resumed");
  }).on('error', function(err) {
      console.log("totally unhandled error (shouldn't happen)");
  });

  return AppStore;

}

export default createAppStore;
