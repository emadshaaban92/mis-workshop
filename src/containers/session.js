import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import uuid from 'node-uuid';
import R from 'ramda';

import AddQuiz from './add_quiz';
import Quiz from './quiz';

import {addQuizToSession} from '../action_creators';

const Session = React.createClass({
    renderForAuthor: function(){
        return(
            <div style={{width: '100%'}}>
                <h1>{this.props.session.title}</h1>
                <div style={{width: '100%'}}>
                    <Tabs style={{width: '100%'}}>
                      <Tab label="Discussion" >

                      </Tab>
                      <Tab label="Quizes" >
                        <AddQuiz afterInsert={(quiz_id)=>{
                            this.props.dispatch(addQuizToSession(quiz_id, this.props.session));
                        }}/>
                        <br />
                        {this.props.session.quizes.map((quiz)=>{ return <Quiz quiz_id={quiz.id} />})}

                      </Tab>
                      <Tab label="Questions" >

                      </Tab>
                      <Tab label="Files" >

                      </Tab>
                    </Tabs>

                </div>
            </div>
        )
    },
    renderForStudent: function(){
        return(
            <div style={{width: '100%'}}>
                <h1>{this.props.session.title}</h1>
                <div style={{width: '100%'}}>
                    <Tabs style={{width: '100%'}}>
                      <Tab label="Discussions" >

                      </Tab>
                      <Tab label="Quizes" >
                        {this.props.session.quizes.map((quiz)=>{ return <Quiz quiz_id={quiz.id} />})}
                      </Tab>
                      <Tab label="Questions" >

                      </Tab>
                      <Tab label="Files" >

                      </Tab>
                    </Tabs>

                </div>
            </div>
        )
    },
    render: function(){
        if(localStorage.getItem('auther') === "true"){
            return this.renderForAuthor();
        }
        return this.renderForStudent();
    }
});

export default connect((state, {session_id})=>{
    const session = state.sessions.find((session)=>{return session._id === session_id});
    //const quizes = session.quizes.map((quiz)=>{return })
    return {
        session
    }
})(Session)
