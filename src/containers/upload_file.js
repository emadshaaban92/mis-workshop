import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuid from 'node-uuid';

import RaisedButton from 'material-ui/RaisedButton';

import {insertFile} from '../action_creators';

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

const UploadFile = ({dispatch, user, afterUpload}) => {
    return (
        <RaisedButton label="Attach File" labelPosition="before" style={styles.button}>
          <input type="file" style={styles.exampleImageInput}
              onChange={(e)=>{
                  const file =  e.target.files[0];
                  const _attachments = {};
                  _attachments[file.name] = {
                      'content_type': file.type,
                      data: file
                  }
                  const fileObj = {
                      _id : "file_" + uuid.v1(),
                      type: "file",
                      user,
                      name : file.name,
                      content_type: file.type,
                      _attachments
                  }

                  dispatch(insertFile(fileObj));
                  afterUpload(fileObj)
              } }/>
        </RaisedButton>
    )
}

export default connect()(UploadFile);
