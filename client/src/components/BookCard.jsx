import React from 'react';

// ***FireBase***

//  ***material-ui***
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';

import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AddFavorite from './utils/AddFavorite';

//styles
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    maxHeight: 550
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },

  alignLeft: {
    textAlign: 'left'
  }
}));

const BookCard = ({ bookData }) => {
  const classes = useStyles();

  const objData = bookData[1][`ISBN:${bookData[0]}`];

  const bookDataProcessed = {
    title: objData.title,
    author: objData.authors ? objData.authors[0].name : 'author not listed',
    cover: objData.cover.medium,
    coverTitle: objData.title + 'cover image',
    contents: objData.table_of_contents,
    excerpts: objData.excerpts,
    availability: objData.ebooks
      ? objData.ebooks[0].availability
      : 'availibility no listed',
    preview: objData.ebooks ? objData.ebooks[0].preview_url : '#',
    borrow: objData.ebooks ? objData.ebooks[0].borrow_url : '#'
  };

  // const addToFav = () => {
  //   if (userId !== null) {
  //     let favArr = [];
  //     console.log(userId);
  //     // ***get user favorite array***
  //     firebase.db
  //       .collection('favorites')
  //       .doc(userId)
  //       .get()
  //       .then(doc => {
  //         if (doc.exists) {
  //           const favData = doc.data();
  //           favArr = favData.favArr;
  //           //  ***add books ibsn to fav array***
  //           favArr = [...favArr, bookData[0]];
  //           //  ***Post to firebase
  //           firebase.db
  //             .collection('favorites')
  //             .doc(userId)
  //             .set({ favArr })
  //             .then(() => console.log('added', favArr))
  //             .catch(err => console.log(err));
  //         } else {
  //           console.log('no favorites');
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={bookDataProcessed.title}
          subheader={bookDataProcessed.author}
        />
        <CardMedia
          className={classes.media}
          image={bookDataProcessed.cover}
          title={bookDataProcessed.coverTitle}
        />
        <CardContent>
          <Grid container justify='center'>
            <Grid item xs={3} md={4}>
              {bookDataProcessed.availability === 'borrow' && (
                <Link
                  href={bookDataProcessed.borrow}
                  target='_blank'
                  rel='norederrer '
                >
                  <Button
                    aria-label='Borrow the book'
                    variant='contained'
                    color='primary'
                  >
                    Borrow
                  </Button>
                </Link>
              )}
            </Grid>
            <Grid item xs={6} md={4}>
              <Link
                href={bookDataProcessed.preview}
                rel='noreferrer'
                target='_blank'
              >
                <Button varient='contained' color='secondary'>
                  Preview
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label='add to favorites' onClick={addToFav}>
            <FavoriteIcon />
          </IconButton> */}
          <AddFavorite isbn={bookData[0]} />
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default BookCard;
