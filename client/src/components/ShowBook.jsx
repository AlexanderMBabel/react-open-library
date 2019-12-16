import React, { useEffect, useState } from 'react';
import axios from 'axios';
//material-ui
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';

const baseUrl = 'https://openlibrary.org/api/books?bibkeys=ISBN:';

const ShowBook = props => {
  const [bookData, setBookData] = useState({});
  console.log(props.match.params.isbn);
  useEffect(() => {
    axios
      .get(baseUrl + props.match.params.isbn + '&jscmd=data&format=json')
      .then(result =>
        setBookData(result.data[`ISBN:${props.match.params.isbn}`])
      )
      .catch(err => console.log(err));
  }, [props.match.params.isbn]);
  console.log(bookData);
  return (
    <div>
      <Paper>
        {bookData.cover && <img src={bookData.cover.medium} alt='book cover' />}
        <Typography variant='h4'>{bookData.title && bookData.title}</Typography>
        <Typography variant='subtitle1'>
          {bookData.authors && (
            <Link href={bookData.authors[0].url} target='_blank' rel='noopener'>
              {bookData.authors[0].name}
            </Link>
          )}
        </Typography>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default ShowBook;
