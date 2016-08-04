import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Question from '../containers/question';

const QuizView = React.createClass({
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
        <Step key={question._id}>
          <StepLabel>{question.title}</StepLabel>
        </Step>
      )
    },
    renderEditButton: function(){
        const {question, onClickEdit} = this.props;
        if(localStorage.getItem('auther') === "true"){
            return <RaisedButton label="Edit" primary={true} onClick={onClickEdit}/>
        }
    },
    renderLiveButton: function(){
        const {question, onClickLive} = this.props;
        if(localStorage.getItem('auther') === "true"){
            return <RaisedButton label="Live" primary={true} onClick={onClickLive}/>
        }
    },
    render : function(){
      const {quiz, questions} = this.props;
      const {finished, stepIndex} = this.state;
      const contentStyle = {margin: '0 16px'};
      return (
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            {questions.map(this.renderStep)}
          </Stepper>
          <div style={contentStyle}>
            <div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Question question_id={questions[stepIndex]._id} />
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
          {this.renderEditButton()}
          {this.renderLiveButton()}
        </div>
      )
    }
});

export default QuizView;
