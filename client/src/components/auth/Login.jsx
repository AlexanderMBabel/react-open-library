import React from 'react';

//material - ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

const Login = () => {
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
              <TextField required label='email' type='email' />
              <TextField required label='password' type='password' />
              <Button>Login</Button>
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
