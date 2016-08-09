import React, { Component } from 'react';
import R from 'ramda';
import uuid from 'node-uuid';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SessionFormInput = (props) => {
    const {form, label, name} = props;
    return (
        <TextField {...props}
          floatingLabelText={label}
          value={form.state.session[name]}
          onChange={(e, new_input)=>{
              const session = {...form.state.session};
              session[name] = new_input;
              form.setState({session});
          }}
          style={{width: '556px'}}
        />
    )
}

const SessionForm = React.createClass({
    getInitialState: function() {
        return {
            session : this.props.session
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.session){
            this.setState({session: nextProps.session});
        }
    },
    componentDidUpdate: function(prevProps, prevState){
        if(prevState.session !== this.state.session)
            this.props.onChange(this.state.session);
    },
    render: function(){
        const {session} = this.state;
        return (
            <div>
              <SessionFormInput form={this} label="Title" name="title" />
            </div>
        )
    }
})


export default SessionForm;
