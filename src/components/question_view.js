import React, { Component } from 'react';

import R from 'ramda';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import UploadFile from '../containers/upload_file';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const QuestionView = React.createClass({
    getInitialState: function() {
        return {
            answer : this.props.answer
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.answer._rev !== this.state.answer._rev){
            this.setState({answer: nextProps.answer});
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(prevState.answer !== this.state.answer && this.props.onChange)
            this.props.onChange(this.state.answer);
    },
    renderChoiceSingle: function(value, i){
        const {answer} = this.state;
        return(
            <Checkbox disabled={this.props.disabled || answer.submited} key={i} label={value}
                checked={value == answer.value}
                onCheck={()=>{
                    this.setState({answer : {...answer, value}})
                }}
            />
        )
    },
    renderChoiceMulti: function(value, i){
        const {answer} = this.state;
        return(
            <Checkbox disabled={this.props.disabled || answer.submited} key={value + i} label={value}
                checked={answer.value[i]}
                onCheck={(e, v)=>{
                    const value = R.update(i, v, answer.value);
                    this.setState({answer : {...answer, value}});
                }}
            />
        )
    },
    getAttachment: function(){
        const {answer} = this.state;
        if(answer.value){
            return {
                id: answer.value.id,
                name: answer.value.name,
                url: 'https://couch.bizzotech.com/mis_workshop_v1/mis-files/' + answer.value.id + '/' + answer.value.name
            }
        }
    },
    renderAttachment: function(){
        const {answer} = this.state;
        const file = this.getAttachment();
        if(file){
            return (
                <a href={file.url}>{file.name}</a>
            )
        }
    },
    renderAttachArea: function(){
        const {answer} = this.state;
        if(answer.submited){
            return(
                <div>
                    <h3>The Attached File : {this.renderAttachment()}</h3>
                </div>
            )
        }
        if(this.props.disabled){
            return;
        }
        return(
            <div>
                <h3>Attach your answer file :</h3>
                <div>
                    <h3>The Attached File : {this.renderAttachment()}</h3>
                </div>
                <UploadFile afterUpload={(file)=>{
                    const value = {
                        id: file._id,
                        name: file.name,
                        content_type: file.content_type
                    }
                    console.log(value);
                    this.setState({answer: {...answer, value}})
                }}/>

                {this.renderAttachment()}
            </div>
        )
    },
    renderTrueFalse: function(){
        const {answer} = this.state;
        return(
            <div>
                <Checkbox disabled={this.props.disabled || answer.submited} label="True"
                    checked={answer.value === "true"}
                    onCheck={()=>{
                        this.setState({answer : {...answer, value : "true"}})
                    }}
                />
                <Checkbox disabled={this.props.disabled || answer.submited} label="False"
                    checked={answer.value === "false"}
                    onCheck={()=>{
                        this.setState({answer : {...answer, value : "false"}})
                    }}
                />
            </div>

        )
    },
    renderEssay: function(){
        const {answer} = this.state;
        return(
            <div>
                <h3>Write your answer :</h3>
                <TextField value={answer.value} name={"answer_essay"}
                    style={{width: '100%'}}
                    multiLine={true} rows={6} disabled={this.props.disabled || answer.submited}
                  onChange={(e, value)=>{
                    this.setState({answer : {...answer, value}});
                  }}/>
            </div>

        )
    },
    renderBody: function(){
        const {answer} = this.state;
        const {question} = this.props;
        switch (question.kind) {
            case 'choose_single':
                return (
                    <div>
                        <h3>Choose the correct answer : </h3>
                        {question.choices.map(this.renderChoiceSingle)}
                    </div>
                );
            case 'choose_multi':
                return (
                    <div>
                        <h3>Choose all the correct answers : </h3>
                        {question.choices.map(this.renderChoiceMulti)}
                    </div>
                );
            case 'true_false':
                return this.renderTrueFalse();
            case 'essay':
                return this.renderEssay();
            case 'attach':
                return this.renderAttachArea();
            default:
                return

        }
    },
    render: function(){
        const {question} = this.props;
        return (
          <div  style={{width: '80%'}}>
            <h1>{question.title}</h1>
            <h3>{question.text}</h3>

            <br />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%'}}>
                    {this.renderBody()}
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{fontSize: '30px'}}>{this.props.answer.mark}/{question.max_points || 1}</span>
                </div>
            </div>


          </div>
        )
    }
});

export default QuestionView;
