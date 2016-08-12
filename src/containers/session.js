import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';


import uuid from 'node-uuid';
import R from 'ramda';

import AddQuiz from './add_quiz';
import Quiz from './quiz';

import AddQuestion from './add_question';
import Question from './question';

import UploadFile from './upload_file';

import {addQuizToSession, addQuestionToSession, addQuestionToSessionAssignment, updateSession,
    insertMessage, insertFile, addFileToSession, sessionStartLive, sessionStopLive} from '../action_creators';

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
  toggle: {
    marginBottom: 16,
  },
};

const Session = React.createClass({
    getNewMessage: function(){
        return {
            _id: 'message_' + uuid.v1(),
            session_id: this.props.session._id,
            name: localStorage.getItem('username'),
            type: 'message',
            anonymous: false,
            text: ''
        }
    },
    getInitialState: function(){
        return {
            selected_quiz: undefined,
            selected_question: undefined,
            selected_question_assignment: undefined,
            new_message: this.getNewMessage()
        }
    },
    renderLiveSessionButton: function(){
        const {session} = this.props;
        if(session.live){
            return <RaisedButton label="Stop" primary={true} onClick={()=>{
                    this.props.dispatch(sessionStopLive(session))
                }}/>
        }
        return <RaisedButton label="Live" primary={true} onClick={()=>{
                this.props.dispatch(sessionStartLive(session))
            }}/>

    },
    renderSelectedQuiz: function(){
        if(this.state.selected_quiz){
            return <Quiz disabled={true} quiz_id={this.state.selected_quiz} />
        }
    },
    renderSelectedQuestion: function(){
        if(this.state.selected_question){
            return <Question disabled={true} question_id={this.state.selected_question} />
        }
    },
    renderSelectedQuestionAssignment: function(){
        if(this.state.selected_question_assignment){
            return <Question question_id={this.state.selected_question_assignment} />
        }
    },
    renderLiveQuizButton: function(){
        if(this.state.selected_quiz){
            const {selected_quiz} = this.state;
            const {session} = this.props;
            const quiz = session.quizes.find((q)=>{return q.id === selected_quiz});
            const quiz_index = session.quizes.indexOf(quiz);
            if(quiz.live){
                return <RaisedButton label="Stop" primary={true} onClick={()=>{
                        const quizes = R.update(quiz_index, {...quiz, live:false}, session.quizes)
                        this.props.dispatch(updateSession({...session, quizes}))
                    }}/>
            }
            return <RaisedButton label="Live" primary={true} onClick={()=>{
                    const quizes = R.update(quiz_index, {...quiz, live:true, public:true}, session.quizes)
                    this.props.dispatch(updateSession({...session, quizes}))
                }}/>
        }

    },
    renderLiveQuestionButton: function(){
        if(this.state.selected_question){
            const {selected_question} = this.state;
            const {session} = this.props;
            const question = session.questions.find((q)=>{return q.id === selected_question});
            const question_index = session.questions.indexOf(question);
            if(question.live){
                return <RaisedButton label="Stop" primary={true} onClick={()=>{
                        const questions = R.update(question_index, {...question, live:false}, session.questions)
                        this.props.dispatch(updateSession({...session, questions}))
                    }}/>
            }
            return <RaisedButton label="Live" primary={true} onClick={()=>{
                    const questions = R.update(question_index, {...question, live:true, public:true}, session.questions)
                    this.props.dispatch(updateSession({...session, questions}))
                }}/>
        }

    },
    renderDiscussions: function(){
        const {session} = this.props;
        const {new_message} = this.state;
        return(
            <div style={{width: '100%'}}>
                <TextField floatingLabelText="Say Something"
                    style={{width: '100%'}} multiLine={true}
                    value={new_message.text}
                    onChange={(e, text)=>{this.setState({new_message: {...new_message, text}})}}
                />
                <br/>
                <RaisedButton label="Send" primary={true} onClick={()=>{
                        this.props.dispatch(insertMessage(new_message));
                        this.setState({new_message: this.getNewMessage()});
                    }}/>
                <Checkbox label="Anonymous" defaultChecked={new_message.anonymous}
                    onCheck={()=>{
                        this.setState({new_message : {...new_message, anonymous: !new_message.anonymous}})
                    }}/>
                <br/>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0', overflowWrap: 'break-word' }}>
    				{this.props.messages.map((msg, k) => {
                        const name = msg.anonymous ? "Anonymous" : msg.name;
    					return <li key={k} style={{ padding: '5px 10px' }}><span style={{ fontWeight: 'bold' }}>{name}:</span> {msg.text}</li>
    				})}
    			</ul>

            </div>
        )
    },
    getAttachments: function(){
        const {files} = this.props.session;
        return files.map((file)=>{
            return {
                id: file.id,
                name: file.name,
                url: 'https://couch.bizzotech.com/mis_workshop_v1/mis-files/' + file.id + '/' + file.name
            }
        })
    },
    getPublicAttachments: function(){
        const {public_files} = this.props;
        return public_files.map((file)=>{
            return {
                id: file.id,
                name: file.name,
                url: 'https://couch.bizzotech.com/mis_workshop_v1/mis-files/' + file.id + '/' + file.name
            }
        })
    },
    renderForAuthor: function(){
        const {session, quizes, questions, assignment_questions, messages, files, dispatch} = this.props;
        const {selected_quiz, selected_question, selected_question_assignment} = this.state;
        const selected_question_assignment_obj = session.assignment.find((q)=>{return q.id === selected_question_assignment});
        const selected_question_assignment_index = session.assignment.indexOf(selected_question_assignment_obj);
        return(
            <div style={{width: '100%'}}>
                <h1>{session.title}</h1>
                {this.renderLiveSessionButton()}
                <div style={{width: '10%'}}>
                    <Toggle label="Public" style={styles.toggle}
                        defaultToggled={session.public} onToggle={()=>{
                            dispatch(updateSession({
                                ...session,
                                public: !session.public
                            }))
                        }}
                    />
                </div>

                <div style={{width: '100%'}}>
                    <Tabs style={{width: '100%'}}>
                      <Tab label="Discussion" >
                          {this.renderDiscussions()}
                      </Tab>
                      <Tab label="Quizes" >
                        <AddQuiz afterInsert={(quiz_id)=>{
                            dispatch(addQuizToSession(quiz_id, session));
                        }}/>
                        <br />
                        <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                            <div style={{width: '30%'}}>
                                <List>
                                  {quizes.map((quiz)=>{
                                      return <ListItem key={quiz._id} primaryText={quiz.title} onClick={()=>{
                                              this.setState({selected_quiz: quiz._id})
                                          }} />
                                  })}
                                </List>
                            </div>
                            <div style={{width: '70%'}}>
                                <div style={{width: '100%'}}>
                                    {this.renderSelectedQuiz()}
                                    <br />
                                    {this.renderLiveQuizButton()}
                                </div>

                            </div>
                        </div>

                      </Tab>
                      <Tab label="Questions" >
                          <AddQuestion afterInsert={(question_id)=>{
                              dispatch(addQuestionToSession(question_id, session));
                          }}/>
                          <br />
                          <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                              <div style={{width: '30%'}}>
                                  <List>
                                    {questions.map((question)=>{
                                        return <ListItem key={question._id} primaryText={question.title} onClick={()=>{
                                                this.setState({selected_question: question._id})
                                            }} />
                                    })}
                                  </List>
                              </div>
                              <div style={{width: '70%'}}>
                                  <div style={{width: '100%'}}>
                                      {this.renderSelectedQuestion()}
                                      <br />
                                      {this.renderLiveQuestionButton()}
                                  </div>
                              </div>
                          </div>
                      </Tab>
                      <Tab label="Assignment" >
                          <AddQuestion afterInsert={(question_id)=>{
                              dispatch(addQuestionToSessionAssignment(question_id, session));
                          }}/>
                          <br />
                          <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                              <div style={{width: '30%'}}>
                                  <List>
                                    {assignment_questions.map((question)=>{
                                        return <ListItem key={question._id} primaryText={question.title} onClick={()=>{
                                                this.setState({selected_question_assignment: question._id})
                                            }} />
                                    })}
                                  </List>
                              </div>
                              <div style={{width: '70%'}}>
                                  <div style={{width: '100%'}}>
                                      {this.renderSelectedQuestionAssignment()}
                                      <br />
                                      {selected_question_assignment_obj ? <Toggle label="Public" style={styles.toggle}
                                          defaultToggled={selected_question_assignment_obj.public} onToggle={()=>{
                                              const i = selected_question_assignment_index;
                                              dispatch(updateSession({
                                                  ...session,
                                                  assignment: R.update(i, {...session.assignment[i], public: !selected_question_assignment_obj.public}, session.assignment)
                                              }))
                                          }}
                                      /> : null}
                                  </div>
                              </div>
                          </div>
                      </Tab>
                      <Tab label="Files" >
                        <UploadFile afterUpload={(file)=>{
                            dispatch(addFileToSession(file, this.props.session));
                        }}/>
                        <br/>
                        {this.getAttachments().map((file, i)=>{
                            return(
                                <div key={i}>
                                    <a href={file.url}>{file.name}</a> <a onClick={()=>{
                                        const files = session.files.filter((f)=>{
                                            return file.id !== f.id;
                                        });
                                        dispatch(updateSession({...session, files}));
                                    }}>delete</a>
                                    <Toggle label="Public" style={styles.toggle}
                                        defaultToggled={session.files[i].public} onToggle={()=>{
                                            dispatch(updateSession({
                                                ...session,
                                                files: R.update(i, {...session.files[i], public: !file.public}, session.files)
                                            }))
                                        }}
                                    />
                                </div>
                            )
                        })}
                      </Tab>
                    </Tabs>

                </div>
            </div>
        )
    },
    renderForStudent: function(){
        if(!this.props.session.public){
            return <div></div>
        }
        const {live_quiz, live_question} = this.props;
        if(live_quiz){
            return <Quiz quiz_id={live_quiz.id} />
        }
        if(live_question){
            return <Question question_id={live_question.id} />
        }
        return(
            <div style={{width: '100%'}}>
                <h1>{this.props.session.title}</h1>
                <div style={{width: '100%'}}>
                    <Tabs style={{width: '100%'}}>
                      <Tab label="Discussions" >
                          {this.renderDiscussions()}
                      </Tab>
                      <Tab label="Quizes" >
                        <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                            <div style={{width: '30%'}}>
                                <List>
                                  {this.props.public_quizes.map((quiz)=>{
                                      return <ListItem key={quiz._id} primaryText={quiz.title} onClick={()=>{
                                              this.setState({selected_quiz: quiz._id})
                                          }} />
                                  })}
                                </List>
                            </div>
                            <div style={{width: '70%'}}>
                                {this.renderSelectedQuiz()}
                            </div>
                        </div>
                      </Tab>
                      <Tab label="Questions" >
                          <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                              <div style={{width: '30%'}}>
                                  <List>
                                    {this.props.public_questions.map((question)=>{
                                        return <ListItem key={question._id} primaryText={question.title} onClick={()=>{
                                                this.setState({selected_question: question._id})
                                            }} />
                                    })}
                                  </List>
                              </div>
                              <div style={{width: '70%'}}>
                                  {this.renderSelectedQuestion()}
                              </div>
                          </div>
                      </Tab>
                      <Tab label="Assignment" >
                          <div style={{width : '100%', display: 'flex', flexDirection: 'row'}}>
                              <div style={{width: '30%'}}>
                                  <List>
                                    {this.props.public_assignment_questions.map((question)=>{
                                        return <ListItem key={question._id} primaryText={question.title} onClick={()=>{
                                                this.setState({selected_question_assignment: question._id})
                                            }} />
                                    })}
                                  </List>
                              </div>
                              <div style={{width: '70%'}}>
                                  {this.renderSelectedQuestionAssignment()}
                              </div>
                          </div>
                      </Tab>
                      <Tab label="Files" >
                          {this.getPublicAttachments().map((file, i)=>{
                              return(
                                  <div key={i}>
                                      <a href={file.url}>{file.name}</a>
                                  </div>
                              )
                          })}
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
    const messages = state.messages.filter((message)=>{return message.session_id === session._id});
    const public_files = session.files.filter((file)=>{
        return file.public;
    });
    const quizes = session.quizes.map((quiz)=>{
        return state.quizes.find((q)=> { return quiz.id === q._id});
    });
    const public_quizes = session.quizes.filter((quiz)=>{
        return quiz.public;
    }).map((quiz)=>{
        return state.quizes.find((q)=> { return quiz.id === q._id});
    });
    const questions = session.questions.map((question)=>{
        return state.questions.find((q)=> { return question.id === q._id});
    });
    const public_questions = session.questions.filter((question)=>{
        return question.public;
    }).map((question)=>{
        return state.questions.find((q)=> { return question.id === q._id});
    });
    const assignment_questions = session.assignment.map((question)=>{
        return state.questions.find((q)=> { return question.id === q._id});
    });
    const public_assignment_questions = session.assignment.filter((question)=>{
        return question.public;
    }).map((question)=>{
        return state.questions.find((q)=> { return question.id === q._id});
    });
    const live_quiz = session.quizes.find((quiz)=>{return quiz.live});
    const live_question = session.questions.find((question)=>{return question.live});
    return {
        session,
        messages,
        public_files,
        quizes,
        public_quizes,
        questions,
        public_questions,
        assignment_questions,
        public_assignment_questions,
        live_quiz,
        live_question
    }
})(Session)
