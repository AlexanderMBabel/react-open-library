import React, { useState } from 'react';
import { withFirebase } from '../Firebase/context';
import { useAuthContext } from '../Sessions/context';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteRounded';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const AddFavorite = ({ firebase, isbn }) => {
  const classes = useStyles();
  const authUser = useAuthContext();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const userId = authUser && authUser.authUser.uid;

  // useEffect(async () => {
  //   if (userId) {
  //     firebase.db
  //       .collection('favorites')
  //       .doc(userId)
  //       .get()
  //       .then(doc => {
  //         console.log('favCalled');
  //         if (doc.exists) {
  //           const favData = doc.data();
  //           setFavArray(favData.favArr);
  //           console.log(favData);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [userId]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const addToFav = () => {
    if (userId !== null) {
      console.log(userId);

      // *** add to firebase as string ***
      firebase.db
        .collection('favorites')
        .doc(userId)
        .set({ [isbn]: isbn }, { merge: true })
        .then(() => {
          setSnackMessage(`Favorite Added with ISBN: ${isbn}`);
          setOpenSnack(true);
        })
        .catch(err => console.log(err));
      // ***get user favorite array***
      // firebase.db
      //   .collection('favorites')
      //   .doc(userId)
      //   .get()
      //   .then(doc => {
      //     if (doc.exists) {
      //       const favData = doc.data();
      //       favArr = favData.favArr;
      //       //  ***add books ibsn to fav array***
      //       favArr = [...favArr, isbn];
      //       //  ***Post to firebase
      //       firebase.db
      //         .collection('favorites')
      //         .doc(userId)
      //         .set({ favArr })
      //         .then(() => console.log('added', favArr))
      //         .catch(err => console.log(err));
      //     } else {
      //       console.log('no favorites');
      //     }
      //   })
      //   .catch(err => console.log(err));
    } else {
      setSnackMessage('Already in favorites');
      setOpenSnack(true);
    }
  };

  return (
    <div>
      <IconButton onClick={addToFav}>
        <FavoriteIcon />
      </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{snackMessage}</span>}
        action={[
          <Button
            key='undo'
            color='secondary'
            size='small'
            onClick={handleClose}
          >
            UNDO
          </Button>,
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

export default withFirebase(AddFavorite);
