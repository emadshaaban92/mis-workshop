import React from 'react';
import MoveUP from 'material-ui/svg-icons/navigation/arrow-upward';
import MoveDown from 'material-ui/svg-icons/navigation/arrow-downward';
import IconButton from 'material-ui/IconButton';

import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  width : 30,
  height : 30
};

const buttonStyles = {
  width : 30,
  height : 30
};

const MoveIcon = (props) => {
  if(props.direction === "up"){
    return (
      <IconButton style={buttonStyles} iconStyle={iconStyles} {...props}><MoveUP color={blue500} /></IconButton>
    );
  }
  return (
    <IconButton style={buttonStyles} iconStyle={iconStyles} {...props}><MoveDown color={red500} /></IconButton>
  );
}

export default MoveIcon;
