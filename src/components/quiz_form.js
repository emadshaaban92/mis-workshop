import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuid from 'node-uuid';
import R from 'ramda';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import QuestionForm from './question_form';
import MoveIcon from './move_icon';

import {insertQuestion} from '../action_creators';


const SelectQuestionsModal = React.createClass({
  getInitialState: function() {
    return {
      selected : this.props.selected
    };
  },
  componentWillReceiveProps : function(nextProps){
    this.setState({
      ...this.state,
      selected : nextProps.selected
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
    getInitialState: function(){
        return {
            question : {
                _id : "question_" + uuid.v1(),
                title: '',
                text: '',
                kind: 'choose_single',
                choices: [''],
                type : "question",
                max_points: 1
            }
        }
    },
    saveQuestion : function(question){
        this.props.dispatch(insertQuestion(question));
        this.props.onSubmit(question._id);
        this.setState(this.getInitialState());
    },
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
          />,<FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={()=>{this.saveQuestion(this.state.question)}}
          />,
        ]}
        modal={false}
        open={open}
        onRequestClose={onCancel}
        autoScrollBodyContent={true}
      >
      <QuestionForm question={this.state.question} onChange={(question)=> {this.setState({...this.state, question})}} />
      </Dialog>
    )
  }
});



const QuizForm = React.createClass({
    getInitialState: function(){
        return {
            select_questions_modal : false,
            add_question_modal : false,
            quiz : this.props.quiz
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.quiz){
            this.setState({...this.state, quiz: nextProps.quiz});
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(prevState.quiz !== this.state.quiz)
            this.props.onChange(this.state.quiz);
    },
    moveUp : function(i){
      if(i > 0){
        const {quiz} = this.state;
        const question = quiz.questions[i];
        let questions = R.remove(i, 1, quiz.questions);
        questions = R.insert(i-1, question, questions);
        this.setState({...this.state, quiz : {...quiz, questions}});
      }
    },
    moveDown : function(i){
      if(i < this.state.quiz.questions.length -1){
        const {quiz} = this.state;
        const question = quiz.questions[i];
        let questions = R.remove(i, 1, quiz.questions);
        questions = R.insert(i+1, question, questions);
        this.setState({...this.state, quiz : {...quiz, questions}});
      }
    },
    renderQuestion : function(question, i){
      return (
        <TableRow key={question._id + i}>
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

          <TextField
            floatingLabelText="Title"
            value={this.state.quiz.title}
            onChange={(e, title)=>{this.setState({...this.state, quiz : {...this.state.quiz, title}})}}
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
              {this.state.quiz.questions.map((qid)=> { return this.props.questions.find((q)=>{return q._id == qid})}).map(this.renderQuestion)}
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



        {this.renderModals()}
        </div>
      )
  },
  renderModals: function(){
      return (
          <div>
              <SelectQuestionsModal questions={this.props.questions}
                selected={this.state.quiz.questions}
                open={this.state.select_questions_modal}
                onCancel={()=>{
                  this.setState({...this.state, select_questions_modal : false})
                }}
                onSubmit={(questions)=>{
                  console.log(questions)
                  this.setState({...this.state, quiz : {...this.state.quiz, questions}, select_questions_modal : false})
                }} />

              <AddQuestionModal
                open={this.state.add_question_modal}
                dispatch={this.props.dispatch}
                onCancel={()=>{
                  this.setState({...this.state, add_question_modal : false})
                }}
                onSubmit={(question_id)=>{
                  const questions = [...this.state.quiz.questions, question_id];
                  this.setState({...this.state,  quiz : {...this.state.quiz, questions}, add_question_modal : false})
                }} />
          </div>
      )
  }
});


export default connect((state)=>{
    return {
        questions : state.questions
    }
})(QuizForm);
