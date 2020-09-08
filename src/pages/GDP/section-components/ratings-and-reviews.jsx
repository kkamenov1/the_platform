import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import {
  ReviewContent,
} from '../../../core/components';
import { RatingRefinements } from '../components';

const useStyles = makeStyles({
  divider: {
    margin: '40px 0',
  },
});

const RatingsAndReviews = ({
  reviews,
  loadMore,
  handleStarRefinementClick,
  resetStarRefinement,
  guruID,
  rating,
  ratingCount,
  ratingBreakdown,
  reviewsCount,
  starRatingRefinement,
  recommendationPercentage,
}) => {
  const classes = useStyles();

  return (
    <div>
      {reviews.length !== 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <RatingRefinements
              rating={rating}
              ratingCount={ratingCount}
              ratingBreakdown={ratingBreakdown}
              handleStarRefinementClick={handleStarRefinementClick}
              resetStarRefinement={resetStarRefinement}
              starRatingRefinement={starRatingRefinement}
              recommendationPercentage={recommendationPercentage}
            />
          </Grid>

          <Grid item xs={7}>
            {reviews.map((review) => (
              <div key={review.reviewUID}>
                <ReviewContent {...review} />
                <Divider className={classes.divider} />
              </div>
            ))}

            <Grid container spacing={2}>
              <Grid item xs={6}>
                {reviews.length < reviewsCount && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={loadMore}
                    fullWidth
                  >
                    LOAD MORE
                  </Button>
                )}
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/gurus/${guruID}/write-review`}
                >
                  WRITE A REVIEW
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rect" height={400} />
      )}
    </div>
  );
};

RatingsAndReviews.defaultProps = {
  starRatingRefinement: null,
  recommendationPercentage: null,
};

RatingsAndReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    recommend: PropTypes.bool.isRequired,
    guruInfo: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    imageBefore: PropTypes.string,
    imageAfter: PropTypes.string,
  })).isRequired,
  loadMore: PropTypes.func.isRequired,
  handleStarRefinementClick: PropTypes.func.isRequired,
  resetStarRefinement: PropTypes.func.isRequired,
  guruID: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingBreakdown: PropTypes.shape({
    1: PropTypes.number.isRequired,
    2: PropTypes.number.isRequired,
    3: PropTypes.number.isRequired,
    4: PropTypes.number.isRequired,
    5: PropTypes.number.isRequired,
  }).isRequired,
  reviewsCount: PropTypes.number.isRequired,
  starRatingRefinement: PropTypes.number,
  recommendationPercentage: PropTypes.number,
};

export default RatingsAndReviews;
