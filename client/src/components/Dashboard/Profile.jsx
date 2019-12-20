import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../Sessions/context';
import { withFirebase } from '../Firebase/context';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//icons
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  infoDiv: {
    margin: 20,
    padding: 5
  },
  infoPaper: {
    textAlign: 'left',
    display: 'flex'
  }
}));
const Profile = ({ firebase }) => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({});
  const authUser = useAuthContext();

  useEffect(() => {
    const docRef = firebase.db.collection('users').doc(authUser.authUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          //   console.log(doc.data());
          setProfileData(doc.data());
        } else {
          console.log('no such document');
        }
      })
      .catch(err => console.log(err));
  }, [firebase.db, authUser.authUser.uid]);
  return (
    <div>
      <div>
        <Paper className={classes.infoPaper}>
          <p className={classes.infoDiv}>
            <AccountIcon /> <span>{profileData.userName}</span>
          </p>
          <p className={classes.infoDiv}>
            <EmailIcon />
            <span>{profileData.email}</span>
          </p>
          <div>
            favorite Books
            <Typography>
              {profileData.favoriteBooks &&
                profileData.favoriteBooks.map(book => <p>book</p>)}
            </Typography>
          </div>
          <div>
            favorite Books
            <Typography>
              {profileData.favoriteBooks &&
                profileData.favoriteBooks.map(book => <p>book</p>)}
            </Typography>
          </div>
        </Paper>
      </div>

      <Button>Edit</Button>
    </div>
  );
};

export default withFirebase(Profile);
