import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase/context';
import { useAuthContext } from '../Sessions/context';

import FavoriteBookCard from '../FavoriteBookCard';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  const [newArr, setNewArr] = useState(false);
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
          console.log(docData);
          let tempArr = [];
          for (var key in docData) {
            if (docData.hasOwnProperty(key)) {
              tempArr.push(docData[key]);
            }
          }
          setFavoriteArr(tempArr);
        } else {
          console.log('no such document exists');
        }
      })
      .catch(err => console.log(err));
  }, [firebase.db, authUser.authUser.uid, newArr]);

  return (
    <div>
      <Grid container spacing={3}>
        {favoriteArr.map(favorite => (
          <Grid key={favorite} item xs={12} sm={6} lg={4}>
            <FavoriteBookCard
              className={classes.add_margin}
              bookData={favorite}
              newArr={newArr}
              setNewArr={setNewArr}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withFirebase(Favorites);
