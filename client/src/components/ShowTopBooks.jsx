import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import dummy data
// import dummyData from '../dummyData.json';
// import dummyData2 from '../dummyData2.json';

//components
import BookCard from './BookCard';

//material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const popularBooks = [
  '9780439023481',
  '9780440238607',
  '9780439358071',
  '9780553213102',
  '9780375831003',
  '9780452284241',
  '9780618260300',
  '9780765311788'
];

const urlFirst = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
const urlLast = '&jscmd=data&format=json';

// const parseDummyData = (data, ibsn) => {
//   const objData = data[`ISBN:${ibsn}`];
//   const bookData = {
//     title: objData.title,
//     author: objData.authors[0].name,
//     cover: objData.cover.medium,
//     coverTitle: objData.title + 'cover image',
//     contents: objData.table_of_contents,
//     availability: objData.ebooks[0].availability
//   };

//   console.table(bookData);
//   return bookData;
// };

const ShowTopBooks = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    popularBooks.forEach(book => {
      axios
        .get(urlFirst + book + urlLast)
        .then(result => {
          const data = result.data;
          setBookData(bookData => [...bookData, [book, data]]);
        })
        .catch(err => console.error(err));
    });
  }, []);

  //   let books = parseDummyData(dummyData, '9780980200447');
  //   let books2 = parseDummyData(dummyData2, '9780439358071');

  return (
    <div>
      <div>
        <Container style={{ padding: 50 }}>
          <Typography variant='h4' component='h4' style={{ margin: 20 }}>
            Popular Books
          </Typography>
        </Container>
      </div>
      <Grid container style={{ margin: 45 }}>
        {bookData.map(book => (
          <Grid key={book[0]} item xs={12} md={3}>
            <BookCard bookData={book} />
          </Grid>
        ))}
        {/* <Grid item xs={3}>
          <BookCard bookData={books} />
        </Grid>
        <Grid item xs={3}>
          <BookCard bookData={books2} />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default ShowTopBooks;
