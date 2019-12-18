import React from 'react';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

//material-ui
const BookSearchResult = ({ bookData }) => {
  console.log(bookData.isbn);
  return (
    <div>
      <ListItem>
        <ListItemText
          primary={bookData.title}
          secondary={bookData.author_name && bookData.author_name[0]}
        ></ListItemText>
        <Link to={`/showbook/${bookData.isbn && bookData.isbn[0]}`}>
          <Button variant='contained'>View</Button>
        </Link>
      </ListItem>
    </div>
  );
};

export default BookSearchResult;
