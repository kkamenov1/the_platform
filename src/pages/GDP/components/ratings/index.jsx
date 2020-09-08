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

const Ratings = ({ rating, ratingCount }) => {
  const classes = useStyles();

  return (
    <div>
      <Rating
        value={rating}
        readOnly
        size="small"
        className={classes.rating}
        precision={0.5}
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

Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
};

export default Ratings;
