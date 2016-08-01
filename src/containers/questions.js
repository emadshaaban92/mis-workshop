import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../constants/ActionTypes'
import * as routeNames from '../constants/routeNames';



import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const renderQuestion = (question, i) => {
  return (
    <TableRow key={question._id}>
      <TableRowColumn>{i}</TableRowColumn>
      <TableRowColumn>{question.title}</TableRowColumn>
      <TableRowColumn>Unsolved</TableRowColumn>
    </TableRow>
  )
}

const Questions = ({questions, dispatch}) => {
  return (
    <Table onCellClick={(rowNumber) => {
      dispatch({
        type : types.NAVIGATE_TO,
        route : {
          name : routeNames.VIEW_QUESTION,
          params : {
            question : questions[rowNumber]
          }
        }
      });
    }}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>#</TableHeaderColumn>
          <TableHeaderColumn>Title</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {questions.map(renderQuestion)}
      </TableBody>
    </Table>
  )
}


export default connect((state) => {
  return { questions : state.questions}
})(Questions);
