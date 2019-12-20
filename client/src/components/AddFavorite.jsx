import React, { useEffect, useState } from 'react';
import { withFirebase } from './Firebase/context';
import { useAuthContext } from './Sessions/context';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteRounded';

const AddFavorite = ({ firebase, isbn }) => {
  const authUser = useAuthContext();
  const userId = authUser && authUser.authUser.uid;
  const addToFav = () => {
    console.log('clicked');
    if (userId !== null) {
      let favArr = [];
      console.log(userId);
      // ***get user favorite array***
      firebase.db
        .collection('favorites')
        .doc(userId)
        .get()
        .then(doc => {
          if (doc.exists) {
            const favData = doc.data();
            favArr = favData.favArr;
            //  ***add books ibsn to fav array***
            favArr = [...favArr, isbn];
            //  ***Post to firebase
            firebase.db
              .collection('favorites')
              .doc(userId)
              .set({ favArr })
              .then(() => console.log('added', favArr))
              .catch(err => console.log(err));
          } else {
            console.log('no favorites');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <IconButton onClick={addToFav}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

export default withFirebase(AddFavorite);
