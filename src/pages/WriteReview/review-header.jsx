import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import GuruInfo from './guru-info';

const useStyles = makeStyles({
  heading: {
    fontWeight: 700,
    marginBottom: 24,
    letterSpacing: 1.5,
  },
});

const ReviewHeader = ({ guru }) => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h1" variant="h4" className={classes.heading}>
        WRITE YOUR REVIEW
      </Typography>
      {guru ? (
        <GuruInfo displayName={guru.displayName} image={guru.image} />
      ) : (
        <Skeleton variant="rect" height={210} />
      )}
    </>
  );
};

ReviewHeader.defaultProps = {
  guru: null,
};

ReviewHeader.propTypes = {
  guru: PropTypes.shape({
    displayName: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ReviewHeader;
