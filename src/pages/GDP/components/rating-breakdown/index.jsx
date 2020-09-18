import React from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LinkStyledButton } from '../../../../core/components';

const useStyles = makeStyles({
  ratingBreakdown: {
    borderBottom: '1px solid #ebedee',
    paddingBottom: 24,
    marginTop: 24,
  },
  ratingBreakdownHeader: {
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 1.5,
  },
  ratingPerStarCount: {
    fontSize: 12,
  },
});


const RatingBreakdown = ({
  ratingBreakdown,
  ratingCount,
  handleStarRefinementClick,
  resetStarRefinement,
  starRatingRefinement,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.ratingBreakdown}>
      <Typography
        variant="h6"
        component="h6"
        className={classes.ratingBreakdownHeader}
        paragraph
      >
        RATING BREAKDOWN
      </Typography>

      {starRatingRefinement && (
        <Typography variant="caption">
          Showing reviews:
          <LinkStyledButton onClick={resetStarRefinement}>
            {`${starRatingRefinement} STARS`}
          </LinkStyledButton>
        </Typography>
      )}

      <div className={classes.breakDowns}>
        {Object.keys(ratingBreakdown).reverse().map((key) => {
          const linearProgressValue = (ratingBreakdown[key] / ratingCount) * 100;

          return (
            <Grid
              container
              justify="space-between"
              alignItems="center"
              key={`star-breakdown-${key}`}
            >
              <Grid item xs={4}>
                <LinkStyledButton onClick={() => handleStarRefinementClick(key)}>
                  {`${key} STARS`}
                </LinkStyledButton>
              </Grid>
              <Grid item xs={6}>
                <LinearProgress
                  variant="determinate"
                  value={linearProgressValue}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  align="right"
                  className={classes.ratingPerStarCount}
                >
                  {ratingBreakdown[key]}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </div>
    </div>
  );
};

RatingBreakdown.defaultProps = {
  starRatingRefinement: null,
};

RatingBreakdown.propTypes = {
  ratingBreakdown: PropTypes.shape({
    1: PropTypes.number.isRequired,
    2: PropTypes.number.isRequired,
    3: PropTypes.number.isRequired,
    4: PropTypes.number.isRequired,
    5: PropTypes.number.isRequired,
  }).isRequired,
  ratingCount: PropTypes.number.isRequired,
  handleStarRefinementClick: PropTypes.func.isRequired,
  resetStarRefinement: PropTypes.func.isRequired,
  starRatingRefinement: PropTypes.number,
};

export default RatingBreakdown;
