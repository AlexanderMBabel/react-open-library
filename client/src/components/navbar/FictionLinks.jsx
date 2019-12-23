import React from 'react';

import { Link } from 'react-router-dom';

// *** images ***
import scifiImage from '../../images/science-fiction.jpg';
import fantasyImage from '../../images/fantasy.jpg';
import mysteryImage from '../../images/making-mystery-lesson-plan-16-9.jpg';
import romanceImage from '../../images/romance.jpg';
import thrillerImage from '../../images/thriller.jpg';
import horrorImage from '../../images/horror.jpg';

//  ***material_ui***
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    }
  }
}));
const FictionLinks = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Typography variant='h5' style={{ textAlign: 'center' }}>
          Fiction
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.mysteryBg}>
        <div>
          <Link className={classes.link} to='/mystery'>
            <Typography variant='button'>Mystery</Typography>
          </Link>
        </div>
      </Grid>
      <Grid item xs={6} className={classes.scifiBg}>
        <Link className={classes.link} to='/scifi'>
          <Typography variant='button'>SciFi</Typography>
        </Link>
      </Grid>
      <Grid item xs={6} className={classes.fantasyBg}>
        <Link className={classes.link} to='/fantasy'>
          <Typography variant='button'>Fantasy</Typography>
        </Link>
      </Grid>
      <Grid item xs={4} className={classes.romanceBg}>
        <Link className={classes.link} to='/romance'>
          <Typography variant='button'>Romance</Typography>
        </Link>
      </Grid>
      <Grid item xs={4} className={classes.thrillerBg}>
        <Link className={classes.link} to='/thriller'>
          <Typography variant='button'>Thriller</Typography>
        </Link>
      </Grid>
      <Grid item xs={6} className={classes.horrorBg}>
        <Link className={classes.link} to='/horror'>
          <Typography variant='button'>Horror</Typography>
        </Link>
      </Grid>
    </div>
  );
};

export default FictionLinks;
