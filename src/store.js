const PouchDB = require('pouchdb/dist/pouchdb');

const localDB = new PouchDB('dd_new');


import * as types from './constants/ActionTypes';
import * as routeNames from './constants/routeNames';

import { combineReducers } from 'redux'
import { createStore, applyMiddleware  } from 'redux'
import PouchMiddleware from 'pouch-redux-middleware'


import AppReducer from './reducer';

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
}]);

const createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore);

const AppStore = createStoreWithMiddleware(AppReducer);


const remoteDB = new PouchDB('http://mis-admin:mis-admin@couch.bizzotech.com:5984/mis-main');



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

export default AppStore;
