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
      if(stepIndex === questions.length -1){
          return this.props.onSubmit();
      }
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= questions.length -2,
      });
    },
    handlePrev : function(){
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    },
    checkAnswerCompleted: function(i){
        const {questions} = this.props;
        const {answers} = this.props;
        if(questions[i].kind === 'choose_multi'){
            return R.contains(true, answers[i].value);
        }
        if(questions[i].kind === 'attach'){
            return answers[i]._attachments !== undefined;
        }
        return answers[i].value !== '';
    },
    checkAllSubmited: function(){
        return R.all((ans)=>{return ans.submited}, this.state.answers);
    },
    checkAllCompleted: function(){
        const {answers} = this.props;
        return R.all(this.checkAnswerCompleted, answers.map((a, i)=>{return i}));
    },
    renderStep(question, i){
      return (
        <Step key={question._id} completed={this.checkAnswerCompleted(i)}>
          <StepLabel>{question.title}</StepLabel>
        </Step>
      )
    },
    render : function(){
      const {quiz, questions} = this.props;
      const {finished, stepIndex, answers} = this.state;
      const contentStyle = {margin: '0 16px'};
      return (
        <div style={{width: '100%', margin: 'auto'}}>
          <Stepper linear={false}>
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
                  disabled={stepIndex === questions.length -1 && (this.checkAllSubmited() || !this.checkAllCompleted())}
                  primary={true}
                  onTouchTap={this.handleNext}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={this.props.onSave}
                  style={{marginRight: 12}}
                />
              </div>

            </div>
          </div>

        </div>
      )
    }
});

export default QuizView;
