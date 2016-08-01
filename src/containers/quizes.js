import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../constants/ActionTypes'
import * as routeNames from '../constants/routeNames';



import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const renderQuiz = (quiz, i) => {
  return (
    <TableRow key={quiz._id}>
      <TableRowColumn>{i}</TableRowColumn>
      <TableRowColumn>{quiz.title}</TableRowColumn>
      <TableRowColumn>Unsolved</TableRowColumn>
    </TableRow>
  )
}

const Quizes = ({quizes, dispatch}) => {
  return (
    <Table onCellClick={(rowNumber) => {
      dispatch({
        type : types.NAVIGATE_TO,
        route : {
          name : routeNames.VIEW_QUIZ,
          params : {
            quiz : quizes[rowNumber]
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
        {quizes.map(renderQuiz)}
      </TableBody>
    </Table>
  )
}


export default connect((state) => {
  return { quizes : state.quizes}
})(Quizes);
