import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

//material-ui
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CommentIcon from '@material-ui/icons/CommentOutlined';

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

const urlFirst = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
const urlLast = '&jscmd=data&format=json';
const BookCard = ({ bookData }) => {
  const classes = useStyles();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios.get(urlFirst + bookData + urlLast).then(result => {
      setBook(result.data);
      console.log(book);
    });
    return () => {};
  }, []);

  const objData = book[`ISBN:${bookData}`];

  const bookDataProcessed = {
    title: objData && objData.title,
    author:
      objData && objData.authors
        ? objData.authors[0].name
        : 'author not listed',
    cover: objData && objData.cover.medium,
    coverTitle: objData && objData.title + 'cover image',
    contents: objData && objData.table_of_contents,
    excerpts: objData && objData.excerpts,
    availability:
      objData && objData.ebooks
        ? objData.ebooks[0].availability
        : 'availibility no listed',
    preview: objData && objData.ebooks ? objData.ebooks[0].preview_url : '#',
    borrow: objData && objData.ebooks ? objData.ebooks[0].borrow_url : '#'
  };

  const addComment = () => {};

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
          <Button>
            <CommentIcon />
          </Button>
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

export default BookCard;
