import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import AppStore from './store';
import Container from './containers/container';



import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = ()=>{
  return (
    <Provider store={AppStore}>
      <MuiThemeProvider>
        <Container />
      </MuiThemeProvider>
    </Provider>
  );
}


var app = document.getElementById('app');
ReactDOM.render(<App />, app);
