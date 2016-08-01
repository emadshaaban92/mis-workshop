import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as types from '../constants/ActionTypes'
import * as routeNames from '../constants/routeNames';

import Router from './router';

const Container = React.createClass({
  getInitialState: function() {
    return {
      drawerActive : false
    };
  },
  toggleDrawer : function(){
    this.setState({...this.state, drawerActive : !this.state.drawerActive});
  },
  render : function(){
    return (
      <div>
        <AppBar
          title="MIS Workshop"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer}
          onTitleTouchTap={()=>{
            this.props.dispatch({
              type : types.RESET_ROUTE,
            });
          }}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerActive}
          onRequestChange={this.toggleDrawer}
        >
          <MenuItem onTouchTap={()=>{
            this.props.dispatch({
              type : types.NAVIGATE_TO,
              route : {
                name : routeNames.QUIZES
              }
            });
            this.toggleDrawer();
          }}>Quizes</MenuItem>

          <MenuItem onTouchTap={()=>{
            this.props.dispatch({
              type : types.NAVIGATE_TO,
              route : {
                name : routeNames.QUESTIONS
              }
            });
            this.toggleDrawer();
          }}>Questions</MenuItem>

        </Drawer>
        <Router />
      </div>
    )
  }
});

export default connect()(Container);
