import React, { useContext } from 'react';

import { withRouter } from 'react-router-dom';
import history from '../../history';

// *** context ***
import CatagoryContext from '../catagories/context';

// *** images ***
import scifiImage from '../../images/science-fiction.jpg';
import fantasyImage from '../../images/fantasy.jpg';
import mysteryImage from '../../images/making-mystery-lesson-plan-16-9.jpg';
import romanceImage from '../../images/romance.jpg';
import thrillerImage from '../../images/thriller.jpg';
import horrorImage from '../../images/horror.jpg';

//  ***Material-UI***
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import CatagoryIcon from '@material-ui/icons/CategoryOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  mysteryBg: {
    backgroundImage: `url(${mysteryImage})`,
    width: '100%',
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 2px, 3px, rgba(23,23,23,0.7)'
  },
  fantasyBg: {
    backgroundImage: `url(${fantasyImage})`,
    width: 50,
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 2px, 3px, rgba(23,23,23,0.7)'
  },
  scifiBg: {
    backgroundImage: `url(${scifiImage})`,
    width: 50,
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 4px, 3px, 5px, rgba(23,23,23,0.7)'
  },
  romanceBg: {
    backgroundImage: `url(${romanceImage})`,
    width: 50,
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 4px, 3px, 5px, rgba(23,23,23,0.7)'
  },
  thrillerBg: {
    backgroundImage: `url(${thrillerImage})`,
    width: 50,
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 4px, 3px, 5px, rgba(23,23,23,0.7)'
  },
  horrorBg: {
    backgroundImage: `url(${horrorImage})`,
    width: 50,
    height: 75,
    backgroundSize: 'cover',
    borderRadius: '5px',
    margin: 5,
    boxShadow: '1px, 4px, 3px, 5px, rgba(23,23,23,0.7)'
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    height: 75,
    textDecoration: 'none',
    color: 'white',

    '&:hover': {
      background: 'rgba(12,34,23,0.4)',
      borderRadius: '5px'
    },
    catagoryTitle: {
      margin: '0 auto'
    },
    catagoryIcon: {
      paddingRight: 5,
      marginRight: 5
    },
    catagoryButton: {
      color: 'white',
      width: '100%',
      height: '100%'
    }
  }
}));
const Catagories = () => {
  const classes = useStyles();
  const catagoryObj = useContext(CatagoryContext);

  const clickHandler = e => {
    const catagory = e.currentTarget.name;
    console.log(catagory);
    catagoryObj.setCatagoryData(catagory);
    history.push('/booksByCatagory');
  };

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='Catagories'
        >
          <CatagoryIcon />
          <Typography className={classes.catagoryTitle} variant='subtitle1'>
            Categories
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h5' style={{ textAlign: 'center' }}>
                Fiction
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.mysteryBg}>
              <div className={classes.link}>
                <Button
                  style={{ color: 'white', height: 75 }}
                  name='mystery'
                  onClick={clickHandler}
                  className={classes.catagoryButton}
                >
                  Mystery
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.scifiBg}>
              <div className={classes.link}>
                <Button
                  name='science_fiction'
                  onClick={clickHandler}
                  className={classes.catagoryButton}
                >
                  SciFi
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.fantasyBg}>
              <div className={classes.link}>
                <Button
                  name='fantasy'
                  onClick={clickHandler}
                  className={classes.catagoryButton}
                >
                  Fantasy
                </Button>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.romanceBg}>
              <div className={classes.link}>
                <Button name='romance' onClick={clickHandler}>
                  Romance
                </Button>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.thrillerBg}>
              <div className={classes.link}>
                <Button name='thriller' onClick={clickHandler}>
                  Thriller
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.horrorBg}>
              <div className={classes.link}>
                <Button
                  name='horror'
                  onClick={clickHandler}
                  className={classes.catagoryButton}
                >
                  Horror
                </Button>
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default withRouter(Catagories);
