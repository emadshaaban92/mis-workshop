import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

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

    render: function(){
        const {answer} = this.state;
        const {question} = this.props;
        return (
          <div>
            <h1>{question.title}</h1>
            <h3>{question.text}</h3>
            {question.choices.map(this.renderChoice)}

            <br />


          </div>
        )
    }
});

export default QuestionView;
