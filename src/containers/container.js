import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';


import * as types from '../constants/ActionTypes'
import * as routeNames from '../constants/routeNames';

import Router from './router';
import SelectCourse from './select_course';

const Container = React.createClass({
  getInitialState: function() {
    return {
      drawerActive : false
    };
  },
  toggleDrawer : function(){
    this.setState({...this.state, drawerActive : !this.state.drawerActive});
  },
  resetRoute : function(){
    this.props.dispatch({
      type : types.RESET_ROUTE,
    });
  },
  logout : function(){
    localStorage.clear();
    location.reload();
  },
  selectCourse : function(){
    localStorage.removeItem('selected_course');
    location.reload();
  },
  renderDrawer : function(){
    return (
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

        <MenuItem onTouchTap={()=>{
          this.props.dispatch({
            type : types.NAVIGATE_TO,
            route : {
              name : routeNames.LIVE_QUIZ
            }
          });
          this.toggleDrawer();
        }}>Live Quiz</MenuItem>

      </Drawer>
    )
  },
  renderBody : function(){
    if(this.props.selectedCourse){
      return (
        <div>
          {this.renderDrawer()}
          <Router />
        </div>

      )
    } else {
      return (
        <SelectCourse />
      )
    }
  },
  render : function(){
    return (
      <div>
        <AppBar
          title="MIS Workshop"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer}
          onTitleTouchTap={this.resetRoute}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Select Course" onTouchTap={this.selectCourse} />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Logout" onTouchTap={this.logout} />
            </IconMenu>
          }
        />
      {this.renderBody()}
      </div>
    )
  }
});

export default connect((state)=> {
  return {
    selectedCourse : localStorage.getItem('selected_course')
  }
})(Container);
