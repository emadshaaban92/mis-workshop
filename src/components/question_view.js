import React, { Component } from 'react';

import R from 'ramda';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

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
        if(nextProps.answer){
            this.setState({...this.state, answer: nextProps.answer});
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(prevState.answer !== this.state.answer)
            this.props.onChange(this.state.answer);
        console.log(this.state);
    },
    renderChoice: function(value, i){
        return(
            <Checkbox disabled={this.state.answer.submited} key={i} label={value}
                checked={value == this.state.answer.value}
                onCheck={()=>{
                    const {answer} = this.state;
                    this.setState({...this.state, answer : {...answer, value}})
                }}
            />
        )
    },
    getAttachmentUrl: function(){
        const {answer} = this.state;
        if(answer._attachments){
            const names = R.keys(answer._attachments);
            console.log(names)
            return 'http://couch.bizzotech.com/mis_workshop_v1/' + localStorage.getItem('dbName') + '/' + answer._id + '/' + names[0];
        }
    },
    renderAttachment: function(){
        const url = this.getAttachmentUrl();
        if(url){
            const names = R.keys(answer._attachments);
            return (
                <a href={url}>{names[0]}</a>
            )
        }
    },
    renderAttachArea: function(){
        return(
            <div>
                <RaisedButton
                  label="Attach File"
                  labelPosition="before"
                  style={styles.button}
                >
                  <input type="file"
                      style={styles.exampleImageInput}
                      onChange={(e)=>{
                          const file =  e.target.files[0];
                          const _attachments = {};
                          _attachments[file.name] = {
                              'content_type': file.type,
                              data: file
                          }
                          this.setState({...this.state, answer: {...answer, _attachments}})
                      } }/>
                </RaisedButton>

                {this.renderAttachment()}
            </div>
        )
    },
    render: function(){
        const {answer} = this.state;
        const {question} = this.props;
        return (
          <div>
            <h1>{question.title}</h1>
            <h3>{question.text}</h3>
            {question.choices.map(this.renderChoice)}

            <br />

            {this.renderAttachArea()}

          </div>
        )
    }
});

export default QuestionView;
