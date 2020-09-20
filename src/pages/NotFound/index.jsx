import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image404 from '../../svg/404.png';
import { LANDING } from '../../constants/routes';

const useStyles = makeStyles({
  wrapper: {
    padding: 40,
    minHeight: 'calc(100vh - 80px)',
  },
  img: {
    marginBottom: 40,
    maxWidth: '100%',
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.wrapper}
    >
      <img src={image404} alt="404" className={classes.img} />
      <Typography paragraph>
        The page you requested could not be found.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={LANDING}
      >
        BACK TO HOME
      </Button>
    </Grid>
  );
};

export default NotFound;
