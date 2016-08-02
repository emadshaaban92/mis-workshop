import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuid = require('node-uuid');
const R = require('ramda');

import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';


import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const AddQuestion = React.createClass({
  getInitialState: function() {
    return {
      title : '',
      text : '',
      choices : [''],
      correct_answer : ''
    };
  },
  render : function(){
    return (
      <div>
        <TextField
          floatingLabelText="Title"
          value={this.state.title}
          onChange={(e, title)=>{this.setState({...this.state, title})}}
        />
        <br />
        <TextField
          floatingLabelText="Text"
          multiLine={true}
          rows={2}
          value={this.state.text}
          onChange={(e, text)=>{this.setState({...this.state, text})}}
        />
        <br />
        <h3>Choices</h3>
        {this.state.choices.map((choice, i) => {
          return (
            <div key={i}>
              <TextField
                value={choice}
                onChange={(e, ch)=>{
                  const choices = R.update(i, ch, this.state.choices);
                  this.setState({...this.state, choices})
                }}/>
              <br />
            </div>
          )
        })}
        <RaisedButton label="Add Choice" primary={true}
          onClick={()=>{
            this.setState({...this.state, choices : [...this.state.choices, '']})
          }}/>
        <br />
        <TextField
          floatingLabelText="Correct Answer"
          value={this.state.correct_answer}
          onChange={(e, correct_answer)=>{this.setState({...this.state, correct_answer})}}
        />
        <br /><br />
        <RaisedButton label="Save Question" primary={true}
          onClick={()=>{
            const question = {
              ...this.state,
              _id : uuid.v1(),
              type : "question"
            }
            this.props.dispatch({
              type : types.INSERT_QUESTION,
              question
            });
            this.props.dispatch({
              type : types.NAVIGATE_TO,
              route : {
                name : routeNames.QUESTIONS
              }
            });
          }}/>
      </div>
    )
  }
})



export default connect()(AddQuestion);
