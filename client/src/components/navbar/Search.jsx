import React, { useContext } from 'react';
//context api
import SearchContext from '../../context';
//router
import { Link } from 'react-router-dom';
//material-ui
import { makeStyles, fade } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
import Button from '@material-ui/core/Button';
const searchStyles = makeStyles(theme => ({
  searchType: {
    width: 100
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}));
const Search = () => {
  const classes = searchStyles();
  const searchObj = useContext(SearchContext);

  const changeHandler = e => {
    const searchData = { ...searchObj.searchData };
    searchData[e.target.name] = e.target.value;
    searchObj.setSearchData(searchData);
  };

  return (
    <div>
      <Typography style={{ textAlign: 'center' }} variant='h6'>
        Open Library Browser
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <div>
          <InputBase
            className={classes.inputInput}
            name='value'
            value={searchObj.searchData.value}
            onChange={changeHandler}
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
      <NativeSelect
        value={searchObj.searchData.type}
        name='type'
        onChange={changeHandler}
        className='classes.searchType'
        style={{ width: 100 }}
        placeholder='search by..'
      >
        <option value='any'>Any</option>
        <option value='author'>Author</option>
        <option value='title'>Title</option>
      </NativeSelect>
      <Link to='/searchresults'>
        <Button>go</Button>
      </Link>
    </div>
  );
};

export default Search;
