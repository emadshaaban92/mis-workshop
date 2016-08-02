import React, { Component } from 'react';
import { connect } from 'react-redux';

const Home = ({courses}) => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>{JSON.stringify(courses)}</p>
    </div>
  )
}

export default connect((state)=> {
  return {
    courses : state.courses
  }
})(Home);
