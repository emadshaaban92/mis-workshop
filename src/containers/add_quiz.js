import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuid = require('node-uuid');
const R = require('ramda');

import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';


import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddQuestion from './add_question';
import MoveIcon from '../components/move_icon';

const SelectQuestionsModal = React.createClass({
  getInitialState: function() {
    return {
      selected : this.props.selected
    };
  },
  componentWillReceiveProps : function(){
    this.setState({
      ...this.state,
      selected : this.props.selected
    })
  },
  renderQuestion : function(question, i){
    return (
      <TableRow key={question._id} selected={this.state.selected.indexOf(question._id) != -1}>
        <TableRowColumn>{i}</TableRowColumn>
        <TableRowColumn>{question.title}</TableRowColumn>
        <TableRowColumn>Unsolved</TableRowColumn>
      </TableRow>
    )
  },
  render : function(){
    const {questions, open, onSubmit, onCancel } = this.props;
    return (
      <Dialog
        title="Scrollable Dialog"
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={onCancel}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={()=>{onSubmit(this.state.selected)}}
          />,
        ]}
        modal={false}
        open={open}
        onRequestClose={onCancel}
        autoScrollBodyContent={true}
      >
      <Table multiSelectable={true} onRowSelection={(rowsSelected)=>{
        const selected = rowsSelected.map((i)=> { return questions[i]._id});
        return this.setState({...this.state, selected });
      }}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>#</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map(this.renderQuestion)}
        </TableBody>
      </Table>
      </Dialog>
    )
  }
});



const AddQuestionModal = React.createClass({
  render : function(){
    const {open, onSubmit, onCancel } = this.props;
    return (
      <Dialog
        title="Scrollable Dialog"
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={onCancel}
          />,
        ]}
        modal={false}
        open={open}
        onRequestClose={onCancel}
        autoScrollBodyContent={true}
      >
        <AddQuestion afterInsert={(question)=>{onSubmit(question)}} />
      </Dialog>
    )
  }
});

const AddQuiz = React.createClass({
  getInitialState: function() {
    return {
      select_questions_modal : false,
      add_question_modal : false,
      title : '',
      questions : []
    };
  },
  moveUp : function(i){
    if(i > 0){
      const question = this.state.questions[i];
      let questions = R.remove(i, 1, this.state.questions);
      questions = R.insert(i-1, question, questions);
      this.setState({...this.state, questions});
    }
  },
  moveDown : function(i){
    if(i < this.state.questions.length -1){
      const question = this.state.questions[i];
      let questions = R.remove(i, 1, this.state.questions);
      questions = R.insert(i+1, question, questions);
      this.setState({...this.state, questions});
    }
  },
  renderQuestion : function(question, i){
    return (
      <TableRow key={question._id}>
        <TableRowColumn>{i}</TableRowColumn>
        <TableRowColumn>{question.title}</TableRowColumn>
        <TableRowColumn><MoveIcon direction="up" onClick={()=>{this.moveUp(i)}}/></TableRowColumn>
        <TableRowColumn><MoveIcon direction="down" onClick={()=>{this.moveDown(i)}}/></TableRowColumn>
      </TableRow>
    )
  },
  render : function(){
    return (
      <div>
        <h1>Add Quiz</h1>
        <TextField
          floatingLabelText="Title"
          value={this.state.title}
          onChange={(e, title)=>{this.setState({...this.state, title})}}
        />
        <br />

        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Move Up</TableHeaderColumn>
              <TableHeaderColumn>Move Down</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.questions.map((qid)=> { return this.props.questions.find((q)=>{return q._id == qid})}).map(this.renderQuestion)}
          </TableBody>
        </Table>
        <br /><br />
        <RaisedButton label="Select Questions" primary={true}
          onClick={()=>{
            this.setState({...this.state, select_questions_modal : true})
          }}/>
        <br /><br />
        <RaisedButton label="Add Question" primary={true}
          onClick={()=>{
            this.setState({...this.state, add_question_modal : true})
          }}/>
        <br /><br />
        <RaisedButton label="Save Quiz" primary={true}
          onClick={()=>{
            const quiz = {
              _id : uuid.v1(),
              type : "quiz",
              title : this.state.title,
              questions : this.state.questions
            }
            this.props.dispatch({
              type : types.INSERT_QUIZ,
              quiz
            });
            this.props.afterInsert(quiz);
          }}/>


        <SelectQuestionsModal questions={this.props.questions}
          selected={this.state.questions}
          open={this.state.select_questions_modal}
          onCancel={()=>{
            this.setState({...this.state, select_questions_modal : false})
          }}
          onSubmit={(selected)=>{
            console.log(selected)
            this.setState({...this.state, questions : selected, select_questions_modal : false})
          }} />

        <AddQuestionModal
          open={this.state.add_question_modal}
          onCancel={()=>{
            this.setState({...this.state, add_question_modal : false})
          }}
          onSubmit={(question)=>{
            const questions = [...this.state.questions, question._id];
            this.setState({...this.state, questions, add_question_modal : false})
          }} />
      </div>
    )
  }
})



export default connect((state)=>{
  return {
    questions : state.questions
  }
})(AddQuiz);
