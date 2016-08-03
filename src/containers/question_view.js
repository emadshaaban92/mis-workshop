import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuid = require('node-uuid');

import * as types from '../constants/ActionTypes';
import * as routeNames from '../constants/routeNames';


import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';


import QuestionView from '../components/question_view';

// const renderChoice = (disabled, choice, i) => {
//   return (
//     <RadioButton
//       disabled={disabled}
//       key={i}
//       value={String(i)}
//       label={choice}
//     />
//   )
// }
//
// const createOrUpdateAnswer = (question, dispatch, answer, value) => {
//
// }

// const Question = ({question, dispatch, answer, answers}) => {
//   return (
//     <div>
//       <h1>{question.title}</h1>
//       <h3>{question.text}</h3>
//       <RadioButtonGroup name="choices"
//         defaultSelected={answer && answer.value}
//         onChange={(e, value) => {
//           createOrUpdateAnswer(question, dispatch, answer, value);
//         }}>
//         {question.choices.map(renderChoice.bind(null, answer && answer.submited))}
//       </RadioButtonGroup>
//       <br />
//       <RaisedButton label="Submit" primary={true} disabled={answer===undefined || answer.submited}
//         style={{marginRight: 12}}
//         onClick={()=>{
//           dispatch({
//             type : types.UPDATE_ANSWER,
//             answer : {
//               ...answer,
//               submited : true
//             }
//           });
//         }}/>
//       {localStorage.getItem('auther') === "true" ? <div>
//         <RaisedButton label="Edit" primary={true}
//           onClick={()=>{
//             dispatch({
//               type : types.NAVIGATE_TO,
//               route : {
//                 name : routeNames.EDIT_QUESTION,
//                 params : {
//                   question_id : question._id
//                 }
//               }
//             });
//           }}/>
//         <h3>{answers.length} Answers</h3>
//
//       </div> : null }
//
//
//     </div>
//   )
// }


const Question = React.createClass({
    createOrUpdateAnswer : function(answer){
        if(answer._id === undefined){
          this.props.dispatch({
            type : types.INSERT_ANSWER,
            answer : {
              _id : "answer/" + uuid.v1(),
              ...answer
            }
          });
        }else {
          this.props.dispatch({
            type : types.UPDATE_ANSWER,
            answer
          });
      }

    },
    render : function(){
        return (
            <QuestionView key={this.props.answer._rev} question={this.props.question} answer={this.props.answer} createOrUpdateAnswer={this.createOrUpdateAnswer} />
        )
    }
})



export default connect((state, {question}) => {
  const answers = state.answers.filter((answer) => {return answer.question_id == question._id});
  return {
    answer : answers.find((answer)=>{return answer.user == localStorage.getItem('username')})
  }
})(Question);
