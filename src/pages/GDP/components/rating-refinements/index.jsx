import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import RatingBreakdown from '../rating-breakdown';

const useStyles = makeStyles((theme) => ({
  starRating: {
    width: '100%',
    height: 100,
    backgroundColor: theme.palette.primary.main,
  },
  outOf5: {
    fontSize: 36,
    fontWeight: 700,
  },
  recommendationPercentage: {
    marginTop: 16,
  },
  recommendationPercentageHeading: {
    fontSize: 48,
    fontWeight: 700,
  },
}));

const RatingRefinements = ({
  rating,
  ratingCount,
  ratingBreakdown,
  handleStarRefinementClick,
  resetStarRefinement,
  starRatingRefinement,
  recommendationPercentage,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.starRating}
        spacing={2}
      >
        <Grid item>
          <Typography className={classes.outOf5}>
            {Math.round(rating).toFixed(1)}
          </Typography>
        </Grid>

        <Grid item>
          <div>
            <Rating
              value={Math.round(rating)}
              readOnly
              size="small"
            />
          </div>
          <div>
            <Typography>
              <strong>{ratingCount}</strong>
              &nbsp;
              Reviews
            </Typography>
          </div>
        </Grid>
      </Grid>

      <RatingBreakdown
        ratingBreakdown={ratingBreakdown}
        ratingCount={ratingCount}
        handleStarRefinementClick={handleStarRefinementClick}
        resetStarRefinement={resetStarRefinement}
        starRatingRefinement={starRatingRefinement}
      />

      {recommendationPercentage && (
        <div className={classes.recommendationPercentage}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.recommendationPercentageHeading}
          >
            {`${Math.ceil(recommendationPercentage)}%`}
          </Typography>
          <Typography>
            of customers recommend this guru
          </Typography>
        </div>
      )}
    </div>
  );
};

RatingRefinements.defaultProps = {
  starRatingRefinement: null,
  recommendationPercentage: null,
};

RatingRefinements.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingBreakdown: PropTypes.shape({
    1: PropTypes.number.isRequired,
    2: PropTypes.number.isRequired,
    3: PropTypes.number.isRequired,
    4: PropTypes.number.isRequired,
    5: PropTypes.number.isRequired,
  }).isRequired,
  handleStarRefinementClick: PropTypes.func.isRequired,
  resetStarRefinement: PropTypes.func.isRequired,
  starRatingRefinement: PropTypes.number,
  recommendationPercentage: PropTypes.number,
};

export default RatingRefinements;
