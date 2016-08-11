import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuid from 'node-uuid';

import RaisedButton from 'material-ui/RaisedButton';

import {insertFile} from '../action_creators';

const UploadFile = React.createClass({
    upload: function(){
        const {dispatch, user, afterUpload} = this.props;
        const file = this.refs.file.files[0];
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
        this.refs.file.value = "";
    },
    render : function(){
        const {dispatch, user, afterUpload} = this.props;
        return (
            <div>
                <input type="file" ref="file" />
                <button onClick={this.upload}>Upload</button>
            </div>
        )
    }
})


export default connect()(UploadFile);
