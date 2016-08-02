import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';

import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  width : 60,
  height : 60
};

const buttonStyles = {
  position : 'absolute',
  bottom : 20,
  right : 20,
  width : 60,
  height : 60
};

const AddIcon = (props) => {
  return (
    <IconButton style={buttonStyles} iconStyle={iconStyles} {...props}><ContentAdd color={blue500} /></IconButton>

  );
}

export default AddIcon;
