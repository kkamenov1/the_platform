import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Hit from './hit';

const Hits = ({
  hits,
  handleRejectReview,
  handleApproveReview,
}) => (
  <Grid container spacing={4}>
    {hits.map((hit) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={hit.reviewUID}>
        <Hit
          hit={hit}
          handleApproveReview={handleApproveReview}
          handleRejectReview={handleRejectReview}
        />
      </Grid>
    ))}
  </Grid>
);

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    reviewUID: PropTypes.string.isRequired,
  })).isRequired,
  handleRejectReview: PropTypes.func.isRequired,
  handleApproveReview: PropTypes.func.isRequired,
};

export default Hits;
