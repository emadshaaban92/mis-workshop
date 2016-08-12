import React, { Component } from 'react';
import R from 'ramda';
import uuid from 'node-uuid';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


var ReactQuill = require('react-quill');

const QuestionFormInput = (props) => {
    const {form, label, name} = props;
    return (
        <TextField {...props}
          floatingLabelText={label}
          value={form.state.question[name]}
          onChange={(e, new_input)=>{
              const question = {...form.state.question};
              question[name] = new_input;
              form.setState({question});
          }}
          style={{width: '556px'}}
        />
    )
}

const QuestionForm = React.createClass({
    getInitialState: function() {
        return {
            question : this.props.question
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.question){
            this.setState({question: nextProps.question});
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(prevState.question !== this.state.question)
            this.props.onChange(this.state.question);
    },
    addChoice : function(){
        const {question} = this.state;
        const {choices} = question;
        this.setState({question : {...question, choices : [...choices, '']}});
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
                this.setState({question : {...question, choices}});
              }}/>
            <br />
          </div>
        )
    },
    renderChoicesArea(){
        return(
            <div>
                <h3>Choices</h3>
                {this.state.question.choices.map(this.renderChoice)}
                <br />
                <RaisedButton label="Add Choice" primary={true} onClick={this.addChoice}/>
            </div>
        )
    },
    renderBody: function(){
        const {question} = this.state;
        if(question.kind == 'choose_single' || question.kind == 'choose_multi'){
            return this.renderChoicesArea();
        }
    },
    render: function(){
        var editorStyle = {
            overflow: 'auto',
            width: 300,
            height: 100,
            maxHeight: 100
        }
        const {question} = this.state;
        return (
            <div>
              <QuestionFormInput form={this} label="Title" name="title" />
              <br />
                <SelectField value={question.kind} onChange={(e, i, kind)=>{this.setState({question : {...question, kind}})}}>
                  <MenuItem value={'choose_single'} primaryText="Choose Single" />
                  <MenuItem value={'choose_multi'} primaryText="Choose Multi" />
                  <MenuItem value={'true_false'} primaryText="True or False" />
                  <MenuItem value={'essay'} primaryText="Essay" />
                  <MenuItem value={'attach'} primaryText="Attach" />
                </SelectField>
                <br />

            <QuestionFormInput form={this} label="Text" name="text" multiLine={true} rows={2} />

            <ReactQuill theme="snow"
                value={this.state.question.text}
                onChange={(text)=>{
                    const question = {...this.state.question, text};
                    this.setState({question});
                }}
              />
              <br />

              {this.renderBody()}

              <br />
              <QuestionFormInput form={this} label="Max Points" name="max_points" />

              <br /><br />
            </div>
        )
    }
})


export default QuestionForm;
