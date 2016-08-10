import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddIcon from '../components/add_icon';

import {navigateToSession, navigateToAddSession} from '../action_creators';

const renderSession = (session, i) => {
  return (
    <TableRow key={session._id}>
      <TableRowColumn>{i}</TableRowColumn>
      <TableRowColumn>{session.title}</TableRowColumn>
      <TableRowColumn>Unsolved</TableRowColumn>
    </TableRow>
  )
}

const renderAddIcon = (dispatch) => {
  if(localStorage.getItem('auther') === "true"){
    return (
      <AddIcon onClick={()=>{dispatch(navigateToAddSession())}}/>
    )
  }
}

const Sessions = ({sessions, dispatch}) => {
  return (
    <div>
      <Table onCellClick={(rowNumber) => {dispatch(navigateToSession(sessions[rowNumber]._id));}}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>#</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {sessions.map(renderSession)}
        </TableBody>
      </Table>
      {renderAddIcon(dispatch)}
    </div>

  )
}


export default connect((state) => {
    if(localStorage.getItem('auther') === "true"){
        return { sessions : state.sessions}
    }
    return { sessions : state.sessions.filter((session)=>{return session.public}) }

})(Sessions);
