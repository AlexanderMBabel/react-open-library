import React from 'react';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase/context';
import history from '../../history';

import Button from '@material-ui/core/Button';

const SignOut = ({ firebase }) => {
  const clickHandler = () => {
    firebase.doSignOut();
    history.push('/');
  };

  return <Button onClick={clickHandler}>Sign Out</Button>;
};

export default withRouter(withFirebase(SignOut));
