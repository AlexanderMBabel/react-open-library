import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

//   *** Context ***
import catagoryContext from './context';

import ShowCatagoryBook from './ShowCatagoryBook';

//   *** Material-Ui ***
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const BooksByCatagory = () => {
  const catagoryData = useContext(catagoryContext);
  const urlBase = 'http://openlibrary.org/subjects/';

  useEffect(() => {
    if (catagoryData.catagoryData !== '') {
      axios
        .get(urlBase + catagoryData.catagoryData + '.json')
        .then(results => {
          const olidArray = results.data.works.map(
            work => work.lending_edition
          );
          catagoryData.setBooks(olidArray);
        })
        .catch(err => console.log(err));
    }
  }, [catagoryData.catagoryData]);

  return (
    <div>
      <Paper>
        <Typography variant='h5'>{catagoryData.catagoryData} Books</Typography>
        <Grid container>
          {catagoryData.books.map(book => (
            <Grid key={book} item xs={12} sm={6} lg={3}>
              <ShowCatagoryBook bookData={book} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default BooksByCatagory;
