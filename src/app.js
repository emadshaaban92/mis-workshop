import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'


import createAppStore from './store';
import Container from './containers/container';
import Login from './login';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn){
  var user = {
    username : localStorage.getItem('username'),
    password : localStorage.getItem('password'),
    dbName : localStorage.getItem('dbName')
  }
  var AppStore = createAppStore(user);
}

const nonWebKitBrowser = indexedDB.webkitGetDatabaseNames == undefined;

const App = ()=>{
    
  if(loggedIn){
    return (
      <Provider store={AppStore}>
        <MuiThemeProvider>
          <Container />
        </MuiThemeProvider>
      </Provider>
    );
  }



  return (
    <MuiThemeProvider>
      <Login />
    </MuiThemeProvider>
  )

}


var app = document.getElementById('app');
ReactDOM.render(<App />, app);
