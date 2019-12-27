import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../Sessions/context';
import { withFirebase } from '../Firebase/context';

//  ***Material-Ui Componenets***
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

//  ***Icons***
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import BioIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import ListIcon from '@material-ui/icons/List';
import CommentIcon from '@material-ui/icons/Feedback';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

//  ***Colors***
import { red, indigo, green } from '@material-ui/core/colors';

//  ***Styles

const useStyles = makeStyles(theme => ({
  infoDiv: {
    margin: 20,
    padding: 5
  },
  infoPaper: {
    textAlign: 'left',
    display: 'flex',
    margin: 10
  },
  icon: {
    width: '50%',
    height: '50%',
    padding: '5%',
    margin: 5,
    borderRight: '1px solid grey'
  },
  subTitle: {
    padding: '0'
  },
  addButton: {
    color: red[600],
    position: 'relative',
    float: 'right',
    marginTop: 20
  },
  editButton: {
    color: green[300],
    float: 'right',
    marginTop: '50%',
    marginRight: '-10px'
  }
}));
const Profile = ({ firebase }) => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [bioData, setBioData] = useState('');
  const [bioUpdated, setBioUpdated] = useState(false);
  const authUser = useAuthContext();
  const docRef = firebase.db.collection('users').doc(authUser.authUser.uid);

  useEffect(() => {
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          //   console.log(doc.data());
          setProfileData(doc.data());
          if (profileData.bioData) {
            setBioData(profileData.bioData);
          }
        } else {
          console.log('no such document');
        }
      })
      .catch(err => console.log(err));
  }, [firebase.db, authUser.authUser.uid, bioUpdated]);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const bioClickHandler = () => {
    docRef
      .set({ bioData }, { merge: true })
      .then(results => setBioUpdated(!bioUpdated))
      .catch(err => console.log(err));
    setAnchorEl(null);
  };

  const bioChangeHandler = e => {
    setBioData(e.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'bio-form-popover' : undefined;
  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.infoPaper}>
              <Grid container>
                <Grid item xs={4}>
                  <BioIcon className={classes.icon} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle1'>Biography</Typography>
                  {profileData.bioData ? (
                    <div>
                      {profileData.bioData}
                      <IconButton
                        className={classes.editButton}
                        onClick={handleClick}
                        aria-describedby={id}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <IconButton
                      className={classes.addButton}
                      onClick={handleClick}
                      aria-describedby={id}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Paper className={classes.infoPaper}>
              <Grid container>
                <Grid item xs={6}>
                  <FavoriteIcon
                    className={classes.icon}
                    style={{ color: red[300] }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.subTitle} variant='subtitle1'>
                    Favorites
                  </Typography>
                  <Typography variant='h4'>12</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4}>
            <Paper className={classes.infoPaper}>
              <Grid container>
                <Grid item xs={6}>
                  <CommentIcon
                    className={classes.icon}
                    style={{ color: indigo[300] }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography className={classes.subTitle} variant='subtitle1'>
                    Comments
                  </Typography>
                  <Typography variant='h4'>12</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Grid container style={{ padding: 10, margin: 10 }}>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor='bioText'>A short bio</InputLabel>
                <Input
                  multiline={true}
                  autoFocus={true}
                  color='secondary'
                  type='text'
                  rows='5'
                  value={bioData}
                  onChange={bioChangeHandler}
                />
              </FormControl>
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={bioClickHandler}
                    style={{ margin: 10 }}
                  >
                    Add Bio
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Popover>
      </div>
    </div>
  );
};

export default withFirebase(Profile);
