import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Question from './question_view';


const Quiz = React.createClass({
  getInitialState: function() {
    return {
      finished: false,
      stepIndex: 0,
    };
  },
  handleNext : function(){
    const {stepIndex} = this.state;
    const {questions} = this.props;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= questions.length -1,
    });
  },
  handlePrev : function(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  },
  renderStep(question, i){
    return (
      <Step key={question._id
      }>
        <StepLabel>{question.title}</StepLabel>
      </Step>
    )
  },
  render : function(){
    const {quiz, dispatch, questions} = this.props;
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          {questions.map(this.renderStep)}
        </Stepper>
        <div style={contentStyle}>
          <div>
            <Question question={questions[stepIndex]} />
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={stepIndex === questions.length -1 ? 'Finish' : 'Next'}
                disabled={stepIndex === questions.length -1}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})


export default connect((state, {quiz}) => {
  const compare = (q1, q2) => {
    return quiz.questions.indexOf(q1._id) - quiz.questions.indexOf(q2._id);
  }
  return {
    questions : state.questions.filter((q) => {return quiz.questions.indexOf(q._id) != -1}).sort(compare)
  }
})(Quiz);
