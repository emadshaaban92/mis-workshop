import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuid = require('node-uuid');

import * as types from '../constants/ActionTypes';


import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const renderChoice = (choice, i) => {
  return (
    <RadioButton
      key={i}
      value={String(i)}
      label={choice}
    />
  )
}

const Question = ({question, dispatch, answer}) => {
  return (
    <div>
      <h1>{question.title}</h1>
      <h3>{question.text}</h3>
      <RadioButtonGroup name="choices" defaultSelected={answer && answer.value} onChange={(e, value) => {
        let ans = {
          value,
          question_id : question._id,
          user : "z3bola",
          type : "answer"
        }
        if(answer === undefined){
          dispatch({
            type : types.INSERT_ANSWER,
            answer : {
              _id : uuid.v1(),
              ...ans
            }
          });
        }else {
          dispatch({
            type : types.UPDATE_ANSWER,
            answer : {
              _id : answer._id,
              _rev : answer._rev,
              ...ans
            }
          });
        }
      }}>
        {question.choices.map(renderChoice)}
      </RadioButtonGroup>
    </div>
  )
}



export default connect((state, {question}) => {
  return {
    answer : state.answers.find((answer) => {return answer.question_id == question._id})
  }
})(Question);
