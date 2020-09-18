import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rating: {
    verticalAlign: 'sub',
  },
  ratingCount: {
    marginLeft: 4,
  },
});

const RatingWithCount = ({ rating, ratingCount, ...ratingProps }) => {
  const classes = useStyles();

  return (
    <div>
      <Rating
        value={rating}
        readOnly
        size="small"
        className={classes.rating}
        {...ratingProps}
      />
      <Typography
        component="span"
        variant="caption"
        className={classes.ratingCount}
      >
        {`(${ratingCount})`}
      </Typography>
    </div>
  );
};

RatingWithCount.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
};

export default RatingWithCount;
