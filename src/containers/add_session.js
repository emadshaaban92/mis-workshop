import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from '../components/session_form';
import RaisedButton from 'material-ui/RaisedButton';

import {insertSession} from '../action_creators';

import uuid from 'node-uuid';

const AddSession = React.createClass({
    getInitialState: function(){
        return {
            session : {
                _id : "session_" + uuid.v1(),
                title: '',
                type : "session",
                discussions: [],
                quizes: [],
                questions: [],
                files: [],
                live: false,
                public: false
            }
        }
    },
    saveSession : function(){
        const {session} = this.state;
        this.props.dispatch(insertSession(session));
        this.props.afterInsert(session._id);
    },
    render : function(){
        return (
            <div>
                <SessionForm session={this.state.session} onChange={(session)=> {this.setState({session})}} />
                <RaisedButton label="Save Session" primary={true}
                      onClick={this.saveSession}/>
            </div>

        )
    }
});



export default connect()(AddSession);
