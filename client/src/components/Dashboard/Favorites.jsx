import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase/context';
import { useAuthContext } from '../Sessions/context';

import FavoriteBookCard from '../FavoriteBookCard';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  container_grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: 'auto'
  },
  add_margin: {
    margin: 10
  }
}));

const Favorites = ({ firebase }) => {
  const classes = useStyles();
  const [favoriteArr, setFavoriteArr] = useState([]);
  const authUser = useAuthContext();

  useEffect(() => {
    const docRef = firebase.db
      .collection('favorites')
      .doc(authUser.authUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const docData = doc.data();
          setFavoriteArr(docData.favArr);
        } else {
          console.log('no such document exists');
        }
      })
      .catch(err => console.log(err));
  }, [firebase.db, authUser.authUser.uid]);

  return (
    <div className={classes.container_grid}>
      {favoriteArr.map(favorite => (
        <FavoriteBookCard
          className={classes.add_margin}
          key={favorite}
          bookData={favorite}
        />
      ))}
    </div>
  );
};

export default withFirebase(Favorites);
