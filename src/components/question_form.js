import React, { Component } from 'react';
import R from 'ramda';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const QuestionFormInput = (props) => {
    const {form, label, name} = props;
    return (
        <TextField {...props}
          floatingLabelText={label}
          value={form.state[name]}
          onChange={(e, new_input)=>{
              const question = {...form.state.question};
              question[name] = new_input;
              form.setState({...form.state, question});
          }}
        />
    )
}

const QuestionForm = React.createClass({
    getInitialState: function() {
        const question = this.props.question || {
            title: '',
            text: '',
            choices: [''],
            correct_answer: ''
        }
        return {
            question
        }
    },
    componentWillReceiveProps : function(){
      if(this.props.question){
        this.setState({...this.state, question : this.props.question});
      }
    },
    addChoice : function(){
        const {question} = this.state;
        const {choices} = question;
        this.setState({...this.state, question : {...question, choices : [...choices, '']}});
    },
    renderChoice : function(choice, i){
        return (
          <div key={i}>
            <TextField
              value={choice}
              name={"choice" + i}
              onChange={(e, ch)=>{
                let {question} = this.state;
                const choices = R.update(i, ch, question.choices);
                this.setState({...this.state, question : {...question, choices}});
              }}/>
            <br />
          </div>
        )
    },
    render: function(){
        return (
            <div>
              <QuestionFormInput form={this} label="Title" name="title" />
              <br />
              <QuestionFormInput form={this} label="Text" name="text" multiLine={true} rows={2} />

              <br />
              <h3>Choices</h3>
              {this.state.question.choices.map(this.renderChoice)}

              <RaisedButton label="Add Choice" primary={true} onClick={this.addChoice}/>
              <br />
              <QuestionFormInput form={this} label="Correct Answer" name="correct_answer" />

              <br /><br />
              <RaisedButton label="Save Question" primary={true}
                onClick={()=>{this.props.saveQuestion(this.state.question)}}/>
            </div>
        )
    }
})


export default QuestionForm;
