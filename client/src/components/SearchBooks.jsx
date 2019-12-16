import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SearchContext from '../context';
import { Typography, List } from '@material-ui/core';
import BookCard from './BookCard';
import BookSearchResult from './BookSearchResult';

const urlBase = 'http://openlibrary.org/search.json?';

const SearchBooks = () => {
  let searchInfo = useContext(SearchContext);
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    if (searchInfo.searchData.type === 'author') {
      axios
        .get(urlBase + 'author=' + searchInfo.searchData.value)
        .then(results => setSearchData(results.data))
        .catch(err => console.log(err));
    } else if (searchInfo.searchData.type === 'title') {
      axios
        .get(urlBase + 'title=' + searchInfo.searchData.value)
        .then(results => setSearchData(results.data))
        .catch(err => console.log(err));
    } else {
      axios
        .get(urlBase + 'q=' + searchInfo.searchData.value)
        .then(results => setSearchData(results.data))
        .catch(err => console.log(err));
    }
  }, [searchInfo.searchData]);
  return (
    <div>
      <Typography variant='h3'>
        {searchData.num_found} results for {searchInfo.searchData.value}
      </Typography>
      <List>
        {searchData.docs &&
          searchData.docs.map(book => (
            <BookSearchResult
              key={book.title_suggest}
              bookData={book}
            ></BookSearchResult>
          ))}
      </List>
    </div>
  );
};

export default SearchBooks;
