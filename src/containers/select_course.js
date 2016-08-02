import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const renderCourse = (course, i) => {
  return (
    <TableRow key={course._id}>
      <TableRowColumn>{i}</TableRowColumn>
      <TableRowColumn>{course.title}</TableRowColumn>
      <TableRowColumn>Unsolved</TableRowColumn>
    </TableRow>
  )
}

const SelectCourse = ({courses}) => {
  return (
    <div>
      <Table onCellClick={(rowNumber) => {
        const course = courses[rowNumber];
        localStorage.setItem('selected_course', course.name);
        localStorage.setItem('auther', course.subscribers.indexOf(localStorage.getItem('username')) != -1);
        localStorage.setItem('dbName', "mis-" + course.name + "-" + localStorage.getItem('username'));
        location.reload();
      }}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>#</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {courses.map(renderCourse)}
        </TableBody>
      </Table>
    </div>

  )
}

export default connect((state)=> {
  return {
    courses : state.courses.filter((c)=>{ return c.subscribers.indexOf(localStorage.getItem('username') != -1)})
  }
})(SelectCourse);
