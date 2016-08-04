import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddIcon from '../components/add_icon';

import {navigateToQuiz, navigateToAddQuiz} from '../action_creators';

const renderQuiz = (quiz, i) => {
  return (
    <TableRow key={quiz._id}>
      <TableRowColumn>{i}</TableRowColumn>
      <TableRowColumn>{quiz.title}</TableRowColumn>
      <TableRowColumn>Unsolved</TableRowColumn>
    </TableRow>
  )
}

const renderAddIcon = (dispatch) => {
  if(localStorage.getItem('auther') === "true"){
    return (
      <AddIcon onClick={()=>{dispatch(navigateToAddQuiz())}}/>
    )
  }
}
const Quizes = ({quizes, dispatch}) => {
  return (
    <div>
      <Table onCellClick={(rowNumber) => {dispatch(navigateToQuiz(quizes[rowNumber]._id))}}>
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
      {renderAddIcon(dispatch)}
    </div>

  )
}


export default connect((state) => {
  return { quizes : state.quizes}
})(Quizes);
