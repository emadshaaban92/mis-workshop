import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import QuestionView from './question_view';

import uuid from 'node-uuid';
import R from 'ramda';

const QuizView = React.createClass({
    getInitialState: function() {
      return {
        finished: false,
        stepIndex: 0,
        answers : this.props.answers
      };
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.answers){
            this.setState({...this.state, answers: nextProps.answers});
        }
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
        <Step key={question._id}>
          <StepLabel>{question.title}</StepLabel>
        </Step>
      )
    },
    render : function(){
      const {quiz, questions} = this.props;
      const {finished, stepIndex, answers} = this.state;
      const contentStyle = {margin: '0 16px'};
      return (
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            {questions.map(this.renderStep)}
          </Stepper>
          <div style={contentStyle}>
            <div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <QuestionView question={questions[stepIndex]} answer={answers[stepIndex]}
                    onChange={(answer)=>{this.props.onChangeAnswer(answer, stepIndex)}}/>
              </div>

              <div style={{marginTop: 12,display: 'flex', justifyContent: 'flex-end'}}>
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
});

export default QuizView;
