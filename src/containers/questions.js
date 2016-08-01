import React, { Component } from 'react';
import { connect } from 'react-redux';


const Questions = (questions) => {
  return (
    <h1>{JSON.stringify(questions)}</h1>
  )
}


export default connect((state) => {
  return { questions : state.questions}
})(Questions);
