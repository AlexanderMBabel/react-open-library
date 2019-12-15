import React, { useContext } from 'react';
import SearchContext from '../../context';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchTwoTone';

const searchStyles = makeStyles({
  searchType: {
    width: 100
  }
});
const Search = () => {
  const classes = searchStyles();
  const searchObj = useContext(SearchContext);

  console.table(searchObj);

  const changeHandler = e => {
    const searchData = { ...searchObj.searchData };
    searchData[e.target.name] = e.target.value;
    searchObj.setSearchData(searchData);
  };

  return (
    <div>
      <Typography variant='h5' component='h5' style={{ textAlign: 'center' }}>
        Search Books
      </Typography>
      <div className='classes.search'>
        <div className='classes.seatchIcon'>
          <SearchIcon />
        </div>
        <InputBase
          name='value'
          value={searchObj.searchData.value}
          onChange={changeHandler}
          placeholder='Search...'
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <NativeSelect
        value={searchObj.searchData.type}
        name='type'
        onChange={changeHandler}
        className='classes.searchType'
        style={{ width: 100 }}
      >
        <option value='author'>Author</option>
        <option value='title'>Title</option>
        <option value='idsn'>IDSN</option>
      </NativeSelect>
    </div>
  );
};

export default Search;
