import React, { useState } from 'react';

//router
import { Link } from 'react-router-dom';

//components
import Search from './Search';
import SignOut from '../auth/SignOut';
import Catagories from './Catagories';

//firebase
import AuthContext from '../Sessions/context';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: { width: 250 },
  fullList: {
    width: 'auto',
    padding: '5px'
  },

  link: {
    textDecoration: 'none',
    color: 'white'
  }
}));

// const theme = createMuiTheme({});

const Navigation = () => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerIsOpen(open);
  };

  const sideList = () => (
    <div className={classes.list} role='presentation'>
      <Search />
      <Divider />
      <List>
        <Typography variant='caption'>
          <Catagories />
        </Typography>
      </List>
    </div>
  );
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.link}>
              Open Library Browser{' '}
            </Link>
          </Typography>
          <AuthContext.Consumer>
            {authUser =>
              authUser ? (
                <>
                  <SignOut />
                  <Link to='/dashboard' className={classes.link}>
                    <Button color='inherit'>Dashboard</Button>
                  </Link>
                </>
              ) : (
                <Link to='/login' className={classes.link}>
                  <Button color='inherit'>Login</Button>
                </Link>
              )
            }
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerIsOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
};

export default Navigation;
