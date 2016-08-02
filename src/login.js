import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const authUser = (username, password) =>{
  const dbName = 'mis-' + username;
  const url = "http://couch.bizzotech.com:5984/_users/org.couchdb.user:" + username;
  return fetch(url, {
    headers: {
     'Authorization': 'Basic '+btoa(username + ":" + password)
   }
 }).then(function(respnonse){
    if(respnonse.status == 200){
      localStorage.setItem('loggedIn', 1);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('dbName', dbName);

      location.reload();
    }
  });
}


const Login = React.createClass({
  getInitialState: function() {
    return {
      username : '',
      password : ''
    };
  },
  render : function(){
    return (
      <div>
        <TextField
          floatingLabelText="Username"
          value={this.state.username}
          onChange={(e, username)=>{this.setState({...this.state, username})}}
        />
        <br />
        <TextField
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={(e, password)=>{this.setState({...this.state, password})}}
        />
        <br />
        <RaisedButton label="Login" primary={true}
          onClick={()=>{
            authUser(this.state.username, this.state.password)
          }}/>
      </div>
    )
  }
})

export default Login;
