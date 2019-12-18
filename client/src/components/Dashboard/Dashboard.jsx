import React, { useState } from 'react';

//material-ui

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import PropTypes from 'prop-types';

//styles
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
const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };
  return (
    <div>
      <div className={classes.grid_container}>
        <Paper className={classes.main_paper}>
          <Typography variant='h5'>Welcome User</Typography>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='profile' {...a11yProps(0)} />
            <Tab label='favorites' {...a11yProps(1)} />
            <Tab label='lists' {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            User Profile
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            favorite books
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            sharable book lists
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
