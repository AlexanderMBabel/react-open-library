import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import _ from 'lodash';
import { withFirebase } from './Firebase/context';
import { useAuthContext } from './Sessions/context';
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

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
import CommentIcon from '@material-ui/icons/CommentOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//styles
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 250,
    maxHeight: 400,
    margin: 10
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

const urlFirst = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
const urlLast = '&jscmd=data&format=json';
const BookCard = ({ bookData, firebase, setNewArr, newArr }) => {
  const classes = useStyles();
  const [book, setBook] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const authUser = useAuthContext();

  useEffect(() => {
    axios.get(urlFirst + bookData + urlLast).then(result => {
      setBook(result.data);
    });
    return () => {};
  }, [bookData]);

  const objData = book[`ISBN:${bookData}`];

  const bookDataProcessed = {
    title: objData ? objData.title : '',
    author: objData
      ? objData.authors
        ? objData.authors[0].name
        : 'author not listed'
      : '',
    cover: objData ? objData.cover.medium : 'some',
    coverTitle: objData ? objData.title + 'cover image' : '',
    contents: objData ? objData.table_of_contents : '',
    excerpts: objData ? objData.excerpts : '',
    availability: objData
      ? objData.ebooks
        ? objData.ebooks[0].availability
        : 'availibility no listed'
      : '',
    preview: objData
      ? objData.ebooks
        ? objData.ebooks[0].preview_url
        : '#'
      : '',
    borrow: objData ? (objData.ebooks ? objData.ebooks[0].borrow_url : '#') : ''
  };

  const addComment = () => {};

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    const userId = authUser.authUser.uid;
    if (userId !== null) {
      firebase.db
        .collection('favorites')
        .doc(userId)
        .update({
          [bookData]: firebase.delete()
        })
        .then(result => setNewArr(!newArr))
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

      //       //  ***remove books ibsn to fav array***
      //       _.remove(favArr, n => n === bookData);

      //       //  ***Post to firebase***
      //       firebase.db
      //         .collection('favorites')
      //         .doc(userId)
      //         .set({ favArr })
      //         .then(() => {
      //           setNewArr(favArr);
      //         })
      //         .catch(err => console.log(err));
      //     } else {
      //       console.log('no favorites');
    }
  };
  return (
    <div>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Edit Comment</MenuItem>
      </Menu>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton aria-label='settings' onClick={handleMenu}>
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
            <Grid item xs={6} md={6}>
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
            <Grid item xs={6} md={6}>
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
          <IconButton aria-label='add a comment' onClick={addComment}>
            <CommentIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default withFirebase(BookCard);
