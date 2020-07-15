import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Typography, Button } from '@material-ui/core';
import { Link as NavigationLink } from 'react-router-dom';
import GuruInfo from './guru-info';
import { LISTING } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  section: {
    width: '100%',
    margin: '0 auto ',
    padding: '0 24px',

    [theme.breakpoints.up('lg')]: {
      width: '66%',
      padding: 0,
    },
  },
  caption: {
    marginTop: 24,
  },
}));

const SubmittedReview = ({ guru }) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      {guru ? (
        <GuruInfo
          displayName="THANKS FOR LEAVING YOUR REVIEW!"
          image={guru.image}
        />
      ) : (
        <Skeleton variant="rect" height={210} />
      )}

      <Typography className={classes.caption} paragraph>
        Once reviewed by our team, it will appear on our website to help
        other GYMGURUS customers find their ideal guru.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={NavigationLink}
        to={LISTING}
      >
        CHECK OUT OTHER GURUS
      </Button>
    </div>
  );
};

SubmittedReview.defaultProps = {
  guru: null,
};

SubmittedReview.propTypes = {
  guru: PropTypes.shape({
    image: PropTypes.string,
  }),
};

export default SubmittedReview;
