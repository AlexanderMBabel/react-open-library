import React, { useState } from 'react';
import history from '../../history';
import { withRouter } from 'react-router-dom';

//firebase
import { withFirebase } from '../Firebase/context';

//material - ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

const initialFormData = {
  userName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  error: null
};

const Register = () => (
  <div>
    <RegisterForm />
  </div>
);

const RegisterBase = ({ firebase }) => {
  const [formData, setFormData] = useState(initialFormData);

  const changeHandler = e => {
    const tempData = { ...formData };
    tempData[e.target.name] = e.target.value;
    setFormData(tempData);
  };
  const submitHandler = e => {
    e.preventDefault();
    const { email, password } = formData;
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        setFormData(initialFormData);
        history.push('/dashboard');
      })
      .catch(error => {
        formData({ ...formData, error });
      });
  };
  return (
    <div>
      <Grid
        container
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          alignItems: 'center',
          justifyItems: 'center',
          height: '50rem'
        }}
      >
        <Grid item style={{ alignSelf: 'center', justifySelf: 'center' }}>
          <Paper>
            <FormGroup autoComplete='off' style={{ padding: 50 }}>
              <TextField
                required
                name='userName'
                onChange={changeHandler}
                value={formData.userName}
                label='userName'
                type='text'
              />
              <TextField
                required
                name='email'
                onChange={changeHandler}
                value={formData.email}
                label='email'
                type='email'
              />
              <TextField
                name='password'
                onChange={changeHandler}
                value={formData.password}
                required
                label='password'
                type='password'
              />
              <TextField
                required
                name='passwordRepeat'
                onChange={changeHandler}
                value={formData.passwordRepeat}
                label='Repeat Password'
                type='password'
              />
              <Button onClick={submitHandler}>Register</Button>
            </FormGroup>

            {formData.error && <p>formData.error.message</p>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const RegisterForm = withRouter(withFirebase(RegisterBase));

export default Register;
