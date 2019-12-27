import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase/context';
import { useAuthContext } from '../Sessions/context';

//components
import Profile from './Profile';
import Favorites from './Favorites';

//material-ui

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { red, deepOrange, green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import ImageUploader from '../utils/ImageUploader';

//styles
const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: '#ffebee'
    }
  }
});
const useStyles = makeStyles(theme => ({
  main_paper: {
    width: '75%',
    margin: 20
  },
  grid_container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    justifyItems: 'center'
  },
  grid_item: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  userHeading: {
    backgroundColor: red[400]
  },
  dashboardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0 .5rem 0',
    '& div:nth-child(2)': {
      display: 'none'
    },
    '&:hover': {
      '& div:nth-child(2)': {
        display: 'inline-flex'
      }
    }
  },
  profilePhotoEdit: {
    color: green[200]
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}
const Dashboard = ({ firebase }) => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const [profileData, setProfileData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [imageData, setImageData] = useState({});
  const authUser = useAuthContext();

  useEffect(() => {
    const docRef = firebase.db.collection('users').doc(authUser.authUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          //   console.log(doc.data());
          setProfileData(doc.data());
        } else {
          console.log('no such document');
        }
      })
      .catch(err => console.log(err));
  }, [firebase.db, authUser.authUser.uid]);

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const imageChange = e => {
    setImageData(e.target.value);
  };

  return (
    <div>
      <div className={classes.grid_container}>
        <Paper className={classes.main_paper}>
          <Grid container className={classes.userHeading}>
            <Grid item xs={12} className={classes.dashboardAvatar}>
              <div>
                <Avatar style={{ width: 75, height: 75 }} />
              </div>
              {!profileData.photo && (
                <div>
                  <IconButton style={{ marginTop: 20 }} onClick={handleOpen}>
                    <EditIcon
                      className={classes.profilePhotoEdit}
                      style={{ width: 20, height: 20 }}
                    />
                  </IconButton>
                </div>
              )}
            </Grid>
            <ImageUploader />
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                {profileData.userName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>{profileData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  indicatorColor='secondary'
                  textColor='secondary'
                  centered
                >
                  <Tab label='profile' {...a11yProps(0)} />
                  <Tab label='favorites' {...a11yProps(1)} />
                  <Tab label='lists' {...a11yProps(2)} />
                </Tabs>
              </ThemeProvider>
            </Grid>
          </Grid>
          <TabPanel value={tabValue} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Favorites />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            sharable book lists
          </TabPanel>
        </Paper>
      </div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={modalOpen}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <FormControl>
              <InputLabel htmlFor='upload-image'>Profile Image</InputLabel>
              <Input
                id='upload-image'
                type='file'
                value={imageData}
                onChange={imageChange}
              />
              <FormHelperText>
                File must be jpeg or png and be less than 5mb
              </FormHelperText>
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withFirebase(Dashboard);
