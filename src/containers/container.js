import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

import {navtigateToQuizes, navigateToQuestions, navigateToSessions, navigateToLiveQuiz, resetRoute} from '../action_creators';

import Router from './router';
import SelectCourse from './select_course';


const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  padding: '0',
  margin: '0 auto'
}

const Container = React.createClass({
  getInitialState: function() {
    return {
      drawerActive : false
    };
  },
  toggleDrawer : function(){
    this.setState({drawerActive : !this.state.drawerActive});
  },
  resetRoute : function(){
    this.props.dispatch(resetRoute());
  },
  logout : function(){
    indexedDB.deleteDatabase('_pouch_' + localStorage.getItem('dbName'));
    indexedDB.deleteDatabase('_pouch_mis-' + localStorage.getItem('username'));
    localStorage.clear();
    location.reload();
  },
  selectCourse : function(){
    indexedDB.deleteDatabase('_pouch_' + localStorage.getItem('dbName'));
    localStorage.removeItem('selected_course');
    localStorage.removeItem('auther');
    localStorage.setItem('dbName', 'mis-' + localStorage.getItem('username'));
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
          this.props.dispatch(navtigateToQuizes());
          this.toggleDrawer();
        }}>Quizes</MenuItem>

        <MenuItem onTouchTap={()=>{
          this.props.dispatch(navigateToQuestions());
          this.toggleDrawer();
        }}>Questions</MenuItem>

        <MenuItem onTouchTap={()=>{
          this.props.dispatch(navigateToSessions());
          this.toggleDrawer();
        }}>Sessions</MenuItem>

        <MenuItem onTouchTap={()=>{
          this.props.dispatch(navigateToLiveQuiz());
          this.toggleDrawer();
        }}>Live Quiz</MenuItem>

      </Drawer>
    )
  },
  renderBody : function(){
    if(localStorage.getItem('selected_course')){
      return (
        <div>
          {this.renderDrawer()}
          <div style={style}><Router /></div>
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

export default connect()(Container);
